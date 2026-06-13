const fs = require('fs');
let content = fs.readFileSync('home-3.html', 'utf8');

const socialHTML = `
    <!-- Social Integration Section (Community Pulse) -->
    <section class="social-integration-area pt-100 pb-100" style="background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);">
        <div class="container mxw_1360">
            
            <!-- Story Bar -->
            <div class="section-title mb-40">
                <span style="color: #10b981; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">Live Updates</span>
                <h2 style="font-weight: 900; color: #0f172a; font-size: 32px;">Clinical Stories</h2>
            </div>
            <div class="Kedi-story-bar-container mb-60">
                <div class="Kedi-story-bar ul_li">
                    <!-- Dynamic Stories Loaded by social.js -->
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="section-title text-center mb-50">
                        <span style="color: #3b82f6; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">Success Gallery</span>
                        <h2 style="font-weight: 900; color: #0f172a; font-size: 36px;">Verified Transformations</h2>
                        <div style="width: 80px; height: 4px; background: #10b981; margin: 20px auto; border-radius: 2px;"></div>
                    </div>
                    
                    <div id="success-grid" class="community-grid mb-40">
                        <!-- Dynamic Grid Items (4x4) -->
                    </div>
                    
                    <div id="community-pagination" class="community-pagination-wrap ul_li_center mb-80">
                        <!-- Pagination -->
                    </div>
                </div>
            </div>

            <div class="row mt-40">
                <div class="col-lg-12">
                    <div class="section-title text-center mb-50">
                        <span style="color: #ef4444; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">Social Buzz</span>
                        <h2 style="font-weight: 900; color: #0f172a; font-size: 36px;">Protocol Trend Monitor</h2>
                        <p style="color: #64748b; margin-top: 15px;">Real-time clinical feedback from our global community.</p>
                    </div>
                    
                    <div id="social-posts-grid" class="social-buzz-grid mb-40">
                        <!-- Dynamic Social Cards (4x4) -->
                    </div>
                    
                    <div id="social-pagination" class="community-pagination-wrap ul_li_center">
                        <!-- Pagination -->
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Story Modal Overlay -->
    <div id="story-modal" class="story-modal">
        <div class="story-modal-content">
            <span class="close-story" onclick="closeStory()">&times;</span>
            <div id="modal-media-content"></div>
        </div>
    </div>
`;

const socialStyles = `
        /* Social Integration Aesthetics */
        .Kedi-story-bar {
            display: flex;
            gap: 20px;
            overflow-x: auto;
            padding: 10px 5px;
            scrollbar-width: none;
        }
        .Kedi-story-bar::-webkit-scrollbar { display: none; }
        
        .story-item {
            flex: 0 0 auto;
            text-align: center;
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        .story-item:hover { transform: scale(1.05); }
        
        .story-circle {
            width: 75px;
            height: 75px;
            border-radius: 50%;
            padding: 3px;
            background: linear-gradient(45deg, #10b981, #3b82f6);
            margin-bottom: 8px;
        }
        .story-circle img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid #fff;
        }
        .story-name { font-size: 12px; font-weight: 600; color: #475569; }

        .community-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
        }
        @media (max-width: 991px) { .community-grid { grid-template-columns: repeat(2, 1fr); } }
        
        .grid-item {
            position: relative;
            border-radius: 15px;
            overflow: hidden;
            aspect-ratio: 1;
            box-shadow: 0 10px 20px rgba(0,0,0,0.05);
        }
        .grid-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .grid-item:hover img { transform: scale(1.1); }
        
        .grid-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(15, 23, 42, 0.8), transparent);
            display: flex;
            align-items: flex-end;
            padding: 15px;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .grid-item:hover .grid-overlay { opacity: 1; }
        .grid-overlay-content { color: #fff; font-size: 13px; font-weight: 600; }

        .social-buzz-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 25px;
        }
        @media (max-width: 1199px) { .social-buzz-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 575px) { .social-buzz-grid { grid-template-columns: 1fr; } }

        .social-post-card {
            background: #fff;
            border-radius: 20px;
            padding: 20px;
            border: 1px solid #e2e8f0;
            transition: all 0.3s ease;
        }
        .social-post-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.08); }
        
        .post-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
        .user-info { display: flex; align-items: center; gap: 10px; }
        .user-avatar-small { width: 32px; height: 32px; background: #10b981; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; }
        .user-name-small { font-size: 14px; font-weight: 700; color: #1e293b; }
        
        .post-card-img-wrap { border-radius: 12px; overflow: hidden; margin-bottom: 15px; aspect-ratio: 1.5; }
        .post-card-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
        
        .post-card-comment { font-size: 13px; color: #64748b; line-height: 1.6; font-style: italic; }

        .community-pagination-wrap .page-btn {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            border: 1px solid #e2e8f0;
            background: #fff;
            margin: 0 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            color: #64748b;
        }
        .community-pagination-wrap .page-btn.active { background: #10b981; color: #fff; border-color: #10b981; }
        .community-pagination-wrap .page-btn:hover:not(.disabled) { background: #f1f5f9; }

        .story-modal {
            position: fixed;
            inset: 0;
            background: rgba(15, 23, 42, 0.95);
            z-index: 20000;
            display: none;
            align-items: center;
            justify-content: center;
        }
        .story-modal.active { display: flex; }
        .story-modal-content { position: relative; max-width: 400px; width: 90%; aspect-ratio: 9/16; }
        .story-modal-content img, .story-modal-content video { width: 100%; height: 100%; object-fit: cover; border-radius: 20px; }
        .close-story { position: absolute; top: -40px; right: 0; color: #fff; font-size: 30px; cursor: pointer; }
`;

// 1. Inject Styles
content = content.replace('/* Share Button Aesthetics */', socialStyles + '\n        /* Share Button Aesthetics */');

// 2. Identify and replace the "wide open space" (the redundant sidebar section)
const sidebarSectionMarker = '<div class="col-lg-3">\n                    <div class="tx-sidebar">';
const sectionEndMarker = '<!-- banner slide end -->'; // We want to inject after the Treatment Protocols section completely ends.

// Actually, the Treatment Protocols end at line 825.
const treatmentProtocolsEnd = '<!-- rd product end -->'; // No, that's further down.
// Let's use the line 825 container closure.

const targetPoint = '        </div>\n    </div>\n    </div>\n\n    <div class="pt-45">';
if (content.includes(targetPoint)) {
    content = content.replace(targetPoint, '        </div>\n    </div>\n    </div>\n' + socialHTML + '\n    <div class="pt-45">');
}

// Also remove the redundant sidebars if found
content = content.replace(/<div class="col-lg-3">\s*<div class="tx-sidebar">[\s\S]*?<\/div>\s*<\/div>\s*<div class="col-lg-3">\s*<div class="tx-sidebar">[\s\S]*?<\/div>\s*<\/div>/, '');

fs.writeFileSync('home-3.html', content, 'utf8');
console.log('Successfully integrated social.js into home-3.html.');
