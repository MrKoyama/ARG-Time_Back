'use strict';

const assert = require('node:assert/strict');
const runChrome = require('./check-ending-three.cjs');

runChrome(async ({ evaluate, wait, visible, click, input, page, go, width, checkWidth, scripted, returnToBranch, send }) => {
  const widths = [1440, 768, 390, 320];
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
  }
  await click('nav a[href="chronect-company.html"]');
  await page('chronect-company.html');
  await search('chronect-search.html', '企業情報', 'chronect-company.html');
  await search('search.html', 'Chronect', 'chronect-company.html');
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
  for (const [id, contents] of [['01', '公開ページの表示確認'], ['04', '検索画面の動作確認']]) {
    const button = `button[aria-controls="log-record-${id}"]`;
    const details = '#log-record-' + id;
    assert.equal(await evaluate(visible(details)), false);
    await click(button);
    assert.equal(await evaluate(visible(details)), true);
    assert.equal(await evaluate(`document.querySelector('${details}').innerText`), '作業内容：' + contents + '\n処理状況：完了');
    await click(button);
    assert.equal(await evaluate(visible(details)), false);
  }
  await click('#log-review-toggle');
  assert.equal(await evaluate(visible('#log-review-result')), false);
  for (const [term, success] of [['検索', false], ['0件', true]]) {
    await input('#log-review-answer', term);
    await click('#log-review-form button');
    assert.equal(await evaluate(visible('#log-review-result')), success);
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
  await wait('!document.querySelector("#report-download-dialog").open && !document.querySelector("#report-download").disabled');
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
  for (let i = 0; i < 3; i++) await scripted();
  assert.match(await evaluate('document.querySelector("#messageLog").innerText'), /調査作業控えに記載されていたメールアドレスを見つけ、ご連絡しました。/);
  await click('#reportAttach');
  await click('#reportPicker button[value=attach]');
  await wait('!document.querySelector("#mobileReply").disabled');
  await scripted();
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
  await click('#reportDelete');
  await click('#reportDeleteCancel');
  assert.ok(await evaluate(report));
  await click('#reportDelete');
  await evaluate('window.deleteStarted=performance.now(); document.querySelector("#reportDeleteConfirm").click()');
  await wait('document.querySelector("#reportDeleteProgress").value >= 35');
  assert.ok(await evaluate(report));
  await wait(visible('#reportDeleteClose'));
  const elapsed = await evaluate('performance.now()-window.deleteStarted');
  assert.ok(elapsed >= 4950 && elapsed < 6000, 'deletion took ' + elapsed + ' ms');
  assert.equal(await evaluate(report), null);
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
  console.log('PASS author review 1: all 14 IDs; 4 Chrome widths; deletion in ' + Math.round(elapsed) + ' ms.');
}).catch(error => { console.error(error); process.exitCode = 1; });
