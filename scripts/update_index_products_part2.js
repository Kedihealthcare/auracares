/**
 * update_index_products_part2.js
 * Completes:
 *  1. Vision Care tab3 (Cardiovascular) + tab5 (Organ Support) product replacements
 *  2. Monthly Featured Item tab2 (Metabolic Pack) + tab3 (Vitality Pack) updates
 *  3. Recently / rd-product Clinical Breakthroughs slider update
 *  4. Fixes Vision Care category sidebar (updates placeholder category list)
 */

const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(FILE, 'utf8');

/* ─── Vision Care tab card builder ─── */
function vcCard(id, img, title, price, oldPrice, reviews, avail, pct, badge) {
  const fmtPrice = price.toLocaleString();
  const fmtOld   = oldPrice.toLocaleString();
  const badgeHtml = badge ? `\n                                        <span class="product__badge"><span>${badge}</span></span>` : '';
  return `
                                <div class="col-lg-3 col-md-6">
                                    <div class="product__item style-2 wow fadeInUp">
                                        <div class="product__img text-center pos-rel">
                                            <a href="shop-single.html?id=${id}"><img src="assets/img/product/${img}" alt="${title}"></a>
                                        </div>
                                        <div class="product__content">
                                            <div class="product__review ul_li">
                                                <ul class="rating-star ul_li mr-10">
                                                    <li><i class="fas fa-star"></i></li>
                                                    <li><i class="fas fa-star"></i></li>
                                                    <li><i class="fas fa-star"></i></li>
                                                    <li><i class="fas fa-star"></i></li>
                                                    <li><i class="far fa-star"></i></li>
                                                </ul>
                                                <span>(${reviews}) Review</span>
                                            </div>
                                            <h2 class="product__title"><a href="shop-single.html?id=${id}">${title}</a></h2>
                                            <span class="product__available">Available: <span>${avail}</span></span>
                                            <div class="product__progress progress color-primary">
                                                <div class="progress-bar" role="progressbar" style="width: ${pct}%" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <h4 class="product__price"><span class="new" data-base-price="${price}">₦${fmtPrice}</span><span class="old" data-base-price="${oldPrice}">₦${fmtOld}</span></h4>
                                        </div>
                                        <div class="product__action-wrap">
                                            <span class="plus-icon"><i class="fal fa-plus"></i></span>
                                            <ul class="product__action2">
                                                <li><a href="#!"><i class="far fa-compress-alt"></i></a></li>
                                                <li><a href="#!" onclick="addToCart('${id}','${title}',${price},'assets/img/product/${img}')"><i class="far fa-shopping-basket"></i></a></li>
                                                <li><a href="#!"><i class="far fa-heart"></i></a></li>
                                            </ul>
                                        </div>${badgeHtml}
                                    </div>
                                </div>`;
}

/* ─── Feature-product card builder (Monthly Featured) ─── */
function ftCard(id, img, title, price, oldPrice, avail) {
  const fmtP = price.toLocaleString();
  const fmtO = oldPrice.toLocaleString();
  return `
                                                <div class="feature-product__single mt-15">
                                                    <div class="feature-product__product ul_li">
                                                        <div class="image">
                                                            <a href="shop-single.html?id=${id}"><img src="assets/img/product/${img}" alt="${title}"></a>
                                                        </div>
                                                        <div class="content">
                                                            <ul class="rating-star ul_li">
                                                                <li><i class="fas fa-star"></i></li>
                                                                <li><i class="fas fa-star"></i></li>
                                                                <li><i class="fas fa-star"></i></li>
                                                                <li><i class="fas fa-star"></i></li>
                                                                <li><i class="far fa-star"></i></li>
                                                            </ul>
                                                            <h3 class="title"><a href="shop-single.html?id=${id}">${title}</a></h3>
                                                            <h4 class="product__price"><span class="new" data-base-price="${price}">₦${fmtP}</span><span class="old" data-base-price="${oldPrice}">₦${fmtO}</span></h4>
                                                        </div>
                                                    </div>
                                                    <span class="fs-13">Available: <span class="color-black">${avail}</span></span>
                                                    <div class="product__progress progress mb-0 color-primary">
                                                        <div class="progress-bar" role="progressbar" style="width: 70%" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
                                                    </div>
                                                </div>`;
}

/* ════════════════════════════════════════════════
   1. Vision Care tab3 (Cardiovascular)
   ════════════════════════════════════════════════ */
const vcTab3Products = [
  vcCard('p9',   'Cardibetter.png',  'Aura Cardibetter Circulation',  34200, 41040, '1,873', '198', 65, ''),
  vcCard('p-cq', 'VITAGENT.png',     'Aura Cello Q10 Heart Rhythm',   36000, 43200, '619',   '112', 51, 'New'),
  vcCard('p-hemo','Cardibetter.png', 'Aura Haemocare Blood Integrity', 24000, 28800, '1,134', '267', 63, ''),
  vcCard('p-um', 'CONSTILEASE.png',  'Aura Ultramega Cardio Support',  21600, 25920, '887',   '221', 60, ''),
  vcCard('p-eb', 'VITAGENT.png',     'Aura Eye Beta Vision Guard',     27600, 33120, '987',   '176', 58, ''),
  vcCard('p-v',  'Golden six.png',   'Aura V-Ca Bone & Joint Shield',  12600, 15120, '2,104', '512', 88, 'New'),
  vcCard('p-cal','Magilim.png',      'Aura Calmazine Bone Integrity',  24000, 28800, '743',   '189', 55, ''),
  vcCard('p-li', 'MEMORY-247.png',   'Aura Lirich Organ Vitality',     22200, 26640, '1,012', '243', 67, ''),
].join('');

html = html.replace(
  /(<div class="tab-pane animated fadeInUp" id="tx-tab3"[^>]*>\s*<div class="row g-0">)[\s\S]*?(<\/div>\s*<\/div>\s*<div class="tab-pane animated fadeInUp show active" id="tx-tab4")/,
  (m, open, close) => open + vcTab3Products + '\n                            ' + close
);
console.log('✓ Vision Care tab3 (Cardiovascular) replaced');

/* ════════════════════════════════════════════════
   2. Vision Care tab5 (Organ Support)
   ════════════════════════════════════════════════ */
const vcTab5Products = [
  vcCard('p-eb',  'VITAGENT.png',     'Aura Eye Beta Vision Guard',    27600, 33120, '987',   '176', 58, 'New'),
  vcCard('p29',   'MEMORY-247.png',   'Aura Memory 24/7 Neuro Support',33600, 40320, '988',   '212', 55, ''),
  vcCard('p-li',  'MEMORY-247.png',   'Aura Lirich Organ Vitality',    22200, 26640, '1,012', '243', 67, ''),
  vcCard('p-g6',  'Golden six.png',   'Aura Golden Six Organ Shield',  16800, 20160, '2,344', '421', 82, ''),
  vcCard('p-grp', 'Magilim.png',      'Aura Grapemin-E Antioxidant',   33600, 40320, '1,287', '322', 78, ''),
  vcCard('p-gyn', 'VITAGENT.png',     'Aura Gynapharm Women Protocol', 39600, 47520, '531',   '144', 52, 'New'),
  vcCard('p-ec',  'Gastrifort.png',   'Aura Eve Comfort Feminine Care',29880, 35856, '678',   '155', 58, ''),
  vcCard('p-vc',  'CONSTILEASE.png',  'Aura Vitamin-C Immune Boost',   14400, 17280, '2,876', '534', 84, ''),
].join('');

html = html.replace(
  /(<div class="tab-pane animated fadeInUp" id="tx-tab5"[^>]*>\s*<div class="row g-0">)[\s\S]*?(<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<!-- product end)/,
  (m, open, close) => open + vcTab5Products + '\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <!-- product end'
);
console.log('✓ Vision Care tab5 (Organ Support) replaced');

/* ════════════════════════════════════════════════
   3. Monthly Featured Item tab2 (Metabolic Pack)
   ════════════════════════════════════════════════ */
// Replace left-column products in ftx-tab2
const ftTab2Left = ftCard('p-mag','Magilim.png','Aura Magilim Detox Elite',31200,37440,'308') +
                   ftCard('p-dw', 'Diawell.png','Aura Diawell Metabolic Support',18000,21600,'178');

html = html.replace(
  /(<div class="tab-pane animated fadeInUp" id="ftx-tab2"[\s\S]*?<div class="col-lg-4 col-md-6">\s*)[\s\S]*?(<\/div>\s*<div class="col-lg-4 col-md-6">\s*<div class="feature-product__single2)/,
  (m, open, close) => open + ftTab2Left + '\n                                            ' + close
);
console.log('✓ Monthly Featured tab2 left column updated');

/* ════════════════════════════════════════════════
   4. Monthly Featured Item tab3 (Vitality Pack)
   ════════════════════════════════════════════════ */
const ftTab3Left = ftCard('p8','Vigor essential (1).jpg','Aura Vigor Essential Alpha',25000,30000,'389') +
                   ftCard('p-crj','Cordy Active.png','Aura Cordy Royal Jelly',37800,45360,'167');

html = html.replace(
  /(<div class="tab-pane animated fadeInUp" id="ftx-tab3"[\s\S]*?<div class="col-lg-4 col-md-6">\s*)[\s\S]*?(<\/div>\s*<div class="col-lg-4 col-md-6">\s*<div class="feature-product__single2)/,
  (m, open, close) => open + ftTab3Left + '\n                                            ' + close
);
console.log('✓ Monthly Featured tab3 left column updated');

/* ════════════════════════════════════════════════
   5. Category Sidebar — update from generic electronics to clinical
   ════════════════════════════════════════════════ */
html = html.replace(
  /<h2 class="product-category__title">Choose Catagory<\/h2>\s*<ul class="list-unstyled">[\s\S]*?<\/ul>/,
  `<h2 class="product-category__title">Clinical Categories</h2>
                        <ul class="list-unstyled">
                            <li class="cat-item-has-children"><a href="shop.html?cat=immunity">Immunity &amp; Defence</a></li>
                            <li class="cat-item-has-children"><a href="shop.html?cat=metabolic">Metabolic &amp; Weight</a></li>
                            <li class="cat-item-has-children"><a href="shop.html?cat=cardiovascular">Cardiovascular Health</a></li>
                            <li><a href="shop.html?cat=vitality">Vitality &amp; Vigour</a></li>
                            <li class="cat-item-has-children"><a href="shop.html?cat=organ">Organ Support</a></li>
                            <li class="cat-item-has-children"><a href="shop.html?cat=detox">Detox &amp; Digestive</a></li>
                            <li><a href="shop.html?cat=womens">Women's Health</a></li>
                            <li><a href="shop.html?cat=bone">Bone &amp; Joint</a></li>
                            <li class="cat-item-has-children"><a href="shop.html?cat=skin">Skin &amp; Beauty</a></li>
                            <li><a href="shop.html?cat=devices">Medical Devices</a></li>
                            <li class="more-item"><a href="shop.html">+ Full Catalog</a></li>
                        </ul>`
);
console.log('✓ Category sidebar updated to clinical categories');

/* ════════════════════════════════════════════════
   6. Clinical Breakthroughs slider (rd-product section)
      Update the slider items with real clinical products
   ════════════════════════════════════════════════ */
const newSliderItems = `
                                        <div class="product__slider-item">
                                            <div class="product__slider-img">
                                                <a href="shop-single.html?id=p1"><img src="assets/img/product/Reishi.png" alt="Reishi Immune Guard"></a>
                                                <div class="offer">30% <br><span>off</span></div>
                                            </div>
                                            <div class="product__slider-content text-center">
                                                <ul class="rating-star ul_li_center mr-10">
                                                    <li><i class="fas fa-star"></i></li><li><i class="fas fa-star"></i></li>
                                                    <li><i class="fas fa-star"></i></li><li><i class="fas fa-star"></i></li>
                                                    <li><i class="far fa-star"></i></li>
                                                </ul>
                                                <h3><a href="shop-single.html?id=p1">Aura Reishi Immune Guard</a></h3>
                                                <h4 class="product__price"><span class="new" data-base-price="37800">₦37,800</span><span class="old" data-base-price="45360">₦45,360</span></h4>
                                                <div class="product__progress color-primary progress mt-15">
                                                    <div class="progress-bar" role="progressbar" style="width: 70%" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <div class="ul_li_between">
                                                    <span class="fs-13">Available: <span class="color-black">312</span></span>
                                                    <span class="fs-13">Stock: <span class="color-black">450</span></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="product__slider-item">
                                            <div class="product__slider-img">
                                                <a href="shop-single.html?id=p-gh"><img src="assets/img/product/Golden-Hypha.png" alt="Golden Hypha"></a>
                                                <div class="offer">20% <br><span>off</span></div>
                                            </div>
                                            <div class="product__slider-content text-center">
                                                <ul class="rating-star ul_li_center mr-10">
                                                    <li><i class="fas fa-star"></i></li><li><i class="fas fa-star"></i></li>
                                                    <li><i class="fas fa-star"></i></li><li><i class="fas fa-star"></i></li>
                                                    <li><i class="far fa-star"></i></li>
                                                </ul>
                                                <h3><a href="shop-single.html?id=p-gh">Aura Golden Hypha Cellular</a></h3>
                                                <h4 class="product__price"><span class="new" data-base-price="51000">₦51,000</span><span class="old" data-base-price="61200">₦61,200</span></h4>
                                                <div class="product__progress color-primary progress mt-15">
                                                    <div class="progress-bar" role="progressbar" style="width: 44%" aria-valuenow="44" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <div class="ul_li_between">
                                                    <span class="fs-13">Available: <span class="color-black">95</span></span>
                                                    <span class="fs-13">Stock: <span class="color-black">215</span></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="product__slider-item">
                                            <div class="product__slider-img">
                                                <a href="shop-single.html?id=p9"><img src="assets/img/product/Cardibetter.png" alt="Cardibetter"></a>
                                                <div class="offer">18% <br><span>off</span></div>
                                            </div>
                                            <div class="product__slider-content text-center">
                                                <ul class="rating-star ul_li_center mr-10">
                                                    <li><i class="fas fa-star"></i></li><li><i class="fas fa-star"></i></li>
                                                    <li><i class="fas fa-star"></i></li><li><i class="fas fa-star"></i></li>
                                                    <li><i class="far fa-star"></i></li>
                                                </ul>
                                                <h3><a href="shop-single.html?id=p9">Aura Cardibetter Circulation</a></h3>
                                                <h4 class="product__price"><span class="new" data-base-price="34200">₦34,200</span><span class="old" data-base-price="41040">₦41,040</span></h4>
                                                <div class="product__progress color-primary progress mt-15">
                                                    <div class="progress-bar" role="progressbar" style="width: 65%" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <div class="ul_li_between">
                                                    <span class="fs-13">Available: <span class="color-black">198</span></span>
                                                    <span class="fs-13">Stock: <span class="color-black">311</span></span>
                                                </div>
                                            </div>
                                        </div>`;

// Replace slider items inside the "Clinical Breakthroughs" slider
html = html.replace(
  /(<div class="product__slider tx-arrow">)[\s\S]*?(<\/div>\s*<\/div>\s*<\/div>)/,
  (m, open, close) => open + newSliderItems + '\n                                    ' + close
);
console.log('✓ Clinical Breakthroughs slider updated');

/* ════════════════════════════════════════════════
   7. Update the Recently (rd-product) product list
      This is the large product grid at bottom right of rd-product section
   ════════════════════════════════════════════════ */

// Build 8 recently-added products in the standard row grid
function rdCard(id, img, title, price, oldPrice, reviews, avail, pct, badge) {
  const fmtP = price.toLocaleString();
  const fmtO = oldPrice.toLocaleString();
  const badgeHtml = badge ? `\n                                    <span class="product__badge"><span>${badge}</span></span>` : '';
  return `
                                <div class="col-lg-3 col-md-6 mt-30">
                                    <div class="product__item style-2 wow fadeInUp">
                                        <div class="product__img text-center pos-rel">
                                            <a href="shop-single.html?id=${id}"><img src="assets/img/product/${img}" alt="${title}"></a>
                                        </div>
                                        <div class="product__content">
                                            <div class="product__review ul_li">
                                                <ul class="rating-star ul_li mr-10">
                                                    <li><i class="fas fa-star"></i></li>
                                                    <li><i class="fas fa-star"></i></li>
                                                    <li><i class="fas fa-star"></i></li>
                                                    <li><i class="fas fa-star"></i></li>
                                                    <li><i class="far fa-star"></i></li>
                                                </ul>
                                                <span>(${reviews}) Review</span>
                                            </div>
                                            <h2 class="product__title"><a href="shop-single.html?id=${id}">${title}</a></h2>
                                            <span class="product__available">Available: <span>${avail}</span></span>
                                            <div class="product__progress progress color-primary">
                                                <div class="progress-bar" role="progressbar" style="width: ${pct}%" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <h4 class="product__price"><span class="new" data-base-price="${price}">₦${fmtP}</span><span class="old" data-base-price="${oldPrice}">₦${fmtO}</span></h4>
                                        </div>
                                        <div class="product__action-wrap">
                                            <span class="plus-icon"><i class="fal fa-plus"></i></span>
                                            <ul class="product__action2">
                                                <li><a href="#!"><i class="far fa-compress-alt"></i></a></li>
                                                <li><a href="#!" onclick="addToCart('${id}','${title}',${price},'assets/img/product/${img}')"><i class="far fa-shopping-basket"></i></a></li>
                                                <li><a href="#!"><i class="far fa-heart"></i></a></li>
                                            </ul>
                                        </div>${badgeHtml}
                                    </div>
                                </div>`;
}

const recentlyProducts = [
  rdCard('p-gast','Gastrifort.png',       'Aura Gastrifort Gastro Shield',    44400, 53280, '1,044', '133', 61, 'New'),
  rdCard('p29',   'MEMORY-247.png',       'Aura Memory 24/7 Neuro Support',   33600, 40320, '988',   '212', 55, ''),
  rdCard('p-gyn', 'VITAGENT.png',         'Aura Gynapharm Women Protocol',     39600, 47520, '531',   '144', 52, 'New'),
  rdCard('p-ec',  'Gastrifort.png',       'Aura Eve Comfort Feminine Care',    29880, 35856, '678',   '155', 58, ''),
  rdCard('p-grp', 'Magilim.png',          'Aura Grapemin-E Skin Antioxidant',  33600, 40320, '1,287', '322', 78, ''),
  rdCard('p-qp',  'Diawell.png',          'Aura Qinghao Immune Pack',          10680, 12816, '1,567', '389', 77, ''),
  rdCard('p-ref', 'Gastrifort.png',       'Aura Refresh Tea Daily Cleanse',    15600, 18720, '1,677', '412', 80, 'New'),
  rdCard('p-sal', 'Gastrifort.png',       'Aura Salud Herbal Detox',           19500, 23400, '876',   '201', 62, ''),
].join('');

// Replace recently products grid (the col-lg-6 product grid section after the slider+banners)
html = html.replace(
  /(<div class="col-lg-6 mt-30">[\s\S]*?<div class="row mt-none-30">)[\s\S]*?(<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<!-- rd product end)/,
  (m, open, close) => open + recentlyProducts + '\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <!-- rd product end'
);
console.log('✓ Recently Added products section updated');

/* ─── Save ─── */
fs.writeFileSync(FILE, html, 'utf8');
console.log('\n✅ index.html — Part 2 updates complete!');

// Summary
const lines = html.split('\n').length;
console.log(`📊 Final file: ${lines} lines`);
