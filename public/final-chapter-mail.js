(() => {
  'use strict';

  const chapter = window.timebackFinalChapter;
  if (!chapter) return;

  const outgoing = (text, mobileLabel, extra) => ({ incoming: false, text, mobileLabel, ...extra });
  const reply = (text, extra) => ({ incoming: true, text, ...extra });
  const messages = [
    outgoing('相沢さん。以前お話ししたTIME BACKについて、もう少し確認したいことがあります。', 'もう一度相沢に連絡する'),
    reply('はい。どうしましたか？'),
    outgoing('会社から貸与されているTIME BACKの機器は、まだお手元にありますか？', '貸与機器について尋ねる'),
    reply('ありますよ。最近はあまり使っていませんけど。'),
    outgoing('その機器の状態診断を行っていただけませんか？ 出力された記録を確認したいんです。', '機器の状態診断を頼む'),
    reply('分かりました。少し待ってください。'),
    reply('これで合っていますか？', {
      wait: 1750, milestone: 'diagnostics',
      attachment: { label: '機器設定・状態確認記録', href: chapter.urls[113] }
    }),
    reply('送った記録で何か分かりましたか？\n\n必要な設定値と復旧手順を教えてください。機器の復旧機能を確認してみます。', {
      available: chapter.canSolve
    }),
    outgoing('この機器には、参照できなくなっている過去の記憶が残っているようです。', '過去の記憶について伝える', {
      available: state => state.solved, requiresPuzzle: true
    }),
    reply('……過去の記憶、ですか？'),
    outgoing('はい。あなたが覚えていない出来事や、あなた自身についての記憶かもしれません。', '取り戻せる記憶について伝える'),
    reply('それを取り戻したら、今の記憶はどうなるんですか？'),
    outgoing('今の記憶を消す処理ではありません。今までの経験を残したまま、失われていた記憶を取り戻すためのものです。', '現在の記憶が残ることを伝える'),
    reply('……そうですか。'),
    reply('正直、少し怖いです。'),
    reply('でも、自分のことを知らないままでいるのも、嫌なんです。'),
    reply('やってみます。自分で決めたことですから。', { milestone: 'consented' }),
    reply('', {
      wait: 1800, waitLabel: '相沢が復旧処理を行っています。',
      available: state => state.consented, milestone: 'recovered',
      attachment: { label: '復旧処理結果', href: chapter.urls[116] }
    }),
    reply('……'),
    outgoing('相沢さん？', '相沢に声をかける'),
    reply('思い出しました。'),
    reply('全部。'),
    reply('Chronectのことも、調査していたことも、ここに来た理由も。'),
    reply('そうだ。俺が、高瀬悠真です。'),
    reply('あなたが最初に連絡をくれたとき、俺、自分の名前を知らないって答えたんですね。'),
    reply('あのときも、本当に知らなかったんです。'),
    outgoing('あなたが残した記録を見つけました。助けてほしいという記録も。', '見つけた記録について伝える'),
    reply('……あれを、見つけてくれたんですね。'),
    reply('誰にも届かないかもしれないと思っていました。'),
    reply('本当に、ありがとうございます。'),
    outgoing('私が調べた内容も、あなたにお渡しします。', '調査報告書を送る', { playerReport: true, milestone: 'reportSent' }),
    reply('……ここまで調べてくれたんですね。'),
    reply('俺一人では、きっとここまでたどり着けなかったと思います。'),
    reply('今度は、俺がやります。'),
    reply('俺自身の言葉で、何が起きていたのかを伝えます。'),
    reply('もう、誰かに任せて逃げるつもりはありません。'),
    reply('本当に、ありがとうございました。', { available: state => state.reportSent, milestone: 'disclosed' })
  ];

  const puzzleIndex = messages.findIndex(message => message.requiresPuzzle);

  function messageAt(index, state = chapter.read()) {
    const message = messages[index];
    if (!message || state.mailProgress > messages.length || !chapter.isUnlocked()) return undefined;
    if (index < state.mailProgress) return message;
    if (index === 0 && !chapter.canDiagnose()) return undefined;
    if (message.available && !message.available(state)) return undefined;
    return message;
  }

  function advance(index) {
    return chapter.update(state => {
      if (state.mailProgress !== index) return null;
      const message = messageAt(index, state);
      if (!message) return null;
      const milestones = message.milestone ? { [message.milestone]: true } : {};
      return { ...state, ...milestones, mailProgress: index + 1, mailDraftLength: 0 };
    });
  }

  function saveDraft(index, length) {
    return chapter.update(state => state.mailProgress === index
      ? { ...state, mailDraftLength: length } : null);
  }

  function canEdit(state) {
    return state.mailProgress === puzzleIndex && !state.solved && chapter.canSolve();
  }

  function initPuzzle({ onSolved, onStorageError, openConfirm }) {
    const form = document.getElementById('final-recovery-form');
    const fields = document.getElementById('final-recovery-fields');
    const actionButtons = document.getElementById('final-recovery-actions');
    const orderList = document.getElementById('final-recovery-order');
    const result = document.getElementById('final-recovery-status');
    const reset = document.getElementById('final-recovery-reset');
    const inputs = new Map();
    const buttons = new Map();

    function updateDraft(transform) {
      const saved = chapter.update(state => canEdit(state) ? transform(state) : null);
      if (!saved) onStorageError();
      return saved;
    }

    for (const { code, label: title } of chapter.fields) {
      const field = document.createElement('div');
      const label = document.createElement('label');
      const input = document.createElement('input');
      const feedback = document.createElement('small');
      input.type = 'text';
      input.name = code;
      input.id = 'final-recovery-' + code;
      input.autocomplete = 'off';
      input.autocapitalize = 'off';
      input.spellcheck = false;
      input.maxLength = 64;
      label.htmlFor = input.id;
      label.textContent = title;
      feedback.id = input.id + '-feedback';
      input.setAttribute('aria-describedby', feedback.id);
      input.addEventListener('input', () => {
        input.removeAttribute('aria-invalid');
        feedback.textContent = '';
        result.textContent = '';
        updateDraft(state => ({ ...state, answers: { ...state.answers, [code]: input.value } }));
      });
      inputs.set(code, { input, feedback });
      field.append(label, input, feedback);
      fields.append(field);
    }

    for (const { code, label } of chapter.actions) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'report-tool';
      button.dataset.finalAction = code;
      button.textContent = code + '：' + label;
      button.addEventListener('click', () => editOrder(code, 'add'));
      buttons.set(code, button);
      actionButtons.append(button);
    }

    function renderOrder(order) {
      for (const [code, button] of buttons) button.disabled = order.includes(code);
      const rows = order.map((code, index) => {
        const item = document.createElement('li');
        const label = document.createElement('span');
        const controls = document.createElement('span');
        label.textContent = code;
        controls.className = 'recovery-order-controls';
        for (const [direction, caption, accessible] of [
          ['up', '↑', '上へ移動'], ['down', '↓', '下へ移動'], ['remove', '削除', '削除']
        ]) {
          const button = document.createElement('button');
          button.type = 'button';
          button.className = 'report-tool';
          button.dataset.finalMove = direction;
          button.dataset.finalCode = code;
          button.setAttribute('aria-label', code + 'を' + accessible);
          button.textContent = caption;
          button.disabled = (direction === 'up' && index === 0) || (direction === 'down' && index === order.length - 1);
          button.addEventListener('click', () => editOrder(code, direction));
          controls.append(button);
        }
        item.append(label, controls);
        return item;
      });
      orderList.replaceChildren(...rows);
    }

    function editOrder(code, direction) {
      const saved = updateDraft(state => {
        const order = [...state.order];
        const index = order.indexOf(code);
        if (direction === 'add' && index === -1) order.push(code);
        else if (direction === 'remove' && index !== -1) order.splice(index, 1);
        else if (index !== -1 && (direction === 'up' || direction === 'down')) {
          const destination = index + (direction === 'up' ? -1 : 1);
          if (destination >= 0 && destination < order.length) {
            [order[index], order[destination]] = [order[destination], order[index]];
          }
        }
        return { ...state, order };
      });
      if (!saved) return;
      renderOrder(chapter.read().order);
      result.textContent = '';
      const rowControls = [...orderList.querySelectorAll('button')].filter(button => button.dataset.finalCode === code);
      const nextFocus = direction === 'remove' ? buttons.get(code)
        : rowControls.find(button => button.dataset.finalMove === direction && !button.disabled)
          || rowControls.find(button => !button.disabled);
      nextFocus?.focus();
    }

    form.addEventListener('submit', event => {
      event.preventDefault();
      if (form.hidden) return;
      const state = chapter.read();
      const answers = Object.fromEntries([...inputs].map(([code, { input }]) => [code, input.value]));
      const checked = chapter.validate(answers, state.order);
      for (const [code, { input, feedback }] of inputs) {
        const invalid = checked.invalidFields.includes(code);
        input.setAttribute('aria-invalid', String(invalid));
        feedback.textContent = invalid ? '入力値を確認してください。' : '';
      }
      if (checked.invalidFields.length || !checked.orderValid) {
        result.textContent = [
          checked.invalidFields.length ? '一致しない項目があります。' : '',
          checked.orderValid ? '' : '処理順序が一致しません。'
        ].filter(Boolean).join(' ');
        return;
      }
      const saved = updateDraft(latest => chapter.validate(answers, latest.order).orderValid
        ? { ...latest, answers, solved: true } : null);
      if (saved) onSolved();
    });

    reset.addEventListener('click', () => openConfirm({
      title: '照合の入力をリセット',
      message: '入力済みの設定値と処理順序を消去しますか？',
      returnTarget: reset,
      onAccept: () => {
        if (updateDraft(state => ({ ...state, answers: {}, order: [] }))) render(true);
      }
    }));

    function render(active) {
      const state = chapter.read();
      form.hidden = !active || !canEdit(state);
      if (form.hidden) return;
      for (const [code, { input, feedback }] of inputs) {
        const value = state.answers[code] || '';
        if (input.value !== value) input.value = value;
        input.removeAttribute('aria-invalid');
        feedback.textContent = '';
      }
      result.textContent = '';
      renderOrder(state.order);
    }

    return { render };
  }

  window.timebackFinalMail = { messageAt, advance, saveDraft, initPuzzle, puzzleIndex, totalMessages: messages.length };
})();
