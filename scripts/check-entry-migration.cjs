// Read-only regression checks for the index/memo entry-point move.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../public');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const memoTitle = '最近、同じ場所の夢を見る。 ｜ memo';
const topTitle = 'トップページ ｜ TIME BACK';

function functionSource(source, name) {
  const start = source.indexOf(`function ${name}(`);
  assert(start >= 0, `Missing ${name}`);
  let depth = 0, quote = '', escaped = false;
  const opening = source.indexOf('{', start);
  for (let i = opening; i < source.length; i++) {
    const ch = source[i];
    if (quote) {
      if (escaped) escaped = false;
      else if (ch === '\\') escaped = true;
      else if (ch === quote) quote = '';
    } else if (ch === '"' || ch === "'" || ch === '`') quote = ch;
    else if (ch === '{') depth++;
    else if (ch === '}' && --depth === 0) return source.slice(start, i + 1);
  }
  throw new Error(`Unterminated ${name}`);
}

const registryNames = fs.readdirSync(root).filter(name => /\.(html|js)$/.test(name) && read(name).includes('archiveTitleByNumber'));
assert.equal(registryNames.length, 13);
let cases = 0;
for (const name of registryNames) {
  const source = read(name);
  const titles = source.match(/\barchiveTitleByNumber\s*=\s*(\{[^{}]*\})/);
  assert(titles, `Missing title map: ${name}`);
  const mappings = [...source.matchAll(/\{[^{}\r\n]*"partners\.html":44[^{}\r\n]*\}/g)];
  assert(mappings.length, `Missing URL map: ${name}`);
  for (const match of mappings) {
    const mapping = JSON.parse(match[0]);
    assert.equal(mapping['index.html'], 1, name);
    assert.equal(mapping['time-back.html'], 3, name);
    assert.equal(mapping['memo-dream.html'], undefined, name);
    assert.equal(mapping['partners.html'], 44, name);
    assert.equal(mapping['nodelink-works.html'], 45, name);
    assert.equal(mapping['axion-logistics.html'], 46, name);
  }
  const globalMaps = [...source.matchAll(/(?:const|let)\s+(businessPageNumberByHref|pageNumberByHref)\s*=\s*(\{[^{}]*\})/g)]
    .map(match => `const ${match[1]}=${match[2]};`).join('\n');
  const load = seed => {
    const context = vm.createContext({localStorage:{getItem:()=>typeof seed === 'string' ? seed : JSON.stringify(seed),setItem(){}}});
    vm.runInContext(`const archiveStorageKey='timeback-page-archive-v1'; const archiveTitleByNumber=${titles[1]};${globalMaps}\n${functionSource(source, 'loadArchive')}`, context);
    return JSON.parse(JSON.stringify(vm.runInContext('loadArchive()', context)));
  };
  const fixtures = [
    {seed:[{number:1,href:'memo-dream.html',title:memoTitle},{number:3,href:'index.html',title:topTitle}], expected:[[1,'index.html',memoTitle],[3,'time-back.html',topTitle]]},
    {seed:[{number:1,href:'index.html',title:'トップページ | TIME BACK'}], expected:[[3,'time-back.html',topTitle]]},
    {seed:[{number:2,href:'index.html',title:topTitle}], expected:[[3,'time-back.html',topTitle]]},
    {seed:[{number:1,href:'index.html',title:memoTitle},{number:3,href:'time-back.html',title:topTitle}], expected:[[1,'index.html',memoTitle],[3,'time-back.html',topTitle]]},
    {seed:[{number:42,href:'partners.html',title:'old'}], expected:[[44,'partners.html','提携企業一覧 ｜ TIME BACK for Business']]},
    {seed:[{number:47,href:'partners.html',title:'old'},{number:48,href:'nodelink-works.html',title:'old'},{number:49,href:'axion-logistics.html',title:'old'}],expected:[[44,'partners.html','提携企業一覧 ｜ TIME BACK for Business'],[45,'nodelink-works.html','トップページ ｜ 株式会社ノードリンク・ワークス'],[46,'axion-logistics.html','トップページ ｜ アクシオン・ロジスティクス株式会社']]},
    {seed:[{number:44,href:'partners.html',title:'new'},{number:45,href:'nodelink-works.html',title:'new'},{number:46,href:'axion-logistics.html',title:'new'}],expected:[[44,'partners.html','提携企業一覧 ｜ TIME BACK for Business'],[45,'nodelink-works.html','トップページ ｜ 株式会社ノードリンク・ワークス'],[46,'axion-logistics.html','トップページ ｜ アクシオン・ロジスティクス株式会社']]},
    {seed:[{number:42,href:'business-community.html',title:'keep'},{number:43,href:'business-demonstration-area.html',title:'keep'}],expected:[[42,'business-community.html','地域連携の取り組み ｜ TIME BACK for Business'],[43,'business-demonstration-area.html','生活環境実証エリア ｜ TIME BACK for Business']]},
    {seed:[],expected:[]}, {seed:'invalid JSON',expected:[]}, {seed:'{}',expected:[]}
  ];
  for (const fixture of fixtures) {
    const migrated = load(fixture.seed);
    assert.deepEqual(migrated.map(p=>[p.number,p.href,p.title]), fixture.expected, name);
    assert.deepEqual(load(migrated), migrated, `Non-idempotent migration: ${name}`);
    cases++;
  }
}

const entry = read('index.html'), top = read('time-back.html'), alias = read('memo-dream.html');
assert(entry.includes('data-page-number="1"'));
assert(entry.includes('data-page-href="index.html"'));
assert(entry.includes('href="memo-timeback-review.html"'));
assert(entry.includes('href="time-back.html"'));
assert(entry.includes('<title>最近、同じ場所の夢を見る。 | memo</title>'));
assert(top.includes("href: 'time-back.html'"));
assert(top.includes('number: 3'));
assert(top.includes('<title>トップページ | TIME BACK</title>'));
assert(!/data-page-number=/.test(alias));
assert(alias.includes('location.replace'));
assert(alias.includes('location.search') && alias.includes('location.hash'));
assert(alias.includes('href="index.html"'));

// Redirect execution preserves the old external query/fragment, with no loop.
const redirect = [...alias.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].find(m=>m[1].includes('location.replace'));
assert(redirect);
let target;
const location = {search:'?from=old',hash:'#author',replace:value=>{target=value;}};
vm.runInNewContext(redirect[1], {location,window:{location}});
assert.equal(target, 'index.html?from=old#author');

const numbers = new Map();
for (const name of fs.readdirSync(root).filter(n=>n.endsWith('.html'))) {
  const source = read(name);
  assert(source.includes('G-DG4X4HMEC2'), `Missing GA: ${name}`);
  const n = source.match(/data-page-number="(\d+)"/) || source.match(/\bcurrentPage\s*=\s*\{\s*number\s*:\s*(\d+)/);
  if (n) {assert(!numbers.has(n[1]), `Duplicate number ${n[1]}`);numbers.set(n[1],name);}
  for (const match of source.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/g)) {
    if (/aria-label="TIME BACK トップページ"/.test(match[0])) assert.equal(match[1],'time-back.html',name);
    if (match[1] === 'memo-dream.html') assert.fail(`Stale dream link: ${name}`);
  }
}
assert.equal(numbers.size, 49);
assert.deepEqual([...numbers.keys()].map(Number).sort((a,b)=>a-b),Array.from({length:49},(_,i)=>i+1));
assert.equal(numbers.get('1'),'index.html');
const topPageSource = read(numbers.get('3') || 'time-back.html');
assert(topPageSource.includes("href: 'time-back.html'"));
assert(read('chronect-services.html').includes('href="time-back.html">TIME BACK公式サイト'));
assert(read('memo-timeback-review.html').includes('href="index.html"'));
assert(!alias.includes('chronect-shared.js') && !alias.includes('business-shared.js'));
console.log(`PASS: ${registryNames.length} archive URL maps, ${cases} migration/idempotency fixtures, entry/top links, legacy redirect, unique archive pages and GA.`);
