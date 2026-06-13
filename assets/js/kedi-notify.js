/**
 * Kedi Healthcare — Real-Time Notification Engine
 * =================================================
 * Features:
 *  - Web Push API (native device notifications — phone, tablet, desktop)
 *  - In-app toast notifications (all browsers)
 *  - BroadcastChannel API (real-time cross-tab sync)
 *  - localStorage event bus (same-device sync for older browsers)
 *  - Notification history (localStorage)
 *  - Bell icon badge counter
 *
 * Usage: <script src="assets/js/kedi-notify.js" defer></script>
 */
(function () {
  'use strict';

  const BRAND    = 'Kedi Healthcare';
  const ICON     = 'assets/img/logo/logo.svg';
  const BADGE    = 'assets/img/favicon.png';
  const SW_PATH  = '/service-worker.js';
  const STORE_KEY = 'kedi_notifications';
  const MAX_STORED = 50;

  /* ── Internal state ──────────────────────────────── */
  let toastQueue = [];
  let toastActive = false;
  let bellEl = null;
  let bc = null; // BroadcastChannel

  /* ── Helpers ─────────────────────────────────────── */
  function store(notif) {
    const list = JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
    list.unshift({ ...notif, id: Date.now(), read: false, ts: new Date().toISOString() });
    if (list.length > MAX_STORED) list.length = MAX_STORED;
    localStorage.setItem(STORE_KEY, JSON.stringify(list));
    updateBell();
  }

  function getUnreadCount() {
    return JSON.parse(localStorage.getItem(STORE_KEY) || '[]').filter(n => !n.read).length;
  }

  function markAllRead() {
    const list = JSON.parse(localStorage.getItem(STORE_KEY) || '[]').map(n => ({ ...n, read: true }));
    localStorage.setItem(STORE_KEY, JSON.stringify(list));
    updateBell();
  }

  function updateBell() {
    const count = getUnreadCount();
    if (!bellEl) bellEl = document.getElementById('kedi-notif-bell');
    if (bellEl) {
      const badge = bellEl.querySelector('.kbell-badge');
      if (badge) { badge.textContent = count > 9 ? '9+' : count; badge.style.display = count ? 'flex' : 'none'; }
    }
  }

  /* ── Toast Engine ────────────────────────────────── */
  function ensureToastContainer() {
    if (document.getElementById('kedi-toast-wrap')) return;
    const wrap = document.createElement('div');
    wrap.id = 'kedi-toast-wrap';
    wrap.style.cssText = `
      position:fixed;top:16px;right:16px;z-index:99999;
      display:flex;flex-direction:column;gap:10px;
      max-width:340px;width:calc(100vw - 32px);pointer-events:none;
    `;
    document.body.appendChild(wrap);
  }

  function showToast(notif) {
    toastQueue.push(notif);
    if (!toastActive) processToastQueue();
  }

  function processToastQueue() {
    if (!toastQueue.length) { toastActive = false; return; }
    toastActive = true;
    const n = toastQueue.shift();
    ensureToastContainer();

    const colors = { info:'#3b82f6', success:'#10b981', warning:'#f59e0b', promo:'#d4a017', alert:'#ef4444' };
    const icons  = { info:'ℹ️', success:'✅', warning:'⚠️', promo:'🎁', alert:'🔔' };
    const accent = colors[n.type] || colors.info;

    const toast = document.createElement('div');
    toast.style.cssText = `
      background:#fff;border-radius:14px;padding:14px 16px;
      box-shadow:0 8px 30px rgba(0,0,0,.15);
      border-left:4px solid ${accent};
      display:flex;gap:12px;align-items:flex-start;
      pointer-events:all;cursor:pointer;
      animation:kslideIn .35s cubic-bezier(.175,.885,.32,1.275) forwards;
      position:relative;overflow:hidden;
    `;
    toast.innerHTML = `
      <style>
        @keyframes kslideIn{from{opacity:0;transform:translateX(120%)}to{opacity:1;transform:translateX(0)}}
        @keyframes kslideOut{from{opacity:1;transform:translateX(0)}to{opacity:0;transform:translateX(120%)}}
        @keyframes kprogress{from{width:100%}to{width:0%}}
      </style>
      <div style="font-size:1.4rem;line-height:1;flex-shrink:0">${icons[n.type]||icons.info}</div>
      <div style="flex:1;min-width:0">
        <div style="font-weight:800;font-size:.85rem;color:#1e293b;margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${n.title||BRAND}</div>
        <div style="font-size:.78rem;color:#64748b;line-height:1.45">${n.body||''}</div>
        ${n.url ? `<a href="${n.url}" style="font-size:.72rem;color:${accent};font-weight:700;text-decoration:none;margin-top:4px;display:inline-block">View →</a>` : ''}
      </div>
      <button onclick="this.closest('div[style]').remove()" style="background:none;border:none;cursor:pointer;color:#94a3b8;font-size:1rem;padding:0;flex-shrink:0;line-height:1">×</button>
      <div style="position:absolute;bottom:0;left:0;height:3px;background:${accent};border-radius:0 0 0 14px;animation:kprogress ${n.duration||5000}ms linear forwards"></div>
    `;

    if (n.url) toast.addEventListener('click', e => { if (e.target.tagName!=='BUTTON') window.location.href = n.url; });

    const wrap = document.getElementById('kedi-toast-wrap');
    wrap.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'kslideOut .3s ease forwards';
      setTimeout(() => { toast.remove(); processToastQueue(); }, 320);
    }, n.duration || 5000);
  }

  /* ── Web Push (native device notifications) ──────── */
  async function registerSW() {
    if (!('serviceWorker' in navigator)) return null;
    try {
      const reg = await navigator.serviceWorker.register(SW_PATH, { scope: '/' });
      return reg;
    } catch (e) { console.warn('[KediNotify] SW register failed:', e.message); return null; }
  }

  async function requestPermission() {
    if (!('Notification' in window)) return false;
    if (Notification.permission === 'granted') return true;
    if (Notification.permission === 'denied') return false;
    const result = await Notification.requestPermission();
    return result === 'granted';
  }

  async function sendNativeNotification(notif) {
    const granted = await requestPermission();
    if (!granted) return;

    const reg = await navigator.serviceWorker.ready.catch(() => null);
    if (reg) {
      reg.active?.postMessage({ type: 'SHOW_NOTIFICATION', payload: { ...notif, icon: ICON } });
    } else {
      new Notification(notif.title || BRAND, { body: notif.body, icon: ICON, badge: BADGE });
    }
  }

  /* ── BroadcastChannel (real-time cross-tab) ──────── */
  function setupBroadcast() {
    if (!('BroadcastChannel' in window)) return;
    bc = new BroadcastChannel('kedi_notify_channel');
    bc.onmessage = e => {
      const { type, payload } = e.data || {};
      if (type === 'NOTIFY') receiveNotification(payload);
    };
  }

  /* ── localStorage fallback (older cross-tab) ─────── */
  window.addEventListener('storage', e => {
    if (e.key === 'kedi_notify_broadcast' && e.newValue) {
      try { receiveNotification(JSON.parse(e.newValue)); } catch (_) {}
    }
  });

  /* ── Receive & display ───────────────────────────── */
  function receiveNotification(notif) {
    store(notif);
    showToast(notif);
    if (document.hidden) sendNativeNotification(notif);
  }

  /* ── Public API ──────────────────────────────────── */
  window.KediNotify = {
    /**
     * Send a notification to this tab (in-app toast + native if background)
     * @param {Object} notif - { title, body, type, url, duration, tag }
     * type: 'info'|'success'|'warning'|'promo'|'alert'
     */
    send(notif) {
      receiveNotification(notif);
    },

    /**
     * Broadcast to ALL open tabs on this device + show natively
     */
    broadcast(notif) {
      receiveNotification(notif);
      if (bc) bc.postMessage({ type: 'NOTIFY', payload: notif });
      // localStorage fallback
      localStorage.setItem('kedi_notify_broadcast', JSON.stringify({ ...notif, _t: Date.now() }));
    },

    /**
     * Schedule a notification (ms delay)
     */
    schedule(notif, delayMs) {
      setTimeout(() => this.broadcast(notif), delayMs);
    },

    /** Request push permission (call on user gesture) */
    async requestPush() {
      const ok = await requestPermission();
      if (ok) {
        this.send({ type:'success', title:'Notifications Enabled!', body:'You will receive health tips, promos, and order updates.' });
      }
      return ok;
    },

    /** Mark all notifications read */
    markAllRead,

    /** Get stored notification history */
    getHistory() {
      return JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
    },

    /** Clear all stored notifications */
    clearHistory() {
      localStorage.removeItem(STORE_KEY);
      updateBell();
    }
  };

  /* ── Bell UI Injector ────────────────────────────── */
  function injectBell() {
    if (document.getElementById('kedi-notif-bell')) return;
    const bell = document.createElement('div');
    bell.id = 'kedi-notif-bell';
    bell.title = 'Notifications';
    bell.style.cssText = `
      position:fixed;top:16px;left:16px;z-index:99998;
      cursor:pointer;user-select:none;
    `;
    bell.innerHTML = `
      <div style="width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#4d231c,#2a1310);
        box-shadow:0 4px 16px rgba(77,35,28,.4);display:flex;align-items:center;justify-content:center;
        transition:.2s;position:relative"
        onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#d4a017"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
        <span class="kbell-badge" style="position:absolute;top:-3px;right:-3px;width:18px;height:18px;
          border-radius:50%;background:#ef4444;color:#fff;font-size:10px;font-weight:900;
          display:none;align-items:center;justify-content:center;border:2px solid #fff">0</span>
      </div>`;
    bell.addEventListener('click', () => openNotifPanel());
    bellEl = bell;
    document.body.appendChild(bell);
    updateBell();
  }

  /* ── Notification Panel ──────────────────────────── */
  function openNotifPanel() {
    markAllRead();
    const existing = document.getElementById('kedi-notif-panel');
    if (existing) { existing.remove(); return; }

    const history = KediNotify.getHistory();
    const panel = document.createElement('div');
    panel.id = 'kedi-notif-panel';
    panel.style.cssText = `
      position:fixed;top:68px;left:16px;z-index:99998;width:320px;max-height:480px;
      background:#fff;border-radius:16px;box-shadow:0 12px 40px rgba(0,0,0,.2);
      border:1px solid #e8ddd6;display:flex;flex-direction:column;overflow:hidden;
      animation:kslideIn .3s ease forwards;
    `;
    panel.innerHTML = `
      <div style="padding:14px 16px;background:linear-gradient(135deg,#4d231c,#2a1310);color:#fff;display:flex;justify-content:space-between;align-items:center">
        <span style="font-weight:900;font-size:.9rem">🔔 Notifications</span>
        <div style="display:flex;gap:8px">
          <button onclick="KediNotify.clearHistory();document.getElementById('kedi-notif-panel').remove()"
            style="background:rgba(255,255,255,.15);border:none;color:#fff;padding:3px 10px;border-radius:50px;font-size:.7rem;cursor:pointer">Clear</button>
          <button onclick="document.getElementById('kedi-notif-panel').remove()"
            style="background:none;border:none;color:#fff;font-size:1.1rem;cursor:pointer;padding:0">×</button>
        </div>
      </div>
      <div id="kedi-notif-list" style="overflow-y:auto;flex:1">
        ${history.length ? history.map(n => `
          <div style="padding:12px 16px;border-bottom:1px solid #f1ece8;cursor:pointer" ${n.url?`onclick="window.location.href='${n.url}'"`:''}>
            <div style="font-weight:800;font-size:.82rem;color:#1e293b;margin-bottom:2px">${n.title||BRAND}</div>
            <div style="font-size:.75rem;color:#64748b;line-height:1.4">${n.body||''}</div>
            <div style="font-size:.65rem;color:#94a3b8;margin-top:4px">${new Date(n.ts).toLocaleString()}</div>
          </div>`).join('') :
          '<div style="padding:32px;text-align:center;color:#94a3b8;font-size:.85rem">No notifications yet</div>'
        }
      </div>
      <div style="padding:12px 16px;border-top:1px solid #e8ddd6;text-align:center">
        <button onclick="KediNotify.requestPush()" style="background:#4d231c;color:#fff;border:none;padding:8px 20px;border-radius:50px;font-size:.78rem;font-weight:700;cursor:pointer">
          🔔 Enable Push Notifications
        </button>
      </div>`;

    document.body.appendChild(panel);
    document.addEventListener('click', e => {
      if (!panel.contains(e.target) && !bellEl?.contains(e.target)) panel.remove();
    }, { once: true });
  }

  /* ── Init ────────────────────────────────────────── */
  function init() {
    setupBroadcast();
    registerSW();
    injectBell();

    // Automated health tip notifications (demo — replace with real events)
    const autoNotifs = [
      { delay: 8000,  type:'promo',   title:'🎁 2026 Perform & Win Award', body:'Register this month and earn a FREE TV or AC. 25+ placements = 1.5HP Inverter AC!', url:'auth.html' },
      { delay: 25000, type:'info',    title:'💊 Health Tip of the Day', body:'Take your Reishi capsules with warm water for best absorption.', url:'kedi.html' },
      { delay: 45000, type:'success', title:'✅ New Products In Stock', body:'Cordy Active and Gynapharm are back in stock. Limited quantities!', url:'shop.html' },
      { delay: 70000, type:'alert',   title:'⏰ Order Reminder', body:'You have items in your cart. Complete your order before stock runs out.', url:'cart.html' },
    ];

    // Only show auto-notifs if user has visited before
    if (localStorage.getItem('kedi_returning')) {
      autoNotifs.forEach(n => KediNotify.schedule({ type: n.type, title: n.title, body: n.body, url: n.url }, n.delay));
    }
    localStorage.setItem('kedi_returning', '1');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();
