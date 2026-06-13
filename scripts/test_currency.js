/**
 * Automated Test Suite for Aura Herbs Currency System
 * Verifies API design, localStorage persistence, rate calculation, and switcher components.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log("=========================================");
console.log("RUNNING CURRENCY SYSTEM AUTOMATED TESTS...");
console.log("=========================================");

// --- Setup Browser DOM Mocks ---
global.window = {};
global.window.location = { pathname: '/index.html' };

global.DOMContentLoadedHandler = null;
global.bodyChildren = [];
global.headChildren = [];
global.dispatchedEvents = [];
global.windowEventHandlers = {};

global.document = {
    readyState: 'loading',
    addEventListener: (event, handler) => {
        if (event === 'DOMContentLoaded') {
            global.DOMContentLoadedHandler = handler;
        }
    },
    getElementById: (id) => {
        const found = global.bodyChildren.find(c => c.id === id) || global.headChildren.find(c => c.id === id);
        return found || null;
    },
    querySelector: (selector) => {
        if (selector === '.aura-floating-toggle') {
            const floatWidget = global.bodyChildren.find(c => c.id === 'aura-floating-switcher');
            if (floatWidget && floatWidget.children) {
                return floatWidget.children.find(c => c.className === 'aura-floating-toggle') || null;
            }
        }
        return null;
    },
    querySelectorAll: (selector) => {
        if (selector === '.aura-currency-switcher') {
            // Mock empty or standard switcher elements
            return global.mockSwitcherElements || [];
        }
        if (selector === '[data-base-price]' || selector === '[data-currency-set]' || selector === '.current-currency-symbol' || selector === '.gcv-disclosure') {
            return [];
        }
        return [];
    },
    createElement: (tag) => {
        if (tag === 'style') {
            return {
                id: '',
                innerHTML: ''
            };
        }
        if (tag === 'script') {
            return {
                src: '',
                defer: false
            };
        }
        return {
            id: '',
            className: '',
            setAttribute: function(k, v) { this[k] = v; },
            appendChild: function(c) {
                this.children = this.children || [];
                this.children.push(c);
            }
        };
    },
    body: {
        appendChild: (child) => {
            global.bodyChildren.push(child);
        }
    },
    head: {
        appendChild: (child) => {
            global.headChildren.push(child);
        }
    }
};

global.localStorage = {
    store: {},
    getItem(key) { return this.store[key] || null; },
    setItem(key, value) { this.store[key] = String(value); }
};

global.CustomEvent = class {
    constructor(type, options) {
        this.type = type;
        this.detail = options ? options.detail : undefined;
    }
};

global.window.dispatchEvent = (eventObj) => {
    global.dispatchedEvents.push(eventObj);
    // Trigger window event handlers
    const handlers = global.windowEventHandlers[eventObj.type] || [];
    handlers.forEach(h => h(eventObj));
};

global.window.addEventListener = (event, handler) => {
    global.windowEventHandlers[event] = global.windowEventHandlers[event] || [];
    global.windowEventHandlers[event].push(handler);
};

global.window.removeEventListener = (event, handler) => {
    if (global.windowEventHandlers[event]) {
        const idx = global.windowEventHandlers[event].indexOf(handler);
        if (idx !== -1) global.windowEventHandlers[event].splice(idx, 1);
    }
};

// --- Test 1: Load and Validate CurrencyManager APIs ---
try {
    const cmPath = path.join(__dirname, '../assets/js/currency-manager.js');
    const cmCode = fs.readFileSync(cmPath, 'utf8');
    eval(cmCode);

    assert.ok(global.window.CurrencyManager, "CurrencyManager should be set on window");
    const CM = global.window.CurrencyManager;

    console.log("✓ Load CurrencyManager: PASS");

    // Default Currency
    assert.strictEqual(CM.getCurrentCurrency(), 'NGN', "Default currency should be NGN");
    console.log("✓ Default Currency is NGN: PASS");

    // Setting Currency & Persistence
    CM.setCurrentCurrency('USD');
    assert.strictEqual(CM.getCurrentCurrency(), 'USD', "Currency should change to USD");
    assert.strictEqual(global.localStorage.getItem('aura_currency'), 'USD', "USD should be persisted in localStorage");
    console.log("✓ Persistence & State Updates: PASS");

    // Formatters & Rates
    CM.setCurrentCurrency('NGN');
    assert.strictEqual(CM.format(1500), '₦1,500', "NGN formatting check");
    
    CM.setCurrentCurrency('USD');
    assert.strictEqual(CM.format(1500), '$1.00', "USD formatting check (1500 NGN = 1 USD)");
    
    CM.setCurrentCurrency('PI');
    // 1 PI = 314,159 USD = 471,238,500 NGN.
    // 471,238,500 NGN formatted in Pi should be exactly 1.0000000000
    assert.strictEqual(CM.format(471238500), 'π1.0000000000', "Pi GCV formatting check");
    console.log("✓ Exchange Rate Conversions & Formatting: PASS");

    // Event dispatches
    const usdEvents = global.dispatchedEvents.filter(e => e.type === 'auraCurrencyChanged');
    assert.ok(usdEvents.length > 0, "auraCurrencyChanged event should be dispatched");
    console.log("✓ Custom Event Dispatches: PASS");

    // Observable Subscription Pattern
    let observedVal = null;
    const unsub = CM.subscribe(cur => { observedVal = cur; });
    CM.setCurrentCurrency('USD');
    assert.strictEqual(observedVal, 'USD', "Subscription callback should be triggered");
    
    unsub();
    CM.setCurrentCurrency('NGN');
    assert.strictEqual(observedVal, 'USD', "Subscription callback should NOT trigger after unsubscribe");
    console.log("✓ Observable/Event Subscription Pattern: PASS");

} catch (e) {
    console.error("✗ CurrencyManager Tests FAILED:", e);
    process.exit(1);
}

// --- Test 2: Load and Validate CurrencySwitcher UI Component ---
try {
    // Reset DOM children
    global.bodyChildren = [];
    global.headChildren = [];

    const csPath = path.join(__dirname, '../assets/js/currency-switcher.js');
    const csCode = fs.readFileSync(csPath, 'utf8');
    eval(csCode);

    // DomContentLoaded trigger
    if (global.DOMContentLoadedHandler) {
        global.DOMContentLoadedHandler();
    }

    assert.ok(global.window.AuraCurrencySwitcher, "AuraCurrencySwitcher should be initialized");
    console.log("✓ Initialize CurrencySwitcher: PASS");

    // Verify floating widget creation (since there was no header element)
    const floatWidget = global.bodyChildren.find(el => el.id === 'aura-floating-switcher');
    assert.ok(floatWidget, "Floating widget switcher should be injected on page without header switcher");
    assert.strictEqual(floatWidget.children.length, 2, "Floating widget should contain toggle button and option dropdown");
    console.log("✓ Floating Widget Fallback Rendering: PASS");

    // Verify style tag injection
    const styleTag = global.headChildren.find(el => el.id === 'aura-currency-switcher-styles');
    assert.ok(styleTag, "CSS stylesheet styles should be dynamically injected into the head");
    console.log("✓ Dynamic CSS Injection: PASS");

} catch (e) {
    console.error("✗ CurrencySwitcher Tests FAILED:", e);
    process.exit(1);
}

console.log("\n=========================================");
console.log("ALL AUTOMATED TESTS PASSED SUCCESSFULLY! ✓");
console.log("=========================================");
process.exit(0);
