'use strict';

const chronectHubDatabase = [
  {keyword:'睡眠中の時間認知に関する研究要旨',title:'睡眠中の時間認知に関する研究要旨',href:'chronect-hub.html#research-summary',description:'睡眠中の経過時間に関する評価方法と、解釈上の留意点をまとめた公開研究要旨です。'},
  {keyword:'TB-260917-4826',title:'セッション運用記録（参照用抜粋）',href:'chronect-hub-session.html',description:'BAS運用時の位置確認記録から、当該売却セッションの通過実績を抜粋した資料です。'}
];

function findChronectHubMaterials(query) {
  const normalized = String(query || '').trim().toLocaleLowerCase('ja');
  return normalized ? chronectHubDatabase.filter(item => item.keyword.toLocaleLowerCase('ja') === normalized) : [];
}

const hubResultsContainer = document.getElementById('hubResultsContainer');
if (hubResultsContainer) {
  const query = new URLSearchParams(window.location.search).get('q') || '';
  const cleaned = query.trim();
  document.getElementById('hubSearchInput').value = cleaned;
  const display = document.getElementById('hubQueryDisplay');
  const status = document.getElementById('hubSearchStatus');
  if (!cleaned) {
    display.textContent = '';
    status.textContent = '資料名または管理コードを入力してください。';
  } else {
    display.textContent = '「' + cleaned + '」の検索結果';
    const results = findChronectHubMaterials(cleaned);
    status.textContent = results.length ? '該当する資料が ' + results.length + ' 件見つかりました。' : '該当する資料はありません。入力内容をご確認ください';
    results.forEach(result => {
      const article = document.createElement('article');
      article.className = 'hub-result';
      const heading = document.createElement('h3');
      const link = document.createElement('a');
      const description = document.createElement('p');
      link.href = result.href;
      link.textContent = result.title;
      description.textContent = result.description;
      heading.appendChild(link);
      article.append(heading, description);
      hubResultsContainer.appendChild(article);
    });
  }
}
