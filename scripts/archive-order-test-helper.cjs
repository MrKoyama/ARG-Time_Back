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

function canonicalPublic(name,current){
  const file=baseline.files[name];assert(file,name+' absent from frozen baseline');
  if(typeof file.text!=='string'){assert.equal(sha(current),file.sha256,name+' immutable binary');return current;}
  assert.equal(sha(Buffer.from(file.text)),file.sha256,name+' frozen text hash');
  const expected=forwardPublic(name,file.text);
  const previous=withoutArchivePruning(name,Buffer.isBuffer(current)?current.toString('utf8'):current,file.text);
  assert.equal(withoutLivingAddition(name,previous),expected,name+' exceeds the approved archive and route changes');
  return Buffer.from(file.text);
}
// Preserve the immutable 2026-10-30 fixtures. Validate and remove only the later
// approved additive changes before running the original regression meanings.
const livingEntry={number:58,old:58,href:'chronect-hub-research-continuous-action.html',title:'環境変化下における連続行動支援の評価 ｜ Chronect Hub'};
const archiveVersion='20261113-chapter5-revision-v1';
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
const excludedNumbers=new Set([43,44,46,47,48,49,50,51,52,53,54,55,56,57]);
const compactNumber=number=>number-[...excludedNumbers].filter(excluded=>excluded<number).length;

function withoutArchivePruning(name,source,frozenSource){
  const mid=require('./midroute-test-helper.cjs');
  const priorEntries=[...entries,livingEntry,...mid.entries];
  const byPriorHref=new Map(priorEntries.map(entry=>[entry.href,entry]));
  let result=source.replace(/((?:business|chronect)-shared\.js\?v=)20261113-chapter5-revision-v1/g,'$1'+mid.cacheVersion).replace(/chronect-hub\.js\?v=20261113-chapter5-revision-v1/g,'chronect-hub.js?v='+mid.cacheVersion);
  if(name==='public/chronect-hub-search.html')result=result.replace('  <link rel="stylesheet" href="chronect-hub-result.css?v=20261113">\n','');
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
  const active=[...priorEntries.filter(e=>!excludedNumbers.has(e.number)).map(e=>({...e,number:compactNumber(e.number)})),...facilityEntries,...chapterEntries,...chapterFourEntries,...chapterFiveEntries];
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
legacyFs.readdirSync=function(dir,options){const rows=fs.readdirSync(dir,options);const added=new Set([livingEntry.href,...require('./midroute-test-helper.cjs').entries.map(e=>e.href),...facilityEntries.map(e=>e.href),...chapterEntries.map(e=>e.href),...chapterFourEntries.map(e=>e.href),...chapterFiveEntries.map(e=>e.href)]);return path.resolve(String(dir))===path.join(root,'public')?rows.filter(row=>!added.has(typeof row==='string'?row:row.name)):rows;};
legacyFs.readFileSync=function(file,options){
  const resolved=path.resolve(String(file)),relative=path.relative(root,resolved).split(path.sep).join('/');
  const value=fs.readFileSync(file,options);
  if(!relative.startsWith('public/'))return value;
  const canonical=canonicalPublic(relative,value);
  return typeof value==='string'?canonical.toString(typeof options==='string'?options:options?.encoding||'utf8'):canonical;
};
module.exports={root,baseline,order,entries,byHref,owned,cacheVersion,forwardPublic,canonicalPublic,legacyFs,legacyTestSource,assertLegacyTestCode,sha,livingEntry,livingSearchEntry,livingParagraph,archiveVersion,excludedNumbers,compactNumber,facilityEntries,facilitySearchEntries,chapterEntries,chapterSearchEntries,chapterFourEntries,chapterFourSearchEntries,chapterFiveEntries,chapterFiveSearchEntries};
