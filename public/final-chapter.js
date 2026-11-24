(() => {
  'use strict';

  const key = 'timeback-final-chapter-v1';
  const archiveKey = 'timeback-page-archive-v1';
  const endingUrls = [
    'timeback-ending-record.html',
    'timeback-ending-blind-spot.html',
    'timeback-ending-full-disclosure.html'
  ];
  const urls = {
    110: 'chronect-hub-bat-spec.html',
    111: 'chronect-hub-bat-control.html',
    112: 'chronect-hub-mmu-spec.html',
    113: 'bat-device-diagnostics.html',
    114: 'chronect-hub-bat-emergency.html',
    115: 'chronect-hub-memory-recovery.html',
    116: 'bat-recovery-report.html',
    117: 'yaboo-news-timeback-suspension.html',
    118: 'timeback-ending-own-time.html'
  };
  const materials = [
    { number: 110, term: 'behavior assistance terminal', title: 'Behavior Assistance Terminal 製品仕様書',
      description: '法人利用者のセッション実行端末に関する製品仕様。' },
    { number: 111, prior: 110, term: 'bat制御系統', title: 'BAT制御系統図',
      description: 'BATの機能構成と各制御系統の連携。' },
    { number: 112, prior: 111, term: 'mmu', title: 'MMU — 記憶管理機構 詳細仕様',
      description: '記憶管理機構の設定とセッション処理に関する仕様。' },
    { number: 114, prior: 112, term: 'bat緊急対応', title: 'BAT緊急対応マニュアル',
      description: 'BATの状態確認と異常分類に関する資料。' },
    { number: 115, prior: 114, term: '隔離記憶復旧', title: '隔離記憶復旧手順書',
      description: '利用者向け復旧機能の実行条件と処理項目。' }
  ];
  const fields = [
    { code: 'CLASSIFICATION', label: '異常分類' },
    { code: 'TASK_ACCEPT', label: 'TASK_ACCEPT' },
    { code: 'REJECT_SCOPE', label: 'REJECT_SCOPE' },
    { code: 'MEMORY_PROFILE', label: 'MEMORY_PROFILE' },
    { code: 'REFERENCE_BOUNDARY', label: 'REFERENCE_BOUNDARY' }
  ];
  const actions = [
    { code: 'MERGE', label: '記憶統合' },
    { code: 'VERIFY', label: '整合性確認' },
    { code: 'RESTORE', label: '参照復元' },
    { code: 'RECOVERY', label: '復旧モード移行' },
    { code: 'NORMALIZE', label: '設定正常化' }
  ];
  const expected = ['M-03', 'DENY', 'TASK_ONLY', 'SESSION', 'DYNAMIC'];
  const expectedOrder = ['RECOVERY', 'NORMALIZE', 'RESTORE', 'MERGE', 'VERIFY'];

  function readJson(storageKey) {
    try { return JSON.parse(localStorage.getItem(storageKey)); } catch { return null; }
  }

  function visited() {
    const pages = readJson(archiveKey);
    return new Set(Array.isArray(pages) ? pages.map(page => page?.href) : []);
  }

  function read() {
    const state = readJson(key);
    const defaults = {
      opened: [], mailProgress: 0, mailDraftLength: 0, answers: {}, order: [],
      solved: false, diagnostics: false, consented: false, recovered: false,
      reportSent: false, disclosed: false
    };
    if (!state || typeof state !== 'object' || Array.isArray(state)) return defaults;
    return {
      ...defaults,
      ...state,
      opened: Array.isArray(state.opened) ? state.opened : defaults.opened,
      answers: state.answers && typeof state.answers === 'object' ? state.answers : defaults.answers,
      order: Array.isArray(state.order) ? state.order : defaults.order,
      mailProgress: Number.isSafeInteger(state.mailProgress) && state.mailProgress >= 0 ? state.mailProgress : 0,
      mailDraftLength: Number.isSafeInteger(state.mailDraftLength) && state.mailDraftLength >= 0 ? state.mailDraftLength : 0
    };
  }

  function allEndings(archive) {
    return endingUrls.every(href => archive.has(href));
  }

  function isUnlocked() {
    return allEndings(visited()) && read().opened.includes(110);
  }

  function hasReferences(numbers, archive = visited()) {
    return numbers.every(number => archive.has(urls[number]));
  }

  function canDiagnose() {
    return isUnlocked() && hasReferences([110, 111, 112]);
  }

  function canSolve() {
    return canDiagnose() && read().diagnostics === true && hasReferences([113, 114, 115]);
  }

  function store(state) {
    if (!window.timebackProgress.isCurrent()) return false;
    try {
      localStorage.setItem(key, JSON.stringify(state));
      return true;
    } catch {
      return false;
    }
  }

  function update(transform) {
    if (!isUnlocked()) return false;
    const next = transform(read());
    return Boolean(next && store(next));
  }

  function search(term) {
    const material = materials.find(item => item.term === term.trim().toLocaleLowerCase('ja'));
    if (!material) return null;
    const archive = visited();
    const state = read();
    if (!allEndings(archive)) return null;
    if (material.prior && (!state.opened.includes(110) || !archive.has(urls[material.prior]))) return null;
    if (!state.opened.includes(material.number) &&
        !store({ ...state, opened: [...state.opened, material.number] })) return null;
    return { title: material.title, href: urls[material.number], description: material.description };
  }

  function validate(answers, order) {
    const invalidFields = fields.filter(({ code }, index) =>
      String(answers[code] ?? '').normalize('NFKC').trim().toUpperCase() !== expected[index]
    ).map(({ code }) => code);
    return {
      invalidFields,
      orderValid: order.length === expectedOrder.length && expectedOrder.every((code, index) => order[index] === code)
    };
  }

  window.timebackFinalChapter = { key, urls, read, update, isUnlocked, canDiagnose, canSolve, fields, actions, validate, search };

  const view = document.querySelector('[data-final-chapter-view]');
  if (!view) return;
  const number = Number(document.body.dataset.pageNumber);
  const locked = document.querySelector('[data-final-chapter-locked]');
  const archiveButton = document.getElementById('archiveButton');
  let previousAllowed;
  function renderPage() {
    const state = read();
    let allowed = isUnlocked();
    if (allowed) {
      if (number === 113) allowed = state.diagnostics === true;
      else if (number === 116) allowed = state.recovered === true;
      else if (number === 117) allowed = state.reportSent === true && state.disclosed === true;
      else if (number === 118) allowed = state.reportSent === true && state.disclosed === true && hasReferences([117]);
      else allowed = state.opened.includes(number);
    }
    if (allowed && previousAllowed === false) {
      // Let the shared archive register a page that became available in another tab.
      location.reload();
      return;
    }
    previousAllowed = allowed;
    if (allowed) delete document.body.dataset.pageArchive;
    else document.body.dataset.pageArchive = 'exclude';
    view.hidden = !allowed;
    if (locked) locked.hidden = allowed;
    if (archiveButton) archiveButton.textContent = allowed ? number + ' / 120' : 'ページアーカイブ';
  }

  renderPage();
  window.addEventListener('pageshow', event => { if (event.persisted) renderPage(); });
  window.addEventListener('storage', event => {
    if (event.key === key || event.key === archiveKey || event.key === null) renderPage();
  });
})();
