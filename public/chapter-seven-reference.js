(() => {
  'use strict';

  const noteUrl = 'takase-device-investigation-note.html';
  const externalReferenceUrl = 'nodelink-external-reference-log.html';
  const correspondenceUrl = 'chronect-internal-correspondence.html';
  const monitoringUrl = 'takase-reference-monitoring.html';
  const navigationKey = 'timeback-correspondence-navigation';
  const archiveKey = 'timeback-page-archive-v1';
  const navigationFrom = (source, href) => source + '\n' + href;
  const routes = [
    { from: noteUrl, to: correspondenceUrl, prerequisites: [noteUrl, externalReferenceUrl], linkId: 'correspondenceLink', recordId: 'correspondenceRecord' },
    { from: noteUrl, to: monitoringUrl, prerequisites: [correspondenceUrl], linkId: 'monitoringLink', recordId: 'monitoringRecord' }
  ];

  function visitedPages() {
    try {
      const saved = JSON.parse(localStorage.getItem(archiveKey));
      if (Array.isArray(saved)) return new Set(saved.map(page => page?.href));
    } catch {}
    return new Set();
  }

  const hasPrerequisites = (route, visited) => route.prerequisites.every(href => visited.has(href));
  const currentPage = document.body.dataset.pageHref;
  const incoming = routes.find(route => route.to === currentPage);

  if (incoming) {
    const visited = visitedPages();
    let followedLink = false;
    try {
      followedLink = sessionStorage.getItem(navigationKey) === navigationFrom(incoming.from, location.href);
      sessionStorage.removeItem(navigationKey);
    } catch {}
    followedLink ||= document.referrer === new URL(incoming.from, location.href).href;

    if (!visited.has(currentPage) && !(followedLink && hasPrerequisites(incoming, visited))) {
      const fallback = hasPrerequisites(incoming, visited) ? incoming.from
        : visited.has(noteUrl) ? noteUrl : 'nodelink-internal-search.html';
      location.replace(fallback);
      return;
    }
    delete document.body.dataset.pageArchive;
    document.getElementById(incoming.recordId).hidden = false;
  }

  const outgoing = routes.filter(route => route.from === currentPage)
    .map(route => ({ route, link: document.getElementById(route.linkId) }));
  if (!outgoing.length) return;

  function refreshLinks() {
    const visited = visitedPages();
    for (const { route, link } of outgoing) {
      link.hidden = !hasPrerequisites(route, visited);
    }
  }

  for (const { route, link } of outgoing) {
    link.addEventListener('click', event => {
      if (!hasPrerequisites(route, visitedPages())) {
        event.preventDefault();
        refreshLinks();
        return;
      }
      // Preserve normal link navigation on local HTML pages without a referrer.
      try { sessionStorage.setItem(navigationKey, navigationFrom(currentPage, link.href)); } catch {}
    });
  }
  window.addEventListener('pageshow', refreshLinks);
  window.addEventListener('storage', event => {
    if (event.key === archiveKey || event.key === null) refreshLinks();
  });
  refreshLinks();
})();
