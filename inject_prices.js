const fs = require('fs');
// Process each HTML file in the directory
const htmlFiles = fs.readdirSync('.').filter(f => f.toLowerCase().endsWith('.html'));
htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
content = content.replace(/<span([^>]*)>&#8358;([0-9,]+)<\/span>/g, (match, attrs, price) => {
    if (attrs.includes('data-base-price')) return match;
    const clean = price.replace(/,/g, '');
    return `<span${attrs} data-base-price="${clean}">&#8358;${price}</span>`;
});
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Injected data-base-price into ${file}`);
});
