const fs = require('fs');
const path = require('path');

const scriptsDir = __dirname;
const rootDir = path.join(scriptsDir, '..');

const successBlock = `
<!-- Aura Success Ecosystem -->
<section class="success-ecosystem-section pt-80 pb-80" style="background: #f8fafc;">
    <div class="container">
        <div class="section-title text-center mb-50">
            <span class="text-xs font-black uppercase tracking-[0.3em] text-blue-600">Community Buzz</span>
            <h2 class="title mt-3 serif-heading text-4xl">Clinical Success Stories</h2>
            <p class="mt-4 text-slate-500">Real results from our global clinical community</p>
        </div>
        <div id="success-grid" class="success-grid">
            <!-- Dynamic Success Grid populated by social.js -->
        </div>
        <div id="community-pagination" class="pagination-container mt-40 text-center">
            <!-- Dynamic Pagination -->
        </div>
    </div>
</section>

<section class="social-buzz-section pb-80">
    <div class="container">
        <div class="section-title text-center mb-50">
            <span class="text-xs font-black uppercase tracking-[0.3em] text-blue-600">Patient Experiences</span>
            <h2 class="title mt-3 serif-heading text-4xl">Social Feed</h2>
            <p class="mt-4 text-slate-500">Real-time feedback from patients following Kedi protocols</p>
        </div>
        <div id="social-posts-grid" class="social-posts-grid">
            <!-- Dynamic Social Posts populated by social.js -->
        </div>
        <div id="social-pagination" class="pagination-container mt-40 text-center">
            <!-- Dynamic Pagination -->
        </div>
    </div>
</section>

<!-- Story Modal -->
<div id="story-modal" class="story-modal" onclick="closeStory()">
    <div class="story-content" onclick="event.stopPropagation()">
        <span class="story-close" onclick="closeStory()">&times;</span>
        <div id="modal-media-content"></div>
    </div>
</div>
`;

const storyBarStr = `
            <!-- Aura Story Bar -->
            <div class="container pt-30">
                <div class="Kedi-story-bar-container">
                    <div class="Kedi-story-bar">
                        <!-- Dynamic Stories populated by social.js -->
                    </div>
                </div>
            </div>
`;

function injectSocials(filename) {
    const filePath = path.join(rootDir, filename);
    if (!fs.existsSync(filePath)) return;
    
    let html = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // 1. Inject social.css into head if not present
    if (!html.includes('assets/css/social.css')) {
        html = html.replace('</head>', '    <link rel="stylesheet" href="assets/css/social.css">\n</head>');
        modified = true;
    }

    // 2. Inject social.js before </body> if not present
    if (!html.includes('assets/js/social.js')) {
        html = html.replace('</body>', '    <script src="assets/js/social.js"></script>\n</body>');
        modified = true;
    }

    // 3. Inject Aura Story Bar after <main> or header
    if (!html.includes('class="Kedi-story-bar"')) {
        // Find end of header or start of main
        if (html.includes('</header>')) {
            html = html.replace('</header>', '</header>' + storyBarStr);
        } else if (html.includes('<main')) {
            html = html.replace(/<main[^>]*>/, `$&` + storyBarStr);
        }
        modified = true;
    }

    // 4. Inject Success Feed before <footer> or </main>
    if (!html.includes('<!-- Aura Success Ecosystem -->')) {
        if (html.includes('<footer')) {
            html = html.replace('<footer', successBlock + '\n<footer');
        } else if (html.includes('</main>')) {
            html = html.replace('</main>', successBlock + '\n</main>');
        }
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`Successfully injected social ecosystem into ${filename}`);
    }
}

['home-3.html', 'Farforlife.html', 'kedi.html'].forEach(injectSocials);
