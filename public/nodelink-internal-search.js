(() => {
  const params = new URLSearchParams(window.location.search);
  if (!params.has('q')) return;

  // The search result is a view of the form, not a separate archive entry.
  document.body.dataset.pageArchive = 'exclude';
  document.getElementById('archiveButton').textContent = 'ページアーカイブ';

  const documents = [
    { keyword: '人材情報', title: '人材情報一覧', href: 'nodelink-personnel.html' },
    { keyword: '利用状況照合', title: '利用状況照合記録', href: 'nodelink-usage-review.html' },
    { keyword: '保守参照経路', title: '外部参照経路 照会控え', href: 'nodelink-external-reference-log.html' }
  ];
  const query = params.get('q').trim();
  const keyword = query.toLocaleLowerCase('ja');
  const results = documents.filter(entry => entry.keyword === keyword);

  document.getElementById('nodelink-query').value = query;
  document.getElementById('nodelink-results').hidden = false;
  document.getElementById('nodelink-status').textContent = results.length
    ? `${results.length}件の資料が見つかりました。`
    : '該当する資料はありません。';

  const list = document.getElementById('nodelink-result-list');
  for (const result of results) {
    const link = document.createElement('a');
    link.textContent = result.title;
    link.href = result.href;
    const item = document.createElement('li');
    item.append(link);
    list.append(item);
  }
})();
