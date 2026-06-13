/**
 * _patch_home_headers.js
 * Surgically fixes broken/missing header elements in home-2.html and home-3.html
 * WITHOUT replacing their unique header structures.
 */
const fs = require('fs');

function patch(filename) {
    let html = fs.readFileSync(filename, 'utf8');
    const before = html.length;

    // 1. Fix language attribute
    html = html.replace(/lang="zxx"/g, 'lang="en"');

    // 2. Fix meta description if empty
    html = html.replace(
        '<meta name="description" content="">',
        '<meta name="description" content="Aura Herbs Clinical — Verified herbal protocols, AI diagnostics, and medical devices in Nigeria. Shop Reishi, Diawell, VIP Massage Chair and more.">'
    );

    // 3. Fix static date → live date element
    html = html.replace(
        /<span class="current-date">[^<]*<\/span>/g,
        '<span class="current-date" id="kedi-live-date">Loading...</span>'
    );

    // 4. Fix corrupted currency labels in dropdowns
    // Pattern: NGN (ÿ,ÿ) or NGN (?,?) etc.
    html = html.replace(/NGN \([^)]*\)/g, 'NGN (&#8358;)');
    html = html.replace(/PI \([^)]*\)/g,  'PI (&#960;)');

    // 5. Fix any corrupted ₦ price signs remaining
    html = html.replace(/\u00e2\u201a\u00a6/g, '&#8358;');
    html = html.replace(/â‚¦/g, '&#8358;');

    // 6. Add kedi-optimise.css if not already present
    if (!html.includes('kedi-optimise.css')) {
        html = html.replace(
            '<link rel="stylesheet" href="assets/css/main.css">',
            '<link rel="stylesheet" href="assets/css/main.css">\n    <link rel="stylesheet" href="assets/css/kedi-optimise.css">'
        );
    }

    // 7. Ensure cart count reads from localStorage on load
    //    Replace static count spans (keep id="cart-count" working)
    // (Already has id="cart-count" at line 117, just ensure script loads)

    // 8. Inject currency-manager.js before </body> if missing
    if (!html.includes('currency-manager.js')) {
        html = html.replace(
            '</body>',
            '    <script src="assets/js/currency-manager.js"></script>\n</body>'
        );
    }

    // 9. Inject cart.js if missing (needed for cart count sync)
    if (!html.includes('assets/js/cart.js')) {
        html = html.replace(
            '</body>',
            '    <script src="assets/js/cart.js" defer></script>\n</body>'
        );
    }

    // 10. Inject live date + cart count bootstrap script before </body>
    const liveScript = `
    <script>
    /* Aura Herbs — Header Bootstrap (home-2/home-3) */
    (function() {
        // Live date
        var dateEl = document.getElementById('kedi-live-date');
        if (dateEl) {
            dateEl.textContent = new Date().toLocaleDateString('en-NG', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            });
        }

        // Cart count sync from localStorage
        function syncCartCount() {
            try {
                var cart  = JSON.parse(localStorage.getItem('kedi_cart') || '[]');
                var count = cart.reduce(function(a, i) { return a + (i.quantity || 1); }, 0);
                var els   = document.querySelectorAll('#cart-count, .cart-count-badge');
                els.forEach(function(el) { el.textContent = count; });
            } catch(e) {}
        }
        syncCartCount();
        window.addEventListener('storage', syncCartCount);

        // Currency display label sync
        var curEl = document.getElementById('currency-display');
        if (curEl) {
            var saved = localStorage.getItem('kedi_currency') || 'NGN';
            var labels = { NGN: 'NGN &#8358;', USD: 'USD $', PI: 'PI &#960;' };
            curEl.innerHTML = (labels[saved] || 'NGN &#8358;') + ' <i class="far fa-chevron-down"></i>';
        }
    })();
    </script>`;

    // Only inject once
    if (!html.includes('Aura Herbs — Header Bootstrap')) {
        html = html.replace('</body>', liveScript + '\n</body>');
    }

    fs.writeFileSync(filename, html, 'utf8');
    const after = html.length;
    console.log(`[${filename}] Done. Size: ${before} → ${after} bytes`);
}

['home-2.html', 'home-3.html'].forEach(patch);
console.log('All patches applied.');
