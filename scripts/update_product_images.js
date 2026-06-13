const fs = require('fs');
const path = require('path');

const targetFiles = ['home-3.html', 'Farforlife.html'];

const imgReplacements = [
    { old: 'img_157.png', new: 'Reishi.png' },
    { old: 'img_158.png', new: 'Revive.png' },
    { old: 'img_159.png', new: 'Golden Six (1).jpg' },
    { old: 'img_160.png', new: 'Cardibetter.jpeg' },
    { old: 'img_161.png', new: 'Maagilim.jpeg' },
    { old: 'img_164.png', new: 'Vigor essential (1).jpg' },
    { old: 'img_01.png', new: 'Gastrifort.jpeg' },
    { old: 'img_02.png', new: 'Jointeez.jpeg' },
    { old: 'img_03.png', new: 'CELLO Q10.jpg' },
    { old: 'img_04.png', new: 'Hemocare.png' }
];

targetFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    imgReplacements.forEach(r => {
        const regex = new RegExp(`assets/img/product/${r.old}`, 'g');
        if (content.match(regex)) {
            content = content.replace(regex, `assets/img/product/${r.new}`);
            modified = true;
        }
    });

    if (modified) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated product images in ${file}`);
    }
});
