/**
 * KEDI PRODUCT PRICE UPDATER
 * ===========================
 * Edit PRICE_MAP below to set the current price (new) and old/crossed price for each product.
 * Then run:  node scripts/update_prices.js
 *
 * Format:
 *   'Partial product name (case-insensitive)': { new: 'Xπ', old: 'Yπ' }
 *
 * The script matches the product name in the <h3> or <h2> tag immediately above
 * the <h4 class="product__price"> and replaces both span.new and span.old values.
 */

const fs   = require('fs');
const path = require('path');

// ─────────────────────────────────────────────
//  EDIT THIS PRICE MAP — one entry per product
// ─────────────────────────────────────────────
const PRICE_MAP = [
    // Core capsules
    { match: /reishi/i,                          newPrice: '0.00004582π', oldPrice: '0.00003821π' },
    { match: /re-?vive|revive/i,                 newPrice: '0.00005604π', oldPrice: '0.00004670π' },
    { match: /cordy\s*active/i,                  newPrice: '0.00003054π', oldPrice: '0.00002545π' },
    { match: /golden\s*six/i,                    newPrice: '0.00001878π', oldPrice: '0.00001565π' },
    { match: /magilim/i,                         newPrice: '0.00003631π', oldPrice: '0.00003026π' },
    { match: /gastrifort/i,                      newPrice: '0.00004244π', oldPrice: '0.00003536π' },
    { match: /cello\s*q10/i,                     newPrice: '0.00005452π', oldPrice: '0.00004543π' },
    { match: /jointeez/i,                        newPrice: '0.00003394π', oldPrice: '0.00002828π' },
    { match: /colon\s*clean/i,                   newPrice: '0.00002665π', oldPrice: '0.00002221π' },
    { match: /golden\s*hypha/i,                  newPrice: '0.00005089π', oldPrice: '0.00004241π' },
    { match: /lycovite/i,                        newPrice: '0.00002180π', oldPrice: '0.00001817π' },
    { match: /diawell/i,                         newPrice: '0.00003877π', oldPrice: '0.00003231π' },
    { match: /vigor\s*essential/i,               newPrice: '0.00001938π', oldPrice: '0.00001615π' },
    { match: /gynapharm/i,                       newPrice: '0.00004605π', oldPrice: '0.00003837π' },
    { match: /constilease/i,                     newPrice: '0.00001817π', oldPrice: '0.00001514π' },
    { match: /cardibetter/i,                     newPrice: '0.00004244π', oldPrice: '0.00003536π' },
    { match: /haemocare|hemocare/i,              newPrice: '0.00006177π', oldPrice: '0.00005148π' },
    { match: /grapemin/i,                        newPrice: '0.00008638π', oldPrice: '0.00007198π' },
    { match: /cordy\s*royal\s*jelly/i,           newPrice: '0.00004052π', oldPrice: '0.00003376π' },
    { match: /eve.*comfort/i,                    newPrice: '0.00007684π', oldPrice: '0.00006403π' },
    { match: /m&?v\s*women/i,                    newPrice: '0.00008023π', oldPrice: '0.00006686π' },
    { match: /vitaprego/i,                       newPrice: '0.00007623π', oldPrice: '0.00006353π' },
    { match: /eye\s*beta/i,                      newPrice: '0.00002543π', oldPrice: '0.00002119π' },
    { match: /lirich/i,                          newPrice: '0.00002059π', oldPrice: '0.00001716π' },
    { match: /qinghao/i,                         newPrice: '0.00001211π', oldPrice: '0.00001009π' },
    { match: /sanitary\s*pad/i,                  newPrice: '0.00000545π', oldPrice: '0.00000454π' },
    { match: /gum\s*care/i,                      newPrice: '0.00001030π', oldPrice: '0.00000858π' },
    { match: /kedi\s*beauty|beauty.*soap/i,      newPrice: '0.00000848π', oldPrice: '0.00000706π' },
    // Equipment
    { match: /blood\s*circulat|circulation\s*machine/i, newPrice: '0.00160503π', oldPrice: '0.00133753π' },
    { match: /hydrogen\s*cup/i,                  newPrice: '0.00026215π', oldPrice: '0.00021846π' },
    { match: /growbett/i,                        newPrice: '0.00002007π', oldPrice: '0.00001672π' },
    { match: /vip\s*massage|massage\s*chair/i,   newPrice: '0.00603019π', oldPrice: '0.00502516π' },
    // Fallback catch-all for unnamed numeric-only entries (optional — comment out if undesired)
];

// Files to update (relative to project root)
const TARGET_FILES = [
    'kedi.html',
    'Farforlife.html',
    'home-3.html',
];

// ─────────────────────────────────────────────
//  ENGINE — do not edit below this line
// ─────────────────────────────────────────────

/**
 * Replace price spans that appear after a product name match.
 * Strategy: find <h3>…{product name}…</h3> then replace the NEXT
 * <span class="new">…</span> and <span class="old">…</span> pair.
 */
function applyPrices(content, priceMap) {
    let updated = content;
    let totalReplaced = 0;

    for (const entry of priceMap) {
        // Regex: capture h3/h2 tag containing the product name, then lazy-match
        // everything up to the first product__price h4, then capture both price spans.
        const re = new RegExp(
            `(<(?:h[23])[^>]*>[^<]*${entry.match.source}[^<]*</(?:h[23])>` +
            `[\\s\\S]{0,600}?` +
            `<h4[^>]*product__price[^>]*>\\s*)` +
            `(<span[^>]*class="new"[^>]*>)[^<]*(</span>)` +
            `(\\s*<span[^>]*class="old"[^>]*>)[^<]*(</span>)`,
            'gi'
        );

        const before = updated;
        updated = updated.replace(re, (_, pre, snOpen, snClose, soOpen, soClose) => {
            return `${pre}${snOpen}${entry.newPrice}${snClose}${soOpen}${entry.oldPrice}${soClose}`;
        });

        if (updated !== before) totalReplaced++;
    }

    return { content: updated, count: totalReplaced };
}

// ── Main ──────────────────────────────────────
const root = path.join(__dirname, '..');
let grand = 0;

for (const file of TARGET_FILES) {
    const filePath = path.join(root, file);
    if (!fs.existsSync(filePath)) {
        console.warn(`⚠  Skipped (not found): ${file}`);
        continue;
    }

    const original = fs.readFileSync(filePath, 'utf8');
    const { content, count } = applyPrices(original, PRICE_MAP);

    if (count > 0) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅  ${file}  →  ${count} product price(s) updated`);
        grand += count;
    } else {
        console.log(`➖  ${file}  →  no matching prices found (already current or names differ)`);
    }
}

console.log(`\n🏁  Done. Total products updated: ${grand}`);
console.log('   Tip: Re-run this script any time you change PRICE_MAP.\n');
