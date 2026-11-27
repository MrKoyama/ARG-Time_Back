const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const runChrome = require('./check-ending-three.cjs');

const archiveKey = 'timeback-page-archive-v1';
const resetKey = 'timeback-progress-reset-v1';
const reportKey = 'timeback-investigation-report-v1';
const mailKey = 'timeback-investigation-mail-v1';
const endings = [
  { number: 86, href: 'timeback-ending-record.html' },
  { number: 90, href: 'timeback-ending-blind-spot.html' },
  { number: 105, href: 'timeback-ending-full-disclosure.html' },
  { number: 118, href: 'timeback-ending-own-time.html' }
];
const progress = {
  [archiveKey]: [...endings, { number: 117, href: 'yaboo-news-timeback-suspension.html' }],
  [reportKey]: { status: 'complete', entries: ['BAS', 'SECOND SHIFT', '施設C', 'SUB-117', 'TB-260917-4826'] },
  [mailKey]: '6',
  'timeback-investigation-mail-started-at-v1': '12345',
  'timeback-investigation-mail-final-reply-at-v1': '1795671120000',
  'timeback-investigation-mail-history-v1': { received: 4 },
  'timeback-mail-takase-draft-v1': { progress: 0, draftLength: 4 },
  'timeback-mail-aizawa-v1': { route: 2, progress: 15, reportReceived: true, draftLength: 4 },
  'timeback-mail-contacts-v1': ['aizawa', 'takase'],
  'timeback-mail-view-v1': 'aizawa',
  'timeback-investigation-tip-v1': 'submitted',
  'timeback-investigation-tip-takase-v1': 'submitted',
  'timeback-web-operations-log-v1': '1',
  'timeback-final-chapter-v1': {
    drawingOpened: true,
    opened: [110, 111, 112, 114, 115], mailProgress: 37, solved: true, diagnostics: true, consented: true,
    recovered: true, reportSent: true, disclosed: true, answers: { TASK_ACCEPT: 'DENY' }, order: ['RECOVERY']
  }
};
const keys = Object.keys(progress);

function checkPublicSources() {
  const dir = path.resolve(__dirname, '../public');
  const usedKeys = new Set();
  let screens = 0;
  for (const file of fs.readdirSync(dir).filter(name => /\.(?:html|js)$/.test(name))) {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    if (file !== 'progress-reset.js') {
      for (const [key] of content.matchAll(/\btimeback-[a-z0-9-]+-v\d+\b/g)) usedKeys.add(key);
    }
    assert.doesNotMatch(content, /TEMP DEV MAIL RESET|開発用：メールをリセット|探索済みページの記録を消去しますか/);
    assert.doesNotMatch(content, /\b(?:localStorage|sessionStorage)\.clear\s*\(/);
    if (!content.includes('id="archiveResetButton"')) continue;
    assert.equal(content.match(/>すべての進行状況をリセット<\/button>/g).length, 1, file);
    assert(content.indexOf('src="progress-reset.js?') < content.indexOf('</head>'), file);
    assert(content.includes('src="progress-reset.js?'), file);
    screens++;
  }
  assert.deepEqual([...usedKeys].sort(), [...keys].sort());
  assert.equal(screens, 137);
}

async function scenario({ evaluate, wait, visible, click, page, go, width, checkWidth, send, origin }) {
  async function seed(values) {
    await evaluate(`Object.entries(${JSON.stringify(values)}).forEach(([key, value]) =>
      localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value)))`);
  }
  const gameValues = () => evaluate(`Object.fromEntries(${JSON.stringify(keys)}.map(key => [key, localStorage.getItem(key)]))`);
  async function checkNewGame() {
    await page('index.html');
    await wait(`JSON.parse(localStorage.getItem('${archiveKey}') || '[]').some(page => page.number === 1)`);
    const values = await gameValues();
    assert.deepEqual(JSON.parse(values[archiveKey]).map(({number, href}) => [number, href]), [[1, 'index.html']]);
    delete values[archiveKey];
    assert(Object.values(values).every(value => value === null));
    assert.equal(await evaluate('localStorage.getItem("timeback-unrelated")'), 'keep');
    assert.equal(await evaluate('sessionStorage.getItem("unrelated")'), 'keep');
  }
  async function openDialog() {
    await click('#archiveButton');
    await click('#archiveResetButton');
    await wait(visible('#resetConfirm'));
    assert.equal(await evaluate('document.activeElement.id'), 'resetCancel');
  }
  async function confirmReset() {
    const originalGeneration = await evaluate(`localStorage.getItem('${resetKey}')`);
    await click('#resetAccept');
    await wait(`localStorage.getItem('${resetKey}') !== ${JSON.stringify(originalGeneration)} && !localStorage.getItem('${resetKey}').startsWith('pending:')`);
    await checkNewGame();
  }

  await go('index.html');
  await seed({ 'timeback-unrelated': 'keep' });
  await evaluate('sessionStorage.setItem("unrelated", "keep")');
  for (const pixels of [1440, 768, 390, 320]) {
    await width(pixels);
    const before = await gameValues();
    await openDialog();
    assert.equal(await evaluate('document.querySelector("#resetTitle").textContent'), '進行状況をリセットしますか？');
    assert.equal(await evaluate('document.querySelector("#resetWarning").textContent'), 'この操作は取り消せません。');
    await checkWidth('reset @ ' + pixels);
    assert(await evaluate(`['resetConfirm','resetCancel','resetAccept'].every(id => {
      const box = document.getElementById(id).getBoundingClientRect();
      return box.x >= 0 && box.right <= innerWidth && box.width > 0;
    })`));
    await click('#resetCancel');
    assert.deepEqual(await gameValues(), before);
    await click('#archiveClose');
  }
  await openDialog();
  await confirmReset();

  await go('chronect-hub-web-operations-log.html');
  await seed({ [reportKey]: progress[reportKey], 'timeback-web-operations-log-v1': '1', [mailKey]: '1' });
  await openDialog();
  const partial = await gameValues();
  const beforeFailure = await evaluate(`localStorage.getItem('${resetKey}')`);
  await evaluate(`(() => {
    const remove = Storage.prototype.removeItem;
    Storage.prototype.removeItem = function (key) {
      if (key === '${mailKey}') throw new Error('test storage failure');
      return remove.call(this, key);
    };
    try { document.getElementById('resetAccept').click(); }
    finally { Storage.prototype.removeItem = remove; }
  })()`);
  await wait(visible('#resetError'));
  assert.deepEqual(await gameValues(), partial);
  assert.equal(await evaluate(`localStorage.getItem('${resetKey}')`), beforeFailure);
  await confirmReset();

  await seed(progress);
  await go('takase-work-notes.html');
  const historyBefore = await send('Page.getNavigationHistory');
  await go(endings[3].href);
  await wait(visible('[data-final-chapter-view]'));
  await openDialog();
  assert.equal(await evaluate('document.querySelector("#archiveList a[href=\'timeback-ending-own-time.html\']").textContent.startsWith("118")'), true);

  // An independent tab is already running the mail page when the ending resets the game.
  const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
  const otherEvaluate = async expression =>
    (await send('Runtime.evaluate', { expression, returnByValue: true }, sessionId)).result.value;
  const waitInOtherTab = async expression => {
    for (let attempt = 0; attempt < 100; attempt++) {
      if (await otherEvaluate(expression)) return;
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    assert.fail('Timed out in second tab: ' + expression);
  };
  await send('Page.navigate', { url: origin + 'takase-mail.html#aizawa' }, sessionId);
  await waitInOtherTab('location.pathname.endsWith("takase-mail.html") && document.readyState === "complete"');
  await send('Page.bringToFront');
  await confirmReset();
  await waitInOtherTab('location.pathname.endsWith("index.html") && document.readyState === "complete"');
  assert.equal(await otherEvaluate('localStorage.getItem("timeback-mail-aizawa-v1")'), null);
  await send('Target.closeTarget', { targetId });

  // The prior location is replaced with the start page even when revisited from browser history.
  const oldEntry = historyBefore.entries[historyBefore.currentIndex];
  await send('Page.navigateToHistoryEntry', { entryId: oldEntry.id });
  for (let attempt = 0; attempt < 100; attempt++) {
    const history = await send('Page.getNavigationHistory');
    if (history.currentIndex === historyBefore.currentIndex &&
        history.entries[history.currentIndex].url === origin + 'index.html') break;
    if (attempt === 99) assert.fail('The old history entry still points to an earlier page');
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  await checkNewGame();
  await go('chronect-hub-search.html?q=' + encodeURIComponent('##Behavior Assistance Terminal##'));
  assert.equal(await evaluate('document.querySelectorAll(".hub-result").length'), 0);
  await go(endings[3].href);
  assert.equal(await evaluate(visible('[data-final-chapter-view]')), false);

  const fileUrl = name => pathToFileURL(path.resolve(__dirname, '../public', name)).href;
  await send('Page.navigate', { url: fileUrl('takase-work-notes.html') });
  await wait(`location.href === ${JSON.stringify(fileUrl('takase-work-notes.html'))} && document.readyState === 'complete'`);
  assert.doesNotMatch(await evaluate('document.body.textContent'), /開発用：メールをリセット/);
  await seed({ [reportKey]: progress[reportKey] });
  await openDialog();
  await click('#resetAccept');
  await wait(`location.href === ${JSON.stringify(fileUrl('index.html'))} && document.readyState === 'complete'`);
  const fileProgress = await gameValues();
  assert.deepEqual(JSON.parse(fileProgress[archiveKey]).map(page => page.number), [1]);
  assert.equal(fileProgress[reportKey], null);
  console.log('PASS PROGRESS RESET: ' + keys.length + ' keys, 137 archive controls, cancellation/failure, fresh/partial/all endings, second tab, history, file URLs and four Chrome widths.');
}

checkPublicSources();
runChrome(scenario).catch(error => { console.error(error); process.exitCode = 1; });
