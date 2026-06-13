const path = require('path');
const fs = require('fs');

const __dirname_root = path.join(__dirname, '..');
const kedi = fs.readFileSync(path.join(__dirname_root, 'kedi.html'), 'utf8');

// Extract the social components from kedi.html
const successBlockMatch = kedi.match(/(<!-- Aura Success Ecosystem -->[\s\S]*?<!-- Story Modal -->[\s\S]*?<\/div>\s*<\/div>)/);
if (!successBlockMatch) {
    console.error("Could not find success block in kedi.html");
    process.exit(1);
}
const successBlock = successBlockMatch[1];

const storyBarStr = `
            <!-- Aura Story Bar -->
            <div class="container pt-30">
                <div id="aura-story-bar" class="aura-story-bar">
                    <!-- Dynamic Stories -->
                </div>
            </div>
`;

function injectSocials(filename) {
    let html = fs.readFileSync(filename, 'utf8');
    let modified = false;

    // 1. Inject social.css into head
    if (!html.includes('assets/css/social.css')) {
        html = html.replace('</head>', '    <link rel="stylesheet" href="assets/css/social.css">\n</head>');
        modified = true;
    }

    // 2. Inject social.js before </body>
    if (!html.includes('assets/js/social.js')) {
        html = html.replace('</body>', '    <script src="assets/js/social.js"></script>\n</body>');
        modified = true;
    }

    // 3. Inject Aura Story Bar after <main>
    if (!html.includes('id="aura-story-bar"')) {
        html = html.replace(/<main[^>]*>/, `$&` + storyBarStr);
        modified = true;
    }

    // 4. Inject Success Feed before </main>
    if (!html.includes('<!-- Aura Success Ecosystem -->')) {
        html = html.replace('</main>', `\n${successBlock}\n        </main>`);
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filename, html, 'utf8');
        console.log(`Successfully injected social ecosystem into ${filename}`);
    } else {
        console.log(`Social ecosystem already present in ${filename}`);
    }
}

injectSocials(path.join(__dirname_root, 'home-3.html'));
injectSocials(path.join(__dirname_root, 'Farforlife.html'));
injectSocials(path.join(__dirname_root, 'kedi.html'));
