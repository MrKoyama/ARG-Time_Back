(() => {
  'use strict';

  const storageKey = 'timeback-investigation-report-v1';
  const mailKey = 'timeback-investigation-mail-v1';
  const mailStartedKey = 'timeback-investigation-mail-started-at-v1';
  const mailFinalReplyAtKey = 'timeback-investigation-mail-final-reply-at-v1';
  const mailDraftKey = 'timeback-mail-takase-draft-v1';
  const legacyMailHistoryKey = 'timeback-investigation-mail-history-v1';
  const tipKey = 'timeback-investigation-tip-v1';
  const takaseTipKey = 'timeback-investigation-tip-takase-v1';
  // Keep the original checkpoints so existing saves retain their progress.
  const phase = {
    initial: 0, contacted: 1, firstReply: 1.1, offered: 1.2,
    cooperationReply: 1.3, completionSent: 1.4, requested: 2,
    sent: 3, deleteRequested: 4, deleted: 5, ended: 6
  };
  const aftermathUrl = 'yaboo-news-aftermath.html';
  const tipUrl = 'yaboo-news-tip.html';
  const investigationUrl = 'yaboo-news-investigation.html';
  const fullInvestigationUrl = 'yaboo-news-trial-disclosure.html';
  const answers = ['BAS', 'SECOND SHIFT', '施設C', 'SUB-117', 'TB-260917-4826'];
  const normalize = value => value.normalize('NFKC').trim().toUpperCase();
  const notesUrl = 'takase-work-notes.html';
  const editorUrl = 'takase-report-editor.html';
  const emptyDraft = () => ({ status: 'unacquired', entries: answers.map(() => ''), confirmed: answers.map(() => false) });
  const matches = (value, index) => {
    const normalized = normalize(value);
    return normalized === answers[index] || (index === 0 && normalized === 'BEHAVIOR ASSISTANCE SYSTEM');
  };
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

  function updateMailFinalReplyTime(expected, next) {
    try {
      if (next === phase.initial || (expected === phase.initial && next === phase.contacted)) {
        localStorage.removeItem(mailFinalReplyAtKey);
      } else if (expected === phase.sent && next === phase.deleteRequested
        && localStorage.getItem(mailFinalReplyAtKey) === null) {
        localStorage.setItem(mailFinalReplyAtKey, String(Date.now()));
      }
    } catch { /* The optional date does not affect the mail checkpoint. */ }
  }

  function advanceMail(expected, next, { removeReport = false } = {}) {
    if (!window.timebackProgress.isCurrent() || mailPhase() !== expected) return false;
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
      updateMailFinalReplyTime(expected, next);
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
    if (!window.timebackProgress.isCurrent() || mailPhase() >= phase.deleted) return false;
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
    const dialog = byId('report-download-dialog');
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
        if (progress.value < 100) {
          frame = requestAnimationFrame(update);
          return;
        }
        frame = null;
        progressPanel.hidden = true;
        render();
        if (readReport().status !== 'unacquired') {
          dialog.returnValue = '';
          dialog.showModal();
        }
      }
      frame = requestAnimationFrame(update);
    });
    dialog.addEventListener('close', () => {
      if (dialog.returnValue === 'open' && readReport().status !== 'unacquired') location.assign(editorUrl);
    });

    contact.addEventListener('click', () => {
      if (readReport().status === 'complete') location.assign('takase-mail.html#new-message');
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
      phase, mailPhase, mailStartedKey, mailDraftKey, advanceMail, watchReport,
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

  function tipSubmitted(kind = 'player') {
    try {
      return localStorage.getItem(kind === 'takase' ? takaseTipKey : tipKey) === 'submitted';
    } catch {
      return false;
    }
  }

  function initInvestigationViews() {
    const fullArticle = byId('tip-full-investigation');
    const fullEnding = byId('tip-full-ending');
    const full = Boolean(fullArticle || fullEnding);
    const article = fullArticle || byId('tip-investigation');
    const view = article || fullEnding || byId('tip-ending');
    if (!view) return;

    const revisit = hasVisited(document.body.dataset.pageHref);
    const eligible = tipSubmitted(full ? 'takase' : 'player')
      && (article || hasVisited(full ? fullInvestigationUrl : investigationUrl));
    if (!revisit && !eligible) {
      location.replace(tipUrl);
      return;
    }
    unlockArchive();
    view.hidden = false;
  }

  function initEndingFeedback() {
    const page = document.querySelector('.ending-page');
    if (!page || page.hidden) return;

    const feedback = page.querySelector('[data-feedback-url]');
    const feedbackUrl = feedback?.dataset.feedbackUrl.trim();
    if (feedbackUrl) {
      feedback.disabled = false;
      feedback.addEventListener('click', () => window.open(feedbackUrl, '_blank', 'noopener,noreferrer'));
    }
  }

  function rewindBranch() {
    if (!window.timebackProgress.isCurrent() || !hasVisited(document.body.dataset.pageHref)) return false;
    const restore = [];
    function write(key, value) {
      if (value === null) localStorage.removeItem(key);
      else localStorage.setItem(key, value);
    }

    try {
      const report = readReport();
      const entries = report.status === 'complete' ? report.entries : [...answers];
      const updates = [
        [storageKey, JSON.stringify({ status: 'complete', entries, confirmed: entries.map(matches) })],
        [legacyMailHistoryKey, null],
        [mailStartedKey, null],
        [mailFinalReplyAtKey, null],
        [mailDraftKey, null],
        [tipKey, null],
        [takaseTipKey, null],
        [mailKey, null]
      ];
      const previous = new Map(updates.map(([key]) => [key, localStorage.getItem(key)]));
      for (const [key, value] of updates) {
        const original = previous.get(key);
        if (original === value) continue;
        write(key, value);
        restore.push([key, original]);
      }
      return true;
    } catch {
      for (const [key, value] of restore.reverse()) {
        try { write(key, value); } catch { /* Keep restoring the other keys if possible. */ }
      }
      return false;
    }
  }

  function initBranchReturn(button) {
    const dialog = byId('branch-return-dialog');
    const status = byId('branch-return-status');
    button.addEventListener('click', () => {
      status.textContent = '';
      dialog.showModal();
    });
    dialog.querySelector('form').addEventListener('submit', event => {
      if (event.submitter?.value !== 'rewind') return;
      event.preventDefault();
      if (!rewindBranch()) {
        status.textContent = '進行状況を保存できません。ブラウザの保存設定を確認してください。';
        return;
      }
      dialog.close();
      location.assign(notesUrl);
    });
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
    const chapterSeven = window.timebackChapterSeven;
    const status = byId('attachment-status');
    const choice = byId('tip-report-choice');
    const select = byId('tip-report-kind');
    const file = byId('tip-file');
    const fileName = byId('tip-file-name');
    const message = byId('submission-status');
    const controls = byId('tip-controls');
    const submit = byId('tip-submit');
    const dialog = byId('tip-confirmation');
    const confirm = byId('tip-confirm-submit');
    const confirmFile = byId('tip-confirm-file');
    const sendingStatus = byId('tip-sending');
    const receipt = byId('tip-receipt');
    const elapsedStatus = byId('tip-article-notice');
    const reports = {
      player: {
        name: 'TIME BACKの売却時間帯における身体利用に関する調査報告書',
        label: 'あなたが完成させた報告書',
        link: byId('tip-article'),
        key: tipKey
      },
      takase: {
        name: chapterSeven.reportTitle,
        label: '高瀬悠真が完成させた報告書',
        link: byId('tip-full-article'),
        key: takaseTipKey
      }
    };
    let selected = '';
    let attached = '';
    let confirmed = '';
    let presentation = '';
    let activeSubmission = '';
    let presentationTimer;

    function availableReports() {
      const available = [];
      if (readReport().status === 'complete' && !tipSubmitted()) available.push('player');
      if (chapterSeven.reportReceived() && !tipSubmitted('takase')) available.push('takase');
      return available;
    }

    function stopPresentation() {
      window.clearTimeout(presentationTimer);
      presentation = '';
      activeSubmission = '';
    }

    function render() {
      const available = availableReports();
      const submitted = Object.keys(reports).filter(kind => tipSubmitted(kind));
      if (activeSubmission && !submitted.includes(activeSubmission)) stopPresentation();
      const sending = presentation === 'sending';
      if (!available.includes(attached)) attached = '';
      if (!available.includes(selected)) selected = available.length === 1 ? available[0] : '';

      const options = available.length > 1 ? ['', ...available] : available;
      if (Array.from(select.options, option => option.value).join() !== options.join()) {
        select.replaceChildren(...options.map(kind => new Option(reports[kind]?.label || '文書を選択', kind)));
      }
      select.value = selected;
      choice.hidden = available.length < 2;
      select.disabled = sending || Boolean(attached);
      status.textContent = attached ? '添付済み'
        : available.length === 1 ? (available[0] === 'player' ? '調査報告書（完成済み）' : reports.takase.label)
          : available.length ? '添付する文書を選んでください。'
            : readReport().status === 'draft' ? '調査報告書_草稿（未完成）' : '添付できる文書がありません。';
      file.hidden = !attached;
      fileName.textContent = reports[attached]?.name || '';
      button.disabled = !selected || sending;
      button.textContent = attached ? '添付を解除する' : '文書を添付する';
      submit.disabled = confirm.disabled = !attached || sending;
      controls.hidden = submitted.length > 0 && !available.length && !sending;
      sendingStatus.textContent = sending ? '送信しています…' : '';
      receipt.hidden = !submitted.length || sending;
      elapsedStatus.textContent = presentation === 'elapsed' ? '数日後' : '';
      for (const [kind, report] of Object.entries(reports)) {
        report.link.hidden = !submitted.includes(kind) || presentation !== '';
      }
      reports.player.link.textContent = submitted.includes('takase')
        ? '数日後のYaboo!ニュースを確認する（あなたが完成させた報告書）'
        : '数日後のYaboo!ニュースを確認する';
      if (dialog.open && !available.includes(confirmed)) dialog.close('');
    }

    select.addEventListener('change', () => {
      selected = select.value;
      message.textContent = '';
      render();
    });
    button.addEventListener('click', () => {
      if (!availableReports().includes(selected) || presentation === 'sending') return;
      attached = attached ? '' : selected;
      message.textContent = '';
      render();
    });
    submit.addEventListener('click', () => {
      render();
      if (submit.disabled || controls.hidden || dialog.open) return;
      message.textContent = '';
      confirmed = attached;
      confirmFile.textContent = confirmed === 'player'
        ? reports.player.name + '（' + reports.player.label + '）'
        : reports.takase.name;
      dialog.returnValue = '';
      dialog.showModal();
    });
    dialog.addEventListener('close', () => {
      const kind = confirmed;
      confirmed = '';
      if (dialog.returnValue !== 'submit' || !kind || !window.timebackProgress.isCurrent() || tipSubmitted(kind)) return;
      if (attached !== kind || !availableReports().includes(kind)) {
        render();
        message.textContent = '添付した調査報告書を確認できませんでした。';
        return;
      }
      try {
        localStorage.setItem(reports[kind].key, 'submitted');
      } catch {
        message.textContent = '情報提供の状態を保存できません。ブラウザの保存設定を確認してください。';
        return;
      }
      stopPresentation();
      activeSubmission = kind;
      presentation = 'sending';
      render();
      presentationTimer = window.setTimeout(() => {
        presentation = 'receipt';
        render();
        byId('tip-receipt-title').focus();
        presentationTimer = window.setTimeout(() => {
          presentation = 'elapsed';
          render();
          presentationTimer = window.setTimeout(() => {
            stopPresentation();
            render();
          }, 850);
        }, 500);
      }, 650);
    });
    window.addEventListener('pagehide', stopPresentation);
    window.addEventListener('storage', event => {
      if ([tipKey, takaseTipKey, chapterSeven.aizawaKey].includes(event.key)) render();
    });
    watchReport(render);
  }

  const download = byId('report-download');
  const editor = byId('report-document');
  const attach = byId('report-attach');
  const mail = byId('report-mail');
  const branchReturn = byId('branch-return');
  if (download) initDownloads(download);
  if (editor) initEditor(editor);
  if (attach) initAttachment(attach);
  if (mail) initMail(mail);
  initEndingViews();
  initInvestigationViews();
  initEndingFeedback();
  if (branchReturn) initBranchReturn(branchReturn);
})();
