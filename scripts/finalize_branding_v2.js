const path = require('path');
const fs = require('fs');
const directory = 'c:/Users/user/Desktop/kedi/Kedi health';

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            if (f !== 'node_modules' && f !== '.git' && f !== 'assets') {
                walkDir(dirPath, callback);
            }
        } else {
            callback(path.join(dir, f));
        }
    });
}

const replacements = [
    { from: /Kedi Healthcare (Kedi-J)/g, to: 'Kedi Healthcare (Kedi-J)' },
    { from: /KEDI HEALTHCARE (KEDI-J)/g, to: 'KEDI HEALTHCARE (KEDI-J)' },
    { from: /Kedi-J AI Doctor/g, to: 'Kedi-J AI Doctor' },
    { from: /KEDI-J AI DOCTOR/g, to: 'KEDI-J AI DOCTOR' }
];

walkDir(directory, (filePath) => {
    if (filePath.endsWith('.html') || filePath.endsWith('.js') || filePath.endsWith('.json') || filePath.endsWith('.txt')) {
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
            console.log(`Updated ${path.relative(directory, filePath)}`);
        }
    }
});
