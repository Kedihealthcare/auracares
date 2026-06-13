/**
 * Kedi Healthcare — Mobile Sticky WhatsApp CTA
 * ==============================================
 * Auto-injects a sticky WhatsApp button + "Order Now" label
 * on any page this script is included in.
 * Works on all screen sizes; hides label on desktop.
 *
 * Usage: <script src="assets/js/mobile-wa.js" defer></script>
 */
(function () {
  'use strict';

  const WA_URL = 'https://api.whatsapp.com/send/?phone=2349015092132&text=Hello%2C%20I%20am%20interested%20in%20Aura%20Herbs%20Clinical%20Wellness%20products!&type=phone_number&app_absent=0';

  function mount() {
    if (document.getElementById('kedi-wa-sticky')) return;

    const wrap = document.createElement('div');
    wrap.id = 'kedi-wa-sticky';
    wrap.innerHTML = `
      <span class="wa-label">Order on WhatsApp</span>
      <a class="wa-btn" href="${WA_URL}" target="_blank" rel="noopener"
         aria-label="Order on WhatsApp" title="WhatsApp Order">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.51 5.838L0 24l6.335-1.485C8.01 23.473 9.96 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.88 0-3.634-.507-5.145-1.389l-.369-.218-3.757.881.924-3.663-.24-.376A9.793 9.793 0 012.182 12c0-5.415 4.403-9.818 9.818-9.818 5.414 0 9.818 4.403 9.818 9.818 0 5.415-4.404 9.818-9.818 9.818z"/>
        </svg>
      </a>`;

    document.body.appendChild(wrap);

    /* Hide label after 5 s on desktop (≥ 1024px) */
    setTimeout(() => {
      const lbl = wrap.querySelector('.wa-label');
      if (lbl && window.innerWidth >= 1024) lbl.style.display = 'none';
    }, 5000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
