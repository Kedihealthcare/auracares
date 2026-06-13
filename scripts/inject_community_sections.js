const fs = require('fs');
const path = require('path');

const targetFiles = [
    path.join(__dirname, '../kedi.html'),
    path.join(__dirname, '../shop.html')
];

targetFiles.forEach(targetFile => {
    if (!fs.existsSync(targetFile)) return;
    let content = fs.readFileSync(targetFile, 'utf8');

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
                                    <img src="assets/img/promo/kedi-2026-award.jpg" alt="Kedi Award" style="width: 100%; hieght: 100%; object-fit: cover;">
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
                                    <img src="assets/img/promo/kedi-promo-2.jpg" alt="Protocol Promo" style="width: 100%; hieght: 100%; object-fit: cover;">
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
                                    <img src="assets/img/promo/kedi-promo-3.jpg" alt="Flash Sale" style="width: 100%; hieght: 100%; object-fit: cover;">
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
                            <div class="buzz-header mb-30">
                                <h2 style="font-size: 2rem; font-weight: 900; color: #4d231c;"><i class="fas fa-users" style="color: #d4a017;"></i> Community Buzz</h2>
                                <p>Real-time updates from our clinical wellness network</p>
                            </div>
                            <div class="buzz-list">
                                <div class="buzz-item d-flex gap-3 mb-4 p-3" style="background: #fdf8f6; border-radius: 15px; border-left: 5px solid #d4a017;">
                                    <div class="avatar" style="width: 50px; height: 50px; border-radius: 50%; background: #4d231c; color: white; display: flex; align-items: center; justify-content: center; font-weight: 800;">JS</div>
                                    <div class="text">
                                        <h4 style="font-weight: 700; margin-bottom: 2px;">John S. <span style="font-size: 0.7rem; color: #888; font-weight: 400;">(2 mins ago)</span></h4>
                                        <p style="font-size: 0.9rem;">"Just started the <strong>Detox Protocol</strong> and I feel amazing already. The π payment was so smooth!"</p>
                                    </div>
                                </div>
                                <div class="buzz-item d-flex gap-3 mb-4 p-3" style="background: #fdf8f6; border-radius: 15px; border-left: 5px solid #d4a017;">
                                    <div class="avatar" style="width: 50px; height: 50px; border-radius: 50%; background: #25d366; color: white; display: flex; align-items: center; justify-content: center; font-weight: 800;">MA</div>
                                    <div class="text">
                                        <h4 style="font-weight: 700; margin-bottom: 2px;">Mary A. <span style="font-size: 0.7rem; color: #888; font-weight: 400;">(1 hour ago)</span></h4>
                                        <p style="font-size: 0.9rem;">"Shared my clinical results with my healthcare team. They are impressed with the <strong>Kedi-J</strong> insights."</p>
                                    </div>
                                </div>
                                <div class="buzz-item d-flex gap-3 mb-4 p-3" style="background: #fdf8f6; border-radius: 15px; border-left: 5px solid #d4a017;">
                                    <div class="avatar" style="width: 50px; height: 50px; border-radius: 50%; background: #d4a017; color: white; display: flex; align-items: center; justify-content: center; font-weight: 800;">PT</div>
                                    <div class="text">
                                        <h4 style="font-weight: 700; margin-bottom: 2px;">Peter T. <span style="font-size: 0.7rem; color: #888; font-weight: 400;">(4 hours ago)</span></h4>
                                        <p style="font-size: 0.9rem;">"Successfully redeemed my <strong>Franchise Bonus</strong>. Growing my clinical hub in Lagos!"</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Social Feed -->
                        <div class="col-lg-6 mb-40">
                            <div class="social-header mb-30">
                                <h2 style="font-size: 2rem; font-weight: 900; color: #4d231c;"><i class="fab fa-instagram" style="color: #d4a017;"></i> Social Protocol</h2>
                                <p>Follow @KediHealth for daily wellness intelligence</p>
                            </div>
                            <div class="social-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
                                <div class="social-post" style="aspect-ratio: 1; border-radius: 10px; overflow: hidden; background: #eee;">
                                    <img src="assets/img/product/img_01.png" style="width: 100%; height: 100%; object-fit: cover;" alt="Post">
                                </div>
                                <div class="social-post" style="aspect-ratio: 1; border-radius: 10px; overflow: hidden; background: #eee;">
                                    <img src="assets/img/product/img_02.png" style="width: 100%; height: 100%; object-fit: cover;" alt="Post">
                                </div>
                                <div class="social-post" style="aspect-ratio: 1; border-radius: 10px; overflow: hidden; background: #eee;">
                                    <img src="assets/img/product/img_03.png" style="width: 100%; height: 100%; object-fit: cover;" alt="Post">
                                </div>
                                <div class="social-post" style="aspect-ratio: 1; border-radius: 10px; overflow: hidden; background: #eee;">
                                    <img src="assets/img/product/img_04.png" style="width: 100%; height: 100%; object-fit: cover;" alt="Post">
                                </div>
                                <div class="social-post" style="aspect-ratio: 1; border-radius: 10px; overflow: hidden; background: #eee;">
                                    <img src="assets/img/product/VITAGENT.png" style="width: 100%; height: 100%; object-fit: cover;" alt="Post">
                                </div>
                                <div class="social-post" style="aspect-ratio: 1; border-radius: 10px; overflow: hidden; background: #eee;">
                                    <img src="assets/img/product/Vigor essential (1).jpg" style="width: 100%; height: 100%; object-fit: cover;" alt="Post">
                                </div>
                            </div>
                            <div class="mt-20 text-center">
                                <a href="#!" class="thm-btn thm-btn__2" style="border-radius: 50px;">Join the Conversation</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- ======= COMMUNITY SECTIONS END ======= -->
`;

// Inject before the footer
if (!content.includes('<!-- ======= COMMUNITY SECTIONS END ======= -->') && content.includes('<!-- footer start -->')) {
    content = content.replace('<!-- footer start -->', communitySections + '\n        <!-- footer start -->');
}

const pulseTicker = `
            <!-- ======= COMMUNITY PULSE TICKER ======= -->
            <div class="community-pulse bg-[#4d231c] py-2 overflow-hidden" style="position: relative; z-index: 10;">
                <div class="pulse-wrapper" style="display: flex; white-space: nowrap; animation: pulse-scroll 60s linear infinite; font-size: 0.8rem; letter-spacing: 1px; text-transform: uppercase;">
                    <span style="color: #d4a017; font-weight: 900; margin-right: 50px;"><i class="fas fa-bolt"></i> COMMUNITY PULSE:</span>
                    <span style="color: white; margin-right: 50px;">New π protocol activated in Lagos (2m ago)</span>
                    <span style="color: white; margin-right: 50px;">Dr. Amadi verified a 4x4 Success Grid (15m ago)</span>
                    <span style="color: white; margin-right: 50px;">Reishi Immune Guard back in stock!</span>
                    <span style="color: white; margin-right: 50px;">Community reaching 50,000+ wellness members</span>
                    <span style="color: white; margin-right: 50px;">New π protocol activated in Abuja (45m ago)</span>
                    <span style="color: white; margin-right: 50px;">Golden Six restocked for VIP members</span>
                </div>
            </div>
            <style>
                @keyframes pulse-scroll {
                    0% { transform: translateX(50%); }
                    100% { transform: translateX(-100%); }
                }
            </style>
`;

    if (content.includes('<!-- hero end -->')) {
        content = content.replace('<!-- hero end -->', '<!-- hero end -->\n' + pulseTicker);
    }

    fs.writeFileSync(targetFile, content);
    console.log(`Community sections and pulse ticker injected into ${path.basename(targetFile)}`);
});
