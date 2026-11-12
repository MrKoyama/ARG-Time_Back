'use strict';

const chronectHubDatabase = [
  {"keywords":["日常環境下での時間選択に関する予備研究要旨","時間選択","日常環境"],"title":"日常環境下での時間選択に関する予備研究要旨","href":"chronect-hub-research-20240711.html","description":"本予備研究は、日常の予定の合間に生じる時間について、活動や休息を選ぶ際の判断条件を整理するものです。"},
  {"keywords":["注意配分と主観時間に関する研究要旨","注意配分","主観時間"],"title":"注意配分と主観時間に関する研究要旨","href":"chronect-hub-research-20251105.html","description":"本研究は、注意を向ける対象が異なる条件で、経過時間の見積もりを比較したものです。"},
  {"keywords":["短時間休息後の覚醒移行に関する検証要旨","覚醒移行","短時間休息"],"title":"短時間休息後の覚醒移行に関する検証要旨","href":"chronect-hub-research-20260218.html","description":"本検証は、短時間休息後に活動へ戻る過程を、最初の応答と、その後の操作の安定性に分けて評価するものです。"},
  {keywords:['睡眠','時間認知','睡眠中の時間認知','睡眠中の時間認知に関する研究','睡眠中の時間認知に関する研究要旨'],title:'睡眠中の時間認知に関する研究要旨',href:'chronect-hub-research.html',description:'睡眠中の経過時間に関する評価方法と、解釈上の留意点をまとめた公開研究要旨です。'},
  {keywords:['TB-260917-4826'],title:'セッション運用記録（参照用抜粋）',href:'chronect-hub-session.html',description:'BAS運用時の位置確認記録から、当該売却セッションの通過実績を抜粋した資料です。'},
  {"keywords":["生活動線"],"title":"環境変化下における連続行動支援の評価","href":"chronect-hub-research-continuous-action.html","description":"本研究では、生活動線や設備配置の変化が、連続した身体動作の安定性に与える影響を評価した。"},
  {"keywords":["資料識別番号"],"title":"資料識別番号・分類コード一覧","href":"chronect-hub-document-codes.html","description":"資料管理単位番号と資料分類コードの構成、およびR01〜R04の分類を示します。"},
  {"keywords":["80574305-R04"],"title":"地域移動支援プログラム 評価基準資料","href":"chronect-hub-mobility-evaluation.html","description":"BASを用いた地域移動支援の認識・判断・身体動作・継続性に関する評価資料です。"},
  {"keywords":["東央モビリティサービス株式会社"],"title":"東央モビリティサービスの検証記録","href":"chronect-hub-mobility-partner-verification.html","description":"BASの安全基準・案内精度と、複数の動作や手順を伴う業務補助への応用を扱います。"},
  {"keywords":["試験対象者 訪問履歴一覧"],"title":"試験対象者 訪問履歴一覧","href":"chronect-hub-subject-visits.html","description":"BAS試験運用における施設訪問を、試験対象IDごとに整理した記録です。"},
  {"keywords":["試験対象・セッション対応表"],"title":"試験対象・セッション対応表","href":"chronect-hub-subject-sessions.html","description":"試験対象IDとTIME BACKの売却セッション管理コードの対応を示します。"},
  {"keywords":["施設C"],"title":"試験施設管理情報","href":"chronect-hub-facility-management.html","description":"試験施設の識別子と運用区分を整理した管理資料です。"},
  {"keywords":["連続業務"],"title":"連続業務遂行試験 実施記録","href":"chronect-hub-continuous-work-record.html","description":"試験対象者が実施した作業工程と評価項目の記録です。"},
  {"keywords":["通常運用"],"title":"BAS通常運用条件一覧","href":"chronect-hub-bas-operation-conditions.html","description":"休息時・危険時・習慣動作・緊急停止時の支援条件を整理した資料です。"},
  {"keywords":["複合動作"],"title":"BAS複合動作評価記録","href":"chronect-hub-bas-composite-evaluation.html","description":"複数の支援機能を組み合わせた場合の評価条件と観測項目を示します。"},
  {"keywords":["タスク切替"],"title":"行動支援タスクの切替条件","href":"chronect-hub-bas-task-switching.html","description":"状況に応じた動作調整と作業工程の切替条件を整理した資料です。"},
  {"keywords":["58251309-R04"],"title":"売却セッション動作区分 照合記録","href":"chronect-hub-session-action-comparison.html","description":"売却セッション中の動作と通常運用条件の照合結果です。"},
  {"keywords":["58251310-R03"],"title":"BASタスク起点 照合記録","href":"chronect-hub-task-origin-record.html","description":"タスク実行時の記録から、動作の起点と受理の区分を抜粋しています。"},
  {"keywords":["プール計上"],"title":"時間プール計上基準","href":"chronect-hub-pool-accounting.html","description":"売却・購入に関する数量の計上項目と管理状態を整理した資料です。"},
  {"keywords":["売却処理"],"title":"売却セッション処理記録","href":"chronect-hub-sale-processing.html","description":"売却セッションの開始から実績確定までの処理を整理した資料です。"},
  {"keywords":["購入セッション"],"title":"購入セッション動作評価","href":"chronect-hub-purchase-evaluation.html","description":"購入セッション中の活動量と利用倍率を扱う評価資料です。"},
  {"keywords":["清算対応"],"title":"売買セッション清算対応表","href":"chronect-hub-settlement-mapping.html","description":"売却実績・購入予約・購入実績と清算記録の対応を整理した資料です。"},
  {"keywords":["系統間照合"],"title":"売買処理系統 接続検証記録","href":"chronect-hub-processing-connections.html","description":"売却・購入・プール管理の処理系統間の接続を検証した記録です。"},
  {"keywords":["資料参照区分"],"title":"Chronect Hub 資料参照区分","href":"chronect-hub-reference-class.html","description":"公開研究要旨と限定保存資料の参照区分を示します。"},
  {"keywords":["参照対応"],"title":"限定資料 参照対応記録","href":"chronect-hub-reference-mapping.html","description":"保存済みの限定資料と参照語の対応を記録しています。"},
  {"keywords":["保守経路"],"title":"検索基盤 保守経路記録","href":"chronect-hub-maintenance-route.html","description":"資料の参照状態を確認するための保守記録です。"},
  {"keywords":["検索基盤担当"],"title":"検索基盤 担当者履歴","href":"chronect-hub-search-staff.html","description":"Web・検索基盤の担当領域と業務の履歴です。"}
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
