const path = require('path');
const __dirname_root = path.join(__dirname, '..');
const fs = require('fs');
const targetFile = path.join(__dirname_root, 'home-3.html');
let content = fs.readFileSync(targetFile, 'utf8');

// The replacement mapping for placeholder images to clinical products
const productMap = [
    { img: 'Reishi.png', title: 'Reishi Immune Guard', price: '0.00008107π', link: 'shop-reishi.html' },
    { img: 'Revive.png', title: 'Revive Vitality', price: '0.00010317π', link: 'shop-revive.html' },
    { img: 'Golden six.png', title: 'Golden Six Protocol', price: '0.00003566π', link: 'shop-golden-six.html' },
    { img: 'Cardibetter.jpg', title: 'Cardibetter Heart Care', price: '0.00003821π', link: 'shop-cardibetter.html' },
    { img: 'LYCOVITE.jpg', title: 'LYCOVITE For Men', price: '0.00005604π', link: 'shop-lycovite.html' },
    { img: 'Vitamin-C.jpg', title: 'Vitamin C 1000mg', price: '0.00002675π', link: 'shop-vitamin-c.html' },
    { img: 'Magilim.png', title: 'Magilim Detox', price: '0.00004582π', link: 'shop-single.html' },
    { img: 'Constilease.png', title: 'Constilease Digestive', price: '0.00004073π', link: 'shop-single.html' }
];

let currentIndex = 0;

function getNextProduct() {
    const product = productMap[currentIndex];
    currentIndex = (currentIndex + 1) % productMap.length;
    return product;
}

// Regex to find a typical product block in home-3.html that still has electronics.
// We look for img_\d+.png and try to replace the image, title, and price.
// Since regex over HTML can be tricky, we'll do a simple global replace of specific known electronic names and generic placeholders.

// Replace images
content = content.replace(/assets\/img\/product\/img_\d+\.png/g, (match) => {
    return 'assets/img/product/' + getNextProduct().img;
});

// Replace remaining "Beats Flex Wireless Earbuds – Apple W1 Headphone" etc.
const electronicTitles = [
    /Beats Flex Wireless Earbuds – Apple W1 Headphone/g,
    /Sceptre 24″ Professional Thin 75Hz 1080p/g,
    /CLB 510BT Wireless Headphones with Purebass/g,
    /BLACK\+DECKER BPWH84W Washer Portable/g,
    /SAMSUNG Galaxy Tab A7 Lite 8\.7″ 32GB Android/g,
    /Amazon Basics 2 Slice, Extra-Wide Slot/g,
    /SMORFIT Smart Watch for Men\/Women, Fitness/g,
    /Home Security Camera, Baby Camera,1080P/g,
    /ByronStatics Portable Radio AM FM, Vintage/g,
    /Panasonic Cordless Phone System, Expandable/g,
    /Beats Flex Wireless Earbuds – Apple W1/g
];

electronicTitles.forEach(regex => {
    content = content.replace(regex, () => getNextProduct().title);
});

// Replace old prices
content = content.replace(/<span class="new">\$[\d\.]+<\/span><span class="old">\$[\d\.]+<\/span>/g, () => {
    return `<span class="new">${getNextProduct().price}</span>`;
});

// Also replace any standalone new prices
content = content.replace(/<span class="new">\$[\d\.]+<\/span>/g, (match) => {
    if (match.includes('π')) return match;
    return `<span class="new">${getNextProduct().price}</span>`;
});


// Replace sidebar categories that still say electronics
content = content.replace(/<a href="#!">Cameras & Photography<\/a>/g, '<a href="product-template.html?id=magilim">Cellular Detox</a>');
content = content.replace(/<a href="#!">Smart Phones & Tablets<\/a>/g, '<a href="product-template.html?id=constilease">Digestive Care</a>');
content = content.replace(/<a href="#!">Video Games & Consoles<\/a>/g, '<a href="product-template.html?id=cardibetter">Heart Wellness</a>');
content = content.replace(/<a href="#!">TV & Audio<\/a>/g, '<a href="product-template.html?id=revive">Vitality Series</a>');
content = content.replace(/<a href="#!">Gadgets<\/a>/g, '<a href="product-template.html?id=faforon">Stem Cell Flow</a>');


fs.writeFileSync(targetFile, content, 'utf8');
console.log('Successfully updated home-3.html with clinical products');
