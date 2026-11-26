(() => {
  const params = new URLSearchParams(window.location.search);
  if (!params.has('q')) return;

  // The search result is a view of the form, not a separate archive entry.
  document.body.dataset.pageArchive = 'exclude';
  document.getElementById('archiveButton').textContent = 'EX';

  const documents = [
    { keyword: "人材情報", title: "人材情報一覧", href: "nodelink-personnel.html" },
    { keyword: "社内情報管理基盤", title: "社内情報管理基盤 業務一覧", href: "nodelink-info-duties.html" },
    { keyword: "資料検索基盤", title: "潜入後の業務", href: "takase-infiltration-duties.html" },
    { keyword: "法人利用管理記録", title: "法人利用管理記録", href: "nodelink-corporate-usage.html" },
    { keyword: "利用実績照合", aliases: ["利用実績照合記録"], title: "調査の停滞", href: "takase-investigation-stall.html" },
    { keyword: "法人機器保守管理", title: "法人機器 保守管理記録", href: "nodelink-device-maintenance.html" },
    { keyword: "機器動作記録", title: "証拠の発見", href: "takase-evidence-discovery.html" }
  ];
  const query = params.get('q').trim();
  const keyword = query.toLocaleLowerCase('ja');
  const results = documents.filter(entry => entry.keyword === keyword || entry.aliases?.includes(keyword));

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
