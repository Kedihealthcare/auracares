const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const START_MARKER = '<!-- product category start -->';
const END_MARKER   = '<!-- product category end -->';

const startIdx = html.indexOf(START_MARKER);
const endIdx   = html.indexOf(END_MARKER) + END_MARKER.length;

if (startIdx === -1) { console.error('START marker not found'); process.exit(1); }
if (endIdx < END_MARKER.length) { console.error('END marker not found'); process.exit(1); }

const newBlock = fs.readFileSync('assets/js/_cat_block.html', 'utf8');

html = html.slice(0, startIdx) + newBlock + html.slice(endIdx);

// Inject category-blogs.js before </body>
if (!html.includes('category-blogs.js')) {
  html = html.replace('</body>', '    <script src="assets/js/category-blogs.js"></script>\n</body>');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Done. Total lines: ' + html.split('\n').length);
