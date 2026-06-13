const fs = require('fs');
const path = require('path');
const __dirname_root = path.join(__dirname, '..');

const htmlFiles = fs.readdirSync(__dirname_root).filter(f => f.endsWith('.html'));

const cartScriptInject = `
    <script src="assets/js/cart.js"></script>
</body>`;

htmlFiles.forEach(file => {
    const filePath = path.join(__dirname_root, file);
    let html = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // 1. Inject cart.js
    if (!html.includes('assets/js/cart.js')) {
        html = html.replace('</body>', cartScriptInject);
        modified = true;
    }

    // 2. Fix the sticky CTA in blog.html
    if (file === 'blog.html' && html.includes('Order Now')) {
        html = html.replace(/href="cart\.html"/g, 'href="javascript:void(0)" onclick="KediCart.showNotification(\'Please select a product from the catalog below.\')"');
        modified = true;
    }

    // 3. Ensure header cart icons have the 'count' class
    // Most templates already have it, but we'll ensure it's there
    
    if (modified) {
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`Injected Cart System into ${file}`);
    }
});
