const assert = require('node:assert/strict');
const runChrome = require('./check-ending-three.cjs');

const archiveKey = 'timeback-page-archive-v1';
const finalKey = 'timeback-final-chapter-v1';
const reportKey = 'timeback-investigation-report-v1';
const priorEndings = [
  { number: 86, href: 'timeback-ending-record.html', fragment: 'B*h**i*r *s*i**a**e *e******' },
  { number: 90, href: 'timeback-ending-blind-spot.html', fragment: '*e*av*o* A*s**t*n** ****i***' },
  { number: 105, href: 'timeback-ending-full-disclosure.html', fragment: '******** ****s***c* T*rm*nal' }
];
const drawing = 'chronect-hub-bat-drawing.html';
const retired = [
  'chronect-hub-bat-spec.html', 'chronect-hub-bat-control.html', 'chronect-hub-mmu-spec.html',
  'bat-device-diagnostics.html', 'chronect-hub-bat-emergency.html', 'chronect-hub-memory-recovery.html',
  'bat-recovery-report.html'
];
const news = 'yaboo-news-timeback-suspension.html';
const ending = 'timeback-ending-own-time.html';
const term = '##Behavior Assistance Terminal##';
const view = '[data-final-chapter-view]';
const imageNames = ['bat-exterior-views.png', 'bat-exploded-view.png', 'bat-development-sketch.png'];

async function scenario({ evaluate, wait, visible, click, page, go, width, checkWidth, send, origin }) {
  const put = (key, value) => evaluate('localStorage.setItem(' + JSON.stringify(key) + ',' + JSON.stringify(JSON.stringify(value)) + ')');
  const read = key => evaluate('JSON.parse(localStorage.getItem(' + JSON.stringify(key) + '))');
  async function search(query, href) {
    await go('chronect-hub-search.html?q=' + encodeURIComponent(query));
    assert.equal(await evaluate('document.querySelector("#archiveButton").textContent.trim()'), 'EX');
    assert.deepEqual(await evaluate('[...document.querySelectorAll(".hub-result a")].map(a => a.getAttribute("href"))'), href ? [href] : [], query);
  }
  const oldVisits = retired.map((href, index) => ({ href, number: 110 + index }));
  const oldState = {
    opened: [110, 111, 112, 114, 115], mailProgress: 37, mailDraftLength: 0,
    answers: {}, order: [], solved: true, diagnostics: true, consented: true, recovered: true,
    reportSent: true, disclosed: true
  };
  await go('index.html');
  for (let mask = 0; mask < 7; mask++) {
    await put(archiveKey, priorEndings.filter((_, index) => mask & (1 << index)));
    await search(term);
    assert.equal(await read(finalKey), null);
  }
  await put(archiveKey, priorEndings);
  await search(term, drawing);
  assert.equal((await read(finalKey)).drawingOpened, true);
  assert((await read(archiveKey)).every(entry => entry.href !== drawing));
  for (const href of [news, ending]) {
    await go(href);
    assert.equal(await evaluate(visible(view)), false, 'The new entrance does not complete the old route');
  }
  await put(archiveKey, [...priorEndings, ...oldVisits]);
  await put(finalKey, oldState);
  await go(drawing);
  assert.equal(await evaluate(visible(view)), false, 'Legacy No.110 must not unlock the drawing');
  assert((await read(archiveKey)).every(entry => entry.href !== drawing));
  for (const href of retired) {
    await go(href);
    assert.equal(await evaluate(visible(view)), false, href);
    assert.equal(await evaluate('document.body.dataset.pageNumber'), undefined);
  }
  for (const query of ['Behavior Assistance Terminal', '##BAT##', '##BAT制御系統##', '##MMU##',
    '##BAT緊急対応##', '##隔離記憶復旧##', '##BAT製品仕様書##', 'BAT製品仕様書']) await search(query);
  await search(term, drawing);
  assert((await read(archiveKey)).every(entry => entry.href !== drawing), 'Search result must not add a visit');
  assert.deepEqual(await read(finalKey), { ...oldState, drawingOpened: true });
  await click('.hub-result a');
  await page(drawing);
  await wait(visible(view));
  assert.deepEqual((await read(archiveKey)).filter(entry => entry.number >= 110).map(({ number, href }) => [number, href]), [[110, drawing]]);

  for (const pixels of [1440, 768, 390, 320]) {
    await width(pixels);
    await wait('innerWidth === ' + pixels);
    await checkWidth(drawing + ' @ ' + pixels);
    await wait('[...document.querySelectorAll(".bat-drawing img")].every(img => img.complete && img.naturalWidth > 0)');
    const images = await evaluate('[...document.querySelectorAll(".bat-drawing a")].map(a => {' +
      'const box = a.getBoundingClientRect(); return [a.getAttribute("href"), a.target, box.left >= 0 && box.right <= innerWidth]; })');
    assert.deepEqual(images, imageNames.map(name => ['images/' + name, '_blank', true]));
    if (pixels === 1440 || pixels === 390) {
      await send('Emulation.setTouchEmulationEnabled', { enabled: pixels === 390 });
      for (const name of imageNames) {
        await send('Page.bringToFront');
        const point = await evaluate(`(() => {
          const link = document.querySelector('a[href="images/${name}"]');
          link.scrollIntoView({ block: 'center' });
          const box = link.getBoundingClientRect();
          return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
        })()`);
        if (pixels === 390) {
          await send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [point] });
          await send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
        } else {
          await send('Input.dispatchMouseEvent', { type: 'mousePressed', button: 'left', clickCount: 1, ...point });
          await send('Input.dispatchMouseEvent', { type: 'mouseReleased', button: 'left', clickCount: 1, ...point });
        }
        let target;
        for (let attempt = 0; attempt < 100 && !target; attempt++) {
          const { targetInfos } = await send('Target.getTargets');
          target = targetInfos.find(info => info.url === origin + 'images/' + name);
          if (!target) await new Promise(resolve => setTimeout(resolve, 30));
        }
        assert(target, 'Image did not open in a new tab: ' + name);
        await send('Target.closeTarget', { targetId: target.targetId });
      }
      await send('Emulation.setTouchEmulationEnabled', { enabled: false });
    }
  }

  await put(reportKey, { status: 'complete', entries: ['BAS', 'SECOND SHIFT', '施設C', 'SUB-117', 'TB-260917-4826'] });
  await put('timeback-mail-aizawa-v1', { route: 2, progress: 15, reportReceived: true });
  await put('timeback-mail-contacts-v1', ['aizawa']);
  await go('takase-mail.html#aizawa');
  assert.equal(await evaluate('typeof window.timebackFinalMail'), 'undefined');
  assert.equal(await evaluate(visible('#final-chapter-news-link')), false);
  await go(news);
  await wait(visible(view));
  await click('a[href="' + ending + '"]');
  await page(ending);
  await wait(visible(view));
  for (const {href, fragment} of priorEndings) {
    await go(href);
    await wait(visible('.ending-fragment'));
    assert.equal(await evaluate('document.querySelector(".ending-fragment").textContent'), fragment);
  }

  await click('#archiveButton');
  await wait(visible('#archiveList a[href="' + drawing + '"]'));
  await click('#archiveResetButton');
  await click('#resetAccept');
  await page('index.html');
  assert.equal(await read(finalKey), null);
  assert.equal(await read(reportKey), null);
  await search(term);
  console.log('PASS final chapter interim: three-ending gate, retired URLs and terms, legacy isolation, EX, 4 widths, image zoom, legacy ending revisit and reset.');
}

runChrome(scenario).catch(error => { console.error(error); process.exitCode = 1; });
