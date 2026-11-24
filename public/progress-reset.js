(() => {
  'use strict';

  const progressKeys = [
    'timeback-page-archive-v1',
    'timeback-investigation-report-v1',
    'timeback-investigation-mail-v1',
    'timeback-investigation-mail-started-at-v1',
    'timeback-investigation-mail-history-v1',
    'timeback-mail-takase-draft-v1',
    'timeback-mail-aizawa-v1',
    'timeback-mail-contacts-v1',
    'timeback-mail-view-v1',
    'timeback-investigation-tip-v1',
    'timeback-investigation-tip-takase-v1',
    'timeback-web-operations-log-v1',
    'timeback-final-chapter-v1'
  ];
  const resetKey = 'timeback-progress-reset-v1';
  const pendingPrefix = 'pending:';

  function readGeneration() {
    try { return localStorage.getItem(resetKey); } catch { return undefined; }
  }

  const pageGeneration = readGeneration();
  let returningToStart = false;

  function isPending(generation) {
    return typeof generation === 'string' && generation.startsWith(pendingPrefix);
  }

  function returnToStart() {
    if (returningToStart) return;
    returningToStart = true;
    location.replace('index.html');
  }

  function checkGeneration() {
    const generation = readGeneration();
    if (generation !== undefined && generation !== pageGeneration && !isPending(generation)) {
      returnToStart();
    }
  }

  function isCurrent() {
    const generation = readGeneration();
    if (generation !== pageGeneration) checkGeneration();
    return !returningToStart && generation === pageGeneration && !isPending(generation);
  }

  function reset() {
    const confirmation = document.getElementById('resetConfirm');
    if (!confirmation || confirmation.hidden) return;
    const error = document.getElementById('resetError');
    const button = document.getElementById('resetAccept');
    if (returningToStart || pageGeneration === undefined || readGeneration() !== pageGeneration) {
      checkGeneration();
      if (!returningToStart) error.hidden = false;
      return;
    }
    error.hidden = true;
    button.disabled = true;
    const removed = [];
    let started = false;
    try {
      const saved = progressKeys.map(key => [key, localStorage.getItem(key)]);
      const generation = Array.from(crypto.getRandomValues(new Uint32Array(4)), value => value.toString(16)).join('-');
      localStorage.setItem(resetKey, pendingPrefix + generation);
      started = true;
      for (const [key, value] of saved) {
        localStorage.removeItem(key);
        if (value !== null) removed.push([key, value]);
      }
      localStorage.setItem(resetKey, generation);
    } catch {
      if (started) {
        for (const [key, value] of removed) {
          try { localStorage.setItem(key, value); } catch { /* Continue restoring other entries. */ }
        }
        try {
          if (pageGeneration === null) localStorage.removeItem(resetKey);
          else localStorage.setItem(resetKey, pageGeneration);
        } catch { /* The confirmation stays open on failure. */ }
      }
      error.hidden = false;
      button.disabled = false;
      button.focus();
      return;
    }
    returnToStart();
  }

  window.timebackProgress = { isCurrent, reset };
  // A history entry may also be loaded from scratch after leaving the back/forward cache.
  if (pageGeneration !== undefined && !isPending(pageGeneration)) {
    const entry = history.state;
    const backForward = performance.getEntriesByType('navigation')[0]?.type === 'back_forward';
    const entryGeneration = entry?.timebackProgressGeneration ?? null;
    if (backForward && entryGeneration !== pageGeneration) returnToStart();
    else history.replaceState({ ...entry, timebackProgressGeneration: pageGeneration }, '');
  }
  window.addEventListener('storage', event => {
    if (event.key === resetKey || event.key === null) checkGeneration();
  });
  window.addEventListener('pageshow', checkGeneration);
})();
