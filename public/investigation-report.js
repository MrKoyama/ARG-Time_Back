(() => {
  'use strict';

  const storageKey = 'timeback-investigation-report-v1';
  const mailKey = 'timeback-investigation-mail-v1';
  // Keep the original checkpoints so existing saves retain their progress.
  const phase = {
    initial: 0, contacted: 1, firstReply: 1.1, offered: 1.2,
    cooperationReply: 1.3, completionSent: 1.4, requested: 2,
    sent: 3, deleteRequested: 4, deleted: 5, ended: 6
  };
  const aftermathUrl = 'yaboo-news-aftermath.html';
  const answers = ['BAS', 'SECOND SHIFT', '施設C', 'SUB-117', 'TB-260917-4826'];
  const normalize = value => value.normalize('NFKC').trim().toUpperCase();
  const notesUrl = 'takase-work-notes.html';
  const editorUrl = 'takase-report-editor.html';
  const emptyDraft = () => ({ status: 'unacquired', entries: answers.map(() => ''), confirmed: answers.map(() => false) });
  const matches = (value, index) => normalize(value) === answers[index];
  const byId = id => document.getElementById(id);

  function hasVisited(href) {
    try {
      const pages = JSON.parse(localStorage.getItem('timeback-page-archive-v1'));
      return Array.isArray(pages) && pages.some(page => page?.href === href);
    } catch {
      return false;
    }
  }

  function unlockArchive() {
    delete document.body.dataset.pageArchive;
  }

  function mailPhase() {
    try {
      const value = Number(localStorage.getItem(mailKey));
      return Object.values(phase).includes(value) ? value : phase.initial;
    } catch {
      return phase.initial;
    }
  }

  function advanceMail(expected, next, { removeReport = false } = {}) {
    if (mailPhase() !== expected) return false;
    try {
      localStorage.setItem(mailKey, String(next));
      if (removeReport) {
        try {
          localStorage.removeItem(storageKey);
        } catch (error) {
          localStorage.setItem(mailKey, String(expected));
          throw error;
        }
      }
      const status = byId('report-storage-status');
      if (status) status.textContent = '';
      return true;
    } catch {
      const status = byId('report-storage-status');
      if (status) status.textContent = '進行状況を保存できません。ブラウザの保存設定を確認してください。';
      return false;
    }
  }

  function readReport() {
    if (mailPhase() >= phase.deleted) return emptyDraft();
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      if (!saved || !['draft', 'complete'].includes(saved.status)
        || !Array.isArray(saved.entries) || saved.entries.length !== answers.length
        || !saved.entries.every(value => typeof value === 'string')) return emptyDraft();
      const confirmed = saved.entries.map((value, index) => matches(value, index)
        && (saved.status === 'complete' || saved.confirmed?.[index] === true));
      return { status: confirmed.every(Boolean) ? 'complete' : 'draft', entries: saved.entries, confirmed };
    } catch {
      return emptyDraft();
    }
  }

  function watchReport(refresh) {
    window.addEventListener('pageshow', refresh);
    window.addEventListener('storage', event => {
      if ([storageKey, mailKey, null].includes(event.key)) refresh();
    });
    refresh();
  }

  function saveReport(report) {
    const status = byId('report-storage-status');
    if (mailPhase() >= phase.deleted) return false;
    try {
      localStorage.setItem(storageKey, JSON.stringify(report));
      status.textContent = '';
      return true;
    } catch {
      status.textContent = '文書を保存できません。ブラウザの保存設定を確認してください。';
      return false;
    }
  }

  function initDownloads(button) {
    const progressPanel = byId('report-download-progress');
    const progress = progressPanel.querySelector('progress');
    const contact = byId('report-contact');
    let frame = null;

    function render() {
      const current = mailPhase();
      const deleted = current >= phase.deleted;
      const complete = readReport().status === 'complete';
      contact.hidden = !complete;
      byId('report-deleted-links').hidden = !deleted;
      byId('report-ending-link').hidden = current !== phase.ended;
      byId('report-list-state').textContent = deleted ? '状態：削除済み' : complete ? '状態：完成済み' : '状態：編集途中・未完成';
      button.hidden = deleted;
      button.textContent = complete ? '完成した報告書を閲覧する' : '報告書をダウンロード';
      button.disabled = frame !== null;
    }

    button.addEventListener('click', () => {
      if (frame !== null || mailPhase() >= phase.deleted) return;
      const report = readReport();
      if (report.status === 'complete') {
        location.assign(editorUrl);
        return;
      }
      if (report.status === 'unacquired' && !saveReport({ ...report, status: 'draft' })) return;
      button.disabled = true;
      progressPanel.hidden = false;
      progress.value = 0;
      const started = performance.now();
      function update(now) {
        progress.value = Math.min(100, (now - started) / 15);
        if (progress.value < 100) frame = requestAnimationFrame(update);
        else location.assign(editorUrl);
      }
      frame = requestAnimationFrame(update);
    });

    contact.addEventListener('click', () => {
      if (readReport().status === 'complete') location.assign('takase-mail.html');
    });
    window.addEventListener('pagehide', () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      progressPanel.hidden = true;
    });
    watchReport(render);
  }

  function initMail(view) {
    if (mailPhase() === phase.initial && readReport().status !== 'complete' && !hasVisited('takase-mail.html')) {
      location.replace(notesUrl);
      return;
    }
    unlockArchive();
    view.hidden = false;
    window.initTakaseMail({
      phase, mailPhase, advanceMail, watchReport,
      reportComplete: () => readReport().status === 'complete',
      resetMail: () => advanceMail(mailPhase(), phase.initial),
      deleteReport: () => advanceMail(phase.deleteRequested, phase.deleted, { removeReport: true }),
      shouldResumeDeletion: () => mailPhase() === phase.deleted && !hasVisited(aftermathUrl),
      aftermathUrl
    });
  }

  function initEndingViews() {
    const aftermath = byId('report-aftermath');
    const ending = byId('report-ending');
    const view = aftermath || ending;
    if (!view) return;
    const current = mailPhase();
    const revisit = hasVisited(document.body.dataset.pageHref);
    const eligible = aftermath ? current >= phase.deleted
      : current === phase.ended || (current === phase.deleted && hasVisited(aftermathUrl));
    if (!revisit && !eligible) {
      location.replace(notesUrl);
      return;
    }
    if (ending) advanceMail(phase.deleted, phase.ended);
    unlockArchive();
    view.hidden = false;
  }

  function initEditor(paper) {
    const check = byId('report-check');
    const reset = byId('report-reset');
    const spinner = byId('report-spinner');
    const resetDialog = byId('report-reset-dialog');
    const saveDialog = byId('report-save-dialog');
    const fields = [...paper.querySelectorAll('[data-report-answer]')];
    let saving = null;
    let completedOnSave = false;

    function setBusy(busy) {
      check.disabled = busy;
      reset.disabled = busy;
      spinner.hidden = !busy;
      fields.forEach(field => { field.disabled = busy; });
    }

    function render(report, checked = false) {
      if (report.status === 'unacquired') {
        if (hasVisited(editorUrl)) {
          unlockArchive();
          paper.hidden = true;
          byId('report-unavailable').hidden = false;
        } else location.replace(notesUrl);
        return;
      }
      unlockArchive();
      byId('report-unavailable').hidden = true;
      const complete = report.status === 'complete';
      paper.hidden = false;
      check.hidden = complete;
      byId('report-state').textContent = complete ? '文書状態：完成済み' : '文書状態：草稿・未完成';
      fields.forEach((field, index) => {
        if (field.value !== report.entries[index]) field.value = report.entries[index];
        field.readOnly = report.confirmed[index];
        if (!field.readOnly && checked) field.setAttribute('aria-invalid', 'true');
        else field.removeAttribute('aria-invalid');
      });
    }

    fields.forEach((field, index) => field.addEventListener('input', () => {
      const report = readReport();
      if (report.status !== 'draft' || report.confirmed[index]) {
        render(report);
        return;
      }
      report.entries[index] = field.value;
      saveReport(report);
      field.removeAttribute('aria-invalid');
    }));

    check.addEventListener('click', () => {
      if (saving !== null || resetDialog.open || saveDialog.open) return;
      const report = readReport();
      if (report.status !== 'draft') {
        render(report);
        return;
      }
      report.entries = fields.map((field, index) => report.confirmed[index] ? report.entries[index] : field.value);
      report.confirmed = report.entries.map(matches);
      completedOnSave = report.confirmed.every(Boolean);
      if (completedOnSave) report.status = 'complete';
      setBusy(true);
      saving = window.setTimeout(() => {
        saving = null;
        setBusy(false);
        if (!saveReport(report)) {
          check.focus();
          return;
        }
        render(report, true);
        byId('report-save-title').textContent = completedOnSave ? '報告書の記入が完了しました' : '変更内容を保存しました';
        byId('report-save-description').textContent = completedOnSave
          ? 'すべての項目を確認し、報告書を保存しました。'
          : '記入内容を保存しました。赤色の欄は再確認が必要です。';
        saveDialog.returnValue = '';
        saveDialog.showModal();
      }, 650);
    });

    reset.addEventListener('click', () => {
      if (saving !== null || resetDialog.open || saveDialog.open) return;
      resetDialog.returnValue = '';
      resetDialog.showModal();
    });
    resetDialog.addEventListener('close', () => {
      if (resetDialog.returnValue !== 'reset') return;
      const draft = { ...emptyDraft(), status: 'draft' };
      if (!saveReport(draft)) return;
      render(draft);
      fields[0].focus();
    });
    saveDialog.addEventListener('cancel', event => {
      if (completedOnSave) event.preventDefault();
    });
    saveDialog.addEventListener('close', () => {
      if (completedOnSave && saveDialog.returnValue === 'confirm' && readReport().status === 'complete') {
        location.replace(notesUrl);
      } else {
        (check.hidden ? reset : check).focus();
      }
    });

    function stopSaving() {
      if (saving === null) return;
      window.clearTimeout(saving);
      saving = null;
      setBusy(false);
    }

    window.addEventListener('pagehide', stopSaving);
    watchReport(() => {
      stopSaving();
      render(readReport());
    });
  }

  function initAttachment(button) {
    const status = byId('attachment-status');
    const submission = byId('submission-status');
    let attached = false;

    function render() {
      const report = readReport();
      const complete = report.status === 'complete';
      if (!complete) attached = false;
      status.textContent = {
        unacquired: '添付できる文書がありません。',
        draft: '調査報告書_草稿（未完成）',
        complete: attached ? '調査報告書（完成済み・添付済み）' : '調査報告書（完成済み）'
      }[report.status];
      button.disabled = !complete;
      button.textContent = attached ? '添付を解除する' : '文書を添付する';
      submission.hidden = !attached;
    }

    button.addEventListener('click', () => {
      attached = readReport().status === 'complete' && !attached;
      render();
    });
    watchReport(render);
  }

  const download = byId('report-download');
  const editor = byId('report-document');
  const attach = byId('report-attach');
  const mail = byId('report-mail');
  if (download) initDownloads(download);
  if (editor) initEditor(editor);
  if (attach) initAttachment(attach);
  if (mail) initMail(mail);
  initEndingViews();
})();
