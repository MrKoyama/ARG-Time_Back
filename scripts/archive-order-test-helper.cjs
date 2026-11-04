// Read-only bridge: validate the exact approved transform before restoring old test semantics.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),author=path.join(root,'docs/agent_runs/2026-10-30-archive-order');
const sha=value=>crypto.createHash('sha256').update(value).digest('hex');
const orderRaw=fs.readFileSync(path.join(author,'order.json')),baselineRaw=fs.readFileSync(path.join(author,'baseline.json'));
assert.equal(sha(orderRaw),'afed4440327f54ea44d67101f3fbb101e6b24ad5387f5dafbb1d61bb7577c111');
assert.equal(sha(baselineRaw),'2bff1c72e50c9662f1f3a4de277e45e6ce52c017d429bb76761bb7151d4339ec');
const order=JSON.parse(orderRaw),baseline=JSON.parse(baselineRaw);
const entries=order.entries,byHref=new Map(entries.map(e=>[e.href,e]));
assert.equal(entries.length,57);assert.equal(byHref.size,57);assert.equal(order.total,60);
assert.deepEqual(entries.map(e=>e.number),Array.from({length:57},(_,i)=>i+1));
const cacheVersion='20261030-order-v1';
const owned=new Set([...entries.map(e=>'public/'+e.href),'public/search.html','public/business-search.html','public/chronect-search.html','public/chronect-hub-search.html','public/business-shared.js','public/chronect-shared.js']);

function forwardPublic(name,source){
  if(!owned.has(name))return source;
  let result=source;
  result=result.replace(/(\barchiveTitleByNumber\s*=\s*)(\{[^{}]*\})/,(_,prefix,json)=>{
    const old=JSON.parse(json),next={};assert.equal(Object.keys(old).length,57,name);
    for(const e of entries){assert.equal(old[e.old],e.title,name+' old title '+e.href);next[e.number]=e.title;}
    return prefix+JSON.stringify(next);
  });
  result=result.replace(/\{[^{}\r\n]*"partners\.html":44[^{}\r\n]*\}/g,json=>{
    const mapping=JSON.parse(json);assert.equal(Object.keys(mapping).length,57,name+' URL map');
    for(const [href,n]of Object.entries(mapping)){assert.equal(n,byHref.get(href)?.old,name+' old URL '+href);mapping[href]=byHref.get(href).number;}
    return JSON.stringify(mapping);
  });
  const entry=byHref.get(name.replace(/^public\//,''));
  if(entry){
    const body='data-page-number="'+entry.old+'"';
    if(result.includes(body))result=result.replace(body,'data-page-number="'+entry.number+'"');
    else result=result.replace(/(\bcurrentPage\s*=\s*\{\s*number\s*:\s*)(\d+)/,(_,prefix,n)=>{assert.equal(Number(n),entry.old,name);return prefix+entry.number;});
    result=result.replace(/(id="archiveButton"[^>]*>)(\d+)( \/ 60<\/button>)/,(_,prefix,n,suffix)=>{assert.equal(Number(n),entry.old,name+' footer');return prefix+String(entry.number).padStart(2,'0')+suffix;});
  }
  return result.replace(/src="((?:business|chronect)-shared\.js)(?:\?[^"<>]*)?"/g,(_,file)=>'src="'+file+'?v='+cacheVersion+'"');
}

function canonicalPublic(name,current){
  const file=baseline.files[name];assert(file,name+' absent from frozen baseline');
  if(typeof file.text!=='string'){assert.equal(sha(current),file.sha256,name+' immutable binary');return current;}
  assert.equal(sha(Buffer.from(file.text)),file.sha256,name+' frozen text hash');
  const expected=forwardPublic(name,file.text);
  assert.equal(withoutLivingAddition(name,Buffer.isBuffer(current)?current.toString('utf8'):current),expected,name+' exceeds fixed archive transform plus approved living-route addition');
  return Buffer.from(file.text);
}
// Preserve the immutable 2026-10-30 fixtures. Validate and remove only the later
// approved additive changes before running the original regression meanings.
const livingEntry={number:58,old:58,href:'chronect-hub-research-continuous-action.html',title:'環境変化下における連続行動支援の評価 ｜ Chronect Hub'};
const livingSearchEntry={keywords:['生活動線'],title:'環境変化下における連続行動支援の評価',href:livingEntry.href,description:'本研究では、生活動線や設備配置の変化が、連続した身体動作の安定性に与える影響を評価した。'};
const livingParagraph='本プログラムでは、周辺の公共施設や生活動線にも配慮し、地域の利用状況を踏まえた実証環境の整備を進めています。近隣を通行される方への影響を抑えながら、生活環境との調和に取り組んでいます。';
function withoutLivingAddition(name,source){
  let result=require('./midroute-test-helper.cjs').withoutMidrouteAddition(name,source,baseline);
  if(name==='public/chronect-hub-research-20240711.html'){
    const approved='準備や移動を伴う活動を区別し、生活動線や本人が優先した条件を記述することを重視しました。';
    assert.equal(result.split(approved).length,2,name+' exact approved five-character insertion');
    result=result.replace(approved,approved.replace('生活動線や',''));
  }
  if(source.includes('archiveTitleByNumber')){
    result=result.replace(/(\barchiveTitleByNumber\s*=\s*)(\{[^{}]*\})/,(_,prefix,json)=>{const map=JSON.parse(json);assert.equal(map[58],livingEntry.title,name);delete map[58];return prefix+JSON.stringify(map);});
    result=result.replace(/\{[^{}\r\n]*"partners\.html":37[^{}\r\n]*\}/g,json=>{const map=JSON.parse(json);assert.equal(map[livingEntry.href],58,name);delete map[livingEntry.href];return JSON.stringify(map);});
  }
  if(name==='public/business-demonstration.html'){
    const addition='    <div class="demo-notice"><h3>周辺環境について</h3><p>'+livingParagraph+'</p></div>\n';
    assert.equal(result.split(addition).length,2,name+' exact approved paragraph');result=result.replace(addition,'');
  }
  if(name==='public/chronect-hub.js'){
    const addition=',\n  '+JSON.stringify(livingSearchEntry);assert.equal(result.split(addition).length,2,name+' exact additive search record');result=result.replace(addition,'');
  }
  if(name==='public/chronect-hub-search.html'){
    assert(result.includes('chronect-hub.js?v=20261102-living-v1'));result=result.replace('chronect-hub.js?v=20261102-living-v1','chronect-hub.js?v=20261029-missing');
  }
  return result;
}
function legacyTestSource(name){
  const file=baseline.files[name];assert(file&&typeof file.text==='string',name);
  assert.equal(sha(Buffer.from(file.text)),file.sha256,name+' frozen script hash');
  return file.text.replace("require('node:fs')","require('./archive-order-test-helper.cjs').legacyFs");
}
function assertLegacyTestCode(name){assert.equal(fs.readFileSync(path.join(root,name),'utf8'),legacyTestSource(name),name+' exceeds legacy bridge insertion');}
const legacyFs=Object.create(fs);
legacyFs.readdirSync=function(dir,options){const rows=fs.readdirSync(dir,options);const added=new Set([livingEntry.href,...require('./midroute-test-helper.cjs').entries.map(e=>e.href)]);return path.resolve(String(dir))===path.join(root,'public')?rows.filter(row=>!added.has(typeof row==='string'?row:row.name)):rows;};
legacyFs.readFileSync=function(file,options){
  const resolved=path.resolve(String(file)),relative=path.relative(root,resolved).split(path.sep).join('/');
  const value=fs.readFileSync(file,options);
  if(!relative.startsWith('public/'))return value;
  const canonical=canonicalPublic(relative,value);
  return typeof value==='string'?canonical.toString(typeof options==='string'?options:options?.encoding||'utf8'):canonical;
};
module.exports={root,baseline,order,entries,byHref,owned,cacheVersion,forwardPublic,canonicalPublic,legacyFs,legacyTestSource,assertLegacyTestCode,sha,livingEntry,livingSearchEntry,livingParagraph};
