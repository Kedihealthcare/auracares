const fs = require('fs');
const path = require('path');

const targetFiles = ['home-3.html', 'news.html', 'Farforlife.html', 'kedi.html'];

const linkUpdates = [
    { old: 'news-single.html', new: 'news-single.html?id=toilet-infection' },
    { old: 'blog-immune-system.html', new: 'news-single.html?id=immune-system' }
];

targetFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    linkUpdates.forEach(u => {
        const regex = new RegExp(`href="${u.old}"`, 'g');
        if (content.match(regex)) {
            content = content.replace(regex, `href="${u.new}"`);
            modified = true;
        }
    });

    if (modified) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated blog links in ${file}`);
    }
});
