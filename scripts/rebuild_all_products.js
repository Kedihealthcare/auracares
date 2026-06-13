const path = require('path');
const __dirname_root = path.join(__dirname, '..');
const fs = require('fs');
const dir = __dirname_root;
const templateHTML = fs.readFileSync(path.join(dir, 'franchise.html'), 'utf8');
const headerMatch = templateHTML.match(/([\s\S]*?)<main>/);
const header = headerMatch ? headerMatch[1].replace('<head>', '<head>\n<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://cdnjs.cloudflare.com">\n<style>img { content-visibility: auto; }</style>') : '';
const footerMatch = templateHTML.match(/<\/main>([\s\S]*)/);
const footer = footerMatch ? footerMatch[1] : '';

// Comprehensive Kedi Catalog
const products = [
    { id: "reishi", name: "Kedi Reishi", category: "Immunity Boost", price: 35000, oldPrice: 42000, tagline: "The Mushroom of Immortality", rating: 4.9, reviews: 2450, image: "assets/img/product/Reishi.png", desc: "Advanced biotechnology extraction of Ganoderma Lucidum. Fortify your immune system and combat viral infections.", benefits: ["Enhances Immunity", "Anti-viral properties", "Liver protection", "Anti-aging cellular repair"], buzz: [{ name: "Dr. Adebayo", comment: "The clinical response in patients using Reishi for immune modulation is outstanding." }, { name: "Sarah O.", comment: "Since I started Reishi, my energy levels are up!" }] },
    { id: "diawell", name: "Kedi Diawell", category: "Glycemic Balance", price: 25000, oldPrice: 30000, tagline: "Natural Metabolic Control", rating: 4.8, reviews: 1890, image: "assets/img/product/Diawell.png", desc: "A specialized herbal protocol designed to support healthy glucose metabolism.", benefits: ["Regulates Blood Sugar", "Improves Pancreas Function", "Reduces Sugar Craving", "Prevents Complications"], buzz: [{ name: "Ibrahim M.", comment: "Diawell helped stabilize my readings." }, { name: "Nurse Chioma", comment: "Highly recommended for patients." }] },
    { id: "magilim", name: "Kedi Magilim", category: "Weight Management", price: 22500, oldPrice: 28000, tagline: "Metabolic Fat Burner", rating: 4.7, reviews: 3120, image: "assets/img/product/Magilim.png", desc: "Support healthy weight loss, lower cholesterol, and maintain digestive regularity.", benefits: ["Burns Stubborn Fat", "Lowers Cholesterol", "Detoxifies the Body", "Suppresses Appetite"], buzz: [{ name: "Grace T.", comment: "Lost 5kg in my first month!" }, { name: "Fitness Hub", comment: "The best natural fat binder." }] },
    { id: "revive", name: "Kedi Re-Vive", category: "Male Vitality", price: 39000, oldPrice: 45000, tagline: "Ultimate Male Performance", rating: 4.9, reviews: 5600, image: "assets/img/product/Revive.png", desc: "Premium herbal formula for male sexual health. Enhances stamina and boosts libido.", benefits: ["Treats Erectile Dysfunction", "Prolongs Performance", "Increases Sperm Count", "Boosts Stamina"], buzz: [{ name: "Anonymous", comment: "Re-Vive saved my marriage." }, { name: "Chief Kenneth", comment: "Pure, natural energy and performance." }] },
    { id: "golden-six", name: "Kedi Golden Six", category: "Kidney & Reproductive", price: 21000, oldPrice: 25000, tagline: "Yin Nourishing Essence", rating: 4.8, reviews: 4200, image: "assets/img/product/Golden Six.png", desc: "Classical TCM formulation to nourish Kidney Yin. Excellent for female fertility.", benefits: ["Treats Female Infertility", "Relieves Cramps", "Supports Kidney Function", "Alleviates Menopausal Symptoms"], buzz: [{ name: "Mrs. Nkiru", comment: "Regulated my cycle and I finally conceived!" }, { name: "Dr. Olayinka", comment: "A staple in traditional gynaecology." }] },
    { id: "cardibetter", name: "Kedi Cardibetter", category: "Cardiovascular Health", price: 32000, oldPrice: 38000, tagline: "Heart & Blood Vessel Support", rating: 4.9, reviews: 1540, image: "assets/img/product/Cardibetter.png", desc: "Improves heart function, enhances micro-circulation, and helps clear blocked blood vessels.", benefits: ["Improves Blood Circulation", "Relieves Chest Pain", "Protects against Heart Attacks", "Manages Hypertension"], buzz: [{ name: "Alhaji Musa", comment: "Chest pains reduced significantly." }, { name: "Cardio Clinic", comment: "Excellent for managing hypertension." }] },
    { id: "v-ca", name: "Kedi V-Ca", category: "Essential Nutrients", price: 15000, oldPrice: 18000, tagline: "Effervescent Vitamin C & Calcium", rating: 4.7, reviews: 8900, image: "assets/img/product/V-Ca.png", desc: "Fast-absorbing effervescent tablet for daily immunity, strong bones, and radiant skin.", benefits: ["Builds Strong Bones", "Boosts Daily Immunity", "Enhances Skin", "Fast Absorption"], buzz: [{ name: "Bisi A.", comment: "My kids love the taste!" }, { name: "Healthy Living", comment: "The fastest way to get your daily calcium." }] },
    { id: "colon-cleanser", name: "Kedi Colon Cleanser Tea", category: "Detoxification", price: 18000, oldPrice: 22000, tagline: "Digestive Reset", rating: 4.6, reviews: 2100, image: "assets/img/product/Colon cleanser tea.png", desc: "Cleanses the colon and gastrointestinal tract to improve nutrient absorption and eliminate toxins.", benefits: ["Relieves Constipation", "Detoxifies Colon", "Improves Digestion", "Reduces Bloating"], buzz: [{ name: "John D.", comment: "Felt lighter after just 3 days." }, { name: "Wellness Center", comment: "A core part of our detox protocol." }] },
    { id: "refresh-tea", name: "Kedi Refresh Tea", category: "Daily Wellness", price: 16000, oldPrice: 19000, tagline: "Antioxidant Rich", rating: 4.8, reviews: 3400, image: "assets/img/product/Refresh tea.png", desc: "Clear your vision, soothe your throat, and protect your body with powerful antioxidants.", benefits: ["Improves Eyesight", "Soothes Throat", "Rich in Antioxidants", "Calms the Mind"], buzz: [{ name: "Mr. Kunle", comment: "My morning ritual. Keeps my eyes sharp." }, { name: "Tech Worker", comment: "Helps with screen fatigue." }] },
    { id: "lirich", name: "Kedi Lirich", category: "Liver Health", price: 24000, oldPrice: 28000, tagline: "Hepatic Protection", rating: 4.8, reviews: 1120, image: "assets/img/product/Lirich.png", desc: "Nourishes the liver, clears toxic heat, and improves overall hepatic function.", benefits: ["Protects Liver Cells", "Clears Toxins", "Supports Metabolism", "Reduces Fatty Liver Risk"], buzz: [{ name: "Anon", comment: "My liver enzymes improved in 2 months." }, { name: "Dr. Sam", comment: "Potent hepatoprotective properties." }] },
    { id: "lycovite", name: "Kedi Lycovite", category: "Prostate & Cellular Health", price: 26000, oldPrice: 31000, tagline: "Lycopene Powerhouse", rating: 4.9, reviews: 2750, image: "assets/img/product/Lycovite.png", desc: "High concentration of lycopene to support prostate health and provide strong antioxidant protection.", benefits: ["Supports Prostate Health", "Potent Antioxidant", "Protects DNA", "Anti-tumor properties"], buzz: [{ name: "Elder Joseph", comment: "Urinary flow improved vastly." }, { name: "Urology Clinic", comment: "Excellent adjunct for BPH." }] },
    { id: "vigor-essential", name: "Kedi Vigor Essential", category: "Immunity Boost", price: 28000, oldPrice: 34000, tagline: "Cellular Vitality", rating: 4.7, reviews: 1430, image: "assets/img/product/Vigor essential.png", desc: "A powerful blend of anti-aging and vitality-boosting herbs for overall resilience.", benefits: ["Reduces Fatigue", "Anti-aging", "Boosts Vitality", "Strengthens Immunity"], buzz: [{ name: "Mrs. K", comment: "I feel 10 years younger." }, { name: "Fitness Coach", comment: "Great for post-workout recovery." }] },
    { id: "golden-hypha", name: "Kedi Golden Hypha", category: "Immunity Boost", price: 42000, oldPrice: 48000, tagline: "Advanced Immune Defense", rating: 4.9, reviews: 980, image: "assets/img/product/Golden hypha.png", desc: "Top-tier immune support designed to combat chronic conditions and promote tumor shrinking.", benefits: ["Shrinks Tumors", "Combats Chronic Illness", "Boosts White Blood Cells", "Reduces Chemo Side Effects"], buzz: [{ name: "Patient A", comment: "Helped me recover faster from treatment." }, { name: "Oncology Support", comment: "Incredible immune modulator." }] },
    { id: "haemocare", name: "Kedi Haemocare", category: "Blood Building", price: 21000, oldPrice: 25000, tagline: "Iron & Blood Vitality", rating: 4.8, reviews: 2200, image: "assets/img/product/Haemocare.png", desc: "Rapidly builds red blood cells and improves hemoglobin levels naturally.", benefits: ["Treats Anemia", "Increases Hemoglobin", "Reduces Dizziness", "Improves Oxygen Transport"], buzz: [{ name: "Maternity Ward", comment: "We recommend this post-delivery." }, { name: "Joy F.", comment: "My energy is back completely." }] },
    { id: "constilease", name: "Kedi Constilease", category: "Detoxification", price: 19000, oldPrice: 23000, tagline: "Smooth Bowel Movement", rating: 4.7, reviews: 1650, image: "assets/img/product/Constilease.png", desc: "Natural relief for chronic constipation. Lubricates the intestines without cramping.", benefits: ["Relieves Constipation", "Lubricates Intestines", "Clears Toxins", "Improves Skin Complexion"], buzz: [{ name: "Paul", comment: "Gentle and effective. No stomach pain." }, { name: "Clinic", comment: "Safe for elderly patients." }] }
];

// UPSELL LOGIC ENGINE
function getUpsells(currentProductId, category) {
    // Recommend 3 products from the same or complementary categories, excluding the current product
    let upsells = products.filter(p => p.id !== currentProductId && (p.category === category || p.category === "Immunity Boost" || p.category === "Detoxification")).sort(() => 0.5 - Math.random()).slice(0, 3);
    if(upsells.length < 3) {
        upsells = products.filter(p => p.id !== currentProductId).sort(() => 0.5 - Math.random()).slice(0, 3);
    }
    return upsells;
}

// Generate Product Pages
products.forEach(product => {
    const upsells = getUpsells(product.id, product.category);
    
    const pageHTML = `
<main style="background-color: #f8fafc;">
    <!-- Product Hero Section -->
    <section class="product-hero" style="padding: 120px 0 60px; background: linear-gradient(135deg, #064e3b 0%, #10b981 100%); position: relative; overflow: hidden;">
        <div class="container relative z-10">
            <div class="row align-items-center">
                <div class="col-lg-6 mb-5 mb-lg-0 text-white">
                    <span class="badge" style="background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 30px; font-weight: bold; letter-spacing: 1px; margin-bottom: 20px; display: inline-block;">
                        ${product.category}
                    </span>
                    <h1 style="color: white; font-size: clamp(2.5rem, 5vw, 3.5rem); font-weight: 800; margin-bottom: 15px; line-height: 1.2;">
                        ${product.name}
                    </h1>
                    <h3 style="color: #a7f3d0; font-size: 1.5rem; font-weight: 400; margin-bottom: 30px;">
                        ${product.tagline}
                    </h3>
                    
                    <div class="product-rating" style="display: flex; align-items: center; margin-bottom: 30px; background: rgba(0,0,0,0.2); display: inline-flex; padding: 10px 20px; border-radius: 50px;">
                        <div class="stars" style="color: #fbbf24; font-size: 1.2rem; margin-right: 10px;">
                            <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>
                        </div>
                        <span style="font-weight: 600;">${product.rating} / 5.0</span>
                        <span style="margin-left: 10px; opacity: 0.8;">(${product.reviews.toLocaleString()} verified reviews)</span>
                    </div>

                    <p style="font-size: 1.1rem; line-height: 1.8; opacity: 0.9; margin-bottom: 40px; max-width: 500px;">
                        ${product.desc}
                    </p>

                    <div class="price-action-box" style="background: white; padding: 25px; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.2); display: inline-block;">
                        <div style="display: flex; align-items: flex-end; margin-bottom: 20px;">
                            <span style="font-size: 2.5rem; font-weight: 800; color: #064e3b; line-height: 1;">₦${product.price.toLocaleString()}</span>
                            <span style="font-size: 1.2rem; text-decoration: line-through; color: #94a3b8; margin-left: 15px; margin-bottom: 5px;">₦${product.oldPrice.toLocaleString()}</span>
                        </div>
                        <button class="add-to-cart-btn" onclick="addToCart('${product.id}', '${product.name}', ${product.price}, '${product.image}')" style="background: #10b981; color: white; border: none; padding: 15px 40px; border-radius: 50px; font-weight: bold; font-size: 1.1rem; cursor: pointer; transition: all 0.3s ease; width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px;">
                            <i class="fas fa-shopping-cart"></i> Add to Cart Now
                        </button>
                    </div>
                </div>
                
                <div class="col-lg-6 text-center">
                    <div class="product-image-wrapper" style="position: relative;">
                        <!-- Glow effect -->
                        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 400px; height: 400px; background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%); border-radius: 50%; z-index: 1;"></div>
                        <!-- Speed Opt: Fetchpriority & Eager loading for LCP image -->
                        <img src="${product.image}" alt="${product.name}" fetchpriority="high" loading="eager" style="max-width: 100%; height: auto; position: relative; z-index: 2; filter: drop-shadow(0 30px 40px rgba(0,0,0,0.4)); animation: float 6s ease-in-out infinite;" onerror="this.src='assets/img/product/default.png';">
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Decorative shapes -->
        <div style="position: absolute; bottom: -50px; left: 0; width: 100%; height: 100px; background: #f8fafc; transform: skewY(-2deg); z-index: 5;"></div>
    </section>

    <!-- Key Benefits & Community Buzz -->
    <section class="benefits-buzz-area pt-100 pb-80">
        <div class="container">
            <div class="row">
                <!-- Left: Benefits -->
                <div class="col-lg-6 mb-5 mb-lg-0">
                    <div class="sec-title mb-40">
                        <h2 class="title" style="color: #064e3b; font-weight: 800;">Clinical Benefits</h2>
                        <p>Why ${product.name} is prescribed by top practitioners.</p>
                    </div>
                    <div class="benefits-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                        ${product.benefits.map(benefit => `
                            <div class="benefit-card" style="background: white; padding: 25px; border-radius: 16px; box-shadow: 0 10px 20px rgba(0,0,0,0.05); border-left: 4px solid #10b981; transition: transform 0.3s ease;">
                                <div style="color: #10b981; font-size: 24px; margin-bottom: 15px;"><i class="fas fa-check-circle"></i></div>
                                <h4 style="font-size: 1.1rem; font-weight: 700; color: #1e293b; margin: 0;">${benefit}</h4>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Right: Community Buzz -->
                <div class="col-lg-6">
                    <div class="sec-title mb-40 pl-lg-5">
                        <h2 class="title" style="color: #064e3b; font-weight: 800;">Community Buzz <i class="fas fa-fire" style="color: #f97316;"></i></h2>
                        <p>Real results from the Kedi Healthcare (Kedi-J) community.</p>
                    </div>
                    <div class="buzz-container pl-lg-5">
                        ${product.buzz.map(review => `
                            <div class="buzz-card mb-4" style="background: white; padding: 30px; border-radius: 20px; box-shadow: 0 15px 30px rgba(0,0,0,0.06); position: relative;">
                                <i class="fas fa-quote-left" style="position: absolute; top: 20px; right: 30px; font-size: 40px; color: #f1f5f9; z-index: 1;"></i>
                                <div style="position: relative; z-index: 2;">
                                    <div class="stars mb-2" style="color: #fbbf24; font-size: 0.9rem;">
                                        <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                                    </div>
                                    <p style="font-size: 1.1rem; color: #475569; font-style: italic; margin-bottom: 15px;">"${review.comment}"</p>
                                    <div class="user-info" style="display: flex; align-items: center;">
                                        <div style="width: 40px; height: 40px; background: #e2e8f0; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #64748b; margin-right: 15px;">
                                            ${review.name.charAt(0)}
                                        </div>
                                        <h5 style="margin: 0; font-size: 1rem; font-weight: 700; color: #0f172a;">${review.name}</h5>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                        
                        <div class="text-center mt-4">
                            <span style="display: inline-block; background: #ecfdf5; color: #059669; padding: 8px 16px; border-radius: 30px; font-weight: 600; font-size: 0.9rem;">
                                <i class="fas fa-users mr-2"></i> Join ${product.reviews.toLocaleString()} others thriving today
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Upsell Logic Engine -->
    <section class="upsell-area pt-80 pb-100" style="background: white; border-top: 1px solid #f1f5f9;">
        <div class="container">
            <div class="sec-title text-center mb-50">
                <span class="sub-title">CLINICAL PROTOCOL</span>
                <h2 class="title" style="font-weight: 800; color: #0f172a;">Frequently Prescribed Together</h2>
                <p>Maximize your results by combining ${product.name} with these highly complementary formulas.</p>
            </div>
            <div class="row">
                ${upsells.map(upsell => `
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="upsell-card" style="border: 1px solid #e2e8f0; border-radius: 20px; overflow: hidden; padding: 30px; text-align: center; transition: all 0.3s ease; height: 100%;">
                        <a href="product-${upsell.id}.html">
                            <img src="${upsell.image}" alt="${upsell.name}" loading="lazy" style="height: 180px; object-fit: contain; margin-bottom: 20px; transition: transform 0.3s ease;">
                        </a>
                        <span class="badge" style="background: #ecfdf5; color: #10b981; padding: 5px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; margin-bottom: 15px; display: inline-block;">${upsell.category}</span>
                        <h3 style="font-size: 1.25rem; font-weight: 800; color: #1e293b; margin-bottom: 10px;">
                            <a href="product-${upsell.id}.html" style="color: inherit;">${upsell.name}</a>
                        </h3>
                        <div class="price mb-4" style="font-weight: 800; color: #064e3b; font-size: 1.2rem;">₦${upsell.price.toLocaleString()}</div>
                        <button onclick="addToCart('${upsell.id}', '${upsell.name}', ${upsell.price}, '${upsell.image}')" style="background: white; color: #10b981; border: 2px solid #10b981; padding: 10px 20px; border-radius: 30px; font-weight: 700; width: 100%; cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.background='#10b981'; this.style.color='white';" onmouseout="this.style.background='white'; this.style.color='#10b981';">
                            <i class="fas fa-plus"></i> Add to Protocol
                        </button>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Global Floating Add to Cart (Appears on scroll) -->
    <div class="sticky-cart-bar" style="position: fixed; bottom: 0; left: 0; width: 100%; background: white; padding: 15px 0; box-shadow: 0 -10px 30px rgba(0,0,0,0.1); z-index: 999; transform: translateY(100%); transition: transform 0.3s ease;">
        <div class="container">
            <div class="row align-items-center justify-content-between">
                <div class="col-auto d-flex align-items-center">
                    <img src="${product.image}" alt="" style="width: 50px; height: 50px; object-fit: contain; margin-right: 15px;">
                    <div>
                        <h4 style="margin: 0; font-size: 1.1rem; font-weight: 700; color: #0f172a;">${product.name}</h4>
                        <span style="color: #064e3b; font-weight: 800;">₦${product.price.toLocaleString()}</span>
                    </div>
                </div>
                <div class="col-auto">
                    <button onclick="addToCart('${product.id}', '${product.name}', ${product.price}, '${product.image}')" style="background: #10b981; color: white; border: none; padding: 10px 30px; border-radius: 50px; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    </div>

    <style>
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-15px); } 100% { transform: translateY(0px); } }
        .benefit-card:hover { transform: translateY(-5px) !important; box-shadow: 0 15px 30px rgba(16, 185, 129, 0.1) !important; }
        .upsell-card:hover { border-color: #10b981; box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
        .upsell-card a img:hover { transform: scale(1.05); }
    </style>
    <script>
        window.addEventListener('scroll', function() {
            var stickyBar = document.querySelector('.sticky-cart-bar');
            if(window.scrollY > 400) { stickyBar.style.transform = 'translateY(0)'; } 
            else { stickyBar.style.transform = 'translateY(100%)'; }
        }, {passive: true});
    </script>
</main>
    `;

    const finalHTML = header + pageHTML + footer;
    fs.writeFileSync(path.join(dir, `product-${product.id}.html`), finalHTML);
});
console.log("Rebuilt all 15 products with Upsell Logic Engine and Speed Opts.");
