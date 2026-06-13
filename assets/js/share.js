(function() {
  const containerClass = 'share-icons';
  
  // Custom brand-colored sharing configuration
  const icons = [
    { 
      name: 'Facebook', 
      class: 'fab fa-facebook-f', 
      btnClass: 'share-fb',
      url: (url, title, desc, img) => {
        const sharedUrl = new URL(url);
        sharedUrl.searchParams.set('share_title', title);
        sharedUrl.searchParams.set('share_desc', desc);
        if (img) sharedUrl.searchParams.set('share_img', img);
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(sharedUrl.toString())}`;
      } 
    },
    { 
      name: 'Twitter', 
      class: 'fab fa-twitter', 
      btnClass: 'share-tw',
      url: (url, title, desc, img) => {
        const sharedUrl = new URL(url);
        sharedUrl.searchParams.set('share_title', title);
        sharedUrl.searchParams.set('share_desc', desc);
        if (img) sharedUrl.searchParams.set('share_img', img);
        const text = `${title} - ${desc}`;
        return `https://twitter.com/intent/tweet?url=${encodeURIComponent(sharedUrl.toString())}&text=${encodeURIComponent(text)}`;
      } 
    },
    { 
      name: 'LinkedIn', 
      class: 'fab fa-linkedin-in', 
      btnClass: 'share-li',
      url: (url, title, desc, img) => {
        const sharedUrl = new URL(url);
        sharedUrl.searchParams.set('share_title', title);
        sharedUrl.searchParams.set('share_desc', desc);
        if (img) sharedUrl.searchParams.set('share_img', img);
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(sharedUrl.toString())}`;
      } 
    },
    { 
      name: 'WhatsApp', 
      class: 'fab fa-whatsapp', 
      btnClass: 'share-wa',
      url: (url, title, desc, img) => {
        const text = `*${title}*\n${desc}\n\nView details: ${url}`;
        return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
      } 
    },
    { 
      name: 'Instagram', 
      class: 'fab fa-instagram', 
      btnClass: 'share-ig',
      url: (url, title, desc, img) => `javascript:void(0);`
    }
  ];

  if (navigator.share) {
    icons.unshift({
      name: 'Share',
      class: 'fas fa-share-alt',
      btnClass: 'share-native',
      url: () => 'javascript:void(0);'
    });
  }

  // Helper to ensure meta tag exists
  function ensureMeta(property, content) {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('property', property);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  }

  // Set Open Graph meta tags based on sharing data
  function setOpenGraph({ url, title, description, image }) {
    ensureMeta('og:url', url);
    ensureMeta('og:title', title);
    ensureMeta('og:description', description);
    if (image) ensureMeta('og:image', image);
  }

  // Parse sharing parameters from URL dynamically
  function parseAndSetOG() {
    const params = new URLSearchParams(window.location.search);
    const title = params.get('share_title');
    const desc = params.get('share_desc');
    const img = params.get('share_img');
    if (title || desc || img) {
      setOpenGraph({
        url: window.location.href.split('?')[0] + (params.has('id') ? '?id=' + params.get('id') : ''),
        title: title || document.title,
        description: desc || '',
        image: img || ''
      });
    }
  }

  // Expose toast notifier
  function showToast(message) {
    let toast = document.getElementById('kedi-share-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'kedi-share-toast';
      toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 12px 24px;
        border-radius: 50px;
        font-weight: bold;
        box-shadow: 0 10px 25px rgba(16, 185, 129, 0.4);
        z-index: 100000;
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        pointer-events: none;
      `;
      document.body.appendChild(toast);
    }
    toast.innerText = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
    
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(100px)';
    }, 3000);
  }

  function createShareButtons(pageUrl, title, description = '', image = '') {
    // Inject Open Graph tags dynamically
    setOpenGraph({ url: pageUrl, title, description, image });
    
    const div = document.createElement('div');
    div.className = containerClass;
    
    icons.forEach(icon => {
      const a = document.createElement('a');
      a.href = icon.url(pageUrl, title, description, image);
      a.target = icon.name === 'Instagram' ? '_self' : '_blank';
      a.rel = 'noopener noreferrer';
      a.title = `Share on ${icon.name}`;
      a.className = icon.btnClass;
      a.innerHTML = `<i class="${icon.class}"></i>`;
      
      if (icon.name === 'Share') {
        a.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          navigator.share({
            title: title,
            text: description,
            url: pageUrl
          }).catch(err => console.log('Share failed:', err));
        });
      }
      if (icon.name === 'Instagram') {
        a.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const clipboardText = `*${title}*\n${description}\n\nView here: ${pageUrl}`;
          navigator.clipboard.writeText(clipboardText).then(() => {
            showToast('Details copied to clipboard for Instagram!');
          }).catch(() => {
            const el = document.createElement('textarea');
            el.value = clipboardText;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            showToast('Details copied to clipboard for Instagram!');
          });
        });
      }
      div.appendChild(a);
    });
    return div;
  }

  // Auto-scanning function to find product/protocol card elements and inject snippet
  function scanAndInject() {
    const selectors = [
      '.product-card',
      '.rd-product__item',
      '.product-catalog-item',
      '.tab-product__item',
      '.hot-deal__item'
    ];
    
    document.querySelectorAll(selectors.join(', ')).forEach(card => {
      if (card.querySelector('.share-icons')) return; // Avoid duplicate injections
      
      let title = '';
      let desc = '';
      let img = '';
      let url = '';
      
      // 1. Identify and extract details from data attributes or DOM
      if (card.dataset.protocolName) {
        title = card.dataset.protocolName;
        desc = card.dataset.protocolDesc || '';
        url = card.dataset.protocolUrl || window.location.href;
        
        if (window.KEDI_PROTOCOLS && window.KEDI_PRODUCTS) {
          const proto = window.KEDI_PROTOCOLS.find(p => p.name === title);
          if (proto && proto.productIds && proto.productIds.length > 0) {
            const firstProduct = window.KEDI_PRODUCTS.find(p => p.id === proto.productIds[0]);
            if (firstProduct) img = firstProduct.img;
          }
        }
      } else if (card.dataset.productId) {
        title = card.dataset.productName || '';
        desc = card.dataset.productDesc || '';
        img = card.dataset.productImg || '';
        url = window.location.origin + '/products/product-' + card.dataset.productId + '.html';
      } else {
        // Fallback DOM parsing
        const titleEl = card.querySelector('h2, h3, h4, h5, .card-title, .product__title, .title, .catalog-name');
        title = titleEl ? titleEl.innerText.trim() : '';
        
        const imgEl = card.querySelector('img');
        img = imgEl ? imgEl.src : '';
        
        const descEl = card.querySelector('p, .card-text, .catalog-desc');
        desc = descEl ? descEl.innerText.trim() : '';
        
        const linkEl = card.querySelector('a[href*="shop-"], a[href*="product-"], a[href*="shop-single"]');
        if (linkEl) {
          url = linkEl.href;
        } else {
          // Attempt to map by matching catalog titles
          if (title && window.KEDI_PRODUCTS) {
            const nameToSearch = title.toLowerCase();
            const prod = window.KEDI_PRODUCTS.find(p => nameToSearch.includes(p.name.toLowerCase()) || p.name.toLowerCase().includes(nameToSearch));
            if (prod) {
              url = window.location.origin + '/products/product-' + prod.id + '.html';
              if (!img) img = prod.img;
              if (!desc) desc = prod.desc;
            }
          }
        }
      }
      
      // Fallback baseline info
      if (!url) url = window.location.href;
      if (!title) title = document.title;
      if (!desc) desc = 'Clinical grade natural herbal formula by Kedi Healthcare.';
      
      // Resolve image path to absolute URL
      if (img && !img.startsWith('http') && !img.startsWith('data:')) {
        const path = window.location.pathname;
        let prefix = '';
        if (path.includes('/seo-q/') || path.includes('/blog/')) {
          prefix = '../';
        }
        img = window.location.origin + '/' + img.replace(/^(\.\.\/)+/, '');
      }
      
      const shareDiv = createShareButtons(url, title, desc, img);
      
      // Append snippet to the content container of the card
      const contentEl = card.querySelector('.content, .product__content, .catalog-info') || card;
      contentEl.appendChild(shareDiv);
    });
  }

  // MutationObserver for SPA / dynamically loaded grids
  function setupObserver() {
    const observer = new MutationObserver((mutations) => {
      let shouldScan = false;
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          shouldScan = true;
          break;
        }
      }
      if (shouldScan) {
        clearTimeout(window._kediScanTimer);
        window._kediScanTimer = setTimeout(scanAndInject, 150);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // Initialize sharing and parsing
  parseAndSetOG();
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      scanAndInject();
      setupObserver();
    });
  } else {
    scanAndInject();
    setupObserver();
  }

  // Expose globally
  window.KediShare = { createShareButtons, scanAndInject };
})();
