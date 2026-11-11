// Current-code checks for the approved management-code route; no file writes.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const mid=require('./midroute-test-helper.cjs');
const {archiveVersion,compactNumber,facilitySearchEntries,chapterSearchEntries}=require('./archive-order-test-helper.cjs');
const root=path.resolve(__dirname,'..'),read=n=>fs.readFileSync(path.join(root,'public',n),'utf8');
const src=read('chronect-hub.js'),context=vm.createContext({});
vm.runInContext(src.slice(0,src.indexOf('const hubResultsContainer'))+';globalThis.db=chronectHubDatabase;globalThis.find=findChronectHubMaterials;',context);
assert.equal(context.db.length,18);
let queries=0;
for(const e of context.db)for(const q of e.keywords){for(const text of [q,' '+q+' ',q.toLowerCase()]){assert.equal(context.find(text).length,1);assert.equal(context.find(text)[0].href,e.href);queries++;}}
for(const q of ['58241309-R03','58241309-R04','58251309','58241310-R03','58251310-R04','58251310','80574305','80574305-R01','80574305-R02','80574305-R03','80574305-R04 extra','80574305－R04','80574305-R04。','資料分類コード','東央モビリティサービス','R04','生活','TB-260917','']){assert.equal(context.find(q).length,0,q);queries++;}
for(let i=0;i<mid.searchEntries.length;i++)assert.deepEqual(JSON.parse(JSON.stringify(context.db[6+i])),mid.searchEntries[i]);
assert.deepEqual(JSON.parse(JSON.stringify(context.db.slice(11))),[...facilitySearchEntries,...chapterSearchEntries]);
for(const query of ['施設','施設A','施設B','施設D','施設Ｃ','連続','連続業務遂行評価','試験施設管理情報','連続業務遂行試験 実施記録']){
  assert.equal(context.find(query).length,0,query);
  queries++;
}
const no34=read('business-demonstration.html'),no45=read('chronect-hub-session.html');
assert.equal(no34.split(mid.unitAddition).length,2);assert.equal(no45.split(mid.documentAddition).length,2);
assert(!no45.includes('80574305'));assert(!no45.includes('href="business-demonstration.html"'));
for(const e of mid.entries.slice(0,3)){const html=read(e.href),article=html.match(/<article class="hub-document"[\s\S]*?<\/article>/)[0];
  assert(html.includes('data-page-number="'+compactNumber(e.number)+'"'));assert(html.includes('data-page-title="'+e.title+'"'));assert(html.includes('>'+compactNumber(e.number)+' / 120</button>'));
  for(const x of ['G-DG4X4HMEC2','このサイトの内容はフィクションです。','archive.css?v=20261029','chronect-hub.js?v='+archiveVersion,'chronect-shared.js?v='+archiveVersion])assert(html.includes(x),e.href+' '+x);
  assert(!/SECOND SHIFT|秘密|外部指示|無断|まつだ|高瀬|TB-260917|\d{4}-\d{2}-\d{2}|\d+%/.test(article));
  assert.deepEqual([...article.matchAll(/href="([^"]+)"/g)].map(m=>m[1]),['chronect-hub.html']);
}
const codes=read(mid.entries[0].href).match(/<article[\s\S]*?<\/article>/)[0];assert(!/\d{8}/.test(codes));
for(const [c,n]of [['R01','実施概要'],['R02','安全管理'],['R03','行動記録'],['R04','評価資料']])assert(codes.includes(c)&&codes.includes(n));
assert(codes.includes('8桁'));assert(codes.includes('資料管理単位番号-資料分類コード'));
const evaluation=read(mid.entries[1].href).match(/<article[\s\S]*?<\/article>/)[0];
for(const t of ['80574305-R04','BAS','周辺環境','行動判断','身体動作','継続性','案内精度','提携企業での検証'])assert(evaluation.includes(t));
assert(!evaluation.includes('東央'));assert(!evaluation.includes('58241309'));
const partner=read(mid.entries[2].href).match(/<article[\s\S]*?<\/article>/)[0];
for(const t of ['東央モビリティサービス株式会社','Chronect','BAS','業務補助','行動継続率','手順完了率','再現性'])assert(partner.includes(t));
for(const t of ['指定地点へ移動','指定された物品を受け取る','対象物を確認する','所定の場所へ運搬する','試験対象者 訪問履歴一覧'])assert(partner.includes(t));
assert(read('partners.html').includes('東央モビリティサービス株式会社'));
for(const n of ['search.html','business-shared.js','chronect-shared.js'])assert(!read(n).includes('80574305-R04'),n+' search domains remain independent');
console.log('PASS MIDROUTE: '+queries+' positive/negative exact-search cases; approved code definitions and disclosure boundaries; 34/45 additive metadata; 59–61 identities; separate search domains and No.45→34 exclusion.');
