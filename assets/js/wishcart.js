        document.addEventListener('DOMContentLoaded', function () {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            
            // --- Global Sync Elements ---
            const cartCountElements = document.querySelectorAll('.cart_btn .count, .cart-count');
            const wishlistCountElements = document.querySelectorAll('.wishlist-icon .count, .wishlist-count, .wish-count');

            // --- Page Specific Elements ---

const cartTableBody = document.querySelector('.woocommerce-cart tbody');
            const cartSubtotalEl = document.querySelector('.cart-subtotal .amount');
            const cartTotalEl = document.querySelector('.order-total .amount');
            const wishlistTableBody = document.querySelector('.wishlist-table tbody');
            const checkoutTableBody = document.querySelector('.woocommerce-checkout-review-order-table tbody');

            function updateGlobalCounts() {
                const cartTotalCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
                cartCountElements.forEach(el => {
                    el.textContent = cartTotalCount;
                    el.classList.add('price-animate');
                    el.addEventListener('animationend', () => el.classList.remove('price-animate'), { once: true });
                });
                wishlistCountElements.forEach(el => {
                    el.textContent = wishlist.length;
                    el.classList.add('price-animate');
                    el.addEventListener('animationend', () => el.classList.remove('price-animate'), { once: true });
                });
                localStorage.setItem('cart', JSON.stringify(cart));
                localStorage.setItem('wishlist', JSON.stringify(wishlist));
            }

            
            // --- Real-Time Sidebar Rendering ---
            function renderSidebarCart() {
                const sidebarList = document.querySelector('.cart_items_list');
                const sidebarTotal = document.querySelector('.cart_sidebar .total_price span:nth-child(2)');
                const headingTitle = document.querySelector('.cart_sidebar .heading_title span');
                
                if (!sidebarList) return;
                
                sidebarList.innerHTML = '';
                let subtotal = 0;
                let totalItems = 0;

                if (cart.length === 0) {
                    sidebarList.innerHTML = '<div class="text-center py-5 text-gray-500">Your clinical cart is empty.</div>';
                    if (sidebarTotal) sidebarTotal.textContent = window.CurrencyManager ? CurrencyManager.format(0) : "₦0";
                    if (headingTitle) headingTitle.textContent = "0";
                    return;
                }

                cart.forEach((item, index) => {
                    const price = parseFloat(item.price) || 0;
                    const qty = item.quantity || 1;
                    const total = price * qty;
                    subtotal += total;
                    totalItems += qty;

                    const div = document.createElement('div');
                    div.className = 'cart_item flex items-center mb-4 p-3 rounded-2xl hover:bg-emerald-50 transition-all border border-transparent hover:border-emerald-100';
                    div.innerHTML = `
                        <div class="item_image w-20 h-20 bg-gray-50 rounded-xl overflow-hidden mr-4">
                            <img src="${item.image || 'assets/img/product/default.png'}" alt="${item.title}" class="w-full h-full object-contain">
                        </div>
                        <div class="item_content flex-1 relative">
                            <h4 class="item_title font-bold text-sm text-gray-800 leading-tight mb-1 pr-6">
                                ${item.title} (x${qty})
                            </h4>
                            <span class="item_price font-black text-emerald-600">${window.CurrencyManager ? CurrencyManager.format(total) : `₦${total.toLocaleString()}`}</span>
                            <button type="button" class="remove_btn absolute top-0 right-0 text-red-500 hover:text-red-700" data-index="${index}"><i class="fal fa-times"></i></button>
                        </div>
                    `;
                    sidebarList.appendChild(div);
                });

                if (sidebarTotal) sidebarTotal.textContent = window.CurrencyManager ? CurrencyManager.format(subtotal) : `₦${subtotal.toLocaleString()}`;
                if (headingTitle) headingTitle.textContent = totalItems;
            }

            // --- Real-Time Cart Rendering ---
            function renderCartPage() {
                if (!cartTableBody) return;
                cartTableBody.innerHTML = '';
                let subtotal = 0;

                if (cart.length === 0) {
                    cartTableBody.innerHTML = '<tr><td colspan="6" class="text-center py-10">Your cart is empty. <a href="home-3.html" class="text-emerald-500 font-bold underline">Go Shopping</a></td></tr>';
                    if (cartSubtotalEl) cartSubtotalEl.textContent = window.CurrencyManager ? CurrencyManager.format(0) : "₦0";
                    if (cartTotalEl) cartTotalEl.textContent = window.CurrencyManager ? CurrencyManager.format(0) : "₦0";
                    return;
                }

                cart.forEach((item, index) => {
                    const price = parseFloat(item.price) || 0;
                    const qty = item.quantity || 1;
                    const total = price * qty;
                    subtotal += total;

                    const row = document.createElement('tr');
                    row.className = 'cart_single';
                    row.innerHTML = `
                        <td class="product-remove"><a href="#!" class="remove" data-index="${index}">&times;</a></td>
                        <td class="product-thumbnail"><img width="57" height="70" src="${item.image || 'assets/img/product/default.png'}" alt="${item.title}"></td>
                        <td class="product-name">${item.title}</td>
                        <td class="product-price">${window.CurrencyManager ? CurrencyManager.format(price) : `₦${price.toLocaleString()}`}</td>
                        <td class="product-quantity">
                            <div class="quantity flex items-center gap-2">
                                <button class="qty-minus px-2 py-1 bg-gray-100 rounded" data-index="${index}">-</button>
                                <input type="number" value="${qty}" class="w-12 text-center border-none bg-transparent" readonly>
                                <button class="qty-plus px-2 py-1 bg-gray-100 rounded" data-index="${index}">+</button>
                            </div>
                        </td>
                        <td class="product-subtotal">${window.CurrencyManager ? CurrencyManager.format(total) : `₦${total.toLocaleString()}`}</td>
                    `;
                    cartTableBody.appendChild(row);
                });

                if (cartSubtotalEl) cartSubtotalEl.textContent = window.CurrencyManager ? CurrencyManager.format(subtotal) : `₦${subtotal.toLocaleString()}`;
                if (cartTotalEl) cartTotalEl.textContent = window.CurrencyManager ? CurrencyManager.format(subtotal) : `₦${subtotal.toLocaleString()}`;
            }

            // --- Real-Time Checkout Rendering ---
            function renderCheckoutPage() {
                if (!checkoutTableBody) return;
                checkoutTableBody.innerHTML = '';
                let subtotal = 0;

                if (cart.length === 0) {
                    checkoutTableBody.innerHTML = '<tr class="cart_single"><td colspan="2" class="text-center py-5">Your cart is empty. <a href="shop.html" class="text-emerald-500 font-bold underline">Go Shopping</a></td></tr>';
                    if (cartSubtotalEl) cartSubtotalEl.textContent = window.CurrencyManager ? CurrencyManager.format(0) : "₦0";
                    if (cartTotalEl) cartTotalEl.textContent = window.CurrencyManager ? CurrencyManager.format(0) : "₦0";
                    return;
                }

                cart.forEach((item) => {
                    const price = parseFloat(item.price) || 0;
                    const qty = item.quantity || 1;
                    const total = price * qty;
                    subtotal += total;

                    const row = document.createElement('tr');
                    row.className = 'cart_single';
                    row.innerHTML = `
                        <td class="product-name">
                            ${item.title} <strong class="product-quantity">&times; ${qty}</strong> 
                        </td>
                        <td class="product-total text-right">
                            <span class="woocommerce-Price-amount amount">${window.CurrencyManager ? CurrencyManager.format(total) : `₦${total.toLocaleString()}`}</span>
                        </td>
                    `;
                    checkoutTableBody.appendChild(row);
                });

                if (cartSubtotalEl) cartSubtotalEl.textContent = window.CurrencyManager ? CurrencyManager.format(subtotal) : `₦${subtotal.toLocaleString()}`;
                if (cartTotalEl) cartTotalEl.textContent = window.CurrencyManager ? CurrencyManager.format(subtotal) : `₦${subtotal.toLocaleString()}`;
            }

            // --- WhatsApp Checkout Logic ---
            window.checkoutWhatsApp = function() {
                if (cart.length === 0) return alert("Your cart is empty!");
                
                let msg = `*AURA HERBS - ORDER SUMMARY*\n`;
                msg += `--------------------------\n`;
                msg += `*Items:*\n`;
                
                let subtotal = 0;
                cart.forEach((item, i) => {
                    const total = (parseFloat(item.price) || 0) * (item.quantity || 1);
                    subtotal += total;
                    const formattedItemPrice = window.CurrencyManager ? CurrencyManager.format(total) : `₦${total.toLocaleString()}`;
                    msg += `${i+1}. ${item.title} x${item.quantity} - ${formattedItemPrice}\n`;
                });
                
                msg += `--------------------------\n`;
                const formattedTotal = window.CurrencyManager ? CurrencyManager.format(subtotal) : `₦${subtotal.toLocaleString()}`;
                msg += `*Total Amount:* ${formattedTotal}\n`;
                msg += `--------------------------\n`;
                msg += `_This order is generated via Aura Herbs Diagnostic Platform._\n`;
                msg += `_Please confirm availability and delivery details._`;

                const phone = "2348123456789"; // Replace with your business number
                window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
            };

            // --- Event Handlers ---
            if (cartTableBody) {
                cartTableBody.addEventListener('click', (e) => {
                    const index = e.target.closest('[data-index]')?.dataset.index;
                    if (index === undefined) return;

                    if (e.target.classList.contains('remove')) {
                        cart.splice(index, 1);
                    } else if (e.target.classList.contains('qty-plus')) {
                        cart[index].quantity = (cart[index].quantity || 1) + 1;
                    } else if (e.target.classList.contains('qty-minus')) {
                        if (cart[index].quantity > 1) cart[index].quantity--;
                    }
                    
                    updateGlobalCounts();
                    renderCartPage();
                    renderSidebarCart();
                    renderCheckoutPage();
                });
            }

            
            // Sidebar cart events
            const sidebarList = document.querySelector('.cart_items_list');
            if (sidebarList) {
                sidebarList.addEventListener('click', (e) => {
                    const btn = e.target.closest('.remove_btn');
                    if (btn) {
                        const index = btn.dataset.index;
                        if (index !== undefined) {
                            cart.splice(index, 1);
                            updateGlobalCounts();
                            renderCartPage();
                            renderSidebarCart();
                            renderCheckoutPage();
                        }
                    }
                });
            }

            // --- Wishlist Management ---
            window.addToWishlist = function(title, price, image) {
                if (!wishlist.some(i => i.title === title)) {
                    wishlist.push({ title, price, image });
                    updateGlobalCounts();
                    alert("Added to Wishlist!");
                }
            };

            window.addToCart = function(title, price, image) {
                const existing = cart.find(i => i.title === title);
                if (existing) {
                    existing.quantity++;
                } else {
                    cart.push({ title, price, image, quantity: 1 });
                }
                updateGlobalCounts();
                alert("Added to Cart!");
            };

            // --- Initialization ---
            updateGlobalCounts();
            renderCartPage();
            renderSidebarCart();
            renderCheckoutPage();

            // --- Global Listener for Premium Buttons ---
            document.addEventListener('click', (e) => {
                const premiumBtn = e.target.closest('.add-to-cart-premium');
                if (premiumBtn) {
                    e.preventDefault();
                    // Try different container classes
                    const productItem = premiumBtn.closest('.product__item, .feature-product__single, .feature-product__single2, .tx-product');
                    if (productItem) {
                        // Try different title selectors
                        const title = productItem.querySelector('.product__title, .title, h3 a, h2 a')?.innerText || "KEDI Product";
                        // Try different price selectors
                        const priceText = productItem.querySelector('.new, .product__price .new')?.innerText || "0";
                        const price = parseFloat(priceText.replace(/[^\d.]/g, '')) || 0;
                        const image = productItem.querySelector('img')?.src || "";
                        window.addToCart(title, price, image);
                    }
                }
            });

            // --- Currency Change Listener ---
            window.addEventListener('auraCurrencyChanged', () => {
                renderCartPage();
                renderSidebarCart();
                renderCheckoutPage();
            });
        });