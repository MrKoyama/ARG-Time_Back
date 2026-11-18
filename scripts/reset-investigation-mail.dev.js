// Run explicitly in the browser console on the local No.82 page.
(() => {
  const loopback = ['localhost', '127.0.0.1', '[::1]'];
  if (!['http:', 'https:'].includes(location.protocol)
    || !loopback.includes(location.hostname)
    || !location.pathname.endsWith('/takase-work-notes.html')
    || document.body.dataset.pageNumber !== '82') {
    throw new Error('ローカル開発環境のNo.82「調査作業控え」を開いてから実行してください。');
  }

  const entries = ['BAS', 'SECOND SHIFT', '施設C', 'SUB-117', 'TB-260917-4826'];
  localStorage.setItem('timeback-investigation-report-v1', JSON.stringify({
    status: 'complete',
    entries,
    confirmed: entries.map(() => true)
  }));

  // The game treats a missing mail phase as 0 (before the first message).
  localStorage.removeItem('timeback-investigation-mail-v1');
  console.info('報告書を完成済み、疑似メールを初回送信前に戻しました。No.82を再読み込みしてください。');
})();
