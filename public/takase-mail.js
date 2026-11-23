(() => {
  'use strict';

  const takaseSteps = [
    {
      "outgoing": "初めまして。突然のご連絡失礼します。\nChronectについて調査していたところ、社内の資料と思われる記録をいくつか発見しました。\n調査作業控えに記載されていたメールアドレスから連絡しています。\nこちらは高瀬悠真さんの連絡先でしょうか？",
      "reply": "失礼ですが、どちら様でしょうか。\n内部資料というのは、何のことでしょう。\nそもそも、社外の方が閲覧できるようなものではないはずです。\nこのメールアドレスをどこで知ったのか分かりませんが、いたずらや興味本位の連絡でしたら、お控えください。",
      "mobileLabel": "高瀬に連絡する"
    },
    {
      "outgoing": "突然の連絡で驚かせてしまい、申し訳ありません。\nですが、いたずらではありません。\n私はTIME BACKについて調べる中で、Chronectが利用者に説明していない活動を行っている可能性に気づきました。\n安心してください。私はChronectの問題を明らかにするため、告発に協力したいと考えています。",
      "reply": "……そういうことでしたか。\nそれなら安心しました。\nこちらこそ、失礼なことを申し上げました。\n実は、あなたのような方からの連絡を待っていました。\nもしかして、調査に関する報告書なども発見されていますか？",
      "mobileLabel": "告発への協力を申し出る"
    },
    {
      "outgoing": "はい。調査作業控えにあった報告書の草稿を発見しました。\n関連する記録を調べ、不足していた項目についても、すべて記入を終えています。",
      "reply": "本当ですか。あの報告書を完成させてくださったのですね。\nありがとうございます。\n当時はWeb関連の管理業務をほとんど一人で任されていて、毎日の対応に追われるばかりでした。\nあまりにも仕事が多く、本来やるべき業務も満足に進められず、Web運用日誌の記入や資料の整理など、後回しにしてしまったことも少なくありません。\n……すみません。余計な話をしてしまいましたね。\nそれよりも、完成した報告書について、ぜひ内容を確認させていただきたいです。\nお手数ですが、こちらに送っていただくことは可能でしょうか？",
      "mobileLabel": "報告書の完成を伝える"
    },
    {
      "outgoing": "承知しました。\n完成した調査報告書を添付します。\n内容をご確認ください。",
      "reply": "報告書を受け取りました。\nありがとうございます。\nこれだけの情報を集めるのは、決して簡単ではなかったと思います。\nいただいた資料を確認し、告発についてはこちらで対応させていただきます。\nただ、一つお願いがあります。\n今回の件は、あなたが考えている以上に慎重に扱う必要があります。\n万が一、あなたが報告書を所持していることが知られれば、調査に協力していただいたあなた自身にも危険が及ぶかもしれません。\n必要な情報はこちらで確認できましたので、お手元に残っている報告書は完全に削除してください。\nどうか、ご自身の安全を第一に考えてください。",
      "mobileLabel": "報告書を送信する"
    }
  ];

  const aizawaSteps = [
    {
      outgoing: '突然のご連絡、失礼します。\n相沢直人さんでお間違いないでしょうか。',
      reply: 'はい、相沢です。\n失礼ですが、どちら様でしょうか。',
      mobileLabel: '相沢に連絡する'
    },
    {
      outgoing: 'Chronectという企業について調べています。\n突然こんなことを言われても困ると思いますが、私はあなたの味方です。',
      reply: '……すみません、話が見えないんですが。\nどういうご用件ですか？',
      mobileLabel: 'Chronectについて伝える'
    },
    {
      outgoing: 'あなたが身分を偽って、ノードリンクに入社したことも知っています。',
      reply: 'は？\nちょっと待ってください。何を言ってるんですか？',
      mobileLabel: '入社について伝える'
    },
    {
      outgoing: '高瀬悠真さん、ですよね？',
      reply: '……誰ですか、それ。',
      mobileLabel: '名前を確認する'
    },
    {
      outgoing: 'え？\n高瀬悠真という名前に、本当に心当たりがないんですか？',
      reply: 'ありません。\nそもそも、どうして俺がその人だと思ったんですか？',
      mobileLabel: '心当たりがないか聞く'
    },
    {
      outgoing: '高瀬さんが残した調査ノートを見つけました。\n提携企業への潜入に成功したことや、Web関連の仕事を任されたことが書かれています。\n\nその内容を御社の人材情報と照合して、あなたにたどり着いたんです。',
      reply: '……調査ノート？\n\nちょっと待ってください。確認したいことがあります。',
      mobileLabel: '調査ノートについて伝える'
    }
  ];

  const aizawaContinuation = [
    {
      incoming: true,
      text: '……ありました。\n\n作業フォルダに、調査に関する記録が残っています。\n\n作成者は俺になっているんですが、こんなことを調べていた覚えがありません。\n\nあなたの言っていた話と関係があるかもしれないので、送ります。\n\n一度、確認してもらえますか。',
      attachment: { label: '調査経過メモ', href: 'takase-investigation-progress.html' }
    },
    {
      incoming: false,
      text: '送っていただいた記録をもとに、社内の利用状況も確認してみました。\n\n相沢さんは、以前よりTIME BACKの利用が増えているようです。\n\nこの件について、ほかに何か記録は残っていませんか？',
      mobileLabel: '追加調査を依頼する'
    },
    {
      incoming: true,
      text: '……確かに、最近もTIME BACKは使っています。\n\nでも、そんな記録まで残っていたんですね。\n\nもう少し探してみます。'
    },
    {
      incoming: true,
      text: '別の記録が見つかりました。\n\n端末の設定と調査内容をまとめた控えのようです。\n\nただ、これも書いた覚えがありません。\n\n少なくともWeb関係の部分なら内容は理解できそうなので、送ります。',
      attachment: { label: '端末・調査記録の控え', href: 'takase-device-investigation-note.html' }
    }
  ];

  const contacts = {
    takase: { id: 'takase', name: '高瀬', fullName: '高瀬悠真', avatar: '高', address: 'y.takase@chronect.mail', title: '調査作業控えについて', steps: takaseSteps },
    aizawa: { id: 'aizawa', name: '相沢', fullName: '相沢直人', avatar: '相', address: 'aizawa.naoto@nodelink.mail', title: '相沢直人とのやり取り', steps: aizawaSteps }
  };

  const contactsKey = 'timeback-mail-contacts-v1';
  const aizawaKey = 'timeback-mail-aizawa-v1';
  const viewKey = 'timeback-mail-view-v1';
  const typingCodes = /^(?:Key[A-Z]|Digit[0-9]|Numpad[0-9]|NumpadAdd|NumpadSubtract|NumpadMultiply|NumpadDivide|NumpadDecimal)$/;
  const punctuationCodes = new Set(['Space', 'Minus', 'Equal', 'BracketLeft', 'BracketRight', 'Backslash', 'Semicolon', 'Quote', 'Comma', 'Period', 'Slash', 'Backquote', 'IntlBackslash', 'IntlRo', 'IntlYen']);

  const byId = id => document.getElementById(id);

  function read(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  }

  function readObject(key) {
    try { return JSON.parse(read(key)); } catch { return null; }
  }

  function write(key, value) {
    try {
      if (value === null) localStorage.removeItem(key);
      else localStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  }

  window.initTakaseMail = function ({ phase, mailPhase, mailStartedKey, mailDraftKey, advanceMail, reportComplete, resetMail, watchReport, deleteReport, shouldResumeDeletion, aftermathUrl, hasVisited }) {
    const checkpoints = [phase.initial, phase.contacted, phase.firstReply, phase.offered, phase.cooperationReply, phase.completionSent, phase.requested, phase.sent, phase.deleteRequested];
    const newMessage = byId('newMessage');
    const addressPanel = byId('addressPanel');
    const addressForm = byId('addressForm');
    const mailAddress = byId('mailAddress');
    const addressStatus = byId('addressStatus');
    const mailContacts = byId('mailContacts');

    const threadPanel = byId('threadPanel');
    const threadTitle = byId('threadTitle');
    const threadAddress = byId('threadAddress');
    const threadAvatar = byId('threadAvatar');
    const messageLog = byId('messageLog');
    const dateDivider = byId('dateDivider');
    const typingRow = byId('typingRow');
    const typingAvatar = byId('typingAvatar');
    const replyInput = byId('replyInput');
    const replyMirror = byId('replyMirror');
    const replyMirrorText = byId('replyMirrorText');
    const sendButton = byId('sendButton');
    const mobileReply = byId('mobileReply');
    const composer = byId('composer');
    const composerGuide = byId('composerGuide');
    const desktopComposer = byId('desktopComposer');
    const waitingNote = byId('waitingNote');
    const threadStatus = byId('threadStatus');
    const resetButton = byId('resetButton');

    const confirmOverlay = byId('confirmOverlay');
    const confirmTitle = byId('confirmTitle');
    const confirmMessage = byId('confirmMessage');
    const confirmCancel = byId('confirmCancel');
    const confirmAccept = byId('confirmAccept');
    const archiveOverlay = byId('archiveOverlay');

    const reportAttach = byId('reportAttach');
    const reportAttachmentActions = byId('reportAttachmentActions');
    const reportAttached = byId('reportAttached');
    const reportDetach = byId('reportDetach');
    const reportPicker = byId('reportPicker');
    const reportDelete = byId('reportDelete');
    const reportAftermathLink = byId('reportAftermathLink');
    const reportDeletionActions = byId('reportDeletionActions');
    const reportDeleteDialog = byId('reportDeleteDialog');
    const reportDeleteTitle = byId('reportDeleteTitle');
    const reportDeleteMessage = byId('reportDeleteMessage');
    const reportDeleteProgress = byId('reportDeleteProgress');
    const reportDeleteCancel = byId('reportDeleteCancel');
    const reportDeleteConfirm = byId('reportDeleteConfirm');
    const reportDeleteClose = byId('reportDeleteClose');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = window.matchMedia('(min-width: 701px)');
    const replyTimers = new Map();
    const registeredContacts = new Set();
    const savedContact = read(viewKey);
    let view = 'address';
    let activeContact = null;
    let renderedProgress = null;
    let renderedComplete = null;
    let renderedDraft = false;
    let typedLength = 0;
    let attached = false;
    let deletionDialogState = '';
    let deletionTimer;
    let fading = false;
    let aftermathTimer;
    let pendingConfirmAction = null;
    let confirmReturnTarget = null;

    function aizawaState() {
      const state = readObject(aizawaKey);
      const total = aizawaSteps.length * 2 + aizawaContinuation.length;
      return Number.isInteger(state?.progress) && state.progress >= 0 && state.progress <= total
        ? state : { progress: 0, startedAt: 0, draftLength: 0 };
    }

    function messageAt(contact, index) {
      const step = contact.steps[Math.floor(index / 2)];
      if (step) return index % 2 === 1
        ? { incoming: true, text: step.reply }
        : { incoming: false, text: step.outgoing, mobileLabel: step.mobileLabel };
      if (contact.id === 'aizawa') return aizawaContinuation[index - aizawaSteps.length * 2];
    }

    function availableDraft(contact, current) {
      const message = messageAt(contact, current);
      if (!message || message.incoming) return null;
      if (contact.id === 'aizawa' && current >= aizawaSteps.length * 2
        && (!hasVisited(aizawaContinuation[0].attachment.href) || !hasVisited('nodelink-usage-review.html'))) return null;
      return message;
    }

    function progress(contact) {
      if (contact.id === 'aizawa') return aizawaState().progress;
      const current = mailPhase();
      return current >= phase.deleteRequested ? takaseSteps.length * 2 : checkpoints.indexOf(current);
    }

    function startedAt(contact) {
      if (contact.id === 'aizawa') return Number(aizawaState().startedAt) || 0;
      return Number(read(mailStartedKey)) || 0;
    }

    function advance(contact, current) {
      if (contact.id === 'takase') return advanceMail(checkpoints[current], checkpoints[current + 1]);
      const state = aizawaState();
      if (state.progress !== current) return false;
      return write(aizawaKey, JSON.stringify({
        progress: current + 1, startedAt: state.startedAt || Date.now(), draftLength: 0
      }));
    }

    function draftLength(contact, current) {
      const message = messageAt(contact, current);
      if (!message || message.incoming) return 0;
      const draft = contact.id === 'takase' ? readObject(mailDraftKey) : aizawaState();
      return draft?.progress === current && Number.isInteger(draft.draftLength)
        ? Math.min(message.text.length, Math.max(0, draft.draftLength))
        : 0;
    }

    function saveDraft(contact, current) {
      const saved = contact.id === 'takase'
        ? write(mailDraftKey, JSON.stringify({ progress: current, draftLength: typedLength }))
        : write(aizawaKey, JSON.stringify({ ...aizawaState(), draftLength: typedLength }));
      if (!saved) showStorageError();
    }

    function showStorageError() {
      byId('report-storage-status').textContent = '進行状況を保存できません。ブラウザの保存設定を確認してください。';
    }

    function messageTime(contact, index) {
      return startedAt(contact) + Math.floor(index / 2) * 120000 + (index % 2 ? 45000 : 0);
    }

    function createMessage(contact, index, animate) {
      const message = messageAt(contact, index);
      const { incoming } = message;
      const row = document.createElement('div');
      const wrap = document.createElement('div');
      const meta = document.createElement('p');
      const bubble = document.createElement('div');
      row.className = 'message-row ' + (incoming ? 'incoming' : 'outgoing');
      if (!animate) row.style.animation = 'none';
      wrap.className = 'message-wrap';
      meta.className = 'message-meta';
      bubble.className = 'bubble';
      const stamp = animate ? Date.now() : messageTime(contact, index);
      meta.textContent = (incoming ? contact.name : '自分') + '・' + new Intl.DateTimeFormat('ja-JP', {
        hour: '2-digit', minute: '2-digit', hour12: false
      }).format(new Date(stamp || Date.now()));
      bubble.textContent = message.text;

      if (contact.id === 'takase' && index === 6) {
        const file = reportAttached.cloneNode(true);
        file.removeAttribute('id');
        file.querySelector('button').remove();
        file.hidden = false;
        bubble.appendChild(file);
      }

      if (message.attachment) {
        const link = document.createElement('a');
        const caption = document.createElement('span');
        link.className = 'message-link';
        link.href = message.attachment.href;
        caption.className = 'link-caption';
        caption.textContent = '添付資料';
        link.append(caption, message.attachment.label);
        bubble.append(link);
      }

      if (incoming) {
        const avatar = document.createElement('span');
        avatar.className = 'message-avatar';
        avatar.setAttribute('aria-hidden', 'true');
        avatar.textContent = contact.avatar;
        row.appendChild(avatar);
      }
      wrap.append(meta, bubble);
      row.appendChild(wrap);
      messageLog.insertBefore(row, typingRow);
    }

    function scrollToLatest() {
      window.requestAnimationFrame(() => {
        if (view === 'thread') messageLog.scrollTop = messageLog.scrollHeight;
      });
    }

    function focusComposerIfReady() {
      if (view !== 'thread' || !desktop.matches || replyInput.disabled || fading
        || reportPicker.open || reportDeleteDialog.open || confirmOverlay.classList.contains('is-open')
        || archiveOverlay.classList.contains('is-open')) return;
      window.requestAnimationFrame(() => {
        if (view !== 'thread' || replyInput.disabled) return;
        const selection = window.getSelection();
        if (selection && !selection.isCollapsed && selection.getRangeAt(0).intersectsNode(messageLog)) return;
        replyInput.focus({ preventScroll: true });
        const caret = replyInput.value.length;
        replyInput.setSelectionRange(caret, caret);
      });
    }

    function canSend(contact, current) {
      return contact.id !== 'takase' || (reportComplete() && (current !== 6 || attached));
    }

    function updateAttachmentControls() {
      const takase = activeContact?.id === 'takase';
      const eligible = takase && reportComplete() && mailPhase() === phase.requested;
      if (takase && !eligible) attached = false;
      reportAttachmentActions.hidden = !eligible;
      reportAttach.hidden = attached;
      reportAttached.hidden = !attached;
      const current = progress(activeContact);
      const outgoing = availableDraft(activeContact, current)?.text;
      const ready = Boolean(outgoing) && canSend(activeContact, current);
      mobileReply.disabled = !ready;
      sendButton.disabled = !ready || typedLength < outgoing.length;
    }

    function updateComposer(current) {
      const contact = activeContact;
      const next = messageAt(contact, current);
      const draft = availableDraft(contact, current);
      const receiving = next?.incoming === true;
      const complete = !next;
      const takase = contact.id === 'takase';
      const needsReport = takase && !reportComplete() && !complete;
      const ready = Boolean(draft) && !needsReport;
      desktopComposer.style.display = ready ? '' : 'none';
      desktopComposer.classList.toggle('is-scripted', ready);
      mobileReply.style.display = ready ? '' : 'none';
      mobileReply.textContent = draft?.mobileLabel || '';
      replyInput.disabled = !ready;
      composer.classList.toggle('is-receiving', receiving);
      composer.classList.toggle('is-inputting', ready);
      threadStatus.textContent = receiving ? 'メッセージを受信中' : needsReport ? '報告書待ち' : ready ? 'あなたの入力待ち' : '受信済み';
      composerGuide.textContent = receiving ? contact.name + 'が返信しています。'
        : needsReport ? '完成した報告書が必要です。'
          : ready ? '入力欄を選択して文章を完成させ、Enterキーまたは送信ボタンで送ってください。'
            : takase ? 'やり取りを終了しました。' : '';
      composerGuide.hidden = !composerGuide.textContent;
      waitingNote.style.display = takase && !receiving && !ready ? 'block' : 'none';
      reportDeletionActions.hidden = !takase || mailPhase() < phase.deleteRequested;
      reportDelete.hidden = !takase || mailPhase() !== phase.deleteRequested;
      reportAftermathLink.hidden = !takase || mailPhase() < phase.deleted;
      resetButton.disabled = takase && mailPhase() >= phase.deleted;
      typedLength = draftLength(contact, current);
      replyInput.value = ready ? draft.text.slice(0, typedLength) : '';
      replyMirrorText.textContent = replyInput.value;
      replyInput.scrollTop = replyInput.scrollHeight;
      replyMirror.scrollTop = replyMirror.scrollHeight;
      updateAttachmentControls();
    }

    function renderThread({ animate = false } = {}) {
      const current = progress(activeContact);
      const report = activeContact.id === 'takase' && reportComplete();
      const draft = Boolean(availableDraft(activeContact, current));
      if (current === renderedProgress && report === renderedComplete && draft === renderedDraft) return;
      if (activeContact.id === 'takase' && current === 0) {
        attached = false;
        window.clearTimeout(deletionTimer);
        if (reportPicker.open) reportPicker.close();
        if (reportDeleteDialog.open) reportDeleteDialog.close();
        if (fading) resetAftermathFade();
      }
      if (activeContact.id === 'takase' && current > 0 && !startedAt(activeContact)) {
        write(mailStartedKey, String(Date.now()));
      }
      dateDivider.textContent = new Intl.DateTimeFormat('ja-JP', {
        year: 'numeric', month: 'long', day: 'numeric'
      }).format(new Date(startedAt(activeContact) || Date.now()));
      if (animate && current === renderedProgress + 1) createMessage(activeContact, current - 1, true);
      else if (current !== renderedProgress) {
        messageLog.querySelectorAll('.message-row:not(.typing-row)').forEach(row => row.remove());
        for (let i = 0; i < current; i++) createMessage(activeContact, i, false);
      }
      renderedProgress = current;
      renderedComplete = report;
      renderedDraft = draft;
      typingRow.classList.toggle('is-visible', messageAt(activeContact, current)?.incoming === true);
      updateComposer(current);
      scrollToLatest();
      focusComposerIfReady();
    }

    function restoreContacts() {
      const saved = readObject(contactsKey);
      const savedIds = new Set(Array.isArray(saved)
        ? saved.filter(id => typeof id === 'string' && Object.hasOwn(contacts, id)) : []);
      for (const id of savedIds) registeredContacts.add(id);

      // A previous selection, conversation, or draft identifies a contact from older saves.
      const previous = read(viewKey);
      for (const contact of Object.values(contacts)) {
        const current = progress(contact);
        if (previous === contact.id || current > 0 || draftLength(contact, current)
          || (contact.id === 'aizawa' && readObject(aizawaKey))) {
          registeredContacts.add(contact.id);
        }
      }
      if (registeredContacts.size > savedIds.size) {
        write(contactsKey, JSON.stringify([...registeredContacts]));
      }
    }

    function setSelected(button, selected) {
      button.classList.toggle('is-active', selected);
      if (selected) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    }

    function renderContacts() {
      setSelected(newMessage, view === 'address');

      for (const id of registeredContacts) {
        const contact = contacts[id];
        let button = byId('mail-thread-' + id);
        if (!button) {
          const li = document.createElement('li');
          button = document.createElement('button');
          button.id = 'mail-thread-' + id;
          button.type = 'button';
          button.className = 'contact-item';
          button.textContent = contact.fullName;
          button.setAttribute('aria-controls', 'threadPanel');
          button.addEventListener('click', () => openThread(contact));
          li.append(button);
          mailContacts.append(li);
        }
        setSelected(button, view === 'thread' && activeContact === contact);
      }
    }

    function showView(name) {
      view = name;
      addressPanel.hidden = name !== 'address';
      threadPanel.hidden = name !== 'thread';
      renderContacts();
    }

    function openThread(contact) {
      activeContact = contact;
      write(viewKey, contact.id);
      renderedProgress = null;
      renderedComplete = null;
      threadTitle.textContent = contact.title;
      threadAddress.textContent = contact.address;
      threadAvatar.textContent = typingAvatar.textContent = contact.avatar;
      typingRow.setAttribute('aria-label', contact.name + 'が入力中');
      byId('report-storage-status').textContent = '';
      showView('thread');
      renderThread();
      if (!desktop.matches || replyInput.disabled) {
        threadTitle.tabIndex = -1;
        threadTitle.focus({ preventScroll: true });
      }
      if (contact.id === 'takase' && shouldResumeDeletion()) showDeletionDialog('done');
    }

    function openAddress(focus = true) {
      mailAddress.value = '';
      showAddressStatus('');
      showView('address');
      if (focus) (desktop.matches ? mailAddress : byId('addressTitle')).focus();
    }

    function showAddressStatus(message, error = false) {
      addressStatus.classList.toggle('is-error', error);
      addressStatus.textContent = message;
    }

    function scheduleReply(contact) {
      const current = progress(contact);
      const timer = replyTimers.get(contact.id);
      if (timer?.current === current) return;
      if (timer) window.clearTimeout(timer.id);
      replyTimers.delete(contact.id);
      const message = messageAt(contact, current);
      if (!message?.incoming) return;
      const id = window.setTimeout(() => {
        replyTimers.delete(contact.id);
        if (advance(contact, current)) refresh(contact);
        else if (progress(contact) !== current) refresh();
        else if (view === 'thread' && activeContact === contact) showStorageError();
      // The Takase exchange keeps its existing reply delay.
      }, 850 + Math.min(1200, (message.text.length + message.text.split('\n').length - 1) * 5));
      replyTimers.set(contact.id, { id, current });
    }

    function refresh(animateContact = null) {
      restoreContacts();
      for (const contact of Object.values(contacts)) scheduleReply(contact);
      if (view === 'thread') {
        renderThread({ animate: animateContact === activeContact });
        // The legacy deleted/ended checkpoints all have the same number of messages.
        if (activeContact.id === 'takase' && mailPhase() >= phase.deleteRequested) {
          reportDelete.hidden = mailPhase() !== phase.deleteRequested;
          reportAftermathLink.hidden = mailPhase() < phase.deleted;
          resetButton.disabled = mailPhase() >= phase.deleted;
        }
      }
      renderContacts();
    }

    function sendCurrentReply() {
      if (view !== 'thread') return;
      const contact = activeContact;
      const current = progress(contact);
      if (current !== renderedProgress) {
        refresh();
        return;
      }
      if (!availableDraft(contact, current) || !canSend(contact, current)) return;
      if (!advance(contact, current)) {
        showStorageError();
        return;
      }
      if (contact.id === 'takase') {
        if (!current) write(mailStartedKey, String(Date.now()));
        write(mailDraftKey, null);
        attached = false;
      }
      byId('report-storage-status').textContent = '';
      refresh(contact);
    }

    newMessage.addEventListener('click', () => openAddress());
    addressForm.addEventListener('submit', event => {
      event.preventDefault();
      const address = mailAddress.value.trim().toLowerCase();
      const contact = Object.values(contacts).find(entry => entry.address === address);
      if (!contact) {
        showAddressStatus('連絡を取ることができません。', true);
        mailAddress.value = '';
        mailAddress.focus();
        return;
      }
      restoreContacts();
      const alreadyRegistered = registeredContacts.has(contact.id);
      if (!alreadyRegistered && !write(contactsKey, JSON.stringify([...registeredContacts, contact.id]))) {
        showAddressStatus('連絡先を保存できません。ブラウザの保存設定を確認してください。', true);
        return;
      }
      registeredContacts.add(contact.id);
      renderContacts();
      mailAddress.value = '';
      showAddressStatus(alreadyRegistered ? 'すでに連絡先に登録されています。' : '連絡先に追加しました。');
      byId('mail-thread-' + contact.id).focus({ preventScroll: true });
    });
    mailAddress.addEventListener('input', () => showAddressStatus(''));

    replyInput.readOnly = true;
    replyInput.setAttribute('inputmode', 'none');
    replyInput.addEventListener('keydown', event => {
      if (view !== 'thread' || replyInput.disabled) return;
      const current = progress(activeContact);
      if (current !== renderedProgress) {
        refresh();
        return;
      }
      const draft = availableDraft(activeContact, current);
      if (!draft) return;
      if (event.key === 'Enter') {
        event.preventDefault();
        if (!sendButton.disabled) sendCurrentReply();
        return;
      }
      if (event.key === 'Tab' || event.ctrlKey || event.metaKey || event.altKey) return;
      const isTypingKey = typingCodes.test(event.code) || punctuationCodes.has(event.code) || event.key.length === 1 || event.key === 'Process' || event.key === 'Dead' || event.key === 'Unidentified';
      if (!isTypingKey) return;
      event.preventDefault();
      typedLength = Math.min(draft.text.length, typedLength + Math.floor(Math.random() * 3) + 2);
      replyInput.value = draft.text.slice(0, typedLength);
      replyMirrorText.textContent = replyInput.value;
      replyInput.scrollTop = replyInput.scrollHeight;
      replyMirror.scrollTop = replyMirror.scrollHeight;
      updateAttachmentControls();
      saveDraft(activeContact, current);
    });
    replyInput.addEventListener('scroll', () => { replyMirror.scrollTop = replyInput.scrollTop; });
    replyInput.addEventListener('paste', event => event.preventDefault());
    replyInput.addEventListener('beforeinput', event => event.preventDefault());
    sendButton.addEventListener('click', () => { if (!sendButton.disabled) sendCurrentReply(); });
    mobileReply.addEventListener('click', sendCurrentReply);

    reportAttach.addEventListener('click', () => {
      if (activeContact?.id !== 'takase' || mailPhase() !== phase.requested || !reportComplete()) return;
      reportPicker.returnValue = '';
      reportPicker.showModal();
    });
    reportPicker.addEventListener('close', () => {
      if (reportPicker.returnValue !== 'attach' || activeContact?.id !== 'takase' || mailPhase() !== phase.requested || !reportComplete()) return;
      attached = true;
      updateAttachmentControls();
      reportDetach.focus();
    });
    reportDetach.addEventListener('click', () => {
      attached = false;
      updateAttachmentControls();
      reportAttach.focus();
    });
    function showDeletionDialog(state) {
      deletionDialogState = state;
      const copy = {
        confirm: ['報告書のデータを削除しますか？', 'この操作を実行すると、保存されている調査報告書のデータは完全に削除されます。'],
        deleting: ['報告書のデータを削除しています…', ''],
        done: ['データの削除が完了しました。', ''],
        error: ['データを削除できませんでした。', 'ブラウザの保存設定を確認してから、もう一度お試しください。']
      };
      [reportDeleteTitle.textContent, reportDeleteMessage.textContent] = copy[state];
      reportDeleteCancel.hidden = state !== 'confirm';
      reportDeleteConfirm.hidden = state !== 'confirm';
      reportDeleteClose.hidden = state !== 'done' && state !== 'error';
      reportDeleteProgress.hidden = state !== 'deleting';
      if (!reportDeleteDialog.open) reportDeleteDialog.showModal();
      if (state === 'confirm') reportDeleteCancel.focus();
      else if (state === 'done' || state === 'error') reportDeleteClose.focus();
    }

    reportDelete.addEventListener('click', function () {
      if (mailPhase() === phase.deleteRequested) showDeletionDialog('confirm');
    });
    reportDeleteCancel.addEventListener('click', () => reportDeleteDialog.close());
    reportDeleteDialog.addEventListener('cancel', function (event) {
      if (deletionDialogState === 'deleting' || deletionDialogState === 'done') event.preventDefault();
    });
    reportDeleteConfirm.addEventListener('click', function () {
      if (deletionDialogState !== 'confirm') return;
      showDeletionDialog('deleting');
      deletionTimer = window.setTimeout(function () {
        if (!deleteReport()) {
          showDeletionDialog('error');
          return;
        }
        refresh();
        showDeletionDialog('done');
      }, reducedMotion.matches ? 100 : 1750);
    });
    reportDeleteClose.addEventListener('click', function () {
      reportDeleteDialog.close();
      if (deletionDialogState !== 'done' || fading) return;
      fading = true;
      byId('report-mail').inert = true;
      document.querySelector('.site-footer').inert = true;
      byId('reportFade').classList.add('is-visible');
      aftermathTimer = window.setTimeout(() => location.assign(aftermathUrl), reducedMotion.matches ? 0 : 2500);
    });
    window.addEventListener('pagehide', () => window.clearTimeout(aftermathTimer));
    function resetAftermathFade() {
      window.clearTimeout(aftermathTimer);
      fading = false;
      byId('report-mail').inert = false;
      document.querySelector('.site-footer').inert = false;
      byId('reportFade').classList.remove('is-visible');
    }

    window.addEventListener('pageshow', function (event) {
      if (!event.persisted || !fading) return;
      resetAftermathFade();
      if (shouldResumeDeletion()) showDeletionDialog('done');
    });
    function openConfirmDialog(options) {
      confirmTitle.textContent = options.title;
      confirmMessage.textContent = options.message;
      confirmAccept.textContent = options.acceptLabel || 'リセットする';
      pendingConfirmAction = options.onAccept;
      confirmReturnTarget = options.returnTarget || null;
      confirmOverlay.classList.add('is-open');
      confirmOverlay.setAttribute('aria-hidden', 'false');
      document.body.classList.add('archive-open');
      byId('report-mail').inert = true;
      document.querySelector('.site-footer').inert = true;
      confirmCancel.focus();
    }

    function closeConfirmDialog() {
      confirmOverlay.classList.remove('is-open');
      confirmOverlay.setAttribute('aria-hidden', 'true');
      pendingConfirmAction = null;
      if (!archiveOverlay.classList.contains('is-open')) document.body.classList.remove('archive-open');
      byId('report-mail').inert = false;
      document.querySelector('.site-footer').inert = false;
      if (confirmReturnTarget) confirmReturnTarget.focus();
      confirmReturnTarget = null;
    }


    resetButton.addEventListener('click', () => {
      if (activeContact?.id === 'aizawa') {
        openConfirmDialog({
          title: '相沢直人との会話をリセット',
          message: '相沢直人との会話を最初からやり直しますか？\nこの会話のメッセージと下書きが消去されます。',
          returnTarget: resetButton,
          onAccept: () => {
            if (!write(aizawaKey, null)) {
              showStorageError();
              return;
            }
            byId('report-storage-status').textContent = '';
            renderedProgress = null;
            refresh();
          }
        });
        return;
      }
      if (activeContact?.id !== 'takase' || mailPhase() >= phase.deleted) return;
      openConfirmDialog({
        title: 'メールをリセット',
        message: 'メールの会話を最初からやり直しますか？\nページアーカイブの記録は消去されません。',
        returnTarget: resetButton,
        onAccept: () => {
          if (mailPhase() >= phase.deleted || !resetMail()) return;
          write(mailDraftKey, null);
          write(mailStartedKey, null);
          window.location.reload();
        }
      });
    });
    confirmCancel.addEventListener('click', closeConfirmDialog);
    confirmAccept.addEventListener('click', () => {
      const action = pendingConfirmAction;
      closeConfirmDialog();
      action?.();
    });
    confirmOverlay.addEventListener('click', event => {
      if (event.target === confirmOverlay) closeConfirmDialog();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && confirmOverlay.classList.contains('is-open')) closeConfirmDialog();
    });
    window.addEventListener('focus', focusComposerIfReady);
    document.addEventListener('click', event => {
      if (!event.target.closest('button, a, textarea, input')) focusComposerIfReady();
    });
    window.addEventListener('storage', event => {
      if (event.key === 'timeback-page-archive-v1') refresh();
      if (event.key === contactsKey || event.key === aizawaKey || event.key === mailDraftKey) {
        if (activeContact && event.key === (activeContact.id === 'aizawa' ? aizawaKey : mailDraftKey)
          && progress(activeContact) === renderedProgress && view === 'thread') updateComposer(renderedProgress);
        refresh();
      }
    });
    watchReport(refresh);

    const forcedCompose = location.hash === '#new-message';
    if (forcedCompose) {
      history.replaceState(history.state, '', '#');
      openAddress(false);
    } else if (Object.hasOwn(contacts, savedContact)) openThread(contacts[savedContact]);
    else if (mailPhase() !== phase.initial || draftLength(contacts.takase, 0)) openThread(contacts.takase);
    else openAddress(false);
  };
})();

