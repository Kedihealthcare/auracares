const path = require('path');
const fs = require('fs');
const directoryPath = './';

function processFile(filePath) {
    if (!filePath.endsWith('.html')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Metabolic Health
    content = content.replace(/<a href="#!">Metabolic Health<\/a>/g, '<a href="product-template.html?id=diawell">Metabolic Health</a>');
    content = content.replace(/<a href="#!">(<span><img[^>]*><\/span>)?Metabolic Health<\/a>/g, '<a href="product-template.html?id=diawell">$1Metabolic Health</a>');

    // Immune Defense
    content = content.replace(/<a href="#!">Immune Defense<\/a>/g, '<a href="product-template.html?id=reishi">Immune Defense</a>');
    content = content.replace(/<a href="#!">(<span><img[^>]*><\/span>)?Immune Defense<\/a>/g, '<a href="product-template.html?id=reishi">$1Immune Defense</a>');

    // Vitality & Energy
    content = content.replace(/<a href="#!">Vitality &amp; Energy<\/a>/g, '<a href="product-template.html?id=revive">Vitality & Energy</a>');
    content = content.replace(/<a href="#!">Vitality & Energy<\/a>/g, '<a href="product-template.html?id=revive">Vitality & Energy</a>');
    content = content.replace(/<a href="#!">(<img[^>]*>)?Vitality &amp; Energy<\/a>/g, '<a href="product-template.html?id=revive">$1Vitality & Energy</a>');
    content = content.replace(/<a href="#!">(<img[^>]*>)?Vitality & Energy<\/a>/g, '<a href="product-template.html?id=revive">$1Vitality & Energy</a>');

    // Detox & Cleanse
    content = content.replace(/<a href="#!">Detox &amp; Cleanse<\/a>/g, '<a href="product-template.html?id=colon-tea">Detox & Cleanse</a>');
    content = content.replace(/<a href="#!">Detox & Cleanse<\/a>/g, '<a href="product-template.html?id=colon-tea">Detox & Cleanse</a>');
    content = content.replace(/<a href="#!">(<span><img[^>]*><\/span>)?Detox &amp; Cleanse<\/a>/g, '<a href="product-template.html?id=colon-tea">$1Detox & Cleanse</a>');
    content = content.replace(/<a href="#!">(<span><img[^>]*><\/span>)?Detox & Cleanse<\/a>/g, '<a href="product-template.html?id=colon-tea">$1Detox & Cleanse</a>');

    // Beauty / Skin Care (if applicable)
    content = content.replace(/<a href="#!">Skin & Beauty<\/a>/g, '<a href="product-template.html?id=grapemin-e">Skin & Beauty</a>');
    content = content.replace(/<a href="#!">(<span><img[^>]*><\/span>)?Beauty<\/a>/g, '<a href="product-template.html?id=grapemin-e">$1Beauty</a>');

    if (original !== content) {
        fs.writeFileSync(filePath, content);
        console.log('Linked:', filePath);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!fullPath.includes('node_modules') && !fullPath.includes('.git') && !fullPath.includes('.gemini')) {
                walkDir(fullPath);
            }
        } else {
            processFile(fullPath);
        }
    }
}

walkDir(directoryPath);
console.log('Link navigation sweep complete.');
