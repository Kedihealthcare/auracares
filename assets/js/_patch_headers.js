/**
 * _patch_headers.js
 * Extracts the canonical header from index.html and injects it
 * into home-2.html and home-3.html, replacing their existing headers.
 * Also fixes:
 *   - Corrupted ₦ / currency symbols
 *   - Static date → live JS date
 *   - lang="zxx" → lang="en"
 *   - Missing kedi-optimise.css and currency-manager.js
 *   - Broken cart-count elements
 */

const fs = require('fs');

// ── 1. Extract canonical header from index.html ──────────────────
const indexHtml = fs.readFileSync('index.html', 'utf8');
const START = '<!-- header start -->';
const END   = '<!-- header end -->';
const s = indexHtml.indexOf(START);
const e = indexHtml.indexOf(END) + END.length;
if (s === -1 || e < END.length) { console.error('Header markers not found in index.html'); process.exit(1); }
const canonicalHeader = indexHtml.slice(s, e);

// ── 2. Helper: inject header into a page ─────────────────────────
function patchFile(filename) {
  let html = fs.readFileSync(filename, 'utf8');

  // Fix lang attribute
  html = html.replace(/lang="zxx"/g, 'lang="en"');

  // Fix corrupted currency symbols in options (ÿ,ÿ)
  html = html
    .replace(/NGN \(.*?\)/g, 'NGN (&#8358;)')
    .replace(/PI \(.*?\)/g,  'PI (&#960;)')
    .replace(/USD \(\$\)/g,  'USD ($)');

  // Fix corrupted naira signs in price tags
  html = html.replace(/\u00e2\u201a\u00a6/g, '&#8358;');

  // Fix static date → live date via JS (add script if not present)
  html = html.replace(
    /<span class="current-date">[^<]*<\/span>/g,
    '<span class="current-date" id="live-date"></span>'
  );

  // Add kedi-optimise.css if missing
  if (!html.includes('kedi-optimise.css')) {
    html = html.replace(
      '<link rel="stylesheet" href="assets/css/main.css">',
      '<link rel="stylesheet" href="assets/css/main.css">\n    <link rel="stylesheet" href="assets/css/kedi-optimise.css">'
    );
  }

  // Replace existing header block
  const hStart = html.indexOf('<!-- header start -->');
  const hEnd   = html.indexOf('<!-- header end -->');
  if (hStart !== -1 && hEnd !== -1) {
    html = html.slice(0, hStart) + canonicalHeader + html.slice(hEnd + '<!-- header end -->'.length);
    console.log(`[${filename}] Header replaced from index.html.`);
  } else {
    // No markers — try replacing between <header and </header>
    html = html.replace(/<header[\s\S]*?<\/header>/, canonicalHeader);
    console.log(`[${filename}] Header injected (fallback).`);
  }

  // Add currency-manager.js before </body> if missing
  if (!html.includes('currency-manager.js')) {
    html = html.replace('</body>', '    <script src="assets/js/currency-manager.js"></script>\n</body>');
  }

  // Add products.js before </body> if missing
  if (!html.includes('products.js')) {
    html = html.replace('</body>', '    <script src="assets/js/products.js"></script>\n</body>');
  }

  // Inject live date + cart count updater before </body>
  const liveScript = `
    <script>
    // Live date
    (function() {
      var el = document.getElementById('live-date');
      if (el) el.textContent = new Date().toLocaleDateString('en-NG', {weekday:'long', year:'numeric', month:'long', day:'numeric'});
      // Cart count sync
      function syncCart() {
        var cart = JSON.parse(localStorage.getItem('kedi_cart') || '[]');
        var count = cart.reduce(function(a,i){ return a + (i.quantity||1); }, 0);
        document.querySelectorAll('.cart-count, #cart-count-badge').forEach(function(el){ el.textContent = count; });
      }
      syncCart();
      window.addEventListener('storage', syncCart);
    })();
    </script>`;

  if (!html.includes('live-date-script')) {
    html = html.replace('</body>', liveScript + '\n</body>');
  }

  fs.writeFileSync(filename, html, 'utf8');
  console.log(`[${filename}] Saved. Lines: ${html.split('\n').length}`);
}

// ── 3. Patch both files ───────────────────────────────────────────
['home-2.html', 'home-3.html'].forEach(patchFile);
console.log('All done.');
