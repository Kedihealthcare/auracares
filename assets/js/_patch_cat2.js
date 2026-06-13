const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Fix sidebar category heading
html = html.replace('><span>Catagory</span></span></h2>', '><span>Health Categories</span></span></h2>');

// Fix cat icons labels
html = html.replace(/cat_01\.svg"\s*alt=""\>Bluetooth speaker/, 'cat_01.svg" alt="">Immunity &amp; Defence');
html = html.replace(/cat_02\.svg"\s*alt=""\>Digital camera/, 'cat_02.svg" alt="">Metabolic Health');
html = html.replace(/cat_03\.svg"\s*alt=""\>Laser printer/, 'cat_03.svg" alt="">Detox &amp; Digestive');
html = html.replace('cat_04.svg" alt="">Electric frying pan', 'cat_04.svg" alt="">Cardiovascular');
html = html.replace(/cat_05\.svg"\s*alt=""\>Robotics vacuum/, 'cat_05.svg" alt="">Vitality &amp; Vigour');
html = html.replace(/cat_06\.svg"\s*alt=""\>external hard drive/, 'cat_06.svg" alt="">Organ Support');
html = html.replace('cat_07.svg" alt="">Electric razor', 'cat_07.svg" alt="">Women\'s Health');
html = html.replace('cat_08.svg" alt="">Washing machine', 'cat_08.svg" alt="">Skin &amp; Beauty');
html = html.replace(/cat_09\.svg"\s*alt=""\>Rice cooker/, 'cat_09.svg" alt="">Bone &amp; Joint');
html = html.replace(/cat_10\.svg" alt=""\>Telivsion \&amp;[\s\S]*?Monitor/, 'cat_10.svg" alt="">Medical Devices');
html = html.replace('<li class="more-item"><a href="#!">+ More item</a></li>', '<li class="more-item"><a href="shop.html">+ View Full Catalog</a></li>');

// Fix footer sidebar widgets
html = html.replace('<span>Camera &amp; Dslr Item</span>', '<span>Detox &amp; Digestive</span>');
html = html.replace('<span>Home Accesories</span>', '<span>Medical Devices</span>');

// Fix href links in sidebar cat icons
html = html.replace(/href="#!">\<img src="assets\/img\/icon\/cat_0/g, 'href="shop.html"><img src="assets/img/icon/cat_0');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Done. Lines: ' + html.split('\n').length);
