(() => {
  const logo = document.getElementById('nodelink-logo');
  if (!logo) return;

  const holdDuration = 3000;
  const movementTolerance = 12;
  let timer;
  let pointer = null;
  let opened = false;

  function cancelHold() {
    window.clearTimeout(timer);
    timer = undefined;
    pointer = null;
  }

  function startHold() {
    opened = false;
    timer = window.setTimeout(() => {
      cancelHold();
      opened = true;
      window.location.assign('nodelink-web-maintenance.html');
    }, holdDuration);
  }

  function hasModifier(event) {
    return event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
  }

  logo.addEventListener('pointerdown', (event) => {
    if (timer !== undefined || !event.isPrimary || event.button !== 0 || hasModifier(event)) return;
    pointer = { id: event.pointerId, type: event.pointerType, x: event.clientX, y: event.clientY };
    startHold();
  });

  window.addEventListener('pointermove', (event) => {
    if (pointer?.id === event.pointerId &&
        Math.hypot(event.clientX - pointer.x, event.clientY - pointer.y) > movementTolerance) {
      cancelHold();
    }
  });

  function endPointer(event) {
    if (pointer?.id === event.pointerId) cancelHold();
  }

  for (const type of ['pointerup', 'pointercancel']) {
    window.addEventListener(type, endPointer);
  }
  logo.addEventListener('pointerleave', endPointer);
  logo.addEventListener('dragstart', cancelHold);
  logo.addEventListener('contextmenu', (event) => {
    if (event.pointerType === 'touch' || pointer?.type === 'touch') event.preventDefault();
  });

  logo.addEventListener('keydown', (event) => {
    if (event.key !== ' ' || hasModifier(event)) return;
    event.preventDefault();
    if (!event.repeat && timer === undefined) startHold();
  });
  logo.addEventListener('keyup', (event) => {
    if (event.key === ' ' && !pointer) cancelHold();
  });

  logo.addEventListener('click', (event) => {
    if (opened) event.preventDefault();
  });
  logo.addEventListener('blur', () => {
    if (!pointer) cancelHold();
  });
  window.addEventListener('blur', cancelHold);
  window.addEventListener('scroll', cancelHold, { capture: true, passive: true });
  window.addEventListener('pagehide', cancelHold);
  window.addEventListener('pageshow', () => { opened = false; });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelHold();
  });
})();
