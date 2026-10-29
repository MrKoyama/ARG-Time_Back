// Read-only checks for the approved Chronect Hub introductory route.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../public');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const summaryTitle = '睡眠中の時間認知に関する研究要旨';
const expected = {
  'chronect-news-20260822.html': [47, '睡眠中の時間認知に関する研究成果を発表 ｜ Chronect'],
  'chronect-hub.html': [48, 'トップページ ｜ Chronect Hub'],
  'chronect-hub-session.html': [49, 'セッション運用記録（参照用抜粋） ｜ Chronect Hub'],
  'chronect-hub-research.html': [50, '睡眠中の時間認知に関する研究要旨 ｜ Chronect Hub']
};
const files = [...Object.keys(expected), 'chronect-hub-search.html'];

function element() {
  return {children: [], textContent: '', classList: {add(){},remove(){},contains(){return false;}},
    append(...children){this.children.push(...children);}, appendChild(child){this.children.push(child);},
    addEventListener(){},setAttribute(){},focus(){}};
}
function environment(dataset, search = '', seed = []) {
  let saved = JSON.stringify(seed), writes = 0;
  const nodes = new Map();
  const document = {body:{dataset,classList:{add(){},remove(){}}},addEventListener(){},
    getElementById(id){if (!nodes.has(id)) nodes.set(id, element());return nodes.get(id);},createElement:element};
  const context = vm.createContext({document,URLSearchParams,window:{location:{search}},
    localStorage:{getItem(){return saved;},setItem(key,value){assert.equal(key,'timeback-page-archive-v1');saved=value;writes++;}}});
  return {context,nodes,getSaved:()=>JSON.parse(saved),getWrites:()=>writes};
}

const searchCases = [
  ['TB-260917-4826','chronect-hub-session.html'],
  ['  tb-260917-4826  ','chronect-hub-session.html'],
  [summaryTitle,'chronect-hub-research.html'],
  [' '+summaryTitle+' ','chronect-hub-research.html'],
  ['',null],['   ',null],['TB-260917',null],['TB-260917-4826 extra',null],
  ['TB－260917－4826',null],['TB-260917 -4826',null],['TB-00000000',null],
  ['P-0917-0318',null],['睡眠','chronect-hub-research.html'],['時間認知','chronect-hub-research.html'],['睡眠中の時間認知','chronect-hub-research.html'],['睡眠中の時間認知に関する研究','chronect-hub-research.html'],['睡眠 時間認知',null],['眠',null],['TB-260917-4826 睡眠',null],['睡眠中の時間認知に関する研究成果を発表',null],
  ['<img src=x onerror=alert(1)>',null]
];
for (const [query,href] of searchCases) {
  const env = environment({pageArchive:'exclude'},'?q='+encodeURIComponent(query),[{number:1,href:'index.html',title:'最近、同じ場所の夢を見る。 ｜ memo'}]);
  vm.runInContext(read('chronect-hub.js'),env.context);
  const results = env.nodes.get('hubResultsContainer').children;
  assert.equal(results.length,href?1:0,query);
  if (href) {
    assert.equal(results[0].children[0].children[0].href,href,query);
    assert(!results[0].children[0].children[0].textContent.includes('.html'));
  } else {
    assert.equal(env.nodes.get('hubSearchStatus').textContent,query.trim()?'該当する資料はありません。入力内容をご確認ください':'キーワードを入力してください。');
  }
  vm.runInContext(read('chronect-shared.js'),env.context);
  vm.runInContext('renderArchive()',env.context);
  assert.equal(env.getWrites(),0,'EX must not register even on archive opening');
  assert.equal(env.getSaved().length,1);
}

const legacy = [
  {number:1,href:'memo-dream.html',title:'最近、同じ場所の夢を見る。 ｜ memo'},
  {number:3,href:'index.html',title:'トップページ ｜ TIME BACK'},
  {number:47,href:'partners.html'}, {number:48,href:'nodelink-works.html'}, {number:49,href:'axion-logistics.html'},
  {number:42,href:'business-community.html'}, {number:43,href:'business-demonstration-area.html'}
];
for (const [name,[number,title]] of Object.entries(expected)) {
  const env = environment({pageNumber:String(number),pageTitle:title,pageHref:name},'',legacy);
  vm.runInContext(read('chronect-shared.js'),env.context);
  const saved = env.getSaved();
  assert.equal(saved.length,8);
  for (const [href,n] of [['index.html',1],['time-back.html',3],['partners.html',44],['nodelink-works.html',45],['axion-logistics.html',46],['business-community.html',42],['business-demonstration-area.html',43],[name,number]]) {
    assert.equal(saved.find(page=>page.href===href)?.number,n,name+' '+href);
  }
  vm.runInContext('renderArchive()',env.context);
  const entries = env.nodes.get('archiveList').children;
  assert.equal(entries.length,60);
  assert.equal(entries[number-1].children[0].href,name,'visited page must be revisitable');
  assert.equal(env.getSaved().length,8,'reopening must not duplicate entries');
}

let registries = 0;
for (const name of fs.readdirSync(root).filter(name=>/\.(html|js)$/.test(name))) {
  const source = read(name);
  if (!source.includes('archiveTitleByNumber')) continue;
  registries++;
  const titles = JSON.parse(source.match(/\barchiveTitleByNumber\s*=\s*(\{[^{}]*\})/)[1]);
  const mapping = JSON.parse(source.match(/\{[^{}\r\n]*"partners\.html":44[^{}\r\n]*\}/)[0]);
  for (const [href,[number,title]] of Object.entries(expected)) {
    assert.equal(titles[number],title,name);
    assert.equal(mapping[href],number,name);
  }
  assert.equal(mapping['chronect-hub-search.html'],undefined);
  for(let n=58;n<=60;n++) assert.equal(titles[n],undefined);
}
assert.equal(registries,13);

for (const name of files) {
  const source = read(name);
  assert(source.includes('G-DG4X4HMEC2'));
  assert(source.includes('このサイトの内容はフィクションです。'));
  assert(/<script src="chronect-shared\.js(?:\?v=20261029(?:-missing)?)?"><\/script>/.test(source));
  assert(source.includes('name="viewport"'));
  if (expected[name]) {
    assert(source.includes('data-page-number="'+expected[name][0]+'"'));
    assert(source.includes('>'+expected[name][0]+' / 60</button>'));
  } else {
    assert(source.includes('data-page-archive="exclude"'));
    assert(!source.includes('data-page-number='));
  }
  for (const match of source.matchAll(/(?:href|src|action)="([^"#]+)"/g)) {
    const target = match[1].split(/[?#]/)[0];
    if (/^(?:https?:|mailto:|tel:)/.test(target)) continue;
    assert(fs.existsSync(path.join(root,target)),name+' missing '+target);
    if (match[1].includes('#')) assert(read(target).includes('id="'+match[1].split('#')[1]+'"'));
  }
  for (const match of source.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)) new vm.Script(match[1],{filename:name});
}
const proposal = fs.readFileSync(path.resolve(__dirname,'../docs/agent_runs/2026-10-27-hub-ready/PROPOSAL.md'),'utf8').replace(/\r\n/g,'\n');
for (const [start,end,name] of [['## 研究本文案','## 公開要旨案','chronect-news-20260822.html'],['## 公開要旨案：'+summaryTitle,'## 制作・検証条件','chronect-hub-research.html']]) {
  const text = proposal.split(start+'\n\n')[1].split('\n\n'+end)[0].trim();
  for (const paragraph of text.split('\n\n')) assert(read(name).includes('<p>'+paragraph+'</p>'),'Approved paragraph differs: '+name);
}
const record = read('chronect-hub-session.html');
for (const value of ['TB-260917-4826','2026-09-17','13:00〜17:00','4時間','BAS運用時の位置確認記録','当該売却セッションの売却者本人','実測・通過実績']) assert(record.includes(value));
const routeText = '対象セッションに係る位置確認情報より、明浜みどり公園の通過確認に続き、住宅間に位置する細道を経由して明浜商店街へ至る区間を抜粋した。本記録における位置確認の対象は、当該時間帯の売却者本人であり、各地点の記載は経路設定ではなく通過実績に基づく。';
assert(record.includes('<p>'+routeText+'</p>'));
assert(!/<table|<figure|hub-route/.test(record));
assert(!record.includes('参照：事業センターアクセス'));
assert(!record.includes('href="business-demonstration.html"'));
assert(record.includes('href="chronect-hub.html"'));
assert(read('chronect-services.html').includes('href="business.html"'));
assert(read('business-cases.html').includes('ユーザー参加型実証プログラム'));
assert(read('business-search.html').includes("url:'business-demonstration.html'"));
assert(!/memo-|高瀬|無断実験|秘密施設|記憶移転/.test(record));
assert(read('chronect-news-20260822.html').includes('href="chronect-hub-research.html"'));
assert(read('chronect-news-20260822.html').includes('href="chronect.css"'));
assert(!read('chronect-hub.html').includes('本研究は、睡眠中の経過時間'));
assert(read('chronect-hub-research.html').includes('href="chronect-hub.html"'));

const hubPages = ['chronect-hub.html','chronect-hub-search.html','chronect-hub-session.html','chronect-hub-research.html'];
for(const name of hubPages){
  const source=read(name);
  assert.equal((source.match(/<form\b/g)||[]).length,1,name+' exactly one search');
  assert(source.includes('action="chronect-hub-search.html"'));
  assert(source.includes('placeholder="キーワードを入力"'));
  assert(source.includes('>キーワード検索</label>'));
  assert(source.includes('関連する語句のほか、資料名や管理コードからも検索できます。'));
  assert(source.includes('Chronect Hubに収録された情報を検索・閲覧できます。'));
  assert(source.includes('href="images/chronect-hub-favicon.svg"'));
  for(const resource of ['chronect-hub.css','chronect-hub.js','chronect-shared.js']) assert(source.includes(resource+'?v=20261029'),name+' cache version '+resource);
  assert(!source.includes('href="chronect.css"'));
  assert(!source.includes('action="chronect-search.html"'));
  assert(!/class="site-header"|class="site-footer"|企業情報|採用情報/.test(source));
  assert(source.includes('>CHRONECT HUB</a>'));
  assert(source.includes('ページ番号は閲覧の目安です。'));
}
const oldHub = environment({pageArchive:'exclude'},'',[
  {number:48,href:'chronect-hub.html',title:'Chronect Hub ｜ Chronect'},
  {number:49,href:'chronect-hub-session.html',title:'セッション運用記録（参照用抜粋） ｜ Chronect'}
]);
vm.runInContext(read('chronect-shared.js'),oldHub.context);
const migrated = JSON.parse(JSON.stringify(vm.runInContext('loadArchive()',oldHub.context)));
assert.deepEqual(migrated.map(p=>[p.number,p.href,p.title]),[
  [48,'chronect-hub.html','トップページ ｜ Chronect Hub'],
  [49,'chronect-hub-session.html','セッション運用記録（参照用抜粋） ｜ Chronect Hub']
]);
const css=read('chronect-hub.css');
assert(!/linear-gradient|radial-gradient|box-shadow|var\(/.test(css));
for(const color of ['#0B0B0B','#121212','#D0D0D0','#F2F2F2','#383838'])assert(css.includes(color));
assert(fs.existsSync(path.join(root,'images/chronect-hub-favicon.svg')));

new vm.Script(read('chronect-hub.js'));
console.log(`PASS: ${searchCases.length} rendered whitelist cases, EX no writes, 4 numbered-page legacy/revisit cases, 13 registries, approved prose, visible session fields, route order, GA and local dependencies.`);
