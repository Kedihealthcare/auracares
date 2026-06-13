import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex to find <span ...>&#8358;10,000</span>
    # We will use a function to compute the replacement
    def repl(m):
        span_attrs = m.group(1)
        # If it already has data-base-price, ignore
        if 'data-base-price' in span_attrs:
            return m.group(0)
        
        price_str = m.group(2)
        price_val = price_str.replace(',', '')
        
        return f'<span{span_attrs} data-base-price="{price_val}">&#8358;{price_str}</span>'

    # Pattern: <span(.*?)>&#8358;([0-9,]+)</span>
    new_content = re.sub(r'<span([^>]*)>&#8358;([0-9,]+)</span>', repl, content)

    # Replace the old currency switcher in the header with the new one
    old_switcher = """<div class="header__language currency">
                                    <ul>
                                        <li><a href="#!" class="lang-btn"><img src="assets/img/icon/usd_icon.svg" alt="">Ã â‚¬ <i class="far fa-chevron-down"></i></a>
                                            <ul class="lang_sub_list">
                                                <li><a href="#">Ã â‚¬</a></li>
                                                <li><a href="#">BTC</a></li> 
                                                <li><a href="#">USDT</a></li> 
                                            </ul>
                                        </li>
                                    </ul>
                                </div>"""
    
    new_switcher = """<div class="hidden md:flex items-center space-x-2 bg-slate-900/5 p-1 rounded-full border border-slate-200">
                                    <button data-currency-set="NGN" class="currency-switch-btn w-6 h-6 rounded-full text-[9px] font-bold flex items-center justify-center hover:bg-white hover:shadow-sm">&#8358;</button>
                                    <button data-currency-set="USD" class="currency-switch-btn w-6 h-6 rounded-full text-[9px] font-bold flex items-center justify-center hover:bg-white hover:shadow-sm">$</button>
                                    <button data-currency-set="PI" class="currency-switch-btn w-6 h-6 rounded-full text-[9px] font-bold flex items-center justify-center hover:bg-white hover:shadow-sm">Ï€</button>
                                </div>"""

    if old_switcher in new_content:
        new_content = new_content.replace(old_switcher, new_switcher)
        print("Replaced old currency switcher with new CurrencyManager switcher.")
    else:
        print("Old currency switcher not found exactly as expected.")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Injected data-base-price into {filepath}")

import os

# Process all HTML files in the current directory
for filename in os.listdir('.'):
    if filename.lower().endswith('.html'):
        process_file(filename)
