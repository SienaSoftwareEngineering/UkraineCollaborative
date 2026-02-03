// /js/language-toggle.js
(function () {
  const toggle = document.getElementById('langToggle');
  if (!toggle) return;

  const path = window.location.pathname;
  const isUkr = /\/uk\//i.test(path) || /-ukr\.html$/i.test(path);
  toggle.checked = isUkr;

  // Helpers to add/remove "-ukr" before ".html"
  function addUkrSuffix(p) {
    return p.replace(/\/([^/]+)\.html$/i, (m, name) =>
      `/${name.endsWith('-ukr') ? name : name + '-ukr'}.html`
    );
  }
  function removeUkrSuffix(p) {
    return p.replace(/-ukr(?=\.html$)/i, '');
  }

  // Build Ukrainian counterpart of a path: ensure /uk/ segment + -ukr.html
  function toUkrPath(p) {
    let out = p;
    if (/\/techniques\//i.test(out)) {
      out = out.replace(/\/techniques\//i, '/uk/techniques/');
    } else if (!/\/uk\//i.test(out)) {
      out = out.replace(/\/([^/]+\.html)$/i, '/uk/$1');
    }
    out = addUkrSuffix(out);
    return out;
  }

  // Build English counterpart of a path: strip /uk/ + remove -ukr
  function toEngPath(p) {
    let out = removeUkrSuffix(p);
    out = out.replace(/\/uk\//i, '/');
    return out;
  }

  // Toggle navigation: go to counterpart of the *current* page
  toggle.addEventListener('change', () => {
    const qh = window.location.search + window.location.hash;
    const target = toggle.checked ? toUkrPath(path) : toEngPath(path);
    window.location.assign(target + qh);
  });
})();
