const fs = require('fs');
const path = require('path');
const __dirname_root = path.join(__dirname, '..');

const htmlFiles = fs.readdirSync(__dirname_root).filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
    const filePath = path.join(__dirname_root, file);
    let html = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // 1. Inject kedi-optimise.css
    if (!html.includes('assets/css/kedi-optimise.css')) {
        html = html.replace('</head>', '    <link rel="stylesheet" href="assets/css/kedi-optimise.css">\n</head>');
        modified = true;
    }

    // 2. Update Home links to kedi.html (since kedi.html is the current ecosystem home)
    if (html.includes('href="index.html"')) {
        html = html.replace(/href="index.html"/g, 'href="kedi.html"');
        modified = true;
    }
    
    // 3. Ensure viewport meta is correct for mobile
    if (!html.includes('name="viewport"')) {
        html = html.replace('<head>', '<head>\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">');
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`Optimised ${file}`);
    }
});

console.log("Global mobile responsiveness and optimization complete.");
