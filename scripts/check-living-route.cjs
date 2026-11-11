// Read-only checks of the approved living-route addition and its disclosure limits.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const bridge=require('./archive-order-test-helper.cjs');
const read=name=>fs.readFileSync(path.join(bridge.root,'public',name),'utf8');
const href='chronect-hub-research-continuous-action.html',title='環境変化下における連続行動支援の評価';
const paragraphs=[
 '本研究では、生活動線や設備配置の変化が、連続した身体動作の安定性に与える影響を評価した。個人の動作特性に応じた調整を行い、複数の環境条件下で行動支援の精度を比較した。',
 '姿勢の安定性、環境変化への適応時間、動作の継続性、一連の手順の完了率を評価指標とした。',
 '個人特性に応じた調整によって、動作の安定性と手順の再現性に改善が認められた。一方、複雑な環境下での継続的な動作支援には、さらなる検証が必要である。'
];
const html=read(href),article=html.match(/<article class="hub-document"[\s\S]*?<\/article>/)[0];
assert.deepEqual([...article.matchAll(/<p>([^<]*)<\/p>/g)].map(m=>m[1]),paragraphs);
assert(html.includes('<h1>'+title+'</h1>'));assert(html.includes('data-page-number="44"'));assert(html.includes('>44 / 120</button>'));
for(const value of ['G-DG4X4HMEC2','このサイトの内容はフィクションです。','archive.css?v=20261029','chronect-hub.js?v=20261111-bas-chapter3-v1'])assert(html.includes(value));
assert(!/SECOND SHIFT|外部指示|秘密実験|まつだ|高瀬|TB-|著者|所属|発表日|研究日|管理番号|<time|<table|<canvas/.test(article));
assert.deepEqual([...article.matchAll(/href="([^"]+)"/g)].map(m=>m[1]),['chronect-hub.html']);
const map=read('business-demonstration.html');assert(map.includes('<h3>周辺環境について</h3><p>'+bridge.livingParagraph+'</p>'));
assert(!/<(?:strong|em|mark|u)[^>]*>生活動線/.test(map));
const hub=read('chronect-hub.js'),code=hub.slice(0,hub.indexOf('const hubResultsContainer'));
const context=vm.createContext({});vm.runInContext(code+';globalThis.db=chronectHubDatabase;globalThis.find=findChronectHubMaterials;',context);
const oldCode=bridge.legacyFs.readFileSync(path.join(bridge.root,'public/chronect-hub.js'),'utf8');
const oldContext=vm.createContext({});vm.runInContext(oldCode.slice(0,oldCode.indexOf('const hubResultsContainer'))+';globalThis.db=chronectHubDatabase;',oldContext);
assert.equal(context.db.length,18);assert.deepEqual(JSON.parse(JSON.stringify(context.db.slice(0,5))),JSON.parse(JSON.stringify(oldContext.db)));
let queries=0;for(const item of oldContext.db)for(const q of item.keywords){const results=context.find(' '+q+' ');assert.equal(results.length,1,q);assert.equal(results[0].href,item.href,q);queries++;}
for(const q of ['生活動線',' 生活動線 ','\t生活動線\n']){assert.equal(context.find(q).length,1);assert.equal(context.find(q)[0].href,href);queries++;}
for(const q of ['生活','動線','生活動線 extra','生活 動線','生活動線。',title,'','TB-260917','P-0917-0318','TB-00000000']){assert.equal(context.find(q).length,0,q);queries++;}
assert.equal(context.find(' tb-260917-4826 ')[0].href,'chronect-hub-session.html');
for(const name of ['chronect-hub-research-20251105.html','chronect-hub-session.html','index.html','memo-timeback-review.html','chronect-research.html','chronect-news-20250924.html','chronect-news-20260418.html','chronect-news-20260714.html'])bridge.canonicalPublic('public/'+name,fs.readFileSync(path.join(bridge.root,'public',name)));
assert(!read('chronect-hub-session.html').includes('href="business-demonstration.html"'));
assert(read('chronect-hub-search.html').includes('data-page-archive="exclude"'));
assert(read('chronect-hub-search.html').includes('chronect-hub.js?v=20261111-no56-rule-v1'));
console.log('PASS LIVING ROUTE: exact approved manuscript/No.58, public disclosure limits, No.34 paragraph, '+queries+' search fixtures, original five records unchanged, No.44 held and protected story pages unchanged.');
