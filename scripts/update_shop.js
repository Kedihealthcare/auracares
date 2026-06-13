const path = require('path');
const fs = require('fs');

const kediProductsHTML = `
                                        <li class="product">
                                            <div class="product-holder">
                                                <a href="product-template.html?id=reishi"><img src="assets/img/product/Reishi.png" alt="" style="object-fit: cover; max-height: 250px;"></a>
                                                <ul class="product__action">
                                                    <li><a href="#!"><i class="far fa-shopping-basket"></i></a></li>
                                                    <li><a href="#!"><i class="far fa-heart"></i></a></li>
                                                </ul>
                                            </div>
                                            <div class="product-info">
                                                <div class="product__review ul_li">
                                                    <ul class="rating-star ul_li mr-10">
                                                        <li><i class="fas fa-star"></i></li><li><i class="fas fa-star"></i></li><li><i class="fas fa-star"></i></li><li><i class="fas fa-star"></i></li><li><i class="fas fa-star"></i></li>
                                                    </ul>
                                                    <span>(250) Reviews</span>
                                                </div>
                                                <h2 class="product__title"><a href="product-template.html?id=reishi">Reishi Capsules</a></h2>
                                                <span class="product__available">Category: <span>Immunity & Cardio</span></span>
                                                <div class="product__progress progress color-primary">
                                                    <div class="progress-bar" role="progressbar" style="width: 85%" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <h4 class="product__price"><span class="new">₦35,000</span></h4>
                                                <p class="product-description">The 'Mushroom of Immortality'. Boosts immune system, reduces fatigue, and supports cardiovascular health. A potent clinical protocol for overall vitality.</p>
                                            </div>
                                            <span class="product__badge color-2"><span>Bestseller</span></span>
                                        </li>
                                        <li class="product">
                                            <div class="product-holder">
                                                <a href="product-template.html?id=re-vive"><img src="assets/img/product/Revive.png" alt="" style="object-fit: cover; max-height: 250px;"></a>
                                                <ul class="product__action">
                                                    <li><a href="#!"><i class="far fa-shopping-basket"></i></a></li>
                                                    <li><a href="#!"><i class="far fa-heart"></i></a></li>
                                                </ul>
                                            </div>
                                            <div class="product-info">
                                                <div class="product__review ul_li">
                                                    <ul class="rating-star ul_li mr-10">
                                                        <li><i class="fas fa-star"></i></li><li><i class="fas fa-star"></i></li><li><i class="fas fa-star"></i></li><li><i class="fas fa-star"></i></li><li><i class="fas fa-star-half-alt"></i></li>
                                                    </ul>
                                                    <span>(180) Reviews</span>
                                                </div>
                                                <h2 class="product__title"><a href="product-template.html?id=re-vive">Re-Vive Capsules</a></h2>
                                                <span class="product__available">Category: <span>Male Vitality</span></span>
                                                <div class="product__progress progress color-primary">
                                                    <div class="progress-bar" role="progressbar" style="width: 90%" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <h4 class="product__price"><span class="new">₦44,000</span></h4>
                                                <p class="product-description">Premier herbal formula for male vitality, sexual performance, and lasting stamina. Highly recommended for clinical restoration of male vigor.</p>
                                            </div>
                                            <span class="product__badge color-2" style="background:#8b5cf6"><span>Premium</span></span>
                                        </li>
                                        <li class="product">
                                            <div class="product-holder">
                                                <a href="product-template.html?id=cordy-active"><img src="assets/img/product/Cordy Active.png" alt="" style="object-fit: cover; max-height: 250px;"></a>
                                                <ul class="product__action">
                                                    <li><a href="#!"><i class="far fa-shopping-basket"></i></a></li>
                                                    <li><a href="#!"><i class="far fa-heart"></i></a></li>
                                                </ul>
                                            </div>
                                            <div class="product-info">
                                                <div class="product__review ul_li">
                                                    <ul class="rating-star ul_li mr-10">
                                                        <li><i class="fas fa-star"></i></li><li><i class="fas fa-star"></i></li><li><i class="fas fa-star"></i></li><li><i class="fas fa-star"></i></li><li><i class="far fa-star"></i></li>
                                                    </ul>
                                                    <span>(145) Reviews</span>
                                                </div>
                                                <h2 class="product__title"><a href="product-template.html?id=cordy-active">Cordy Active Capsules</a></h2>
                                                <span class="product__available">Category: <span>Stamina & Lungs</span></span>
                                                <div class="product__progress progress color-primary">
                                                    <div class="progress-bar" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <h4 class="product__price"><span class="new">₦25,000</span></h4>
                                                <p class="product-description">Combines Cordyceps and Zinc. Excellent for respiratory health, stamina, and anti-aging. A powerful tool for athletic recovery and lung strength.</p>
                                            </div>
                                        </li>
                                        <li class="product">
                                            <div class="product-holder">
                                                <a href="product-template.html?id=golden-six"><img src="assets/img/product/Golden six.png" alt="" style="object-fit: cover; max-height: 250px;"></a>
                                                <ul class="product__action">
                                                    <li><a href="#!"><i class="far fa-shopping-basket"></i></a></li>
                                                    <li><a href="#!"><i class="far fa-heart"></i></a></li>
                                                </ul>
                                            </div>
                                            <div class="product-info">
                                                <div class="product__review ul_li">
                                                    <ul class="rating-star ul_li mr-10">
                                                        <li><i class="fas fa-star"></i></li><li><i class="fas fa-star"></i></li><li><i class="fas fa-star"></i></li><li><i class="fas fa-star"></i></li><li><i class="fas fa-star"></i></li>
                                                    </ul>
                                                    <span>(210) Reviews</span>
                                                </div>
                                                <h2 class="product__title"><a href="product-template.html?id=golden-six">Golden Six Capsules</a></h2>
                                                <span class="product__available">Category: <span>Kidney & Hormonal</span></span>
                                                <div class="product__progress progress color-primary">
                                                    <div class="progress-bar" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <h4 class="product__price"><span class="new">₦15,500</span></h4>
                                                <p class="product-description">Classic formula for kidney and liver health. Balances hormones and supports blood sugar levels. Essential for female reproductive balance.</p>
                                            </div>
                                        </li>
                                        <li class="product">
                                            <div class="product-holder">
                                                <a href="product-template.html?id=magilim"><img src="assets/img/product/Magilim.png" alt="" style="object-fit: cover; max-height: 250px;"></a>
                                                <ul class="product__action">
                                                    <li><a href="#!"><i class="far fa-shopping-basket"></i></a></li>
                                                    <li><a href="#!"><i class="far fa-heart"></i></a></li>
                                                </ul>
                                            </div>
                                            <div class="product-info">
                                                <div class="product__review ul_li">
                                                    <ul class="rating-star ul_li mr-10">
                                                        <li><i class="fas fa-star"></i></li><li><i class="fas fa-star"></i></li><li><i class="fas fa-star"></i></li><li><i class="fas fa-star"></i></li><li><i class="fas fa-star-half-alt"></i></li>
                                                    </ul>
                                                    <span>(190) Reviews</span>
                                                </div>
                                                <h2 class="product__title"><a href="product-template.html?id=magilim">Magilim Capsules</a></h2>
                                                <span class="product__available">Category: <span>Weight Management</span></span>
                                                <div class="product__progress progress color-primary">
                                                    <div class="progress-bar" role="progressbar" style="width: 70%" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <h4 class="product__price"><span class="new">₦30,000</span></h4>
                                                <p class="product-description">Effective weight management solution. Promotes fat burning and controls appetite naturally. Used heavily in metabolic reset protocols.</p>
                                            </div>
                                            <span class="product__badge color-2" style="background:#f59e0b"><span>Trending</span></span>
                                        </li>
                                        <li class="product">
                                            <div class="product-holder">
                                                <a href="product-template.html?id=gastrifort"><img src="assets/img/product/Gastrifort.png" alt="" style="object-fit: cover; max-height: 250px;"></a>
                                                <ul class="product__action">
                                                    <li><a href="#!"><i class="far fa-shopping-basket"></i></a></li>
                                                    <li><a href="#!"><i class="far fa-heart"></i></a></li>
                                                </ul>
                                            </div>
                                            <div class="product-info">
                                                <div class="product__review ul_li">
                                                    <ul class="rating-star ul_li mr-10">
                                                        <li><i class="fas fa-star"></i></li><li><i class="fas fa-star"></i></li><li><i class="fas fa-star"></i></li><li><i class="fas fa-star"></i></li><li><i class="far fa-star"></i></li>
                                                    </ul>
                                                    <span>(115) Reviews</span>
                                                </div>
                                                <h2 class="product__title"><a href="product-template.html?id=gastrifort">Gastrifort Capsules</a></h2>
                                                <span class="product__available">Category: <span>Digestive Health</span></span>
                                                <div class="product__progress progress color-primary">
                                                    <div class="progress-bar" role="progressbar" style="width: 60%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <h4 class="product__price"><span class="new">₦35,000</span></h4>
                                                <p class="product-description">Premium herbal tonic for gastrointestinal health. Relieves ulcers, gastritis, and chronic indigestion. Coats and protects the stomach lining.</p>
                                            </div>
                                        </li>
                                        <li class="product">
                                            <div class="product-holder">
                                                <a href="product-template.html?id=cello-q10"><img src="assets/img/product/CELLO Q10.jpg" alt="" style="object-fit: cover; max-height: 250px;"></a>
                                                <ul class="product__action">
                                                    <li><a href="#!"><i class="far fa-shopping-basket"></i></a></li>
                                                    <li><a href="#!"><i class="far fa-heart"></i></a></li>
                                                </ul>
                                            </div>
                                            <div class="product-info">
                                                <div class="product__review ul_li">
                                                    <ul class="rating-star ul_li mr-10">
                                                        <li><i class="fas fa-star"></i></li><li><i class="fas fa-star"></i></li><li><i class="fas fa-star"></i></li><li><i class="fas fa-star"></i></li><li><i class="fas fa-star"></i></li>
                                                    </ul>
                                                    <span>(302) Reviews</span>
                                                </div>
                                                <h2 class="product__title"><a href="product-template.html?id=cello-q10">Cello Q10 Capsules</a></h2>
                                                <span class="product__available">Category: <span>Heart & Cardio</span></span>
                                                <div class="product__progress progress color-primary">
                                                    <div class="progress-bar" role="progressbar" style="width: 95%" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <h4 class="product__price"><span class="new">₦45,000</span></h4>
                                                <p class="product-description">Vital for heart health. Supports cellular energy, cardiovascular function, and antioxidant protection. Core clinical protocol for hypertension.</p>
                                            </div>
                                            <span class="product__badge color-2" style="background:#ef4444"><span>Hot</span></span>
                                        </li>
                                        <li class="product">
                                            <div class="product-holder">
                                                <a href="product-template.html?id=jointeez"><img src="assets/img/product/Jointeez.png" alt="" style="object-fit: cover; max-height: 250px;"></a>
                                                <ul class="product__action">
                                                    <li><a href="#!"><i class="far fa-shopping-basket"></i></a></li>
                                                    <li><a href="#!"><i class="far fa-heart"></i></a></li>
                                                </ul>
                                            </div>
                                            <div class="product-info">
                                                <div class="product__review ul_li">
                                                    <ul class="rating-star ul_li mr-10">
                                                        <li><i class="fas fa-star"></i></li><li><i class="fas fa-star"></i></li><li><i class="fas fa-star"></i></li><li><i class="fas fa-star"></i></li><li><i class="fas fa-star-half-alt"></i></li>
                                                    </ul>
                                                    <span>(165) Reviews</span>
                                                </div>
                                                <h2 class="product__title"><a href="product-template.html?id=jointeez">Jointeez Capsules</a></h2>
                                                <span class="product__available">Category: <span>Bone & Joint</span></span>
                                                <div class="product__progress progress color-primary">
                                                    <div class="progress-bar" role="progressbar" style="width: 78%" aria-valuenow="78" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <h4 class="product__price"><span class="new">₦28,000</span></h4>
                                                <p class="product-description">Fast-acting relief for joint pain and inflammation. Promotes bone density and flexibility. Perfect for arthritis and rheumatism recovery.</p>
                                            </div>
                                        </li>`;

// The native CSS style for upselling in standard pages (Bootstrap based)
const upsellSectionBootstrap = `
<!-- START UPSELLING SECTION -->
<section class="upsell-section pb-80" style="margin-top: 50px;">
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <div class="text-center" style="margin-bottom: 40px;">
                    <span style="background: rgba(16, 185, 129, 0.1); color: #10B981; padding: 5px 15px; border-radius: 20px; font-weight: bold; font-size: 14px; text-transform: uppercase;">Clinical Recommendations</span>
                    <h2 style="font-size: 36px; font-weight: 800; margin-top: 15px; color: #1a1a1a;">Complete Your Protocol</h2>
                    <p style="color: #666; max-width: 600px; margin: 10px auto;">Enhance your recovery and daily wellness with these frequently combined clinical formulations.</p>
                </div>
                
                <div class="row">
                    <!-- Upsell Card 1 -->
                    <div class="col-lg-4 col-md-6 mb-30">
                        <div style="background: #fff; border: 1px solid #eaeaea; border-radius: 20px; padding: 25px; transition: all 0.3s ease; box-shadow: 0 10px 30px rgba(0,0,0,0.05);" class="upsell-card">
                            <div style="position: relative; border-radius: 15px; overflow: hidden; background: #f9f9f9; padding: 20px; margin-bottom: 20px; text-align: center;">
                                <div style="position: absolute; top: 15px; left: 15px; background: #8b5cf6; color: #fff; font-size: 12px; font-weight: bold; padding: 4px 12px; border-radius: 20px;">Popular Combo</div>
                                <img src="assets/img/product/Reishi.png" alt="Reishi" style="max-height: 180px; transition: 0.5s ease;" class="upsell-img">
                            </div>
                            <h3 style="font-size: 20px; font-weight: 700; color: #333; margin-bottom: 10px;">Immune Armor Bundle</h3>
                            <p style="font-size: 14px; color: #777; margin-bottom: 20px;">Reishi + Golden Hypha for maximum cellular defense and vitality.</p>
                            <div class="d-flex align-items-center justify-content-between">
                                <span style="color: #10B981; font-weight: 800; font-size: 22px;">₦77,000</span>
                                <a href="product-template.html?id=reishi" style="background: rgba(16, 185, 129, 0.1); color: #10B981; padding: 8px 16px; border-radius: 10px; font-weight: bold; transition: 0.3s;">Add Bundle</a>
                            </div>
                        </div>
                    </div>

                    <!-- Upsell Card 2 -->
                    <div class="col-lg-4 col-md-6 mb-30">
                        <div style="background: #fff; border: 1px solid #eaeaea; border-radius: 20px; padding: 25px; transition: all 0.3s ease; box-shadow: 0 10px 30px rgba(0,0,0,0.05);" class="upsell-card">
                            <div style="position: relative; border-radius: 15px; overflow: hidden; background: #f9f9f9; padding: 20px; margin-bottom: 20px; text-align: center;">
                                <div style="position: absolute; top: 15px; left: 15px; background: #f59e0b; color: #fff; font-size: 12px; font-weight: bold; padding: 4px 12px; border-radius: 20px;">Metabolic Reset</div>
                                <img src="assets/img/product/Magilim.png" alt="Magilim" style="max-height: 180px; transition: 0.5s ease;" class="upsell-img">
                            </div>
                            <h3 style="font-size: 20px; font-weight: 700; color: #333; margin-bottom: 10px;">Weight Management</h3>
                            <p style="font-size: 14px; color: #777; margin-bottom: 20px;">Magilim + Colon Cleanse Tea to burn fat and detoxify the gut.</p>
                            <div class="d-flex align-items-center justify-content-between">
                                <span style="color: #10B981; font-weight: 800; font-size: 22px;">₦52,000</span>
                                <a href="product-template.html?id=magilim" style="background: rgba(16, 185, 129, 0.1); color: #10B981; padding: 8px 16px; border-radius: 10px; font-weight: bold; transition: 0.3s;">Add Bundle</a>
                            </div>
                        </div>
                    </div>

                    <!-- Upsell Card 3 -->
                    <div class="col-lg-4 col-md-6 mb-30">
                        <div style="background: #fff; border: 1px solid #eaeaea; border-radius: 20px; padding: 25px; transition: all 0.3s ease; box-shadow: 0 10px 30px rgba(0,0,0,0.05);" class="upsell-card">
                            <div style="position: relative; border-radius: 15px; overflow: hidden; background: #f9f9f9; padding: 20px; margin-bottom: 20px; text-align: center;">
                                <div style="position: absolute; top: 15px; left: 15px; background: #3b82f6; color: #fff; font-size: 12px; font-weight: bold; padding: 4px 12px; border-radius: 20px;">Male Vitality</div>
                                <img src="assets/img/product/Revive.png" alt="Revive" style="max-height: 180px; transition: 0.5s ease;" class="upsell-img">
                            </div>
                            <h3 style="font-size: 20px; font-weight: 700; color: #333; margin-bottom: 10px;">Vigor Prime Bundle</h3>
                            <p style="font-size: 14px; color: #777; margin-bottom: 20px;">Re-Vive + Vigor Essential for peak physical and reproductive stamina.</p>
                            <div class="d-flex align-items-center justify-content-between">
                                <span style="color: #10B981; font-weight: 800; font-size: 22px;">₦60,000</span>
                                <a href="product-template.html?id=re-vive" style="background: rgba(16, 185, 129, 0.1); color: #10B981; padding: 8px 16px; border-radius: 10px; font-weight: bold; transition: 0.3s;">Add Bundle</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <style>
        .upsell-card:hover { border-color: #10B981 !important; transform: translateY(-5px); }
        .upsell-card:hover .upsell-img { transform: scale(1.1); }
        .upsell-card a:hover { background: #10B981 !important; color: #fff !important; }
    </style>
</section>
<!-- END UPSELLING SECTION -->
`;

const upsellSectionTailwind = `
<!-- START UPSELLING SECTION -->
<section class="upsell-section py-20 border-t border-white/5 mt-16 relative z-10 bg-[#070B14]">
    <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-12 scroll-reveal">
            <span class="text-emerald-500 font-bold tracking-wider text-sm uppercase bg-emerald-500/10 border border-emerald-500/20 px-4 py-1 rounded-full">Clinical Recommendations</span>
            <h2 class="text-3xl md:text-5xl font-black text-white mt-6">Complete Your Protocol</h2>
            <p class="text-gray-400 mt-4 max-w-2xl mx-auto">Enhance your recovery and daily wellness with these frequently combined clinical formulations.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Upsell Card 1 -->
            <div class="bg-[#111827] border border-white/5 rounded-3xl p-6 hover:border-emerald-500/50 transition-all scroll-reveal group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(16,185,129,0.1)]">
                <div class="aspect-[4/3] bg-gradient-to-br from-white/5 to-transparent rounded-2xl mb-6 overflow-hidden relative flex items-center justify-center p-4">
                    <div class="absolute top-4 left-4 bg-purple-500/20 text-purple-400 border border-purple-500/30 text-xs font-bold px-3 py-1 rounded-full z-10">Popular Combo</div>
                    <img src="assets/img/product/Reishi.png" alt="Reishi" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl">
                </div>
                <h3 class="text-xl font-bold text-white mb-2">Immune Armor Bundle</h3>
                <p class="text-gray-400 text-sm mb-6">Reishi + Golden Hypha for maximum cellular defense and vitality.</p>
                <div class="flex items-center justify-between mt-auto">
                    <span class="text-emerald-400 font-bold text-2xl">₦77,000</span>
                    <a href="product-template.html?id=reishi" class="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-5 py-2.5 rounded-xl font-bold hover:bg-emerald-500 hover:text-white transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]">Add Bundle</a>
                </div>
            </div>

            <!-- Upsell Card 2 -->
            <div class="bg-[#111827] border border-white/5 rounded-3xl p-6 hover:border-emerald-500/50 transition-all scroll-reveal group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(16,185,129,0.1)]">
                <div class="aspect-[4/3] bg-gradient-to-br from-white/5 to-transparent rounded-2xl mb-6 overflow-hidden relative flex items-center justify-center p-4">
                    <div class="absolute top-4 left-4 bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold px-3 py-1 rounded-full z-10">Metabolic Reset</div>
                    <img src="assets/img/product/Magilim.png" alt="Magilim" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl">
                </div>
                <h3 class="text-xl font-bold text-white mb-2">Weight Management</h3>
                <p class="text-gray-400 text-sm mb-6">Magilim + Colon Cleanse Tea to burn fat and detoxify the gut.</p>
                <div class="flex items-center justify-between mt-auto">
                    <span class="text-emerald-400 font-bold text-2xl">₦52,000</span>
                    <a href="product-template.html?id=magilim" class="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-5 py-2.5 rounded-xl font-bold hover:bg-emerald-500 hover:text-white transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]">Add Bundle</a>
                </div>
            </div>

            <!-- Upsell Card 3 -->
            <div class="bg-[#111827] border border-white/5 rounded-3xl p-6 hover:border-emerald-500/50 transition-all scroll-reveal group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(16,185,129,0.1)]">
                <div class="aspect-[4/3] bg-gradient-to-br from-white/5 to-transparent rounded-2xl mb-6 overflow-hidden relative flex items-center justify-center p-4">
                    <div class="absolute top-4 left-4 bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold px-3 py-1 rounded-full z-10">Male Vitality</div>
                    <img src="assets/img/product/Revive.png" alt="Revive" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl">
                </div>
                <h3 class="text-xl font-bold text-white mb-2">Vigor Prime Bundle</h3>
                <p class="text-gray-400 text-sm mb-6">Re-Vive + Vigor Essential for peak physical and reproductive stamina.</p>
                <div class="flex items-center justify-between mt-auto">
                    <span class="text-emerald-400 font-bold text-2xl">₦60,000</span>
                    <a href="product-template.html?id=re-vive" class="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-5 py-2.5 rounded-xl font-bold hover:bg-emerald-500 hover:text-white transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]">Add Bundle</a>
                </div>
            </div>
        </div>
    </div>
</section>
<!-- END UPSELLING SECTION -->
`;

function processShopFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace the <ul> contents
    const ulStartRegex = /<ul class="products[^>]*>/;
    const ulMatch = content.match(ulStartRegex);
    
    if (ulMatch) {
        const startIndex = content.indexOf(ulMatch[0]) + ulMatch[0].length;
        const endIndex = content.indexOf('</ul>', startIndex);
        
        if (startIndex !== -1 && endIndex !== -1) {
            content = content.substring(0, startIndex) + "\\n" + kediProductsHTML + "\\n                                    " + content.substring(endIndex);
            console.log("Replaced products list in " + filePath);
        }
    }

    // Replace "Showing 1-12 of 70 results" text with correct counts
    content = content.replace(/Showing 1–12 of 70 results/g, "Showing 1–8 of 17 Clinical Protocols");

    // Add upselling before the </section> of shop-section
    const sectionEndRegex = /<\/section>[\s]*<!-- shop-section end -->|<\/section>[\s]*$/m; // Roughly
    
    // Actually, in shop.html we saw </section> closing the shop-section. Let's just find "</section>" that comes after the pagination wrap.
    // A safer way is to replace the first </section> that comes after "pagination_wrap"
    const paginationIndex = content.indexOf('pagination_wrap');
    if (paginationIndex !== -1) {
        const sectionEndIndex = content.indexOf('</section>', paginationIndex);
        if (sectionEndIndex !== -1 && content.indexOf('START UPSELLING SECTION') === -1) {
            content = content.substring(0, sectionEndIndex) + "\\n" + upsellSectionBootstrap + "\\n" + content.substring(sectionEndIndex);
            console.log("Added Bootstrap Upselling section to " + filePath);
        }
    }

    fs.writeFileSync(filePath, content, 'utf8');
}

function processHealthChallenge() {
    const filePath = './health-challenge.html';
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    if (content.indexOf('START UPSELLING SECTION') === -1) {
        const mainEndIndex = content.lastIndexOf('</main>');
        if (mainEndIndex !== -1) {
            content = content.substring(0, mainEndIndex) + "\\n" + upsellSectionTailwind + "\\n    " + content.substring(mainEndIndex);
            console.log("Added Tailwind Upselling section to " + filePath);
            fs.writeFileSync(filePath, content, 'utf8');
        }
    }
}

processShopFile('./shop.html');
processShopFile('./shop-left-sidebar.html');
processHealthChallenge();
