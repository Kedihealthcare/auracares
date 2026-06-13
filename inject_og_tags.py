#!/usr/bin/env python3
"""
inject_og_tags.py
Batch-injects complete Open Graph + Twitter Card social preview meta tags
into all Aura Herbs HTML pages. Removes any existing partial OG/Twitter tags
first, then inserts the full canonical block.
"""
import re
import os

BASE_URL  = "https://auraherbs.ai"
SITE_NAME = "Aura Herbs"
TW_HANDLE = "@auraherbs"
DEFAULT_IMG = "assets/img/product/kedi.jpg"

# ── Per-page configuration ────────────────────────────────────────────────────
PAGES = {
    "index.html": {
        "url":   f"{BASE_URL}/index.html",
        "type":  "website",
        "title": "Aura Herbs – Clinical Treatment Portal",
        "desc":  "Access verified medical-grade herbal treatment protocols. Scientifically optimised for maximum therapeutic efficacy by Aura Herbs Global.",
        "img":   "assets/img/product/kedi.jpg",
        "img_alt": "Aura Herbs Clinical Protocol Products",
    },
    "about.html": {
        "url":   f"{BASE_URL}/about.html",
        "type":  "website",
        "title": "Our Clinical Mission | Aura Herbs",
        "desc":  "Discover the mission behind Aura Herbs Clinical Global. Bridging ancient herbal wisdom with modern clinical science for lasting health results.",
        "img":   "assets/img/product/kedi.jpg",
        "img_alt": "Aura Herbs Clinical Mission",
    },
    "shop.html": {
        "url":   f"{BASE_URL}/shop.html",
        "type":  "website",
        "title": "Clinical Protocols Catalog | Aura Herbs",
        "desc":  "Browse our complete range of medical-grade herbal treatment protocols. Scientifically validated formulas for optimal health and longevity.",
        "img":   "assets/img/product/kedi_pro_list.jpg",
        "img_alt": "Aura Herbs Product Catalog",
    },
    "shop-left-sidebar.html": {
        "url":   f"{BASE_URL}/shop-left-sidebar.html",
        "type":  "website",
        "title": "Browse Clinical Protocols | Aura Herbs",
        "desc":  "Filter and explore our full catalog of clinical herbal treatment protocols. Find the right formula for your health goals.",
        "img":   "assets/img/product/kedi_pro_list.jpg",
        "img_alt": "Aura Herbs Protocol Catalog with Filters",
    },
    "shop-single.html": {
        "url":   f"{BASE_URL}/shop-single.html",
        "type":  "product",
        "title": "Clinical Protocol | Aura Herbs",
        "desc":  "Detailed clinical information about our medical-grade herbal treatment protocol. Scientifically formulated for proven health outcomes.",
        "img":   "assets/img/product/kedi.jpg",
        "img_alt": "Aura Herbs Clinical Protocol",
    },
    "blog.html": {
        "url":   f"{BASE_URL}/blog.html",
        "type":  "website",
        "title": "Health Intelligence Blog | Aura Herbs",
        "desc":  "Evidence-based articles on herbal medicine, clinical protocols and natural health optimisation from the Aura Herbs expert team.",
        "img":   "assets/img/product/kedi.jpg",
        "img_alt": "Aura Herbs Health Intelligence Blog",
    },
    "blog-immune-system.html": {
        "url":   f"{BASE_URL}/blog-immune-system.html",
        "type":  "article",
        "title": "Immune System Optimisation | Aura Herbs Blog",
        "desc":  "Clinical insights on strengthening your immune system using evidence-based herbal protocols and scientifically validated natural interventions.",
        "img":   "assets/img/product/kedi.jpg",
        "img_alt": "Immune System Clinical Protocol – Aura Herbs",
    },
    "blog-male-vitality.html": {
        "url":   f"{BASE_URL}/blog-male-vitality.html",
        "type":  "article",
        "title": "Male Vitality Protocols | Aura Herbs Blog",
        "desc":  "Evidence-based clinical approaches to male health optimisation using premium herbal formulations from Aura Herbs Global.",
        "img":   "assets/img/product/kedi.jpg",
        "img_alt": "Male Vitality Clinical Protocol – Aura Herbs",
    },
    "blog-metabolic-health.html": {
        "url":   f"{BASE_URL}/blog-metabolic-health.html",
        "type":  "article",
        "title": "Metabolic Health Protocols | Aura Herbs Blog",
        "desc":  "Clinical strategies for metabolic optimisation using scientifically validated herbal interventions. Achieve lasting metabolic balance naturally.",
        "img":   "assets/img/product/kedi.jpg",
        "img_alt": "Metabolic Health Clinical Protocol – Aura Herbs",
    },
    "cart.html": {
        "url":   f"{BASE_URL}/cart.html",
        "type":  "website",
        "title": "Your Cart | Aura Herbs",
        "desc":  "Review your selected clinical herbal protocols and proceed to secure checkout. Premium health solutions delivered worldwide.",
        "img":   "assets/img/product/kedi.jpg",
        "img_alt": "Aura Herbs Shopping Cart",
    },
    "checkout.html": {
        "url":   f"{BASE_URL}/checkout.html",
        "type":  "website",
        "title": "Secure Checkout | Aura Herbs",
        "desc":  "Complete your order securely. Premium clinical herbal protocols delivered worldwide with full after-purchase support from Aura Herbs.",
        "img":   "assets/img/product/kedi.jpg",
        "img_alt": "Aura Herbs Secure Checkout",
    },
    "checkout-v2.html": {
        "url":   f"{BASE_URL}/checkout-v2.html",
        "type":  "website",
        "title": "Checkout | Aura Herbs",
        "desc":  "Complete your purchase of premium clinical herbal protocols from Aura Herbs. Secure payment and worldwide delivery guaranteed.",
        "img":   "assets/img/product/kedi.jpg",
        "img_alt": "Aura Herbs Checkout",
    },
    "contact.html": {
        "url":   f"{BASE_URL}/contact.html",
        "type":  "website",
        "title": "Contact Our Clinical Team | Aura Herbs",
        "desc":  "Get in touch with our clinical support team. We are here to guide your herbal health journey with expert advice and personalised care.",
        "img":   "assets/img/product/kedi.jpg",
        "img_alt": "Aura Herbs Clinical Support Team",
    },
    "franchise.html": {
        "url":   f"{BASE_URL}/franchise.html",
        "type":  "website",
        "title": "Franchise Opportunity | Aura Herbs Clinical Healthcare",
        "desc":  "Join the Aura Herbs global franchise network. Partner with us to bring premium clinical herbal protocols to your community and build a thriving health business.",
        "img":   "assets/img/product/promo.jpg",
        "img_alt": "Aura Herbs Franchise Business Opportunity",
    },
    "quiz.html": {
        "url":   f"{BASE_URL}/quiz.html",
        "type":  "website",
        "title": "Personalised Health Assessment | Aura Herbs",
        "desc":  "Take our personalised health assessment quiz to discover the right clinical herbal protocols for your unique health profile and wellness goals.",
        "img":   "assets/img/product/kedi.jpg",
        "img_alt": "Aura Herbs Health Assessment Quiz",
    },
    "health-challenges.html": {
        "url":   f"{BASE_URL}/health-challenges.html",
        "type":  "website",
        "title": "Health Challenges & Solutions | Aura Herbs",
        "desc":  "Explore clinical herbal solutions for common health challenges. Evidence-based protocols for lasting results across 40+ health conditions.",
        "img":   "assets/img/product/kedi.jpg",
        "img_alt": "Aura Herbs Health Challenge Solutions",
    },
    "ai-doctor.html": {
        "url":   f"{BASE_URL}/ai-doctor.html",
        "type":  "website",
        "title": "AI Health Assistant | Aura Herbs",
        "desc":  "Get personalised health guidance from our AI-powered clinical assistant. Evidence-based herbal recommendations tailored to your health profile.",
        "img":   "assets/img/product/kedi.jpg",
        "img_alt": "Aura Herbs AI Health Assistant",
    },
    "auth.html": {
        "url":   f"{BASE_URL}/auth.html",
        "type":  "website",
        "title": "Sign In | Aura Herbs",
        "desc":  "Access your Aura Herbs account to manage your clinical protocols, order history, and personalised health recommendations.",
        "img":   "assets/img/product/kedi.jpg",
        "img_alt": "Aura Herbs Account Login",
    },
    "account.html": {
        "url":   f"{BASE_URL}/account.html",
        "type":  "website",
        "title": "My Account | Aura Herbs",
        "desc":  "Manage your Aura Herbs account, orders, and personalised clinical protocol recommendations all in one place.",
        "img":   "assets/img/product/kedi.jpg",
        "img_alt": "Aura Herbs My Account Dashboard",
    },
    "404.html": {
        "url":   f"{BASE_URL}/404.html",
        "type":  "website",
        "title": "Page Not Found | Aura Herbs",
        "desc":  "The page you are looking for does not exist. Explore our clinical treatment protocols and health intelligence resources instead.",
        "img":   "assets/img/product/kedi.jpg",
        "img_alt": "Aura Herbs – Page Not Found",
    },
    "roi-calculator.html": {
        "url":   f"{BASE_URL}/roi-calculator.html",
        "type":  "website",
        "title": "Franchise ROI Calculator | Aura Herbs",
        "desc":  "Calculate the return on investment for your Aura Herbs clinical franchise opportunity. Discover the earning potential in your region.",
        "img":   "assets/img/product/promo.jpg",
        "img_alt": "Aura Herbs Franchise ROI Calculator",
    },
    "news-single.html": {
        "url":   f"{BASE_URL}/news-single.html",
        "type":  "article",
        "title": "Health Intelligence News | Aura Herbs",
        "desc":  "Latest health intelligence, clinical updates, and herbal research news from the Aura Herbs expert research team.",
        "img":   "assets/img/product/kedi.jpg",
        "img_alt": "Aura Herbs Health News",
    },
    "notifications.html": {
        "url":   f"{BASE_URL}/notifications.html",
        "type":  "website",
        "title": "Notifications | Aura Herbs",
        "desc":  "Stay updated with the latest news, protocol updates, and health insights from Aura Herbs Clinical Global.",
        "img":   "assets/img/product/kedi.jpg",
        "img_alt": "Aura Herbs Notifications Centre",
    },
    "email-centre.html": {
        "url":   f"{BASE_URL}/email-centre.html",
        "type":  "website",
        "title": "Email Centre | Aura Herbs",
        "desc":  "Manage your Aura Herbs email communications, health protocol newsletters, and clinical updates in one convenient place.",
        "img":   "assets/img/product/kedi.jpg",
        "img_alt": "Aura Herbs Email Centre",
    },
    "kedi.html": {
        "url":   f"{BASE_URL}/kedi.html",
        "type":  "website",
        "title": "Kedi Healthcare Products | Aura Herbs",
        "desc":  "Explore the complete Kedi Healthcare range available through Aura Herbs. Medical-grade natural formulas for whole-body health.",
        "img":   "assets/img/product/kedi.jpg",
        "img_alt": "Kedi Healthcare Products – Aura Herbs",
    },
    "ad-showcase.html": {
        "url":   f"{BASE_URL}/ad-showcase.html",
        "type":  "website",
        "title": "Clinical Protocol Showcase | Aura Herbs",
        "desc":  "Discover our featured clinical herbal protocols and their evidence-based benefits for your health and wellbeing.",
        "img":   "assets/img/product/promo.jpg",
        "img_alt": "Aura Herbs Clinical Protocol Showcase",
    },
    "health-challenges.html": {
        "url":   f"{BASE_URL}/health-challenges.html",
        "type":  "website",
        "title": "Health Challenges & Clinical Solutions | Aura Herbs",
        "desc":  "Explore evidence-based herbal solutions for common health challenges. Over 40 conditions addressed with proven clinical protocols.",
        "img":   "assets/img/product/kedi.jpg",
        "img_alt": "Aura Herbs Health Challenge Solutions",
    },
}

# ── OG tag patterns to strip before re-inserting ─────────────────────────────
STRIP_PATTERNS = [
    r'<meta\s+property="og:[^"]*"[^>]*/?>',
    r'<meta\s+property=\'og:[^\']*\'[^>]*/?>',
    r'<meta\s+name="twitter:[^"]*"[^>]*/?>',
    r'<meta\s+name=\'twitter:[^\']*\'[^>]*/?>',
    r'<meta\s+name="pinterest[^"]*"[^>]*/?>',
    r'<!--\s*={3,}.*?Social.*?={3,}.*?-->',
    r'<!--\s*Social Metadata.*?-->',
    r'<!--\s*Open Graph.*?-->',
    r'<!--\s*Twitter.*?-->',
    r'<!--\s*WhatsApp.*?-->',
]

def build_og_block(cfg):
    abs_img = f"{BASE_URL}/{cfg['img']}"
    return f"""
    <!-- ===== Social Rich Preview Meta Tags ===== -->
    <!-- Open Graph: Facebook, WhatsApp, LinkedIn, Telegram, Discord, Slack, Pinterest -->
    <meta property="og:type"             content="{cfg['type']}">
    <meta property="og:site_name"        content="{SITE_NAME}">
    <meta property="og:locale"           content="en_US">
    <meta property="og:url"              content="{cfg['url']}">
    <meta property="og:title"            content="{cfg['title']}">
    <meta property="og:description"      content="{cfg['desc']}">
    <meta property="og:image"            content="{abs_img}">
    <meta property="og:image:secure_url" content="{abs_img}">
    <meta property="og:image:type"       content="image/jpeg">
    <meta property="og:image:width"      content="1200">
    <meta property="og:image:height"     content="630">
    <meta property="og:image:alt"        content="{cfg['img_alt']}">
    <!-- Twitter / X Card -->
    <meta name="twitter:card"            content="summary_large_image">
    <meta name="twitter:site"            content="{TW_HANDLE}">
    <meta name="twitter:creator"         content="{TW_HANDLE}">
    <meta name="twitter:title"           content="{cfg['title']}">
    <meta name="twitter:description"     content="{cfg['desc']}">
    <meta name="twitter:image"           content="{abs_img}">
    <meta name="twitter:image:alt"       content="{cfg['img_alt']}">
    <!-- Pinterest -->
    <meta name="pinterest:description"   content="{cfg['desc']}">
    <meta name="pinterest:media"         content="{abs_img}">
"""

def inject_page(filename, cfg):
    if not os.path.exists(filename):
        print(f"  SKIP (not found): {filename}")
        return

    with open(filename, 'r', encoding='utf-8', errors='replace') as f:
        html = f.read()

    # 1. Strip existing partial tags (single-line)
    for pat in STRIP_PATTERNS:
        html = re.sub(pat, '', html, flags=re.IGNORECASE | re.DOTALL)

    # 2. Collapse multiple blank lines left by stripping
    html = re.sub(r'\n(\s*\n){2,}', '\n\n', html)

    # 3. Build the new OG block
    og_block = build_og_block(cfg)

    # 4. Insert after <meta name="description" ...> or after <title>...</title>
    inserted = False
    for anchor_pat in [
        r'(<meta\s+name=["\']description["\'][^>]*/?>)',
        r'(</title>)',
        r'(<meta\s+charset[^>]*/?>)',
    ]:
        m = re.search(anchor_pat, html, re.IGNORECASE)
        if m:
            pos = m.end()
            html = html[:pos] + og_block + html[pos:]
            inserted = True
            break

    if not inserted:
        # Fallback: insert right after <head>
        html = re.sub(r'(<head[^>]*>)', r'\1' + og_block, html, flags=re.IGNORECASE)

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(html)

    print(f"  UPDATED: {filename}")

# ── Main ───────────────────────────────────────────────────────────────────────
if __name__ == '__main__':
    print("Injecting social rich preview tags...\n")
    for page, cfg in PAGES.items():
        inject_page(page, cfg)
    print("\nDone! All pages updated.")
