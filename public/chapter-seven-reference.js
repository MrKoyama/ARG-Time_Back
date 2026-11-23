(() => {
  'use strict';

  const noteUrl = 'takase-device-investigation-note.html';
  const navigationKey = 'timeback-correspondence-navigation';
  const archiveKey = 'timeback-page-archive-v1';
  const navigationFromNote = href => noteUrl + '\n' + href;

  function visitedPages() {
    try {
      const saved = JSON.parse(localStorage.getItem(archiveKey));
      if (Array.isArray(saved)) return new Set(saved.map(page => page?.href));
    } catch {}
    return new Set();
  }

  const correspondenceUrl = 'chronect-internal-correspondence.html';
  const links = [
    { element: document.getElementById('correspondenceLink'), prerequisite: 'nodelink-external-reference-log.html' },
    { element: document.getElementById('monitoringLink'), prerequisite: correspondenceUrl }
  ].filter(({ element }) => element);

  if (links.length) {
    function refreshLinks() {
      const visited = visitedPages();
      for (const { element, prerequisite } of links) element.hidden = !visited.has(prerequisite);
    }
    for (const { element, prerequisite } of links) {
      element.addEventListener('click', event => {
        if (!visitedPages().has(prerequisite)) {
          event.preventDefault();
          refreshLinks();
          return;
        }
        // Preserve normal link navigation on local HTML pages without a referrer.
        try { sessionStorage.setItem(navigationKey, navigationFromNote(element.href)); } catch {}
      });
    }
    window.addEventListener('pageshow', refreshLinks);
    window.addEventListener('storage', event => {
      if (event.key === archiveKey || event.key === null) refreshLinks();
    });
    refreshLinks();
    return;
  }

  const correspondence = document.getElementById('correspondenceRecord');
  const record = correspondence || document.getElementById('monitoringRecord');
  if (!record) return;
  const visited = visitedPages();
  const prerequisite = correspondence ? 'nodelink-external-reference-log.html' : correspondenceUrl;
  let followedLink = false;
  try {
    followedLink = sessionStorage.getItem(navigationKey) === navigationFromNote(location.href);
    sessionStorage.removeItem(navigationKey);
  } catch {}
  followedLink ||= document.referrer === new URL(noteUrl, location.href).href;

  if (visited.has(document.body.dataset.pageHref)
    || (followedLink && visited.has(noteUrl) && visited.has(prerequisite))) {
    delete document.body.dataset.pageArchive;
    record.hidden = false;
  } else {
    location.replace(visited.has(noteUrl) ? noteUrl : 'nodelink-internal-search.html');
  }
})();
