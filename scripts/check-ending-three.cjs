const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const http = require('node:http');
const os = require('node:os');
const path = require('node:path');
const { spawn } = require('node:child_process');
const { once } = require('node:events');
const { setTimeout: sleep } = require('node:timers/promises');

const publicDir = path.resolve(__dirname, '../public');
const chromePath = process.env.TIMEBACK_TEST_CHROME
  || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const evidence = [
  'chronect-hub-business-integration-plan.html',
  'chronect-hub-second-shift-settlement.html',
  'chronect-hub-skill-model-record.html',
  'chronect-hub-second-shift-strategy.html'
];
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp' };

async function until(check, description) {
  const deadline = Date.now() + 12000;
  while (Date.now() < deadline) {
    const result = await check();
    if (result) return result;
    await sleep(50);
  }
  throw new Error('Timed out: ' + description);
}

async function main(runScenario) {
  const server = http.createServer(async (request, response) => {
    const url = new URL(request.url, 'http://localhost');
    const file = path.resolve(publicDir, '.' + decodeURIComponent(url.pathname));
    if (!file.startsWith(publicDir + path.sep)) return response.writeHead(403).end();
    try {
      const body = await fs.readFile(file);
      response.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' });
      response.end(body);
    } catch {
      response.writeHead(404).end();
    }
  });
  const profile = await fs.mkdtemp(path.join(os.tmpdir(), 'timeback-chrome-test-'));
  let chrome;
  let socket;
  let startupError;
  try {
    server.listen(0, '127.0.0.1');
    await once(server, 'listening');
    const origin = 'http://127.0.0.1:' + server.address().port + '/';
    chrome = spawn(chromePath, [
      '--headless=new', '--no-first-run', '--disable-background-networking', '--disable-extensions',
      ...(process.env.TIMEBACK_TEST_CHROME_NO_SANDBOX === '1' ? ['--no-sandbox', '--disable-gpu'] : []),
      '--remote-debugging-port=0', '--user-data-dir=' + profile, 'about:blank'
    ], { stdio: 'ignore', windowsHide: true });
    chrome.on('error', error => { startupError = error; });
    const port = await until(async () => {
      if (startupError) throw startupError;
      if (chrome.exitCode !== null) throw new Error('Chrome exited before debugging started');
      try { return Number((await fs.readFile(path.join(profile, 'DevToolsActivePort'), 'utf8')).split('\n')[0]); }
      catch { return null; }
    }, 'Chrome debugging port');
    const [tab] = await (await fetch('http://127.0.0.1:' + port + '/json/list')).json();
    socket = new WebSocket(tab.webSocketDebuggerUrl);
    await once(socket, 'open');
    let id = 0;
    const complaints = [];
    const pending = new Map();
    socket.addEventListener('message', event => {
      const packet = JSON.parse(event.data);
      const callback = pending.get(packet.id);
      if (callback) {
        pending.delete(packet.id);
        if (packet.error) callback.reject(new Error(packet.error.message));
        else callback.resolve(packet.result);
      } else if (packet.method === 'Runtime.exceptionThrown') {
        complaints.push(packet.params.exceptionDetails.exception?.description || packet.params.exceptionDetails.text);
      } else if (packet.method === 'Network.responseReceived'
        && packet.params.response.url.startsWith(origin) && packet.params.response.status >= 400
        && !packet.params.response.url.endsWith('/favicon.ico')) {
        complaints.push(packet.params.response.url + ' ' + packet.params.response.status);
      }
    });
    function send(method, params = {}, sessionId) {
      return new Promise((resolve, reject) => {
        const current = ++id;
        pending.set(current, { resolve, reject });
        socket.send(JSON.stringify({ id: current, method, params, sessionId }));
      });
    }
    async function evaluate(expression, allowNavigation = false) {
      const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
      if (result.exceptionDetails && !allowNavigation) throw new Error(result.exceptionDetails.exception?.description || expression);
      return result.result?.value;
    }
    const wait = (expression, label = expression) => until(async () => {
      try { return await evaluate(expression); }
      catch (error) {
        if (/context|navigat/i.test(error.message)) return false;
        throw error;
      }
    }, label);
    const visible = selector => 'document.querySelector(' + JSON.stringify(selector) + ')?.getClientRects().length > 0';
    function click(selector) {
      return evaluate('document.querySelector(' + JSON.stringify(selector) + ').click()', true);
    }
    async function input(selector, value) {
      await evaluate('(() => { const el=document.querySelector(' + JSON.stringify(selector) + ');el.value='
        + JSON.stringify(value) + ';el.dispatchEvent(new Event("input",{bubbles:true}));el.dispatchEvent(new Event("change",{bubbles:true})); })()');
    }
    async function page(name) {
      await wait('location.pathname === ' + JSON.stringify('/' + name) + ' && document.readyState === "complete"');
    }
    async function go(name, expected = name.split(/[?#]/)[0]) {
      await send('Page.navigate', { url: origin + name });
      await page(expected);
    }
    async function width(pixels) {
      await send('Emulation.setDeviceMetricsOverride', { width: pixels, height: 950, deviceScaleFactor: 1, mobile: false });
    }
    async function checkWidth(label) {
      assert.equal(await evaluate('document.documentElement.scrollWidth <= innerWidth'), true, label + ' overflows');
    }
    async function scripted(desktop = false) {
      if (desktop) {
        await wait(visible('#replyInput'));
        await evaluate(`(() => {
          const input = document.querySelector('#replyInput');
          for (let count=0; document.querySelector('#sendButton').disabled && count<400; count++) {
            input.dispatchEvent(new KeyboardEvent('keydown',{key:'a',code:'KeyA',bubbles:true,cancelable:true}));
          }
        })()`);
        assert.equal(await evaluate('document.querySelector("#sendButton").disabled'), false);
        await evaluate('document.querySelector("#replyInput").dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",bubbles:true,cancelable:true}))');
      } else {
        await wait(visible('#mobileReply'));
        assert.equal(await evaluate('document.querySelector("#mobileReply").disabled'), false);
        await click('#mobileReply');
      }
      await wait('!document.querySelector(".typing-row")?.classList.contains("is-visible")', 'reply delivered');
    }
    async function search(term, target, from) {
      await input(from, term);
      await click(from + ' ~ button');
      await wait('location.search.length > 0 && document.readyState === "complete" && ' + visible('#nodelink-results'));
      const links = await evaluate('Array.from(document.querySelectorAll("#nodelink-result-list a"),a=>a.getAttribute("href"))');
      assert.deepEqual(links, target ? [target] : []);
      if (target) {
        await click('#nodelink-result-list a');
        await page(target);
      }
    }
    async function submit(kind) {
      if (await evaluate(visible('#tip-report-kind'))) await input('#tip-report-kind', kind);
      await click('#report-attach');
      await wait(visible('#tip-file'));
      await click('#tip-submit');
      await wait(visible('#tip-confirmation'));
      assert.match(await evaluate('document.querySelector("#tip-confirm-file").textContent'),
        kind === 'takase' ? /TIME BACKおよびSECOND SHIFTに関する調査報告書/ : /あなたが完成/);
      await click('#tip-confirm-submit');
      await wait(visible(kind === 'takase' ? '#tip-full-article' : '#tip-article'));
    }
    async function returnToBranch() {
      await click('#branch-return');
      await click('#branch-return-dialog button[value="rewind"]');
      await page('takase-work-notes.html');
    }

    await send('Runtime.enable');
    await send('Network.enable');
    await send('Network.setBlockedURLs', { urls: ['*googletagmanager.com*','*google-analytics.com*'] });
    await send('Page.enable');
    await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
    await width(1440);
    if (runScenario) {
      await runScenario({ evaluate, wait, visible, click, input, page, go, width, checkWidth, scripted, returnToBranch, send, origin });
      assert.deepEqual(complaints, []);
      return;
    }
    await go('yaboo-news-trial-disclosure.html', 'yaboo-news-tip.html');
    await go('timeback-ending-full-disclosure.html', 'yaboo-news-tip.html');
    await go('takase-completed-report.html', 'takase-work-notes.html');
    for (const name of evidence) await go(name, 'nodelink-internal-search.html');
    assert.equal(await evaluate(`JSON.parse(localStorage.getItem('timeback-page-archive-v1')).some(p=>p.number>=106)`), false);
    await evaluate(`localStorage.setItem('timeback-investigation-report-v1', JSON.stringify({
      status:'complete', entries:['BAS','SECOND SHIFT','施設C','SUB-117','TB-260917-4826']
    }));
    localStorage.setItem('timeback-page-archive-v1', JSON.stringify([
      {number:94,href:'takase-investigation-progress.html'},{number:95,href:'nodelink-usage-review.html'},
      {number:96,href:'takase-device-investigation-note.html'},{number:97,href:'nodelink-external-reference-log.html'},
      {number:99,href:'takase-reference-monitoring.html'}]));`);
    await go('nodelink-internal-search.html');
    await search(' 人材情報 ', 'nodelink-personnel.html', '#nodelink-query');
    assert.equal(await evaluate('Array.from(document.querySelectorAll("dt")).filter(el => el.textContent === "担当区域").length'), 8);
    assert.equal(await evaluate('JSON.parse(localStorage.getItem("timeback-page-archive-v1")).some(p=>p.number>=94)'), false);
    await go('takase-mail.html#new-message');
    await input('#mailAddress', 'aizawa.naoto@nodelink.mail');
    await click('#addressForm button[type=submit]');
    await click('#mail-thread-aizawa');
    await scripted(true);
    await width(390);
    for (let i=0; i<3; i++) await scripted();
    assert.match(await evaluate('document.querySelector("#messageLog").textContent'), /……申し訳ありませんが、どなたのことでしょうか。/);
    assert.equal(await evaluate(visible('#mobileReply')), false);
    assert.equal(await evaluate('document.querySelector("#messageLog a")'), null);
    await checkWidth('No.84 initial');

    await go('nodelink-internal-search.html');
    await search('情報管理基盤', null, '#nodelink-query');
    await search('利用状況照合', null, '#nodelink-query');
    const chain = [
      ['社内情報管理基盤','nodelink-info-duties.html'], ['資料検索基盤','takase-infiltration-duties.html'],
      ['法人利用管理記録','nodelink-corporate-usage.html'], ['利用実績照合','takase-investigation-stall.html'],
      ['法人機器保守管理','nodelink-device-maintenance.html'], ['機器動作記録','takase-evidence-discovery.html']
    ];
    for (const [keyword, target] of chain) {
      await go('nodelink-internal-search.html');
      await search(keyword, target, '#nodelink-query');
      if (target === 'takase-investigation-stall.html') {
        await click('a[href="chronect-internal-correspondence.html"]');
        await page('chronect-internal-correspondence.html');
        assert.equal(await evaluate(visible('#chapter-seven-followup')), false);
        await evaluate("localStorage.setItem('timeback-investigation-mail-v1','3')");
        await go('chronect-internal-correspondence.html');
        assert.equal(await evaluate(visible('#chapter-seven-followup')), false);
        await evaluate("localStorage.removeItem('timeback-investigation-mail-v1')");
      }
    }
    await click('a[href="takase-final-investigation-note.html"]');
    await page('takase-final-investigation-note.html');
    await click('a[href="takase-mail.html#aizawa"]');
    await page('takase-mail.html');
    assert.equal(await evaluate(visible('#mobileReply')), false);

    // Read the evidence out of numerical order, leaving one document unopened.
    const evidenceOrder = [evidence[3], evidence[1], 'chronect-trial-continuation-approval.html', evidence[0], evidence[2]];
    for (const [index, name] of evidenceOrder.entries()) {
      await go('takase-evidence-discovery.html');
      await click('a[href="' + name + '"]');
      await page(name);
      await wait(visible('[data-chapter-seven-view]'));
      if (index === evidenceOrder.length - 2) {
        await go('takase-mail.html#aizawa');
        assert.equal(await evaluate(visible('#mobileReply')), false);
      }
    }
    assert.deepEqual(await evaluate(`JSON.parse(localStorage.getItem('timeback-page-archive-v1')).filter(p=>p.number>=106).map(p=>p.number)`), [106,107,108,109]);
    await go('takase-mail.html#aizawa');
    await scripted();
    await width(320);
    await checkWidth('No.84 folder');
    await input('#folderInput','不明なフォルダ');
    await click('#folderForm button');
    assert.match(await evaluate('document.querySelector("#folderStatus").textContent'), /見つかりませんでした/);
    await go('takase-mail.html#aizawa');
    await wait(visible('#folderInput'));
    await input('#folderInput','調査記録_最終');
    await click('#folderForm button');
    await wait(visible('#mobileReply'));
    await scripted();
    await wait(visible('a[href="takase-completed-report.html"]'));
    await click('a[href="takase-completed-report.html"]');
    await page('takase-completed-report.html');
    assert.match(await evaluate('document.querySelector("main article").textContent'), /作成者：高瀬悠真/);
    assert.match(await evaluate('document.querySelector("main h1").textContent'), /TIME BACKおよびSECOND SHIFTに関する調査報告書/);
    await checkWidth('No.103');
    await go('yaboo-news-tip.html');
    await checkWidth('No.80 report choice');
    await submit('player');
    await click('#tip-article');
    await page('yaboo-news-investigation.html');
    await click('a[href="timeback-ending-blind-spot.html"]');
    await page('timeback-ending-blind-spot.html');
    await go('yaboo-news-trial-disclosure.html', 'yaboo-news-tip.html');
    await submit('takase');
    await click('#tip-full-article');
    await page('yaboo-news-trial-disclosure.html');
    assert.match(await evaluate('document.querySelector("main h1").textContent'), /売られていたのは時間ではなかった/);
    await click('a[href="timeback-ending-full-disclosure.html"]');
    await page('timeback-ending-full-disclosure.html');
    await returnToBranch();
    await go('takase-mail.html#new-message');
    await input('#mailAddress','y.takase@chronect.mail');
    await click('#addressForm button[type=submit]');
    await click('#mail-thread-takase');
    for (let i=0;i<3;i++) await scripted();
    const receivedKey = 'timeback-investigation-mail-final-reply-at-v1';
    const receivedAt = `localStorage.getItem(${JSON.stringify(receivedKey)})`;
    assert.equal(await evaluate(receivedAt), null);
    await click('#reportAttach');
    await click('#reportPicker button[value=attach]');
    await wait('!document.querySelector("#mobileReply").disabled');
    const beforeReceive = await evaluate('Date.now()');
    await scripted();
    const stamp = Number(await evaluate(receivedAt));
    assert.ok(stamp >= beforeReceive && stamp <= await evaluate('Date.now()'));
    await go('chronect-internal-correspondence.html');
    assert.equal(await evaluate(visible('#chapter-seven-followup')), true);
    const dateFields = '[data-old-mail-reference-date]';
    const dateSelector = `${dateFields} time`;
    const dates = await evaluate(`Array.from(document.querySelectorAll('${dateSelector}'), time => [time.dateTime, time.textContent])`);
    assert.equal(dates.length, 2);
    assert.equal(dates[0][0], new Date(stamp).toISOString());
    assert.match(dates[0][1], /^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}$/);
    assert.deepEqual(dates[1], dates[0]);
    await send('Page.reload');
    await wait(`document.readyState === 'complete' && ${visible(dateSelector)}`);
    assert.equal(await evaluate(receivedAt), String(stamp));
    // No.84 accepts the numeric checkpoint even when the stored string isn't canonical.
    await evaluate(`localStorage.setItem('timeback-investigation-mail-v1', '4.0');
      localStorage.removeItem(${JSON.stringify(receivedKey)});`);
    const beforeLegacyReload = await evaluate('performance.timeOrigin');
    await send('Page.reload');
    await wait(`performance.timeOrigin !== ${beforeLegacyReload} && document.readyState === 'complete'
      && ${visible('#chapter-seven-followup')}`);
    assert.equal(await evaluate(visible(dateSelector)), false);
    assert.deepEqual(await evaluate(`Array.from(document.querySelectorAll('${dateFields}'), field => field.textContent)`), ['不明', '不明']);
    assert.equal(await evaluate(receivedAt), null);
    await evaluate(`localStorage.setItem(${JSON.stringify(receivedKey)}, ${JSON.stringify(String(stamp))});`);
    await go('takase-mail.html');
    await click('#reportDelete');
    await click('#reportDeleteConfirm');
    await wait(visible('#reportDeleteClose'));
    await click('#reportDeleteClose');
    await page('yaboo-news-aftermath.html');
    await click('a[href="timeback-ending-record.html"]');
    await page('timeback-ending-record.html');
    assert.equal(await evaluate('localStorage.getItem("timeback-investigation-report-v1")'), null);
    assert.equal(await evaluate('JSON.parse(localStorage.getItem("timeback-mail-aizawa-v1")).reportReceived'), true);
    await returnToBranch();
    assert.equal(await evaluate(receivedAt), null);
    await click('#archiveButton');
    await wait(visible('#archiveList a[href="timeback-ending-blind-spot.html"]'));
    await click('#archiveList a[href="timeback-ending-blind-spot.html"]');
    await page('timeback-ending-blind-spot.html');
    await go('timeback-ending-full-disclosure.html');
    assert.deepEqual(await evaluate(`JSON.parse(localStorage.getItem('timeback-page-archive-v1')).filter(p=>[86,90,105].includes(p.number)).map(p=>p.number)`),[86,90,105]);

    const major = [
      'nodelink-personnel.html','takase-mail.html#aizawa','nodelink-info-duties.html',
      'takase-infiltration-duties.html','nodelink-corporate-usage.html','takase-investigation-stall.html',
      'chronect-internal-correspondence.html','nodelink-device-maintenance.html','takase-evidence-discovery.html','chronect-trial-continuation-approval.html',
      'takase-final-investigation-note.html','takase-completed-report.html','yaboo-news-tip.html',
      'yaboo-news-trial-disclosure.html','timeback-ending-full-disclosure.html', ...evidence
    ];
    for (const pixels of [1440,768,390,320]) {
      await width(pixels);
      for (const name of major) { await go(name); await checkWidth(name + ' @ ' + pixels); }
    }

    // The pre-expansion save has an acquired report and a reached ending, but no new visits.
    await evaluate(`localStorage.setItem('timeback-page-archive-v1', JSON.stringify(
      JSON.parse(localStorage.getItem('timeback-page-archive-v1')).filter(p=>p.number<106)
    ));
    localStorage.setItem('timeback-mail-aizawa-v1',JSON.stringify({route:2,progress:15,reportReceived:true}));`);
    await go('takase-completed-report.html');
    await wait(visible('[data-chapter-seven-view]'));
    await go('timeback-ending-full-disclosure.html');
    await wait(visible('#tip-full-ending'));
    await go('yaboo-news-tip.html');
    await submit('takase');
    assert.equal(await evaluate(`JSON.parse(localStorage.getItem('timeback-page-archive-v1')).some(p=>p.number>=106)`), false);
    await go('nodelink-internal-search.html?q=' + encodeURIComponent('機器動作記録'));
    assert.equal(await evaluate('document.getElementById("archiveButton").textContent'), 'EX');
    await click('#nodelink-result-list a');
    await page('takase-evidence-discovery.html');
    await click('a[href="' + evidence[0] + '"]');
    await page(evidence[0]);
    await wait(visible('[data-chapter-seven-view]'));

    await evaluate(`localStorage.setItem('timeback-mail-aizawa-v1',JSON.stringify({progress:16,draftLength:30}));
      localStorage.setItem('timeback-investigation-tip-v1','submitted');`);
    await go('takase-mail.html#aizawa');
    assert.equal(await evaluate('window.timebackChapterSeven.aizawaState().progress'), 8);
    assert.equal(await evaluate('window.timebackChapterSeven.reportReceived()'), false);
    assert.doesNotMatch(await evaluate('document.querySelector("#messageLog").textContent'), /調査経過メモ|端末・調査記録の控え/);
    assert.deepEqual(complaints, []);
    console.log('PASS ENDING 3: search, mobile/desktop mail, folder retry, report, both submissions, endings 1–3, migration, 4 Chrome widths.');
  } finally {
    socket?.close();
    if (chrome && chrome.exitCode === null && !startupError) {
      chrome.kill();
      await Promise.race([once(chrome, 'exit'), sleep(4000)]);
    }
    server.close();
    await fs.rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 }).catch(() => {});
  }
}

module.exports = main;
if (require.main === module) main().catch(error => { console.error(error); process.exitCode = 1; });
