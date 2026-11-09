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
  const previous=withoutArchivePruning(name,Buffer.isBuffer(current)?current.toString('utf8'):current,file.text);
  assert.equal(withoutLivingAddition(name,previous),expected,name+' exceeds the approved archive and route changes');
  return Buffer.from(file.text);
}
// Preserve the immutable 2026-10-30 fixtures. Validate and remove only the later
// approved additive changes before running the original regression meanings.
const livingEntry={number:58,old:58,href:'chronect-hub-research-continuous-action.html',title:'環境変化下における連続行動支援の評価 ｜ Chronect Hub'};
const archiveVersion='20261109-facility-c-v1';
const facilitySearchEntries=[
  {
    "keywords": [
      "施設C"
    ],
    "title": "試験施設管理情報",
    "href": "chronect-hub-facility-management.html",
    "description": "試験施設の識別子と運用区分を整理した管理資料です。"
  },
  {
    "keywords": [
      "連続業務"
    ],
    "title": "連続業務遂行試験 実施記録",
    "href": "chronect-hub-continuous-work-record.html",
    "description": "試験対象者が実施した作業工程と評価項目の記録です。"
  }
];
const facilityEntries=facilitySearchEntries.map((entry,index)=>({number:50+index,previousNumber:50+index,href:entry.href,title:entry.title+' ｜ Chronect Hub'}));
const excludedNumbers=new Set([43,44,46,47,48,49,50,51,52,53,54,55,56,57]);
const compactNumber=number=>number-[...excludedNumbers].filter(excluded=>excluded<number).length;

function withoutArchivePruning(name,source,frozenSource){
  const mid=require('./midroute-test-helper.cjs');
  const priorEntries=[...entries,livingEntry,...mid.entries];
  const byPriorHref=new Map(priorEntries.map(entry=>[entry.href,entry]));
  let result=source.replace(/((?:business|chronect)-shared\.js\?v=)20261109-facility-c-v1/g,'$1'+mid.cacheVersion).replace(/chronect-hub\.js\?v=20261109-facility-c-v1/g,'chronect-hub.js?v='+mid.cacheVersion);
  if(name==='public/chronect-hub.js')for(const entry of facilitySearchEntries){
    const addition=',\n  '+JSON.stringify(entry);
    assert.equal(result.split(addition).length,2,name+' facility search record');
    result=result.replace(addition,'');
  }
  const entry=byPriorHref.get(name.replace(/^public\//,''));
  if(entry&&entry.number>=43){
    const excluded=excludedNumbers.has(entry.number);
    const attrs=excluded?'data-page-archive="exclude"':'data-page-number="'+compactNumber(entry.number)+'"';
    assert(result.includes(attrs),name);
    result=result.replace(attrs,'data-page-number="'+entry.number+'"'+(excluded?' data-page-title="'+entry.title+'" data-page-href="'+entry.href+'"':''));
    const button=excluded?'ページアーカイブ':compactNumber(entry.number)+' / 120';
    result=result.replace(/(id="archiveButton"[^>]*>)([^<]+)(<\/button>)/,(_,start,label,end)=>{
      assert.equal(label,button,name);
      return start+entry.number+' / 120'+end;
    });
  }
  if(!result.includes('archiveTitleByNumber'))return result;
  const active=[...priorEntries.filter(e=>!excludedNumbers.has(e.number)).map(e=>({...e,number:compactNumber(e.number)})),...facilityEntries];
  result=result.replace(/(\barchiveTitleByNumber\s*=\s*)(\{[^{}]*\})/,(_,prefix,json)=>{
    assert.deepEqual(JSON.parse(json),Object.fromEntries(active.map(e=>[e.number,e.title])),name+' compact titles');
    return prefix+JSON.stringify(Object.fromEntries(priorEntries.map(e=>[e.number,e.title])));
  });
  const frozenMaps=[...frozenSource.matchAll(/\{[^{}\r\n]*"partners\.html":44[^{}\r\n]*\}/g)];
  let mapIndex=0;
  result=result.replace(/\{[^{}\r\n]*"partners\.html":37[^{}\r\n]*\}/g,json=>{
    assert.deepEqual(JSON.parse(json),Object.fromEntries(active.map(e=>[e.href,e.number])),name+' compact URLs');
    const originalOrder=Object.keys(JSON.parse(frozenMaps[mapIndex++][0]));
    return JSON.stringify(Object.fromEntries([...originalOrder,livingEntry.href,...mid.entries.map(e=>e.href)].map(href=>[href,byPriorHref.get(href).number])));
  });
  assert.equal(mapIndex,frozenMaps.length,name+' map count');
  return result
    .replace(/\.filter\(page=>page&&typeof page\.href==='string'\)(?=\.map)/,'')
    .replace(/\.filter\(page=>Object\.hasOwn\((?:businessPageNumberByHref|pageNumberByHref),page\.href\)\)/,'')
    .replace(/if\(!Number\.isInteger\(movedNumber\)\)return null;/,'')
    .replace(/^ +if \(!Number\.isInteger\(movedNumber\)\) return null;\n/m,'')
    .replace('}).filter(Boolean)','})');
}
const livingSearchEntry={keywords:['生活動線'],title:'環境変化下における連続行動支援の評価',href:livingEntry.href,description:'本研究では、生活動線や設備配置の変化が、連続した身体動作の安定性に与える影響を評価した。'};
const livingParagraph='本プログラムでは、周辺の公共施設や生活動線にも配慮し、地域の利用状況を踏まえた実証環境の整備を進めています。近隣を通行される方への影響を抑えながら、生活環境との調和に取り組んでいます。';
function withoutLivingAddition(name,source){
  let result=require('./midroute-test-helper.cjs').withoutMidrouteAddition(name,source,baseline);
  // The separately approved 2026-11-05 mobile-only CSS predates this task.
  // Validate its exact changes; do not modify the immutable historical fixtures.
  if(name==='public/chronect.css'){
    const changes=[
      ['  html,body{max-width:100%;overflow-x:clip}\n  html{scroll-padding-top:14rem}\n','  html,body{max-width:100%;overflow-x:hidden}\n'],
      ['  .header-search{order:2;flex:1 0 100%;width:100%;margin-left:0}\n  .search-input{flex:1;min-width:0;width:100%;height:42px;padding:0 12px;font-size:.84rem}\n  .search-submit{flex:0 0 42px;width:42px;height:42px}\n',''],
      ['  .brand-name{font-size:1.1rem}\n','  .brand-name{font-size:1.1rem}\n  .search-input{width:104px}\n  .search-submit{width:36px}\n']
    ];
    for(const [current,previous]of changes){assert.equal(result.split(current).length,2,name+' exact approved mobile CSS');result=result.replace(current,previous);}
  }
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
legacyFs.readdirSync=function(dir,options){const rows=fs.readdirSync(dir,options);const added=new Set([livingEntry.href,...require('./midroute-test-helper.cjs').entries.map(e=>e.href),...facilityEntries.map(e=>e.href)]);return path.resolve(String(dir))===path.join(root,'public')?rows.filter(row=>!added.has(typeof row==='string'?row:row.name)):rows;};
legacyFs.readFileSync=function(file,options){
  const resolved=path.resolve(String(file)),relative=path.relative(root,resolved).split(path.sep).join('/');
  const value=fs.readFileSync(file,options);
  if(!relative.startsWith('public/'))return value;
  const canonical=canonicalPublic(relative,value);
  return typeof value==='string'?canonical.toString(typeof options==='string'?options:options?.encoding||'utf8'):canonical;
};
module.exports={root,baseline,order,entries,byHref,owned,cacheVersion,forwardPublic,canonicalPublic,legacyFs,legacyTestSource,assertLegacyTestCode,sha,livingEntry,livingSearchEntry,livingParagraph,archiveVersion,excludedNumbers,compactNumber,facilityEntries,facilitySearchEntries};
