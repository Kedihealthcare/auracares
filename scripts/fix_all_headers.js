/**
 * fix_all_headers.js
 * Synchronizes the master header template across all root HTML files.
 * Strategy:
 *   1. Replace between <!-- header start --> and <!-- slide-bar start --> (primary)
 *   2. Replace between <!-- header start --> and <!-- header end --> (fallback A)
 *   3. Replace the entire <header ...>...</header> block (fallback B - no comment markers)
 */

const path = require('path');
const fs = require('fs');

// Read from root (script is in /scripts/, root is one level up)
const rootDir = path.join(__dirname, '..');
const correctHeader = fs.readFileSync(path.join(rootDir, 'correct_header.txt'), 'utf8');

const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

let updated = 0;
let skipped = 0;

files.forEach(file => {
    const filePath = path.join(rootDir, file);
    let html = fs.readFileSync(filePath, 'utf8');

    const HEADER_START = '<!-- header start -->';
    const HEADER_END   = '<!-- header end -->';
    const SLIDE_START  = '<!-- slide-bar start -->';

    const startIdx    = html.indexOf(HEADER_START);
    const slideIdx    = html.indexOf(SLIDE_START);
    const endIdx      = html.lastIndexOf(HEADER_END);

    // ── Strategy 1: header start + slide-bar start ──────────────────────────
    if (startIdx !== -1 && slideIdx !== -1 && slideIdx > startIdx) {
        const pre  = html.substring(0, startIdx);
        const post = html.substring(slideIdx);
        html = pre + correctHeader + '\n\n        ' + post;
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`[OK-1] ${file}`);
        updated++;
        return;
    }

    // ── Strategy 2: header start + header end ───────────────────────────────
    if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
        const pre  = html.substring(0, startIdx);
        const post = html.substring(endIdx + HEADER_END.length);
        html = pre + correctHeader + post;
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`[OK-2] ${file}`);
        updated++;
        return;
    }

    // ── Strategy 3: Match <header class="...">…</header> block directly ─────
    // Handles pages with no comment markers at all (e.g. franchise.html, home-3.html)
    const headerTagMatch = html.match(/<header\b[^>]*>[\s\S]*?<\/header>/);
    if (headerTagMatch) {
        const matchStart = html.indexOf(headerTagMatch[0]);
        const pre  = html.substring(0, matchStart);
        const post = html.substring(matchStart + headerTagMatch[0].length);
        // Strip the outer <!-- header start/end --> comments from correctHeader if present
        // so we don't double-inject when no markers exist
        const headerBlock = correctHeader.replace(/^<!-- header start -->\s*/,'').replace(/\s*<!-- header end -->$/,'');
        html = pre + '<!-- header start -->\n' + headerBlock + '\n        <!-- header end -->' + post;
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`[OK-3] ${file}`);
        updated++;
        return;
    }

    console.log(`[SKIP] ${file} — no header marker found`);
    skipped++;
});

console.log(`\nDone. Updated: ${updated} | Skipped: ${skipped}`);
