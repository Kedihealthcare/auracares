const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const START = '<!-- VIP Massage Chair Feature Start -->';
const END   = '<!-- VIP Massage Chair Feature End -->';
const s = html.indexOf(START);
const e = html.indexOf(END) + END.length;

if (s === -1) { console.error('START not found'); process.exit(1); }

const newBlock = `<!-- VIP Massage Chair Feature Start -->
        <style>
        .vip-env-card{border:1px solid #1e2530;background:#0d1117;border-radius:1.25rem;padding:1.5rem;transition:border-color .25s,transform .25s;}
        .vip-env-card:hover{border-color:#10b981;transform:translateY(-4px);}
        .vip-env-icon{width:48px;height:48px;border-radius:.75rem;display:flex;align-items:center;justify-content:center;margin-bottom:1rem;font-size:1.4rem;}
        .vip-spec-pill{display:inline-flex;align-items:center;gap:.5rem;background:#111827;border:1px solid #1f2937;border-radius:9999px;padding:.4rem 1rem;font-size:.7rem;font-weight:700;color:#9ca3af;margin:.25rem;}
        .vip-spec-pill i{color:#10b981;}
        .vip-stat{text-align:center;padding:1.5rem;border:1px solid #1e2530;border-radius:1rem;background:#0d1117;}
        .vip-stat-num{font-size:2rem;font-weight:900;color:#10b981;line-height:1;}
        .vip-stat-label{font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:.15em;color:#6b7280;margin-top:.35rem;}
        @keyframes vipPulse{0%,100%{box-shadow:0 0 0 0 rgba(16,185,129,.3)}50%{box-shadow:0 0 0 14px rgba(16,185,129,0)}}
        .vip-order-btn{animation:vipPulse 2.5s infinite;}
        </style>

        <div class="vip-feature" style="padding:80px 0;background:linear-gradient(180deg,#060810 0%,#000 50%,#060810 100%);">
            <div class="container">

                <div class="text-center mb-60">
                    <span style="color:#d4a017;font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.45em;display:block;margin-bottom:.75rem;">&#9679; Premier Clinical Recovery Device</span>
                    <h2 style="color:#fff;font-size:clamp(2rem,5vw,3.75rem);font-weight:900;letter-spacing:-.03em;line-height:1;margin-bottom:1rem;">VIP Medical <span style="color:#10b981;">Massage Chair</span></h2>
                    <p style="color:#6b7280;max-width:560px;margin:0 auto;font-size:.9rem;line-height:1.7;">Full-body clinical recovery technology engineered for five professional and residential environments.</p>
                </div>

                <!-- HERO PANEL -->
                <div class="row align-items-stretch mb-50" style="border:2px solid #d4a017;border-radius:2rem;overflow:hidden;background:#0a0a0a;">
                    <div class="col-lg-6 p-0" style="min-height:520px;">
                        <img src="assets/img/product/vip-massage_chair.jpg" alt="VIP Medical Massage Chair" class="img-fluid w-100 h-100" style="object-fit:cover;opacity:.92;display:block;">
                    </div>
                    <div class="col-lg-6" style="padding:3rem 2.5rem;display:flex;flex-direction:column;justify-content:center;">
                        <div style="display:inline-flex;align-items:center;gap:.5rem;background:#d4a01720;border:1px solid #d4a01760;border-radius:9999px;padding:.35rem .9rem;width:fit-content;margin-bottom:1.5rem;">
                            <span style="width:6px;height:6px;border-radius:50%;background:#d4a017;display:inline-block;"></span>
                            <span style="color:#d4a017;font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;">AI-Powered Clinical Device</span>
                        </div>
                        <h3 style="color:#fff;font-size:clamp(1.75rem,3.5vw,2.75rem);font-weight:900;letter-spacing:-.03em;line-height:1.1;margin-bottom:1.25rem;">Total Systemic<br><span style="color:#10b981;">Wellness Recovery</span></h3>
                        <p style="color:#9ca3af;font-size:.875rem;line-height:1.8;margin-bottom:2rem;">The pinnacle of clinical massage engineering. Zero-gravity positioning, AI full-body scanning, L-track deep tissue rollers, therapeutic infrared heating, and chromotherapy — certified for professional medical environments.</p>
                        <div style="margin-bottom:2rem;">
                            <span class="vip-spec-pill"><i class="fas fa-brain"></i> AI Body Scan</span>
                            <span class="vip-spec-pill"><i class="fas fa-spa"></i> Zero-Gravity</span>
                            <span class="vip-spec-pill"><i class="fas fa-fire-alt"></i> Infrared Heat</span>
                            <span class="vip-spec-pill"><i class="fas fa-wind"></i> Air Compression</span>
                            <span class="vip-spec-pill"><i class="fas fa-heartbeat"></i> Cardiac Monitor</span>
                            <span class="vip-spec-pill"><i class="fas fa-palette"></i> Chromotherapy</span>
                            <span class="vip-spec-pill"><i class="fas fa-music"></i> Built-in Audio</span>
                            <span class="vip-spec-pill"><i class="fas fa-shield-alt"></i> Medical Certified</span>
                        </div>
                        <div style="margin-bottom:2rem;padding:1.25rem;background:#111;border:1px solid #1f2937;border-radius:1rem;">
                            <div style="color:#6b7280;font-size:.75rem;text-decoration:line-through;margin-bottom:.25rem;" data-base-price="7500000">&#8358;7,500,000</div>
                            <div style="color:#10b981;font-size:2.5rem;font-weight:900;line-height:1;" data-base-price="6500000">&#8358;6,500,000</div>
                            <div style="color:#d4a017;font-size:.65rem;font-weight:900;text-transform:uppercase;letter-spacing:.2em;margin-top:.35rem;">&#10003; Save &#8358;1,000,000 &mdash; Limited Stock</div>
                        </div>
                        <div style="display:flex;flex-wrap:wrap;gap:1rem;">
                            <a href="cart.html" onclick="addToCart('p13','VIP Medical Massage Chair',6500000,'assets/img/product/vip-massage_chair.jpg')" class="vip-order-btn" style="background:#10b981;color:#fff;padding:.9rem 2rem;border-radius:9999px;font-weight:900;font-size:.7rem;text-transform:uppercase;letter-spacing:.15em;text-decoration:none;display:inline-flex;align-items:center;gap:.5rem;">
                                <i class="fas fa-cart-plus"></i> Order Now
                            </a>
                            <a href="contact.html" style="background:transparent;color:#fff;padding:.9rem 2rem;border-radius:9999px;font-weight:900;font-size:.7rem;text-transform:uppercase;letter-spacing:.15em;text-decoration:none;display:inline-flex;align-items:center;gap:.5rem;border:1px solid #374151;">
                                <i class="fas fa-phone-alt"></i> Request Demo
                            </a>
                        </div>
                    </div>
                </div>

                <!-- STATS -->
                <div class="row text-white mb-50">
                    <div class="col-6 col-md-3 mb-20"><div class="vip-stat"><div class="vip-stat-num">5,000+</div><div class="vip-stat-label">Units Deployed</div></div></div>
                    <div class="col-6 col-md-3 mb-20"><div class="vip-stat"><div class="vip-stat-num">98%</div><div class="vip-stat-label">Client Satisfaction</div></div></div>
                    <div class="col-6 col-md-3 mb-20"><div class="vip-stat"><div class="vip-stat-num">24/7</div><div class="vip-stat-label">Clinical Support</div></div></div>
                    <div class="col-6 col-md-3 mb-20"><div class="vip-stat"><div class="vip-stat-num">5yr</div><div class="vip-stat-label">Warranty Cover</div></div></div>
                </div>

                <!-- ENVIRONMENT LABEL -->
                <div style="margin-bottom:2rem;text-align:center;">
                    <span style="color:#6b7280;font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.4em;">Designed For Every Environment</span>
                </div>

                <!-- ENVIRONMENT CARDS -->
                <div class="row">
                    <div class="col-md-6 col-lg-4 mb-25 px-2">
                        <div class="vip-env-card h-100">
                            <div class="vip-env-icon" style="background:#10b98120;"><i class="fas fa-home" style="color:#10b981;"></i></div>
                            <h5 style="color:#fff;font-weight:900;font-size:1rem;margin-bottom:.6rem;">Luxury Homes</h5>
                            <p style="color:#6b7280;font-size:.8rem;line-height:1.7;margin-bottom:1rem;">Transform your personal wellness space. Daily recovery, stress release, and full-body rejuvenation available any time at home.</p>
                            <ul style="list-style:none;padding:0;margin:0;">
                                <li style="color:#9ca3af;font-size:.75rem;margin-bottom:.4rem;"><i class="fas fa-check-circle" style="color:#10b981;margin-right:.4rem;"></i>Private daily therapy sessions</li>
                                <li style="color:#9ca3af;font-size:.75rem;margin-bottom:.4rem;"><i class="fas fa-check-circle" style="color:#10b981;margin-right:.4rem;"></i>Sleep &amp; recovery optimization</li>
                                <li style="color:#9ca3af;font-size:.75rem;"><i class="fas fa-check-circle" style="color:#10b981;margin-right:.4rem;"></i>Smart home integration ready</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-4 mb-25 px-2">
                        <div class="vip-env-card h-100">
                            <div class="vip-env-icon" style="background:#3b82f620;"><i class="fas fa-building" style="color:#3b82f6;"></i></div>
                            <h5 style="color:#fff;font-weight:900;font-size:1rem;margin-bottom:.6rem;">Corporate Offices</h5>
                            <p style="color:#6b7280;font-size:.8rem;line-height:1.7;margin-bottom:1rem;">Boost team productivity and reduce sick days. Executive-grade recovery for leadership suites and staff wellness rooms.</p>
                            <ul style="list-style:none;padding:0;margin:0;">
                                <li style="color:#9ca3af;font-size:.75rem;margin-bottom:.4rem;"><i class="fas fa-check-circle" style="color:#3b82f6;margin-right:.4rem;"></i>Reduce workplace burnout</li>
                                <li style="color:#9ca3af;font-size:.75rem;margin-bottom:.4rem;"><i class="fas fa-check-circle" style="color:#3b82f6;margin-right:.4rem;"></i>Attract &amp; retain top talent</li>
                                <li style="color:#9ca3af;font-size:.75rem;"><i class="fas fa-check-circle" style="color:#3b82f6;margin-right:.4rem;"></i>Executive wellness suite</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-4 mb-25 px-2">
                        <div class="vip-env-card h-100">
                            <div class="vip-env-icon" style="background:#f59e0b20;"><i class="fas fa-dumbbell" style="color:#f59e0b;"></i></div>
                            <h5 style="color:#fff;font-weight:900;font-size:1rem;margin-bottom:.6rem;">Professional Gyms</h5>
                            <p style="color:#6b7280;font-size:.8rem;line-height:1.7;margin-bottom:1rem;">Elevate your recovery suite. Offer members premium post-workout therapy that accelerates muscle repair and reduces DOMS.</p>
                            <ul style="list-style:none;padding:0;margin:0;">
                                <li style="color:#9ca3af;font-size:.75rem;margin-bottom:.4rem;"><i class="fas fa-check-circle" style="color:#f59e0b;margin-right:.4rem;"></i>Post-workout muscle recovery</li>
                                <li style="color:#9ca3af;font-size:.75rem;margin-bottom:.4rem;"><i class="fas fa-check-circle" style="color:#f59e0b;margin-right:.4rem;"></i>Premium membership differentiator</li>
                                <li style="color:#9ca3af;font-size:.75rem;"><i class="fas fa-check-circle" style="color:#f59e0b;margin-right:.4rem;"></i>Athlete performance support</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-6 mb-25 px-2">
                        <div class="vip-env-card h-100">
                            <div class="vip-env-icon" style="background:#ec489920;"><i class="fas fa-clinic-medical" style="color:#ec4899;"></i></div>
                            <h5 style="color:#fff;font-weight:900;font-size:1rem;margin-bottom:.6rem;">Medical Centres &amp; Clinics</h5>
                            <p style="color:#6b7280;font-size:.8rem;line-height:1.7;margin-bottom:1rem;">Integrate clinical massage therapy into rehabilitation programmes. Endorsed for pain management units, physiotherapy centres, and wellness clinics.</p>
                            <ul style="list-style:none;padding:0;margin:0;">
                                <li style="color:#9ca3af;font-size:.75rem;margin-bottom:.4rem;"><i class="fas fa-check-circle" style="color:#ec4899;margin-right:.4rem;"></i>Physiotherapy &amp; rehab integration</li>
                                <li style="color:#9ca3af;font-size:.75rem;margin-bottom:.4rem;"><i class="fas fa-check-circle" style="color:#ec4899;margin-right:.4rem;"></i>Chronic pain management support</li>
                                <li style="color:#9ca3af;font-size:.75rem;margin-bottom:.4rem;"><i class="fas fa-check-circle" style="color:#ec4899;margin-right:.4rem;"></i>Non-invasive adjunct therapy</li>
                                <li style="color:#9ca3af;font-size:.75rem;"><i class="fas fa-check-circle" style="color:#ec4899;margin-right:.4rem;"></i>Post-surgical recovery rooms</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-6 mb-25 px-2">
                        <div class="vip-env-card h-100">
                            <div class="vip-env-icon" style="background:#8b5cf620;"><i class="fas fa-hospital" style="color:#8b5cf6;"></i></div>
                            <h5 style="color:#fff;font-weight:900;font-size:1rem;margin-bottom:.6rem;">Hospitals &amp; Health Institutions</h5>
                            <p style="color:#6b7280;font-size:.8rem;line-height:1.7;margin-bottom:1rem;">Deployed in hospital wellness and recovery wings. Clinically validated to reduce cortisol, improve circulation, and shorten recovery timelines.</p>
                            <ul style="list-style:none;padding:0;margin:0;">
                                <li style="color:#9ca3af;font-size:.75rem;margin-bottom:.4rem;"><i class="fas fa-check-circle" style="color:#8b5cf6;margin-right:.4rem;"></i>Patient recuperation wards</li>
                                <li style="color:#9ca3af;font-size:.75rem;margin-bottom:.4rem;"><i class="fas fa-check-circle" style="color:#8b5cf6;margin-right:.4rem;"></i>Reduces cortisol by up to 31%</li>
                                <li style="color:#9ca3af;font-size:.75rem;margin-bottom:.4rem;"><i class="fas fa-check-circle" style="color:#8b5cf6;margin-right:.4rem;"></i>Improves blood circulation &amp; lymphatics</li>
                                <li style="color:#9ca3af;font-size:.75rem;"><i class="fas fa-check-circle" style="color:#8b5cf6;margin-right:.4rem;"></i>Cardiac &amp; respiratory wellness</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- BOTTOM CTA -->
                <div style="margin-top:2rem;padding:2.5rem;background:linear-gradient(135deg,#0d1117,#111827);border:1px solid #d4a01740;border-radius:1.5rem;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1.5rem;">
                    <div>
                        <div style="color:#d4a017;font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:.3em;margin-bottom:.5rem;">Ready to Deploy?</div>
                        <h4 style="color:#fff;font-weight:900;font-size:1.25rem;margin:0;">Order the VIP Medical Massage Chair Today</h4>
                        <p style="color:#6b7280;font-size:.8rem;margin:.35rem 0 0;">Free nationwide delivery &bull; Installation included &bull; 5-year clinical warranty</p>
                    </div>
                    <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:center;">
                        <div style="text-align:right;">
                            <div style="color:#6b7280;font-size:.7rem;text-decoration:line-through;" data-base-price="7500000">&#8358;7,500,000</div>
                            <div style="color:#10b981;font-size:1.75rem;font-weight:900;line-height:1;" data-base-price="6500000">&#8358;6,500,000</div>
                        </div>
                        <a href="cart.html" onclick="addToCart('p13','VIP Medical Massage Chair',6500000,'assets/img/product/vip-massage_chair.jpg')" class="vip-order-btn" style="background:#10b981;color:#fff;padding:1rem 2.25rem;border-radius:9999px;font-weight:900;font-size:.7rem;text-transform:uppercase;letter-spacing:.15em;text-decoration:none;white-space:nowrap;">
                            <i class="fas fa-cart-plus" style="margin-right:.4rem;"></i> Order Now
                        </a>
                        <a href="contact.html" style="background:transparent;color:#fff;padding:1rem 2rem;border-radius:9999px;font-weight:900;font-size:.7rem;text-transform:uppercase;letter-spacing:.15em;text-decoration:none;border:1px solid #374151;white-space:nowrap;">
                            <i class="fas fa-phone-alt" style="margin-right:.4rem;"></i> Call Sales
                        </a>
                    </div>
                </div>

            </div>
        </div>
        <!-- VIP Massage Chair Feature End -->`;

html = html.slice(0, s) + newBlock + html.slice(e);
fs.writeFileSync('index.html', html, 'utf8');
console.log('VIP section replaced. Lines: ' + html.split('\n').length);
