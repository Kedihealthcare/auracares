const fs = require('fs');
const path = require('path');
const __dirname_root = path.join(__dirname, '..');

const htmlFiles = fs.readdirSync(__dirname_root).filter(f => f.endsWith('.html'));

const linkMap = {
    'index.html': 'kedi.html',
    'about-us.html': 'about.html',
    'contact-us.html': 'contact.html',
    'shop-default.html': 'shop.html',
    'shop-left-sidebar.html': 'shop.html',
    'shop-cart.html': 'cart.html',
    'cart.html': 'cart.html',
    'checkout.html': 'checkout.html',
    'account.html': 'account.html',
    'shop-single.html': 'shop-single.html'
};

htmlFiles.forEach(file => {
    const filePath = path.join(__dirname_root, file);
    let html = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    Object.keys(linkMap).forEach(oldLink => {
        const newLink = linkMap[oldLink];
        // Regex to find links in href attributes
        const regex = new RegExp('href=["\']' + oldLink.replace('.', '\\.') + '["\']', 'g');
        if (regex.test(html)) {
            html = html.replace(regex, 'href="' + newLink + '"');
            modified = true;
        }
    });

    // Also handle about us with space if requested
    if (html.includes('about us.html')) {
        html = html.replace(/about us\.html/g, 'about.html');
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, html, 'utf8');
        console.log('Updated links in ' + file);
    }
});
