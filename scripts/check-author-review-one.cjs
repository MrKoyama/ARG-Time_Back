'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const runChrome = require('./check-ending-three.cjs');

runChrome(async ({ evaluate, wait, visible, click, input, page, go, width, checkWidth, scripted, returnToBranch, send }) => {
  const widths = [1440, 768, 390, 320];
  const screenshotDir = process.env.TIMEBACK_REVIEW_SCREENSHOTS;
  async function capture(name, selector, padding = 0) {
    if (!screenshotDir) return;
    const clip = await evaluate(`(async () => {
      await document.fonts.ready;
      const boxes = Array.from(document.querySelectorAll(${JSON.stringify(selector)}), element => element.getBoundingClientRect());
      const left = Math.max(0, Math.min(...boxes.map(box => box.left)) + scrollX - ${padding});
      const top = Math.max(0, Math.min(...boxes.map(box => box.top)) + scrollY - ${padding});
      const right = Math.max(...boxes.map(box => box.right)) + scrollX + ${padding};
      const bottom = Math.max(...boxes.map(box => box.bottom)) + scrollY + ${padding};
      return {x: left, y: top, width: right - left, height: bottom - top, scale: 1};
    })()`);
    const { data } = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip });
    await fs.mkdir(screenshotDir, { recursive: true });
    await fs.writeFile(path.join(screenshotDir, name + '.png'), Buffer.from(data, 'base64'));
  }
  async function search(file, term, target, selector = '.result-item a') {
    await go(file + '?q=' + encodeURIComponent(term));
    const links = await evaluate('Array.from(document.querySelectorAll(' + JSON.stringify(selector) + '), a => a.getAttribute("href"))');
    assert.deepEqual(links, target ? [target] : [], term);
  }

  await search('chronect-search.html', ' Chronect ', 'chronect.html');
  await click('.result-item a');
  await page('chronect.html');
  for (const px of widths) {
    await width(px);
    await checkWidth('No.13');
    const [left, right, alignment] = await evaluate(`(() => {
      const section = document.querySelector('#company');
      const bounds = section.getBoundingClientRect();
      const box = section.querySelector('.hero-inner').getBoundingClientRect();
      return [box.left - bounds.left, bounds.right - box.right, getComputedStyle(section.querySelector('.hero-copy')).textAlign];
    })()`);
    assert.ok(Math.abs(left - right) < 1 && left >= (px === 1440 ? 122 : 15), `No.13 at ${px}: ${left} / ${right}`);
    assert.match(alignment, /^(start|left)$/);
    assert.deepEqual(await evaluate(`(() => {
      const card = document.querySelector('#careers');
      const left = card.getBoundingClientRect().left;
      return ['small','h2','.recruit-copy > span'].map(selector => card.querySelector(selector).getBoundingClientRect().left - left);
    })()`), [28, 28, 28]);
    if (px === 1440 || px === 390) {
      await evaluate(`(async () => {
        const card = document.querySelector('#careers');
        await card.querySelector('img').decode();
        card.scrollIntoView({block: 'center', behavior: 'instant'});
      })()`);
      await capture('A02-after-' + px, '#careers', 6);
    }
  }
  await click('nav a[href="chronect-company.html"]');
  await page('chronect-company.html');
  await search('chronect-search.html', '企業情報', 'chronect-company.html');
  await go('time-back.html');
  await input('#siteSearchInput', 'Chronect');
  await click('form[action="search.html"] button');
  await page('search.html');
  assert.equal(await evaluate('document.querySelector(".result-item a").getAttribute("href")'), 'chronect.html');
  await click('.result-item a');
  await page('chronect.html');
  await search('search.html', 'クロネクト', 'chronect-company.html');
  await search('search.html', '運営会社', 'chronect-company.html');
  await search('search.html', 'Chron', null);
  await go('chronect-hub.html');
  const hubIntro = await evaluate('document.querySelector("main").innerText');
  assert.match(hubIntro, /公開研究要旨と限定保存資料は、それぞれの公開範囲に応じて管理しています。/);
  assert.doesNotMatch(hubIntro, /資料参照区分/);
  await input('#hubSearchInput', '資料参照区分');
  await click('.hub-search-form button');
  await page('chronect-hub-search.html');
  assert.equal(await evaluate('document.querySelector(".hub-result a").getAttribute("href")'), 'chronect-hub-reference-class.html');
  assert.equal(await evaluate('JSON.parse(localStorage.getItem("timeback-page-archive-v1")).some(page => page.number === 62)'), false);
  await go('chronect-hub-processing-connections.html');
  assert.match(await evaluate('document.querySelector("article").innerText'), /本記録の参照上の扱いは、資料参照区分に従います。/);
  const referenceRoute = [
    ['資料参照区分', 'chronect-hub-reference-class.html'],
    ['参照対応', 'chronect-hub-reference-mapping.html'],
    ['保守経路', 'chronect-hub-maintenance-route.html'],
    ['Webシステム保守', 'chronect-hub-search-staff.html'],
    ['高瀬悠真', 'takase-notes.html']
  ];
  for (const [term, target] of referenceRoute) {
    await input('#hubSearchInput', term);
    await click('.hub-search-form button');
    await page('chronect-hub-search.html');
    await click(`main a[href="${target}"]`);
    await page(target);
  }
  await click('a[href="takase-records.html"]');
  await page('takase-records.html');
  assert.match(await evaluate('document.querySelector("article").textContent'), /売却と購入は別々の処理/);
  await click('a[href="takase-handover.html"]');
  await page('takase-handover.html');
  assert.match(await evaluate('document.querySelector("article").textContent'), /##売却処理##/);
  await go('chronect-hub.html');
  await input('#hubSearchInput', '##売却処理##');
  await click('.hub-search-form button');
  await page('chronect-hub-search.html');
  await click('.hub-result a[href="chronect-hub-sale-reference.html"]');
  await page('chronect-hub-sale-reference.html');
  for (const [term, target] of [
    ['作業工程','chronect-hub-work-use-model.html'],
    ['事業計画','chronect-hub-second-shift-plan.html'],
    ['SECOND SHIFT','chronect-hub-second-shift-operation.html'],
    ['試験運用','chronect-hub-trial-operation-mapping.html'],
    ['報告用資料','chronect-hub-report-reference.html']
  ]) {
    assert.ok(await evaluate(`document.querySelector('main').textContent.includes(${JSON.stringify(term)})`), term);
    await input('#hubSearchInput', '##' + term + '##');
    await click('.hub-search-form button');
    await page('chronect-hub-search.html');
    await click(`.hub-result a[href="${target}"]`);
    await page(target);
  }
  await click('.report-hidden-reference');
  await wait('document.querySelector(".report-hidden-reference").classList.contains("is-revealed")');
  await click('a[href="takase-work-notes.html"]');
  await page('takase-work-notes.html');
  for (const term of ['提携企業一覧', '提携企業']) await search('business-search.html', term, 'partners.html');
  await search('business-search.html', '提携', null);
  await go('nodelink-internal-search.html');
  assert.equal(await evaluate('document.querySelector("#archiveButton").textContent.trim()'), '92 / 120');
  const archive = 'localStorage.getItem("timeback-page-archive-v1")';
  const beforeSearch = await evaluate(archive);
  for (const term of ['利用実績照合', ' 利用実績照合記録 ', '利用実績']) {
    await search('nodelink-internal-search.html', term, term === '利用実績' ? null : 'takase-investigation-stall.html', '#nodelink-result-list a');
    assert.equal(await evaluate('document.querySelector("#archiveButton").textContent.trim()'), 'EX');
    assert.equal(await evaluate(archive), beforeSearch);
  }
  await search('nodelink-internal-search.html', '利用実績照合記録', 'takase-investigation-stall.html', '#nodelink-result-list a');
  await click('#nodelink-result-list a');
  await page('takase-investigation-stall.html');

  await go('chronect-hub-session-action-comparison.html');
  for (const px of widths) {
    await width(px);
    await checkWidth('No.56');
    assert.equal(await evaluate(`(() => {
      const label = document.querySelector('.hub-facts-lookup dt');
      const text = document.createRange();
      text.selectNodeContents(label);
      return text.getClientRects().length === 1 && label.nextElementSibling.textContent.trim() === '58251310';
    })()`), true);
  }
  await go('chronect-hub-web-operations-log.html');
  for (const [id, contents] of [
    ['01', ['公開ページの表示確認', '検索結果あり', '通常検索', '結果がある場合の表示対応']],
    ['04', ['検索画面の動作確認', '例外的な入力', '例外入力処理', '例外的な入力があった場合の表示対応']]
  ]) {
    const button = `button[aria-controls="log-record-${id}"]`;
    const details = '#log-record-' + id;
    assert.equal(await evaluate(visible(details)), false);
    await click(button);
    assert.equal(await evaluate(visible(details)), true);
    const record = await evaluate(`Array.from(document.querySelectorAll('${details} dt, ${details} dd'), node => node.textContent)`);
    assert.deepEqual(record.filter((_, index) => index % 2 === 0), ['作業内容','対象の状態','入力処理','具体的な対応内容']);
    assert.deepEqual(record.filter((_, index) => index % 2 === 1), contents);
    assert.equal(await evaluate(`!!document.querySelector('${details} input')`), false);
    for (const px of widths) {
      await width(px);
      await checkWidth('No.87 record ' + id);
      const [completeStyle, reviewStyle] = await evaluate(`[${JSON.stringify(button)}, '#log-review-toggle'].map(selector => {
        const style = getComputedStyle(document.querySelector(selector));
        return [style.color, style.fontSize, style.borderTopWidth, style.backgroundColor,
          style.textDecorationLine, style.cursor];
      })`);
      assert.deepEqual(completeStyle, reviewStyle);
      assert.equal(completeStyle[0], 'rgb(165, 213, 214)');
      assert.deepEqual(completeStyle.slice(2), ['0px', 'rgba(0, 0, 0, 0)', 'underline', 'pointer']);
    }
    await click(button);
    assert.equal(await evaluate(visible(details)), false);
    await evaluate(`document.querySelector(${JSON.stringify(button)}).focus()`);
    for (const [key, code, keyCode, text, open] of [['Enter', 'Enter', 13, '\r', true], [' ', 'Space', 32, ' ', false]]) {
      const keyEvent = {key, code, windowsVirtualKeyCode: keyCode, nativeVirtualKeyCode: keyCode};
      await send('Input.dispatchKeyEvent', {...keyEvent, type: 'keyDown', text, unmodifiedText: text});
      await send('Input.dispatchKeyEvent', {...keyEvent, type: 'keyUp'});
      assert.equal(await evaluate(visible(details)), open, 'No.87 ' + id + ' ' + code);
      assert.equal(await evaluate(`document.querySelector(${JSON.stringify(button)}).getAttribute("aria-expanded")`), String(open));
    }
  }
  assert.equal(await evaluate(visible('#log-review-form')), false);
  await click('#log-review-toggle');
  assert.equal(await evaluate(visible('#log-review-form')), true);
  assert.equal(await evaluate('document.querySelector("#log-review-toggle").getAttribute("aria-expanded")'), 'true');
  for (const px of widths) {
    await width(px);
    await checkWidth('No.87 with the form open');
    assert.equal(await evaluate(`(() => {
      const record03 = document.querySelector('#log-review-toggle').closest('tr');
      const record04 = document.querySelector('[aria-controls="log-record-04"]').closest('tr');
      const row = document.querySelector('#log-review');
      const form = row.querySelector('#log-review-form').getBoundingClientRect();
      return row.previousElementSibling === record03 && row.nextElementSibling === record04
        && form.top >= record03.getBoundingClientRect().bottom
        && form.bottom <= record04.getBoundingClientRect().top
        && form.left >= 0 && form.right <= innerWidth;
    })()`), true, 'No.87 at ' + px);
  }
  await click('#log-review-toggle');
  assert.equal(await evaluate(visible('#log-review-form')), false);
  await click('#log-review-toggle');
  assert.equal(await evaluate(visible('#log-review-result')), false);
  const logSave = 'localStorage.getItem("timeback-web-operations-log-v1")';
  for (const term of [
    '結果がある場合の表示対応', '例外的な入力があった場合の表示対応', '該当資料が0件ではない場合',
    '該当資料が0件の場合の表示対応ではありません', '無関係な文章', '検索', '', '　 '
  ]) {
    await input('#log-review-answer', term);
    await click('#log-review-form button');
    assert.equal(await evaluate(visible('#log-review-result')), false, term);
    assert.equal(await evaluate('document.querySelector("#log-review-status").textContent'), '対応する作業内容を確認できませんでした。');
    assert.equal(await evaluate(logSave), null);
  }
  for (const term of [
    '該当資料が0件の場合の表示対応', '該当資料が0件', '該当資料が0件の場合',
    '該当資料が０件の場合の表示対応', '該当資料がゼロ件の場合の表示対応', '0件の場合の表示対応',
    '検索結果が0件の場合の表示対応', '検索結果が0件の場合', '検索結果が0件',
    '検索結果0件時の表示保守', '検索結果0件', '0件表示', '0件', '該当資料が0件の場合の表示',
    '　該当資料が ０件の場合の表示対応　'
  ]) {
    if (await evaluate(logSave)) {
      await evaluate('localStorage.removeItem("timeback-web-operations-log-v1")');
      await send('Page.reload');
      await wait('document.readyState === "complete" && document.querySelector("#log-review-result")?.hidden === true');
      await click('#log-review-toggle');
    }
    await input('#log-review-answer', term);
    await click('#log-review-form button');
    assert.equal(await evaluate(visible('#log-review-result')), true, term);
    assert.equal(await evaluate(logSave), '1');
  }
  for (const px of widths) {
    await width(px);
    await checkWidth('No.87 with the results open');
  }
  await click('#log-review-result a');
  await page('takase-investigation-method.html');
  await go('chronect-hub-web-operations-log.html');
  assert.equal(await evaluate(visible('#log-review-result')), true);
  await go('nodelink-corporate-usage.html');
  assert.match(await evaluate('document.body.innerText'), /研修後も利用を継続。購入セッションの実施頻度が増加傾向。/);

  const notes = 'takase-work-notes.html';
  const editor = 'takase-report-editor.html';
  const report = 'localStorage.getItem("timeback-investigation-report-v1")';
  const entries = ['Behavior Assistance', 'SECOND SHIFT', '施設C', 'SUB-117', 'TB-260917-4826'];
  await go(notes);
  await click('#report-download');
  await wait(visible('#report-download-dialog[open]'));
  for (const px of widths) {
    await width(px);
    await checkWidth('No.82');
    assert.equal(await evaluate(`(() => {
      const bounds = document.querySelector('#report-download-dialog').getBoundingClientRect();
      return bounds.left >= 0 && bounds.right <= innerWidth;
    })()`), true);
  }
  assert.equal(await evaluate('document.querySelector("#report-download-title").textContent'), 'ダウンロードが完了しました');
  assert.equal(await evaluate('document.querySelector("#report-download-description").textContent'), '調査報告書_草稿のダウンロードが完了しました。');
  assert.equal(await evaluate('location.pathname'), '/' + notes);
  assert.equal(await evaluate('JSON.parse(' + report + ').status'), 'draft');
  await send('Page.reload', {});
  await wait('document.readyState === "complete" && document.querySelector("#report-download-dialog")?.open === false && !document.querySelector("#report-download")?.disabled');
  assert.equal(await evaluate('JSON.parse(' + report + ').status'), 'draft');
  await click('#report-download');
  await wait(visible('#report-download-dialog[open]'));
  await click('#report-download-dialog button[value=open]');
  await page(editor);
  await checkWidth('No.83');
  await evaluate('history.back()', true);
  await page(notes);
  await go(editor);
  for (const [index, entry] of entries.entries()) await input(`[data-report-answer][aria-label^="${'①②③④⑤'[index]}"]`, entry);
  const first = '[data-report-answer][aria-label^="①"]';
  async function saveReport(confirmed) {
    await click('#report-check');
    await wait(visible('#report-save-dialog[open]'));
    assert.deepEqual(await evaluate('JSON.parse(' + report + ').confirmed'), confirmed);
    await click('#report-save-dialog button');
  }
  await saveReport([false, true, true, true, true]);
  await input(first, ' ｂｅｈａｖｉｏｒ ＡＳＳＩＳＴＡＮＣＥ ＳＹＳＴＥＭ ');
  await saveReport([true, true, true, true, true]);
  await page(notes);
  await go(editor);
  assert.equal(await evaluate('document.querySelector(' + JSON.stringify(first) + ').readOnly'), true);

  await go(notes);
  await click('#report-contact');
  await page('takase-mail.html');
  await input('#mailAddress', 'y.takase@chronect.mail');
  await click('#addressForm button[type=submit]');
  await click('#mail-thread-takase');
  await scripted();
  // Exercise pointer hit testing through the confirmation overlay, including a fast retry.
  async function clickResetControl(selector) {
    const point = await evaluate(`(() => {
      const {x,y,width,height} = document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();
      return {x: x + width / 2, y: y + height / 2};
    })()`);
    await send('Input.dispatchMouseEvent', { type: 'mousePressed', ...point, button: 'left', clickCount: 1 });
    await send('Input.dispatchMouseEvent', { type: 'mouseReleased', ...point, button: 'left', clickCount: 1 });
  }
  await clickResetControl('#resetButton');
  assert.equal(await evaluate('document.activeElement.id'), 'confirmCancel');
  await clickResetControl('#confirmCancel');
  assert.equal(await evaluate('localStorage.getItem("timeback-investigation-mail-v1")'), '1.1');
  await clickResetControl('#resetButton');
  assert.equal(await evaluate(visible('#confirmOverlay.is-open')), true);
  await clickResetControl('#confirmAccept');
  await wait('document.readyState === "complete" && localStorage.getItem("timeback-investigation-mail-v1") === "0"'
    + ' && document.querySelector("#mail-thread-takase")?.getAttribute("aria-current") === "true"'
    + ' && document.querySelectorAll("#messageLog .bubble").length === 0');
  for (let i = 0; i < 3; i++) await scripted();
  const mailBubbles = await evaluate('Array.from(document.querySelectorAll("#messageLog .bubble"), bubble => bubble.textContent)');
  assert.match(mailBubbles[0], /資料を調べる中で、このメールアドレスを見つけました。/);
  assert.doesNotMatch(mailBubbles[0], /調査作業控え/);
  assert.match(mailBubbles[3], /見つけた記録のほかに、調査の内容をまとめた文書もありましたか？/);
  assert.match(mailBubbles[5], /^本当ですか。草稿を見つけて、完成させてくださったのですね。/);
  assert.match(mailBubbles[5], /Web運用日誌/);
  await click('#reportAttach');
  await click('#reportPicker button[value=attach]');
  await wait('!document.querySelector("#mobileReply").disabled');
  await scripted();
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
  await click('#reportDelete');
  await click('#reportDeleteCancel');
  assert.ok(await evaluate(report));
  async function checkDeletion(motion, { fail = false, fromFile = false } = {}) {
    const label = motion === 'reduce' ? 'reduced' : 'normal';
    await send('Emulation.setEmulatedMedia', {features:[{name:'prefers-reduced-motion',value:motion}]});
    await click('#reportDelete');
    const initial = await evaluate(`(() => {
      const title = document.querySelector('#reportDeleteTitle');
      const bar = document.querySelector('#reportDeleteProgress');
      const key = 'timeback-investigation-report-v1';
      const originalRemove = Storage.prototype.removeItem;
      const started = performance.now();
      const data = window.deletionObservation = { progress: [], writes: [], end: null };
      const time = () => performance.now() - started;
      Storage.prototype.removeItem = function (name) {
        if (name === key) {
          data.writes.push({ time: time(), value: bar.value, title: title.textContent, stored: this.getItem(key) !== null });
          Storage.prototype.removeItem = originalRemove;
          if (${fail}) throw new Error('test storage failure');
        }
        return originalRemove.call(this, name);
      };
      const observer = new MutationObserver(() => {
        if (bar.value !== data.progress.at(-1)?.value) data.progress.push({ time: time(), value: bar.value });
        if (title.textContent === 'データの削除が完了しました。' || title.textContent === 'データを削除できませんでした。') {
          data.end = { time: time(), title: title.textContent, stored: localStorage.getItem(key) !== null };
          observer.disconnect();
        }
      });
      observer.observe(bar, {attributes:true,attributeFilter:['value']});
      observer.observe(title, {childList:true});
      document.querySelector('#reportDeleteConfirm').click();
      return { value: bar.value, stored: localStorage.getItem(key) !== null, title: title.textContent };
    })()`);
    assert.deepEqual(initial,{value:0,stored:true,title:'報告書のデータを削除しています…'});
    if (!fail && !fromFile) await capture('A10-' + label + '-start', '#reportDeleteDialog');
    await wait('document.querySelector("#reportDeleteProgress").value >= 35');
    assert.ok(await evaluate(report));
    if (!fail && !fromFile) await capture('A10-' + label + '-middle', '#reportDeleteDialog');
    await wait('window.deletionObservation.end !== null');
    const {progress,writes,end} = await evaluate('window.deletionObservation');
    const full = progress.find(entry => entry.value === 100);
    assert.ok(full.time >= 2980 && full.time < 3400, JSON.stringify(full));
    assert.equal(writes.length,1);
    assert.equal(writes[0].value,100);
    assert.equal(writes[0].title,'報告書のデータを削除しています…');
    assert.ok(writes[0].stored && full.time <= writes[0].time && writes[0].time <= end.time);
    assert.equal(end.stored, fail);
    assert.equal(end.title,fail ? 'データを削除できませんでした。' : 'データの削除が完了しました。');
    if (motion === 'reduce') assert.deepEqual(progress.map(({value}) => Math.round(value)),[0,17,33,50,67,83,100]);
    else assert.ok(progress.length > 30 && progress.every((entry,index) => !index || entry.value > progress[index - 1].value));
    if (!fail && !fromFile) await capture('A10-' + label + '-complete', '#reportDeleteDialog');
    console.log('A10 ' + label + (fail ? ' failure' : '') + (fromFile ? ' file' : '') + ' (ms)', { full: Math.round(full.time), write: Math.round(writes[0].time), dialog: Math.round(end.time), samples: progress.length });
  }
  await checkDeletion('no-preference');
  await click('#reportDeleteClose');
  await page('yaboo-news-aftermath.html');
  await click('a[href="timeback-ending-record.html"]');
  await page('timeback-ending-record.html');
  await returnToBranch();
  assert.equal(await evaluate('JSON.parse(' + report + ').status'), 'complete');
  await go(editor);
  await click('#report-reset');
  await click('#report-reset-dialog button[value=reset]');
  await wait(visible('#report-check'));
  for (const [index, entry] of entries.entries()) await input(`[data-report-answer][aria-label^="${'①②③④⑤'[index]}"]`, entry);
  await input(first, ' BAS ');
  await saveReport([true, true, true, true, true]);
  await page(notes);
  await evaluate('localStorage.setItem("timeback-investigation-mail-v1","4")');
  await go('takase-mail.html');
  await checkDeletion('reduce', {fail:true});
  assert.equal(await evaluate('localStorage.getItem("timeback-investigation-mail-v1")'),'4');
  await click('#reportDeleteClose');
  await checkDeletion('reduce');
  await send('Page.reload',{});
  await wait('location.pathname.endsWith("takase-mail.html") && document.readyState === "complete" && !window.deletionObservation');
  assert.equal(await evaluate(report),null);
  assert.equal(await evaluate('localStorage.getItem("timeback-investigation-mail-v1")'),'5');
  assert.equal(await evaluate(visible('#reportDelete')),false);

  await evaluate(`(() => {
    const key = 'timeback-page-archive-v1';
    const entries = JSON.parse(localStorage.getItem(key));
    const extra = [
      [89,'yaboo-news-investigation.html'], [90,'timeback-ending-blind-spot.html'],
      [104,'yaboo-news-trial-disclosure.html'], [105,'timeback-ending-full-disclosure.html'],
      [110,'chronect-hub-bat-spec.html']
    ];
    localStorage.setItem(key, JSON.stringify(entries.concat(extra.map(([number,href]) => ({number,href})))));
    localStorage.setItem('timeback-final-chapter-v1', JSON.stringify({opened:[110],reportSent:true,disclosed:true}));
  })()`);
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  for (const slug of ['chronect', 'tip', 'aftermath', 'investigation', 'trial-disclosure', 'timeback-suspension']) {
    await go('yaboo-news-' + slug + '.html');
    assert.equal(await evaluate(`!!document.querySelector('.yaboo-footer nav a[href="yaboo-news-tip.html"]')
      && !document.querySelector('.yaboo-footer .fiction-notice')
      && !!document.querySelector('.yaboo-footer + .yaboo-arg-footer .fiction-notice')
      && !!document.querySelector('.yaboo-arg-footer #archiveButton')`), true, slug);
    for (const px of widths) {
      await send('Emulation.setDeviceMetricsOverride', { width: px, height: 660, deviceScaleFactor: 1, mobile: false });
      await checkWidth('Yaboo! ' + slug);
      assert.deepEqual(await evaluate(`['.yaboo-category-nav','.yaboo-footer','.yaboo-arg-footer'].map(selector =>
        getComputedStyle(document.querySelector(selector)).backgroundColor)`), ['rgb(224, 0, 45)','rgb(224, 0, 45)','rgb(18, 18, 18)']);
      assert.equal(await evaluate('getComputedStyle(document.querySelector("#archiveButton")).position'), slug === 'tip' ? 'static' : 'fixed');
      if (slug === 'tip') {
        await evaluate('scrollTo(0,0)');
        assert.equal(await evaluate('document.querySelector("#archiveButton").getBoundingClientRect().top >= innerHeight'), true);
        await evaluate('document.querySelector("#archiveButton").scrollIntoView({block:"center",behavior:"instant"})');
        assert.equal(await evaluate('document.querySelector("#archiveButton").getBoundingClientRect().bottom <= innerHeight'), true);
        await click('#archiveButton');
        await wait('document.body.classList.contains("archive-open")');
        await click('#archiveClose');
      }
      if (px === 1440 || (px === 390 && slug === 'tip')) {
        await evaluate('scrollTo(0, document.documentElement.scrollHeight)');
        await capture('A05-' + slug + '-footers-' + px, '.yaboo-footer, .yaboo-arg-footer');
      }
    }
  }
  for (const [slug, alignment] of [['full-disclosure', 'center'], ['record', 'start'], ['blind-spot', 'start'], ['own-time', 'start']]) {
    await go('timeback-ending-' + slug + '.html');
    for (const px of widths) {
      await width(px);
      await checkWidth('ENDING ' + slug);
      assert.equal(await evaluate('getComputedStyle(document.querySelector(".ending-story")).textAlign'), alignment);
    }
  }
  const aizawaConversation = [
    '突然のご連絡、失礼します。相沢直人さんでお間違いないでしょうか。',
    'はい、ノードリンク・ワークスの相沢です。失礼ですが、どちら様でしょうか。',
    'Chronectという企業について調べています。突然こんなことを言われても困ると思いますが、私はあなたの味方です。',
    '申し訳ありませんが、お話の意図が分かりかねます。弊社へのお問い合わせでしょうか。',
    'あなたが身分を偽って、ノードリンクに入社したことも知っています。',
    '何かのお間違いではないでしょうか。いたずらでしたら、このようなご連絡はお控えください。',
    '高瀬悠真さん、ですよね？',
    '……申し訳ありませんが、どなたのことでしょうか。'
  ];
  const bubbles = 'Array.from(document.querySelectorAll("#messageLog .bubble"), node => node.textContent)';
  await go('takase-mail.html#new-message');
  await input('#mailAddress', 'aizawa.naoto@nodelink.mail');
  await click('#addressForm button[type=submit]');
  await click('#mail-thread-aizawa');
  await width(1440);
  await scripted(true);
  await width(390);
  for (let i=0;i<3;i++) await scripted();
  assert.deepEqual(await evaluate(bubbles), aizawaConversation);
  await checkWidth('No.84 Aizawa on mobile');
  await evaluate(`localStorage.setItem('timeback-mail-aizawa-v1', JSON.stringify({progress:8,startedAt:1,draftLength:0}))`);
  await go('chronect.html');
  await go('takase-mail.html#aizawa');
  assert.deepEqual(await evaluate(bubbles), aizawaConversation);

  async function openLocal(name) {
    const url = pathToFileURL(path.resolve(__dirname, '../public', name)).href;
    await send('Page.navigate',{url});
    await wait(`location.href === ${JSON.stringify(url)} && document.readyState === 'complete'`);
  }
  await openLocal('time-back.html');
  await input('#siteSearchInput', 'Chronect');
  await click('form[action="search.html"] button');
  await wait('location.protocol === "file:" && location.pathname.endsWith("/search.html") && !!document.querySelector(".result-item a")');
  await click('.result-item a');
  await wait('location.protocol === "file:" && location.pathname.endsWith("/chronect.html") && document.readyState === "complete"');
  assert.equal(await evaluate('getComputedStyle(document.querySelector(".recruit-copy")).display'),'block');
  await openLocal('yaboo-news-tip.html');
  assert.equal(await evaluate('getComputedStyle(document.querySelector(".yaboo-footer")).backgroundColor'),'rgb(224, 0, 45)');
  await openLocal('takase-work-notes.html');
  await evaluate(`localStorage.setItem('timeback-investigation-report-v1', JSON.stringify({
    status:'complete', entries:['BAS','SECOND SHIFT','施設C','SUB-117','TB-260917-4826']
  }));
  localStorage.setItem('timeback-investigation-mail-v1','4');`);
  await openLocal('takase-mail.html');
  await checkDeletion('reduce',{fromFile:true});
  await click('#reportDeleteClose');
  await wait('location.protocol === "file:" && location.pathname.endsWith("/yaboo-news-aftermath.html") && document.readyState === "complete"');
  console.log('PASS author review: search, recruit card, work log, reports, endings, news footers and 4 Chrome widths.');
}).catch(error => { console.error(error); process.exitCode = 1; });
