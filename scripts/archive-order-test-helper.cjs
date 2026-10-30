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
  assert.equal(Buffer.isBuffer(current)?current.toString('utf8'):current,expected,name+' exceeds fixed number/map/src transform');
  return Buffer.from(file.text);
}
function legacyTestSource(name){
  const file=baseline.files[name];assert(file&&typeof file.text==='string',name);
  assert.equal(sha(Buffer.from(file.text)),file.sha256,name+' frozen script hash');
  return file.text.replace("require('node:fs')","require('./archive-order-test-helper.cjs').legacyFs");
}
function assertLegacyTestCode(name){assert.equal(fs.readFileSync(path.join(root,name),'utf8'),legacyTestSource(name),name+' exceeds legacy bridge insertion');}
const legacyFs=Object.create(fs);
legacyFs.readFileSync=function(file,options){
  const resolved=path.resolve(String(file)),relative=path.relative(root,resolved).split(path.sep).join('/');
  const value=fs.readFileSync(file,options);
  if(!relative.startsWith('public/'))return value;
  const canonical=canonicalPublic(relative,value);
  return typeof value==='string'?canonical.toString(typeof options==='string'?options:options?.encoding||'utf8'):canonical;
};
module.exports={root,baseline,order,entries,byHref,owned,cacheVersion,forwardPublic,canonicalPublic,legacyFs,legacyTestSource,assertLegacyTestCode,sha};
