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
  const drawing = {
    title: 'BAT製品設計図', href: 'chronect-hub-bat-drawing.html',
    description: 'Behavior Assistance Terminalの外観設計および構成部品をまとめた限定内部資料。'
  };
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
    if (term.trim().toLocaleLowerCase('ja') !== 'behavior assistance terminal' || !allEndings(visited())) return null;
    const state = read();
    // The retired specification used opened[110]. Its search state must not unlock the drawing.
    if (state.drawingOpened !== true && !store({ ...state, drawingOpened: true })) return null;
    return drawing;
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
  if (!view || !document.body.dataset.pageNumber) return;
  const number = Number(document.body.dataset.pageNumber);
  const locked = document.querySelector('[data-final-chapter-locked]');
  const archiveButton = document.getElementById('archiveButton');
  let previousAllowed;
  function renderPage() {
    const state = read();
    let allowed = false;
    if (document.body.dataset.pageHref === drawing.href) {
      allowed = allEndings(visited()) && state.drawingOpened === true;
    } else if ((number === 117 || number === 118) && isUnlocked()) {
      allowed = state.reportSent === true && state.disclosed === true && (number === 117 || hasReferences([117]));
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
