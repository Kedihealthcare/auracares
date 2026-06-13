const fs = require('fs');
const path = require('path');

const targetFiles = [
    'Farforlife.html',
    'kedi.html',
    'home-3.html',
    'news-single.html'
];

const kediProducts = [
    { name: 'Reishi Capsule', price: '0.00008107π', category: 'Immune Care' },
    { name: 'Revive Capsule', price: '0.00007823π', category: 'Vitality' },
    { name: 'Golden Six', price: '0.00003566π', category: 'Organ Support' },
    { name: 'Cardibetter', price: '0.00007260π', category: 'Cardiovascular' },
    { name: 'Magilim', price: '0.00004589π', category: 'Weight Mgmt' },
    { name: 'Gastrifort', price: '0.00004076π', category: 'Digestive' },
    { name: 'Jointeez', price: '0.00003566π', category: 'Bone & Joint' },
    { name: 'Vigor Essential', price: '0.00005307π', category: 'Men\'s Health' },
    { name: 'Constilease', price: '0.00008107π', category: 'Digestive' },
    { name: 'Cordy Active', price: '0.00006756π', category: 'Vitality' },
    { name: 'Eye Beta', price: '0.00005095π', category: 'Vision' },
    { name: 'Qinghao', price: '0.00002267π', category: 'Anti-Malaria' },
    { name: 'Haemocare', price: '0.00005095π', category: 'Blood Support' },
    { name: 'Blood Circulatory Machine', price: '0.00132459π', category: 'Equipment' },
    { name: 'Hydrogen Cup', price: '0.000216521π', category: 'Equipment' }
];

const catalogSection = `
            <!-- ======= FULL CLINICAL CATALOG ======= -->
            <section class="clinical-catalog pt-90 pb-90 bg-white">
                <div class="container">
                    <div class="section-title text-center mb-60">
                        <h2 class="title" style="font-size: 3rem; font-weight: 900; color: #4d231c;">Kedi <span style="color: #d4a017;">Healthcare</span> Master Catalog</h2>
                        <p>Complete clinical protocol range denominated in Pi (π)</p>
                    </div>
                    <div class="row">
                        ${kediProducts.map(p => `
                        <div class="col-xl-3 col-lg-4 col-md-6 mb-30">
                            <div class="product-catalog-item" style="border: 1px solid #eee; border-radius: 20px; padding: 25px; text-align: center; transition: 0.3s; height: 100%;">
                                <div class="category" style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 2px; color: #d4a017; font-weight: 900; margin-bottom: 10px;">${p.category}</div>
                                <h3 style="font-size: 1.2rem; font-weight: 800; color: #4d231c; margin-bottom: 15px;">${p.name}</h3>
                                <div class="price" style="font-size: 1.1rem; color: #25d366; font-weight: 900;">${p.price}</div>
                                <a href="shop-single.html" class="thm-btn thm-btn__2" style="margin-top: 20px; width: 100%; border-radius: 50px; font-size: 0.8rem;">Clinical Details</a>
                            </div>
                        </div>
                        `).join('')}
                    </div>
                </div>
            </section>
`;

const communitySections = `
            <!-- ======= COMMUNITY SECTIONS START ======= -->
            <!-- ======= PROMO & OFFERS ======= -->
            <section class="promo-offers pt-80 pb-60 bg-[#f9f9f9]">
                <div class="container">
                    <div class="section-title text-center mb-50">
                        <h2 class="title" style="font-size: 2.5rem; font-weight: 800; color: #4d231c;">Kedi <span style="color: #d4a017;">Promotions</span> & Awards</h2>
                        <p>Special recognition and limited time protocols for our global community</p>
                    </div>
                    <div class="row">
                        <div class="col-lg-4 col-md-6 mb-30">
                            <div class="promo-card" style="border-radius: 20px; overflow: hidden; box-shadow: 0 15px 35px rgba(0,0,0,0.1); background: white; transition: 0.3s;">
                                <div class="thumb" style="height: 250px; overflow: hidden;">
                                    <img src="assets/img/promo/kedi-2026-award.jpg" alt="Kedi Award" style="width: 100%; height: 100%; object-fit: cover;">
                                </div>
                                <div class="content p-4 text-center">
                                    <h3 style="font-weight: 800; color: #4d231c;">Global Excellence Award</h3>
                                    <p>Recognizing top protocol contributors for 2026</p>
                                    <a href="#!" class="thm-btn" style="margin-top: 15px; padding: 10px 25px;">Learn More</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 mb-30">
                            <div class="promo-card" style="border-radius: 20px; overflow: hidden; box-shadow: 0 15px 35px rgba(0,0,0,0.1); background: white; transition: 0.3s;">
                                <div class="thumb" style="height: 250px; overflow: hidden;">
                                    <img src="assets/img/promo/kedi-promo-2.jpg" alt="Protocol Promo" style="width: 100%; height: 100%; object-fit: cover;">
                                </div>
                                <div class="content p-4 text-center">
                                    <h3 style="font-weight: 800; color: #4d231c;">Immune Guard Protocol</h3>
                                    <p>Get 15% off Reishi and Revive pairings this month</p>
                                    <a href="#!" class="thm-btn" style="margin-top: 15px; padding: 10px 25px;">Redeem Now</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 mb-30">
                            <div class="promo-card" style="border-radius: 20px; overflow: hidden; box-shadow: 0 15px 35px rgba(0,0,0,0.1); background: white; transition: 0.3s;">
                                <div class="thumb" style="height: 250px; overflow: hidden;">
                                    <img src="assets/img/promo/kedi-promo-3.jpg" alt="Flash Sale" style="width: 100%; height: 100%; object-fit: cover;">
                                </div>
                                <div class="content p-4 text-center">
                                    <h3 style="font-weight: 800; color: #4d231c;">Vitality Flash Sale</h3>
                                    <p>Limited π offers on Golden Six and Vigor protocols</p>
                                    <a href="#!" class="thm-btn thm-btn__black" style="margin-top: 15px; padding: 10px 25px;">Shop Sale</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ======= COMMUNITY BUZZ & SOCIAL FEED ======= -->
            <section class="community-buzz pt-80 pb-80" style="background: white;">
                <div class="container">
                    <div class="row">
                        <!-- Community Buzz -->
                        <div class="col-lg-6 mb-40">
                            <div class="buzz-header mb-30 d-flex justify-content-between align-items-center">
                                <div>
                                    <h2 style="font-size: 2rem; font-weight: 900; color: #4d231c;"><i class="fas fa-users" style="color: #d4a017;"></i> Community Buzz</h2>
                                    <p>Real-time updates from our clinical wellness network (5,000+ active)</p>
                                </div>
                            </div>
                            <div id="dynamic-buzz-container" style="background: #fdf8f6; padding: 30px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); font-size: 1.2rem; font-weight: 700; color: #4d231c; transition: 0.5s; min-height: 100px; display: flex; align-items: center; border-left: 10px solid #d4a017;">
                                <i class="fas fa-sync fa-spin"></i> Initializing Buzz Stream...
                            </div>
                        </div>

                        <!-- Social Feed -->
                        <div class="col-lg-6 mb-40">
                            <div class="social-header mb-30">
                                <h2 style="font-size: 2rem; font-weight: 900; color: #4d231c;"><i class="fas fa-globe" style="color: #d4a017;"></i> Social Proof</h2>
                                <p>10,000+ Verified Clinical Experiences</p>
                            </div>
                            <div id="social-feed-container">
                                <!-- Feeds injected by community-engine.js -->
                            </div>
                            <div id="social-pagination" class="mt-30 text-center d-flex justify-content-center align-items-center gap-2">
                                <!-- Pagination injected by community-engine.js -->
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- ======= COMMUNITY SECTIONS END ======= -->
`;

const seoSchema = `
    <!-- ======= KEDI CLINICAL SEO TOOLS ======= -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "MedicalOrganization",
      "name": "Kedi Healthcare Clinical Global",
      "alternateName": "Kedi-J Clinical",
      "url": "https://www.kedihealth.com",
      "logo": "https://www.kedihealth.com/assets/img/logo/logo.svg",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+234-901-509-2132",
        "contactType": "customer service",
        "areaServed": "NG",
        "availableLanguage": "en"
      },
      "sameAs": [
        "https://www.facebook.com/kedihealthcare",
        "https://www.instagram.com/kedihealth"
      ]
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": [
        ${kediProducts.map((p, i) => `{
          "@type": "ListItem",
          "position": ${i + 1},
          "name": "${p.name}",
          "url": "https://www.kedihealth.com/shop-single.html"
        }`).join(',')}
      ]
    }
    </script>
`;

const clinicalMeta = `
    <!-- ======= KEDI CLINICAL META ======= -->
    <meta name="keywords" content="Kedi Healthcare, Kedi-J, Clinical Protocols, Reishi Capsule, Revive Capsule, Golden Six, Cardiovascular Health, Immune System Support, Pi Network E-commerce, Herbal Medicine Nigeria">
    <meta name="author" content="Kedi Healthcare Clinical">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Kedi Healthcare">
`;

targetFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Inject Community Section (Clean old ones first if any)
    if (content.includes('<!-- ======= COMMUNITY SECTIONS START ======= -->')) {
        const start = content.indexOf('<!-- ======= COMMUNITY SECTIONS START ======= -->');
        const end = content.indexOf('<!-- ======= COMMUNITY SECTIONS END ======= -->') + '<!-- ======= COMMUNITY SECTIONS END ======= -->'.length;
        content = content.slice(0, start) + communitySections + content.slice(end);
    } else if (content.includes('<!-- footer start -->')) {
        content = content.replace('<!-- footer start -->', communitySections + '\n        <!-- footer start -->');
    }

    // 2. Inject Catalog Section
    if (!content.includes('<!-- ======= FULL CLINICAL CATALOG ======= -->')) {
        if (content.includes('<!-- ======= COMMUNITY SECTIONS START ======= -->')) {
            content = content.replace('<!-- ======= COMMUNITY SECTIONS START ======= -->', catalogSection + '\n' + '<!-- ======= COMMUNITY SECTIONS START ======= -->');
        } else if (content.includes('<!-- footer start -->')) {
            content = content.replace('<!-- footer start -->', catalogSection + '\n        <!-- footer start -->');
        }
    }

    // 3. Inject SEO Tools
    if (!content.includes('<!-- ======= KEDI CLINICAL SEO TOOLS ======= -->')) {
        content = content.replace('</head>', seoSchema + '\n</head>');
    }

    // 4. Inject Clinical Meta
    if (!content.includes('<!-- ======= KEDI CLINICAL META ======= -->')) {
        content = content.replace('</head>', clinicalMeta + '\n</head>');
    }

    // 5. Inject Community Engine Script
    if (!content.includes('assets/js/community-engine.js')) {
        content = content.replace('</body>', '<script src="assets/js/community-engine.js"></script>\n</body>');
    }

    fs.writeFileSync(filePath, content);
    console.log(`Final Kedi injection completed for ${file}`);
});
