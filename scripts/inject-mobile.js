/**
 * inject-mobile.js
 * ==================
 * One-time script — injects kedi-optimise.css and mobile-wa.js
 * into every core HTML page that is missing them.
 * Run: node scripts/inject-mobile.js
 */

const fs   = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// Pages to update
const PAGES = [
  'home-3.html',
  'kedi.html',
  'Farforlife.html',
  'shop.html',
  'cart.html',
  'checkout.html',
  'about.html',
  'contact.html',
  'account.html',
  'shop-left-sidebar.html',
  'news-single.html',
  'roi-calculator.html',
  'ad-showcase.html',
  'admin-community.html',
];

const CSS_TAG   = '<link rel="stylesheet" href="assets/css/kedi-optimise.css">';
const WA_TAG    = '<script src="assets/js/mobile-wa.js" defer></script>';

// Anchor: insert CSS just before </head>, WA script just before </body>
let cssAdded = 0, waAdded = 0, skipped = 0;

for (const page of PAGES) {
  const filePath = path.join(ROOT, page);
  if (!fs.existsSync(filePath)) { console.warn(`  ⚠  Not found: ${page}`); skipped++; continue; }

  let html = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Inject CSS if missing
  if (!html.includes('kedi-optimise.css')) {
    html = html.replace('</head>', `  ${CSS_TAG}\n</head>`);
    cssAdded++;
    changed = true;
    console.log(`  ✅ CSS  → ${page}`);
  }

  // Inject WA script if missing
  if (!html.includes('mobile-wa.js')) {
    html = html.replace('</body>', `<script src="assets/js/mobile-wa.js" defer></script>\n</body>`);
    waAdded++;
    changed = true;
    console.log(`  ✅ WA   → ${page}`);
  }

  if (changed) fs.writeFileSync(filePath, html, 'utf8');
  else console.log(`  ➖ Already current: ${page}`);
}

console.log(`\n🏁  Done.`);
console.log(`   CSS injected : ${cssAdded} page(s)`);
console.log(`   WA injected  : ${waAdded} page(s)`);
console.log(`   Skipped      : ${skipped} page(s)\n`);
