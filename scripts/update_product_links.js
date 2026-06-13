const fs = require('fs');
const path = require('path');

const productMap = {
    'reishi': ['Reishi', 'Reishi Capsule'],
    'revive': ['Revive', 'Revive Capsule'],
    'golden-six': ['Golden Six'],
    'cardibetter': ['Cardibetter']
};

const htmlFiles = fs.readdirSync(path.join(__dirname, '..'))
    .filter(file => file.endsWith('.html'));

htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Replace generic shop-single.html with parameterized ones
    Object.keys(productMap).forEach(id => {
        productMap[id].forEach(name => {
            const regex = new RegExp(`<a href="shop-single\\.html">(${name})<\\/a>`, 'g');
            if (content.match(regex)) {
                content = content.replace(regex, `<a href="shop-single.html?id=${id}">$1</a>`);
                modified = true;
            }
        });
    });

    // Also handle images wrapped in links if possible, or just the text for now.
    // Let's do a more generic replacement for common products in catalog sections.
    if (modified) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated product links in ${file}`);
    }
});
