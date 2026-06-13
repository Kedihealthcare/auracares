const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Count before
const before = (html.match(/currency-manager\.js/g) || []).length;

// Remove ALL instances
while (html.includes('src="assets/js/currency-manager.js"')) {
    html = html.replace('<script src="assets/js/currency-manager.js"></script>', '');
}

// Re-inject exactly once before </body>
html = html.replace('</body>', '    <script src="assets/js/currency-manager.js"></script>\n</body>');

const after = (html.match(/currency-manager\.js/g) || []).length;
fs.writeFileSync('index.html', html, 'utf8');

console.log('currency-manager.js: ' + before + 'x → ' + after + 'x ' + (after === 1 ? '✓ OK' : '✗ STILL DUPED'));
console.log('File size: ' + (html.length / 1024).toFixed(1) + 'KB');
