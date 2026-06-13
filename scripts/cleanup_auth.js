const fs = require('fs');
const path = require('path');
const __dirname_root = path.join(__dirname, '..');

const htmlFiles = fs.readdirSync(__dirname_root).filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
    const filePath = path.join(__dirname_root, file);
    let html = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // 1. Remove manual auth scripts that we implemented earlier
    // These usually start with // 2. Auth State Management
    const authRegex = /<script>\s*document\.addEventListener\('DOMContentLoaded',\s*\(\)\s*=>\s*\{\s*\/\/ 1\. Update Dynamic Dates[\s\S]*?\/\/ 2\. Auth State Management[\s\S]*?<\/script>/g;
    if (authRegex.test(html)) {
        html = html.replace(authRegex, '');
        modified = true;
    }

    // Secondary variant
    const authRegex2 = /<script>\s*document\.addEventListener\('DOMContentLoaded',\s*\(\)\s*=>\s*\{\s*\/\/ 2\. Auth State Management[\s\S]*?<\/script>/g;
    if (authRegex2.test(html)) {
        html = html.replace(authRegex2, '');
        modified = true;
    }

    // 2. Ensure cart.js is included at the end
    if (!html.includes('assets/js/cart.js')) {
        html = html.replace('</body>', '    <script src="assets/js/cart.js"></script>\n</body>');
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`Cleaned up auth logic in ${file}`);
    }
});
