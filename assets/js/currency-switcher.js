/**
 * Aura Herbs Premium Currency Switcher Component
 * Implements a modern, glassmorphic UI switcher in both Header Dropdown and Floating Widget modes.
 */

(function () {
    if (window.CurrencySwitcherLoaded) return;
    window.CurrencySwitcherLoaded = true;

    // Inject Styles
    const style = document.createElement('style');
    style.id = 'aura-currency-switcher-styles';
    style.innerHTML = `
        /* --- General Variables & Shared Styles --- */
        :root {
            --switcher-bg: rgba(15, 23, 42, 0.95);
            --switcher-border: rgba(255, 255, 255, 0.1);
            --switcher-text: #f8fafc;
            --switcher-text-muted: #94a3b8;
            --switcher-accent: #10b981;
            --switcher-accent-glow: rgba(16, 185, 129, 0.2);
            --switcher-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
            --switcher-glass: blur(12px);
        }

        /* --- Header Dropdown Switcher Enhancements --- */
        .aura-header-switcher {
            position: relative;
            display: inline-block;
            font-family: 'Outfit', 'Inter', sans-serif;
        }

        .aura-switcher-toggle {
            display: flex;
            align-items: center;
            gap: 8px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(0, 0, 0, 0.08);
            padding: 8px 14px;
            border-radius: 9999px;
            color: inherit;
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            min-height: 38px;
            min-width: 80px;
            justify-content: center;
        }
        
        .bg-slate-50 .aura-switcher-toggle {
            background: #fff;
            border-color: #e2e8f0;
            color: #0f172a;
        }

        .aura-switcher-toggle:hover, .aura-switcher-toggle:focus {
            background: var(--switcher-accent-glow);
            border-color: var(--switcher-accent);
            color: var(--switcher-accent) !important;
            transform: translateY(-1px);
        }

        .aura-switcher-toggle i {
            font-size: 9px;
            transition: transform 0.3s ease;
        }

        .aura-header-switcher.active .aura-switcher-toggle i {
            transform: rotate(180deg);
        }

        .aura-switcher-dropdown {
            position: absolute;
            top: calc(100% + 8px);
            right: 0;
            width: 280px;
            background: var(--switcher-bg);
            border: 1px solid var(--switcher-border);
            border-radius: 18px;
            padding: 12px;
            box-shadow: var(--switcher-shadow);
            backdrop-filter: var(--switcher-glass);
            -webkit-backdrop-filter: var(--switcher-glass);
            opacity: 0;
            transform: translateY(10px) scale(0.95);
            visibility: hidden;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            z-index: 10000;
        }

        .aura-header-switcher.active .aura-switcher-dropdown {
            opacity: 1;
            transform: translateY(0) scale(1);
            visibility: visible;
        }

        /* --- Floating Widget Switcher --- */
        .aura-floating-switcher {
            position: fixed;
            bottom: 24px;
            left: 24px;
            z-index: 99999;
            font-family: 'Outfit', 'Inter', sans-serif;
        }

        .aura-floating-toggle {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #0f172a, #1e293b);
            border: 1.5px solid var(--switcher-accent);
            color: var(--switcher-accent);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 10px 25px rgba(16, 185, 129, 0.25);
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            font-weight: 800;
            font-size: 16px;
        }

        .aura-floating-toggle:hover {
            transform: scale(1.1) rotate(15deg);
            box-shadow: 0 15px 30px rgba(16, 185, 129, 0.4);
            background: var(--switcher-accent);
            color: #fff;
        }

        .aura-floating-switcher.active .aura-floating-toggle {
            transform: scale(0.9) rotate(-90deg);
            background: #ef4444;
            border-color: #ef4444;
            color: #fff;
        }

        .aura-floating-dropdown {
            position: absolute;
            bottom: calc(100% + 12px);
            left: 0;
            width: 290px;
            background: var(--switcher-bg);
            border: 1px solid var(--switcher-border);
            border-radius: 20px;
            padding: 14px;
            box-shadow: var(--switcher-shadow);
            backdrop-filter: var(--switcher-glass);
            -webkit-backdrop-filter: var(--switcher-glass);
            opacity: 0;
            transform: translateY(15px) scale(0.9);
            visibility: hidden;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            z-index: 99998;
        }

        .aura-floating-switcher.active .aura-floating-dropdown {
            opacity: 1;
            transform: translateY(0) scale(1);
            visibility: visible;
        }

        /* --- Option Items --- */
        .aura-switcher-option {
            display: flex;
            align-items: center;
            gap: 12px;
            width: 100%;
            padding: 10px 14px;
            border-radius: 12px;
            background: transparent;
            border: 1px solid transparent;
            color: var(--switcher-text);
            text-align: left;
            cursor: pointer;
            transition: all 0.2s ease;
            margin-bottom: 4px;
        }

        .aura-switcher-option:last-child {
            margin-bottom: 0;
        }

        .aura-switcher-option:hover, .aura-switcher-option:focus {
            background: rgba(255, 255, 255, 0.05);
            border-color: rgba(255, 255, 255, 0.08);
            transform: translateX(2px);
        }

        .aura-switcher-option.active {
            background: var(--switcher-accent-glow);
            border-color: var(--switcher-accent);
        }

        .aura-option-badge {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 14px;
            flex-shrink: 0;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
        }

        .badge-ngn { background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1.5px solid #10b981; }
        .badge-usd { background: rgba(59, 130, 246, 0.15); color: #3b82f6; border: 1.5px solid #3b82f6; }
        .badge-pi  { background: rgba(245, 158, 11, 0.15); color: #f59e0b; border: 1.5px solid #f59e0b; }

        .aura-option-info {
            flex: 1;
            min-width: 0;
        }

        .aura-option-name {
            font-weight: 700;
            font-size: 13px;
            line-height: 1.2;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .aura-option-desc {
            font-size: 10px;
            color: var(--switcher-text-muted);
            margin-top: 3px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .aura-option-check {
            color: var(--switcher-accent);
            font-size: 11px;
            display: none;
        }

        .aura-switcher-option.active .aura-option-check {
            display: block;
        }

        /* --- Rates & Info Footer --- */
        .aura-switcher-footer {
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            margin-top: 10px;
            padding-top: 10px;
            font-size: 9px;
            color: var(--switcher-text-muted);
            line-height: 1.4;
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .aura-footer-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .aura-accent-glow-text {
            color: #10b981;
            font-weight: 700;
        }

        /* Keyboard Accessibility Highlight */
        .aura-switcher-option:focus-visible {
            outline: 2px solid var(--switcher-accent);
            outline-offset: -2px;
        }
    `;
    document.head.appendChild(style);

    // Currency Details Configurations
    const currencies = [
        { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', class: 'badge-ngn', rateText: 'Clinical Baseline' },
        { code: 'USD', symbol: '$', name: 'US Dollar', class: 'badge-usd', rateText: '1 USD = ₦1,500' },
        { code: 'PI', symbol: 'π', name: 'Pi GCV Protocol', class: 'badge-pi', rateText: '1π = $314,159 (GCV)' }
    ];

    class CurrencySwitcher {
        constructor() {
            this.activeDropdown = null;
            this.init();
        }

        init() {
            const hasHeaderMount = this.setupHeaderMounts();
            
            // If the page doesn't have a header-level mount, we inject the floating widget
            if (!hasHeaderMount) {
                this.setupFloatingWidget();
            }

            this.attachGlobalListeners();
            this.updateUI(window.CurrencyManager ? window.CurrencyManager.current : 'NGN');
        }

        setupHeaderMounts() {
            const mounts = document.querySelectorAll('.aura-currency-switcher');
            if (mounts.length === 0) return false;

            mounts.forEach((mount, idx) => {
                mount.innerHTML = ''; // Clear fallback or legacy code
                
                const switcherContainer = document.createElement('div');
                switcherContainer.className = 'aura-header-switcher';
                switcherContainer.id = `aura-header-switcher-${idx}`;

                const toggle = document.createElement('button');
                toggle.className = 'aura-switcher-toggle';
                toggle.setAttribute('aria-haspopup', 'listbox');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.setAttribute('aria-label', 'Select currency');
                toggle.innerHTML = `
                    <span class="current-currency-symbol">₦</span>
                    <i class="far fa-chevron-down"></i>
                `;

                const dropdown = document.createElement('div');
                dropdown.className = 'aura-switcher-dropdown';
                dropdown.setAttribute('role', 'listbox');

                currencies.forEach(c => {
                    const button = document.createElement('button');
                    button.className = 'aura-switcher-option';
                    button.setAttribute('role', 'option');
                    button.setAttribute('data-currency-set', c.code);
                    button.innerHTML = `
                        <div class="aura-option-badge ${c.class}">${c.symbol}</div>
                        <div class="aura-option-info">
                            <div class="aura-option-name">${c.name} <span class="aura-option-check">✓</span></div>
                            <div class="aura-option-desc">${c.rateText}</div>
                        </div>
                    `;
                    dropdown.appendChild(button);
                });

                // Add exchange info footer
                const footer = document.createElement('div');
                footer.className = 'aura-switcher-footer';
                footer.innerHTML = `
                    <div class="aura-footer-row">
                        <span>Rate Baseline:</span>
                        <span>$1.00 = ₦1,500</span>
                    </div>
                    <div class="aura-footer-row">
                        <span>Pi GCV Standard:</span>
                        <span class="aura-accent-glow-text">1π = $314,159</span>
                    </div>
                `;
                dropdown.appendChild(footer);

                switcherContainer.appendChild(toggle);
                switcherContainer.appendChild(dropdown);
                mount.appendChild(switcherContainer);
            });

            return true;
        }

        setupFloatingWidget() {
            // Check if widget already exists
            if (document.getElementById('aura-floating-switcher')) return;

            const widget = document.createElement('div');
            widget.className = 'aura-floating-switcher';
            widget.id = 'aura-floating-switcher';

            const toggle = document.createElement('button');
            toggle.className = 'aura-floating-toggle';
            toggle.setAttribute('aria-haspopup', 'listbox');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Toggle currency panel');
            toggle.textContent = '₦';

            const dropdown = document.createElement('div');
            dropdown.className = 'aura-floating-dropdown';
            dropdown.setAttribute('role', 'listbox');

            currencies.forEach(c => {
                const button = document.createElement('button');
                button.className = 'aura-switcher-option';
                button.setAttribute('role', 'option');
                button.setAttribute('data-currency-set', c.code);
                button.innerHTML = `
                    <div class="aura-option-badge ${c.class}">${c.symbol}</div>
                    <div class="aura-option-info">
                        <div class="aura-option-name">${c.name} <span class="aura-option-check">✓</span></div>
                        <div class="aura-option-desc">${c.rateText}</div>
                    </div>
                `;
                dropdown.appendChild(button);
            });

            const footer = document.createElement('div');
            footer.className = 'aura-switcher-footer';
            footer.innerHTML = `
                <div class="aura-footer-row">
                    <span>Rates: $1 = ₦1,500 | 1π = $314,159</span>
                </div>
                <div class="aura-footer-row">
                    <span class="gcv-disclosure" style="font-size: 8px;">GCV Valuation: ₦471,238,500 per Pi</span>
                </div>
            `;
            dropdown.appendChild(footer);

            widget.appendChild(toggle);
            widget.appendChild(dropdown);
            document.body.appendChild(widget);
        }

        attachGlobalListeners() {
            // Toggle dropdowns
            document.addEventListener('click', (e) => {
                const toggle = e.target.closest('.aura-switcher-toggle, .aura-floating-toggle');
                if (toggle) {
                    e.stopPropagation();
                    const container = toggle.parentNode;
                    const isActive = container.classList.contains('active');

                    // Close all first
                    this.closeAllDropdowns();

                    if (!isActive) {
                        container.classList.add('active');
                        toggle.setAttribute('aria-expanded', 'true');
                        this.activeDropdown = container;
                        
                        // Focus first option on open for accessibility
                        const firstOpt = container.querySelector('.aura-switcher-option');
                        if (firstOpt) setTimeout(() => firstOpt.focus(), 100);
                    }
                } else {
                    // Clicking outside closes dropdowns
                    this.closeAllDropdowns();
                }
            });

            // Keyboard navigation inside options
            document.addEventListener('keydown', (e) => {
                if (!this.activeDropdown) return;

                const activeElement = document.activeElement;
                const options = Array.from(this.activeDropdown.querySelectorAll('.aura-switcher-option'));
                const currentIndex = options.indexOf(activeElement);

                if (e.key === 'Escape') {
                    this.closeAllDropdowns();
                } else if (e.key === 'ArrowDown' && currentIndex < options.length - 1) {
                    e.preventDefault();
                    options[currentIndex + 1].focus();
                } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                    e.preventDefault();
                    options[currentIndex - 1].focus();
                }
            });

            // Listen to manager changes
            window.addEventListener('auraCurrencyChanged', (e) => {
                this.updateUI(e.detail.currency);
            });
        }

        closeAllDropdowns() {
            document.querySelectorAll('.aura-header-switcher, .aura-floating-switcher').forEach(el => {
                el.classList.remove('active');
                const btn = el.querySelector('button');
                if (btn) btn.setAttribute('aria-expanded', 'false');
            });
            this.activeDropdown = null;
        }

        updateUI(currency) {
            const sym = window.CurrencyManager ? window.CurrencyManager.symbols[currency] : '₦';
            
            // Update Toggle Button Labels
            document.querySelectorAll('.aura-switcher-toggle .current-currency-symbol').forEach(el => {
                el.textContent = sym;
            });
            
            const floatToggle = document.querySelector('.aura-floating-toggle');
            if (floatToggle) {
                floatToggle.textContent = sym;
            }

            // Update Active Class inside options
            document.querySelectorAll('.aura-switcher-option').forEach(btn => {
                const btnCur = btn.getAttribute('data-currency-set');
                if (btnCur === currency) {
                    btn.classList.add('active');
                    btn.setAttribute('aria-selected', 'true');
                } else {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                }
            });
        }
    }

    // Auto initialize on DOM Load or run immediately if already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => window.AuraCurrencySwitcher = new CurrencySwitcher());
    } else {
        window.AuraCurrencySwitcher = new CurrencySwitcher();
    }
})();
