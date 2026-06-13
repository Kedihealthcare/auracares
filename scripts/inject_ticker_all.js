const fs = require('fs');
const path = require('path');

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

const htmlFiles = fs.readdirSync(path.join(__dirname, '..'))
    .filter(file => file.endsWith('.html'));

htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    let content = fs.readFileSync(filePath, 'utf8');

    if (!content.includes('<!-- ======= COMMUNITY PULSE TICKER ======= -->')) {
        if (content.includes('<!-- hero end -->')) {
            content = content.replace('<!-- hero end -->', '<!-- hero end -->\n' + pulseTicker);
        } else if (content.includes('</header>')) {
            content = content.replace('</header>', '</header>\n' + pulseTicker);
        }
        fs.writeFileSync(filePath, content);
        console.log(`Injected Pulse Ticker into ${file}`);
    }
});
