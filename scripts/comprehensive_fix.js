const fs = require('fs');
const path = require('path');
const __dirname_root = path.join(__dirname, '..');

const htmlFiles = fs.readdirSync(__dirname_root).filter(f => f.endsWith('.html'));

const products = [
    { name: 'Reishi Immune Guard', price: '0.00008107π' },
    { name: 'Revive Vitality Caps', price: '0.00010317π' },
    { name: 'Golden Six Protocol', price: '0.00003566π' },
    { name: 'Cardibetter Heart Care', price: '0.00003821π' },
    { name: 'Magilim Detox Formula', price: '0.00004582π' },
    { name: 'Constilease Digestive Aid', price: '0.00004073π' },
    { name: 'Colon Cleansing Tea', price: '0.00003054π' },
    { name: 'Faforon Stem Cell Therapy', price: '0.00004582π' },
    { name: 'Lycovite For Men', price: '0.00005604π' },
    { name: 'Vitamin C 1000mg', price: '0.00002675π' },
    { name: 'Gastrifort Gastro Care', price: '0.00006891π' },
    { name: 'Cello Q10 Heart Support', price: '0.00009234π' },
    { name: 'Jointeez Bone & Joint', price: '0.00005012π' },
    { name: 'Cordy Active Stamina', price: '0.00004760π' },
    { name: 'Diawell Glucose Balance', price: '0.00007823π' },
    { name: 'Spidex 12 Herbal Blend', price: '0.00003400π' }
];

let pIdx = 0;
const getP = () => {
    const p = products[pIdx];
    pIdx = (pIdx + 1) % products.length;
    return p;
};

const globalReplacements = [
    // Branding
    { from: /Radios - Clinical Protocols Store WooCommerce Template/g, to: 'Kedi Healthcare - Clinical Protocols' },
    { from: /Radios - Electronics Store WooCommerce Template/g, to: 'Kedi Healthcare - Clinical Protocols' },
    { from: /adminpath@gmail\.com/g, to: 'kedhealthcaresolution1@gmail.com' },
    { from: /Themexriver/g, to: 'Kedi Healthcare (Kedi-J)' },
    { from: /&copy; 2022/g, to: '&copy; 2026' },
    
    // Currency
    { from: /USD <i/g, to: 'π <i' },
    { from: />USD</g, to: '>π<' },
    { from: />EUR</g, to: '>USDT<' },
    { from: />BDT</g, to: '>BTC<' },
    
    // Categories
    { from: /Summer collections/g, to: 'Immunity & Defence' },
    { from: /Breakfast & Dairy/g, to: 'Metabolic & Weight' },
    { from: /Beverage & Drinks/g, to: 'Vitality & Vigour' },
    { from: /Dried Food Corner/g, to: 'Detox & Digestive' },
    { from: /Baby Food Corner/g, to: 'Organ Support' },
    { from: /Organic & Snacks/g, to: 'Skin & Beauty' },
    { from: /Milk &amp; Juices/g, to: 'Stem Cell' },
    { from: /Milk & Juices/g, to: 'Stem Cell' },
    { from: /Frozen Foods/g, to: 'Cardiovascular' },
    { from: /Dried Food/g, to: 'Vitality' },
    { from: /Cocolate Box/g, to: 'Bone & Joint' },
    { from: /Vegetables/g, to: 'Digestive Health' },
    { from: /Cameras & Photography/g, to: 'Cellular Detox' },
    { from: /Smart Phones & Tablets/g, to: 'Digestive Health' },
    { from: /Video Games & Consoles/g, to: 'Cardiovascular Care' },
    { from: /TV & Audio/g, to: 'Vitality Series' },
    { from: /Laptops & Computers/g, to: 'Cellular Detox' },
    { from: /Waterproof Headphones/g, to: 'Stem Cell Flow' },
    
    // Automotive Remnants
    { from: />Engine</g, to: '>Immunity<' },
    { from: />Transmission</g, to: '>Metabolic<' },
    { from: />Battery</g, to: '>Vitality<' },
    { from: />Radiator</g, to: '>Detox<' },
    { from: />Fuel Tank</g, to: '>Cardio<' },
    
    // Common Electronics Remnants
    { from: /Widesceen 4k \.\.\.\.\.\.\./g, to: '100% Herbal Formula' },
    { from: /Digital Slr Camera <br> High Defination/g, to: 'Premium Clinical <br> Wellness Protocols' },
    { from: /Sumptuous, filling, and temptingly/g, to: 'Factual, industry-specific health analysis' },
    { from: /Cloud Cam, <br>Security Camera/g, to: 'Reishi Immune <br>Guard Protocol' },
    { from: /Break Disc <br> <span>deals<\/span> on this/g, to: 'Clinical <br> <span>Protocols<\/span> for you' },
    
    // Generic Template Phrases
    { from: /Welcome to Radios\. We provides Best Electronics item/g, to: 'Welcome to Kedi Healthcare. We provide the best Clinical Protocols' },
    { from: /radios eCommerce newsletter/g, to: 'Kedi Healthcare newsletter' },
    { from: /CC Tv & Camera/g, to: 'Immune Care' },
    { from: /Home Equipment/g, to: 'Wellness Protocols' },
    { from: /Tv & Audios/g, to: 'Vitality Series' },
    { from: /Printers & Ink/g, to: 'Detox Care' },
    { from: /Gaming & Fun/g, to: 'Joint Care' },
    { from: /4517 Washington Ave\. Manchester, Kentucky 39495/g, to: 'Lagos, Nigeria' },
    { from: /254 Lillian Blvd, Holbrook/g, to: 'Ikeja, Lagos' },
    { from: /1-800-654-3210/g, to: '+234 800 KEDI HELP' }
];

htmlFiles.forEach(file => {
    const filePath = path.join(__dirname_root, file);
    let html = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // 1. Global text replacements
    globalReplacements.forEach(r => {
        if (r.from.test(html)) {
            html = html.replace(r.from, r.to);
            modified = true;
        }
    });

    // 2. Replace USD prices with Pi
    // Matches $19.00, $1,000.00 etc anywhere in text
    const priceRegex = /\$([\d,.]+)/g;
    if (priceRegex.test(html)) {
        html = html.replace(priceRegex, () => getP().price);
        modified = true;
    }

    // 3. Replace placeholder product names (generic patterns)
    const electronicsRegex = /SAMSUNG Galaxy|Fire HD 10 tablet|Sceptre 24″|Rokinon Xeen|Portable External Hard Drive|Beats Flex|JBL Tune/gi;
    if (electronicsRegex.test(html)) {
        html = html.replace(electronicsRegex, () => getP().name);
        modified = true;
    }

    // 4. Fix specific placeholders like img_not_found
    if (html.includes('alt="image_not_found"')) {
        html = html.replace(/alt="image_not_found"/g, () => `alt="${getP().name}"`);
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`Comprehensively updated ${file}`);
    }
});
