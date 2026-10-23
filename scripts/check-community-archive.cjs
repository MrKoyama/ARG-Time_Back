const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../public');
const expected = {'business-community.html':42,'business-demonstration-area.html':43,'partners.html':47,'nodelink-works.html':48,'axion-logistics.html':49};
let registries = 0, scripts = 0;
const pageNumbers = new Map();
for (const name of fs.readdirSync(root)) {
  if (!/\.(html|js)$/.test(name)) continue;
  const source = fs.readFileSync(path.join(root,name),'utf8');
  if (name.endsWith('.js')) { new vm.Script(source,{filename:name}); scripts++; }
  else {
    for (const match of source.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)) {
      new vm.Script(match[1],{filename:name}); scripts++;
    }
    const number = source.match(/data-page-number="(\d+)"/);
    if (number) {
      assert(!pageNumbers.has(number[1]),`Duplicate page ${number[1]}: ${name}`);
      pageNumbers.set(number[1],name);
    }
    if (expected[name]) {
      assert.equal(Number(number?.[1]),expected[name]);
      assert(source.includes(`>${expected[name]} / 60</button>`));
    }
  }
  if (source.includes('archiveTitleByNumber')) {
    const titles = JSON.parse(source.match(/\barchiveTitleByNumber\s*=\s*(\{[^{}]*\})/)[1]);
    assert.equal(titles[42],'地域連携の取り組み ｜ TIME BACK for Business');
    assert.equal(titles[47],'提携企業一覧 ｜ TIME BACK for Business');
    assert.equal(titles[43],'生活環境実証エリア ｜ TIME BACK for Business');
    for (const n of [44,45,46]) assert.equal(titles[n],undefined);
    const mappings = [...source.matchAll(/\{[^{}\r\n]*"partners\.html":47[^{}\r\n]*\}/g)];
    assert(mappings.length,`Missing URL registry: ${name}`);
    for (const match of mappings) {
      const mapping = JSON.parse(match[0]);
      for (const [href,n] of Object.entries(expected)) assert.equal(mapping[href],n);
    }
    registries++;
  }
}
const search = fs.readFileSync(path.join(root,'business-search.html'),'utf8');
const database = vm.runInNewContext(search.match(/const businessSearchDatabase=(\[[\s\S]*?\n    \]);/)[0]+';businessSearchDatabase');
const results = q => database.filter(item=>item.keywords.some(k=>k.toLocaleLowerCase('ja')===q.trim().toLocaleLowerCase('ja')));
assert.equal(results('明浜商店街振興会').length,1);
assert.equal(results(' 明浜商店街振興会 ')[0].url,'business-community.html');
assert.equal(results('明浜商店街').length,0);
assert.equal(results('生活環境実証エリア').length,1);
assert.equal(results(' 生活環境実証エリア ')[0].url,'business-demonstration-area.html');
assert.equal(results('生活環境実証').length,0);
const areaPage = fs.readFileSync(path.join(root,'business-demonstration-area.html'),'utf8');
assert(areaPage.includes('TIME BACK事業センター内部に設けた検証施設'));
assert(areaPage.includes('G-DG4X4HMEC2'));
for (const match of areaPage.matchAll(/(?:href|src)="([^"#?]+)"/g)) {
  if (/^(?:https?:|mailto:|tel:)/.test(match[1])) continue;
  assert(fs.existsSync(path.join(root,match[1])),`Missing local dependency ${match[1]}`);
}
const demonstration = fs.readFileSync(path.join(root,'business-demonstration.html'),'utf8');
assert(!demonstration.includes('周辺には公園や商店街があり、'));
const node = {addEventListener(){}};
const saved = [{number:42,href:'partners.html'},{number:43,href:'nodelink-works.html'},{number:44,href:'axion-logistics.html'}];
const context = {document:{body:{dataset:{pageArchive:'exclude'}},getElementById(){return node},addEventListener(){}},localStorage:{getItem(){return JSON.stringify(saved)},setItem(){}},window:{}};
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root,'business-shared.js'),'utf8'),context);
assert.equal(JSON.stringify(vm.runInContext('loadArchive().map(p=>p.number)',context)),JSON.stringify([47,48,49]));
console.log(`PASS: ${registries} archive registries, ${scripts} script syntax checks, unique page numbers, exact keyword search and saved-record migration.`);
