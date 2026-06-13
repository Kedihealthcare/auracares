/**
 * Kedi Healthcare - Global Cart System
 */

const CartSystem = {
    init() {
        console.log("Cart System Initializing...");
        this.updateHeaderCount();
        this.updateAuthState();
        this.attachGlobalListeners();
    },

    updateAuthState() {
        const user = JSON.parse(localStorage.getItem('kedi_user'));
        const authLinks = document.querySelectorAll('a[href*="auth.html"], a[href*="login"], a[href*="register"]');
        
        if (user) {
            authLinks.forEach(link => {
                const text = link.innerText.toLowerCase();
                if (text.includes('sign in') || text.includes('register') || text.includes('login') || text === '') {
                    link.innerHTML = '<i class="fas fa-user-circle"></i> ' + (user.name ? user.name.split(' ')[0] : 'Member');
                    link.href = 'account.html';
                    link.title = 'My Clinical Dashboard';
                }
            });

            // Target the specific user icon in headers
            const userIcons = document.querySelectorAll('.header__icons .icon img[src*="user.svg"]');
            userIcons.forEach(img => {
                const link = img.closest('a');
                if (link) {
                    link.href = 'account.html';
                }
            });
        }
        
        this.ensureCartVisibility();
    },

    ensureCartVisibility() {
        // Find cart icons and ensure they are visible and linked to cart.html
        const cartIcons = document.querySelectorAll('.header-cart, .header__icons .cart, a[href*="cart.html"]');
        const cartImages = document.querySelectorAll('img[src*="cart.svg"]');
        
        cartImages.forEach(img => {
            const link = img.closest('a');
            if (link) {
                link.href = 'cart.html';
                link.style.display = 'flex';
            }
        });

        cartIcons.forEach(icon => {
            icon.style.display = 'flex';
            if (icon.tagName === 'A') icon.href = 'cart.html';
        });
    },

    getCart() {
        return JSON.parse(localStorage.getItem('kedi_cart') || '[]');
    },

    saveCart(cart) {
        localStorage.setItem('kedi_cart', JSON.stringify(cart));
        this.updateHeaderCount();
    },

    addToCart(item) {
        const cart = this.getCart();
        const existing = cart.find(i => i.id === item.id);
        
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
        
        this.saveCart(cart);
        this.showNotification(`Added ${item.name} to cart!`);
    },

    updateHeaderCount() {
        const cart = this.getCart();
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        
        const countEls = document.querySelectorAll('.cart-count, .header__icons .count, #cart-count, .cart_btn .count');
        countEls.forEach(el => {
            el.innerText = totalItems;
        });
    },

    showNotification(message) {
        let toast = document.getElementById('cart-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'cart-toast';
            toast.style.cssText = `
                position: fixed;
                bottom: 100px;
                right: 20px;
                background: #10b981;
                color: white;
                padding: 12px 24px;
                border-radius: 50px;
                font-weight: 700;
                font-size: 14px;
                box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
                z-index: 10000;
                transform: translateY(100px);
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                display: flex;
                align-items: center;
                gap: 10px;
            `;
            document.body.appendChild(toast);
        }
        
        toast.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        toast.style.transform = 'translateY(0)';
        
        setTimeout(() => {
            toast.style.transform = 'translateY(150px)';
        }, 3000);
    },

    attachGlobalListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.add-to-cart-btn')) {
                const btn = e.target.closest('.add-to-cart-btn');
                const id = btn.dataset.id;
                const name = btn.dataset.name;
                const price = btn.dataset.price;
                const img = btn.dataset.img;
                
                this.addToCart({ id, name, price, img });
            }
        });
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => CartSystem.init());

// Global Compatibility Wrapper
window.addToCart = function(id, name, price, img) {
    CartSystem.addToCart({ id, name, price, img });
};

// Export globally
window.KediCart = CartSystem;