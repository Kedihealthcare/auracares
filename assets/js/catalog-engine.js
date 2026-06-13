/**
 * Kedi Healthcare Master Catalog Engine
 * Handles 1,000+ dynamic product collages and expansion modals with pagination
 */

const KediCatalog = (() => {
    
    // ==========================================
    // EDITABLE CATALOG SECTION
    // ==========================================
    const manualCatalog = [
        {
            category: "Immune Care",
            title: "Immune Fortification Bundle (Master)",
            price: "0.00008107π",
            images: ["Reishi.png", "Cordy Active.png", "CALMAZINE.png", "Golden-Hypha.png"],
            products: ["Reishi Capsule", "Cordy Active", "Calmazine", "Golden Hypha"],
            description: "A high-fidelity clinical protocol designed for total systemic defense and viral resistance. Managed manually."
        }
    ];

    // ==========================================
    // PROCEDURAL CONFIGURATION
    // ==========================================
    const categories = ["Immune Care", "Vitality", "Organ Support", "Cardiovascular", "Weight Mgmt", "Digestive", "Bone & Joint", "Men's Health", "Vision", "Respiratory", "Skin Care", "BioTech"];
    const productList = [
        { name: "Reishi Capsule", img: "Reishi.png" },
        { name: "Revive Capsule", img: "Revive.png" },
        { name: "Golden Six", img: "Golden six.png" },
        { name: "Cardibetter", img: "CARDIBETTER222.png" },
        { name: "Magilim", img: "Magilim.png" },
        { name: "Gastrifort", img: "Gastrifort.png" },
        { name: "Constilease", img: "Constilease.png" },
        { name: "Cordy Active", img: "Cordy Active.png" },
        { name: "Eye Beta", img: "Eye Beta.png" },
        { name: "Calmazine", img: "CALMAZINE.png" },
        { name: "Golden Hypha", img: "Golden-Hypha.png" },
        { name: "Jointeez", img: "Jointeez.png" },
        { name: "Vigor Essential", img: "Vigor essential (1).jpg" },
        { name: "Haemocare", img: "Hemocare.png" },
        { name: "Diawell", img: "DIAWELL.png" },
        { name: "Gynapharm", img: "GYNAPHARM.png" },
        { name: "Lirich", img: "LIRICH.png" },
        { name: "Vitagent", img: "VITAGENT.png" }
    ];

    const generateCatalog = (count) => {
        const data = [...manualCatalog];
        const baseDescriptions = [
            "A high-fidelity clinical protocol designed for total systemic defense.",
            "Optimized for high-performance individuals requiring sustained vitality.",
            "Targets core detoxification and cellular restoration.",
            "Clinical support for stable circulation and advanced management.",
            "Advanced metabolic regulation and digestive optimization.",
            "Soothes the gastrointestinal tract while restoring healthy flora.",
            "Relief and long-term repair for structural integrity.",
            "Targeted support for hormonal balance and reproductive health."
        ];

        for (let i = 0; i < count; i++) {
            const cat = categories[i % categories.length];
            const bundleName = `${cat} Bundle #${1000 + i}`;
            
            const selectedItems = [];
            const selectedIndices = new Set();
            while(selectedIndices.size < 4) {
                selectedIndices.add(Math.floor(Math.random() * productList.length));
            }
            
            selectedIndices.forEach(idx => selectedItems.push(productList[idx]));

            data.push({
                id: i + manualCatalog.length,
                category: cat,
                title: bundleName,
                price: `${(Math.random() * 0.0001 + 0.00002).toFixed(8)}π`,
                images: selectedItems.map(item => item.img),
                products: selectedItems.map(item => item.name),
                description: baseDescriptions[Math.floor(Math.random() * baseDescriptions.length)]
            });
        }
        return data;
    };

    let allCatalog = generateCatalog(1000);
    let currentPage = 1;
    const itemsPerPage = 8;

    const injectStyles = () => {
        if (document.getElementById('kedi-catalog-styles')) return;
        const style = document.createElement('style');
        style.id = 'kedi-catalog-styles';
        style.innerHTML = `
            .catalog-collage {
                display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;
                padding: 15px; background: #fdf8f6; border-radius: 15px;
                margin-bottom: 20px; cursor: pointer; transition: 0.3s;
            }
            .catalog-collage:hover { transform: scale(1.02); box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
            .catalog-collage img { width: 100%; height: 80px; object-fit: contain; background: white; border-radius: 10px; padding: 5px; }
            .kedi-catalog-overlay {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.85); backdrop-filter: blur(10px);
                display: flex; align-items: center; justify-content: center;
                z-index: 20000; opacity: 0; visibility: hidden; transition: 0.4s;
            }
            .kedi-catalog-overlay.active { opacity: 1; visibility: visible; }
            .kedi-catalog-modal {
                background: white; width: 90%; max-width: 1000px; border-radius: 40px;
                overflow: hidden; display: flex; flex-direction: column;
                transform: scale(0.9); transition: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                max-height: 90vh;
            }
            .kedi-catalog-overlay.active .kedi-catalog-modal { transform: scale(1); }
            @media (min-width: 992px) {
                .kedi-catalog-modal { flex-direction: row; height: 700px; }
            }
            .modal-left { background: #4d231c; flex: 1; padding: 40px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; align-content: center; overflow-y: auto; }
            .modal-right { flex: 1.2; padding: 40px; display: flex; flex-direction: column; position: relative; overflow-y: auto; }
            .modal-left img { width: 100%; height: 160px; object-fit: contain; background: white; border-radius: 20px; padding: 15px; filter: drop-shadow(0 10px 15px rgba(0,0,0,0.3)); }
            .modal-close { position: absolute; top: 20px; right: 20px; font-size: 1.5rem; cursor: pointer; color: #4d231c; z-index: 10; }
            
            .catalog-pagination { display: flex; justify-content: center; align-items: center; gap: 15px; margin-top: 50px; }
            .pagination-btn { width: 40px; height: 40px; border-radius: 50%; border: 1px solid #eee; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.3s; color: #4d231c; }
            .pagination-btn:hover { background: #4d231c; color: white; border-color: #4d231c; }
            .pagination-btn.disabled { opacity: 0.3; cursor: not-allowed; pointer-events: none; }
            
            .ref-link-card { background: #fdf8f6; border-radius: 15px; padding: 15px; margin-bottom: 10px; border: 1px solid #eee; transition: 0.3s; cursor: pointer; }
            .ref-link-card:hover { transform: translateX(5px); border-color: #d4a017; }
        `;
        document.head.appendChild(style);
    };

    const injectModalHTML = () => {
        if (document.getElementById('kedi-catalog-modal-container')) return;
        const modal = document.createElement('div');
        modal.id = 'kedi-catalog-modal-container';
        modal.className = 'kedi-catalog-overlay';
        modal.onclick = (e) => { if (e.target === modal) KediCatalog.closeModal(); };
        modal.innerHTML = `
            <div class="kedi-catalog-modal">
                <div class="modal-left" id="modal-images"></div>
                <div class="modal-right">
                    <div class="modal-close" onclick="KediCatalog.closeModal()"><i class="fas fa-times"></i></div>
                    <div id="modal-category" style="color: #d4a017; font-weight: 900; text-transform: uppercase; letter-spacing: 3px; font-size: 0.8rem; margin-bottom: 10px;"></div>
                    <h2 id="modal-title" style="font-size: 1.8rem; font-weight: 900; color: #4d231c; margin-bottom: 15px;"></h2>
                    <p id="modal-desc" style="color: #666; line-height: 1.6; margin-bottom: 20px; font-size: 0.9rem;"></p>
                    
                    <div style="margin-bottom: 20px;">
                        <h4 style="font-size: 0.7rem; font-weight: 800; text-transform: uppercase; color: #888; margin-bottom: 10px;">Included Protocols:</h4>
                        <ul id="modal-products" style="font-size: 0.85rem; color: #4d231c; font-weight: 700; display: flex; flex-wrap: wrap; gap: 10px;"></ul>
                    </div>

                    <div style="border-top: 1px solid #eee; pt-20 mt-10">
                        <h4 style="font-size: 0.7rem; font-weight: 800; text-transform: uppercase; color: #d4a017; margin: 20px 0 10px 0;">Clinical Proof & Community Pulse</h4>
                        <div id="modal-references" class="space-y-3"></div>
                    </div>

                    <div style="display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: 20px; border-top: 1px solid #eee;">
                        <div id="modal-price" style="font-size: 1.5rem; color: #25d366; font-weight: 900;"></div>
                        <button class="thm-btn thm-btn__2" style="border-radius: 50px; padding: 12px 30px;" onclick="alert('Order Initiated for Bundle!')">Order Bundle</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    };

    const renderCatalog = (page) => {
        const container = document.getElementById('master-catalog-grid');
        if (!container) return;

        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageItems = allCatalog.slice(start, end);

        container.innerHTML = pageItems.map((item, index) => `
            <div class="col-xl-3 col-lg-4 col-md-6 mb-30">
                <div class="product-catalog-item" style="border: 1px solid #eee; border-radius: 30px; padding: 20px; text-align: center; transition: 0.3s; height: 100%; background: white;">
                    <div class="category" style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 2px; color: #d4a017; font-weight: 900; margin-bottom: 15px;">${item.category}</div>
                    
                    <div class="catalog-collage" onclick="KediCatalog.openModal(${start + index})">
                        ${item.images.map(img => `<img src="assets/img/product/${img}" alt="Kedi Product">`).join('')}
                    </div>

                    <h3 style="font-size: 1.1rem; font-weight: 800; color: #4d231c; margin-bottom: 10px; min-height: 2.2em; display: flex; align-items: center; justify-content: center;">${item.title}</h3>
                    <div class="price" style="font-size: 1.2rem; color: #25d366; font-weight: 900; margin-bottom: 20px;">${item.price}</div>
                    <button onclick="KediCatalog.openModal(${start + index})" class="thm-btn thm-btn__2" style="width: 100%; border-radius: 50px; font-size: 0.8rem; height: 50px;">View Full Protocol</button>
                </div>
            </div>
        `).join('');

        updatePagination();
    };

    const updatePagination = () => {
        let paginationContainer = document.getElementById('catalog-pagination-container');
        if (!paginationContainer) {
            const grid = document.getElementById('master-catalog-grid');
            paginationContainer = document.createElement('div');
            paginationContainer.id = 'catalog-pagination-container';
            paginationContainer.className = 'col-12';
            grid.parentNode.appendChild(paginationContainer);
        }

        const totalPages = Math.ceil(allCatalog.length / itemsPerPage);
        paginationContainer.innerHTML = `
            <div class="catalog-pagination">
                <button onclick="KediCatalog.goToPage(1)" class="pagination-btn ${currentPage === 1 ? 'disabled' : ''}"><i class="fas fa-angle-double-left"></i></button>
                <button onclick="KediCatalog.goToPage(${currentPage - 1})" class="pagination-btn ${currentPage === 1 ? 'disabled' : ''}"><i class="fas fa-angle-left"></i></button>
                <div class="pagination-info" style="font-weight: 800; color: #d4a017; font-size: 0.9rem;">Page ${currentPage} of ${totalPages}</div>
                <button onclick="KediCatalog.goToPage(${currentPage + 1})" class="pagination-btn ${currentPage === totalPages ? 'disabled' : ''}"><i class="fas fa-angle-right"></i></button>
                <button onclick="KediCatalog.goToPage(${totalPages})" class="pagination-btn ${currentPage === totalPages ? 'disabled' : ''}"><i class="fas fa-angle-double-right"></i></button>
            </div>
        `;
    };

    return {
        init: () => {
            if (!document.getElementById('master-catalog-grid')) return;
            injectStyles();
            injectModalHTML();
            renderCatalog(1);
        },
        goToPage: (p) => {
            const totalPages = Math.ceil(allCatalog.length / itemsPerPage);
            if (p < 1 || p > totalPages) return;
            currentPage = p;
            renderCatalog(p);
            document.getElementById('master-catalog-grid').scrollIntoView({ behavior: 'smooth' });
        },
        openModal: (index) => {
            const item = allCatalog[index];
            document.getElementById('modal-images').innerHTML = item.images.map(img => `<img src="assets/img/product/${img}">`).join('');
            document.getElementById('modal-category').innerText = item.category;
            document.getElementById('modal-title').innerText = item.title;
            document.getElementById('modal-desc').innerText = item.description;
            document.getElementById('modal-products').innerHTML = item.products.map(p => `<li style="background: #f8f8f8; padding: 5px 12px; border-radius: 50px; font-size: 0.7rem;">${p}</li>`).join('');
            document.getElementById('modal-price').innerText = item.price;

            // Add References from Community
            const refContainer = document.getElementById('modal-references');
            if (typeof KediCommunity !== 'undefined') {
                const feeds = KediCommunity.getFeeds().slice(0, 50); // Get some feeds
                const buzz = KediCommunity.getBuzz().slice(0, 50); // Get some buzz
                
                // Find relevant ones or just pick random
                const relevantFeed = feeds[Math.floor(Math.random() * feeds.length)];
                const relevantBuzz = buzz[Math.floor(Math.random() * buzz.length)];

                refContainer.innerHTML = `
                    <div class="ref-link-card" onclick="KediCatalog.closeModal(); setTimeout(() => KediCommunity.openModal('social', ${feeds.indexOf(relevantFeed)}), 300)">
                        <div style="display: flex; gap: 10px; align-items: center;">
                            <div style="width: 30px; height: 30px; border-radius: 50%; background: #4d231c; color: white; display: flex; align-items: center; justify-content: center; font-size: 0.6rem; font-weight: 800;">${relevantFeed.avatar}</div>
                            <div>
                                <div style="font-size: 0.7rem; font-weight: 900; color: #4d231c;">Patient Success: ${relevantFeed.user}</div>
                                <div style="font-size: 0.6rem; color: #888;">"${relevantFeed.review.substring(0, 40)}..."</div>
                            </div>
                        </div>
                    </div>
                    <div class="ref-link-card" onclick="KediCatalog.closeModal(); setTimeout(() => KediCommunity.openModal('buzz', ${buzz.indexOf(relevantBuzz)}), 300)">
                        <div style="display: flex; gap: 10px; align-items: center;">
                            <div style="width: 30px; height: 30px; border-radius: 50%; background: #d4a017; color: white; display: flex; align-items: center; justify-content: center; font-size: 0.8rem;"><i class="fas fa-bolt"></i></div>
                            <div>
                                <div style="font-size: 0.7rem; font-weight: 900; color: #4d231c;">Community Pulse: ${relevantBuzz.protocol}</div>
                                <div style="font-size: 0.6rem; color: #888;">Activated in ${relevantBuzz.location}</div>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                refContainer.innerHTML = '<p style="font-size: 0.7rem; color: #888;">Clinical proof engine loading...</p>';
            }

            document.getElementById('kedi-catalog-modal-container').classList.add('active');
            document.body.style.overflow = 'hidden';
        },
        closeModal: () => {
            document.getElementById('kedi-catalog-modal-container').classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };
})();

document.addEventListener('DOMContentLoaded', KediCatalog.init);
