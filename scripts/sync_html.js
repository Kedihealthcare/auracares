const path = require('path');
const fs = require('fs');
const directory = 'c:/Users/user/Desktop/kedi/Kedi health';
const files = fs.readdirSync(directory).filter(f => f.endsWith('.html'));

const replacements = [
    { from: /class="aura-story-bar"/g, to: 'class="Kedi-story-bar"' },
    { from: /id="aura-story-bar"/g, to: 'id="Kedi-story-bar"' },
    { from: /aura_user/g, to: 'kedi_user' }
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
