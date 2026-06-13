const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// Use string replacement for chunks
const headStyles = `
    <title>Aura Herbs - Clinical Treatment Portal</title>
    <link rel="shortcut icon" href="assets/img/favicon.png" type="images/x-icon" />
    <style>
        .currency-switch-btn { transition: all 0.3s ease; cursor: pointer; }
        .currency-switch-btn:hover { background: #1e293b !important; color: #10b981 !important; transform: translateY(-2px); border-color: #10b981 !important; }
        .active-currency { background: #10b981 !important; color: #fff !important; border-color: #10b981 !important; font-weight: bold; box-shadow: 0 4px 10px rgba(16, 185, 129, 0.3); }
        .price-animate { animation: price-pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        @keyframes price-pop { 0% { transform: scale(0.95); opacity: 0.8; color: #10b981; } 50% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }
    </style>`;

content = content.replace(/<title>.*?<\/title>/, headStyles);

const clinicalTop = `
            <div class="header__top" style="background: #0f172a; border-bottom: 1px solid #1e293b;">
                <div class="container mxw_1360">
                    <div class="header__top-info ul_li_between mt-none-10">
                        <ul class="header__top-left ul_li mt-10">
                            <li style="color: #94a3b8;"><a href="https://wa.me/2349015092132" style="color: #10b981; font-weight: 700;">Clinical Support</a> 24/7 : +234 901 509 2132</li>
                        </ul>
                        <ul class="header__top-right ul_li mt-10">
                            <li><a href="account.html" style="color: #94a3b8;">Patient Portal</a></li>
                            <li>
                                <div class="header__language currency">
                                    <ul class="ul_li">
                                        <li><button data-currency-set="NGN" class="currency-switch-btn">NGN</button></li>
                                        <li><button data-currency-set="USD" class="currency-switch-btn">USD</button></li>
                                        <li><button data-currency-set="PI" class="currency-switch-btn">π Pi</button></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>`;

content = content.replace(/<div class="header__top-info-wrap d-none d-lg-block">[\\s\\S]*?<\/div>\\s*<\/div>\\s*<\/div>/, clinicalTop);

// Add the modal script at the end
const modalHtml = `
    <div class="modal-overlay" id="modalOverlay"></div>
    <div class="protocol-modal" id="protocolModal">
        <div class="protocol-modal-header"><h3 id="modalTitle">Treatment Protocol</h3><span id="closeModal">&times;</span></div>
        <div class="protocol-modal-body">
            <div id="modalProductImageGrid"></div>
            <div id="modalDesc"></div>
            <div class="challenge-slider"><img src="assets/img/product/kedi.jpg" alt="Recovery"></div>
        </div>
    </div>
    <script src="assets/js/currency-manager.js"></script>
    <script src="assets/js/products.js"></script>
    <script>
        console.log("Aura Herbs Portal Activated");
    </script>`;

content = content.replace('</body>', modalHtml + '</body>');

fs.writeFileSync(filePath, content);
console.log('Restored Aura Herbs state');
