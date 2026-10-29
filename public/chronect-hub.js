'use strict';

const chronectHubDatabase = [
  {"keywords":["日常環境下での時間選択に関する予備研究要旨","時間選択","日常環境"],"title":"日常環境下での時間選択に関する予備研究要旨","href":"chronect-hub-research-20240711.html","description":"本予備研究は、日常の予定の合間に生じる時間について、活動や休息を選ぶ際の判断条件を整理するものです。"},
  {"keywords":["注意配分と主観時間に関する研究要旨","注意配分","主観時間"],"title":"注意配分と主観時間に関する研究要旨","href":"chronect-hub-research-20251105.html","description":"本研究は、注意を向ける対象が異なる条件で、経過時間の見積もりを比較したものです。"},
  {"keywords":["短時間休息後の覚醒移行に関する検証要旨","覚醒移行","短時間休息"],"title":"短時間休息後の覚醒移行に関する検証要旨","href":"chronect-hub-research-20260218.html","description":"本検証は、短時間休息後に活動へ戻る過程を、最初の応答と、その後の操作の安定性に分けて評価するものです。"},
  {keywords:['睡眠','時間認知','睡眠中の時間認知','睡眠中の時間認知に関する研究','睡眠中の時間認知に関する研究要旨'],title:'睡眠中の時間認知に関する研究要旨',href:'chronect-hub-research.html',description:'睡眠中の経過時間に関する評価方法と、解釈上の留意点をまとめた公開研究要旨です。'},
  {keywords:['TB-260917-4826'],title:'セッション運用記録（参照用抜粋）',href:'chronect-hub-session.html',description:'BAS運用時の位置確認記録から、当該売却セッションの通過実績を抜粋した資料です。'}
];

function findChronectHubMaterials(query) {
  const normalized = String(query || '').trim().toLocaleLowerCase('ja');
  return normalized ? chronectHubDatabase.filter(item => item.keywords.some(keyword => keyword.toLocaleLowerCase('ja') === normalized)) : [];
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
    status.textContent = 'キーワードを入力してください。';
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
