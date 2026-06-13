const path = require('path');
const __dirname_root = path.join(__dirname, '..');
const fs = require('fs');
const rootDir = __dirname_root;
const blogDir = path.join(rootDir, 'blog');

// 1. Read blog files
let indexHtml = fs.readFileSync(path.join(blogDir, 'index.html'), 'utf8');
let quizHtml = fs.readFileSync(path.join(blogDir, 'quiz.html'), 'utf8');
const quizJs = fs.readFileSync(path.join(blogDir, 'quiz.js'), 'utf8');
const scriptJs = fs.readFileSync(path.join(blogDir, 'script.js'), 'utf8');
const stylesCss = fs.readFileSync(path.join(blogDir, 'styles.css'), 'utf8');

// 2. Extract Promo Banner from old index.html
const oldIndexContent = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
const promoMatch = oldIndexContent.match(/<!-- KEDI PROMO BANNER START -->[\s\S]*?<!-- KEDI PROMO BANNER END -->/);

if (promoMatch) {
    // Inject it into new indexHtml just after <main ...>
    indexHtml = indexHtml.replace(/(<main[^>]*>)/, `$1\n${promoMatch[0]}`);
}

// 3. Extract Sticky CTA from ads.html (if it exists)
if (fs.existsSync(path.join(rootDir, 'ads.html'))) {
    const adsContent = fs.readFileSync(path.join(rootDir, 'ads.html'), 'utf8');
    const ctaMatch = adsContent.match(/<!-- 🔥 Sticky CTA -->[\s\S]*?<\/div>/);
    if (ctaMatch) {
        indexHtml = indexHtml.replace(/(<body[^>]*>)/, `$1\n${ctaMatch[0]}`);
        quizHtml = quizHtml.replace(/(<body[^>]*>)/, `$1\n${ctaMatch[0]}`);
    }
}

// 4. Update texts in new html files to Kedi brand
indexHtml = indexHtml.replace(/HealthPulse/g, 'Kedi Healthcare');
indexHtml = indexHtml.replace(/NEWSTANT/g, 'Kedi-J');
quizHtml = quizHtml.replace(/HealthPulse/g, 'Kedi Healthcare');
quizHtml = quizHtml.replace(/NEWSTANT/g, 'Kedi-J');

// 5. Write to Root
fs.writeFileSync(path.join(rootDir, 'index.html'), indexHtml);
fs.writeFileSync(path.join(rootDir, 'quiz.html'), quizHtml);
fs.writeFileSync(path.join(rootDir, 'quiz.js'), quizJs);
fs.writeFileSync(path.join(rootDir, 'script.js'), scriptJs);
fs.writeFileSync(path.join(rootDir, 'styles.css'), stylesCss);

// 6. Delete unwanted old HTML files, keeping only the new index.html and quiz.html
const allFiles = fs.readdirSync(rootDir);
let deletedCount = 0;
allFiles.forEach(f => {
    if (f.endsWith('.html') && f !== 'index.html' && f !== 'quiz.html') {
        fs.unlinkSync(path.join(rootDir, f));
        deletedCount++;
    }
});

console.log(`Migration complete! Copied blog files, extracted Promo Banner & Sticky CTA, replaced branding, and deleted ${deletedCount} old HTML pages.`);
