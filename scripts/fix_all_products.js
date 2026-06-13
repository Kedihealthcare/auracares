const path = require('path');
const __dirname_root = path.join(__dirname, '..');
const fs = require('fs');
const filesToProcess = [
    'shop.html',
    'shop-left-sidebar.html',
    'shop-single.html',
    'cart.html',
    'account.html',
    'checkout.html'
];

const productMap = [
    { id: "reishi", img: "Reishi.png", title: "Kedi Reishi", category: "Immunity Boost", price: 35000, link: "product-reishi.html", oldTitleRegex: /Beats Flex Wireless Earbuds – Apple W1 Headphone/gi },
    { id: "diawell", img: "Diawell.png", title: "Kedi Diawell", category: "Glycemic Balance", price: 25000, link: "product-diawell.html", oldTitleRegex: /Sceptre 24″ Professional Thin 75Hz 1080p/gi },
    { id: "golden-six", img: "Golden Six.png", title: "Kedi Golden Six", category: "Kidney & Reproductive", price: 21000, link: "product-golden-six.html", oldTitleRegex: /CLB 510BT Wireless Headphones with Purebass/gi },
    { id: "cardibetter", img: "Cardibetter.png", title: "Kedi Cardibetter", category: "Cardiovascular Health", price: 32000, link: "product-cardibetter.html", oldTitleRegex: /BLACK\+DECKER BPWH84W Washer Portable/gi },
    { id: "lycovite", img: "Lycovite.png", title: "Kedi Lycovite", category: "Prostate & Cellular Health", price: 26000, link: "product-lycovite.html", oldTitleRegex: /SAMSUNG Galaxy Tab A7 Lite 8\.7″ 32GB Android/gi },
    { id: "v-ca", img: "V-Ca.png", title: "Kedi V-Ca", category: "Essential Nutrients", price: 15000, link: "product-v-ca.html", oldTitleRegex: /Amazon Basics 2 Slice, Extra-Wide Slot/gi },
    { id: "magilim", img: "Magilim.png", title: "Kedi Magilim", category: "Weight Management", price: 22500, link: "product-magilim.html", oldTitleRegex: /SMORFIT Smart Watch for Men\/Women, Fitness/gi },
    { id: "constilease", img: "Constilease.png", title: "Kedi Constilease", category: "Detoxification", price: 19000, link: "product-constilease.html", oldTitleRegex: /Home Security Camera, Baby Camera,1080P/gi },
    { id: "colon-cleanser", img: "Colon cleanser tea.png", title: "Kedi Colon Cleanser Tea", category: "Detoxification", price: 18000, link: "product-colon-cleanser.html", oldTitleRegex: /ByronStatics Portable Radio AM FM, Vintage/gi },
    { id: "revive", img: "Revive.png", title: "Kedi Re-Vive", category: "Male Vitality", price: 39000, link: "product-revive.html", oldTitleRegex: /GTR 3 Smart Watch for Men/gi },
    { id: "golden-hypha", img: "Golden hypha.png", title: "Kedi Golden Hypha", category: "Immunity Boost", price: 42000, link: "product-golden-hypha.html", oldTitleRegex: /Bose Sport Earbuds/gi },
    { id: "haemocare", img: "Haemocare.png", title: "Kedi Haemocare", category: "Blood Building", price: 21000, link: "product-haemocare.html", oldTitleRegex: /Sony PlayStation 5 Console/gi }
];

// Fallback title replacement regex for generic electronics
const allElectronicTitles = [
    /Smart Phone/gi,
    /Montblanc Watch/gi,
    /SAMSUNG Galaxy/gi,
    /Born Vita/gi,
    /Dairy Pack/gi,
    /Vegetabless/gi,
    /Beats Flex Wireless Earbuds/gi,
    /Sceptre 24″ Professional/gi,
    /CLB 510BT Wireless Headphones/gi,
    /BLACK\+DECKER BPWH84W Washer/gi,
    /SAMSUNG Galaxy Tab A7/gi,
    /Amazon Basics 2 Slice/gi,
    /SMORFIT Smart Watch/gi,
    /Home Security Camera/gi,
    /ByronStatics Portable Radio/gi,
    /Panasonic Cordless Phone/gi,
    /JBL Tune 510BT/gi,
    /Wireless On-Ear/gi,
    /GTR 3 Smart Watch/gi,
    /Bose Sport Earbuds/gi,
    /Sony PlayStation 5 Console/gi
];

let currentIndex = 0;
function getNextProduct() {
    const product = productMap[currentIndex];
    currentIndex = (currentIndex + 1) % productMap.length;
    return product;
}

filesToProcess.forEach(file => {
    const targetFile = path.join(__dirname_root, file);
    if (!fs.existsSync(targetFile)) return;
    
    let content = fs.readFileSync(targetFile, 'utf8');
    
    // 1. Replace generic img_*.png and img_0*.png
    content = content.replace(/assets\/img\/product\/img_\d+\.png/g, (match) => {
        return 'assets/img/product/' + getNextProduct().img;
    });

    // 2. Replace specific titles mapped to products
    productMap.forEach(product => {
        if (product.oldTitleRegex) {
            content = content.replace(product.oldTitleRegex, product.title);
        }
    });

    // 3. Fallback title replacement for anything missed
    allElectronicTitles.forEach(regex => {
        content = content.replace(regex, () => getNextProduct().title);
    });

    // 4. Replace prices with dynamic data-base-price attributes
    content = content.replace(/<span class="new">\$([\d\.,]+)<\/span><span class="old">\$([\d\.,]+)<\/span>/g, () => {
        const prod = getNextProduct();
        return `<span class="new" data-base-price="${prod.price}">₦${prod.price.toLocaleString()}</span><span class="old" data-base-price="${Math.round(prod.price * 1.2)}">₦${Math.round(prod.price * 1.2).toLocaleString()}</span>`;
    });
    
    content = content.replace(/<span class="new">\$([\d\.,]+)<\/span>/g, () => {
        const prod = getNextProduct();
        return `<span class="new" data-base-price="${prod.price}">₦${prod.price.toLocaleString()}</span>`;
    });
    
    content = content.replace(/\$([\d\.,]+)/g, (match, priceStr) => {
        const prod = getNextProduct();
        return `<span data-base-price="${prod.price}">₦${prod.price.toLocaleString()}</span>`;
    });

    // 5. Replace generic cart / sidebar categories
    content = content.replace(/Cameras &amp; Photography/g, 'Cellular Detox');
    content = content.replace(/Cameras & Photography/g, 'Cellular Detox');
    content = content.replace(/Smart Phones &amp; Tablets/g, 'Digestive Care');
    content = content.replace(/Smart Phones & Tablets/g, 'Digestive Care');
    content = content.replace(/Video Games &amp; Consoles/g, 'Heart Wellness');
    content = content.replace(/Video Games & Consoles/g, 'Heart Wellness');
    content = content.replace(/TV &amp; Audio/g, 'Vitality Series');
    content = content.replace(/TV & Audio/g, 'Vitality Series');
    content = content.replace(/Gadgets/g, 'Stem Cell Flow');

    // 6. Replace non-product placeholders
    content = content.replace(/assets\/img\/cart\/img_\d+\.jpg/g, (match) => {
        return 'assets/img/product/' + getNextProduct().img;
    });

    fs.writeFileSync(targetFile, content, 'utf8');
    console.log(`Updated ${file} with Kedi products and dynamic pricing attributes.`);
});
