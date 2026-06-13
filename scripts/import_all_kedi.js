const path = require('path');
const __dirname_root = path.join(__dirname, '..');
const fs = require('fs');
// 1. Dynamically read all real Kedi products from the assets folder
const productDir = path.join(__dirname_root, 'assets/img/product');
const rawFiles = fs.readdirSync(productDir);

const validImages = rawFiles.filter(f => 
  !f.startsWith('img_') && 
  !f.startsWith('chatbot') && 
  !f.endsWith('.html')
);

// Shuffle function
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

let products = validImages.map(img => {
  let rawName = img.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ").replace(/\s+/g, " ").trim();
  let name = rawName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
  let price = (Math.random() * (0.00010000 - 0.00002000) + 0.00002000).toFixed(8) + 'π';
  return { img: img, name: name, price: price, cat: 'Clinical Protocol', link: 'shop-single.html' };
});

products = shuffle(products);

let idx = 0;
function next() { const p = products[idx]; idx = (idx + 1) % products.length; return p; }
function peek() { return products[idx % products.length]; }

// ── Category nav replacements ─────────────────────────────────────────────────
const NAV_CATEGORIES = [
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
  ['Wireless Earbuds - Apple W1 Headphone', 'Clinical Health Protocol',    'shop.html'],
  ['SAMSUNG Galaxy Tab A7 Lite',        'Stem Cell Treatment',         'shop-single.html'],
  ['JBL Tune 510BT',                    'Metabolic Reset Care',        'shop-single.html'],
  ['Bluetooth Headphones',              'Female Health Balance',       'shop-single.html'],
  ['Wireless Headphones',               'Male Vitality Series',        'shop-single.html'],
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
  { from:'assets/img/add/img_01.jpg', to:`assets/img/product/${products[0].img}` },
  { from:'assets/img/add/img_02.jpg', to:`assets/img/product/${products[1].img}` },
  { from:'assets/img/add/img_03.jpg', to:`assets/img/product/${products[2].img}` },
  { from:'assets/img/add/img_04.jpg', to:`assets/img/product/${products[3].img}` },
  { from:'assets/img/add/img_05.jpg', to:`assets/img/product/${products[4].img}` },
  { from:'assets/img/add/img_06.jpg', to:`assets/img/product/${products[5].img}` },
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
    [/Wireless Earbuds – Apple W1 Headphone/g,              products[6].name],
    [/Wireless Earbuds - Apple W1 Headphone/g,              products[7].name],
    [/SAMSUNG Galaxy Tab A7 Lite[^<]*/g,                    products[8].name],
    [/Sceptre 24[″"]? Professional[^<]*/g,                  products[9].name],
    [/CLB 510BT Wireless Headphones[^<]*/g,                 products[10].name],
    [/BLACK\+DECKER BPWH84W[^<]*/g,                        products[11].name],
    [/Amazon Basics 2 Slice[^<]*/g,                         products[12].name],
    [/SMORFIT Smart Watch[^<]*/g,                           products[13].name],
    [/Home Security Camera[^<]*/g,                          products[14].name],
    [/ByronStatics Portable Radio[^<]*/g,                   products[15].name],
    [/Panasonic Cordless Phone[^<]*/g,                      products[16].name],
    [/JBL Tune 510BT[^<]*/g,                                products[17].name],
    [/Bose Sport Earbuds[^<]*/g,                            products[18].name],
    [/Sony PlayStation[^<]*/g,                              products[19].name],
    [/GTR 3 Smart Watch[^<]*/g,                             products[20].name],
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
  catIconRemap.forEach(({ svg, label }) => {
    const escapedSvg = svg.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    html = html.replace(
      new RegExp(`(src="assets/img/icon/${escapedSvg}"[^>]*>)([^<]{1,60})`, 'g'),
      (m, imgTag) => `${imgTag}${label}`
    );
  });

  // 7. Replace "Available: 334" / stock count labels with clinical description
  html = html.replace(/Available:\s*<span>\d+<\/span>/g,
    () => `Category: <span>Clinical Protocol</span>`
  );

  fs.writeFileSync(fp, html, 'utf8');
  console.log(`✓ Updated ${filename}`);
}

processFile('home-3.html');
processFile('Farforlife.html');

console.log('\n✅ Import completed: all valid Kedi products injected.');
