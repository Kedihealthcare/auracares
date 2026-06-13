/**
 * Aura Herbs - Section-Manageable Premium Countdown Engine
 * Standardizes countdown timers across different clinical and promotional sections
 * Features a floating Countdown Switchboard to manage months, days, hours, mins, secs
 * Exposes a global CountdownManager API
 */
(function(window) {
    'use strict';

    // Global registry of active countdown sections
    const registry = {};

    const templates = {
        standard: `
            <div class="countdown-item animate-pulse-subtle">
                <span class="countdown-value">%D</span>
                <span class="countdown-label">Days</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-value">%H</span>
                <span class="countdown-label">Hours</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-value">%M</span>
                <span class="countdown-label">Mins</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-value text-green-500">%S</span>
                <span class="countdown-label">Secs</span>
            </div>
        `,
        compact: '<span class="days">%D d</span> <span class="hours">%Hh</span> : <span class="minutes">%Mm</span> : <span class="seconds text-green-500">%Ss</span>',
        simple: '%H:%M:%S',
        theme: `
            <div class="single"><h1>%D</h1><p>Days</p></div> 
            <div class="single"><h1>%H</h1><p>Hours</p></div> 
            <div class="single"><h1>%M</h1><p>Mins</p></div> 
            <div class="single text-green-500"><h1>%S</h1><p>Sec</p></div>
        `
    };

    class SectionCountdown {
        constructor(element, options = {}) {
            this.element = element;
            this.id = element.id || element.getAttribute('data-countdown-id') || 'countdown-' + Math.random().toString(36).substr(2, 9);
            
            // Extract options from DOM data attributes if present
            const domOptions = {
                date: element.getAttribute('data-countdown'),
                format: element.getAttribute('data-countdown-format'),
                persist: element.getAttribute('data-countdown-persist') === 'true',
                cycle: element.getAttribute('data-countdown-cycle'), // e.g. "1h", "24h", "60m"
                expireText: element.getAttribute('data-countdown-expired') || 'EXPIRED'
            };

            this.options = Object.assign({
                date: null,
                format: 'theme', // Default theme format to keep compatibility
                persist: false,
                cycle: null,
                expireText: 'EXPIRED',
                onTick: null,
                onEnd: null
            }, options, this.cleanOptions(domOptions));

            // Load administrative configurations if present
            const savedConfig = localStorage.getItem(`kedi_countdown_config_${this.id}`);
            this.adminConfig = savedConfig ? JSON.parse(savedConfig) : null;

            if (this.adminConfig) {
                this.options.enabled = this.adminConfig.enabled !== false;
                if (this.adminConfig.targetTime) {
                    this.options.date = this.adminConfig.targetTime;
                }
            } else {
                this.options.enabled = true;
            }

            this.intervalId = null;
            this.targetTime = this.calculateTargetTime();
            this.init();
            this.registerDiscovered();
        }

        cleanOptions(opts) {
            const cleaned = {};
            for (let key in opts) {
                if (opts[key] !== null && opts[key] !== undefined && opts[key] !== '') {
                    cleaned[key] = opts[key];
                }
            }
            return cleaned;
        }

        calculateTargetTime() {
            const storageKey = `kedi_countdown_target_${this.id}`;
            
            // Check persistence first
            if (this.options.persist) {
                const stored = localStorage.getItem(storageKey);
                if (stored) {
                    const parsed = parseInt(stored, 10);
                    if (parsed > Date.now()) {
                        return parsed;
                    }
                }
            }

            let target = null;
            const dateVal = this.options.date;

            if (typeof dateVal === 'number') {
                target = dateVal;
            } else if (!dateVal) {
                // If no date provided, default to a relative 24 hour cycle
                target = Date.now() + 24 * 60 * 60 * 1000;
            } else if (typeof dateVal === 'string' && dateVal.startsWith('+')) {
                // Relative time format, e.g., "+2h", "+1d", "+15m", "+3600s"
                target = this.parseRelativeTime(dateVal);
            } else {
                // Try parsing absolute date
                target = new Date(dateVal).getTime();
            }

            // Fallback for invalid dates
            if (isNaN(target)) {
                console.warn(`Countdown [${this.id}]: Invalid target date "${dateVal}". Falling back to 1 hour relative.`);
                target = Date.now() + 60 * 60 * 1000;
            }

            // Save to localStorage if persistence is enabled
            if (this.options.persist) {
                localStorage.setItem(storageKey, target.toString());
            }

            return target;
        }

        parseRelativeTime(str) {
            const num = parseInt(str.substring(1), 10);
            const unit = str.slice(-1).toLowerCase();
            let ms = 0;

            switch (unit) {
                case 'd': ms = num * 24 * 60 * 60 * 1000; break;
                case 'h': ms = num * 60 * 60 * 1000; break;
                case 'm': ms = num * 60 * 1000; break;
                case 's': ms = num * 1000; break;
                default: ms = num * 1000;
            }
            return Date.now() + ms;
        }

        getSectionTitle() {
            if (this.element.getAttribute('data-countdown-title')) {
                return this.element.getAttribute('data-countdown-title');
            }
            // Walk up to find headings
            const parentSection = this.element.closest('section, .offer-product, .product__head, .container, .hero-area');
            if (parentSection) {
                const heading = parentSection.querySelector('h1, h2, h3, h4');
                if (heading) {
                    return heading.innerText.trim().replace(/\n/g, ' ').substring(0, 30);
                }
            }
            return `Promo Timer (${this.id.substring(0, 8)})`;
        }

        init() {
            if (!this.options.enabled) {
                this.expire();
                return;
            }

            // Apply standard layout classes
            if (!this.element.classList.contains('countdown-active')) {
                this.element.classList.add('countdown-active');
            }
            
            this.tick(); // Initial run
            this.intervalId = setInterval(() => this.tick(), 1000);
        }

        tick() {
            const now = Date.now();
            let remaining = this.targetTime - now;

            if (remaining <= 0) {
                if (this.options.cycle) {
                    // Handle cyclical countdowns (resets to cycle length on expire)
                    this.targetTime = this.parseRelativeTime('+' + this.options.cycle);
                    if (this.options.persist) {
                        localStorage.setItem(`kedi_countdown_target_${this.id}`, this.targetTime.toString());
                    }
                    remaining = this.targetTime - now;
                } else {
                    this.expire();
                    return;
                }
            }

            this.updateDOM(remaining);

            if (typeof this.options.onTick === 'function') {
                this.options.onTick(remaining, this);
            }
        }

        updateDOM(ms) {
            const seconds = Math.floor((ms / 1000) % 60);
            const minutes = Math.floor((ms / 1000 / 60) % 60);
            const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
            const days = Math.floor(ms / (1000 * 60 * 60 * 24));

            const pad = (num) => String(num).padStart(2, '0');

            const replacements = {
                '%D': pad(days),
                '%H': pad(hours),
                '%M': pad(minutes),
                '%S': pad(seconds),
                '%d': days,
                '%h': hours,
                '%m': minutes,
                '%s': seconds
            };

            let template = templates[this.options.format] || this.options.format;
            
            for (let placeholder in replacements) {
                template = template.replace(new RegExp(placeholder, 'g'), replacements[placeholder]);
            }

            this.element.innerHTML = template;
            this.element.style.display = ''; // Make sure it's visible if active
        }

        expire() {
            clearInterval(this.intervalId);
            this.element.innerHTML = `<div class="countdown-expired-msg text-danger font-bold text-center">${this.options.expireText}</div>`;
            
            if (this.options.persist) {
                localStorage.removeItem(`kedi_countdown_target_${this.id}`);
            }

            if (typeof this.options.onEnd === 'function') {
                this.options.onEnd(this);
            }
        }

        refresh(config) {
            this.stop();
            this.adminConfig = config;
            this.options.enabled = config.enabled !== false;
            
            if (config.targetTime) {
                this.options.date = config.targetTime;
            }
            this.targetTime = this.calculateTargetTime();
            this.init();
        }

        stop() {
            clearInterval(this.intervalId);
        }

        registerDiscovered() {
            try {
                const discovered = JSON.parse(localStorage.getItem('kedi_discovered_countdowns') || '[]');
                const title = this.getSectionTitle();
                const existingIndex = discovered.findIndex(item => item.id === this.id);
                const itemData = {
                    id: this.id,
                    title: title,
                    format: this.options.format,
                    lastSeen: Date.now()
                };
                if (existingIndex > -1) {
                    discovered[existingIndex] = itemData;
                } else {
                    discovered.push(itemData);
                }
                localStorage.setItem('kedi_discovered_countdowns', JSON.stringify(discovered));
            } catch (e) {
                console.error('Error registering discovered countdown:', e);
            }
        }
    }

    // Expose CountdownManager API
    const CountdownManager = {
        /**
         * Initialize all countdown elements inside the DOM
         * Scans for [data-countdown] automatically
         */
        init: function() {
            const elements = document.querySelectorAll('[data-countdown]');
            elements.forEach(el => {
                const timer = new SectionCountdown(el);
                registry[timer.id] = timer;
            });
        },

        /**
         * Register a specific section countdown manually
         * @param {string|HTMLElement} elementOrSelector 
         * @param {Object} options 
         * @returns {SectionCountdown}
         */
        register: function(elementOrSelector, options = {}) {
            const element = typeof elementOrSelector === 'string' ? 
                document.querySelector(elementOrSelector) : elementOrSelector;
            
            if (!element) {
                console.error(`CountdownManager: Element not found for selector/object`, elementOrSelector);
                return null;
            }

            const timer = new SectionCountdown(element, options);
            registry[timer.id] = timer;
            return timer;
        },

        /**
         * Get an active countdown instance by element ID
         * @param {string} id 
         * @returns {SectionCountdown|undefined}
         */
        get: function(id) {
            return registry[id];
        },

        /**
         * Stop a countdown section by ID
         * @param {string} id 
         */
        stop: function(id) {
            if (registry[id]) {
                registry[id].stop();
                delete registry[id];
            }
        },

        /**
         * Stop and clean all countdown timers
         */
        destroyAll: function() {
            for (let id in registry) {
                registry[id].stop();
                delete registry[id];
            }
        },

        /**
         * Save settings for a specific section (even if not active on the current page)
         */
        applySettings: function(id, configData) {
            let config = configData;
            
            if (!config) {
                const enabled = document.getElementById(`switch-state-${id}`)?.checked;
                const months = parseInt(document.getElementById(`val-months-${id}`)?.value, 10) || 0;
                const days = parseInt(document.getElementById(`val-days-${id}`)?.value, 10) || 0;
                const hours = parseInt(document.getElementById(`val-hours-${id}`)?.value, 10) || 0;
                const minutes = parseInt(document.getElementById(`val-mins-${id}`)?.value, 10) || 0;
                const seconds = parseInt(document.getElementById(`val-secs-${id}`)?.value, 10) || 0;
                const fixedDate = document.getElementById(`val-fixed-${id}`)?.value;

                let targetTime = null;

                if (fixedDate) {
                    targetTime = new Date(fixedDate).getTime();
                } else {
                    let msOffset = 0;
                    msOffset += seconds * 1000;
                    msOffset += minutes * 60 * 1000;
                    msOffset += hours * 60 * 60 * 1000;
                    msOffset += days * 24 * 60 * 60 * 1000;
                    msOffset += months * 30 * 24 * 60 * 60 * 1000;
                    
                    targetTime = Date.now() + msOffset;
                }

                config = {
                    enabled: enabled !== false,
                    targetTime: targetTime,
                    values: { months, days, hours, minutes, seconds },
                    fixedDate: fixedDate || null
                };
            }

            // Save in localStorage
            localStorage.setItem(`kedi_countdown_config_${id}`, JSON.stringify(config));

            // Refresh the timer instance if active
            const timer = registry[id];
            if (timer) {
                timer.refresh(config);
            }
            
            return config;
        },

        /**
         * Update state toggle on/off
         */
        updateSectionState: function(id, checked) {
            const savedConfig = localStorage.getItem(`kedi_countdown_config_${id}`);
            const config = savedConfig ? JSON.parse(savedConfig) : { values: { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 } };
            config.enabled = checked;
            localStorage.setItem(`kedi_countdown_config_${id}`, JSON.stringify(config));
            
            const timer = registry[id];
            if (timer) {
                timer.refresh(config);
            }
        }
    };

    // Pre-populate standard countdowns if empty
    try {
        if (!localStorage.getItem('kedi_discovered_countdowns')) {
            const defaults = [
                { id: 'home-3-mouth-care', title: 'Clinical Foundation / Mouth Care', format: 'theme', lastSeen: Date.now() },
                { id: 'home-2-deals', title: 'Deals Of The Day', format: 'theme', lastSeen: Date.now() },
                { id: 'kedi-hot-revive', title: 'Hot Deals - Re-vive Capsule', format: 'theme', lastSeen: Date.now() },
                { id: 'kedi-hot-reishi', title: 'Hot Deals - Reishi', format: 'theme', lastSeen: Date.now() },
                { id: 'kedi-hot-eye-beta', title: 'Hot Deals - Eye Beta', format: 'theme', lastSeen: Date.now() }
            ];
            localStorage.setItem('kedi_discovered_countdowns', JSON.stringify(defaults));
        }
    } catch(e) {}

    // Auto initialize on DOM Content Loaded
    if (typeof document !== 'undefined') {
        document.addEventListener('DOMContentLoaded', () => {
            // Give third party scripts a small window to run custom manual registrations first
            setTimeout(() => {
                CountdownManager.init();
            }, 100);
        });
    }

    // Attach to window object
    window.CountdownManager = CountdownManager;

    // jQuery plugin bridge to prevent main.js from crashing and route calls to CountdownManager
    if (window.jQuery) {
        window.jQuery.fn.countdown = function(finalDate, callback) {
            return this.each(function() {
                const options = {
                    date: finalDate,
                    onTick: function(ms, instance) {
                        const eventObj = {
                            strftime: function(formatStr) {
                                const seconds = Math.floor((ms / 1000) % 60);
                                const minutes = Math.floor((ms / 1000 / 60) % 60);
                                const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
                                const days = Math.floor(ms / (1000 * 60 * 60 * 24));
                                const pad = (num) => String(num).padStart(2, '0');

                                const reps = {
                                    '%D': pad(days),
                                    '%H': pad(hours),
                                    '%M': pad(minutes),
                                    '%S': pad(seconds),
                                    '%d': days,
                                    '%h': hours,
                                    '%m': minutes,
                                    '%s': seconds,
                                    '%Y': '00',
                                    '%m': '00',
                                    '%W': '00',
                                    '%w': '00'
                                };
                                let formatted = formatStr;
                                for (let key in reps) {
                                    formatted = formatted.replace(new RegExp(key, 'g'), reps[key]);
                                }
                                return formatted;
                            }
                        };
                        if (typeof callback === 'function') {
                            callback(eventObj);
                        }
                    }
                };
                CountdownManager.register(this, options);
            });
        };
    }
})(window);
