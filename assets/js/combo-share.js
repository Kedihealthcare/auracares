/**
 * Aura Herbs - Social Sharing Utility
 * Handles dynamic sharing of Clinical Combo Packs with optimized metadata.
 */

const ComboShare = {
    init() {
        document.addEventListener('click', (e) => {
            const shareBtn = e.target.closest('.combo-share-btn');
            if (shareBtn) {
                this.handleShare(e, shareBtn);
            }
        });
    },

    handleShare(e, btn) {
        e.preventDefault();
        const card = btn.closest('.combo-hover-item');
        if (!card) return;

        try {
            const info = JSON.parse(card.dataset.comboInfo);
            const currentCurrency = localStorage.getItem('kedi_currency') || 'NGN';
            const price = info.price.toLocaleString();
            const symbol = currentCurrency === 'NGN' ? '₦' : (currentCurrency === 'PI' ? 'π' : '$');

            const shareTitle = `Aura Herbs: ${info.title}`;
            const shareText = `Verified Clinical Protocol: ${info.title}\nPrice: ${symbol}${price}\n\n${info.benefits}\n\nView Protocol: `;
            const slug = info.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            const shareUrl = window.location.origin + '/combos/' + slug + '.html';

            if (typeof window.openAuraHerbsShare === 'function') {
                window.openAuraHerbsShare(shareTitle, shareText, shareUrl);
            } else {
                if (navigator.share) {
                    navigator.share({
                        title: shareTitle,
                        text: shareText,
                        url: shareUrl
                    }).catch(err => this.fallbackShare(shareTitle, shareText, shareUrl));
                } else {
                    this.fallbackShare(shareTitle, shareText, shareUrl);
                }
            }
        } catch (err) {
            console.error('Sharing failed:', err);
        }
    },

    fallbackShare(title, text, url) {
        // Create a temporary social modal or simple copy-to-clipboard
        const fullContent = `${text} ${url}`;
        
        // Copy to clipboard
        const el = document.createElement('textarea');
        el.value = fullContent;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);

        // Show a custom Aura-styled notification
        this.showToast('Protocol link copied to clipboard!');

        // Open WhatsApp as a primary fallback
        const waUrl = `https://wa.me/?text=${encodeURIComponent(fullContent)}`;
        setTimeout(() => {
            if (confirm('Link copied! Would you like to share it on WhatsApp?')) {
                window.open(waUrl, '_blank');
            }
        }, 500);
    },

    showToast(message) {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: #10b981;
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            font-weight: bold;
            box-shadow: 0 10px 25px rgba(16, 185, 129, 0.4);
            z-index: 10000;
            animation: toast-in 0.4s ease-out;
        `;
        toast.innerText = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'toast-out 0.4s ease-in forwards';
            setTimeout(() => toast.remove(), 400);
        }, 3000);

        // Add keyframes if not exists
        if (!document.getElementById('aura-toast-styles')) {
            const style = document.createElement('style');
            style.id = 'aura-toast-styles';
            style.innerHTML = `
                @keyframes toast-in { from { bottom: -50px; opacity: 0; } to { bottom: 30px; opacity: 1; } }
                @keyframes toast-out { from { bottom: 30px; opacity: 1; } to { bottom: -50px; opacity: 0; } }
            `;
            document.head.appendChild(style);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => ComboShare.init());
