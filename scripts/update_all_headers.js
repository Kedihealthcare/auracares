const path = require('path');
const __dirname_root = path.join(__dirname, '..');
const fs = require('fs');
const rootFiles = fs.readdirSync(__dirname_root).filter(f => f.endsWith('.html'));

const replacements = [
  [/<title>Radios - Clinical Protocols Store WooCommerce Template<\/title>/g, '<title>Kedi Healthcare - Clinical Protocols</title>'],
  [/<title>Radios - Electronics Store WooCommerce Template<\/title>/g, '<title>Kedi Healthcare - Clinical Protocols</title>'],
  [/adminpath@gmail\.com/g, 'kedhealthcaresolution1@gmail.com'],
  [/<span><span>Baby Items<\/span><\/span> \/ Gift Item \/ Shopping/g, '<span><span>Clinical Protocols</span></span> / Immune Care / Wellness'],
  [/>Born Vita</g, '>Detox Care<'],
  [/>Dairy Pack</g, '>Heart Care<'],
  [/>Milk</g, '>Metabolic Care<'],
  [/>Vegetabless</g, '>Immune Support<'],
  [/100% organic Food/g, '100% Herbal Formula'],
  [/100% Fresh Grocery <br> Combo Pack/g, 'Premium Clinical <br> Wellness Protocols'],
  [/<h3>Smart Phone<\/h3>/g, '<h3>Reishi Immune Guard</h3>'],
  [/<h3>Montblanc Watch<\/h3>/g, '<h3>Golden Six Protocol</h3>'],
  [/<h3>Kedi Healthcare Galaxy<\/h3>/g, '<h3>Kedi Healthcare Protocols</h3>'],
  [/>Milk &amp; Juices</g, '>Stem Cell<'],
  [/>Milk & Juices</g, '>Stem Cell<'],
  [/>Frozen Foods</g, '>Cardiovascular<'],
  [/>Dried Food</g, '>Vitality<'],
  [/>Cocolate Box</g, '>Bone & Joint<'],
  [/>Vegetables</g, '>Digestive Health<'],
  [/>Best Deals</g, '>Top Protocols<'],
  [/>Electric razor</g, '>Blood Sugar<'],
  [/>Washing machine</g, '>Respiratory Health<'],
  [/>Rice cooker</g, '>Kidney Care<'],
  [/>Telivsion &amp; Monitor</g, '>Male Vitality<'],
  [/>Telivsion & Monitor</g, '>Male Vitality<'],
  [/>external hard drive</g, '>Hormonal Balance<'],
  [/>external hard Drive</g, '>Hormonal Balance<'],
  [/new yourk/g, 'Lagos, Nigeria'],
  [/30 degree/g, 'Wellness First'],
  [/USD <i/g, 'π <i'],
  [/>USD</g, '>π<'],
  [/>EUR</g, '>USDT<'],
  [/>BDT</g, '>BTC<']
];

let filesModified = 0;

for (const file of rootFiles) {
  const filePath = path.join(__dirname_root, file);
  let html = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  for (const [regex, replacement] of replacements) {
    if (regex.test(html)) {
      html = html.replace(regex, replacement);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, html, 'utf8');
    filesModified++;
  }
}

console.log(`Updated ${filesModified} HTML files to fix header and hero sections.`);
