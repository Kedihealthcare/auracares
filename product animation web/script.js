/* ================================================
   AURA HERBS — Showcase Script v3.0
   All 41 products | Carousel | Grid | Modal | Cart
   ================================================ */

// ── Featured products for hero carousel (first 8) ────────
const KEDI_FEATURED_IDS = [
  'diawell','reishi','cardibetter','refresh-tea',
  'golden-six','magilim','memory-247','vip-chair'
];

// ── Utility: format price ────────────────────────────────
const fmt = (n) => window.CurrencyManager ? window.CurrencyManager.format(n) : '₦' + Number(n).toLocaleString('en-NG');

// ── Cart (localStorage) ──────────────────────────────────
const getCart  = ()     => JSON.parse(localStorage.getItem('kedi_cart') || '[]');
const saveCart = (cart) => {
  localStorage.setItem('kedi_cart', JSON.stringify(cart));
  // Broadcast update for main site sync
  window.dispatchEvent(new Event('storage'));
};

const addToCart = (id, name, price, img) => {
  const cart = getCart();
  const ex   = cart.find(i => i.id === id);
  if (ex) {
    ex.quantity = (parseInt(ex.quantity) || 0) + 1;
  } else {
    // Standardize image path for global cart compatibility
    const cartImg = img.startsWith('images/') ? 'product animation web/' + img : img;
    cart.push({ id, name, price: Number(price), img: cartImg, quantity: 1 });
  }
  saveCart(cart);
  updateCartBadge();
  showToast(`✅ ${name} added to cart!`);
};

const updateCartBadge = () => {
  const total = getCart().reduce((s, i) => s + (parseInt(i.quantity) || 1), 0);
  document.querySelectorAll('#cart-count').forEach(el => el.textContent = total);
};

const showToast = (msg) => {
  const t = document.getElementById('cartToast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2800);
};

// ── Wishlist ─────────────────────────────────────────────
const getWishlist  = ()  => JSON.parse(localStorage.getItem('kedi_wish') || '[]');
const toggleWish   = (id) => {
  const w = getWishlist();
  const idx = w.indexOf(id);
  if (idx > -1) w.splice(idx, 1); else w.push(id);
  localStorage.setItem('kedi_wish', JSON.stringify(w));
  return idx === -1; // true = added
};

// ═══════════════════════════════════════════════════════
// HERO CAROUSEL
// ═══════════════════════════════════════════════════════
const buildCarousel = () => {
  const list = document.getElementById('carouselList');
  const dots = document.getElementById('carouselDots');
  if (!list || !window.KEDI_PRODUCTS) return;

  const featured = KEDI_FEATURED_IDS.map(id =>
    KEDI_PRODUCTS.find(p => p.id === id)
  ).filter(Boolean);

  // Build items
  featured.forEach((p, i) => {
    const item = document.createElement('div');
    item.className = 'item';
    item.dataset.product = p.id;
    item.innerHTML = `
      <img src="${p.img}" alt="${p.name}" loading="${i < 3 ? 'eager' : 'lazy'}">
      <div class="introduce">
        <div class="title">CLINICAL PROTOCOL</div>
        <div class="topic">${p.name.replace(' ', '<br>')}</div>
        <div class="des">${p.desc.substring(0, 130)}…</div>
        <button class="seeMore">SEE PROTOCOL &#8599;</button>
      </div>
      <div class="detail">
        <div class="title">${p.name.split(' ').slice(0,2).join(' ')}</div>
        <div class="des">${p.desc}</div>
        <div class="specifications">
          <div><p>Category</p><p>${p.cat.charAt(0).toUpperCase()+p.cat.slice(1)}</p></div>
          <div><p>Dosage</p><p>${p.dose}</p></div>
          <div><p>Duration</p><p>${p.duration}</p></div>
          <div><p>Efficacy</p><p>${p.efficacy}</p></div>
          <div><p>Price</p><p data-base-price="${p.price}">${fmt(p.price)}</p></div>
        </div>
        <div class="checkout">
          <button class="btn-add-cart" data-product="${p.id}" data-price="${p.price}" data-name="${p.name}" data-img="${p.img}">ADD TO CART</button>
          <button class="btn-checkout" onclick="window.location='../shop.html'">VIEW ALL</button>
        </div>
      </div>`;
    list.appendChild(item);

    // dot
    const dot = document.createElement('span');
    dot.className = 'dot' + (i === 1 ? ' active' : '');
    dot.onclick = () => goToSlide(i);
    dots.appendChild(dot);
  });

  // Bind carousel add-to-cart
  list.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      addToCart(btn.dataset.product, btn.dataset.name, btn.dataset.price, btn.dataset.img);
      btn.textContent = '✓ ADDED';
      btn.classList.add('added');
      setTimeout(() => { btn.textContent = 'ADD TO CART'; btn.classList.remove('added'); }, 2200);
    });
  });
};

// Carousel logic
let carousel, listHTML;
const initCarousel = () => {
  carousel = document.querySelector('.carousel');
  listHTML = document.querySelector('.carousel .list');
  if (!carousel) return;

  const nextBtn = document.getElementById('next');
  const prevBtn = document.getElementById('prev');
  const backBtn = document.getElementById('back');
  if (nextBtn) nextBtn.onclick = () => showSlider('next');
  if (prevBtn) prevBtn.onclick = () => showSlider('prev');
  if (backBtn) backBtn.onclick  = () => {
    carousel.classList.remove('showDetail');
    carousel.querySelectorAll('.item:nth-child(2) img').forEach(img => img.style.animationPlayState = 'running');
  };

  // seeMore — delegate
  carousel.addEventListener('click', e => {
    if (e.target.classList.contains('seeMore')) {
      carousel.classList.remove('next','prev');
      carousel.classList.add('showDetail');
      carousel.querySelectorAll('.item:nth-child(2) img').forEach(img => img.style.animationPlayState = 'paused');
    }
  });

  // keyboard
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') showSlider('next');
    if (e.key === 'ArrowLeft')  showSlider('prev');
    if (e.key === 'Escape') carousel.classList.remove('showDetail');
  });

  // touch/swipe
  let tx = 0;
  carousel.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  carousel.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50) showSlider(dx < 0 ? 'next' : 'prev');
  });
};

let blockClick;
const showSlider = (type) => {
  const nextBtn = document.getElementById('next');
  const prevBtn = document.getElementById('prev');
  if (nextBtn) nextBtn.style.pointerEvents = 'none';
  if (prevBtn) prevBtn.style.pointerEvents = 'none';
  carousel.classList.remove('next','prev');

  const items = document.querySelectorAll('.carousel .list .item');
  if (type === 'next') { listHTML.appendChild(items[0]); carousel.classList.add('next'); }
  else                 { listHTML.prepend(items[items.length - 1]); carousel.classList.add('prev'); }

  updateDots();
  clearTimeout(blockClick);
  blockClick = setTimeout(() => {
    if (nextBtn) nextBtn.style.pointerEvents = 'auto';
    if (prevBtn) prevBtn.style.pointerEvents = 'auto';
  }, 2000);
};

const updateDots = () => {
  const dots = document.querySelectorAll('.dot');
  const items = document.querySelectorAll('.carousel .list .item');
  // active is always index 1 (the visible one)
  const activeId = items[1]?.dataset?.product;
  const fIdx = KEDI_FEATURED_IDS.indexOf(activeId);
  dots.forEach((d, i) => d.classList.toggle('active', i === fIdx));
};

const goToSlide = (target) => {
  const items = document.querySelectorAll('.carousel .list .item');
  const cur = Array.from(items).findIndex(el => el.dataset.product === KEDI_FEATURED_IDS[1]) || 1;
  const diff = target - cur;
  for (let i = 0; i < Math.abs(diff); i++) showSlider(diff > 0 ? 'next' : 'prev');
};

// ═══════════════════════════════════════════════════════
// PRODUCT GRID CATALOG
// ═══════════════════════════════════════════════════════
let activeFilter = 'all';
let searchQuery  = '';
let sortMode     = 'default';

const catLabels = {
  immunity:'Immunity', metabolic:'Metabolic', cardiac:'Cardiac',
  detox:'Detox', vitality:'Vitality', weight:'Weight', renal:'Renal',
  women:'Women', men:'Men', digestive:'Digestive', cognitive:'Cognitive',
  skin:'Skin', blood:'Blood', vision:'Vision', devices:'Device', oral:'Oral'
};

const buildCard = (p) => {
  const wish = getWishlist().includes(p.id);
  const badgeCls = ['VIP','ROYAL','HOT','MEDICAL'].includes(p.badge)
    ? `badge-${p.badge.toLowerCase()}` : '';

  const card = document.createElement('div');
  card.className = 'prod-card wow fadeInUp';
  card.dataset.id  = p.id;
  card.dataset.cat = p.cat;
  card.innerHTML = `
    <span class="prod-badge ${badgeCls}">${p.badge}</span>
    <button class="prod-wish ${wish ? 'wished' : ''}" data-id="${p.id}" title="Wishlist">
      ${wish ? '❤️' : '🤍'}
    </button>
    <div class="prod-img-wrap">
      <img src="${p.img}" alt="${p.name}" loading="lazy"
           onerror="this.src='../assets/img/product/img_130.png'">
    </div>
    <div class="prod-body">
      <p class="prod-cat">${catLabels[p.cat] || p.cat}</p>
      <h3 class="prod-name">${p.name}</h3>
      <p class="prod-desc">${p.desc}</p>
      <span class="prod-efficacy">✓ ${p.efficacy} efficacy · ${p.dose}</span>
      <div class="prod-footer">
        <div class="prod-price" data-base-price="${p.price}">
          ${fmt(p.price)}
          <small>${p.duration}</small>
        </div>
        <button class="prod-add-btn"
          data-id="${p.id}" data-name="${p.name}"
          data-price="${p.price}" data-img="${p.img}">
          + Cart
        </button>
      </div>
    </div>`;

  // Open modal on card click (not buttons)
  card.addEventListener('click', e => {
    if (e.target.classList.contains('prod-add-btn') ||
        e.target.classList.contains('prod-wish')) return;
    openModal(p);
  });

  // Add to cart
  card.querySelector('.prod-add-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    const btn = e.currentTarget;
    addToCart(btn.dataset.id, btn.dataset.name, btn.dataset.price, btn.dataset.img);
    btn.textContent = '✓ Added';
    btn.classList.add('added');
    setTimeout(() => { btn.textContent = '+ Cart'; btn.classList.remove('added'); }, 2000);
  });

  // Wishlist
  card.querySelector('.prod-wish').addEventListener('click', (e) => {
    e.stopPropagation();
    const btn = e.currentTarget;
    const added = toggleWish(btn.dataset.id);
    btn.textContent = added ? '❤️' : '🤍';
    btn.classList.toggle('wished', added);
    showToast(added ? `❤️ ${p.name} wishlisted!` : `💔 Removed from wishlist`);
  });

  return card;
};

const renderGrid = () => {
  const grid  = document.getElementById('productGrid');
  const empty = document.getElementById('emptyState');
  const count = document.getElementById('productCount');
  if (!grid) return;

  let prods = [...(window.KEDI_PRODUCTS || [])];

  // filter
  if (activeFilter !== 'all') prods = prods.filter(p => p.cat === activeFilter);

  // search
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    prods = prods.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      (p.cat||'').toLowerCase().includes(q)
    );
  }

  // sort
  if (sortMode === 'price-asc')  prods.sort((a,b) => a.price - b.price);
  if (sortMode === 'price-desc') prods.sort((a,b) => b.price - a.price);
  if (sortMode === 'name')       prods.sort((a,b) => a.name.localeCompare(b.name));

  grid.innerHTML = '';
  if (count) count.textContent = prods.length;

  if (prods.length === 0) {
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';
  prods.forEach(p => grid.appendChild(buildCard(p)));
};

window.resetFilters = () => {
  activeFilter = 'all';
  searchQuery  = '';
  sortMode     = 'default';
  document.getElementById('catalogSearch').value = '';
  document.getElementById('catalogSort').value   = 'default';
  document.querySelectorAll('.pill').forEach(p => p.classList.toggle('active', p.dataset.cat === 'all'));
  renderGrid();
};

// Filter pill events
const initFilters = () => {
  document.querySelectorAll('.pill').forEach(pill => {
    pill.addEventListener('click', () => {
      activeFilter = pill.dataset.cat;
      document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      renderGrid();
    });
  });

  const search = document.getElementById('catalogSearch');
  if (search) search.addEventListener('input', () => {
    searchQuery = search.value.trim();
    renderGrid();
  });

  const sort = document.getElementById('catalogSort');
  if (sort) sort.addEventListener('change', () => {
    sortMode = sort.value;
    renderGrid();
  });
};

// ═══════════════════════════════════════════════════════
// PRODUCT MODAL
// ═══════════════════════════════════════════════════════
const openModal = (p) => {
  const modalPrice = document.getElementById('modalPrice');
  modalPrice.textContent = fmt(p.price);
  modalPrice.setAttribute('data-base-price', p.price);
  
  document.getElementById('modalImg').src       = p.img;
  document.getElementById('modalImg').alt       = p.name;
  document.getElementById('modalBadge').textContent = p.badge;
  document.getElementById('modalName').textContent  = p.name;
  document.getElementById('modalDesc').textContent  = p.desc;

  const specs = document.getElementById('modalSpecs');
  specs.innerHTML = [
    ['Category', catLabels[p.cat] || p.cat],
    ['Dosage',   p.dose],
    ['Duration', p.duration],
    ['Efficacy', p.efficacy],
    ['Price',    fmt(p.price)],
    ['Currency', 'NGN / π'],
  ].map(([k,v]) => `
    <div class="modal-spec-item">
      <p>${k}</p><p>${v}</p>
    </div>`).join('');

  // Cart
  const cartBtn = document.getElementById('modalAddCart');
  cartBtn.onclick = () => {
    addToCart(p.id, p.name, p.price, p.img);
    cartBtn.textContent = '✓ Added!';
    cartBtn.style.background = '#064e3b';
    setTimeout(() => { cartBtn.textContent = 'ADD TO CART'; cartBtn.style.background = ''; }, 2000);
  };

  // WhatsApp
  document.getElementById('modalWA').onclick = () => {
    const msg = `Hi! I want to order: *${p.name}* (${fmt(p.price)}) from Aura Herbs.`;
    window.open(`https://wa.me/2348000000000?text=${encodeURIComponent(msg)}`, '_blank');
  };

  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
};

// ═══════════════════════════════════════════════════════
// MOBILE NAV
// ═══════════════════════════════════════════════════════
const initMobileNav = () => {
  const btn   = document.getElementById('mobileMenuBtn');
  const nav   = document.getElementById('mobileNav');
  const close = document.getElementById('mobileNavClose');
  if (btn)   btn.addEventListener('click',   () => nav.classList.add('open'));
  if (close) close.addEventListener('click', () => nav.classList.remove('open'));
  if (nav)   nav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => nav.classList.remove('open'))
  );
};

// ═══════════════════════════════════════════════════════
// AUTO-SLIDE CAROUSEL (every 5s)
// ═══════════════════════════════════════════════════════
let autoSlide;
const startAutoSlide = () => {
  stopAutoSlide();
  autoSlide = setInterval(() => {
    if (!document.querySelector('.carousel.showDetail')) showSlider('next');
  }, 5000);
};
const stopAutoSlide  = () => clearInterval(autoSlide);

// ═══════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  buildCarousel();
  initCarousel();
  renderGrid();
  initFilters();
  initMobileNav();
  updateCartBadge();
  startAutoSlide();

  // Modal close events
  document.getElementById('modalClose')?.addEventListener('click', closeModal);
  document.getElementById('modalOverlay')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // Pause auto-slide on hover
  const car = document.querySelector('.carousel');
  if (car) {
    car.addEventListener('mouseenter', stopAutoSlide);
    car.addEventListener('mouseleave', startAutoSlide);
  }
});