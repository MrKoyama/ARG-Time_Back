// Current-code checks, separate from the five strictly restored legacy-meaning tests.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const bridge=require('./archive-order-test-helper.cjs');
const {root,entries,byHref,baseline,canonicalPublic,cacheVersion}=bridge;
const read=name=>fs.readFileSync(path.join(root,'public',name),'utf8');
function functionSource(source,name){
  const start=source.indexOf('function '+name+'(');if(start<0)return '';
  const opening=source.indexOf('{',start);let depth=0,quote='',escaped=false;
  for(let i=opening;i<source.length;i++){
    const c=source[i];if(quote){if(escaped)escaped=false;else if(c==='\\')escaped=true;else if(c===quote)quote='';}
    else if(c==='"'||c==="'"||c==='`')quote=c;
    else if(c==='{')depth++;else if(c==='}'&&--depth===0)return source.slice(start,i+1);
  }throw Error('Unclosed '+name);
}
let checkedFiles=0;
for(const [name,file]of Object.entries(baseline.files)){
  if(!name.startsWith('public/'))continue;
  const current=fs.readFileSync(path.join(root,name));canonicalPublic(name,current);checkedFiles++;
}
// The four old scripts may only gain the bridge, with original fixture/PLAN numbers intact.
for(const name of ['check-community-archive.cjs','check-entry-migration.cjs','check-chronect-hub.cjs','check-chronect-completion.cjs'])bridge.assertLegacyTestCode('scripts/'+name);
// Keep both historical UX fingerprint maps verbatim; separate permitted test-code upgrades.
const ux=fs.readFileSync(path.join(root,'scripts/check-ux-refinement.cjs'),'utf8');
for(const name of ['protectedHashes','allowedHashes']){
  const re=new RegExp('const '+name+'=([^\\r\\n]*);');
  assert.equal(ux.match(re)[1],baseline.files['scripts/check-ux-refinement.cjs'].text.match(re)[1],name+' historical fingerprints');
}

const numbered=new Map();let srcConsumers=0,syntax=0;
for(const name of fs.readdirSync(path.join(root,'public')).filter(n=>/\.(html|js)$/.test(n))){
  const source=read(name);
  if(name.endsWith('.js')){new vm.Script(source,{filename:name});syntax++;}
  else for(const script of source.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)){new vm.Script(script[1],{filename:name});syntax++;}
  for(const script of source.matchAll(/src="((?:business|chronect)-shared\.js)(\?[^"<>]*)?"/g)){assert.equal(script[2],'?v='+cacheVersion,name+' cache');srcConsumers++;}
  const body=source.match(/data-page-number="(\d+)"/),inline=source.match(/\bcurrentPage\s*=\s*\{\s*number\s*:\s*(\d+)/);
  if(body||inline){
    const number=Number((body||inline)[1]);assert(!numbered.has(number),'Duplicate number '+number);numbered.set(number,name);
    const e=byHref.get(name);assert(e,name);assert.equal(number,e.number,name);
    const footer=source.match(/id="archiveButton"[^>]*>(\d+) \/ 60<\/button>/);assert(footer,name);assert.equal(Number(footer[1]),number);
    if(body){assert(source.includes('data-page-title="'+e.title+'"'));assert(source.includes('data-page-href="'+name+'"'));}
    else {const decl=source.match(/\bcurrentPage\s*=\s*(\{[^{}]*\})/)[1];const current=vm.runInNewContext('('+decl+')');assert.equal(current.href,name);assert.equal(current.title,e.title);}
  }
  if(name.endsWith('.html'))for(const m of source.matchAll(/(?:href|src|action)="([^"#]+)"/g)){
    if(/^(https?:|mailto:|tel:)/.test(m[1]))continue;
    assert(fs.existsSync(path.join(root,'public',m[1].split(/[?#]/)[0])),name+' missing '+m[1]);
  }
}
assert.equal(srcConsumers,50);assert.equal(numbered.size,57);
assert.deepEqual([...numbered.keys()].sort((a,b)=>a-b),Array.from({length:57},(_,i)=>i+1));
assert(!/data-page-number|archiveButton/.test(read('memo-dream.html')));
const registries=fs.readdirSync(path.join(root,'public')).filter(n=>/\.(html|js)$/.test(n)&&read(n).includes('archiveTitleByNumber'));
assert.equal(registries.length,13);
const oldAll=entries.slice().sort((a,b)=>a.old-b.old).map(e=>({href:e.href,number:e.old,title:e.title}));
const newAll=entries.map(e=>({href:e.href,number:e.number,title:e.title}));
const legacyMixed=oldAll.map(p=>{
  if(p.href==='index.html')return {...p,href:'memo-dream.html',number:1};
  if(p.href==='time-back.html')return {...p,href:'index.html',number:3,title:'トップページ | TIME BACK'};
  const ancient={'partners.html':42,'nodelink-works.html':43,'axion-logistics.html':44};
  return ancient[p.href]?{...p,number:ancient[p.href]}:p;
});
const oldestIndex=legacyMixed.map(p=>p.href==='index.html'?{...p,number:1}:p);
function checkRecords(records,hrefs,label){
  assert.equal(records.length,hrefs.length,label+' visited count');
  assert.equal(new Set(records.map(p=>p.href)).size,records.length,label+' duplicate URL');
  assert.equal(new Set(records.map(p=>p.number)).size,records.length,label+' duplicate number');
  assert.deepEqual(records.map(p=>p.href).sort(),hrefs.slice().sort(),label+' visited URL set');
  for(const p of records){const e=byHref.get(p.href);assert(e,label+' unexpected '+p.href);assert.equal(p.number,e.number,label+' number');assert.equal(p.title,e.title,label+' title');}
}
let singletonLoads=0,registrations=0,mixedLoads=0;
const definitions=new Map();
for(const name of registries){
  const source=read(name),titles=JSON.parse(source.match(/\barchiveTitleByNumber\s*=\s*(\{[^{}]*\})/)[1]);
  const mappingMatch=source.match(/\{[^{}\r\n]*"partners\.html":37[^{}\r\n]*\}/);assert(mappingMatch,name);
  const mapping=JSON.parse(mappingMatch[0]);assert.equal(Object.keys(mapping).length,57);
  for(const e of entries){assert.equal(mapping[e.href],e.number,name);assert.equal(titles[e.number],e.title,name);}
  for(let n=58;n<=60;n++)assert.equal(titles[n],undefined,name);
  for(const ex of ['search.html','business-search.html','chronect-search.html','chronect-hub-search.html'])assert.equal(mapping[ex],undefined);
  const globalMaps=[...source.matchAll(/(?:const|let)\s+(businessPageNumberByHref|pageNumberByHref)\s*=\s*(\{[^{}]*\})/g)].map(m=>'const '+m[1]+'='+m[2]+';').join('\n');
  const load=functionSource(source,'loadArchive'),save=functionSource(source,'saveArchive'),register=functionSource(source,'registerCurrentPage');
  const defs='const archiveStorageKey="timeback-page-archive-v1";const archiveTitleByNumber='+JSON.stringify(titles)+';let currentPage=null;'+globalMaps+'\n'+load+'\n'+save+'\n'+register;
  definitions.set(name,defs);
  function env(seed){let stored=typeof seed==='string'?seed:JSON.stringify(seed);const context=vm.createContext({localStorage:{getItem(){return stored},setItem(k,v){assert.equal(k,'timeback-page-archive-v1');stored=v}}});vm.runInContext(defs,context);return{context,set:v=>stored=JSON.stringify(v)};}
  for(const e of entries){
    const x=env([{href:e.href,number:e.old,title:e.title}]);
    for(let i=0;i<3;i++){const records=JSON.parse(JSON.stringify(vm.runInContext('loadArchive()',x.context)));checkRecords(records,[e.href],name+' singleton');x.set(records);singletonLoads++;}
    if(register){
      const r=env(legacyMixed);r.context.page={href:e.href,number:e.number,title:e.title};vm.runInContext('currentPage=page',r.context);
      for(let i=0;i<3;i++){const records=JSON.parse(JSON.stringify(vm.runInContext('registerCurrentPage()',r.context)));checkRecords(records,entries.map(p=>p.href),name+' registration '+e.href);r.set(records);registrations++;}
    }
  }
  for(const seed of [oldAll,newAll,legacyMixed,oldestIndex,legacyMixed.filter((p,i)=>i%4===0),[],'invalid JSON','{}']){
    const x=env(seed),hrefs=Array.isArray(seed)?seed.map(p=>p.href==='memo-dream.html'?'index.html':p.href==='index.html'&&/TIME BACK/.test(p.title)?'time-back.html':p.href):[];
    for(let i=0;i<3;i++){const records=JSON.parse(JSON.stringify(vm.runInContext('loadArchive()',x.context)));checkRecords(records,hrefs,name+' mixed');x.set(records);mixedLoads++;}
  }
}
// Save through alternating real brand implementations, not through a simulated mapping.
let stored=JSON.stringify(legacyMixed);
for(const name of ['business-shared.js','chronect-shared.js','about.html','business-shared.js','chronect-shared.js','about.html']){
  const context=vm.createContext({page:newAll[30],localStorage:{getItem(){return stored},setItem(k,v){stored=v}}});vm.runInContext(definitions.get(name),context);vm.runInContext('currentPage=page;registerCurrentPage()',context);checkRecords(JSON.parse(stored),entries.map(e=>e.href),'brand round trip');
}
function node(){return{children:[],classList:{add(){},remove(){},contains(){return false}},append(...a){this.children.push(...a)},appendChild(a){this.children.push(a)},addEventListener(){},setAttribute(){},focus(){}};}
for(const name of ['search.html','business-search.html','chronect-search.html','chronect-hub-search.html']){
  const html=read(name),external=html.match(/src="((?:business|chronect)-shared\.js)/),script=external?read(external[1]):[...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].find(m=>m[1].includes('const archiveStorageKey'))[1];
  const nodes=new Map();let saved='[]',writes=0;
  const context=vm.createContext({URLSearchParams,document:{body:{dataset:{pageArchive:'exclude'},classList:{add(){},remove(){}}},getElementById(id){if(!nodes.has(id))nodes.set(id,node());return nodes.get(id)},createElement:node,addEventListener(){}},localStorage:{getItem(){return saved},setItem(k,v){saved=v;writes++}},window:{location:{search:''}}});
  vm.runInContext(script,context);vm.runInContext('renderArchive()',context);assert.equal(saved,'[]',name+' EX visited set');assert.equal(writes,0,name+' EX writes');assert.equal(nodes.get('archiveList').children.length,60,name+' archive slots');
}
console.log('PASS CURRENT CODE: '+checkedFiles+' public files match the exact fixed number/map/src transform; '+syntax+' syntax checks; 57 unique pages / 13 registries; '+singletonLoads+' singleton reloads, '+registrations+' registrations/reloads, '+mixedLoads+' full/partial/legacy cases; brand round trips, 4 EX exclusions and 50 versioned consumers. Legacy-meaning scripts are checked separately via strict restoration.');
