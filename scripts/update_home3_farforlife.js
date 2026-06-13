const path = require('path');
const __dirname_root = path.join(__dirname, '..');
/**
 * update_home3_farforlife.js
 * Comprehensive update of home-3.html and Farforlife.html:
 * - Replaces all placeholder images (img_XX.png) with real Kedi product images
 * - Replaces electronics titles/categories with clinical equivalents
 * - Replaces USD prices with π pricing
 * - Replaces sidebar category nav items with clinical health domains
 * - Replaces add/banner images with clinical product shots
 */
const fs = require('fs');
// ── Kedi product catalogue (cycling) ──────────────────────────────────────────
const products = [
  { img:'Reishi.png',        name:'Reishi Immune Guard',        price:'0.00008107π', cat:'Immunity',        link:'shop-reishi.html' },
  { img:'Revive.png',        name:'Revive Vitality Caps',       price:'0.00010317π', cat:'Male Vitality',   link:'shop-revive.html' },
  { img:'Golden six.png',    name:'Golden Six Protocol',        price:'0.00003566π', cat:'Kidney & Hormonal',link:'shop-golden-six.html' },
  { img:'Cardibetter.jpg',   name:'Cardibetter Heart Care',     price:'0.00003821π', cat:'Cardiovascular',  link:'shop-cardibetter.html' },
  { img:'Magilim.png',       name:'Magilim Detox Formula',      price:'0.00004582π', cat:'Weight Management',link:'shop-single.html' },
  { img:'Constilease.png',   name:'Constilease Digestive Aid',  price:'0.00004073π', cat:'Digestive Health', link:'shop-single.html' },
  { img:'Colon-tea.png',     name:'Colon Cleansing Tea',        price:'0.00003054π', cat:'Cellular Detox',  link:'shop-single.html' },
  { img:'farforon.jpg',      name:'Faforon Stem Cell Therapy',  price:'0.00004582π', cat:'Stem Cell',       link:'shop-single.html' },
  { img:'LYCOVITE.jpg',      name:'Lycovite For Men',           price:'0.00005604π', cat:'Male Health',     link:'shop-lycovite.html' },
  { img:'Vitamin-C.jpg',     name:'Vitamin C 1000mg',           price:'0.00002675π', cat:'Immune Support',  link:'shop-vitamin-c.html' },
  { img:'Gastrifort.png',    name:'Gastrifort Gastro Care',     price:'0.00006891π', cat:'Gastric Health',  link:'shop-single.html' },
  { img:'CELLO Q10.jpg',     name:'Cello Q10 Heart Support',    price:'0.00009234π', cat:'Cardio',          link:'shop-single.html' },
  { img:'Jointeez.png',      name:'Jointeez Bone & Joint',      price:'0.00005012π', cat:'Bone & Joint',    link:'shop-single.html' },
  { img:'Diawell.png',       name:'Diawell Glucose Balance',    price:'0.00007823π', cat:'Blood Sugar',     link:'shop-single.html' },
  { img:'Golden Hypha.png',  name:'Golden Hypha Capsules',      price:'0.00004210π', cat:'Immunity',        link:'shop-golden-hypha.html' },
  { img:'Cordy Active.png',  name:'Cordy Active Stamina',       price:'0.00004760π', cat:'Respiratory',     link:'shop-single.html' },
  { img:'Spidex 12.png',     name:'Spidex 12 Herbal Blend',     price:'0.00003400π', cat:'Cellular Health', link:'shop-single.html' },
  { img:'Gynapharm.png',     name:'Gynapharm Female Balance',   price:'0.00006100π', cat:'Female Health',   link:'shop-single.html' },
];

let idx = 0;
function next() { const p = products[idx]; idx = (idx + 1) % products.length; return p; }
function peek() { return products[idx % products.length]; }

// ── Category nav replacements ─────────────────────────────────────────────────
const NAV_CATEGORIES = [
  // old text                           // new text                    // new href
  ['Bluetooth speaker',                 'Immune Defense',              'shop.html?cat=immune'],
  ['Electric frying pan',               'Metabolic Reset',             'shop.html?cat=metabolic'],
  ['Laser printer',                     'Bone & Joint Care',           'shop.html?cat=bone'],
  ['Action Camera',                     'Stem Cell Therapy',           'shop.html?cat=stemcell'],
  ['Robotics vacuum',                   'Cellular Detox',              'shop.html?cat=detox'],
  ['Digital camera',                    'Cardiovascular Health',       'shop.html?cat=cardio'],
  ['external hard Drive',               'Hormonal Balance',            'shop.html?cat=hormonal'],
  ['Breakfast &amp; Dairy',             'Detox &amp; Wellness',        'shop.html?cat=detox'],
  ['Breakfast & Dairy',                 'Detox & Wellness',            'shop.html?cat=detox'],
  ['Samsung',                           'Kedi Healthcare',             'kedi.html'],
  ['SAMSUNG',                           'Kedi Healthcare',             'kedi.html'],
  ['Wireless Earbuds - Apple W1 Headphone', 'Reishi Immune Guard',    'shop-reishi.html'],
  ['SAMSUNG Galaxy Tab A7 Lite',        'Diawell Glucose Balance',     'shop-single.html'],
  ['JBL Tune 510BT',                    'Cordy Active Stamina',        'shop-single.html'],
  ['Bluetooth Headphones',              'Faforon Stem Cell',           'shop-single.html'],
  ['Wireless Headphones',               'Golden Six Protocol',         'shop-golden-six.html'],
  ['Smart Phones &amp; Tablets',        'Digestive Health',            'shop.html?cat=digestive'],
  ['Smart Phones & Tablets',            'Digestive Health',            'shop.html?cat=digestive'],
  ['Cameras &amp; Photography',         'Cellular Detox',              'shop.html?cat=detox'],
  ['Cameras & Photography',             'Cellular Detox',              'shop.html?cat=detox'],
  ['Video Games &amp; Consoles',        'Cardiovascular Care',         'shop.html?cat=cardio'],
  ['Video Games & Consoles',            'Cardiovascular Care',         'shop.html?cat=cardio'],
  ['TV &amp; Audio',                    'Vitality Series',             'shop.html?cat=vitality'],
  ['TV & Audio',                        'Vitality Series',             'shop.html?cat=vitality'],
  ['Gadgets',                           'Stem Cell Flow',              'shop.html?cat=stemcell'],
  ['Electronics',                       'Clinical Protocols',          'shop.html'],
];

// ── Banner image replacements (assets/img/add/) ───────────────────────────────
const ADD_BANNERS = [
  { from:'assets/img/add/img_01.jpg', to:'assets/img/product/Reishi.png' },
  { from:'assets/img/add/img_02.jpg', to:'assets/img/product/Golden six.png' },
  { from:'assets/img/add/img_03.jpg', to:'assets/img/product/Magilim.png' },
  { from:'assets/img/add/img_04.jpg', to:'assets/img/product/Cardibetter.jpg' },
  { from:'assets/img/add/img_05.jpg', to:'assets/img/product/farforon.jpg' },
  { from:'assets/img/add/img_06.jpg', to:'assets/img/product/Revive.png' },
];

function processFile(filename) {
  const fp = path.join(__dirname_root, filename);
  if (!fs.existsSync(fp)) { console.log(`SKIP: ${filename}`); return; }

  let html = fs.readFileSync(fp, 'utf8');

  // 1. Replace placeholder product images  img_01.png … img_999.png
  html = html.replace(/assets\/img\/product\/img_\d+\.(png|jpg)/gi, () => {
    return `assets/img/product/${next().img}`;
  });

  // 2. Replace banner add images
  ADD_BANNERS.forEach(b => {
    html = html.split(b.from).join(b.to);
  });

  // 3. Category nav replacements
  NAV_CATEGORIES.forEach(([oldText, newText]) => {
    html = html.split(oldText).join(newText);
  });

  // 4. Replace USD prices  $30.52 / $28.52  patterns
  html = html.replace(
    /<span class="new">\$[\d,.]+<\/span>\s*(?:<span class="old">\$[\d,.]+<\/span>)?/g,
    () => `<span class="new">${next().price}</span>`
  );
  html = html.replace(/<span class="item_price">\$[\d,.]+<\/span>/g,
    () => `<span class="item_price">${next().price}</span>`
  );
  // Bare $ price spans
  html = html.replace(/(<span[^>]*>)\$[\d,.]+(<\/span>)/g, (m, open, close) => {
    if (m.includes('π')) return m;
    return `${open}${next().price}${close}`;
  });

  // 5. Replace remaining electronic product titles  (free-standing text nodes)
  const titleReplacements = [
    [/Wireless Earbuds – Apple W1 Headphone/g,              'Reishi Immune Guard'],
    [/Wireless Earbuds - Apple W1 Headphone/g,              'Reishi Immune Guard'],
    [/SAMSUNG Galaxy Tab A7 Lite[^<]*/g,                    'Diawell Glucose Balance'],
    [/Sceptre 24[″"]? Professional[^<]*/g,                  'Cardibetter Heart Care'],
    [/CLB 510BT Wireless Headphones[^<]*/g,                 'Golden Six Protocol'],
    [/BLACK\+DECKER BPWH84W[^<]*/g,                        'Magilim Detox Formula'],
    [/Amazon Basics 2 Slice[^<]*/g,                         'Vitamin C 1000mg'],
    [/SMORFIT Smart Watch[^<]*/g,                           'Lycovite For Men'],
    [/Home Security Camera[^<]*/g,                          'Constilease Digestive Aid'],
    [/ByronStatics Portable Radio[^<]*/g,                   'Colon Cleansing Tea'],
    [/Panasonic Cordless Phone[^<]*/g,                      'Faforon Stem Cell Therapy'],
    [/JBL Tune 510BT[^<]*/g,                                'Cordy Active Stamina'],
    [/Bose Sport Earbuds[^<]*/g,                            'Cello Q10 Heart Support'],
    [/Sony PlayStation[^<]*/g,                              'Gastrifort Gastro Care'],
    [/GTR 3 Smart Watch[^<]*/g,                             'Jointeez Bone &amp; Joint'],
  ];

  titleReplacements.forEach(([regex, replacement]) => {
    html = html.replace(regex, replacement);
  });

  // 6. Replace category icon nav items (cat_01.svg, cat_02.svg etc.)
  const catIconRemap = [
    { svg:'cat_01.svg', label:'Immune Defense' },
    { svg:'cat_02.svg', label:'Metabolic Reset' },
    { svg:'cat_03.svg', label:'Bone & Joint' },
    { svg:'cat_04.svg', label:'Stem Cell' },
    { svg:'cat_05.svg', label:'Detox' },
    { svg:'cat_06.svg', label:'Cardiovascular' },
  ];
  // Replace text immediately after each cat_0X.svg icon link
  catIconRemap.forEach(({ svg, label }) => {
    const escapedSvg = svg.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    html = html.replace(
      new RegExp(`(src="assets/img/icon/${escapedSvg}"[^>]*>)([^<]{1,60})`, 'g'),
      (m, imgTag) => `${imgTag}${label}`
    );
  });

  // 7. Replace "Available: 334" / stock count labels with clinical description
  html = html.replace(/Available:\s*<span>\d+<\/span>/g,
    () => `Category: <span>${next().cat}</span>`
  );

  fs.writeFileSync(fp, html, 'utf8');
  console.log(`✓ Updated ${filename}`);
}

processFile('home-3.html');
processFile('Farforlife.html');

console.log('\n✅ home-3.html and Farforlife.html fully updated.');
