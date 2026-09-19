const archiveStorageKey='timeback-page-archive-v1';
const totalPages=60;
const archiveTitleByNumber={
  1:'トップページ ｜ TIME BACK',
  2:'サービスについて ｜ TIME BACK',
  3:'料金・報酬 ｜ TIME BACK',
  4:'安全性について ｜ TIME BACK',
  5:'よくある質問 ｜ TIME BACK',
  6:'利用規約 ｜ TIME BACK',
  7:'お問い合わせ ｜ TIME BACK',8:'TIME BACK MARKET ｜ TIME BACK',9:'Behavior Assistance System ｜ TIME BACK',10:'TIME BACK ID ご利用ガイド ｜ TIME BACK',
  13:'法人向け案内 ｜ TIME BACK for Business',
  14:'法人向けサービス ｜ TIME BACK for Business',
  15:'活用シーン ｜ TIME BACK for Business',
  16:'法人向け安全管理 ｜ TIME BACK for Business',
  17:'導入の流れ ｜ TIME BACK for Business'
};
const businessPageNumberByHref={'business.html':13,'business-service.html':14,'business-cases.html':15,'business-safety.html':16,'business-flow.html':17};
const currentPage=document.body.dataset.pageArchive==='exclude'?null:{
  number:Number(document.body.dataset.pageNumber),
  title:document.body.dataset.pageTitle,
  href:document.body.dataset.pageHref
};
const archiveButton=document.getElementById('archiveButton');
const archiveOverlay=document.getElementById('archiveOverlay');
const archiveClose=document.getElementById('archiveClose');
const archiveList=document.getElementById('archiveList');
const archiveResetButton=document.getElementById('archiveResetButton');
const resetConfirm=document.getElementById('resetConfirm');
const resetCancel=document.getElementById('resetCancel');
const resetAccept=document.getElementById('resetAccept');
function loadArchive(){try{const saved=JSON.parse(localStorage.getItem(archiveStorageKey)||'[]');if(!Array.isArray(saved))return[];return saved.map(page=>businessPageNumberByHref[page.href]?{...page,number:businessPageNumberByHref[page.href]}:page).map(page=>archiveTitleByNumber[page.number]?{...page,title:archiveTitleByNumber[page.number]}:page)}catch(error){return[]}}
function saveArchive(pages){try{localStorage.setItem(archiveStorageKey,JSON.stringify(pages))}catch(error){return}}
function registerCurrentPage(){const pages=loadArchive();if(!currentPage)return pages;const index=pages.findIndex(page=>page.number===currentPage.number);if(index>=0)pages[index]=currentPage;else pages.push(currentPage);pages.sort((a,b)=>a.number-b.number);saveArchive(pages);return pages}
function renderArchive(){const pages=registerCurrentPage();archiveList.textContent='';for(let pageNumber=1;pageNumber<=totalPages;pageNumber+=1){const page=pages.find(savedPage=>savedPage.number===pageNumber),item=document.createElement('li'),entry=document.createElement(page?'a':'div'),number=document.createElement('span'),title=document.createElement('span');entry.className='archive-entry';number.className='archive-number';title.className='archive-title';number.textContent=String(pageNumber).padStart(2,'0');if(page){entry.href=page.href;title.textContent=page.title}else{entry.classList.add('is-locked');title.textContent='？？？'}entry.append(number,title);item.appendChild(entry);archiveList.appendChild(item)}}
function openArchive(){renderArchive();resetConfirm.hidden=true;archiveOverlay.classList.add('is-open');archiveOverlay.setAttribute('aria-hidden','false');document.body.classList.add('archive-open');archiveClose.focus()}
function closeArchive(){resetConfirm.hidden=true;archiveOverlay.classList.remove('is-open');archiveOverlay.setAttribute('aria-hidden','true');document.body.classList.remove('archive-open');archiveButton.focus()}
registerCurrentPage();
archiveButton.addEventListener('click',openArchive);
archiveClose.addEventListener('click',closeArchive);
archiveOverlay.addEventListener('click',event=>{if(event.target===archiveOverlay)closeArchive()});
archiveResetButton.addEventListener('click',()=>{resetConfirm.hidden=false;resetCancel.focus()});
resetCancel.addEventListener('click',()=>{resetConfirm.hidden=true;archiveResetButton.focus()});
resetAccept.addEventListener('click',()=>{try{localStorage.removeItem(archiveStorageKey)}catch(error){return}window.location.href='index.html'});
document.addEventListener('keydown',event=>{if(event.key!=='Escape'||!archiveOverlay.classList.contains('is-open'))return;if(!resetConfirm.hidden){resetConfirm.hidden=true;archiveResetButton.focus()}else closeArchive()});
