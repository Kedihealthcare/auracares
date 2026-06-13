const path = require('path');
const fs = require('fs');
const directory = 'c:/Users/user/Desktop/kedi/Kedi health';
const files = fs.readdirSync(directory).filter(f => f.endsWith('.html'));

const replacements = [
    { from: /Kedi Healthcare (Kedi-J)/g, to: 'Kedi Healthcare (Kedi-J)' },
    { from: /Kedi-J AI Doctor/g, to: 'Kedi-J AI Doctor' },
    { from: /KEDI-J AI DOCTOR/g, to: 'KEDI-J AI DOCTOR' },
    { from: /"account\.html"/g, to: '"login.html"' },
    { from: /href="account\.html"/g, to: 'href="login.html"' },
    { from: /Themexriver/g, to: 'Kedi Healthcare (Kedi-J)' },
    { from: /&copy; 2022/g, to: '&copy; 2026' },
    { from: /Laptops & Computers/g, to: 'Cellular Detox' },
    { from: /Waterproof Headphones/g, to: 'Stem Cell Flow' },
    { from: /Cameras & Photography/g, to: 'Vitality Series' },
    { from: /Smart Phones & Tablets/g, to: 'Digestive Health' },
    { from: /Video Games & Consoles/g, to: 'Cardiovascular Care' }
];

files.forEach(file => {
    const filePath = path.join(directory, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    replacements.forEach(r => {
        if (r.from.test(content)) {
            content = content.replace(r.from, r.to);
            changed = true;
        }
    });

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
