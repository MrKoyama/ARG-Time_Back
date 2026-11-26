// Read-only bridge: validate the exact approved transform before restoring old test semantics.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),author=path.join(root,'docs/agent_runs/2026-10-30-archive-order');
const sha=value=>crypto.createHash('sha256').update(value).digest('hex');
const orderRaw=fs.readFileSync(path.join(author,'order.json')),baselineRaw=fs.readFileSync(path.join(author,'baseline.json'));
assert.equal(sha(orderRaw),'afed4440327f54ea44d67101f3fbb101e6b24ad5387f5dafbb1d61bb7577c111');
assert.equal(sha(baselineRaw),'2bff1c72e50c9662f1f3a4de277e45e6ce52c017d429bb76761bb7151d4339ec');
const order=JSON.parse(orderRaw),baseline=JSON.parse(baselineRaw);
const entries=order.entries,byHref=new Map(entries.map(e=>[e.href,e]));
assert.equal(entries.length,57);assert.equal(byHref.size,57);assert.equal(order.total,60);
assert.deepEqual(entries.map(e=>e.number),Array.from({length:57},(_,i)=>i+1));
const cacheVersion='20261030-order-v1';
const owned=new Set([...entries.map(e=>'public/'+e.href),'public/search.html','public/business-search.html','public/chronect-search.html','public/chronect-hub-search.html','public/business-shared.js','public/chronect-shared.js']);

function forwardPublic(name,source){
  if(!owned.has(name))return source;
  let result=source;
  result=result.replace(/(\barchiveTitleByNumber\s*=\s*)(\{[^{}]*\})/,(_,prefix,json)=>{
    const old=JSON.parse(json),next={};assert.equal(Object.keys(old).length,57,name);
    for(const e of entries){assert.equal(old[e.old],e.title,name+' old title '+e.href);next[e.number]=e.title;}
    return prefix+JSON.stringify(next);
  });
  result=result.replace(/\{[^{}\r\n]*"partners\.html":44[^{}\r\n]*\}/g,json=>{
    const mapping=JSON.parse(json);assert.equal(Object.keys(mapping).length,57,name+' URL map');
    for(const [href,n]of Object.entries(mapping)){assert.equal(n,byHref.get(href)?.old,name+' old URL '+href);mapping[href]=byHref.get(href).number;}
    return JSON.stringify(mapping);
  });
  const entry=byHref.get(name.replace(/^public\//,''));
  if(entry){
    const body='data-page-number="'+entry.old+'"';
    if(result.includes(body))result=result.replace(body,'data-page-number="'+entry.number+'"');
    else result=result.replace(/(\bcurrentPage\s*=\s*\{\s*number\s*:\s*)(\d+)/,(_,prefix,n)=>{assert.equal(Number(n),entry.old,name);return prefix+entry.number;});
    result=result.replace(/(id="archiveButton"[^>]*>)(\d+)( \/ 60<\/button>)/,(_,prefix,n,suffix)=>{assert.equal(Number(n),entry.old,name+' footer');return prefix+String(entry.number).padStart(2,'0')+suffix;});
  }
  return result.replace(/src="((?:business|chronect)-shared\.js)(?:\?[^"<>]*)?"/g,(_,file)=>'src="'+file+'?v='+cacheVersion+'"');
}

const yabooEntries = [{"number":22,"href":"yaboo-news-chronect.html","title":"暮らしの中に広がる行動支援技術、Chronectが共同検証 ｜ Yaboo!ニュース"},{"number":80,"href":"yaboo-news-tip.html","title":"情報提供・取材依頼 ｜ Yaboo!ニュース"}];
const chapterSevenEntries = [{"number":87,"href":"chronect-hub-web-operations-log.html","title":"Web運用日誌 ｜ Chronect Hub"},{"number":88,"href":"takase-investigation-method.html","title":"調査方法の再検討 ｜ 調査ノート"}];
const publicationEntries = [{"number":89,"href":"yaboo-news-investigation.html","title":"「TIME BACK」に不適切な試験運用の疑い　利用者への説明と実態に食い違い ｜ Yaboo!ニュース"},{"number":90,"href":"timeback-ending-blind-spot.html","title":"ENDING「正義の盲点」 ｜ TIME BACK"}];
const nodelinkEntries = [
  {number:91,href:'nodelink-web-maintenance.html',title:'潜入後の調査ノート ｜ 調査ノート'},
  {number:92,href:'nodelink-internal-search.html',title:'内部資料検索 ｜ 株式会社ノードリンク・ワークス'},
  {number:93,href:'nodelink-personnel.html',title:'人材情報一覧 ｜ 株式会社ノードリンク・ワークス'}
];
const chapterSevenFollowupEntries = [
  {"number":94,"href":"nodelink-info-duties.html","title":"社内情報管理基盤 業務一覧 ｜ 株式会社ノードリンク・ワークス"},
  {"number":95,"href":"takase-infiltration-duties.html","title":"潜入後の業務 ｜ 調査ノート"},
  {"number":96,"href":"nodelink-corporate-usage.html","title":"法人利用管理記録 ｜ 株式会社ノードリンク・ワークス"},
  {"number":97,"href":"takase-investigation-stall.html","title":"調査の停滞 ｜ 調査ノート"},
  {"number":98,"href":"chronect-internal-correspondence.html","title":"Chronect社内連絡記録 ｜ Chronect Hub"},
  {"number":99,"href":"nodelink-device-maintenance.html","title":"法人機器 保守管理記録 ｜ 株式会社ノードリンク・ワークス"},
  {"number":100,"href":"takase-evidence-discovery.html","title":"証拠の発見 ｜ 調査ノート"},
  {"number":101,"href":"chronect-trial-continuation-approval.html","title":"試験運用継続承認記録 ｜ Chronect Hub"},
  {"number":102,"href":"takase-final-investigation-note.html","title":"最終記録 ｜ 調査ノート"},
  {"number":103,"href":"takase-completed-report.html","title":"TIME BACKおよびSECOND SHIFTに関する調査報告書 ｜ 調査ノート"},
  {"number":104,"href":"yaboo-news-trial-disclosure.html","title":"「売られていたのは時間ではなかった」Chronect、人間の身体と技能を無断で商用利用 ｜ Yaboo!ニュース"},
  {"number":105,"href":"timeback-ending-full-disclosure.html","title":"ENDING「完全な告発」 ｜ TIME BACK"},
  {"number":106,"href":"chronect-hub-business-integration-plan.html","title":"TIME BACK・SECOND SHIFT 事業統合計画 ｜ Chronect Hub"},
  {"number":107,"href":"chronect-hub-second-shift-settlement.html","title":"SECOND SHIFT 業務実績・清算対応記録 ｜ Chronect Hub"},
  {"number":108,"href":"chronect-hub-skill-model-record.html","title":"技能モデル生成・適用記録 ｜ Chronect Hub"},
  {"number":109,"href":"chronect-hub-second-shift-strategy.html","title":"SECOND SHIFT 中長期事業戦略 ｜ Chronect Hub"},
  {"number":110,"href":"chronect-hub-bat-spec.html","title":"Behavior Assistance Terminal 製品仕様書 ｜ Chronect Hub"},
  {"number":111,"href":"chronect-hub-bat-control.html","title":"BAT制御系統図 ｜ Chronect Hub"},
  {"number":112,"href":"chronect-hub-mmu-spec.html","title":"MMU — 記憶管理機構 詳細仕様 ｜ Chronect Hub"},
  {"number":113,"href":"bat-device-diagnostics.html","title":"機器設定・状態確認記録 ｜ BAT"},
  {"number":114,"href":"chronect-hub-bat-emergency.html","title":"BAT緊急対応マニュアル ｜ Chronect Hub"},
  {"number":115,"href":"chronect-hub-memory-recovery.html","title":"隔離記憶復旧手順書 ｜ Chronect Hub"},
  {"number":116,"href":"bat-recovery-report.html","title":"復旧処理結果 ｜ BAT"},
  {"number":117,"href":"yaboo-news-timeback-suspension.html","title":"TIME BACK、全サービス停止　元社員が内部資料を公開、経営責任の追及へ ｜ Yaboo!ニュース"},
  {"number":118,"href":"timeback-ending-own-time.html","title":"ENDING「自分の時間」 ｜ TIME BACK"}
];
const webOperationsSearchEntry = {"keywords":["Web運用日誌"],"title":"Web運用日誌","href":"chronect-hub-web-operations-log.html","description":"企業サイト・Chronect Hub・検索基盤の運用保守記録です。"};
const endingEntries = [{"number":83,"href":"takase-report-editor.html","title":"調査報告書 ｜ 調査ノート"},{"number":84,"href":"takase-mail.html","title":"メール"},{"number":85,"href":"yaboo-news-aftermath.html","title":"TIME BACK、累計1,000万ダウンロードを突破　時間活用サービスとして利用拡大 ｜ Yaboo!ニュース"},{"number":86,"href":"timeback-ending-record.html","title":"ENDING「託された記録」 ｜ TIME BACK"}];
const reportReferenceEntries = [{"number":81,"href":"chronect-hub-report-reference.html","title":"報告用資料 参照記録 ｜ Chronect Hub"},{"number":82,"href":"takase-work-notes.html","title":"調査作業控え ｜ 調査ノート"}];
const reportReferenceSearchEntry = {"keywords":["報告用資料"],"title":"報告用資料 参照記録","href":"chronect-hub-report-reference.html","description":"試験運用の照合結果と報告用資料の参照関係を整理した記録です。"};
function beforeYabooRegistration(source) {
  const priorNumber = n => +n >= 23 ? +n - 1 : +n;
  const laterEntries = [...yabooEntries,...reportReferenceEntries,...endingEntries,...chapterSevenEntries,...publicationEntries,...nodelinkEntries,...chapterSevenFollowupEntries];
  return source
    .replace(/(data-page-number="|\bcurrentPage\s*=\s*\{\s*number\s*:\s*|id="archiveButton"[^>]*>)(\d+)(?="|\s*[,}]| \/ 120<)/g,
      (match,prefix,n) => +n >= 23 ? prefix + priorNumber(n) : match)
    .replace(/(\barchiveTitleByNumber\s*=\s*)(\{[^{}]*\})/,(_,prefix,json) => {
      const rows = Object.entries(JSON.parse(json)).filter(([n]) => !laterEntries.some(e => e.number === +n));
      return prefix + JSON.stringify(Object.fromEntries(rows.map(([n,title]) => [priorNumber(n),title])));
    })
    .replace(/\{[^{}\r\n]*"partners\.html":38[^{}\r\n]*\}/g,json => {
      const rows = Object.entries(JSON.parse(json)).filter(([href]) => !laterEntries.some(e => e.href === href));
      return JSON.stringify(Object.fromEntries(rows.map(([href,n]) => [href,priorNumber(n)])));
    });
}

function beforeChronectBrand(name, source) {
  if (!/^public\/chronect[^/]*\.html$/.test(name)) return source;
  const logo = '<img class="chronect-brand-logo" src="images/chronect-logo-dark.png" width="800" height="193"';
  return source
    .replace(/\r?\n  <link rel="stylesheet" href="chronect-brand\.css\?v=20261120-brand-v1">/, '')
    .replace(logo + ' alt="Chronect">', '<span class="brand-name">Chronect</span>')
    .replace(logo + ' alt=""><span class="hub-brand-label">HUB</span></a>', 'CHRONECT HUB</a>')
    .replace('href="images/chronect-official-favicon.png"', 'href="images/chronect-favicon.png"')
    .replace('href="images/chronect-hub-favicon-c.svg"', 'href="images/chronect-hub-favicon.svg"');
}

function withoutProgressReset(name, source) {
  let result = source
    .replace(/(?:  )?<script src="progress-reset\.js\?v=20261124"><\/script>(?:\r?\n)?/, '')
    .replaceAll('>すべての進行状況をリセット</button>', '>アーカイブをリセット</button>')
    .replace(' aria-describedby="resetDescription resetWarning"', '')
    .replace('<strong>進行状況をリセットしますか？</strong>', '探索済みページの記録を消去しますか？')
    .replace(/(?:\r?\n[ \t]*)?<p id="reset(?:Description|Warning|Error)"[^>]*>[^<]*<\/p>/g, '')
    .replace(/if \(!window\.timebackProgress\.isCurrent\(\)\) return;(?:\r?\n[ \t]*)?/, '')
    .replace('window.timebackProgress.isCurrent() && JSON.stringify(pages)', 'JSON.stringify(pages)')
    .replace(/((?:business|chronect)-shared\.js\?v=)reset20261124/g, '$1' + '20261124-archive118')
    .replace('final-chapter.js?v=reset20261124', 'final-chapter.js?v=20261124-final118');
  if (name === 'public/time-back.html') {
    result = result.replace('window.timebackProgress.reset();',
      "try {\n        localStorage.removeItem(archiveStorageKey);\n      } catch (error) {\n        return;\n      }\n      window.location.href = 'index.html';");
  } else if (name === 'public/search.html') {
    result = result.replace('window.timebackProgress.reset();',
      "try { localStorage.removeItem(archiveStorageKey); }\n      catch (error) { return; }\n      window.location.href = 'index.html';");
  } else {
    const location = name === 'public/chronect-shared.js' ? 'location' : 'window.location';
    result = result.replace('window.timebackProgress.reset()',
      "try{localStorage.removeItem(archiveStorageKey)}catch(error){return}" + location + ".href='index.html'");
  }
  return result;
}

function canonicalPublic(name,current){
  const file=baseline.files[name];assert(file,name+' absent from frozen baseline');
  if(typeof file.text!=='string'){assert.equal(sha(current),file.sha256,name+' immutable binary');return current;}
  assert.equal(sha(Buffer.from(file.text)),file.sha256,name+' frozen text hash');
  const expected=forwardPublic(name,file.text);
  let source=withoutProgressReset(name, Buffer.isBuffer(current)?current.toString('utf8'):current);
  if(name==='public/search.html')source=source.replace(
    "        keywords: ['Chronect'],\n        title: 'Chronect',\n        url: 'chronect.html',\n        description: 'TIME BACKを運営するChronectの公式サイトです。'\n      },\n      {\n        keywords: ['クロネクト', '運営会社'],",
    "        keywords: ['Chronect', 'クロネクト', '運営会社'],");
  if(name==='public/business-search.html')source=source.replace("['提携企業一覧','提携企業']","['提携企業一覧']");
  if(name==='public/chronect-search.html')source=source
    .replace(/^ {1}\{keywords:\['Chronect'\],title:'Chronect',url:'chronect\.html',description:'Chronectの公式サイトです。研究開発、事業・サービス、企業情報をご案内します。'\},\r?\n/m,'')
    .replace("['クロネクト','運営会社','企業情報','会社概要']","['Chronect','クロネクト','運営会社','企業情報','会社概要']");
  if(name==='public/chronect.html')source=source.replace('href="chronect.css?v=20261126-review2"','href="chronect.css"');
  if(name==='public/chronect.css')source=source.replace('\n#company .hero-inner { max-width: 1180px; }\n.recruit-copy { display: block; }\n\n','\n');
  if(name==='public/chronect-shared.js')source=source.replace("if(!currentPage||document.body.dataset.pageArchive==='exclude')return pages;","if(!currentPage)return pages;");
  if(name==='public/chronect-hub-search.html')source=source
    .replace('  <script src="final-chapter.js?v=20261124-final118"></script>\n','')
    .replace('chronect-hub.js?v=20261124-final118','chronect-hub.js?v=20261118-web-operations-v1');
  if(name==='public/chronect-hub.js')source=source.replace(
    "    const special = cleaned.match(chronectHubSpecialSyntax);\n    const finalMaterial = special && window.timebackFinalChapter?.search(special[1]);\n    if (finalMaterial) results.push(finalMaterial);\n",'');
  if(name==='public/nodelink-works.html')source=source
    .replace(' class="corporate-brand" id="nodelink-logo" href',' class="corporate-brand" href')
    .replace('<script src="nodelink-logo-hold.js?v=20261123"></script>','');
  if(name==='public/nodelink.css')source=source.replace(
    '\n#nodelink-logo {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  user-select: none;\n}\n','');
  const previous=withoutArchivePruning(name,beforeYabooRegistration(beforeChronectBrand(name,source)),file.text);
  assert.equal(withoutLivingAddition(name,previous),expected,name+' exceeds the approved archive and route changes');
  return Buffer.from(file.text);
}
// Preserve the immutable 2026-10-30 fixtures. Validate and remove only the later
// approved additive changes before running the original regression meanings.
const livingEntry={number:58,old:58,href:'chronect-hub-research-continuous-action.html',title:'環境変化下における連続行動支援の評価 ｜ Chronect Hub'};
const archiveVersion='reset20261124';
const facilitySearchEntries=[
  {
    "keywords": [
      "施設C"
    ],
    "title": "試験施設管理情報",
    "href": "chronect-hub-facility-management.html",
    "description": "試験施設の識別子と運用区分を整理した管理資料です。"
  },
  {
    "keywords": [
      "連続業務"
    ],
    "title": "連続業務遂行試験 実施記録",
    "href": "chronect-hub-continuous-work-record.html",
    "description": "試験対象者が実施した作業工程と評価項目の記録です。"
  }
];
const facilityEntries=facilitySearchEntries.map((entry,index)=>({number:50+index,previousNumber:50+index,href:entry.href,title:entry.title+' ｜ Chronect Hub'}));
const chapterSearchEntries=[
  {
    "keywords": [
      "通常運用"
    ],
    "title": "BAS通常運用条件一覧",
    "href": "chronect-hub-bas-operation-conditions.html",
    "description": "休息時・危険時・習慣動作・緊急停止時の支援条件を整理した資料です。"
  },
  {
    "keywords": [
      "複合動作"
    ],
    "title": "BAS複合動作評価記録",
    "href": "chronect-hub-bas-composite-evaluation.html",
    "description": "複数の支援機能を組み合わせた場合の評価条件と観測項目を示します。"
  },
  {
    "keywords": [
      "タスク切替"
    ],
    "title": "行動支援タスクの切替条件",
    "href": "chronect-hub-bas-task-switching.html",
    "description": "状況に応じた動作調整と作業工程の切替条件を整理した資料です。"
  },
  {
    "keywords": [
      "58251309-R04"
    ],
    "title": "売却セッション動作区分 照合記録",
    "href": "chronect-hub-session-action-comparison.html",
    "description": "売却セッション中の動作と通常運用条件の照合結果です。"
  },
  {
    "keywords": [
      "58251310-R03"
    ],
    "title": "BASタスク起点 照合記録",
    "href": "chronect-hub-task-origin-record.html",
    "description": "タスク実行時の記録から、動作の起点と受理の区分を抜粋しています。"
  }
];
const chapterEntries=chapterSearchEntries.map((entry,index)=>({number:52+index,previousNumber:52+index,href:entry.href,title:entry.title+' ｜ Chronect Hub'}));
const chapterFourSearchEntries=[
  {
    "keywords": [
      "プール計上"
    ],
    "title": "時間プール計上基準",
    "href": "chronect-hub-pool-accounting.html",
    "description": "売却・購入に関する数量の計上項目と管理状態を整理した資料です。"
  },
  {
    "keywords": [
      "売却処理"
    ],
    "title": "売却セッション処理記録",
    "href": "chronect-hub-sale-processing.html",
    "description": "売却セッションの開始から実績確定までの処理を整理した資料です。"
  },
  {
    "keywords": [
      "購入セッション"
    ],
    "title": "購入セッション動作評価",
    "href": "chronect-hub-purchase-evaluation.html",
    "description": "購入セッション中の活動量と利用倍率を扱う評価資料です。"
  },
  {
    "keywords": [
      "清算対応"
    ],
    "title": "売買セッション清算対応表",
    "href": "chronect-hub-settlement-mapping.html",
    "description": "売却実績・購入予約・購入実績と清算記録の対応を整理した資料です。"
  },
  {
    "keywords": [
      "系統間照合"
    ],
    "title": "売買処理系統 接続検証記録",
    "href": "chronect-hub-processing-connections.html",
    "description": "売却・購入・プール管理の処理系統間の接続を検証した記録です。"
  }
];
const chapterFourEntries=chapterFourSearchEntries.map((entry,index)=>({number:57+index,previousNumber:57+index,href:entry.href,title:entry.title+' ｜ Chronect Hub'}));
const chapterFiveSearchEntries=[
  {
    "keywords": [
      "資料参照区分"
    ],
    "title": "Chronect Hub 資料参照区分",
    "href": "chronect-hub-reference-class.html",
    "description": "公開研究要旨と限定保存資料の参照区分を示します。"
  },
  {
    "keywords": [
      "参照対応"
    ],
    "title": "限定資料 参照対応記録",
    "href": "chronect-hub-reference-mapping.html",
    "description": "保存済みの限定資料と参照語の対応を記録しています。"
  },
  {
    "keywords": [
      "保守経路"
    ],
    "title": "検索基盤 保守経路記録",
    "href": "chronect-hub-maintenance-route.html",
    "description": "資料の参照状態を確認するための保守記録です。"
  },
  {
    "keywords": [
      "Webシステム保守",
      "検索基盤担当"
    ],
    "title": "Webシステム 保守担当記録",
    "href": "chronect-hub-search-staff.html",
    "description": "Web・検索基盤の担当領域と業務の履歴です。"
  }
];
const chapterFiveEntries=[
  {
    "number": 62,
    "previousNumber": 62,
    "href": "chronect-hub-reference-class.html",
    "title": "Chronect Hub 資料参照区分 ｜ Chronect Hub"
  },
  {
    "number": 63,
    "previousNumber": 63,
    "href": "chronect-hub-reference-mapping.html",
    "title": "限定資料 参照対応記録 ｜ Chronect Hub"
  },
  {
    "number": 64,
    "previousNumber": 64,
    "href": "chronect-hub-maintenance-route.html",
    "title": "検索基盤 保守経路記録 ｜ Chronect Hub"
  },
  {
    "number": 65,
    "previousNumber": 65,
    "href": "chronect-hub-search-staff.html",
    "title": "Webシステム 保守担当記録 ｜ Chronect Hub"
  },
  {
    "number": 66,
    "previousNumber": 66,
    "href": "takase-notes.html",
    "title": "調査ノート ｜ 調査ノート"
  },
  {
    "number": 67,
    "previousNumber": 67,
    "href": "takase-records.html",
    "title": "証拠整理メモ ｜ 調査ノート"
  },
  {
    "number": 68,
    "previousNumber": 68,
    "href": "takase-handover.html",
    "title": "検索機能の技術メモ ｜ 調査ノート"
  }
];
const chapterSixEntries=[
  {
    "number": 69,
    "previousNumber": 69,
    "href": "chronect-hub-sale-reference.html",
    "title": "売却処理 内部参照記録 ｜ Chronect Hub"
  },
  {
    "number": 70,
    "previousNumber": 70,
    "href": "chronect-hub-facility-system.html",
    "title": "施設管理体系記録 ｜ Chronect Hub"
  },
  {
    "number": 71,
    "previousNumber": 71,
    "href": "chronect-hub-regional-network.html",
    "title": "広域実証ネットワーク 管理概要 ｜ Chronect Hub"
  },
  {
    "number": 72,
    "previousNumber": 72,
    "href": "chronect-hub-bas-application.html",
    "title": "BAS応用検討記録 ｜ Chronect Hub"
  },
  {
    "number": 73,
    "previousNumber": 73,
    "href": "chronect-hub-work-use-model.html",
    "title": "売却時間帯の業務利用モデル ｜ Chronect Hub"
  },
  {
    "number": 74,
    "previousNumber": 74,
    "href": "chronect-hub-second-shift-plan.html",
    "title": "SECOND SHIFT計画概要 ｜ Chronect Hub"
  }
];
const chapterSixSearchEntries=[
  {
    "keywords": [
      "売却処理"
    ],
    "title": "売却処理 内部参照記録",
    "href": "chronect-hub-sale-reference.html",
    "description": "売却処理に関連する内部記録は、セッションの状態管理、実績の計上、身体行動の評価に区分して整理する。"
  },
  {
    "keywords": [
      "施設C"
    ],
    "title": "施設管理体系記録",
    "href": "chronect-hub-facility-system.html",
    "description": "試験運用に使用する各施設は、共通の施設管理体系に従って登録される。"
  },
  {
    "keywords": [
      "Chronect広域実証ネットワーク"
    ],
    "title": "広域実証ネットワーク 管理概要",
    "href": "chronect-hub-regional-network.html",
    "description": "本ネットワークは、地域ごとの試験施設における実施記録を、共通の管理区分で整理するための体系である。"
  },
  {
    "keywords": [
      "BAS"
    ],
    "title": "BAS応用検討記録",
    "href": "chronect-hub-bas-application.html",
    "description": "BASの複合動作およびタスク切替に関する評価結果を踏まえ、指定された作業工程への応用可能性を検討する。"
  },
  {
    "keywords": [
      "作業工程"
    ],
    "title": "売却時間帯の業務利用モデル",
    "href": "chronect-hub-work-use-model.html",
    "description": "売却セッション中の身体行動について、BASを介した業務利用モデルを検討する。"
  },
  {
    "keywords": [
      "事業計画"
    ],
    "title": "SECOND SHIFT計画概要",
    "href": "chronect-hub-second-shift-plan.html",
    "description": "企業向けの事業構想を整理した資料です。"
  }
];
const chapterSixEvidenceEntries=[
  {
    "number": 75,
    "previousNumber": 75,
    "href": "chronect-hub-second-shift-operation.html",
    "title": "SECOND SHIFT 運用計画資料 ｜ Chronect Hub"
  },
  {
    "number": 76,
    "previousNumber": 76,
    "href": "chronect-hub-second-shift-management.html",
    "title": "SECOND SHIFT 内部管理記録 ｜ Chronect Hub"
  },
  {
    "number": 77,
    "previousNumber": 77,
    "href": "chronect-hub-second-shift-disclosure.html",
    "title": "利用者向け説明 運用指示 ｜ Chronect Hub"
  }
];
const chapterSixEvidenceSearchEntries=[
  {
    "keywords": [
      "SECOND SHIFT"
    ],
    "title": "SECOND SHIFT 運用計画資料",
    "href": "chronect-hub-second-shift-operation.html",
    "description": "運用の基本方針と管理区分を整理した資料です。"
  },
  {
    "keywords": [
      "管理体制"
    ],
    "title": "SECOND SHIFT 内部管理記録",
    "href": "chronect-hub-second-shift-management.html",
    "description": "計画と試験の管理状況を整理した記録です。"
  },
  {
    "keywords": [
      "利用者向け説明"
    ],
    "title": "利用者向け説明 運用指示",
    "href": "chronect-hub-second-shift-disclosure.html",
    "description": "利用者への説明範囲と回答方針を定めた指示です。"
  }
];
const trialOperationEntry={"number":78,"previousNumber":78,"href":"chronect-hub-trial-operation-mapping.html","title":"試験運用 対応記録 ｜ Chronect Hub"};
const trialOperationSearchEntry={"keywords":["試験運用"],"title":"試験運用 対応記録","href":"chronect-hub-trial-operation-mapping.html","description":"試験の実施記録と事業計画上の評価対象との対応を整理した記録です。"};
const excludedNumbers=new Set([43,44,46,47,48,49,50,51,52,53,54,55,56,57]);
const compactNumber=number=>number-[...excludedNumbers].filter(excluded=>excluded<number).length;

function withoutArchivePruning(name,source,frozenSource){
  const mid=require('./midroute-test-helper.cjs');
  const priorEntries=[...entries,livingEntry,...mid.entries];
  const byPriorHref=new Map(priorEntries.map(entry=>[entry.href,entry]));
  let result=source.replace(/((?:business|chronect)-shared\.js\?v=)20261124-archive118/g,'$1'+mid.cacheVersion).replace(/chronect-hub\.js\?v=20261116-report-reference-v1/g,'chronect-hub.js?v='+mid.cacheVersion);
  if(name==='public/chronect-hub-search.html')result=result
    .replace("  <link rel=\"stylesheet\" href=\"chronect-hub-internal.css?v=20261117\">\n",'')
    .replace("chronect-hub.js?v=20261118-web-operations-v1",'chronect-hub.js?v='+mid.cacheVersion);
  if(name==='public/chronect-hub.js')result=result
    .replace("const chronectHubSpecialSyntax = /^##([^#]+)##$/;\n\n",'')
    .replace("  if (chronectHubSpecialSyntax.test(cleaned)) document.body.classList.add('hub-internal');\n",'')
    .replace('normalized.match(chronectHubSpecialSyntax)',"normalized.match(/^##([^#]+)##$/)");
  if(name==='public/chronect-hub-search.html')result=result.replace('  <link rel="stylesheet" href="chronect-hub-result.css?v=20261113">\n','');
  if(name==='public/chronect-hub.js'){
    const expected='const chronectHubInternalDatabase = [\n  '+[...chapterSixSearchEntries,...chapterSixEvidenceSearchEntries,trialOperationSearchEntry,reportReferenceSearchEntry,webOperationsSearchEntry].map(e=>JSON.stringify(e)).join(',\n  ')+'\n];';
    assert.equal(result.split(expected).length,2);
    result=result.replace(expected,'const chronectHubInternalDatabase = [];');
  }
  if(name==='public/chronect-hub.js')result=result
    .replace("// ARG内の内部照会用。公開する架空資料のみを登録する。\nconst chronectHubInternalDatabase = [];\n\n",'')
    .replace("const special = normalized.match(/^##([^#]+)##$/);\n  const database = special ? chronectHubInternalDatabase : chronectHubDatabase;\n  const keyword = special ? special[1].trim() : normalized;\n  return keyword ? database.filter(item => item.keywords.some(term => term.toLocaleLowerCase('ja') === keyword)) : [];","return normalized ? chronectHubDatabase.filter(item => item.keywords.some(keyword => keyword.toLocaleLowerCase('ja') === normalized)) : [];")
    .replace("\n    if (!results.length && cleaned === '高瀬悠真') {\n      const link = document.createElement('a');\n      link.className = 'hub-unlisted-reference';\n      link.href = 'takase-notes.html';\n      link.textContent = '資料';\n      status.replaceChildren('該当する', link, 'はありません。入力内容をご確認ください。');\n    }",'');
  if(name==='public/chronect-hub.js')for(const entry of [...facilitySearchEntries,...chapterSearchEntries,...chapterFourSearchEntries,...chapterFiveSearchEntries]){
    const addition=',\n  '+JSON.stringify(entry);
    assert.equal(result.split(addition).length,2,name+' facility search record');
    result=result.replace(addition,'');
  }
  const entry=byPriorHref.get(name.replace(/^public\//,''));
  if(entry&&entry.number>=43){
    const excluded=excludedNumbers.has(entry.number);
    const attrs=excluded?'data-page-archive="exclude"':'data-page-number="'+compactNumber(entry.number)+'"';
    assert(result.includes(attrs),name);
    result=result.replace(attrs,'data-page-number="'+entry.number+'"'+(excluded?' data-page-title="'+entry.title+'" data-page-href="'+entry.href+'"':''));
    const button=excluded?'ページアーカイブ':compactNumber(entry.number)+' / 120';
    result=result.replace(/(id="archiveButton"[^>]*>)([^<]+)(<\/button>)/,(_,start,label,end)=>{
      assert.equal(label,button,name);
      return start+entry.number+' / 120'+end;
    });
  }
  if(name==='public/behavior-assistance.html'){
    const clue='通常運用での支援内容や利用可能時間は';
    assert.equal(result.split(clue).length,2,name+' chapter clue');
    result=result.replace(clue,'支援内容や利用可能時間は');
  }
  if(name==='public/chronect-hub.html')result=result.replace("\n      <p>公開研究要旨と限定保存資料は、資料参照区分に基づいて管理しています。</p>\n    ", '');
  // Restore only the approved copy edits for the frozen baseline checks.
  if(name==='public/chronect-hub-session.html'){
    const approved="<p>対象セッションの位置確認記録から、明浜みどり公園を通過し、住宅間の細道を経由して明浜商店街に至る区間を抜粋した。</p>\n      <p>これらは予定された経路ではなく、売却者本人が実際に通過した記録に基づく。</p>";
    assert.equal(result.split(approved).length,2,name+' approved location wording');
    result=result.replace(approved,"<p>対象セッションに係る位置確認情報より、明浜みどり公園の通過確認に続き、住宅間に位置する細道を経由して明浜商店街へ至る区間を抜粋した。本記録における位置確認の対象は、当該時間帯の売却者本人であり、各地点の記載は経路設定ではなく通過実績に基づく。</p>");
  }
  if(name==='public/chronect-news-20260714.html'){
    const mediaCoverage="        <section aria-labelledby=\"media-coverage-title\">\n          <h2 id=\"media-coverage-title\">外部メディア掲載情報</h2>\n          <p>当社の行動支援技術に関する共同検証の取り組みが、外部メディアで紹介されました。</p>\n          <p><a href=\"yaboo-news-chronect.html\">Yaboo!ニュース｜暮らしの中に広がる行動支援技術、Chronectが共同検証</a></p>\n        </section>\n";
    assert.equal(result.split(mediaCoverage).length,2);
    result=result.replace(mediaCoverage,'');
  }
  const chapterFourClues={
    'public/about.html':['購入セッションでは、TIME BACK MARKETの時間プールから購入時間を受け取り、設定した時間反映倍率で日常へ重ねて利用できます。','TIME BACK MARKETの時間プールから購入時間を受け取り、設定した時間反映倍率で日常へ重ねて利用。'],
    'public/market.html':['<span>プール計上の区分に基づく集計</span>','']
  };
  const clue=chapterFourClues[name];
  if(clue){
    assert.equal(result.split(clue[0]).length,2,name+' chapter four clue');
    result=result.replace(clue[0],clue[1]);
  }
  if(!result.includes('archiveTitleByNumber'))return result;
  const active=[...priorEntries.filter(e=>!excludedNumbers.has(e.number)).map(e=>({...e,number:compactNumber(e.number)})),...facilityEntries,...chapterEntries,...chapterFourEntries,...chapterFiveEntries,...chapterSixEntries,...chapterSixEvidenceEntries,trialOperationEntry];
  result=result.replace(/(\barchiveTitleByNumber\s*=\s*)(\{[^{}]*\})/,(_,prefix,json)=>{
    assert.deepEqual(JSON.parse(json),Object.fromEntries(active.map(e=>[e.number,e.title])),name+' compact titles');
    return prefix+JSON.stringify(Object.fromEntries(priorEntries.map(e=>[e.number,e.title])));
  });
  const frozenMaps=[...frozenSource.matchAll(/\{[^{}\r\n]*"partners\.html":44[^{}\r\n]*\}/g)];
  let mapIndex=0;
  result=result.replace(/\{[^{}\r\n]*"partners\.html":37[^{}\r\n]*\}/g,json=>{
    assert.deepEqual(JSON.parse(json),Object.fromEntries(active.map(e=>[e.href,e.number])),name+' compact URLs');
    const originalOrder=Object.keys(JSON.parse(frozenMaps[mapIndex++][0]));
    return JSON.stringify(Object.fromEntries([...originalOrder,livingEntry.href,...mid.entries.map(e=>e.href)].map(href=>[href,byPriorHref.get(href).number])));
  });
  assert.equal(mapIndex,frozenMaps.length,name+' map count');
  return result
    .replace(/\.filter\(page=>page&&typeof page\.href==='string'\)(?=\.map)/,'')
    .replace(/\.filter\(page=>Object\.hasOwn\((?:businessPageNumberByHref|pageNumberByHref),page\.href\)\)/,'')
    .replace(/if\(!Number\.isInteger\(movedNumber\)\)return null;/,'')
    .replace(/^ +if \(!Number\.isInteger\(movedNumber\)\) return null;\n/m,'')
    .replace('}).filter(Boolean)','})');
}
const livingSearchEntry={keywords:['生活動線'],title:'環境変化下における連続行動支援の評価',href:livingEntry.href,description:'本研究では、生活動線や設備配置の変化が、連続した身体動作の安定性に与える影響を評価した。'};
const livingParagraph='本プログラムでは、周辺の公共施設や生活動線にも配慮し、地域の利用状況を踏まえた実証環境の整備を進めています。近隣を通行される方への影響を抑えながら、生活環境との調和に取り組んでいます。';
function withoutLivingAddition(name,source){
  let result=require('./midroute-test-helper.cjs').withoutMidrouteAddition(name,source,baseline);
  // The separately approved 2026-11-05 mobile-only CSS predates this task.
  // Validate its exact changes; do not modify the immutable historical fixtures.
  if(name==='public/chronect.css'){
    const changes=[
      ['  html,body{max-width:100%;overflow-x:clip}\n  html{scroll-padding-top:14rem}\n','  html,body{max-width:100%;overflow-x:hidden}\n'],
      ['  .header-search{order:2;flex:1 0 100%;width:100%;margin-left:0}\n  .search-input{flex:1;min-width:0;width:100%;height:42px;padding:0 12px;font-size:.84rem}\n  .search-submit{flex:0 0 42px;width:42px;height:42px}\n',''],
      ['  .brand-name{font-size:1.1rem}\n','  .brand-name{font-size:1.1rem}\n  .search-input{width:104px}\n  .search-submit{width:36px}\n']
    ];
    for(const [current,previous]of changes){assert.equal(result.split(current).length,2,name+' exact approved mobile CSS');result=result.replace(current,previous);}
  }
  if(name==='public/chronect-hub-research-20240711.html'){
    const approved='準備や移動を伴う活動を区別し、生活動線や本人が優先した条件を記述することを重視しました。';
    assert.equal(result.split(approved).length,2,name+' exact approved five-character insertion');
    result=result.replace(approved,approved.replace('生活動線や',''));
  }
  if(source.includes('archiveTitleByNumber')){
    result=result.replace(/(\barchiveTitleByNumber\s*=\s*)(\{[^{}]*\})/,(_,prefix,json)=>{const map=JSON.parse(json);assert.equal(map[58],livingEntry.title,name);delete map[58];return prefix+JSON.stringify(map);});
    result=result.replace(/\{[^{}\r\n]*"partners\.html":37[^{}\r\n]*\}/g,json=>{const map=JSON.parse(json);assert.equal(map[livingEntry.href],58,name);delete map[livingEntry.href];return JSON.stringify(map);});
  }
  if(name==='public/business-demonstration.html'){
    const addition='    <div class="demo-notice"><h3>周辺環境について</h3><p>'+livingParagraph+'</p></div>\n';
    assert.equal(result.split(addition).length,2,name+' exact approved paragraph');result=result.replace(addition,'');
  }
  if(name==='public/chronect-hub.js'){
    const addition=',\n  '+JSON.stringify(livingSearchEntry);assert.equal(result.split(addition).length,2,name+' exact additive search record');result=result.replace(addition,'');
  }
  if(name==='public/chronect-hub-search.html'){
    assert(result.includes('chronect-hub.js?v=20261102-living-v1'));result=result.replace('chronect-hub.js?v=20261102-living-v1','chronect-hub.js?v=20261029-missing');
  }
  return result;
}
function legacyTestSource(name){
  const file=baseline.files[name];assert(file&&typeof file.text==='string',name);
  assert.equal(sha(Buffer.from(file.text)),file.sha256,name+' frozen script hash');
  return file.text.replace("require('node:fs')","require('./archive-order-test-helper.cjs').legacyFs");
}
function assertLegacyTestCode(name){assert.equal(fs.readFileSync(path.join(root,name),'utf8'),legacyTestSource(name),name+' exceeds legacy bridge insertion');}
const legacyFs=Object.create(fs);
legacyFs.readdirSync=function(dir,options){const rows=fs.readdirSync(dir,options);const added=new Set([livingEntry.href,...require('./midroute-test-helper.cjs').entries.map(e=>e.href),...facilityEntries.map(e=>e.href),...chapterEntries.map(e=>e.href),...chapterFourEntries.map(e=>e.href),...chapterFiveEntries.map(e=>e.href),...chapterSixEntries.map(e=>e.href),...chapterSixEvidenceEntries.map(e=>e.href),trialOperationEntry.href,'yaboo-news-chronect.html','yaboo-news-tip.html',...reportReferenceEntries.map(e=>e.href),'investigation-report.js','investigation-report.css','takase-report-editor.html','chronect-hub-internal.css','takase-mail.html','takase-mail.js','yaboo-news-aftermath.html','timeback-ending-record.html','takase-ending.css','takase-mail.css',...chapterSevenEntries.map(e=>e.href),...publicationEntries.map(e=>e.href),...nodelinkEntries.map(e=>e.href),...chapterSevenFollowupEntries.map(e=>e.href),'chapter-seven-reference.js','nodelink-logo-hold.js','nodelink-internal-search.js','nodelink-internal.css','final-chapter.js','final-chapter-mail.js','progress-reset.js']);return path.resolve(String(dir))===path.join(root,'public')?rows.filter(row=>!added.has(typeof row==='string'?row:row.name)):rows;};
legacyFs.readFileSync=function(file,options){
  const resolved=path.resolve(String(file)),relative=path.relative(root,resolved).split(path.sep).join('/');
  const value=fs.readFileSync(file,options);
  if(!relative.startsWith('public/'))return value;
  const canonical=canonicalPublic(relative,value);
  return typeof value==='string'?canonical.toString(typeof options==='string'?options:options?.encoding||'utf8'):canonical;
};
module.exports={root,baseline,order,entries,byHref,owned,cacheVersion,forwardPublic,canonicalPublic,legacyFs,legacyTestSource,assertLegacyTestCode,sha,livingEntry,livingSearchEntry,livingParagraph,archiveVersion,excludedNumbers,compactNumber,facilityEntries,facilitySearchEntries,chapterEntries,chapterSearchEntries,chapterFourEntries,chapterFourSearchEntries,chapterFiveEntries,chapterFiveSearchEntries,chapterSixEntries,chapterSixSearchEntries,chapterSixEvidenceEntries,chapterSixEvidenceSearchEntries,trialOperationEntry,trialOperationSearchEntry,yabooEntries,reportReferenceEntries,reportReferenceSearchEntry,endingEntries,chapterSevenEntries,publicationEntries,nodelinkEntries,chapterSevenFollowupEntries};
