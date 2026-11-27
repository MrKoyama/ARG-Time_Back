const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { setTimeout: sleep } = require('node:timers/promises');
const runChrome = require('./check-ending-three.cjs');

const tip = 'yaboo-news-tip.html';
const playerArticle = 'yaboo-news-investigation.html';
const takaseArticle = 'yaboo-news-trial-disclosure.html';
const reportKey = 'timeback-investigation-report-v1';
const mailKey = 'timeback-investigation-mail-v1';
const aizawaKey = 'timeback-mail-aizawa-v1';
const playerKey = 'timeback-investigation-tip-v1';
const takaseKey = 'timeback-investigation-tip-takase-v1';
const complete = { status: 'complete', entries: ['BAS', 'SECOND SHIFT', '施設C', 'SUB-117', 'TB-260917-4826'] };
const received = { route: 2, progress: 15, reportReceived: true };
const names = {
  player: 'TIME BACKの売却時間帯における身体利用に関する調査報告書',
  takase: 'TIME BACKおよびSECOND SHIFTに関する調査報告書'
};

runChrome(async ({ evaluate, wait, visible, click, page, go, width, checkWidth, returnToBranch, send, origin }) => {
  const shotDir = process.env.TIMEBACK_TIP_SCREENSHOTS;
  if (shotDir) await fs.mkdir(shotDir, { recursive: true });
  const state = {
    [reportKey]: null, [mailKey]: null, [aizawaKey]: null, [playerKey]: null, [takaseKey]: null
  };
  const read = keys => evaluate('Object.fromEntries(' + JSON.stringify(keys) + '.map(key => [key, localStorage.getItem(key)]))');
  async function reload() {
    const previous = await evaluate('performance.timeOrigin');
    await send('Page.reload');
    await wait('performance.timeOrigin !== ' + previous + ' && document.readyState === "complete"');
    await page(tip);
  }
  async function seed(values = {}) {
    await evaluate('Object.entries(' + JSON.stringify({ ...state, ...values }) + ').forEach(([key,value]) => ' +
      'value === null ? localStorage.removeItem(key) : localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value)))');
    await reload();
  }
  async function dialogFits(selector, pixels) {
    await width(pixels);
    await wait('innerWidth === ' + pixels);
    await checkWidth(selector + ' at ' + pixels);
    assert(await evaluate('(() => { const dialog = document.querySelector(' + JSON.stringify(selector) + ');' +
      'const box = dialog.getBoundingClientRect(); return dialog.matches(":modal") && box.width > 0 &&' +
      'box.left >= 0 && box.right <= innerWidth && box.top >= 0 && box.bottom <= innerHeight &&' +
      'dialog.scrollWidth <= dialog.clientWidth + 1; })()'), selector + ' at ' + pixels);
  }
  async function capture(pixels, name) {
    if (!shotDir || ![1440, 390].includes(pixels)) return;
    const { data } = await send('Page.captureScreenshot', { format: 'png' });
    await fs.writeFile(path.join(shotDir, pixels + '-' + name + '.png'), Buffer.from(data, 'base64'));
  }
  async function press(key, code, keyCode) {
    for (const type of ['keyDown', 'keyUp']) await send('Input.dispatchKeyEvent', { type, key, code, windowsVirtualKeyCode: keyCode });
  }
  async function picker(kinds, open = () => click('#report-attach')) {
    await open();
    await wait(visible('#tip-picker'));
    assert(await evaluate('document.querySelector("#tip-picker-open").disabled'));
    assert.deepEqual(await evaluate('[...document.querySelectorAll("#tip-picker input")].map(el => el.value)'), kinds);
    assert.equal(await evaluate(visible('#tip-picker-empty')), kinds.length === 0);
    assert.deepEqual(await evaluate('[...document.querySelectorAll(".yaboo-tip-picker-name")].map(el => el.textContent)'), kinds.map(kind => names[kind]));
  }
  async function select(kind) {
    const selector = '#tip-picker input[value="' + kind + '"]';
    await evaluate('document.querySelector(' + JSON.stringify(selector) + ').focus()');
    await click(selector);
  }
  async function attach(kind) {
    await select(kind);
    await click('#tip-picker-open');
    await wait(visible('#tip-file'));
    assert.equal(await evaluate('document.querySelector("#tip-file-name").textContent'), names[kind]);
  }
  async function confirm(kind) {
    await click('#tip-submit');
    await wait(visible('#tip-confirmation'));
    assert.equal(await evaluate('document.activeElement.value'), 'cancel');
    assert.equal(await evaluate('document.querySelector("#tip-confirm-file").textContent'), names[kind]);
  }
  async function sendTip() {
    const started = await evaluate('performance.now()');
    await evaluate('(() => { const button = document.querySelector("#tip-confirm-submit"); button.click(); button.click(); })()');
    await wait(visible('#tip-sending'));
    assert(await evaluate('document.querySelector("#tip-submit").disabled'));
    return started;
  }
  async function assertResumed(link) {
    await reload();
    await wait(visible(link));
    assert.equal(await evaluate('document.querySelectorAll("dialog[open]").length'), 0);
    assert.equal(await evaluate(visible('#tip-file')), false);
  }

  await go(tip);
  for (const values of [{}, { [reportKey]: { ...complete, status: 'draft' } }, { [reportKey]: complete, [mailKey]: '5' }]) {
    await seed(values);
    await picker([]);
    assert(await evaluate('document.querySelector("#tip-submit").disabled'));
    assert.doesNotMatch(await evaluate('document.querySelector("#tip-picker").textContent'), /SECOND SHIFT/);
    await press('Escape', 'Escape', 27);
    await wait('!document.querySelector("#tip-picker").open');
    assert.equal(await evaluate('document.activeElement.id'), 'report-attach');
  }
  await seed({ [reportKey]: complete });
  await picker(['player']);
  await press(' ', 'Space', 32);
  assert(await evaluate('document.querySelector("#tip-picker input").checked'));
  await click('#tip-picker-open');
  await click('#tip-remove-file');
  assert.equal(await evaluate(visible('#tip-file')), false);
  await picker(['player']);
  await attach('player');
  await confirm('player');
  await press('Escape', 'Escape', 27);
  await wait('!document.querySelector("#tip-confirmation").open');
  assert.equal(await evaluate('document.activeElement.id'), 'tip-submit');
  assert(await evaluate(visible('#tip-file')));
  assert.deepEqual(await read([playerKey, takaseKey]), { [playerKey]: null, [takaseKey]: null });
  await confirm('player');
  await sendTip();
  await assertResumed('#tip-article');
  await click('#tip-article');
  await page(playerArticle);
  await go(tip);

  await seed({ [aizawaKey]: received });
  await picker(['takase']);
  await attach('takase');
  await confirm('takase');
  await sendTip();
  await wait(visible('#tip-receipt'));
  await assertResumed('#tip-full-article');

  await seed({ [reportKey]: complete, [aizawaKey]: received });
  await picker(['player', 'takase']);
  await attach('player');
  await picker(['player', 'takase']);
  await select('takase');
  await click('#tip-picker button[value=cancel]');
  assert.equal(await evaluate('document.querySelector("#tip-file-name").textContent'), names.player);
  await click('#tip-remove-file');
  await picker(['player', 'takase']);
  await attach('takase');
  await confirm('takase');
  await click('#tip-confirmation button[value=cancel]');
  assert(await evaluate(visible('#tip-file')));
  await confirm('takase');
  await sendTip();
  await wait(visible('#tip-receipt'));
  await click('#tip-receipt button');
  await wait(visible('#tip-elapsed'));
  assert.equal(await evaluate('getComputedStyle(document.querySelector("#tip-elapsed p")).animationName'), 'none');
  await assertResumed('#tip-full-article');

  const timings = [];
  for (const pixels of [1440, 768, 390, 320]) {
    const motion = pixels === 768 ? 'reduce' : 'no-preference';
    await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: motion }] });
    await seed({ [reportKey]: complete, [aizawaKey]: received, [mailKey]: '4' });
    await width(pixels);
    await wait('innerWidth === ' + pixels);
    const kind = pixels <= 390 ? 'takase' : 'player';
    if (pixels === 390) {
      await send('Emulation.setTouchEmulationEnabled', { enabled: true });
      await picker(['player', 'takase'], async () => {
        const point = await evaluate('(() => { const box = document.querySelector("#report-attach").getBoundingClientRect();' +
          'return {x: box.x + box.width / 2, y: box.y + box.height / 2}; })()');
        await send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [point] });
        await send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
      });
      await send('Emulation.setTouchEmulationEnabled', { enabled: false });
    } else {
      await picker(['player', 'takase']);
    }
    await dialogFits('#tip-picker', pixels);
    await select(kind);
    await capture(pixels, 'picker');
    await click('#tip-picker-open');
    await confirm(kind);
    await dialogFits('#tip-confirmation', pixels);
    await capture(pixels, 'confirmation');
    const source = await read([reportKey, aizawaKey, mailKey]);
    const start = await sendTip();
    await dialogFits('#tip-sending', pixels);
    await wait('document.querySelector("#tip-progress").value >= 35');
    await capture(pixels, 'sending');
    await wait(visible('#tip-receipt'));
    const sentIn = Math.round(await evaluate('performance.now()') - start);
    assert(sentIn >= 2400 && sentIn <= 4000, 'Sending duration ' + sentIn);
    assert.equal(await evaluate('document.querySelector("#tip-progress").value'), 100);
    assert.deepEqual(await read([reportKey, aizawaKey, mailKey]), source);
    assert.deepEqual(await read([playerKey, takaseKey]), {
      [playerKey]: kind === 'player' ? 'submitted' : null,
      [takaseKey]: kind === 'takase' ? 'submitted' : null
    });
    await dialogFits('#tip-receipt', pixels);
    await capture(pixels, 'receipt');
    assert.equal(await evaluate('document.querySelectorAll("input[type=file]").length'), 0);
    assert(await evaluate('performance.getEntriesByType("resource").every(entry => new URL(entry.name).origin === location.origin && !["fetch","xmlhttprequest","beacon"].includes(entry.initiatorType))'));
    const beforeElapsed = await evaluate('performance.timeOrigin + performance.now()');
    await click('#tip-receipt button');
    await wait(visible('#tip-elapsed'));
    await dialogFits('#tip-elapsed', pixels);
    assert.equal(await evaluate('document.querySelector("#tip-elapsed-title").textContent'), '数日後――');
    const elapsedStyle = 'getComputedStyle(document.querySelector("#tip-elapsed-title"))';
    if (motion === 'reduce') {
      assert.equal(await evaluate(elapsedStyle + '.animationName'), 'none');
      assert.equal(await evaluate(elapsedStyle + '.opacity'), '1');
    } else {
      assert.equal(await evaluate(elapsedStyle + '.animationDuration'), '2s');
      await wait(elapsedStyle + '.opacity === "1"');
      await capture(pixels, 'elapsed');
      await wait(elapsedStyle + '.opacity < 1');
    }
    await page(kind === 'player' ? playerArticle : takaseArticle);
    const elapsedIn = Math.round(await evaluate('performance.timeOrigin') - beforeElapsed);
    assert(elapsedIn >= 1900 && elapsedIn <= 2500, 'Elapsed duration ' + elapsedIn);
    timings.push({ pixels, motion, sentIn, elapsedIn });
    await go(tip);
  }

  await seed({ [reportKey]: complete, [aizawaKey]: received, [playerKey]: 'submitted', [takaseKey]: 'submitted' });
  assert(await evaluate(visible('#tip-article')));
  assert(await evaluate(visible('#tip-full-article')));
  await click('#tip-article');
  await page(playerArticle);
  await click('a[href="timeback-ending-blind-spot.html"]');
  await page('timeback-ending-blind-spot.html');
  await returnToBranch();
  assert.deepEqual(await read([playerKey, takaseKey]), { [playerKey]: null, [takaseKey]: null });
  await go(playerArticle);
  assert(await evaluate(visible('#tip-investigation')));

  // Rewind an in-flight submission in another tab, then reset with a new confirmation open.
  await go(tip);
  await width(768);
  await picker(['player', 'takase']);
  await attach('player');
  await confirm('player');
  await sendTip();
  const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
  const other = async expression =>
    (await send('Runtime.evaluate', { expression, returnByValue: true }, sessionId)).result?.value;
  async function waitOther(expression) {
    for (let attempt = 0; attempt < 150; attempt++) {
      if (await other(expression)) return;
      await sleep(50);
    }
    assert.fail('Second tab: ' + expression);
  }
  await send('Page.navigate', { url: origin + 'timeback-ending-blind-spot.html' }, sessionId);
  await waitOther('document.readyState === "complete" && Boolean(document.querySelector("#branch-return")?.getClientRects().length)');
  await other('document.querySelector("#branch-return").click(); document.querySelector("#branch-return-dialog button[value=rewind]").click()');
  await waitOther('location.pathname.endsWith("takase-work-notes.html") && document.readyState === "complete"');
  await send('Page.bringToFront');
  await wait('document.querySelectorAll("dialog[open]").length === 0');
  assert.deepEqual(await read([playerKey, takaseKey]), { [playerKey]: null, [takaseKey]: null });
  await picker(['player', 'takase']);
  await attach('player');
  await confirm('player');
  await send('Page.bringToFront', {}, sessionId);
  await other('document.querySelector("#archiveButton").click(); document.querySelector("#archiveResetButton").click(); document.querySelector("#resetAccept").click()');
  await waitOther('location.pathname.endsWith("index.html") && document.readyState === "complete"');
  await page('index.html');
  await send('Target.closeTarget', { targetId });
  assert.deepEqual(await read([playerKey, takaseKey, reportKey, aizawaKey]), {
    [playerKey]: null, [takaseKey]: null, [reportKey]: null, [aizawaKey]: null
  });
  console.log('PASS C09/C10: eligibility, dialogs, interrupted and legacy submissions, both routes, stale tabs, reset, widths');
  console.table(timings);
}).catch(error => { console.error(error); process.exitCode = 1; });
