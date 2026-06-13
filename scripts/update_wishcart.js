const path = require('path');
const fs = require('fs');

const wishcartJsPath = 'assets/js/wishcart.js';
let wishcartCode = fs.readFileSync(wishcartJsPath, 'utf8');

// We need to inject a renderSidebarCart() function and call it inside updateGlobalCounts or initialization.

const renderSidebarFunc = `
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
                    if (sidebarTotal) sidebarTotal.textContent = "₦0";
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
                    div.innerHTML = \`
                        <div class="item_image w-20 h-20 bg-gray-50 rounded-xl overflow-hidden mr-4">
                            <img src="\${item.image || 'assets/img/product/default.png'}" alt="\${item.title}" class="w-full h-full object-contain">
                        </div>
                        <div class="item_content flex-1 relative">
                            <h4 class="item_title font-bold text-sm text-gray-800 leading-tight mb-1 pr-6">
                                \${item.title} (x\${qty})
                            </h4>
                            <span class="item_price font-black text-emerald-600">₦\${total.toLocaleString()}</span>
                            <button type="button" class="remove_btn absolute top-0 right-0 text-red-500 hover:text-red-700" data-index="\${index}"><i class="fal fa-times"></i></button>
                        </div>
                    \`;
                    sidebarList.appendChild(div);
                });

                if (sidebarTotal) sidebarTotal.textContent = \`₦\${subtotal.toLocaleString()}\`;
                if (headingTitle) headingTitle.textContent = totalItems;
            }
`;

// Insert the new function into wishcart.js
if (!wishcartCode.includes('renderSidebarCart')) {
    wishcartCode = wishcartCode.replace('// --- Real-Time Cart Rendering ---', renderSidebarFunc + '\n            // --- Real-Time Cart Rendering ---');
    
    // Call it in render functions and event listeners
    wishcartCode = wishcartCode.replace(/renderCartPage\(\);/g, 'renderCartPage();\n                    renderSidebarCart();');
    
    // Also attach event listener for remove buttons in sidebar
    const sidebarEvents = `
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
`;
    wishcartCode = wishcartCode.replace('// --- Wishlist Management ---', sidebarEvents + '\n            // --- Wishlist Management ---');
    
    // Add it to initialization
    wishcartCode = wishcartCode.replace('renderCheckoutPage();', 'renderCheckoutPage();\n            renderSidebarCart();');

    fs.writeFileSync(wishcartJsPath, wishcartCode, 'utf8');
    console.log('Updated wishcart.js to dynamically render the sidebar cart.');
} else {
    console.log('wishcart.js already has renderSidebarCart.');
}
