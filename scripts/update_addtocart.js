const path = require('path');
const fs = require('fs');

const file = 'addtocart.html';
let html = fs.readFileSync(file, 'utf8');

html = html.replace(
    '<img class="rounded-lg mb-4" src="https://placehold.co/400x300/a855f7/ffffff?text=Product+Image" alt="Product Image">',
    '<img class="rounded-lg mb-4 w-full h-48 object-contain bg-gray-50" src="assets/img/product/Vigor essential.jpg" alt="KEDI Vigor Essential">'
);

html = html.replace(
    '<h2 class="text-xl font-bold text-gray-800 mb-2">Cool Gadget</h2>',
    '<h2 class="text-xl font-bold text-gray-800 mb-2 product__title">KEDI Vigor Essential</h2>'
);

html = html.replace(
    '<p class="text-gray-600 mb-4">A description of the awesome gadget that you absolutely need.</p>',
    '<p class="text-gray-600 mb-4 text-sm">Premium men\\'s vitality protocol. Enhances stamina, reduces fatigue, and promotes cellular health. 100% natural herbal formula.</p>'
);

html = html.replace(
    '<span class="text-2xl font-bold text-gray-900">0.00005604π</span>',
    '<span class="text-2xl font-bold text-gray-900 new">₦18,500</span>'
);

html = html.replace(
    'id="add-to-cart-btn" class="bg-purple-600',
    'id="add-to-cart-btn" class="add-to-cart-premium bg-emerald-600'
);
html = html.replace(
    'hover:bg-purple-700',
    'hover:bg-emerald-700'
);

if (!html.includes('wishcart.js')) {
    html = html.replace('</body>', '    <script src="assets/js/wishcart.js"></script>\n</body>');
}

fs.writeFileSync(file, html, 'utf8');
console.log('addtocart.html updated with real products.');
