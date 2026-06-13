const path = require('path');
const fs = require('fs');
const directoryPath = './';

function processFile(filePath) {
    if (!filePath.endsWith('.html')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    content = content.replace(/Store Location/g, 'Clinical Center');
    content = content.replace(/Track Your Order/g, 'Protocol Fulfillment');
    content = content.replace(/Call Us For Enquiry/g, 'Aura Support: +234 812 345 6789');
    content = content.replace(/Welcome to Radios\. We provides Best Electronics item/g, 'Certified Clinical Diagnostic Platform');
    
    // Title tag
    content = content.replace(/<title>Radios - Electronics Store WooCommerce Template<\/title>/g, '<title>Kedi Healthcare (Kedi-J) - Clinical Home Ecosystem</title>');
    
    // Footer & Newsletter
    content = content.replace(/Themexriver/g, 'Kedi Healthcare (Kedi-J)');
    content = content.replace(/radios eCommerce/g, 'Aura Clinical');
    
    // Currency & Lang blocks
    content = content.replace(/USD <i class="far fa-chevron-down"><\/i>/g, 'PI <i class="far fa-chevron-down"></i>');
    content = content.replace(/<li><a href="#">USD<\/a><\/li>/g, '<li><a href="#">PI</a></li>');
    
    if (original !== content) {
        fs.writeFileSync(filePath, content);
        console.log('Fixed Header/Footer in:', filePath);
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
console.log('Legacy header strings removed and updated.');
