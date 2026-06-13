const path = require('path');
const fs = require('fs');

// =========== UPDATE SHOP.HTML ===========
let shop = fs.readFileSync('shop.html', 'utf8');

// 1. Fix search category dropdown
shop = shop.replace(
  `<option value="">All Categories</option>
                                    <option value="4">Summer collections</option>
                                    <option value="5">Breakfast &amp; Dairy</option>
                                    <option value="6">Beverage &amp; Drinks</option>
                                    <option value="7">Cocolate Box</option>
                                    <option value="8">Dried Food Corner</option>
                                    <option value="9">Clinical Protocols</option>
                                    <option value="10">Baby Food Corner</option>
                                    <option value="11">Milk &amp; Juices</option>
                                    <option value="12">Organic &amp; Snacks</option>`,
  `<option value="">All Protocols</option>
                                    <option value="immunity">Immunity &amp; Defence</option>
                                    <option value="metabolic">Metabolic &amp; Weight</option>
                                    <option value="vitality">Vitality &amp; Vigour</option>
                                    <option value="detox">Detox &amp; Digestive</option>
                                    <option value="cardiac">Heart &amp; Circulation</option>
                                    <option value="joint">Joint &amp; Bone Care</option>
                                    <option value="skin">Skin &amp; Beauty</option>
                                    <option value="organ">Organ Support</option>`
);

// 2. Fix sticky category nav - replace legacy electronics
shop = shop.replace(
  `<ul class="category ul_li">
                                    <li><a href="product-template.html?id=diawell"><span><img src="assets/img/icon/hc_01.svg" alt=""></span>Metabolic Health</a></li>
                                    <li><a href="#!"><span><img src="assets/img/icon/hc_02.svg" alt=""></span>CC Tv &amp; Camera</a></li>
                                    <li><a href="#!"><span><img src="assets/img/icon/hc_03.svg" alt=""></span>Home Equipment</a></li>
                                    <li><a href="#!"><span><img src="assets/img/icon/hc_04.svg" alt=""></span>Tv &amp; Audios</a></li>
                                    <li><a href="#!"><span><img src="assets/img/icon/hc_05.svg" alt=""></span>Printers &amp; Ink</a></li>
                                    <li><a href="#!"><span><img src="assets/img/icon/hc_06.svg" alt=""></span>Gaming &amp; Fun</a></li>
                                </ul>`,
  `<ul class="category ul_li">
                                    <li><a href="product-template.html?id=reishi"><span><img src="assets/img/icon/hc_01.svg" alt=""></span>Immunity Defence</a></li>
                                    <li><a href="product-template.html?id=diawell"><span><img src="assets/img/icon/hc_02.svg" alt=""></span>Metabolic Health</a></li>
                                    <li><a href="product-template.html?id=revive"><span><img src="assets/img/icon/hc_03.svg" alt=""></span>Vitality &amp; Vigour</a></li>
                                    <li><a href="product-template.html?id=magilim"><span><img src="assets/img/icon/hc_04.svg" alt=""></span>Weight Management</a></li>
                                    <li><a href="product-template.html?id=jointeez"><span><img src="assets/img/icon/hc_05.svg" alt=""></span>Joint &amp; Bone Care</a></li>
                                    <li><a href="product-template.html?id=golden-six"><span><img src="assets/img/icon/hc_06.svg" alt=""></span>Organ Support</a></li>
                                </ul>`
);

// 3. Update mobile menu Blog links to include health blogs
shop = shop.replace(
  `<li><a href="news.html">Blog</a></li>
                                <li><a href="news-single.html">Blog Details</a></li>`,
  `<li><a href="news.html">Clinical Blog</a></li>
                                <li><a href="blog-immune-system.html">Immunity Guide</a></li>
                                <li><a href="blog-metabolic-health.html">Metabolic Guide</a></li>
                                <li><a href="blog-male-vitality.html">Vitality Guide</a></li>
                                <li><a href="franchise.html">Franchise</a></li>`
);

// 4. Add a "Trending Blogs & Franchise" CTA banner just before </main>
const shopCtaBanner = `
        <!-- Clinical Blog & Franchise CTA -->
        <section style="background:linear-gradient(135deg,#064e3b,#10b981);padding:60px 0;margin-top:60px;">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-lg-6 mb-4 mb-lg-0">
                <span style="background:rgba(255,255,255,0.15);color:#fff;padding:4px 14px;border-radius:20px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px;">Trending Now</span>
                <h2 style="color:#fff;font-size:32px;font-weight:900;margin:16px 0 10px;">Explore Our Health <br><span style="color:#6ee7b7;">Challenge Blogs</span></h2>
                <p style="color:rgba(255,255,255,0.8);margin-bottom:24px;">Clinical articles written by our expert doctors to help you understand your health and choose the right protocols.</p>
                <div style="display:flex;gap:12px;flex-wrap:wrap;">
                  <a href="blog-immune-system.html" style="background:#fff;color:#064e3b;padding:10px 20px;border-radius:50px;font-weight:700;text-decoration:none;font-size:13px;">🛡️ Immunity Guide</a>
                  <a href="blog-metabolic-health.html" style="background:rgba(255,255,255,0.15);color:#fff;padding:10px 20px;border-radius:50px;font-weight:700;text-decoration:none;font-size:13px;border:1px solid rgba(255,255,255,0.3);">⚡ Metabolic Reset</a>
                  <a href="blog-male-vitality.html" style="background:rgba(255,255,255,0.15);color:#fff;padding:10px 20px;border-radius:50px;font-weight:700;text-decoration:none;font-size:13px;border:1px solid rgba(255,255,255,0.3);">💪 Male Vitality</a>
                </div>
              </div>
              <div class="col-lg-6 text-center text-lg-right">
                <div style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:20px;padding:30px;display:inline-block;max-width:360px;">
                  <span style="font-size:40px;">🏥</span>
                  <h3 style="color:#fff;font-size:22px;font-weight:800;margin:12px 0 8px;">Become a Franchise Partner</h3>
                  <p style="color:rgba(255,255,255,0.8);font-size:14px;margin-bottom:20px;">Earn 30–50% margins selling Kedi clinical protocols in your territory.</p>
                  <a href="franchise.html" style="background:#fff;color:#064e3b;padding:12px 28px;border-radius:50px;font-weight:800;text-decoration:none;display:inline-block;">Apply Now →</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- End CTA -->
`;
shop = shop.replace('</main>', shopCtaBanner + '</main>');

fs.writeFileSync('shop.html', shop, 'utf8');
console.log('shop.html updated successfully.');

// =========== UPDATE HOME-3.HTML ===========
let home = fs.readFileSync('home-3.html', 'utf8');

// 1. Add Franchise to desktop main nav
home = home.replace(
  `<li><a href="contact.html">Support</a></li>
                                </ul>`,
  `<li><a href="franchise.html" style="color:#10b981;font-weight:800;">Franchise</a></li>
                                    <li><a href="contact.html">Support</a></li>
                                </ul>`
);

// 2. Add Franchise + health blogs to mobile menu
home = home.replace(
  `<li><a href="news.html">Blog</a></li>
                            <li><a href="news-single.html">Blog Details</a></li>`,
  `<li><a href="news.html">Clinical Blog</a></li>
                            <li><a href="blog-immune-system.html">Immunity Guide</a></li>
                            <li><a href="blog-metabolic-health.html">Metabolic Guide</a></li>
                            <li><a href="blog-male-vitality.html">Vitality Guide</a></li>
                            <li><a href="franchise.html">Franchise Opportunity</a></li>`
);

// 3. Inject a "Trending Articles + Franchise CTA" section before </main>
const homeCtaSection = `
        <!-- TRENDING ARTICLES + FRANCHISE -->
        <section style="padding:80px 0;background:#f9fafb;border-top:1px solid #e5e7eb;">
          <div class="container mxw_1360">
            <div class="row align-items-center mb-50">
              <div class="col-md-8">
                <span style="color:#10b981;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:3px;">Trending Articles</span>
                <h2 style="font-size:32px;font-weight:900;margin:8px 0 0;">Clinical Health <span style="color:#10b981;">Challenge Blogs</span></h2>
              </div>
              <div class="col-md-4 text-right">
                <a href="news.html" style="background:#10b981;color:#fff;padding:10px 24px;border-radius:50px;font-weight:700;text-decoration:none;font-size:13px;">View All Articles →</a>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-4 mb-4">
                <a href="blog-immune-system.html" style="text-decoration:none;">
                  <div style="background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.06);transition:transform 0.3s;" onmouseover="this.style.transform='translateY(-6px)'" onmouseout="this.style.transform='translateY(0)'">
                    <img src="assets/img/news/img_15.jpg" alt="Immunity" style="width:100%;height:200px;object-fit:cover;">
                    <div style="padding:24px;">
                      <span style="background:#d1fae5;color:#065f46;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;">Immunity</span>
                      <h3 style="font-size:17px;font-weight:800;color:#111827;margin:12px 0 8px;line-height:1.4;">How to Build an Unbreakable Immune System</h3>
                      <p style="font-size:13px;color:#6b7280;margin-bottom:16px;">Discover the clinical protocols that strengthen cellular defence.</p>
                      <div style="display:flex;align-items:center;justify-content:space-between;">
                        <span style="font-size:12px;color:#9ca3af;">Dr. Sarah Kedi · 5 min read</span>
                        <span style="color:#10b981;font-weight:700;font-size:13px;">Read →</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div class="col-lg-4 mb-4">
                <a href="blog-metabolic-health.html" style="text-decoration:none;">
                  <div style="background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.06);transition:transform 0.3s;" onmouseover="this.style.transform='translateY(-6px)'" onmouseout="this.style.transform='translateY(0)'">
                    <img src="assets/img/news/img_08.jpg" alt="Metabolic" style="width:100%;height:200px;object-fit:cover;">
                    <div style="padding:24px;">
                      <span style="background:#fef3c7;color:#92400e;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;">Metabolic</span>
                      <h3 style="font-size:17px;font-weight:800;color:#111827;margin:12px 0 8px;line-height:1.4;">The Ultimate Guide to Metabolic Reset</h3>
                      <p style="font-size:13px;color:#6b7280;margin-bottom:16px;">Learn how to restart your metabolism and burn fat effectively.</p>
                      <div style="display:flex;align-items:center;justify-content:space-between;">
                        <span style="font-size:12px;color:#9ca3af;">Dr. James Kedi · 4 min read</span>
                        <span style="color:#10b981;font-weight:700;font-size:13px;">Read →</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div class="col-lg-4 mb-4">
                <a href="blog-male-vitality.html" style="text-decoration:none;">
                  <div style="background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.06);transition:transform 0.3s;" onmouseover="this.style.transform='translateY(-6px)'" onmouseout="this.style.transform='translateY(0)'">
                    <img src="assets/img/news/img_10.jpg" alt="Vitality" style="width:100%;height:200px;object-fit:cover;">
                    <div style="padding:24px;">
                      <span style="background:#ede9fe;color:#4c1d95;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;">Men's Health</span>
                      <h3 style="font-size:17px;font-weight:800;color:#111827;margin:12px 0 8px;line-height:1.4;">Restoring Peak Male Vitality &amp; Stamina</h3>
                      <p style="font-size:13px;color:#6b7280;margin-bottom:16px;">A comprehensive approach to male performance and energy.</p>
                      <div style="display:flex;align-items:center;justify-content:space-between;">
                        <span style="font-size:12px;color:#9ca3af;">Dr. Michael Kedi · 6 min read</span>
                        <span style="color:#10b981;font-weight:700;font-size:13px;">Read →</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <!-- Franchise Banner -->
            <div style="margin-top:50px;background:linear-gradient(135deg,#064e3b,#10b981);border-radius:24px;padding:50px 40px;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:24px;">
              <div>
                <span style="background:rgba(255,255,255,0.2);color:#fff;padding:4px 14px;border-radius:20px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;">Business Opportunity</span>
                <h3 style="color:#fff;font-size:28px;font-weight:900;margin:14px 0 8px;">Join the Kedi Healthcare (Kedi-J) <span style="color:#6ee7b7;">Franchise Network</span></h3>
                <p style="color:rgba(255,255,255,0.85);max-width:500px;font-size:15px;">Earn 30–50% margins on every clinical protocol sale. Full training, stock and territorial rights included.</p>
              </div>
              <div style="display:flex;gap:12px;flex-wrap:wrap;">
                <a href="franchise.html" style="background:#fff;color:#064e3b;padding:14px 28px;border-radius:50px;font-weight:800;text-decoration:none;font-size:15px;">Apply for Franchise →</a>
                <a href="quiz.html" style="background:transparent;color:#fff;border:2px solid rgba(255,255,255,0.5);padding:14px 28px;border-radius:50px;font-weight:700;text-decoration:none;font-size:15px;">Take Health Quiz</a>
              </div>
            </div>
          </div>
        </section>
        <!-- END TRENDING -->
`;
home = home.replace('</main>', homeCtaSection + '</main>');

fs.writeFileSync('home-3.html', home, 'utf8');
console.log('home-3.html updated successfully.');
