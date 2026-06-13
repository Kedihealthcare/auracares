const path = require('path');
const fs = require('fs');
let html = fs.readFileSync('blog.html', 'utf8');

// Title & meta
html = html.replace('<title>Kedi Healthcare (Kedi-J) - Clinical Intelligence &amp; News</title>',
  '<title>Kedi Healthcare (Kedi-J) - Franchise &amp; Business Opportunity</title>');
html = html.replace('<meta name="description" content="">',
  '<meta name="description" content="Join the Kedi Healthcare (Kedi-J) Franchise Network. Build a thriving clinical wellness business with Kedi Healthcare products, full training and ongoing support.">');

// Breadcrumb
html = html.replace('<span>News</span>', '<span>Franchise Opportunity</span>');

// Replace entire blog section (main content + sidebar)
const blogStart = html.indexOf('<!-- blog start -->');
const blogEnd = html.indexOf('<!-- blog end -->') + '<!-- blog end -->'.length;

const franchiseContent = `<!-- blog start -->
<section class="blog pb-90">
  <div class="container">

    <!-- HERO BANNER -->
    <div class="row mt-50 mb-50">
      <div class="col-12">
        <div style="background:linear-gradient(135deg,#064e3b,#10b981);border-radius:20px;padding:60px 40px;color:#fff;text-align:center;">
          <span style="background:rgba(255,255,255,0.2);padding:6px 18px;border-radius:20px;font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Limited Slots Available</span>
          <h1 style="font-size:42px;font-weight:900;margin:20px 0 10px;">Build Your Own Clinical Wellness Empire</h1>
          <p style="font-size:18px;opacity:0.9;max-width:700px;margin:0 auto 30px;">Join the fastest-growing Kedi Healthcare franchise network in Africa. Earn while you help people heal.</p>
          <a href="#apply" style="background:#fff;color:#064e3b;padding:14px 36px;border-radius:50px;font-weight:800;font-size:16px;text-decoration:none;display:inline-block;">Apply Now — It's Free</a>
        </div>
      </div>
    </div>

    <div class="row mt-none-50 sticky-coloum-wrap">
      <!-- MAIN CONTENT -->
      <div class="col-xl-9 col-lg-8">
        <div class="blog-post-wrap mt-50">

          <!-- WHY FRANCHISE -->
          <div class="mb-50">
            <h2 style="font-size:28px;font-weight:800;color:#064e3b;border-left:4px solid #10b981;padding-left:16px;margin-bottom:24px;">Why Choose an Kedi Healthcare (Kedi-J) Franchise?</h2>
            <div class="row">
              <div class="col-md-4 mb-4">
                <div style="background:#f0fdf4;border-radius:16px;padding:28px;text-align:center;height:100%;">
                  <div style="font-size:36px;margin-bottom:12px;">🏥</div>
                  <h4 style="font-weight:800;color:#064e3b;">Proven Protocols</h4>
                  <p style="color:#6b7280;font-size:14px;">Over 20 years of clinical heritage backed by Kedi Healthcare's TCM formulations.</p>
                </div>
              </div>
              <div class="col-md-4 mb-4">
                <div style="background:#f0fdf4;border-radius:16px;padding:28px;text-align:center;height:100%;">
                  <div style="font-size:36px;margin-bottom:12px;">💰</div>
                  <h4 style="font-weight:800;color:#064e3b;">High Margin Products</h4>
                  <p style="color:#6b7280;font-size:14px;">Earn 30–50% margins on every product sold. Recurring orders from loyal clients.</p>
                </div>
              </div>
              <div class="col-md-4 mb-4">
                <div style="background:#f0fdf4;border-radius:16px;padding:28px;text-align:center;height:100%;">
                  <div style="font-size:36px;margin-bottom:12px;">🎓</div>
                  <h4 style="font-weight:800;color:#064e3b;">Full Training</h4>
                  <p style="color:#6b7280;font-size:14px;">Clinical onboarding, sales training, and a dedicated franchise support manager.</p>
                </div>
              </div>
              <div class="col-md-4 mb-4">
                <div style="background:#f0fdf4;border-radius:16px;padding:28px;text-align:center;height:100%;">
                  <div style="font-size:36px;margin-bottom:12px;">📦</div>
                  <h4 style="font-weight:800;color:#064e3b;">Stock &amp; Logistics</h4>
                  <p style="color:#6b7280;font-size:14px;">Nationwide stock delivery and fulfilment handled by our logistics network.</p>
                </div>
              </div>
              <div class="col-md-4 mb-4">
                <div style="background:#f0fdf4;border-radius:16px;padding:28px;text-align:center;height:100%;">
                  <div style="font-size:36px;margin-bottom:12px;">📱</div>
                  <h4 style="font-weight:800;color:#064e3b;">Digital Platform</h4>
                  <p style="color:#6b7280;font-size:14px;">Access your own branded Kedi Healthcare (Kedi-J) micro-site, quiz engine &amp; client dashboard.</p>
                </div>
              </div>
              <div class="col-md-4 mb-4">
                <div style="background:#f0fdf4;border-radius:16px;padding:28px;text-align:center;height:100%;">
                  <div style="font-size:36px;margin-bottom:12px;">🌍</div>
                  <h4 style="font-weight:800;color:#064e3b;">Territorial Rights</h4>
                  <p style="color:#6b7280;font-size:14px;">Exclusive zone protection. Own your territory and grow without competition.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- FRANCHISE TIERS -->
          <div class="mb-50">
            <h2 style="font-size:28px;font-weight:800;color:#064e3b;border-left:4px solid #10b981;padding-left:16px;margin-bottom:24px;">Choose Your Franchise Tier</h2>
            <div class="row">
              <div class="col-md-4 mb-4">
                <div style="border:2px solid #d1fae5;border-radius:16px;padding:30px;text-align:center;">
                  <span style="background:#d1fae5;color:#065f46;padding:4px 14px;border-radius:20px;font-size:12px;font-weight:700;">STARTER</span>
                  <h3 style="font-size:32px;font-weight:900;margin:16px 0 4px;">₦150,000</h3>
                  <p style="color:#6b7280;margin-bottom:20px;">One-time setup fee</p>
                  <ul style="text-align:left;list-style:none;padding:0;color:#374151;">
                    <li style="padding:6px 0;border-bottom:1px solid #f3f4f6;">✅ Starter product kit</li>
                    <li style="padding:6px 0;border-bottom:1px solid #f3f4f6;">✅ Basic training (online)</li>
                    <li style="padding:6px 0;border-bottom:1px solid #f3f4f6;">✅ Marketing materials</li>
                    <li style="padding:6px 0;border-bottom:1px solid #f3f4f6;">✅ WhatsApp support group</li>
                    <li style="padding:6px 0;">✅ Up to 30% margin</li>
                  </ul>
                  <a href="#apply" style="display:block;margin-top:20px;background:#10b981;color:#fff;padding:12px;border-radius:10px;font-weight:700;text-decoration:none;">Get Started</a>
                </div>
              </div>
              <div class="col-md-4 mb-4">
                <div style="border:2px solid #10b981;border-radius:16px;padding:30px;text-align:center;background:#f0fdf4;position:relative;">
                  <div style="position:absolute;top:-14px;left:50%;transform:translateX(-50%);background:#10b981;color:#fff;padding:4px 18px;border-radius:20px;font-size:12px;font-weight:700;">MOST POPULAR</div>
                  <span style="background:#10b981;color:#fff;padding:4px 14px;border-radius:20px;font-size:12px;font-weight:700;">PRO</span>
                  <h3 style="font-size:32px;font-weight:900;margin:16px 0 4px;">₦450,000</h3>
                  <p style="color:#6b7280;margin-bottom:20px;">One-time setup fee</p>
                  <ul style="text-align:left;list-style:none;padding:0;color:#374151;">
                    <li style="padding:6px 0;border-bottom:1px solid #d1fae5;">✅ Full product inventory</li>
                    <li style="padding:6px 0;border-bottom:1px solid #d1fae5;">✅ 3-day physical training</li>
                    <li style="padding:6px 0;border-bottom:1px solid #d1fae5;">✅ Branded micro-site</li>
                    <li style="padding:6px 0;border-bottom:1px solid #d1fae5;">✅ Dedicated manager</li>
                    <li style="padding:6px 0;border-bottom:1px solid #d1fae5;">✅ Up to 40% margin</li>
                    <li style="padding:6px 0;">✅ Territorial exclusivity</li>
                  </ul>
                  <a href="#apply" style="display:block;margin-top:20px;background:#064e3b;color:#fff;padding:12px;border-radius:10px;font-weight:700;text-decoration:none;">Apply Now</a>
                </div>
              </div>
              <div class="col-md-4 mb-4">
                <div style="border:2px solid #1e3a5f;border-radius:16px;padding:30px;text-align:center;background:#f8fafc;">
                  <span style="background:#1e3a5f;color:#fff;padding:4px 14px;border-radius:20px;font-size:12px;font-weight:700;">ENTERPRISE</span>
                  <h3 style="font-size:32px;font-weight:900;margin:16px 0 4px;">₦1,200,000</h3>
                  <p style="color:#6b7280;margin-bottom:20px;">Regional Master License</p>
                  <ul style="text-align:left;list-style:none;padding:0;color:#374151;">
                    <li style="padding:6px 0;border-bottom:1px solid #f3f4f6;">✅ Master sub-franchise rights</li>
                    <li style="padding:6px 0;border-bottom:1px solid #f3f4f6;">✅ Full warehouse stocking</li>
                    <li style="padding:6px 0;border-bottom:1px solid #f3f4f6;">✅ Custom branded app</li>
                    <li style="padding:6px 0;border-bottom:1px solid #f3f4f6;">✅ Up to 50% margin</li>
                    <li style="padding:6px 0;border-bottom:1px solid #f3f4f6;">✅ Override commissions</li>
                    <li style="padding:6px 0;">✅ State exclusivity</li>
                  </ul>
                  <a href="#apply" style="display:block;margin-top:20px;background:#1e3a5f;color:#fff;padding:12px;border-radius:10px;font-weight:700;text-decoration:none;">Enquire Now</a>
                </div>
              </div>
            </div>
          </div>

          <!-- SUCCESS STORIES -->
          <div class="mb-50">
            <h2 style="font-size:28px;font-weight:800;color:#064e3b;border-left:4px solid #10b981;padding-left:16px;margin-bottom:24px;">Franchisee Success Stories</h2>
            <div class="row">
              <div class="col-md-6 mb-4">
                <div style="background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:28px;">
                  <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
                    <img src="assets/img/avatar/img_02.jpg" alt="Amara" style="width:52px;height:52px;border-radius:50%;object-fit:cover;">
                    <div>
                      <h5 style="margin:0;font-weight:700;">Amara Okonkwo</h5>
                      <span style="font-size:12px;color:#10b981;font-weight:600;">Lagos Pro Franchisee</span>
                    </div>
                  </div>
                  <p style="color:#4b5563;font-style:italic;">"I started with the Starter kit and within 6 months I was making ₦320,000/month. The training and product quality made it easy to build client trust."</p>
                  <div style="color:#f59e0b;font-size:18px;">★★★★★</div>
                </div>
              </div>
              <div class="col-md-6 mb-4">
                <div style="background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:28px;">
                  <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
                    <img src="assets/img/avatar/img_02.jpg" alt="Chidi" style="width:52px;height:52px;border-radius:50%;object-fit:cover;">
                    <div>
                      <h5 style="margin:0;font-weight:700;">Dr. Chidi Eze</h5>
                      <span style="font-size:12px;color:#10b981;font-weight:600;">Abuja Enterprise Franchisee</span>
                    </div>
                  </div>
                  <p style="color:#4b5563;font-style:italic;">"As a retired doctor, I was looking for a business that aligned with my values. Kedi Healthcare (Kedi-J) gave me exactly that — plus a ₦2M/month revenue stream."</p>
                  <div style="color:#f59e0b;font-size:18px;">★★★★★</div>
                </div>
              </div>
            </div>
          </div>

          <!-- APPLICATION FORM -->
          <div id="apply" class="mb-50">
            <h2 style="font-size:28px;font-weight:800;color:#064e3b;border-left:4px solid #10b981;padding-left:16px;margin-bottom:24px;">Apply for a Franchise</h2>
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:16px;padding:40px;">
              <form>
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label style="font-weight:600;color:#374151;margin-bottom:6px;display:block;">Full Name *</label>
                    <input type="text" placeholder="Your full name" style="width:100%;padding:12px 16px;border:1px solid #d1d5db;border-radius:10px;font-size:14px;">
                  </div>
                  <div class="col-md-6 mb-3">
                    <label style="font-weight:600;color:#374151;margin-bottom:6px;display:block;">Phone Number *</label>
                    <input type="tel" placeholder="+234 ..." style="width:100%;padding:12px 16px;border:1px solid #d1d5db;border-radius:10px;font-size:14px;">
                  </div>
                  <div class="col-md-6 mb-3">
                    <label style="font-weight:600;color:#374151;margin-bottom:6px;display:block;">Email Address *</label>
                    <input type="email" placeholder="your@email.com" style="width:100%;padding:12px 16px;border:1px solid #d1d5db;border-radius:10px;font-size:14px;">
                  </div>
                  <div class="col-md-6 mb-3">
                    <label style="font-weight:600;color:#374151;margin-bottom:6px;display:block;">State / Location *</label>
                    <input type="text" placeholder="e.g. Lagos, Abuja, Kano" style="width:100%;padding:12px 16px;border:1px solid #d1d5db;border-radius:10px;font-size:14px;">
                  </div>
                  <div class="col-md-6 mb-3">
                    <label style="font-weight:600;color:#374151;margin-bottom:6px;display:block;">Franchise Tier *</label>
                    <select style="width:100%;padding:12px 16px;border:1px solid #d1d5db;border-radius:10px;font-size:14px;">
                      <option value="">Select a tier</option>
                      <option>Starter — ₦150,000</option>
                      <option>Pro — ₦450,000</option>
                      <option>Enterprise — ₦1,200,000</option>
                    </select>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label style="font-weight:600;color:#374151;margin-bottom:6px;display:block;">Background</label>
                    <select style="width:100%;padding:12px 16px;border:1px solid #d1d5db;border-radius:10px;font-size:14px;">
                      <option value="">Your background</option>
                      <option>Healthcare Professional</option>
                      <option>Business Owner</option>
                      <option>Sales / Marketing</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div class="col-12 mb-3">
                    <label style="font-weight:600;color:#374151;margin-bottom:6px;display:block;">Why do you want to join?</label>
                    <textarea rows="4" placeholder="Tell us about your goals..." style="width:100%;padding:12px 16px;border:1px solid #d1d5db;border-radius:10px;font-size:14px;resize:none;"></textarea>
                  </div>
                  <div class="col-12">
                    <button type="submit" style="background:linear-gradient(135deg,#064e3b,#10b981);color:#fff;padding:14px 40px;border:none;border-radius:50px;font-size:16px;font-weight:800;cursor:pointer;width:100%;">Submit My Application →</button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <!-- FAQ -->
          <div class="mb-50">
            <h2 style="font-size:28px;font-weight:800;color:#064e3b;border-left:4px solid #10b981;padding-left:16px;margin-bottom:24px;">Frequently Asked Questions</h2>
            <div class="faq_wrap">
              <ul class="accordion_box clearfix">
                <li class="accordion block">
                  <div class="acc-btn active">How soon can I start operating?</div>
                  <div class="acc_body current active-block"><div class="content"><p>After approval and payment, you'll receive your starter kit and begin online training within 48 hours. Physical clinics can open within 2 weeks.</p></div></div>
                </li>
                <li class="accordion block">
                  <div class="acc-btn">Do I need a medical background?</div>
                  <div class="acc_body"><div class="content"><p>No medical background is required. Our full training programme covers everything from product knowledge to client consultation protocols.</p></div></div>
                </li>
                <li class="accordion block">
                  <div class="acc-btn">Can I operate online only?</div>
                  <div class="acc_body"><div class="content"><p>Yes. Many of our franchisees operate a 100% online model using social media, WhatsApp and the Kedi Healthcare (Kedi-J) digital platform.</p></div></div>
                </li>
                <li class="accordion block">
                  <div class="acc-btn">What products will I sell?</div>
                  <div class="acc_body"><div class="content"><p>You'll sell the full range of Kedi Healthcare clinical protocols including Reishi, Magilim, Re-Vive, Cordy Active, Golden Six, Gastrifort and more.</p></div></div>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      <!-- SIDEBAR -->
      <div class="col-xl-3 col-lg-4">
        <div class="blog-sidebar mt-50">

          <div class="widget mt-40">
            <h2 class="widget__title"><span>Quick Contact</span></h2>
            <div style="background:#f0fdf4;border-radius:12px;padding:20px;margin-top:16px;">
              <p style="font-size:14px;color:#374151;margin-bottom:12px;">Ready to talk? Our franchise team is standing by.</p>
              <a href="tel:+2348123456789" style="display:block;background:#10b981;color:#fff;padding:10px;border-radius:8px;text-align:center;font-weight:700;text-decoration:none;margin-bottom:8px;">📞 Call Us Now</a>
              <a href="https://wa.me/2348123456789" style="display:block;background:#25D366;color:#fff;padding:10px;border-radius:8px;text-align:center;font-weight:700;text-decoration:none;">💬 WhatsApp Us</a>
            </div>
          </div>

          <div class="widget mt-40">
            <h2 class="widget__title"><span>Franchise Benefits</span></h2>
            <ul class="widget__category list-unstyled mt-20">
              <li><a href="#!">Low Start-up Cost<i class="far fa-chevron-right"></i></a></li>
              <li><a href="#!">High Profit Margins<i class="far fa-chevron-right"></i></a></li>
              <li><a href="#!">Proven Products<i class="far fa-chevron-right"></i></a></li>
              <li><a href="#!">Full Support System<i class="far fa-chevron-right"></i></a></li>
              <li><a href="#!">Territorial Rights<i class="far fa-chevron-right"></i></a></li>
              <li><a href="#!">Digital Platform<i class="far fa-chevron-right"></i></a></li>
            </ul>
          </div>

          <div class="widget mt-40">
            <div class="widget__add">
              <div class="content">
                <span>Trending</span>
                <h3>Premium <span>Clinical</span> <br> Protocols</h3>
                <a class="thm-btn no-icon" href="shop.html"><span class="btn-wrap"><span>Shop Now</span><span>Shop Now</span></span></a>
              </div>
              <div class="image">
                <img class="add_img" src="assets/img/product/img_177.png" alt="">
                <img class="add_shape" src="assets/img/shape/add_shape.png" alt="">
              </div>
            </div>
          </div>

          <div class="widget mt-40">
            <h2 class="widget__title"><span>Related Articles</span></h2>
            <div style="margin-top:16px;">
              <a href="blog-immune-system.html" style="display:flex;gap:12px;margin-bottom:16px;text-decoration:none;">
                <img src="assets/img/news/img_15.jpg" style="width:70px;height:60px;object-fit:cover;border-radius:8px;" alt="">
                <div>
                  <h6 style="font-size:13px;font-weight:700;color:#111827;margin:0 0 4px;">Build an Unbreakable Immune System</h6>
                  <span style="font-size:11px;color:#10b981;">Clinical Blog</span>
                </div>
              </a>
              <a href="blog-metabolic-health.html" style="display:flex;gap:12px;margin-bottom:16px;text-decoration:none;">
                <img src="assets/img/news/img_08.jpg" style="width:70px;height:60px;object-fit:cover;border-radius:8px;" alt="">
                <div>
                  <h6 style="font-size:13px;font-weight:700;color:#111827;margin:0 0 4px;">The Ultimate Metabolic Reset Guide</h6>
                  <span style="font-size:11px;color:#10b981;">Clinical Blog</span>
                </div>
              </a>
              <a href="blog-male-vitality.html" style="display:flex;gap:12px;margin-bottom:16px;text-decoration:none;">
                <img src="assets/img/news/img_10.jpg" style="width:70px;height:60px;object-fit:cover;border-radius:8px;" alt="">
                <div>
                  <h6 style="font-size:13px;font-weight:700;color:#111827;margin:0 0 4px;">Restoring Peak Male Vitality</h6>
                  <span style="font-size:11px;color:#10b981;">Clinical Blog</span>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</section>
<!-- blog end -->`;

html = html.substring(0, blogStart) + franchiseContent + html.substring(blogEnd);

fs.writeFileSync('franchise.html', html, 'utf8');
console.log('franchise.html created successfully!');
