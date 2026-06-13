const path = require('path');
const __dirname_root = path.join(__dirname, '..');
/**
 * fix_remaining_pages.js
 * Replaces all legacy product references (placeholder images, USD prices,
 * electronics text) with Kedi clinical products across every remaining page.
 */
const fs = require('fs');
// ─── PRODUCT CATALOGUE ────────────────────────────────────────────────────────
const products = [
    { img: 'Reishi.png',          name: 'Reishi Immune Guard',       price: '0.00008107π', pi: true,  link: 'shop-reishi.html',           badge: 'Bestseller', cat: 'Immunity & Cardio' },
    { img: 'Revive.png',          name: 'Revive Vitality Caps',      price: '0.00010317π', pi: true,  link: 'shop-revive.html',            badge: 'Premium',    cat: 'Male Vitality' },
    { img: 'Golden six.png',      name: 'Golden Six Protocol',       price: '0.00003566π', pi: true,  link: 'shop-golden-six.html',        badge: 'Clinical',   cat: 'Kidney & Hormonal' },
    { img: 'Cardibetter.jpg',     name: 'Cardibetter Heart Care',    price: '0.00003821π', pi: true,  link: 'shop-cardibetter.html',       badge: 'Hot',        cat: 'Cardiovascular' },
    { img: 'Magilim.png',         name: 'Magilim Detox Formula',     price: '0.00004582π', pi: true,  link: 'shop-single.html',            badge: 'Trending',   cat: 'Weight Management' },
    { img: 'Constilease.png',     name: 'Constilease Digestive Aid', price: '0.00004073π', pi: true,  link: 'shop-single.html',            badge: 'New',        cat: 'Digestive Health' },
    { img: 'Colon-tea.png',       name: 'Colon Cleansing Tea',       price: '0.00003054π', pi: true,  link: 'shop-single.html',            badge: 'Detox',      cat: 'Cellular Detox' },
    { img: 'farforon.jpg',        name: 'Faforon Stem Cell Therapy', price: '0.00004582π', pi: true,  link: 'shop-single.html',            badge: 'Advanced',   cat: 'Stem Cell' },
    { img: 'LYCOVITE.jpg',        name: 'Lycovite For Men',          price: '0.00005604π', pi: true,  link: 'shop-lycovite.html',          badge: 'Vitality',   cat: 'Male Health' },
    { img: 'Vitamin-C.jpg',       name: 'Vitamin C 1000mg',          price: '0.00002675π', pi: true,  link: 'shop-vitamin-c.html',         badge: 'Essential',  cat: 'Immune Support' },
    { img: 'Gastrifort.png',      name: 'Gastrifort Gastro Care',    price: '0.00006891π', pi: true,  link: 'shop-single.html',            badge: 'Clinically Proven', cat: 'Gastric Health' },
    { img: 'CELLO Q10.jpg',       name: 'Cello Q10 Heart Support',   price: '0.00009234π', pi: true,  link: 'shop-single.html',            badge: 'Heart',      cat: 'Cardio' },
    { img: 'Jointeez.png',        name: 'Jointeez Bone & Joint',     price: '0.00005012π', pi: true,  link: 'shop-single.html',            badge: 'Relief',     cat: 'Bone & Joint' },
    { img: 'Cordy Active.png',    name: 'Cordy Active Stamina',      price: '0.00004760π', pi: true,  link: 'shop-single.html',            badge: 'Stamina',    cat: 'Respiratory' },
    { img: 'Diawell.png',         name: 'Diawell Glucose Balance',   price: '0.00007823π', pi: true,  link: 'shop-single.html',            badge: 'Metabolic',  cat: 'Blood Sugar' },
    { img: 'Spidex 12.png',       name: 'Spidex 12 Herbal Blend',    price: '0.00003400π', pi: true,  link: 'shop-single.html',            badge: 'Herbal',     cat: 'Cellular Health' },
];

let idx = 0;
function next() { const p = products[idx]; idx = (idx + 1) % products.length; return p; }

// ─── FILES TO PROCESS ─────────────────────────────────────────────────────────
const filePaths = [
    'news.html',
    'news-single.html',
    'about.html',
    'franchise.html',
    'kedicenter.html',
    'kedihealthcenter.html',
    'blog-immune-system.html',
    'blog-male-vitality.html',
    'blog-metabolic-health.html',
    'contact.html',
    '404.html',
    'health-challenge.html',
    'health-diagnosis.html',
    'premium-product.html',
];

// ─── REPLACEMENT PATTERNS ─────────────────────────────────────────────────────
const ELECTRONICS_TITLES = [
    'Beats Flex Wireless Earbuds',
    'SAMSUNG Galaxy',
    'Sceptre 24',
    'CLB 510BT Wireless',
    'BLACK+DECKER BPWH84W',
    'Amazon Basics 2 Slice',
    'SMORFIT Smart Watch',
    'Home Security Camera',
    'ByronStatics Portable Radio',
    'Panasonic Cordless Phone',
    'JBL Tune 510BT',
    'Wireless On-Ear Headphones',
    'Sony PlayStation',
    'Bose Sport Earbuds',
    'GTR 3 Smart Watch',
    'Smart Phone',
    'Montblanc Watch',
    'Born Vita',
    'Dairy Pack',
    'Vegetabless',
    'Portable Radio',
    'Action Camera',
    'Bluetooth speaker',
    'Robotics vacuum',
    'Laser printer',
    'Electric frying pan',
    'Digital camera',
    'external hard Drive',
];

const LEGACY_CATEGORIES = [
    ['Cameras & Photography',       'Cellular Detox'],
    ['Cameras &amp; Photography',   'Cellular Detox'],
    ['Smart Phones & Tablets',      'Digestive Health'],
    ['Smart Phones &amp; Tablets',  'Digestive Health'],
    ['Video Games & Consoles',      'Cardiovascular'],
    ['Video Games &amp; Consoles',  'Cardiovascular'],
    ['TV & Audio',                  'Vitality Series'],
    ['TV &amp; Audio',              'Vitality Series'],
    ['Gadgets',                     'Stem Cell Therapy'],
    ['Electronics',                 'Clinical Protocols'],
    ['Audio',                       'Immune Support'],
    ['Wearables',                   'Metabolic Health'],
    ['Laptops',                     'Bone & Joint Care'],
    ['Monitors',                    'Hormonal Balance'],
];

filePaths.forEach(file => {
    const target = path.join(__dirname_root, file);
    if (!fs.existsSync(target)) { console.log(`SKIP (not found): ${file}`); return; }

    let html = fs.readFileSync(target, 'utf8');

    // 1. Replace placeholder product images: img_01.png … img_999.png
    html = html.replace(/assets\/img\/product\/img_\d+\.(png|jpg)/gi, () => {
        const p = next();
        return `assets/img/product/${p.img}`;
    });

    // 2. Replace placeholder cart images: img_1.jpg … img_99.jpg (cart folder)
    html = html.replace(/assets\/img\/cart\/img_\d+\.(png|jpg)/gi, () => {
        return `assets/img/product/${next().img}`;
    });

    // 3. Replace electronics titles
    ELECTRONICS_TITLES.forEach(title => {
        const regex = new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        html = html.replace(regex, () => next().name);
    });

    // 4. Replace item_price spans   e.g. <span class="item_price">$19.00</span>
    html = html.replace(/<span class="item_price">\$[\d,.]+<\/span>/g, () => {
        return `<span class="item_price">${next().price}</span>`;
    });

    // 5. Replace inline price spans  e.g. <span class="new">$30.52</span><span class="old">$28.52</span>
    html = html.replace(/<span class="new">\$[\d,.]+<\/span>(<span class="old">\$[\d,.]+<\/span>)?/g, () => {
        return `<span class="new">${next().price}</span>`;
    });

    // 6. Replace any remaining bare $ amounts in known elements
    html = html.replace(/(<span[^>]*>)\$[\d,.]+(<\/span>)/g, (match, open, close) => {
        if (match.includes('π')) return match; // already converted
        return `${open}${next().price}${close}`;
    });

    // 7. Replace legacy category labels
    LEGACY_CATEGORIES.forEach(([old, fresh]) => {
        html = html.split(old).join(fresh);
    });

    // 8. Replace generic "product_name" alt text
    html = html.replace(/alt="image_not_found"/g, () => `alt="${next().name}"`);

    fs.writeFileSync(target, html, 'utf8');
    console.log(`✓ Updated: ${file}`);
});

console.log('\nAll pages updated with Kedi clinical products.');
