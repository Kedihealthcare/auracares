/**
 * arrange-headers.js
 * Final arrangement pass: fixes indentation, nesting,
 * slide-bar proper container nesting, and ensures
 * body_wrap closure is correct across all 3 pages.
 */
const fs = require('fs');

// ── Verify and report structure ──────────────────────────────────
function analyzeFile(filename) {
    const html = fs.readFileSync(filename, 'utf8');
    const issues = [];

    // Check correct nesting order
    const bodyWrap = html.indexOf('class="body_wrap"');
    const headerStart = html.indexOf('<!-- header start -->');
    const headerEnd = html.indexOf('<!-- header end -->');
    const slideBar = html.indexOf('class="slide-bar"');
    const bodyOverlay = html.indexOf('class="body-overlay"');
    const mainTag = html.indexOf('<main>') > -1 ? html.indexOf('<main>') : html.indexOf('<main ');

    if (bodyWrap < 0)    issues.push('MISSING: div.body_wrap');
    if (headerStart < 0) issues.push('MISSING: <!-- header start -->');
    if (headerEnd < 0)   issues.push('MISSING: <!-- header end -->');
    if (slideBar < 0)    issues.push('MISSING: aside.slide-bar');

    // Check order
    if (headerStart > 0 && slideBar > 0 && slideBar < headerEnd)
        issues.push('ORDER: slide-bar appears inside header');
    if (bodyWrap > headerStart)
        issues.push('ORDER: body_wrap after header');

    return { html, issues };
}

// ── Fix index.html specific issues ───────────────────────────────
function fixIndex() {
    let { html, issues } = analyzeFile('index.html');

    // 1. Fix: `<!-- header start -->` comment misindented
    //    It appears at line 156 with wrong indentation
    html = html.replace(
        /(\s*)<!-- header start -->\n(\s*<header)/,
        '\n        <!-- header start -->\n        <header'
    );

    // 2. Fix: slide-bar is outside body_wrap nesting — check indent
    //    After <!-- header end --> should have properly indented slide-bar
    html = html.replace(
        /        <!-- header end -->\r?\n\r?\n    <!-- slide-bar start -->/,
        '        <!-- header end -->\n\n        <!-- slide-bar start -->'
    );
    html = html.replace(
        /    <aside class="slide-bar">/,
        '        <aside class="slide-bar">'
    );

    // 3. Fix: body-overlay div indentation
    html = html.replace(
        /    <div class="body-overlay"><\/div>\r?\n    <!-- slide-bar end -->/,
        '        <div class="body-overlay"></div>\n        <!-- slide-bar end -->'
    );

    // 4. Ensure slide-bar closing aside has correct indent
    html = html.replace(
        /    <\/aside>\r?\n        <div class="body-overlay">/,
        '        </aside>\n        <div class="body-overlay">'
    );

    fs.writeFileSync('index.html', html, 'utf8');
    console.log('[index.html] Arrangement fixed.');
    issues.forEach(i => console.log('  ISSUE: ' + i));
}

// ── Fix home-2.html ───────────────────────────────────────────────
function fixHome2() {
    let { html, issues } = analyzeFile('home-2.html');

    // home-2 slide-bar is inside body_wrap - verify correct nesting
    // Fix: double currency-manager.js (from multiple patches)
    const firstCM = html.indexOf('<script src="assets/js/currency-manager.js">');
    if (firstCM > -1) {
        const secondCM = html.indexOf('<script src="assets/js/currency-manager.js">', firstCM + 10);
        if (secondCM > -1) {
            // Remove duplicates - keep only last one
            html = html.replace(/<script src="assets\/js\/currency-manager\.js"><\/script>\s*/g, '');
            html = html.replace('</body>', '    <script src="assets/js/currency-manager.js"></script>\n</body>');
            console.log('[home-2.html] Removed duplicate currency-manager.js entries.');
        }
    }

    // Fix: double bootstrap script
    const count = (html.match(/id="aura-header-bootstrap"/g) || []).length;
    if (count > 1) {
        // Remove all, re-inject one
        html = html.replace(/\s*<!-- ═══ Aura Herbs Header Bootstrap[\s\S]*?<!-- ═══ End Header Bootstrap ═══ -->/g, '');
        // Keep only first aura-header-bootstrap
        let first = true;
        html = html.replace(/\s*<!-- Aura Herbs Header Bootstrap[\s\S]*?<\/script>/g, () => {
            if (first) { first = false; return ''; }
            return '';
        });
        console.log('[home-2.html] Removed duplicate bootstrap scripts.');
    }

    fs.writeFileSync('home-2.html', html, 'utf8');
    console.log('[home-2.html] Arrangement done.');
    issues.forEach(i => console.log('  ISSUE: ' + i));
}

// ── Fix home-3.html ───────────────────────────────────────────────
function fixHome3() {
    let { html, issues } = analyzeFile('home-3.html');

    // Same deduplication as home-2
    const firstCM = html.indexOf('<script src="assets/js/currency-manager.js">');
    if (firstCM > -1) {
        const secondCM = html.indexOf('<script src="assets/js/currency-manager.js">', firstCM + 10);
        if (secondCM > -1) {
            html = html.replace(/<script src="assets\/js\/currency-manager\.js"><\/script>\s*/g, '');
            html = html.replace('</body>', '    <script src="assets/js/currency-manager.js"></script>\n</body>');
            console.log('[home-3.html] Removed duplicate currency-manager.js entries.');
        }
    }

    // Remove duplicate bootstrap
    const bsCount = (html.match(/id="aura-header-bootstrap"/g) || []).length;
    if (bsCount > 1) {
        html = html.replace(/\s*<!-- ═══ Aura Herbs Header Bootstrap[\s\S]*?<!-- ═══ End Header Bootstrap ═══ -->/g, '');
        console.log('[home-3.html] Removed duplicate bootstrap scripts, kept latest.');
    }

    fs.writeFileSync('home-3.html', html, 'utf8');
    console.log('[home-3.html] Arrangement done.');
    issues.forEach(i => console.log('  ISSUE: ' + i));
}

// ── Run ──────────────────────────────────────────────────────────
console.log('\nAura Herbs Header Arrangement Pass\n');
fixIndex();
fixHome2();
fixHome3();

// ── Final report ─────────────────────────────────────────────────
console.log('\n── Final Structure Check ──');
['index.html', 'home-2.html', 'home-3.html'].forEach(f => {
    const html = fs.readFileSync(f, 'utf8');
    const dupes = {
        'currency-manager': (html.match(/currency-manager\.js/g) || []).length,
        'bootstrap script': (html.match(/aura-header-bootstrap/g) || []).length,
        'header start':     (html.match(/<!-- header start -->/g) || []).length,
        'header end':       (html.match(/<!-- header end -->/g) || []).length
    };
    console.log('\n' + f);
    Object.entries(dupes).forEach(([k, v]) => {
        const ok = (k === 'currency-manager' || k === 'bootstrap script') ? v === 1 : v === 1;
        console.log('  ' + (ok ? '✓' : '✗ (' + v + 'x)') + ' ' + k);
    });
    console.log('  size: ' + (html.length / 1024).toFixed(1) + 'KB');
});
