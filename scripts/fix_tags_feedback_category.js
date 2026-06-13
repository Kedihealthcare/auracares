const path = require('path');
const fs = require('fs');

// ─── CLINICAL DATA ────────────────────────────────────────────────────────────

const clinicalTags = [
  'Reishi', 'Revive', 'Immune Defense', 'Metabolic Reset',
  'Cardibetter', 'Golden Six', 'Cellular Detox', 'Herbal Protocol',
  'Bone & Joint', 'Hormonal Balance', 'Renal Support', 'TCM'
];

const clinicalFeedbacks = [
  { name: 'Amaka O.', role: 'Verified Patient', text: 'After 3 months on the Golden Six protocol, my kidney function improved dramatically. My nephrologist was amazed — my creatinine levels dropped by 40%. I feel renewed.' },
  { name: 'Chukwuemeka B.', role: 'Franchise Partner', text: 'Cardibetter changed everything for my father. His blood pressure is now consistently stable without synthetic medication. The π-payment system makes it accessible to our entire community.' },
  { name: 'Fatima A.', role: 'Clinical Member', text: 'I was skeptical at first, but after following the Reishi immune protocol for 6 weeks, my chronic fatigue completely resolved. I have my life back. Highly recommend Kedi Healthcare (Kedi-J).' },
  { name: 'Ibrahim D.', role: 'Health Advocate', text: 'The Revive protocol helped my metabolism reset after years of blood sugar issues. The AI diagnostic tool pinpointed exactly what I needed before I even spoke to a doctor.' }
];

const clinicalCategories = [
  { title: 'Immune Defense', desc: 'TCM protocols for immune resilience and cellular fortification.' },
  { title: 'Metabolic Reset', desc: 'Precision herbals for blood sugar, insulin sensitivity and weight management.' },
  { title: 'Cardiovascular', desc: 'Bio-actives for cardiac muscle strength and micro-circulation.' },
  { title: 'Bone & Joint Care', desc: 'Natural compounds for skeletal integrity and joint lubrication.' },
  { title: 'Reproductive Health', desc: 'Hormonal balance and fertility support for men and women.' },
  { title: 'Cellular Detox', desc: 'Deep systemic cleansing protocols for organ restoration.' }
];

const sidebarCategories = [
  'Immune Defense', 'Metabolic Reset', 'Bone & Joint',
  'Cardiovascular', 'Reproductive Health', 'Cellular Detox',
  'For Men', 'For Women', 'Hormonal Balance'
];

const tabLabels = ['Recent', 'Best Seller', 'Immunity', 'Metabolic', 'Vitality'];

// ─── BUILDERS ─────────────────────────────────────────────────────────────────

function buildFeedbackBlock() {
  const items = clinicalFeedbacks.map(f => `
                                            <div class="feedback__content">
                                                <div class="feedback__head mb-20">
                                                    <span>${f.role}</span>
                                                    <h4>${f.name}</h4>
                                                </div>
                                                <p>${f.text}</p>
                                            </div>`).join('');

  const navImgs = ['img_01', 'img_03', 'img_04', 'img_01'].map(img => `
                                            <div class="feedback__img">
                                                <img src="assets/img/avatar/${img}.jpg" alt="">
                                            </div>`).join('');

  return `<div class="tx-widget mt-30">
                                    <h2 class="section-heading mb-20">
                                        <span>Patient Testimonials</span>
                                    </h2>
                                    <div class="feedback__slider">
                                        <div class="feedback__carousel">${items}
                                        </div>
                                        <div class="feedback__nav">${navImgs}
                                        </div>
                                    </div>
                                </div>`;
}

function buildTagsBlock() {
  const tags = clinicalTags.map(t => `<a href="shop.html">${t}</a>`).join('\n                                        ');
  return `<div class="tx-widget mt-30">
                                    <h2 class="section-heading mb-20">
                                        <span>Clinical Tags</span>
                                    </h2>
                                    <div class="tagcloud">
                                        ${tags}
                                    </div>
                                </div>`;
}

// ─── FIX FUNCTIONS ────────────────────────────────────────────────────────────

function fixHome3(html) {
  // 1. Fix Feedback section (lorem ipsum → clinical testimonials)
  html = html.replace(
    /<div class="tx-widget mt-30">\s*<h2 class="section-heading mb-20">\s*<span>Feedback<\/span>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/,
    buildFeedbackBlock()
  );

  // 2. Fix Tags (electronics brands → clinical tags)
  html = html.replace(
    /<div class="tx-widget mt-30">\s*<h2 class="section-heading mb-20">\s*<span>Tags<\/span>[\s\S]*?<\/div>\s*<\/div>/,
    buildTagsBlock()
  );

  // 3. Fix legacy banner text (Car repair → Kedi clinical)
  html = html.replace(
    /<span>Expert mechanic<\/span>\s*<h2>Repair Car Perfectly[\s\S]*?Make enquiry[\s\S]*?<\/a>/,
    `<span>Wellness Authority</span>
                                    <h2>Restore Your Health <br> With Clinical Precision</h2>
                                    <p>Precision TCM protocols clinically validated for metabolic, immune, and cellular restoration.</p>
                                    <a href="shop.html">Explore Protocols <i class="far fa-long-arrow-right"></i></a>`
  );

  // 4. Fix the second legacy banner text
  html = html.replace(
    /Get Save 30% off<\/span>\s*<h3 class="text-capitalize fw-500">Cloud Cam[^<]*<br>[^<]*<\/h3>/,
    `Get Save 30% off</span>\n                                         <h3 class="text-capitalize fw-500">Kedi Clinical <br>Protocols</h3>`
  );

  // 5. Fix product tab labels (Engine/Transmission/Battery → clinical)
  const legacyTabs = [
    ['Engine', 'Recent'],
    ['Transmission', 'Best Seller'],
    ['Battery', 'Immunity'],
    ['Radiator', 'Metabolic'],
    ['Fuel Tank', 'Vitality']
  ];
  legacyTabs.forEach(([old, rep]) => {
    html = html.replace(new RegExp(`<button([^>]+?)>${old}<\/button>`, 'g'), `<button$1>${rep}</button>`);
  });

  return html;
}

function fixFarforlife(html) {
  // 1. Fix sidebar category list (motorbike parts → clinical domains)
  html = html.replace(
    /<h2 class="section-heading mb-40"><span><span>Catagory<\/span><\/span><\/h2>\s*<ul class="list-unstyled">[\s\S]*?<\/ul>/,
    `<h2 class="section-heading mb-40"><span><span>Categories</span></span></h2>
                                <ul class="list-unstyled">
                                    ${sidebarCategories.map(c => `<li class="cat-item-has-children"><a href="shop.html">${c}</a></li>`).join('\n                                    ')}
                                </ul>`
  );

  // 2. Fix "Motorbike parts (new)" section heading
  html = html.replace(
    /<h2 class="section-heading"><span>Motorbike parts <span>\(new\)<\/span><\/span><\/h2>/,
    `<h2 class="section-heading"><span>Clinical <span>Protocols (New)</span></span></h2>`
  );

  // 3. Fix tab labels (Engine/Transmission etc → clinical)
  const legacyTabs = [
    ['Engine', 'Immune'],
    ['Transmission', 'Metabolic'],
    ['Battery', 'Vitality'],
    ['Radiator', 'Cardiac'],
    ['Fuel Tank', 'Detox']
  ];
  legacyTabs.forEach(([old, rep]) => {
    html = html.replace(new RegExp(`<button([^>]+?)>${old}<\/button>`, 'g'), `<button$1>${rep}</button>`);
  });

  // 4. Fix product category card titles (welding stud / car engine / engines muffler etc)
  const titleReplacements = [
    ['welding stud welding', 'Immune Defense'],
    ['car automotive engine', 'Metabolic Reset'],
    ['engines muffler two', 'Cardiovascular'],
    ['air suspension car', 'Bone & Joint'],
    ['brake pad wheel', 'Reproductive Health'],
    ['Smartphone & Tablet', 'Cellular Detox']
  ];
  titleReplacements.forEach(([old, rep]) => {
    html = html.replace(
      new RegExp(`<h3 class="title">${old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}<\/h3>`, 'g'),
      `<h3 class="title">${rep}</h3>`
    );
  });

  // 5. Fix "Product Catagories" heading
  html = html.replace(
    /<h2 class="section-heading mb-25"><span>Product Catagories<\/span><\/h2>/,
    `<h2 class="section-heading mb-25"><span>Product Categories</span></h2>`
  );

  // 6. Fix "Choose Catagory" heading
  html = html.replace(
    /<h2 class="product-category__title">Choose Catagory<\/h2>/g,
    `<h2 class="product-category__title">Browse Categories</h2>`
  );

  // 7. Fix the sidebar add-banner legacy car/mechanic text
  html = html.replace(
    /general motors buick[\s\S]*?sonic engine/,
    `Kedi Healthcare <br> Clinical Protocols`
  );
  html = html.replace(
    /\$ 18560\.99/,
    `Starting from 0.00001π`
  );

  // 8. Fix legacy banner (Repair Car / Expert mechanic)
  html = html.replace(
    /<span>Expert mechanic<\/span>\s*<h3>Repair Car Perfectly[\s\S]*?Make enquiry[\s\S]*?<\/a>/,
    `<span>Clinical Authority</span>
                            <h3>Restore Cellular Health <br> With Kedi Protocols</h3>
                            <p>Precision Traditional Chinese Medicine for lasting systemic wellness.</p>
                            <a class="hero__btn" href="shop.html">Explore Protocols <i class="far fa-long-arrow-right"></i></a>`
  );

  // 9. Fix "Beats Flex Farforlife" remnant title
  html = html.replace(
    /<h2 class="product__title"><a href="shop-single\.html">Beats Flex Farforlife<\/a><\/h2>/g,
    `<h2 class="product__title"><a href="shop-single.html">Vitaprego Pro</a></h2>`
  );

  // 10. Fix lingering "$28.52" prices in Farforlife
  html = html.replace(/\(\s*\$28\.52\s*-\s*/g, '( ');

  return html;
}

// ─── EXECUTE ──────────────────────────────────────────────────────────────────

['home-3.html', 'Farforlife.html'].forEach(file => {
  let html = fs.readFileSync(file, 'utf8');

  if (file === 'home-3.html') html = fixHome3(html);
  if (file === 'Farforlife.html') html = fixFarforlife(html);

  fs.writeFileSync(file, html, 'utf8');
  console.log(`✅  Fixed: ${file}`);
});

console.log('\nAll tags, feedbacks, and categories have been updated to Kedi clinical content.');
