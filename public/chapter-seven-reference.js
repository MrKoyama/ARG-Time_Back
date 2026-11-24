(() => {
  'use strict';

  const archiveKey = 'timeback-page-archive-v1';
  const mailKey = 'timeback-investigation-mail-v1';
  const aizawaKey = 'timeback-mail-aizawa-v1';
  const approvalUrl = 'chronect-trial-continuation-approval.html';
  const lastNoteUrl = 'takase-final-investigation-note.html';
  const discoveryNoteUrl = 'takase-evidence-discovery.html';
  const reportUrl = 'takase-completed-report.html';
  const reportTitle = 'TIME BACKおよびSECOND SHIFTに関する調査報告書';
  const requiredReferences = [
    approvalUrl,
    lastNoteUrl,
    'chronect-hub-business-integration-plan.html',
    'chronect-hub-second-shift-settlement.html',
    'chronect-hub-skill-model-record.html',
    'chronect-hub-second-shift-strategy.html'
  ];

  function read(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  }

  function hasVisited(href) {
    try {
      const pages = JSON.parse(read(archiveKey));
      return Array.isArray(pages) && pages.some(page => page?.href === href);
    } catch {
      return false;
    }
  }

  function aizawaState() {
    try {
      const state = JSON.parse(read(aizawaKey));
      const progress = state?.progress;
      if (Number.isInteger(progress) && progress >= 0) {
        if (state.route === 2 && progress <= 15) return state;
        if (state.route === undefined && progress <= 16) {
          return { ...state, route: 2, progress: Math.min(progress, 8),
            draftLength: progress < 8 ? state.draftLength : 0, reportReceived: false };
        }
      }
    } catch { /* Allow an unreadable save to fall back to the initial state. */ }
    return { route: 2, progress: 0, startedAt: 0, draftLength: 0, reportReceived: false };
  }

  const reportReceived = () => aizawaState().reportReceived === true;
  const canContactAgain = () => requiredReferences.every(hasVisited);

  window.timebackChapterSeven = {
    archiveKey, aizawaKey, aizawaState, reportReceived, reportUrl, reportTitle, canContactAgain
  };

  const view = document.querySelector('[data-chapter-seven-view]');
  if (!view) return;

  const current = document.body.dataset.pageHref;
  const priorPage = {
    'chronect-internal-correspondence.html': 'takase-investigation-stall.html',
    [reportUrl]: 'takase-mail.html#aizawa'
  }[current] ?? (requiredReferences.includes(current) ? discoveryNoteUrl : null);
  const allowed = current === reportUrl ? reportReceived() : hasVisited(current) || hasVisited(priorPage);
  if (!allowed) {
    location.replace(current === reportUrl ? priorPage : 'nodelink-internal-search.html');
    return;
  }

  delete document.body.dataset.pageArchive;
  view.hidden = false;

  const followup = document.getElementById('chapter-seven-followup');
  if (followup) {
    function render() {
      // The final reply is delivered at 4. Deletion and ending are later checkpoints.
      followup.hidden = !['4', '5', '6'].includes(read(mailKey));
    }
    window.addEventListener('pageshow', render);
    window.addEventListener('storage', event => {
      if (event.key === mailKey || event.key === null) render();
    });
    render();
  }
})();
