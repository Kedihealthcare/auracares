const path = require('path');
const __dirname_root = path.join(__dirname, '..');
const fs = require('fs');
const rootFiles = fs.readdirSync(__dirname_root).filter(f => f.endsWith('.html'));

let filesModified = 0;

for (const file of rootFiles) {
  const filePath = path.join(__dirname_root, file);
  let html = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Fix massive product images breaking the header layout in <div class="add">
  const addRegex = /(<div class="add">\s*<a[^>]*>\s*<img\s+src="assets\/img\/product\/[^"]+"\s+alt="[^"]*")(\s*>)/g;
  
  if (addRegex.test(html)) {
    html = html.replace(addRegex, (match, p1, p2) => {
      if (match.includes('max-height: 80px;')) return match; // Already fixed
      return p1 + ' style="max-height: 80px; width: auto; object-fit: contain;"' + p2;
    });
    modified = true;
  }
  
  // Just in case it has no alt or different spacing
  const addRegex2 = /(<div class="add">\s*<a[^>]*>\s*<img\s+src="assets\/img\/product\/[^"]+")(\s*>)/g;
  if (addRegex2.test(html)) {
    html = html.replace(addRegex2, (match, p1, p2) => {
      if (match.includes('max-height: 80px;')) return match;
      return p1 + ' style="max-height: 80px; width: auto; object-fit: contain;"' + p2;
    });
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, html, 'utf8');
    filesModified++;
  }
}

console.log(`Updated ${filesModified} HTML files to fix header height layouts.`);
