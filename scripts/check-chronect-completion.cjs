// Read-only regression checks for the seven approved missing-page additions.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'../public'),read=n=>fs.readFileSync(path.join(root,n),'utf8');
const raw=fs.readFileSync(path.resolve(__dirname,'../docs/agent_runs/2026-10-29-missing-pages/PLAN-v1.md'));
assert.equal(crypto.createHash('sha256').update(raw).digest('hex').toUpperCase(),'6E9829C52B3A556DBB732FBEC5D28115E8DACB38243261A322E5772416B05E84');
const plan=raw.toString('utf8').replace(/\r\n/g,'\n');
const items=[...plan.matchAll(/### (5[1-7])｜([^\n]+)\n[\s\S]*?<!-- 公開本文開始 -->\n\n([\s\S]*?)\n\n<!-- 公開本文終了 -->/g)].map(m=>({number:Number(m[1]),title:m[2],text:m[3]}));
assert.equal(items.length,7);
const dates=['20240711','20251105','20260218'];
const names=dates.map(d=>'chronect-news-'+d+'.html').concat('chronect-projects.html',dates.map(d=>'chronect-hub-research-'+d+'.html'));
function database(file,name){const source=read(file),match=source.match(new RegExp('const '+name+'\\s*=\\s*(\\[[\\s\\S]*?\\n\\s*\\]);'));assert(match,file);return vm.runInNewContext(match[0]+';'+name);}
const corporate=database('chronect-search.html','chronectSearchDatabase'),hub=database('chronect-hub.js','chronectHubDatabase');
const search=(db,q)=>db.filter(item=>item.keywords.some(word=>word.toLocaleLowerCase('ja')===q.trim().toLocaleLowerCase('ja')));
for(let i=0;i<3;i++){
  const news=names[i],summary=names[i+4];
  assert(read(news).includes('href="'+summary+'"'));
  assert(read(summary).includes('href="'+news+'"'));
  const result=search(corporate,items[i].title);assert.equal(result.length,1);assert.equal(result[0].url,news);
  for(const word of [items[i+4].title,...[['時間選択','日常環境'],['注意配分','主観時間'],['覚醒移行','短時間休息']][i]]){
    const result=search(hub,' '+word+' ');assert.equal(result.length,1,word);assert.equal(result[0].href,summary,word);
  }
}
for(const keyword of ['プロジェクト','共同研究']) assert.equal(search(corporate,keyword)[0].url,'chronect-projects.html');
assert.equal(search(corporate,'短時間休息')[0].url,'chronect-news-20240305.html');
for(const q of ['睡眠','時間認知','睡眠中の時間認知','睡眠中の時間認知に関する研究','睡眠中の時間認知に関する研究要旨'])assert.equal(search(hub,q)[0].href,'chronect-hub-research.html');
assert.equal(search(hub,' tb-260917-4826 ')[0].href,'chronect-hub-session.html');
for(const q of ['',' ', '日常','時間選','注意','覚醒','時間選択 主観時間','TB－260917－4826','TB-260917','P-0917-0318','TB-00000000'])assert.equal(search(hub,q).length,0,q);
assert.equal(hub.length,5);assert.equal(corporate.length,24);
assert.deepEqual(Array.from(hub.filter(item=>item.href==='chronect-hub-session.html')[0].keywords),['TB-260917-4826']);

function element(){return{children:[],classList:{add(){},remove(){},contains(){return false}},append(...a){this.children.push(...a)},appendChild(a){this.children.push(a)},addEventListener(){},setAttribute(){},focus(){}};}
const seed=[{number:1,href:'memo-dream.html',title:'最近、同じ場所の夢を見る。 ｜ memo'},{number:3,href:'index.html',title:'トップページ ｜ TIME BACK'},{number:47,href:'partners.html'},{number:48,href:'nodelink-works.html'},{number:49,href:'axion-logistics.html'},{number:49,href:'chronect-hub-session.html'},{number:50,href:'chronect-hub-research.html'}];
for(let i=0;i<items.length;i++){
  const item=items[i],name=names[i],source=read(name),brand=i>=4?'Chronect Hub':'Chronect';
  assert(source.includes('data-page-number="'+item.number+'"'));
  assert(source.includes('data-page-href="'+name+'"'));
  assert(source.includes('data-page-title="'+item.title+' ｜ '+brand+'"'));
  assert(source.includes('>'+item.number+' / 60</button>'));
  assert(source.includes('<h1'+(i<3?' id="article-title"':'')+'>'+item.title+'</h1>'));
  for(const p of item.text.split('\n\n')){
    if(item.number===54&&p.includes('\n')){const [heading,...text]=p.split('\n');assert(source.includes('<h2>'+heading+'</h2><p>'+text.join('\n')+'</p>'));}
    else assert(source.includes('>'+p+'</p>'),'Prose mismatch '+name);
  }
  assert(source.includes('G-DG4X4HMEC2'));assert(source.includes('このサイトの内容はフィクションです。'));
  assert(source.includes('href="archive.css?v=20261029"'));
  assert(source.includes('ページ番号は閲覧の目安です。'));
  assert.equal((source.match(/<form\b/g)||[]).length,1,name);
  assert(!/<!-- 公開本文|候補ファイル|作成前評価|story_designer|SHA-256/.test(source));
  if(i>=4){assert(source.includes('class="hub-shell"'));assert(!source.includes('href="chronect.css"'));assert(source.includes('chronect-hub.js?v=20261029-missing'));}
  else {assert(source.includes('completion-page'));assert(source.includes('href="chronect-projects.css"'));}
  for(const m of source.matchAll(/(?:href|src|action)="([^"#]+)"/g)){
    if(/^(https?:|mailto:|tel:)/.test(m[1]))continue;
    const file=m[1].split(/[?#]/)[0];assert(fs.existsSync(path.join(root,file)),name+' missing '+file);
  }
  for(const m of source.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g))new vm.Script(m[1],{filename:name});
  let saved=JSON.stringify(seed);const nodes=new Map(),context=vm.createContext({document:{body:{dataset:{pageNumber:String(item.number),pageTitle:item.title+' ｜ '+brand,pageHref:name}},getElementById(id){if(!nodes.has(id))nodes.set(id,element());return nodes.get(id)},createElement:element,addEventListener(){}},localStorage:{getItem(){return saved},setItem(k,v){assert.equal(k,'timeback-page-archive-v1');saved=v}},window:{}});
  vm.runInContext(read('chronect-shared.js'),context);vm.runInContext('renderArchive()',context);
  const actual=JSON.parse(saved);assert.equal(actual.length,8);assert.equal(actual.find(p=>p.href===name).number,item.number);
  assert.equal(actual.find(p=>p.href==='partners.html').number,44);assert.equal(actual.find(p=>p.href==='chronect-hub-session.html').number,49);assert.equal(actual.find(p=>p.href==='chronect-hub-research.html').number,50);
  assert.equal(nodes.get('archiveList').children[item.number-1].children[0].href,name,'revisit '+name);
}
assert(read('chronect-projects.html').includes('href="partners.html">代表的な提携企業を見る'));
assert(!read('chronect-hub-session.html').includes('href="business-demonstration.html"'));
for(const name of ['chronect-hub.html','chronect-hub-search.html','chronect-hub-session.html','chronect-hub-research.html',...names.slice(4)]){
  const s=read(name);assert(s.includes('chronect-hub.js?v=20261029-missing'));assert(s.includes('chronect-shared.js?v=20261029-missing'));
}
let registries=0;
for(const name of fs.readdirSync(root).filter(n=>/\.(html|js)$/.test(n))){const s=read(name);if(!s.includes('archiveTitleByNumber'))continue;registries++;const titles=JSON.parse(s.match(/\barchiveTitleByNumber\s*=\s*(\{[^{}]*\})/)[1]),mapping=JSON.parse(s.match(/\{[^{}\r\n]*"partners\.html":44[^{}\r\n]*\}/)[0]);for(let i=0;i<items.length;i++){assert.equal(mapping[names[i]],items[i].number,name);assert.equal(titles[items[i].number],items[i].title+' ｜ '+(i>=4?'Chronect Hub':'Chronect'),name);}assert.equal(mapping['chronect-hub-search.html'],undefined);}
assert.equal(registries,13);
for(const name of fs.readdirSync(root).filter(n=>n.endsWith('.html')))for(const m of read(name).matchAll(/(?:href|src|action)="([^"#]+)"/g)){if(/^(https?:|mailto:|tel:)/.test(m[1]))continue;const target=m[1].split(/[?#]/)[0];assert(fs.existsSync(path.join(root,target)),name+' missing local reference '+target);}
console.log('PASS: 7 exact fixed manuscripts, titles/numbers, all local HTML dependencies, news-to-Hub/project routes, separate exact search databases, old 49/50 and earlier records, new saved-page revisits, cache versions and 13 registries.');
