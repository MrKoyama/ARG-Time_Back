// Approved 2026-11-04 additions; kept outside public and used by read-only checks.
const assert=require('node:assert/strict');
const entries=[
  {number:59,old:59,href:'chronect-hub-document-codes.html',title:'資料識別番号・分類コード一覧 ｜ Chronect Hub'},
  {number:60,old:60,href:'chronect-hub-mobility-evaluation.html',title:'地域移動支援プログラム 評価資料 ｜ Chronect Hub'},
  {number:61,old:61,href:'chronect-hub-mobility-partner-verification.html',title:'東央モビリティサービスの検証記録 ｜ Chronect Hub'}
];
const searchEntries=[
  {keywords:['資料識別番号'],title:'資料識別番号・分類コード一覧',href:entries[0].href,description:'資料管理単位番号と資料分類コードの構成、およびR01〜R04の分類を示します。'},
  {keywords:['80574305-R04'],title:'地域移動支援プログラム 評価資料',href:entries[1].href,description:'BASを用いた地域移動支援の認識・判断・身体動作・継続性に関する評価資料です。'},
  {keywords:['東央モビリティサービス株式会社'],title:'東央モビリティサービスの検証記録',href:entries[2].href,description:'BASの安全基準・案内精度と、複数の動作や手順を伴う業務補助への応用を扱います。'}
];
const unitAddition='    <p class="demo-environment-note">資料管理単位番号：80574305</p>\n';
const documentAddition='<div><dt>資料識別番号</dt><dd class="hub-code">58241309-R03</dd></div>';
const cacheVersion='20261104-midroute-v1';
function withoutMidrouteAddition(name,source,baseline){
  let result=source;
  result=result.replace(/\btotalPages\s*=\s*120\b/g,m=>m.replace('120','60'));
  result=result.replace(/(id="archiveButton"[^>]*>)(EX|\d+)( \/ )120(<\/button>)/g,(_,a,b,c,d)=>a+b+c+'60'+d);
  result=result.replace(/src="((?:business|chronect)-shared\.js)\?v=20261104-midroute-v1"/g,'src="$1?v=20261030-order-v1"');
  if(result.includes('archiveTitleByNumber')){
    result=result.replace(/(\barchiveTitleByNumber\s*=\s*)(\{[^{}]*\})/,(_,prefix,json)=>{
      const map=JSON.parse(json);for(const e of entries){assert.equal(map[e.number],e.title,name);delete map[e.number];}return prefix+JSON.stringify(map);
    });
    result=result.replace(/\{[^{}\r\n]*"partners\.html":37[^{}\r\n]*\}/g,json=>{
      const map=JSON.parse(json);for(const e of entries){assert.equal(map[e.href],e.number,name);delete map[e.href];}return JSON.stringify(map);
    });
  }
  if(name==='public/business-demonstration.html'){assert.equal(result.split(unitAddition).length,2);result=result.replace(unitAddition,'');}
  if(name==='public/chronect-hub-session.html'){assert.equal(result.split(documentAddition).length,2);result=result.replace(documentAddition,'');}
  if(name==='public/chronect-hub.js')for(const e of searchEntries){const addition=',\n  '+JSON.stringify(e);assert.equal(result.split(addition).length,2);result=result.replace(addition,'');}
  if(name.endsWith('.html')&&result.includes('chronect-hub.js?v='+cacheVersion)){
    const previous=name==='public/chronect-hub-search.html'?'20261102-living-v1':baseline.files[name]?.text?.match(/chronect-hub\.js\?v=([^"<>]+)/)?.[1];
    assert(previous,name+' previous Hub script version');result=result.replace('chronect-hub.js?v='+cacheVersion,'chronect-hub.js?v='+previous);
  }
  return result;
}
module.exports={entries,searchEntries,unitAddition,documentAddition,cacheVersion,withoutMidrouteAddition};
