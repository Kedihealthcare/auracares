/**
 * fix-headers.js — Aura Herbs Full Header Fix + Optimize
 * ───────────────────────────────────────────────────────
 * Fixes ALL structural and content issues in:
 *   index.html   (header__style-one  — stray div, broken structure)
 *   home-2.html  (header__style-two  — content sync)
 *   home-3.html  (header__style-three — content sync)
 *
 * Run: node assets/js/fix-headers.js
 */

const fs = require('fs');

// ──────────────────────────────────────────────────────────────────
// CANONICAL HEADER BLOCK for index.html (style-one)
// Fully corrected structure, proper indentation, all fixes applied
// ──────────────────────────────────────────────────────────────────
const INDEX_HEADER = `        <!-- header start -->
        <header class="header header__style-one">
            <div class="header__top-info-wrap d-none d-lg-block">
                <div class="container">
                    <div class="header__top-info ul_li_between mt-none-10">
                        <ul class="ul_li mt-10">
                            <li><i class="far fa-map-marker-alt"></i>Clinical Hubs Nationwide</li>
                            <li><i class="far fa-truck"></i>Protocol Tracking &amp; Delivery</li>
                            <li><i class="fas fa-phone"></i>Clinical Support: 0800-AURA</li>
                            <li><i class="fas fa-heart"></i>Welcome to Aura Herbs &mdash; Leading Clinical Healthcare Ecosystem</li>
                        </ul>
                        <div class="header__top-right ul_li mt-10">
                            <div class="date">
                                <i class="fal fa-calendar-alt"></i>
                                <span class="current-date" id="kedi-live-date"></span>
                            </div>
                        </div>
                        <div class="header__social ml-25">
                            <a href="#!" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                            <a href="#!" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                            <a href="#!" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                            <a href="#!" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="header__middle ul_li_between justify-content-xs-center">
                    <div class="header__logo">
                        <a href="index.html" style="font-size:1.5rem;font-weight:900;letter-spacing:-.04em;color:#0f172a;text-decoration:none;">
                            Aura Herbs<span style="color:#10b981;">.</span>
                        </a>
                    </div>
                    <form class="header__search-box" action="shop.html" method="get" id="header-search-form">
                        <div class="select-box">
                            <select id="header-category" name="cat">
                                <option value="">All Protocols</option>
                                <option value="Immunity">Immunity &amp; Defence</option>
                                <option value="Metabolic">Metabolic Health</option>
                                <option value="Vitality">Vitality &amp; Vigour</option>
                                <option value="Bone">Bone &amp; Joint</option>
                                <option value="Detox">Detox &amp; Digestive</option>
                                <option value="Cardiovascular">Cardiovascular</option>
                                <option value="Organ">Organ Support</option>
                                <option value="Skin">Skin &amp; Beauty</option>
                                <option value="Womens">Women's Health</option>
                                <option value="Medical">Medical Devices</option>
                            </select>
                        </div>
                        <input type="text" name="search" id="header-search-input" placeholder="Search protocols, products..." autocomplete="off">
                        <button type="submit"><i class="far fa-search"></i></button>
                    </form>
                    <div class="header__icons ul_li">
                        <!-- Currency Switcher -->
                        <div class="header__language kedi-cur-switch" style="margin-right:1rem;">
                            <ul>
                                <li>
                                    <a href="#!" id="currency-display" style="font-size:.75rem;font-weight:700;">
                                        &#8358; NGN <i class="far fa-chevron-down"></i>
                                    </a>
                                    <ul class="header__language-list">
                                        <li><a href="#!" data-currency-set="NGN">NGN (&#8358;)</a></li>
                                        <li><a href="#!" data-currency-set="USD">USD ($)</a></li>
                                        <li><a href="#!" data-currency-set="PI">Pi (&#960;)</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <!-- Account -->
                        <div class="icon">
                            <a href="account.html" title="My Account"><img src="assets/img/icon/user.svg" alt="Account"></a>
                        </div>
                        <!-- Wishlist -->
                        <div class="icon wishlist-icon">
                            <a href="#!" title="Wishlist">
                                <img src="assets/img/icon/heart.svg" alt="Wishlist">
                                <span class="count">0</span>
                            </a>
                        </div>
                        <!-- Cart -->
                        <a href="cart.html" class="cart_btn icon" title="Cart">
                            <img src="assets/img/icon/shopping_bag.svg" alt="Cart">
                            <span class="count" id="cart-count">0</span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="header__cat-wrap" data-uk-sticky="top: 250; animation: uk-animation-slide-top;">
                <div class="container">
                    <div class="header__wrap ul_li_between">
                        <div class="header__cat ul_li">
                            <div class="hamburger_menu">
                                <a href="javascript:void(0);" class="active">
                                    <div class="icon bar"><span><i class="fal fa-bars"></i></span></div>
                                </a>
                            </div>
                            <ul class="category ul_li">
                                <li><a href="shop.html?cat=Immunity"><span><img src="assets/img/icon/hc_01.svg" alt=""></span>Immunity &amp; Defence</a></li>
                                <li><a href="shop.html?cat=Metabolic"><span><img src="assets/img/icon/hc_02.svg" alt=""></span>Metabolic Health</a></li>
                                <li><a href="shop.html?cat=Vitality"><span><img src="assets/img/icon/hc_03.svg" alt=""></span>Vitality &amp; Vigour</a></li>
                                <li><a href="shop.html?cat=Cardiovascular"><span><img src="assets/img/icon/hc_04.svg" alt=""></span>Cardiovascular</a></li>
                                <li><a href="shop.html?cat=Organ"><span><img src="assets/img/icon/hc_05.svg" alt=""></span>Organ Support</a></li>
                                <li><a href="shop.html?cat=Medical"><span><img src="assets/img/icon/hc_06.svg" alt=""></span>Medical Devices</a></li>
                                <li><a href="shop.html?cat=Medical"><span><img src="assets/img/icon/hc_06.svg" alt=""></span>VIP Massage Chair</a></li>
                            </ul>
                        </div>
                        <div class="login-sign-btn">
                            <a class="thm-btn" href="account.html">
                                <span class="btn-wrap">
                                    <span>Login / Sign Up</span>
                                    <span>Login / Sign Up</span>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <!-- header end -->`;

// ──────────────────────────────────────────────────────────────────
// CANONICAL HEADER BLOCK for home-2.html (style-two)
// Has: top bar + middle (logo + search + icons) + cat-wrap
// ──────────────────────────────────────────────────────────────────
const HOME2_HEADER = `        <!-- header start -->
        <header class="header header__style-two">
            <div class="header__top-wrap">
                <div class="container mxw_1360">
                    <div class="header__top ul_li_between mt-none-10">
                        <ul class="header__top-info ul_li mt-10">
                            <li><i class="far fa-map-marker-alt"></i>Clinical Hubs Nationwide</li>
                            <li><i class="far fa-truck"></i>Protocol Tracking &amp; Delivery</li>
                            <li><i class="fas fa-heart"></i>Welcome to Aura Herbs Clinical Healthcare</li>
                        </ul>
                        <div class="header__top-right ul_li mt-10">
                            <div class="date">
                                <i class="fal fa-calendar-alt"></i>
                                <span class="current-date" id="kedi-live-date"></span>
                            </div>
                            <div class="header__language">
                                <ul>
                                    <li>
                                        <a href="#!" id="currency-display">NGN &#8358; <i class="far fa-chevron-down"></i></a>
                                        <ul class="header__language-list">
                                            <li><a href="#!" data-currency-set="NGN">NGN (&#8358;)</a></li>
                                            <li><a href="#!" data-currency-set="USD">USD ($)</a></li>
                                            <li><a href="#!" data-currency-set="PI">Pi (&#960;)</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="header__middle">
                <div class="container mxw_1360">
                    <div class="header__middle-main ul_li_between">
                        <div class="header__logo">
                            <a href="index.html">
                                <img src="assets/img/logo/logo.svg" alt="Aura Herbs">
                            </a>
                        </div>
                        <div class="header__middle-search">
                            <form action="shop.html" method="get" id="header-search-form-2">
                                <div class="header__middle-search-wrap ul_li">
                                    <div class="header__middle-category">
                                        <select name="cat" id="header-cat-2">
                                            <option value="">All Protocols</option>
                                            <option value="Immunity">Immunity &amp; Defence</option>
                                            <option value="Metabolic">Metabolic Health</option>
                                            <option value="Vitality">Vitality &amp; Vigour</option>
                                            <option value="Detox">Detox &amp; Digestive</option>
                                            <option value="Cardiovascular">Cardiovascular</option>
                                            <option value="Organ">Organ Support</option>
                                            <option value="Skin">Skin &amp; Beauty</option>
                                            <option value="Womens">Women's Health</option>
                                            <option value="Medical">Medical Devices</option>
                                        </select>
                                    </div>
                                    <div class="header__middle-search-input">
                                        <input type="text" name="search" placeholder="Search Clinical Protocols...">
                                        <button type="submit"><i class="far fa-search"></i></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="header__middle-right ul_li">
                            <div class="header__middle-icons ul_li">
                                <div class="icon">
                                    <a href="account.html" title="Account"><img src="assets/img/icon/user.svg" alt="Account"></a>
                                </div>
                                <div class="icon wishlist-icon">
                                    <a href="#!" title="Wishlist">
                                        <img src="assets/img/icon/heart.svg" alt="Wishlist">
                                        <span class="count">0</span>
                                    </a>
                                </div>
                            </div>
                            <div class="header__cart-btn icon">
                                <a href="cart.html" class="cart_btn" title="Cart">
                                    <img src="assets/img/icon/shopping_bag.svg" alt="Cart">
                                    <span class="count" id="cart-count">0</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="header__cat-wrap" data-uk-sticky="top: 250; animation: uk-animation-slide-top;">
                <div class="container mxw_1360">
                    <div class="header__wrap ul_li_between">
                        <div class="header__cat ul_li">
                            <div class="hamburger_menu">
                                <a href="javascript:void(0);" class="active">
                                    <div class="icon bar"><span><i class="fal fa-bars"></i></span></div>
                                </a>
                            </div>
                            <ul class="category ul_li">
                                <li><a href="shop.html?cat=Immunity"><span><img src="assets/img/icon/hc_01.svg" alt=""></span>Immunity &amp; Defence</a></li>
                                <li><a href="shop.html?cat=Metabolic"><span><img src="assets/img/icon/hc_02.svg" alt=""></span>Metabolic Health</a></li>
                                <li><a href="shop.html?cat=Vitality"><span><img src="assets/img/icon/hc_03.svg" alt=""></span>Vitality &amp; Vigour</a></li>
                                <li><a href="shop.html?cat=Cardiovascular"><span><img src="assets/img/icon/hc_04.svg" alt=""></span>Cardiovascular</a></li>
                                <li><a href="shop.html?cat=Organ"><span><img src="assets/img/icon/hc_05.svg" alt=""></span>Organ Support</a></li>
                                <li><a href="shop.html?cat=Medical"><span><img src="assets/img/icon/hc_06.svg" alt=""></span>Medical Devices</a></li>
                                <li><a href="shop.html?cat=Medical"><span><img src="assets/img/icon/hc_06.svg" alt=""></span>VIP Massage Chair</a></li>
                            </ul>
                        </div>
                        <div class="login-sign-btn">
                            <a class="thm-btn" href="account.html">
                                <span class="btn-wrap">
                                    <span>Login / Sign Up</span>
                                    <span>Login / Sign Up</span>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <!-- header end -->`;

// ──────────────────────────────────────────────────────────────────
// CANONICAL HEADER BLOCK for home-3.html (style-three)
// Has: top bar + sticky header__wrap (logo + desktop nav + icons)
// ──────────────────────────────────────────────────────────────────
const HOME3_HEADER = `        <!-- header start -->
        <header class="header header__style-three">
            <div class="header__top-wrap">
                <div class="container mxw_1360">
                    <div class="header__top ul_li_between mt-none-10">
                        <ul class="header__top-info ul_li mt-10">
                            <li><i class="far fa-map-marker-alt"></i>Aura Herbs Clinical Hub</li>
                            <li><i class="far fa-truck"></i>Global Protocol Disbursement</li>
                            <li><i class="fas fa-heart"></i>Leading Clinical Healthcare Ecosystem</li>
                        </ul>
                        <div class="header__top-right ul_li mt-10">
                            <div class="date">
                                <i class="fal fa-calendar-alt"></i>
                                <span class="current-date" id="kedi-live-date"></span>
                            </div>
                            <div class="header__language">
                                <ul>
                                    <li>
                                        <a href="#!" id="currency-display">NGN &#8358; <i class="far fa-chevron-down"></i></a>
                                        <ul class="header__language-list">
                                            <li><a href="#!" data-currency-set="NGN">NGN (&#8358;)</a></li>
                                            <li><a href="#!" data-currency-set="USD">USD ($)</a></li>
                                            <li><a href="#!" data-currency-set="PI">Pi (&#960;)</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="header__wrap" data-uk-sticky="top: 250; animation: uk-animation-slide-top;">
                <div class="container mxw_1360">
                    <div class="header__main ul_li">
                        <div class="header__logo">
                            <a href="index.html">
                                <img src="assets/img/logo/logo.svg" alt="Aura Herbs">
                            </a>
                        </div>
                        <div class="header__category">
                            <a class="header__category-nav" href="shop.html">
                                <img class="bar" src="assets/img/icon/bar.svg" alt="">Browse Protocols
                                <i class="fas fa-chevron-down"></i>
                            </a>
                        </div>
                        <div class="hamburger_menu d-lg-none">
                            <a href="javascript:void(0);" class="active">
                                <div class="icon bar"><span><i class="fal fa-bars"></i></span></div>
                            </a>
                        </div>
                        <div class="main-menu navbar navbar-expand-lg">
                            <nav class="main-menu__nav collapse navbar-collapse">
                                <ul>
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
                                    <li><a href="contact.html">Contact</a></li>
                                </ul>
                            </nav>
                        </div>
                        <div class="header__main-right ul_li">
                            <div class="header__icons ul_li mr-15">
                                <div class="icon">
                                    <a href="account.html" title="Account"><img src="assets/img/icon/user.svg" alt="Account"></a>
                                </div>
                                <div class="icon wishlist-icon">
                                    <a href="#!" title="Wishlist">
                                        <img src="assets/img/icon/heart.svg" alt="Wishlist">
                                        <span class="count">0</span>
                                    </a>
                                </div>
                                <div class="icon">
                                    <a href="cart.html" title="Cart">
                                        <img src="assets/img/icon/shopping_bag.svg" alt="Cart">
                                        <span class="count" id="cart-count">0</span>
                                    </a>
                                </div>
                            </div>
                            <div class="login-sign-btn">
                                <a class="thm-btn thm-btn__2 text-black" href="account.html">
                                    <span class="btn-wrap">
                                        <span>Login / Sign Up</span>
                                        <span>Login / Sign Up</span>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <!-- header end -->`;

// ──────────────────────────────────────────────────────────────────
// DIRECT BOOTSTRAP JS — same for all 3 pages
// ──────────────────────────────────────────────────────────────────
const BOOTSTRAP_JS = `
    <!-- ═══ Aura Herbs Header Bootstrap v4 ═══ -->
    <script id="aura-header-bootstrap">
    (function () {
        'use strict';

        /* 1 ── Live Date */
        var now = new Date().toLocaleDateString('en-NG', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
        document.querySelectorAll('.current-date, #kedi-live-date')
            .forEach(function (el) { el.textContent = now; });

        /* 2 ── Cart count from localStorage */
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

        /* 3 ── Currency label sync */
        var LABELS = { NGN: '&#8358; NGN', USD: '$ USD', PI: '&#960; Pi' };
        var saved  = localStorage.getItem('kedi_currency') || 'NGN';
        var curEl  = document.getElementById('currency-display');

        function applyLabel(cur) {
            if (curEl) curEl.innerHTML = (LABELS[cur] || LABELS.NGN) + ' <i class="far fa-chevron-down"></i>';
        }
        applyLabel(saved);

        /* 4 ── Currency click handlers */
        document.querySelectorAll('[data-currency-set]').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                var cur = btn.getAttribute('data-currency-set');
                localStorage.setItem('kedi_currency', cur);
                applyLabel(cur);
                if (window.CurrencyManager) window.CurrencyManager.applyToPage();
            });
        });

        /* 5 ── Search redirect (for forms with action="shop.html") */
        document.querySelectorAll('form#header-search-form, form#header-search-form-2').forEach(function (form) {
            form.addEventListener('submit', function (e) {
                // Allow natural GET submission to shop.html?search=...&cat=...
                // Only intercept if action is missing
                if (!form.action || form.action.includes('#')) {
                    e.preventDefault();
                    var q  = form.querySelector('input[name="search"]');
                    var c  = form.querySelector('select[name="cat"]');
                    var qv = q ? q.value.trim() : '';
                    var cv = c ? c.value.trim() : '';
                    window.location.href = 'shop.html' +
                        (qv || cv ? '?' : '') +
                        (qv ? 'search=' + encodeURIComponent(qv) : '') +
                        (qv && cv ? '&' : '') +
                        (cv ? 'cat=' + encodeURIComponent(cv) : '');
                }
            });
        });

    }());
    </script>
    <!-- ═══ End Header Bootstrap ═══ -->`;

// ──────────────────────────────────────────────────────────────────
// PATCH FUNCTION
// ──────────────────────────────────────────────────────────────────
function patchFile(filename, canonicalHeader) {
    let html = fs.readFileSync(filename, 'utf8');
    const before = html.length;

    // 1. Fix language
    html = html.replace(/lang="zxx"/g, 'lang="en"');

    // 2. Replace entire header block (from comment to comment)
    const S = '<!-- header start -->';
    const E = '<!-- header end -->';
    const si = html.indexOf(S);
    const ei = html.indexOf(E);
    if (si !== -1 && ei !== -1) {
        html = html.slice(0, si) + canonicalHeader + html.slice(ei + E.length);
        console.log('  Header block replaced via markers.');
    } else {
        // Fallback: replace <header...> to </header>
        html = html.replace(/<header[\s\S]*?<\/header>/, canonicalHeader);
        console.log('  Header replaced via fallback tag match.');
    }

    // 3. Ensure currency-manager.js loaded before </body>
    if (!html.includes('currency-manager.js')) {
        html = html.replace('</body>', '    <script src="assets/js/currency-manager.js"></script>\n</body>');
    }

    // 4. Remove old bootstrap scripts, inject fresh v4
    html = html.replace(/\s*<!-- ═══ Aura Herbs Header Bootstrap[\s\S]*?<!-- ═══ End Header Bootstrap ═══ -->/g, '');
    html = html.replace(/\s*<!-- Aura Herbs Header Bootstrap[\s\S]*?<\/script>/g, '');
    html = html.replace('</body>', BOOTSTRAP_JS + '\n</body>');

    // 5. Fix any remaining corrupted naira signs
    html = html.replace(/â‚¦/g, '&#8358;');

    fs.writeFileSync(filename, html, 'utf8');
    console.log(`  Size: ${(before/1024).toFixed(1)}KB → ${(html.length/1024).toFixed(1)}KB`);
}

// ──────────────────────────────────────────────────────────────────
// RUN
// ──────────────────────────────────────────────────────────────────
console.log('\nAura Herbs — Full Header Fix + Optimize v4\n');

console.log('[index.html] Fixing structure (stray div, broken nesting, Pi symbol, account link)...');
patchFile('index.html', INDEX_HEADER);

console.log('\n[home-2.html] Syncing header__style-two...');
patchFile('home-2.html', HOME2_HEADER);

console.log('\n[home-3.html] Syncing header__style-three...');
patchFile('home-3.html', HOME3_HEADER);

console.log('\n✓ All done. Run _verify_headers.js to confirm.');
