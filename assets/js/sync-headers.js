/**
 * sync-headers.js — Aura Herbs Header Synchroniser
 * ─────────────────────────────────────────────────
 * Reads canonical nav data from the codebase and surgically updates:
 *   • home-2.html  (header__style-two  — has search bar + category ul_li)
 *   • home-3.html  (header__style-three — has main-menu__nav desktop nav)
 *
 * Run:  node assets/js/sync-headers.js
 */

const fs = require('fs');

// ── 1. CANONICAL DATA (sourced from index.html codebase) ─────────

const TOP_INFO_HTML = `
                            <li><i class="far fa-map-marker-alt"></i>Clinical Hubs Nationwide</li>
                            <li><i class="far fa-truck"></i>Protocol Tracking &amp; Delivery</li>
                            <li><i class="fas fa-phone"></i>Clinical Support: 0800-AURA</li>
                            <li><i class="fas fa-heart"></i>Welcome to Aura Herbs &mdash; Leading Clinical Healthcare Ecosystem</li>`;

const SEARCH_CATS_HTML = `
                                            <option value="">All Protocols</option>
                                            <option value="1">Immunity &amp; Defence</option>
                                            <option value="2">Metabolic Health</option>
                                            <option value="3">Vitality &amp; Vigour</option>
                                            <option value="4">Bone &amp; Joint</option>
                                            <option value="5">Detox &amp; Digestive</option>
                                            <option value="6">Cardiovascular</option>
                                            <option value="7">Organ Support</option>
                                            <option value="8">Skin &amp; Beauty</option>
                                            <option value="9">Women's Health</option>
                                            <option value="10">Medical Devices</option>`;

const NAV_CATS_HTML = `
                                <li><a href="shop.html?cat=Immunity"><span><img src="assets/img/icon/hc_01.svg" alt=""></span>Immunity &amp; Defence</a></li>
                                <li><a href="shop.html?cat=Metabolic"><span><img src="assets/img/icon/hc_02.svg" alt=""></span>Metabolic Health</a></li>
                                <li><a href="shop.html?cat=Vitality"><span><img src="assets/img/icon/hc_03.svg" alt=""></span>Vitality &amp; Vigour</a></li>
                                <li><a href="shop.html?cat=Cardiovascular"><span><img src="assets/img/icon/hc_04.svg" alt=""></span>Cardiovascular</a></li>
                                <li><a href="shop.html?cat=Organ"><span><img src="assets/img/icon/hc_05.svg" alt=""></span>Organ Support</a></li>
                                <li><a href="shop.html?cat=Medical"><span><img src="assets/img/icon/hc_06.svg" alt=""></span>Medical Devices</a></li>
                                <li><a href="shop.html?cat=Medical"><span><img src="assets/img/icon/hc_06.svg" alt=""></span>VIP Massage Chair</a></li>`;

// home-3 desktop main menu (main-menu__nav > ul)
const MAIN_MENU_HTML = `
                                <li><a href="index.html">Home</a></li>
                                <li class="dropdown"><a href="shop.html">Clinical Protocols</a>
                                    <ul class="sub-menu">
                                        <li><a href="shop.html?cat=Immunity">Immunity &amp; Defence</a></li>
                                        <li><a href="shop.html?cat=Metabolic">Metabolic Health</a></li>
                                        <li><a href="shop.html?cat=Cardiovascular">Cardiovascular</a></li>
                                        <li><a href="shop.html?cat=Medical">Medical Devices</a></li>
                                        <li><a href="shop.html">Full Catalog</a></li>
                                    </ul>
                                </li>
                                <li><a href="blog.html">Intelligence</a></li>
                                <li><a href="quiz.html">AI Diagnosis</a></li>
                                <li><a href="about.html">About</a></li>
                                <li><a href="contact.html">Contact</a></li>`;

const MOBILE_NAV_HTML = `
                    <li class="dropdown"><a href="index.html">Home</a>
                        <ul class="sub-menu">
                            <li><a href="index.html">Clinical Portal</a></li>
                            <li><a href="home-2.html">Health Dashboard</a></li>
                            <li><a href="home-3.html">Global Ecosystem</a></li>
                        </ul>
                    </li>
                    <li class="dropdown"><a href="shop.html">Clinical Protocols</a>
                        <ul class="sub-menu">
                            <li><a href="shop.html">All Protocols</a></li>
                            <li><a href="shop.html?cat=Immunity">Immunity &amp; Defence</a></li>
                            <li><a href="shop.html?cat=Metabolic">Metabolic Health</a></li>
                            <li><a href="shop.html?cat=Cardiovascular">Cardiovascular</a></li>
                            <li><a href="shop.html?cat=Medical">VIP Massage Chair</a></li>
                            <li><a href="cart.html">Clinical Cart</a></li>
                            <li><a href="checkout.html">Settlement Portal</a></li>
                        </ul>
                    </li>
                    <li><a href="blog.html">Intelligence</a></li>
                    <li><a href="quiz.html">AI Diagnosis</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="contact.html">Contact</a></li>`;

// ── 2. DIRECT BOOTSTRAP JS ───────────────────────────────────────
const BOOTSTRAP_JS = `
    <!-- Aura Herbs Header Bootstrap v3 | sync-headers.js -->
    <script id="aura-header-bootstrap">
    (function () {
        'use strict';

        /* ── Live date ── */
        var now = new Date().toLocaleDateString('en-NG', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
        document.querySelectorAll('.current-date, #kedi-live-date')
            .forEach(function (el) { el.textContent = now; });

        /* ── Cart count from localStorage ── */
        function syncCart() {
            try {
                var cart  = JSON.parse(localStorage.getItem('kedi_cart') || '[]');
                var count = cart.reduce(function (a, i) { return a + (i.quantity || 1); }, 0);
                document.querySelectorAll('#cart-count, .count')
                    .forEach(function (el) { el.textContent = count; });
            } catch (e) {}
        }
        syncCart();
        window.addEventListener('storage', syncCart);

        /* ── Currency label sync ── */
        var LABELS = { NGN: 'NGN &#8358;', USD: 'USD $', PI: 'PI &#960;' };
        var saved  = localStorage.getItem('kedi_currency') || 'NGN';
        var curEl  = document.getElementById('currency-display');

        function setCurrencyLabel(cur) {
            if (curEl) curEl.innerHTML = (LABELS[cur] || LABELS.NGN) + ' <i class="far fa-chevron-down"></i>';
        }
        setCurrencyLabel(saved);

        /* ── Currency dropdown handlers ── */
        document.querySelectorAll('[data-currency-set]').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                var cur = btn.getAttribute('data-currency-set');
                localStorage.setItem('kedi_currency', cur);
                setCurrencyLabel(cur);
                if (window.CurrencyManager) window.CurrencyManager.applyToPage();
            });
        });

        /* ── Search form → shop.html redirect ── */
        document.querySelectorAll('form').forEach(function (form) {
            if (form.getAttribute('action') !== '#') return;
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                var q   = form.querySelector('input[type="text"]');
                var sel = form.querySelector('select');
                var qv  = q   ? encodeURIComponent(q.value.trim())   : '';
                var cv  = sel ? encodeURIComponent(sel.value.trim())  : '';
                if (qv || cv) {
                    window.location.href = 'shop.html' +
                        (qv ? '?search=' + qv : '') +
                        (cv ? (qv ? '&' : '?') + 'cat=' + cv : '');
                }
            });
        });

        /* ── Category browse button (home-3 style) ── */
        var catBtn = document.querySelector('.header__category-nav');
        if (catBtn) {
            catBtn.addEventListener('click', function (e) {
                e.preventDefault();
                window.location.href = 'shop.html';
            });
        }

    }());
    </script>`;

// ── 3. PATCH FUNCTION ────────────────────────────────────────────
function patchFile(filename) {
    let html = fs.readFileSync(filename, 'utf8');

    // a) Language
    html = html.replace(/lang="zxx"/g, 'lang="en"');

    // b) Meta description
    html = html.replace(
        '<meta name="description" content="">',
        '<meta name="description" content="Aura Herbs Clinical \u2014 Verified herbal protocols & medical devices. Reishi, Diawell, VIP Massage Chair & 40+ protocols in NGN, USD or Pi.">'
    );

    // c) kedi-optimise.css
    if (!html.includes('kedi-optimise.css')) {
        html = html.replace(
            '<link rel="stylesheet" href="assets/css/main.css">',
            '<link rel="stylesheet" href="assets/css/main.css">\n    <link rel="stylesheet" href="assets/css/kedi-optimise.css">'
        );
    }

    // d) Top info strip
    html = html.replace(
        /<ul class="header__top-info ul_li mt-10">[\s\S]*?<\/ul>/,
        '<ul class="header__top-info ul_li mt-10">' + TOP_INFO_HTML + '\n                        </ul>'
    );

    // e) Search category select (home-2 only)
    html = html.replace(
        /<select name="category" id="category">[\s\S]*?<\/select>/,
        '<select name="category" id="category">' + SEARCH_CATS_HTML + '\n                                        </select>'
    );

    // f) Category nav bar (home-2: ul.category.ul_li)
    html = html.replace(
        /<ul class="category ul_li">[\s\S]*?<\/ul>/,
        '<ul class="category ul_li">' + NAV_CATS_HTML + '\n                            </ul>'
    );

    // g) Desktop main menu (home-3: main-menu__nav > ul)
    html = html.replace(
        /(<nav class="main-menu__nav collapse navbar-collapse">\s*<ul>)[\s\S]*?(<\/ul>\s*<\/nav>)/,
        '$1' + MAIN_MENU_HTML + '\n                                $2'
    );

    // h) Mobile menu
    html = html.replace(
        /<ul id="mobile-menu-active">[\s\S]*?<\/ul>/,
        '<ul id="mobile-menu-active">' + MOBILE_NAV_HTML + '\n                </ul>'
    );

    // i) Fix corrupted currency symbols
    html = html.replace(/NGN \([^)]*\)/g, 'NGN (&#8358;)');
    html = html.replace(/PI \([^)]*\)/g,  'PI (&#960;)');

    // j) Ensure currency-manager.js is loaded
    if (!html.includes('currency-manager.js')) {
        html = html.replace(
            '</body>',
            '    <script src="assets/js/currency-manager.js"></script>\n</body>'
        );
    }

    // k) Remove any old bootstrap and inject fresh version
    html = html.replace(/\s*<!-- Aura Herbs Header Bootstrap[\s\S]*?<\/script>/g, '');
    html = html.replace('</body>', BOOTSTRAP_JS + '\n</body>');

    fs.writeFileSync(filename, html, 'utf8');
    console.log('[' + filename + '] \u2713 Synced. Size: ' + (html.length / 1024).toFixed(1) + 'KB');
}

// ── 4. RUN ───────────────────────────────────────────────────────
console.log('Aura Herbs Header Sync — v3\n');
patchFile('home-2.html');
patchFile('home-3.html');
console.log('\nAll done. Both pages synced from codebase canonical data.');
