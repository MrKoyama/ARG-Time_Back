// Synchronize community/facility pages and the three relocated pages across archive registries.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../public');
const moves = [
  ['partners.html', 42, 47, '提携企業一覧 ｜ TIME BACK for Business'],
  ['nodelink-works.html', 43, 48, 'トップページ ｜ 株式会社ノードリンク・ワークス'],
  ['axion-logistics.html', 44, 49, 'トップページ ｜ アクシオン・ロジスティクス株式会社']
];
const communityTitle = '地域連携の取り組み ｜ TIME BACK for Business';
let changed = 0;
for (const name of fs.readdirSync(root)) {
  if (!/\.(html|js)$/.test(name)) continue;
  const filename = path.join(root, name);
  const before = fs.readFileSync(filename, 'utf8');
  let source = before;
  for (const [href, oldNumber, newNumber, title] of moves) {
    source = source.replaceAll(JSON.stringify(String(oldNumber))+':'+JSON.stringify(title), JSON.stringify(String(newNumber))+':'+JSON.stringify(title));
    source = source.replaceAll(JSON.stringify(href)+':'+oldNumber, JSON.stringify(href)+':'+newNumber);
    if (name === href) {
      source = source.replace(`data-page-number="${oldNumber}"`, `data-page-number="${newNumber}"`);
      source = source.replace(`>${oldNumber} / 60</button>`, `>${newNumber} / 60</button>`);
    }
  }
  if (source.includes('archiveTitleByNumber') && !source.includes('"42":'+JSON.stringify(communityTitle))) {
    const anchor = '"41":"ユーザー参加型実証プログラム ｜ TIME BACK for Business"';
    if (!source.includes(anchor)) throw new Error('Missing title anchor: '+name);
    source = source.replaceAll(anchor, anchor+',"42":'+JSON.stringify(communityTitle));
  }
  if (source.includes('"business-demonstration.html":41') && !source.includes('"business-community.html":42')) {
    source = source.replaceAll('"business-demonstration.html":41', '"business-demonstration.html":41,"business-community.html":42');
  }
  if (source.includes('archiveTitleByNumber') && !source.includes('"43":"生活環境実証エリア ｜ TIME BACK for Business"')) {
    const anchor = '"42":'+JSON.stringify(communityTitle);
    if (!source.includes(anchor)) throw new Error('Missing community title: '+name);
    source = source.replaceAll(anchor, anchor+',"43":"生活環境実証エリア ｜ TIME BACK for Business"');
  }
  if (source.includes('"business-community.html":42') && !source.includes('"business-demonstration-area.html":43')) {
    source = source.replaceAll('"business-community.html":42', '"business-community.html":42,"business-demonstration-area.html":43');
  }
  if (source !== before) { fs.writeFileSync(filename, source); changed++; }
}
console.log(`Updated ${changed} archive/page files.`);
