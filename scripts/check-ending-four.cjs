const assert = require('node:assert/strict');
const runChrome = require('./check-ending-three.cjs');

const archiveKey = 'timeback-page-archive-v1';
const finalKey = 'timeback-final-chapter-v1';
const reportKey = 'timeback-investigation-report-v1';
const priorEndings = [
  { number: 86, href: 'timeback-ending-record.html', fragment: 'Behavior □□□□□□□□□□ □□□□□□□□' },
  { number: 90, href: 'timeback-ending-blind-spot.html', fragment: '□□□□□□□□ Assistance □□□□□□□□' },
  { number: 105, href: 'timeback-ending-full-disclosure.html', fragment: '□□□□□□□□ □□□□□□□□□□ Terminal' }
];
const pages = [
  'chronect-hub-bat-spec.html', 'chronect-hub-bat-control.html', 'chronect-hub-mmu-spec.html',
  'bat-device-diagnostics.html', 'chronect-hub-bat-emergency.html', 'chronect-hub-memory-recovery.html',
  'bat-recovery-report.html', 'yaboo-news-timeback-suspension.html', 'timeback-ending-own-time.html'
];
const terms = ['Behavior Assistance Terminal', 'BAT制御系統', 'MMU', '', 'BAT緊急対応', '隔離記憶復旧'];
const settings = {
  CLASSIFICATION: 'ｍ-０３', TASK_ACCEPT: ' deny ', REJECT_SCOPE: 'TASK_ONLY',
  MEMORY_PROFILE: 'SESSION', REFERENCE_BOUNDARY: 'DYNAMIC'
};
const correctOrder = ['RECOVERY', 'NORMALIZE', 'RESTORE', 'MERGE', 'VERIFY'];
const widths = [1440, 768, 390, 320];
const state = 'window.timebackFinalChapter.read()';
const openedView = '[data-final-chapter-view]';
const form = '#final-recovery-form';
const mail = 'takase-mail.html';

async function scenario({ evaluate, wait, visible, click, input, page, go, width, checkWidth, scripted, returnToBranch }) {
  async function put(key, value) {
    await evaluate(`localStorage.setItem(${JSON.stringify(key)}, ${JSON.stringify(JSON.stringify(value))})`);
  }

  function visitCount() {
    return evaluate(`JSON.parse(localStorage.getItem('${archiveKey}') || '[]').filter(page => page.number >= 110).length`);
  }

  async function search(term, href, follow = false) {
    const query = '?q=' + encodeURIComponent(term);
    await go('chronect-hub-search.html' + query);
    await wait(`location.search === ${JSON.stringify(query)}`);
    assert.equal(await evaluate('document.getElementById("archiveButton").textContent.trim()'), 'EX');
    assert.deepEqual(await evaluate('Array.from(document.querySelectorAll(".hub-result a"), a => a.getAttribute("href"))'),
      href ? [href] : [], term);
    if (follow) {
      await click('.hub-result a');
      await page(href);
      await wait(visible(openedView));
    }
  }

  async function locked(href) {
    await go(href);
    assert.equal(await evaluate(visible(openedView)), false, href);
    assert.equal(await evaluate('document.body.dataset.pageArchive'), 'exclude', href);
  }

  async function restartMail() {
    await go(mail + '#aizawa');
    await wait(visible('#messageLog'));
  }

  async function addAction(code) {
    await click(`button[data-final-action="${code}"]`);
  }

  async function moveAction(code, direction) {
    await click(`button[data-final-code="${code}"][data-final-move="${direction}"]`);
  }

  await go('index.html');
  for (const href of pages) await locked(href);
  for (let mask = 0; mask < 7; mask++) {
    await put(archiveKey, priorEndings.filter((_, index) => mask & (1 << index)));
    await search('##' + terms[0] + '##');
    assert.equal(await evaluate(`localStorage.getItem('${finalKey}')`), null);
  }
  // Titles and historical numbers are irrelevant, provided the ending URLs were recorded.
  await put(archiveKey, [...priorEndings].reverse().map(({ href }, index) => ({ href, number: 48 + index })));
  for (const value of [terms[0], '##BAT##', '##Behavior Assistance##', '##MMU##']) await search(value);
  assert.equal(await visitCount(), 0);
  await locked(pages[0]);
  await search('##web運用日誌##', 'chronect-hub-web-operations-log.html');
  await search('##' + terms[0] + '##', pages[0]);
  assert.equal(await visitCount(), 0, 'EX must not create a visit');
  await search('##' + terms[1] + '##');
  assert.equal(await visitCount(), 0);
  for (let index = 0; index < 3; index++) {
    await search('##' + terms[index] + '##', pages[index], true);
    const clue = index === 2 ? terms[4] : terms[index + 1];
    assert((await evaluate('document.querySelector(".hub-document").textContent')).includes(clue));
  }
  await put('timeback-mail-aizawa-v1', { route: 2, progress: 15, reportReceived: true, startedAt: Date.now() });
  await evaluate('localStorage.setItem("timeback-investigation-mail-v1", "6")');
  await restartMail();
  await scripted(true);
  await wait(state + '.mailProgress === 2');
  await width(390);
  for (const checkpoint of [4, 7]) {
    await scripted();
    await wait(state + '.mailProgress === ' + checkpoint);
  }
  await wait(visible(`#messageLog a[href="${pages[3]}"]`));
  assert.equal(await evaluate(visible(form)), false);
  // The manual can be read before the already-received diagnostics attachment.
  for (let index = 4; index < 6; index++) {
    await search('##' + terms[index] + '##', pages[index], true);
    if (index === 4) assert((await evaluate('document.querySelector(".hub-document").textContent')).includes(terms[5]));
  }
  await restartMail();
  assert.equal(await evaluate(visible(form)), false);
  await click(`#messageLog a[href="${pages[3]}"]`);
  await page(pages[3]);
  await wait(visible(openedView));
  await click('a[href="takase-mail.html#aizawa"]');
  await page(mail);
  await wait(visible(form));
  await locked(pages[6]);
  await locked(pages[7]);
  await locked(pages[8]);
  await restartMail();
  for (const pixels of widths) {
    await width(pixels);
    await checkWidth('Recovery form @ ' + pixels);
  }
  await input(form + ' [name=CLASSIFICATION]', settings.CLASSIFICATION);
  await addAction('NORMALIZE');
  await addAction('RECOVERY');
  await moveAction('RECOVERY', 'up');
  await moveAction('NORMALIZE', 'remove');
  await addAction('NORMALIZE');
  await restartMail();
  assert.deepEqual(await evaluate(state + '.order'), correctOrder.slice(0, 2));
  assert.equal(await evaluate(`document.querySelector('${form} [name=CLASSIFICATION]').value`), settings.CLASSIFICATION);
  for (const [name, value] of Object.entries(settings)) await input(`[name="${name}"]`, value);
  for (const code of ['MERGE', 'RESTORE', 'VERIFY']) await addAction(code);
  await click('#final-recovery-submit');
  assert.equal(await evaluate(state + '.solved'), false);
  await moveAction('RESTORE', 'up');
  await input('[name="TASK_ACCEPT"]', 'ALLOW');
  await click('#final-recovery-submit');
  assert.equal(await evaluate(state + '.solved'), false);
  await input('[name="TASK_ACCEPT"]', settings.TASK_ACCEPT);
  await click('#final-recovery-submit');
  await wait(state + '.solved');
  assert.equal(await evaluate(state + '.recovered'), false);
  await locked(pages[6]);
  await restartMail();
  for (const checkpoint of [10, 12]) {
    await scripted();
    await wait(state + '.mailProgress === ' + checkpoint);
    assert.equal(await evaluate(state + '.consented'), false);
  }
  await scripted();
  await wait(state + '.mailProgress >= 18', 'consent and recovery receipt');
  assert.equal(await evaluate(state + '.consented && ' + state + '.recovered'), true);
  await click(`#messageLog a[href="${pages[6]}"]`);
  await page(pages[6]);
  await wait(visible(openedView));
  await click('a[href="takase-mail.html#aizawa"]');
  await page(mail);
  for (const checkpoint of [26, 30]) {
    await scripted();
    await wait(state + '.mailProgress === ' + checkpoint);
  }
  assert.equal(await evaluate(visible('#final-chapter-news-link')), false);
  assert.equal(await evaluate(visible('#reportAttach')), false);
  assert.equal(await evaluate(visible('#mobileReply')), false);
  await wait(visible('#final-report-recovery-link'));
  assert.equal(await evaluate(`localStorage.getItem('${reportKey}')`), null);
  await go(priorEndings[0].href);
  await returnToBranch();
  await restartMail();
  assert.equal(await evaluate(state + '.mailProgress'), 30);
  assert.equal(await evaluate(state + '.recovered'), true);
  assert.equal(await evaluate('document.getElementById("mobileReply").disabled'), true);
  await click('#reportAttach');
  await wait(visible('#reportPicker'));
  assert.doesNotMatch(await evaluate('document.getElementById("reportPicker").textContent'), /TIME BACKおよびSECOND SHIFT/);
  await click('#reportPicker button[value="attach"]');
  await wait(visible('#reportAttached'));
  const originalReport = await evaluate(`localStorage.getItem('${reportKey}')`);
  await scripted();
  await wait(state + '.mailProgress === 37');
  assert.equal(await evaluate(`localStorage.getItem('${reportKey}')`), originalReport);
  await locked(pages[8]);
  await restartMail();
  await click('#final-chapter-news-link');
  await page(pages[7]);
  await wait(visible(openedView));
  await click(`a[href="${pages[8]}"]`);
  await page(pages[8]);
  await wait(visible(openedView));
  assert.equal(await visitCount(), 9);
  await returnToBranch();
  assert.equal(await visitCount(), 9);
  await go(pages[8]);
  await wait(visible(openedView));

  for (const pixels of widths) {
    await width(pixels);
    for (const href of pages) {
      await go(href);
      await wait(visible(openedView));
      await checkWidth(href + ' @ ' + pixels);
    }
    for (const { href, fragment } of priorEndings) {
      await go(href);
      assert.equal(await evaluate('document.querySelector(".ending-fragment").textContent.trim()'), fragment);
      await wait(visible('.ending-fragment'));
      await checkWidth(href + ' @ ' + pixels);
    }
    await restartMail();
    await checkWidth('No.84 @ ' + pixels);
  }

  await go('time-back.html');
  await click('#archiveButton');
  await wait(visible(`#archiveList a[href="${pages[8]}"]`));
  await click('#archiveResetButton');
  await click('#resetAccept');
  await page('index.html');
  assert.equal(await evaluate(`localStorage.getItem('${finalKey}')`), null);
  assert.equal(await visitCount(), 0);
  await search('##' + terms[0] + '##');
  await locked(pages[8]);
  console.log('PASS ENDING 4: gates, staged mail, puzzle/draft, recovery, report rewind/attachment, prior endings, archive reset and four Chrome widths.');
}

runChrome(scenario).catch(error => { console.error(error); process.exitCode = 1; });
