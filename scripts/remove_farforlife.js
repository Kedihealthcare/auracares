const path = require('path');
const __dirname_root = path.join(__dirname, '..');
const fs = require('fs');
const productDir = path.join(__dirname_root, 'assets/img/product');
const allImages = fs.readdirSync(productDir);

// Identify all farforlife / spidex images
const farforImages = allImages.filter(f => {
  const lower = f.toLowerCase();
  return lower.includes('farfor') || lower.includes('fafor') || lower.includes('spidex');
});

console.log('Images to remove:', farforImages);

// Identify pure Kedi images to use as fallbacks (excluding placeholders and chatbots)
const fallbackImages = allImages.filter(f => {
  const lower = f.toLowerCase();
  return !lower.startsWith('img_') && 
         !lower.startsWith('chatbot') && 
         !lower.endsWith('.html') &&
         !farforImages.includes(f);
});

console.log('Available Kedi fallbacks:', fallbackImages.length);

function getRandomFallback() {
  return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
}

// 1. Scan all HTML files in the root directory
const rootFiles = fs.readdirSync(__dirname_root).filter(f => f.endsWith('.html'));

let filesModified = 0;

for (const file of rootFiles) {
  const filePath = path.join(__dirname_root, file);
  let html = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Replace each farfor image reference with a random fallback
  for (const farfor of farforImages) {
    // Need to handle different path formats, mainly 'assets/img/product/farfor.jpg'
    // but just in case, we can do a global string replace for the filename
    
    const escapedFarfor = farfor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`assets/img/product/${escapedFarfor}`, 'g');
    
    if (regex.test(html)) {
      html = html.replace(regex, () => `assets/img/product/${getRandomFallback()}`);
      modified = true;
    }

    // Also just the filename in case it's used elsewhere (like in a background-image)
    const exactRegex = new RegExp(`(?<=/)${escapedFarfor}(?=["'])`, 'g');
    if (exactRegex.test(html)) {
      html = html.replace(exactRegex, () => getRandomFallback());
      modified = true;
    }
  }

  // Also replace any text that mentions Faforon or Spidex
  if (/Faforon|Farforon|Spidex/i.test(html)) {
    html = html.replace(/Faforon Stem Cell Therapy/ig, 'Golden Six Protocol');
    html = html.replace(/Faforon Stem Cell/ig, 'Golden Six Protocol');
    html = html.replace(/Farforon supplement/ig, 'Kedi Supplement');
    html = html.replace(/Farforon/ig, 'Kedi Protocol');
    html = html.replace(/Faforlife/ig, 'Kedi Healthcare');
    html = html.replace(/Spidex ?\d+/ig, 'Kedi Vitality');
    html = html.replace(/Spidex/ig, 'Kedi');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, html, 'utf8');
    filesModified++;
  }
}

console.log(`Updated ${filesModified} HTML files to remove Farforlife/Spidex references.`);

// 2. Delete the actual images
let deletedCount = 0;
for (const farfor of farforImages) {
  const fp = path.join(productDir, farfor);
  if (fs.existsSync(fp)) {
    fs.unlinkSync(fp);
    deletedCount++;
  }
}

console.log(`Successfully deleted ${deletedCount} Farforlife/Spidex product images.`);
