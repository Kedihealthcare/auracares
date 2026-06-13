/**
 * inject-notify.js
 * Injects kedi-notify.js into all core HTML pages.
 * Run: node scripts/inject-notify.js
 */
const fs   = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const PAGES = [
  'home-3.html','kedi.html','Farforlife.html','shop.html','cart.html',
  'checkout.html','checkout-v2.html','about.html','contact.html',
  'account.html','blog.html','quiz.html','roi-calculator.html',
  'ad-showcase.html','admin-community.html','news-single.html',
  'auth.html','shop-left-sidebar.html'
];

const NOTIFY_TAG = '<script src="assets/js/kedi-notify.js" defer><\/script>';
let added = 0, skipped = 0;

for (const page of PAGES) {
  const fp = path.join(ROOT, page);
  if (!fs.existsSync(fp)) { console.warn(`  ⚠  Not found: ${page}`); skipped++; continue; }
  let html = fs.readFileSync(fp, 'utf8');
  if (html.includes('kedi-notify.js')) { console.log(`  ➖ Already has notify: ${page}`); continue; }
  html = html.replace('</body>', `${NOTIFY_TAG}\n</body>`);
  fs.writeFileSync(fp, html, 'utf8');
  console.log(`  ✅ Injected → ${page}`);
  added++;
}
console.log(`\n🏁  Done. Injected: ${added} | Skipped: ${skipped}\n`);
