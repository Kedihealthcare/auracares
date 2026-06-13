import os

path = r'c:\Users\user\Desktop\kedi\Kedi health\index.html'
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Line numbers are 1-indexed in the prompt, so line 2079 is index 2078
# We want to keep everything up to index 2077 (line 2078)
# We want to discard from index 2078 up to line 4305 (index 4304)
# And then keep everything from line 4306 (index 4305) onwards

vip_section = """
        <!-- VIP Massage Chair Feature Start -->
        <div class="vip-feature mt-80 mb-80">
            <div class="container">
                <div class="row align-items-center bg-dark rounded-[3rem] overflow-hidden" style="border: 2px solid #d4a017; background: #0a0a0a !important;">
                    <div class="col-lg-6 p-0">
                        <img src="assets/img/product/vip-massage_chair.jpg" alt="VIP Massage Chair" class="img-fluid w-100" style="object-fit: cover; min-height: 500px; opacity: 0.9;">
                    </div>
                    <div class="col-lg-6 p-5 text-white">
                        <span class="text-gold uppercase tracking-[0.4em] font-black mb-4 d-block" style="color: #d4a017; font-size: 10px;">Premier Medical Device</span>
                        <h2 class="text-4xl md:text-6xl font-[900] tracking-tighter italic mb-6 leading-tight">VIP Medical <br><span class="text-emerald-500">Massage Chair.</span></h2>
                        <p class="text-slate-400 mb-10 leading-relaxed text-sm">The ultimate clinical recovery protocol. Featuring zero-gravity positioning, AI body scanning, and therapeutic infrared heating for total systemic wellness.</p>
                        <div class="price-box mb-10">
                            <span class="text-slate-500 line-through d-block mb-1" data-base-price="2450000" style="font-size: 1.1rem;">₦2,450,000</span>
                            <span class="text-5xl font-black text-emerald-500" data-base-price="1850000">₦1,850,000</span>
                        </div>
                        <div class="btn-wrap">
                            <a href="cart.html" onclick="addToCart('p13', 'VIP Massage Chair', 1850000, 'assets/img/product/vip-massage_chair.jpg')" class="bg-emerald-600 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-emerald-700 transition d-inline-block shadow-2xl">Order Clinical Device</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- VIP Massage Chair Feature End -->
"""

new_content = lines[:2078] + [vip_section] + lines[4305:]

with open(path, 'w', encoding='utf-8') as f:
    f.writelines(new_content)

print("Success")
