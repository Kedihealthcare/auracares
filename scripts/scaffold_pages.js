const fs = require('fs');
const path = require('path');
const __dirname_root = path.join(__dirname, '..');

const sourceFile = path.join(__dirname_root, 'home-3.html');
const sourceHtml = fs.readFileSync(sourceFile, 'utf8');

// Extract header and footer
const headerMatch = sourceHtml.match(/<header[\s\S]*?<\/header>/);
const footerMatch = sourceHtml.match(/<footer[\s\S]*?<\/footer>/);
const headMatch = sourceHtml.match(/<head>[\s\S]*?<\/head>/);

const header = headerMatch ? headerMatch[0] : '';
const footer = footerMatch ? footerMatch[0] : '';
const head = headMatch ? headMatch[0] : '';

function createPage(filename, title, content) {
    const pageHtml = `<!doctype html>
<html lang="zxx">
${head.replace(/<title>.*?<\/title>/, `<title>Kedi Healthcare | ${title}</title>`)}
<body>
    <div class="body_wrap">
        ${header}
        <main>
            <section class="breadcrumb-area pt-50 pb-50" style="background: #f8fafc;">
                <div class="container">
                    <div class="breadcrumb-content text-center">
                        <h2 class="title">${title}</h2>
                        <ul class="breadcrumb-list ul_li_center">
                            <li><a href="kedi.html">Home</a></li>
                            <li>${title}</li>
                        </ul>
                    </div>
                </div>
            </section>
            ${content}
        </main>
        ${footer}
    </div>
    <script src="assets/js/jquery.min.js"></script>
    <script src="assets/js/bootstrap.bundle.min.js"></script>
    <script src="assets/js/cart.js"></script>
    <script>
        // Update dates and auth state
        document.addEventListener('DOMContentLoaded', () => {
            const now = new Date();
            const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
            document.querySelectorAll('.header-date').forEach(el => el.innerHTML = '<i class="far fa-calendar-alt"></i> ' + dateStr);
        });
    </script>
</body>
</html>`;

    fs.writeFileSync(path.join(__dirname_root, filename), pageHtml);
    console.log(`Scaffolded ${filename}`);
}

// 1. About Page
createPage('about.html', 'About Kedi Healthcare', `
    <section class="about-section pt-100 pb-100">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6">
                    <div class="about-img">
                        <img src="assets/img/gallery/Roadmap.jpg" alt="Kedi Healthcare">
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="about-content pl-50">
                        <span class="text-xs font-black uppercase tracking-[0.3em] text-blue-600">Our Mission</span>
                        <h2 class="title mt-3 serif-heading text-4xl">Clinical Excellence in Herbal Intelligence</h2>
                        <p class="mt-6 text-slate-500">Kedi Healthcare (Kedi-J) is a global leader in clinical diagnostics and herbal wellness. We combine ancient herbal wisdom with modern AI intelligence to provide personalized health solutions for the 21st century.</p>
                        <p class="mt-4 text-slate-500">Our protocols are backed by rigorous clinical observations and are designed to empower individuals to take control of their health through natural, high-potency formulations.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
`);

// 2. Cart Page
createPage('cart.html', 'Shopping Cart', `
    <section class="cart-section pt-100 pb-100">
        <div class="container">
            <div id="cart-content-area" class="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
                <div class="p-8 text-center text-slate-500">
                    <div class="mb-4"><i class="fas fa-shopping-basket text-4xl"></i></div>
                    <p>Your cart is being analyzed by the clinical ecosystem...</p>
                </div>
            </div>
            <script>
                document.addEventListener('DOMContentLoaded', () => {
                    const cart = JSON.parse(localStorage.getItem('kedi_cart') || '[]');
                    const container = document.getElementById('cart-content-area');
                    if (cart.length === 0) {
                        container.innerHTML = '<div class="p-16 text-center text-slate-500"><p>Your clinical cart is empty.</p><a href="shop.html" class="thm-btn mt-6">Browse Products</a></div>';
                        return;
                    }
                    
                    let html = '<div class="table-responsive"><table class="table mb-0"><thead><tr class="bg-slate-50"><th>Product</th><th>Price</th><th>Quantity</th><th>Subtotal</th></tr></thead><tbody>';
                    let total = 0;
                    cart.forEach(item => {
                        const subtotal = parseFloat(item.price.replace('π', '')) * item.quantity;
                        total += subtotal;
                        html += \`<tr>
                            <td>
                                <div class="flex items-center gap-4">
                                    <img src="\${item.img}" style="width: 50px; height: 50px; object-fit: contain;">
                                    <span class="font-bold">\${item.name}</span>
                                </div>
                            </td>
                            <td>\${item.price}</td>
                            <td>\${item.quantity}</td>
                            <td>\${subtotal.toFixed(8)}π</td>
                        </tr>\`;
                    });
                    html += \`</tbody></table></div>
                    <div class="p-8 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                        <div><h3 class="text-xl font-black">Total: \${total.toFixed(8)}π</h3></div>
                        <a href="checkout.html" class="thm-btn">Proceed to Checkout</a>
                    </div>\`;
                    container.innerHTML = html;
                });
            </script>
        </div>
    </section>
`);

// 3. Checkout Page
createPage('checkout.html', 'Clinical Checkout', `
    <section class="checkout-section pt-100 pb-100">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <div class="checkout-form bg-white p-10 rounded-3xl border border-slate-100 shadow-sm">
                        <h3 class="title mb-30 font-black">Shipping Details</h3>
                        <form class="row g-4">
                            <div class="col-md-6"><input type="text" class="form-control" placeholder="First Name"></div>
                            <div class="col-md-6"><input type="text" class="form-control" placeholder="Last Name"></div>
                            <div class="col-12"><input type="email" class="form-control" placeholder="Email Address"></div>
                            <div class="col-12"><input type="text" class="form-control" placeholder="Pi Wallet Address"></div>
                        </form>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="order-summary bg-slate-950 text-white p-10 rounded-3xl">
                        <h3 class="title mb-30 font-black">Order Summary</h3>
                        <p class="text-slate-400">Please complete your clinical information to finalize the π-transaction.</p>
                        <button class="w-full thm-btn mt-6">Confirm & Pay with π</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
`);

// 4. Shop Page
createPage('shop.html', 'Product Catalog', `
    <section class="shop-section pt-100 pb-100">
        <div class="container">
            <div id="shop-product-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <!-- Dynamically populated if needed, or static placeholder -->
                <p class="col-span-full text-center text-slate-500">Initializing product intelligence...</p>
            </div>
        </div>
        <script>
            document.addEventListener('DOMContentLoaded', () => {
                // For a quick fix, we'll populate with common products
                const products = [
                    { id: 'reishi', name: 'Reishi Capsule', price: '0.00008107π', img: 'assets/img/product/Reishi.png' },
                    { id: 'revive', name: 'Revive Capsule', price: '0.00010317π', img: 'assets/img/product/Revive.png' },
                    { id: 'diawell', name: 'Diawell Tablet', price: '0.00007542π', img: 'assets/img/product/DIAWELL.png' },
                    { id: 'cardibetter', name: 'Cardibetter', price: '0.00008912π', img: 'assets/img/product/CARDIBETTER222.png' }
                ];
                const grid = document.getElementById('shop-product-grid');
                grid.innerHTML = products.map(p => \`
                    <div class="product-item p-6 bg-white border border-slate-100 rounded-3xl text-center">
                        <img src="\${p.img}" class="mx-auto mb-4" style="height: 150px; object-fit: contain;">
                        <h4 class="font-bold">\${p.name}</h4>
                        <p class="text-blue-600 font-black mb-4">\${p.price}</p>
                        <button onclick="KediCart.addToCart({id: '\${p.id}', name: '\${p.name}', price: '\${p.price}', img: '\${p.img}'})" class="thm-btn btn-sm">Add to Cart</button>
                    </div>
                \`).join('');
            });
        </script>
    </section>
`);

// 5. Account Page (Redirects to auth if not logged in)
createPage('account.html', 'My Account', `
    <section class="account-section pt-100 pb-100">
        <div class="container">
            <div id="account-dashboard" class="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm text-center">
                <p>Loading clinical profile...</p>
            </div>
        </div>
        <script>
            document.addEventListener('DOMContentLoaded', () => {
                const user = JSON.parse(localStorage.getItem('kedi_user_session'));
                const container = document.getElementById('account-dashboard');
                if (!user) {
                    window.location.href = 'auth.html';
                    return;
                }
                container.innerHTML = \`
                    <h2 class="serif-heading text-3xl mb-4">Welcome, \${user.name}</h2>
                    <p class="text-slate-500 mb-8">Access your clinical reports, orders, and π-wallet history here.</p>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                        <div class="p-6 bg-slate-50 rounded-2xl">
                            <h4 class="font-bold uppercase text-xs tracking-widest mb-3">Order History</h4>
                            <p class="text-sm text-slate-400">No π-transactions found.</p>
                        </div>
                        <div class="p-6 bg-slate-50 rounded-2xl">
                            <h4 class="font-bold uppercase text-xs tracking-widest mb-3">Clinical Profile</h4>
                            <p class="text-sm text-slate-900">\${user.email}</p>
                        </div>
                        <div class="p-6 bg-slate-50 rounded-2xl">
                            <h4 class="font-bold uppercase text-xs tracking-widest mb-3">Settings</h4>
                            <a href="#" onclick="localStorage.removeItem('kedi_user_session'); window.location.reload();" class="text-red-500 text-sm font-bold">Logout</a>
                        </div>
                    </div>
                \`;
            });
        </script>
    </section>
`);

// 6. Shop Single (Placeholder for a specific product)
createPage('shop-single.html', 'Product Details', `
    <section class="shop-single-section pt-100 pb-100">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <img src="assets/img/product/Reishi.png" class="w-full rounded-3xl border border-slate-100" alt="Product">
                </div>
                <div class="col-lg-6">
                    <div class="pl-50">
                        <span class="text-xs font-black uppercase tracking-[0.3em] text-blue-600">Product Highlight</span>
                        <h2 class="title mt-3 serif-heading text-4xl">Reishi Capsule</h2>
                        <p class="text-2xl font-black text-blue-600 mt-4 mb-6">0.00008107π</p>
                        <p class="text-slate-500 mb-8">Premium clinical-grade Ganoderma Lucidum extract for immune modulation and metabolic health. A cornerstone of the Kedi Healthcare clinical protocol.</p>
                        <button onclick="KediCart.addToCart({id: 'reishi', name: 'Reishi Capsule', price: '0.00008107π', img: 'assets/img/product/Reishi.png'})" class="thm-btn">Add to Clinical Cart</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
`);

console.log("All e-commerce scaffold pages created.");
