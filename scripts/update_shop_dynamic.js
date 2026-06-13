const path = require('path');
const __dirname_root = path.join(__dirname, '..');
const fs = require('fs');
const shopPath = path.join(__dirname_root, 'shop.html');
let content = fs.readFileSync(shopPath, 'utf8');

const dynamicUpsellHtml = `
<!-- START DYNAMIC CLINICAL RECOMMENDATIONS -->
<section class="upsell-section pb-80" style="margin-top: 50px;" id="protocol-discovery">
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <div class="text-center" style="margin-bottom: 40px;">
                    <span style="background: rgba(16, 185, 129, 0.1); color: #10B981; padding: 5px 15px; border-radius: 20px; font-weight: bold; font-size: 14px; text-transform: uppercase;">Clinical Discovery Catalog</span>
                    <h2 style="font-size: 36px; font-weight: 800; margin-top: 15px; color: #1a1a1a;">Complete Your Protocol</h2>
                    <p style="color: #666; max-width: 600px; margin: 10px auto;">Explore 5,000+ frequently combined clinical formulations tailored for recovery and daily wellness.</p>
                </div>
                
                <div class="row" id="recommendations-grid">
                    <!-- Dynamic Recommendation Cards will be injected here -->
                </div>

                <div class="pagination_wrap pt-50" id="recommendations-pagination">
                    <ul class="ul_li_center" id="pagination-list">
                        <!-- Pagination links will be injected here -->
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <style>
        .upsell-card { 
            background: #fff; 
            border: 1px solid #eaeaea; 
            border-radius: 20px; 
            padding: 25px; 
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
            box-shadow: 0 10px 30px rgba(0,0,0,0.03);
            height: 100%;
            display: flex;
            flex-direction: column;
        }
        .upsell-card:hover { border-color: #10B981 !important; transform: translateY(-8px); box-shadow: 0 20px 40px rgba(16, 185, 129, 0.1); }
        .upsell-card:hover .upsell-img { transform: scale(1.08); }
        .upsell-img-wrapper { position: relative; border-radius: 15px; overflow: hidden; background: #f8fafc; padding: 25px; margin-bottom: 20px; text-align: center; }
        .upsell-img { max-height: 160px; transition: 0.5s ease; filter: drop-shadow(0 10px 15px rgba(0,0,0,0.1)); }
        .protocol-badge { position: absolute; top: 15px; left: 15px; background: #10B981; color: #fff; font-size: 11px; font-weight: 800; padding: 4px 14px; border-radius: 50px; text-transform: uppercase; }
        .protocol-badge.premium { background: #8b5cf6; }
        .protocol-badge.high-potency { background: #ef4444; }
        .upsell-title { font-size: 19px; font-weight: 800; color: #1e293b; margin-bottom: 12px; line-height: 1.3; }
        .upsell-desc { font-size: 13.5px; color: #64748b; margin-bottom: 20px; flex-grow: 1; line-height: 1.6; }
        .upsell-footer { display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #f1f5f9; pt: 15px; margin-top: auto; padding-top: 15px; }
        .upsell-price { color: #10B981; font-weight: 900; font-size: 22px; }
        .upsell-btn { background: #10B981; color: #fff !important; padding: 10px 20px; border-radius: 12px; font-weight: 700; font-size: 14px; transition: 0.3s; text-decoration: none; }
        .upsell-btn:hover { background: #059669; transform: scale(1.05); }
        
        .pagination_wrap ul { display: flex; justify-content: center; gap: 8px; flex-wrap: wrap; }
        .pagination_wrap ul li a { 
            width: 45px; height: 45px; line-height: 45px; text-align: center; 
            border: 1px solid #e2e8f0; border-radius: 12px; font-weight: 700; color: #64748b; transition: 0.3s;
        }
        .pagination_wrap ul li a.active, .pagination_wrap ul li a:hover { 
            background: #10B981; color: #fff; border-color: #10B981; 
        }
    </style>
</section>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const grid = document.getElementById('recommendations-grid');
        const paginationList = document.getElementById('pagination-list');
        const itemsPerPage = 12;
        let currentPage = 1;
        let allRecommendations = [];

        async function initRecommendations() {
            try {
                const response = await fetch('clinical_recommendations.json');
                allRecommendations = await response.json();
                renderPage(1);
            } catch (error) {
                console.error('Error loading recommendations:', error);
                grid.innerHTML = '<div class="col-12 text-center py-5"><p class="text-danger">Failed to load clinical protocols. Please ensure you are running this on a server.</p></div>';
            }
        }

        function renderPage(page) {
            currentPage = page;
            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const pageItems = allRecommendations.slice(start, end);

            grid.innerHTML = pageItems.map(item => \`
                <div class="col-lg-3 col-md-4 col-sm-6 mb-30">
                    <div class="upsell-card">
                        <div class="upsell-img-wrapper">
                            \${item.badge ? \`<div class="protocol-badge \${item.badge.toLowerCase().replace(' ', '-')}">\${item.badge}</div>\` : ''}
                            <img src="assets/img/product/\${item.mainImg}" alt="\${item.title}" class="upsell-img">
                        </div>
                        <h3 class="upsell-title">\${item.title}</h3>
                        <p class="upsell-desc">\${item.description}</p>
                        <div style="font-size: 12px; color: #94a3b8; margin-bottom: 15px; font-weight: 600;">
                            <i class="fas fa-pills mr-1"></i> \${item.products}
                        </div>
                        <div class="upsell-footer">
                            <span class="upsell-price">₦\${item.price.toLocaleString()}</span>
                            <a href="product-template.html?id=\${item.id}" class="upsell-btn">Details</a>
                        </div>
                    </div>
                </div>
            \`).join('');

            renderPagination();
            window.scrollTo({ top: document.getElementById('protocol-discovery').offsetTop - 100, behavior: 'smooth' });
        }

        function renderPagination() {
            const totalPages = Math.ceil(allRecommendations.length / itemsPerPage);
            let html = '';
            
            // Logic for partial pagination (show current, neighbors, and ends)
            const range = 2;
            const startPage = Math.max(1, currentPage - range);
            const endPage = Math.min(totalPages, currentPage + range);

            if (currentPage > 1) {
                html += \`<li><a href="javascript:void(0)" onclick="window.updateProtocolPage(\${currentPage - 1})"><i class="far fa-angle-left"></i></a></li>\`;
            }

            if (startPage > 1) {
                html += \`<li><a href="javascript:void(0)" onclick="window.updateProtocolPage(1)">1</a></li>\`;
                if (startPage > 2) html += \`<li><span class="px-2">...</span></li>\`;
            }

            for (let i = startPage; i <= endPage; i++) {
                html += \`<li><a href="javascript:void(0)" class="\${i === currentPage ? 'active' : ''}" onclick="window.updateProtocolPage(\${i})">\${i}</a></li>\`;
            }

            if (endPage < totalPages) {
                if (endPage < totalPages - 1) html += \`<li><span class="px-2">...</span></li>\`;
                html += \`<li><a href="javascript:void(0)" onclick="window.updateProtocolPage(\${totalPages})">\${totalPages}</a></li>\`;
            }

            if (currentPage < totalPages) {
                html += \`<li><a href="javascript:void(0)" onclick="window.updateProtocolPage(\${currentPage + 1})"><i class="far fa-angle-right"></i></a></li>\`;
            }

            paginationList.innerHTML = html;
        }

        window.updateProtocolPage = function(page) {
            renderPage(page);
        };

        initRecommendations();
    });
</script>
<!-- END DYNAMIC CLINICAL RECOMMENDATIONS -->
`;

// Replace the old upsell-section
const upsellStart = content.indexOf('<!-- START UPSELLING SECTION -->');
const upsellEnd = content.indexOf('<!-- END UPSELLING SECTION -->') + 30;

if (upsellStart !== -1 && upsellEnd !== -1) {
    content = content.substring(0, upsellStart) + dynamicUpsellHtml + content.substring(upsellEnd);
}

fs.writeFileSync(shopPath, content);
console.log('shop.html updated with dynamic paginated recommendations.');
