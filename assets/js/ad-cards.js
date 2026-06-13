/**
 * Kedi Healthcare — Native Ad Card Engine
 * =========================================
 * Renders Google/Facebook-style native product ad cards.
 * Supports: 336×280 (blog), 320×480 (mobile), 300×600 (display)
 *
 * Usage:
 *   <div data-kedi-ad="diawell" data-size="336x280"></div>
 *   <script src="assets/js/ad-cards.js" defer></script>
 */

(function () {
  'use strict';

  /* ── Product Ad Definitions ──────────────────────────── */
  const ADS = {
    diawell: {
      label: 'Health Insight',
      brand: 'Kedi Healthcare',
      image: 'assets/img/product/Diawell.png',
      headline: 'Struggling With High Sugar Levels?',
      subtext: 'Support healthy blood sugar and energy naturally with Kedi Diawell — trusted herbal wellness.',
      cta: 'See How It Works',
      ctaUrl: 'quiz.html?condition=metabolic',
      accent: '#10b981',
      bg: 'linear-gradient(160deg,#f0fdf4 0%,#dcfce7 100%)',
      tag: '#10b981'
    },
    reishi: {
      label: 'Wellness Card',
      brand: 'Kedi Healthcare',
      image: 'assets/img/product/Reishi.png',
      headline: 'Feel Your Immune System Weakening?',
      subtext: 'Reishi — the Mushroom of Immortality. Used for 2,000 years to restore immunity and vitality.',
      cta: 'Take Free Assessment',
      ctaUrl: 'quiz.html?condition=immune',
      accent: '#4d231c',
      bg: 'linear-gradient(160deg,#fdf8f6 0%,#f8ece6 100%)',
      tag: '#4d231c'
    },
    revive: {
      label: 'Men\'s Health',
      brand: 'Kedi Healthcare',
      image: 'assets/img/product/Revive.png',
      headline: 'Reclaim Your Vitality Naturally',
      subtext: 'Re-Vive — premier male energy formula. Supports stamina, performance, and drive.',
      cta: 'Learn More',
      ctaUrl: 'quiz.html?condition=ed',
      accent: '#1d4ed8',
      bg: 'linear-gradient(160deg,#eff6ff 0%,#dbeafe 100%)',
      tag: '#1d4ed8'
    },
    magilim: {
      label: 'Weight Wellness',
      brand: 'Kedi Healthcare',
      image: 'assets/img/product/Magilim.png',
      headline: 'See What May Be Slowing Your Metabolism',
      subtext: 'Magilim targets fat metabolism and appetite control. Results visible in 4–6 weeks.',
      cta: 'Check My Metabolism',
      ctaUrl: 'quiz.html?condition=weight',
      accent: '#7c3aed',
      bg: 'linear-gradient(160deg,#f5f3ff 0%,#ede9fe 100%)',
      tag: '#7c3aed'
    },
    golden_hypha: {
      label: 'Women\'s Health',
      brand: 'Kedi Healthcare',
      image: 'assets/img/product/Golden hypha.png',
      headline: 'Natural Support for Fibroids & Immunity',
      subtext: 'Golden Hypha — advanced immune modulator. Trusted 90-day protocol for fibroid management.',
      cta: 'View Protocol',
      ctaUrl: 'quiz.html?condition=women',
      accent: '#be185d',
      bg: 'linear-gradient(160deg,#fdf2f8 0%,#fce7f3 100%)',
      tag: '#be185d'
    },
    cardibetter: {
      label: 'Heart Health',
      brand: 'Kedi Healthcare',
      image: 'assets/img/product/CARDIBETTER222.png',
      headline: 'Is Your Heart Getting the Support It Needs?',
      subtext: 'Cardibetter restores cardiac muscle function and supports healthy blood pressure naturally.',
      cta: 'Heart Health Check',
      ctaUrl: 'quiz.html?condition=cardio',
      accent: '#dc2626',
      bg: 'linear-gradient(160deg,#fff1f2 0%,#ffe4e6 100%)',
      tag: '#dc2626'
    },
    jointeez: {
      label: 'Joint Relief',
      brand: 'Kedi Healthcare',
      image: 'assets/img/product/Jointeez.png',
      headline: 'Joint Pain Slowing You Down?',
      subtext: 'Jointeez targets synovial inflammation and promotes bone density for lasting relief.',
      cta: 'Get Joint Assessment',
      ctaUrl: 'quiz.html?condition=musculo',
      accent: '#b45309',
      bg: 'linear-gradient(160deg,#fffbeb 0%,#fef3c7 100%)',
      tag: '#b45309'
    },
    gynapharm: {
      label: 'Female Wellness',
      brand: 'Kedi Healthcare',
      image: 'assets/img/product/Gynapharm.png',
      headline: 'Natural Support for Female Reproductive Health',
      subtext: 'Gynapharm purifies the reproductive tract and supports fertility, hormonal balance, and infection clearance.',
      cta: 'Learn More',
      ctaUrl: 'quiz.html?condition=women',
      accent: '#db2777',
      bg: 'linear-gradient(160deg,#fdf2f8 0%,#fbcfe8 100%)',
      tag: '#db2777'
    },
    gastrifort: {
      label: 'Digestive Health',
      brand: 'Kedi Healthcare',
      image: 'assets/img/product/Gastrifort.png',
      headline: 'Tired of Living With Stomach Pain?',
      subtext: 'Gastrifort heals ulcers, gastritis, and chronic indigestion at the root — not just the symptoms.',
      cta: 'Start Healing',
      ctaUrl: 'quiz.html?condition=digestive',
      accent: '#059669',
      bg: 'linear-gradient(160deg,#f0fdf4 0%,#d1fae5 100%)',
      tag: '#059669'
    },
    consultant: {
      label: 'Business Opportunity',
      brand: 'Kedi Healthcare',
      image: 'assets/img/promo/kedi-2026-award.jpg',
      headline: 'Win a 55" Smart TV This Month',
      subtext: 'Join the 2026 Perform & Win Award. 25+ placements earns a 1.5HP AC or 55" Smart TV — free.',
      cta: 'Register Now',
      ctaUrl: 'auth.html',
      accent: '#d4a017',
      bg: 'linear-gradient(160deg,#4d231c 0%,#2a1310 100%)',
      textColor: '#fff',
      tag: '#d4a017'
    }
  };

  /* ── Renderer ─────────────────────────────────────────── */
  function buildCard(adKey, size, container) {
    const ad = ADS[adKey];
    if (!ad) return;

    const [w, h] = size.split('x').map(Number);
    const isWide  = w >= 336 && h <= 280;   // 336×280
    const isTall  = h >= 480;               // 320×480, 300×600
    const textCol = ad.textColor || '#1e293b';
    const isBizCard = adKey === 'consultant';

    const imgH = isTall ? (h >= 600 ? '220px' : '180px') : '110px';

    container.innerHTML = `
      <div class="kedi-ad-card" style="
        width:${w}px; height:${h}px; border-radius:16px;
        background:${ad.bg}; overflow:hidden;
        box-shadow:0 8px 30px rgba(0,0,0,${isBizCard?'.4':'.1'});
        display:flex; flex-direction:column; position:relative;
        font-family:'Segoe UI',sans-serif; cursor:pointer;
        transition:.25s; border:1px solid rgba(0,0,0,.06);
      " onmouseover="this.style.transform='translateY(-4px)';this.style.boxShadow='0 16px 40px rgba(0,0,0,.18)'"
         onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 8px 30px rgba(0,0,0,${isBizCard?'.4':'.1'})'"
         onclick="location.href='${ad.ctaUrl}'">

        <!-- Sponsored label -->
        <div style="
          display:flex; justify-content:space-between; align-items:center;
          padding:${isTall?'10px 14px':'7px 12px'};
          background:rgba(255,255,255,${isBizCard?'.08':'.7'});
          border-bottom:1px solid rgba(0,0,0,.05);
        ">
          <div style="display:flex;align-items:center;gap:6px">
            <div style="width:18px;height:18px;border-radius:50%;background:${ad.accent};display:flex;align-items:center;justify-content:center">
              <span style="color:#fff;font-size:8px;font-weight:900">K</span>
            </div>
            <span style="font-size:${isTall?'11px':'9px'};font-weight:800;color:${isBizCard?'rgba(255,255,255,.9)':ad.accent};letter-spacing:.04em;text-transform:uppercase">${ad.brand}</span>
          </div>
          <span style="
            font-size:8px;color:${isBizCard?'rgba(255,255,255,.5)':'#94a3b8'};
            font-weight:600;letter-spacing:.06em;text-transform:uppercase;
            border:1px solid ${isBizCard?'rgba(255,255,255,.2)':'#cbd5e1'};
            padding:2px 6px;border-radius:4px;
          ">${ad.label}</span>
        </div>

        <!-- Product Image -->
        <div style="
          flex:${isTall?'0 0 '+imgH:'0 0 '+imgH};height:${imgH};
          display:flex;align-items:center;justify-content:center;
          background:rgba(${isBizCard?'0,0,0':'255,255,255'},.${isBizCard?'15':'5'});
          overflow:hidden;padding:${isTall?'14px':'8px'};
          position:relative;
        " onclick="if(window.openPromoModal) { event.stopPropagation(); openPromoModal('${ad.image}', '${ad.headline}', '${ad.subtext.replace(/'/g, "\\'")}'); }">
          <img src="${ad.image}" alt="${ad.headline}"
               style="max-width:100%;max-height:100%;object-fit:contain;
                      filter:drop-shadow(0 4px 12px rgba(0,0,0,.2));
                      transition:.3s; cursor:zoom-in" loading="lazy"
               onmouseover="this.style.transform='scale(1.1)'"
               onmouseout="this.style.transform='scale(1)'">
          <!-- Accent dot -->
          <div style="
            position:absolute;bottom:8px;right:8px;
            background:${ad.accent};color:#fff;
            font-size:7px;font-weight:900;padding:3px 7px;border-radius:50px;
            text-transform:uppercase;letter-spacing:.05em;
          ">Kedi</div>
        </div>

        <!-- Content -->
        <div style="flex:1;padding:${isTall?'16px 16px 14px':'10px 12px 10px'};display:flex;flex-direction:column;justify-content:space-between">
          <div>
            <h3 style="
              font-size:${isTall?'15px':'12px'};font-weight:900;
              color:${isBizCard?'#fff':ad.accent};line-height:1.25;
              margin-bottom:${isTall?'8px':'5px'};
            ">${ad.headline}</h3>
            ${isTall || isWide ? `<p style="
              font-size:${isTall?'11.5px':'10px'};
              color:${isBizCard?'rgba(255,255,255,.75)':'#64748b'};
              line-height:1.5;margin-bottom:${isTall?'14px':'8px'};
            ">${ad.subtext}</p>` : ''}
          </div>

          <!-- CTA Button -->
          <a href="${ad.ctaUrl}" style="
            display:block;text-align:center;padding:${isTall?'11px':'8px'};
            background:${ad.accent};color:#fff;border-radius:50px;
            font-weight:800;font-size:${isTall?'12px':'10px'};
            text-decoration:none;letter-spacing:.03em;
            box-shadow:0 4px 12px ${ad.accent}55;
            transition:.2s;
          " onmouseover="this.style.filter='brightness(1.1)'"
             onmouseout="this.style.filter='brightness(1)'">${ad.cta}</a>
        </div>

        <!-- Bottom trust bar -->
        <div style="
          padding:5px 12px;text-align:center;
          background:rgba(${isBizCard?'255,255,255':'0,0,0'},.04);
          border-top:1px solid rgba(0,0,0,.05);
          font-size:8px;color:${isBizCard?'rgba(255,255,255,.4)':'#94a3b8'};
          font-weight:600;letter-spacing:.06em;
        ">auraherbs.com · Trusted Herbal Protocols</div>
      </div>`;
  }

  /* ── Rotation Engine ──────────────────────────────────── */
  const adKeys = Object.keys(ADS);
  let rotIndex = 0;

  window.KediAds = {
    render(containerId, adKey, size) {
      const el = document.getElementById(containerId);
      if (!el) return;
      buildCard(adKey, size, el);
    },
    rotate(containerId, size, intervalMs) {
      const el = document.getElementById(containerId);
      if (!el) return;
      const tick = () => { buildCard(adKeys[rotIndex % adKeys.length], size, el); rotIndex++; };
      tick();
      setInterval(tick, intervalMs || 6000);
    }
  };

  /* ── Auto-mount data-kedi-ad elements ─────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-kedi-ad]').forEach(el => {
      const key  = el.dataset.kediAd;
      const size = el.dataset.size || '336x280';
      if (key === 'rotate') {
        const iv = parseInt(el.dataset.interval) || 6000;
        const id = el.id || ('kedi-ad-' + Math.random().toString(36).slice(2));
        el.id = id;
        KediAds.rotate(id, size, iv);
      } else {
        buildCard(key, size, el);
      }
    });
  });

})();
