(function () {
  let index = null;
  let indexPromise = null;
  let modal, input, resultsList;
  let activeIdx = 0;
  let lastResults = [];

  function loadIndex() {
    if (index) return Promise.resolve(index);
    if (indexPromise) return indexPromise;
    indexPromise = fetch('search-index.json', { credentials: 'same-origin' })
      .then(function (r) { return r.json(); })
      .then(function (data) { index = data; return index; })
      .catch(function () { indexPromise = null; return []; });
    return indexPromise;
  }

  function escapeHTML(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function highlight(text, q) {
    if (!q) return text;
    const re = new RegExp('(' + escapeRegex(q) + ')', 'gi');
    return text.replace(re, '<mark>$1</mark>');
  }

  function search(query) {
    if (!index || !query) return [];
    const q = query.toLowerCase().trim();
    if (!q) return [];

    const results = [];
    for (let i = 0; i < index.length; i++) {
      const page = index[i];
      const titleLower = page.title.toLowerCase();
      const bodyLower = page.body.toLowerCase();
      const titleMatch = titleLower.indexOf(q);
      const bodyMatch = bodyLower.indexOf(q);
      if (titleMatch === -1 && bodyMatch === -1) continue;

      let snippet = '';
      if (bodyMatch !== -1) {
        const start = Math.max(0, bodyMatch - 50);
        const end = Math.min(page.body.length, bodyMatch + q.length + 90);
        snippet = (start > 0 ? '…' : '') + page.body.substring(start, end) + (end < page.body.length ? '…' : '');
      } else {
        snippet = page.body.substring(0, 140) + (page.body.length > 140 ? '…' : '');
      }

      // Score: title match wins; earlier position wins.
      const score = titleMatch !== -1 ? 1000 - titleMatch : 500 - Math.min(500, bodyMatch);
      results.push({ title: page.title, url: page.url, snippet: snippet, score: score });
    }
    results.sort(function (a, b) { return b.score - a.score; });
    return results.slice(0, 8);
  }

  function renderResults(results, query) {
    lastResults = results;
    activeIdx = 0;
    if (!query) {
      resultsList.innerHTML = '<div class="search-empty">Type to search the site.</div>';
      return;
    }
    if (results.length === 0) {
      resultsList.innerHTML = '<div class="search-empty">No results for "' + escapeHTML(query) + '".</div>';
      return;
    }
    resultsList.innerHTML = results.map(function (r, i) {
      return '<a href="' + escapeHTML(r.url) + '" class="search-result' + (i === 0 ? ' is-active' : '') + '" role="option">' +
             '<div class="search-result-title">' + highlight(escapeHTML(r.title), query) + '</div>' +
             '<div class="search-result-snippet">' + highlight(escapeHTML(r.snippet), query) + '</div>' +
             '</a>';
    }).join('');
  }

  function setActive(newIdx) {
    const items = resultsList.querySelectorAll('.search-result');
    if (items.length === 0) return;
    activeIdx = (newIdx + items.length) % items.length;
    items.forEach(function (el, i) {
      el.classList.toggle('is-active', i === activeIdx);
      if (i === activeIdx) el.scrollIntoView({ block: 'nearest' });
    });
  }

  function open() {
    modal.hidden = false;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    loadIndex().then(function () {
      input.focus();
      input.select();
    });
  }

  function close() {
    modal.classList.remove('is-open');
    modal.hidden = true;
    document.body.style.overflow = '';
    input.value = '';
    renderResults([], '');
  }

  function init() {
    modal = document.getElementById('site-search-modal');
    input = document.getElementById('site-search-input');
    resultsList = document.getElementById('site-search-results');
    if (!modal || !input || !resultsList) return;

    document.querySelectorAll('[data-search-open]').forEach(function (btn) {
      btn.addEventListener('click', open);
    });
    modal.querySelectorAll('[data-search-close]').forEach(function (btn) {
      btn.addEventListener('click', close);
    });
    modal.addEventListener('click', function (e) {
      if (e.target === modal) close();
    });

    input.addEventListener('input', function () {
      const q = input.value;
      renderResults(search(q), q);
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(activeIdx + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(activeIdx - 1); }
      else if (e.key === 'Enter') {
        const items = resultsList.querySelectorAll('.search-result');
        if (items[activeIdx]) {
          e.preventDefault();
          window.location.href = items[activeIdx].href;
        }
      }
    });

    document.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        open();
      } else if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        open();
      } else if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        close();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
