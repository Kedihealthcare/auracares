const path = require('path');
const fs = require('fs');
const promoHtml = `
<!-- KEDI PROMO BANNER START -->
<style>
.kedi-promo-banner {
    background: linear-gradient(135deg, #10B981 0%, #059669 100%);
    color: white;
    padding: 15px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 12px;
    margin: 30px auto;
    max-width: 1200px;
    box-shadow: 0 10px 25px rgba(16, 185, 129, 0.2);
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
    z-index: 10;
}
.kedi-promo-banner:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px rgba(16, 185, 129, 0.3);
}
.kedi-promo-banner-content {
    display: flex;
    align-items: center;
    gap: 20px;
}
.kedi-promo-banner-thumb {
    width: 60px;
    height: 60px;
    border-radius: 8px;
    object-fit: cover;
    border: 2px solid white;
}
.kedi-promo-banner-text h4 {
    color: white;
    margin: 0 0 5px 0;
    font-size: 1.2rem;
    font-weight: 800;
}
.kedi-promo-banner-text p {
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.4;
}
.kedi-promo-banner-actions {
    display: flex;
    gap: 10px;
}
.kedi-promo-btn {
    background: white;
    color: #10B981;
    border: none;
    padding: 8px 16px;
    border-radius: 50px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.3s ease;
    display: flex;
    align-items: center;
    gap: 5px;
}
.kedi-promo-btn:hover {
    background: #f0fdf4;
}
.kedi-promo-btn.share {
    background: rgba(255, 255, 255, 0.2);
    color: white;
}
.kedi-promo-btn.share:hover {
    background: rgba(255, 255, 255, 0.3);
}

/* Modal Styles */
.kedi-promo-modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.85);
    z-index: 99999;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(5px);
}
.kedi-promo-modal.active {
    display: flex;
}
.kedi-promo-modal-content {
    position: relative;
    max-width: 90%;
    max-height: 90vh;
    animation: promoZoom 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
@keyframes promoZoom {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
}
.kedi-promo-modal-img {
    max-width: 100%;
    max-height: 90vh;
    border-radius: 12px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}
.kedi-promo-modal-close {
    position: absolute;
    top: -40px;
    right: -40px;
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    padding: 10px;
    transition: color 0.3s;
}
.kedi-promo-modal-close:hover {
    color: #10B981;
}
@media (max-width: 768px) {
    .kedi-promo-banner {
        flex-direction: column;
        text-align: center;
        padding: 20px;
        margin: 15px;
    }
    .kedi-promo-banner-content {
        flex-direction: column;
        margin-bottom: 15px;
    }
    .kedi-promo-modal-close {
        top: -40px;
        right: 0;
    }
}
</style>

<div class="container px-md-0">
    <div class="kedi-promo-banner" onclick="openPromoModal()">
        <div class="kedi-promo-banner-content">
            <img src="assets/img/promo/kedi-2026-award.jpg" alt="Kedi 2026 Perform and Win Award" class="kedi-promo-banner-thumb">
            <div class="kedi-promo-banner-text">
                <h4>KEDI 2026 Perform and Win Award 🏆</h4>
                <p>Register and upgrade to Three Star Consultant to win amazing prizes. Offer valid March 10th - May 31st, 2026.</p>
            </div>
        </div>
        <div class="kedi-promo-banner-actions">
            <button class="kedi-promo-btn" onclick="event.stopPropagation(); openPromoModal()"><i class="fas fa-eye"></i> View Poster</button>
            <button class="kedi-promo-btn share" onclick="event.stopPropagation(); sharePromo()"><i class="fas fa-share-alt"></i> Share</button>
        </div>
    </div>
</div>

<div class="kedi-promo-modal" id="kediPromoModal" onclick="closePromoModal()">
    <div class="kedi-promo-modal-content" onclick="event.stopPropagation()">
        <button class="kedi-promo-modal-close" onclick="closePromoModal()"><i class="fas fa-times"></i></button>
        <img src="assets/img/promo/kedi-2026-award.jpg" alt="Kedi 2026 Promo Full" class="kedi-promo-modal-img">
    </div>
</div>

<script>
function openPromoModal() {
    document.getElementById('kediPromoModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closePromoModal() {
    document.getElementById('kediPromoModal').classList.remove('active');
    document.body.style.overflow = '';
}
function sharePromo() {
    if (navigator.share) {
        navigator.share({
            title: 'KEDI 2026 Perform and Win Award',
            text: 'Register and upgrade to Three Star Consultant to win amazing prizes! TVs, Refrigerators, Air Conditioners and more! Offer valid till May 31st, 2026.',
            url: window.location.href
        }).catch(console.error);
    } else {
        alert('Share feature is not supported on this browser. Copy the page URL to share!');
    }
}
</script>
<!-- KEDI PROMO BANNER END -->
`;

function injectPromo(filePath) {
    if (!fs.existsSync(filePath)) return;
    
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Check if already injected
    if (html.includes('KEDI PROMO BANNER START')) {
        console.log(`Promo already exists in ${filePath}`);
        
        // Update it if it exists (replace old banner)
        html = html.replace(/<!-- KEDI PROMO BANNER START -->[\s\S]*?<!-- KEDI PROMO BANNER END -->/, promoHtml);
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`Updated promo in ${filePath}`);
        return;
    }
    
    // Inject right after <main>
    if (html.includes('<main>')) {
        html = html.replace('<main>', '<main>\n' + promoHtml);
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`Successfully injected promo into ${filePath} (after <main>)`);
        return;
    } 
    
    // Alternative inject after <div class="body_wrap"> or somewhere near top
    if (html.includes('<div class="body_wrap">')) {
        html = html.replace('<div class="body_wrap">', '<div class="body_wrap">\n' + promoHtml);
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`Successfully injected promo into ${filePath} (after body_wrap)`);
        return;
    }
    
    console.log(`Could not find a good injection point for ${filePath}`);
}

const targetFiles = [
    'kedi.html',
    'home-3.html',
    'Farforlife.html'
];

targetFiles.forEach(file => injectPromo(file));
