# inject_og_tags.ps1
# Batch-injects complete OG + Twitter Card meta tags into all Aura Herbs HTML pages.

$BASE_URL  = "https://auraherbs.ai"
$SITE_NAME = "Aura Herbs"
$TW_HANDLE = "@auraherbs"

$pages = @(
  [PSCustomObject]@{ file="index.html";                 ptype="website"; title="Aura Herbs - Clinical Treatment Portal";                       desc="Access verified medical-grade herbal treatment protocols. Scientifically optimised for maximum therapeutic efficacy by Aura Herbs Global.";                  img="assets/img/product/kedi.jpg";          alt="Aura Herbs Clinical Protocol Products" }
  [PSCustomObject]@{ file="about.html";                 ptype="website"; title="Our Clinical Mission - Aura Herbs";                            desc="Discover the mission behind Aura Herbs Clinical Global. Bridging ancient herbal wisdom with modern clinical science for lasting health results.";         img="assets/img/product/kedi.jpg";          alt="Aura Herbs Clinical Mission" }
  [PSCustomObject]@{ file="shop.html";                  ptype="website"; title="Clinical Protocols Catalog - Aura Herbs";                      desc="Browse our complete range of medical-grade herbal treatment protocols. Scientifically validated formulas for optimal health and longevity.";             img="assets/img/product/kedi_pro_list.jpg"; alt="Aura Herbs Product Catalog" }
  [PSCustomObject]@{ file="shop-left-sidebar.html";     ptype="website"; title="Browse Clinical Protocols - Aura Herbs";                       desc="Filter and explore our full catalog of clinical herbal treatment protocols. Find the right formula for your health goals.";                               img="assets/img/product/kedi_pro_list.jpg"; alt="Aura Herbs Protocol Catalog with Filters" }
  [PSCustomObject]@{ file="shop-single.html";           ptype="product"; title="Clinical Protocol - Aura Herbs";                               desc="Detailed clinical information about our medical-grade herbal treatment protocol. Scientifically formulated for proven health outcomes.";                  img="assets/img/product/kedi.jpg";          alt="Aura Herbs Clinical Protocol" }
  [PSCustomObject]@{ file="blog.html";                  ptype="website"; title="Health Intelligence Blog - Aura Herbs";                        desc="Evidence-based articles on herbal medicine, clinical protocols and natural health optimisation from the Aura Herbs expert team.";                         img="assets/img/product/kedi.jpg";          alt="Aura Herbs Health Intelligence Blog" }
  [PSCustomObject]@{ file="blog-immune-system.html";    ptype="article"; title="Immune System Optimisation - Aura Herbs Blog";                 desc="Clinical insights on strengthening your immune system using evidence-based herbal protocols and scientifically validated natural interventions.";        img="assets/img/product/kedi.jpg";          alt="Immune System Clinical Protocol by Aura Herbs" }
  [PSCustomObject]@{ file="blog-male-vitality.html";    ptype="article"; title="Male Vitality Protocols - Aura Herbs Blog";                    desc="Evidence-based clinical approaches to male health optimisation using premium herbal formulations from Aura Herbs Global.";                               img="assets/img/product/kedi.jpg";          alt="Male Vitality Clinical Protocol by Aura Herbs" }
  [PSCustomObject]@{ file="blog-metabolic-health.html"; ptype="article"; title="Metabolic Health Protocols - Aura Herbs Blog";                 desc="Clinical strategies for metabolic optimisation using scientifically validated herbal interventions. Achieve lasting metabolic balance naturally.";      img="assets/img/product/kedi.jpg";          alt="Metabolic Health Protocol by Aura Herbs" }
  [PSCustomObject]@{ file="cart.html";                  ptype="website"; title="Your Cart - Aura Herbs";                                       desc="Review your selected clinical herbal protocols and proceed to secure checkout. Premium health solutions delivered worldwide.";                           img="assets/img/product/kedi.jpg";          alt="Aura Herbs Shopping Cart" }
  [PSCustomObject]@{ file="checkout.html";              ptype="website"; title="Secure Checkout - Aura Herbs";                                 desc="Complete your order securely. Premium clinical herbal protocols delivered worldwide with full after-purchase support from Aura Herbs.";                  img="assets/img/product/kedi.jpg";          alt="Aura Herbs Secure Checkout" }
  [PSCustomObject]@{ file="checkout-v2.html";           ptype="website"; title="Checkout - Aura Herbs";                                        desc="Complete your purchase of premium clinical herbal protocols from Aura Herbs. Secure payment and worldwide delivery guaranteed.";                         img="assets/img/product/kedi.jpg";          alt="Aura Herbs Checkout" }
  [PSCustomObject]@{ file="contact.html";               ptype="website"; title="Contact Our Clinical Team - Aura Herbs";                       desc="Get in touch with our clinical support team. We are here to guide your herbal health journey with expert advice and personalised care.";               img="assets/img/product/kedi.jpg";          alt="Aura Herbs Clinical Support Team" }
  [PSCustomObject]@{ file="franchise.html";             ptype="website"; title="Franchise Opportunity - Aura Herbs Clinical Healthcare";       desc="Join the Aura Herbs global franchise network. Partner with us to bring premium clinical herbal protocols to your community and build a health business."; img="assets/img/product/promo.jpg";         alt="Aura Herbs Franchise Business Opportunity" }
  [PSCustomObject]@{ file="quiz.html";                  ptype="website"; title="Personalised Health Assessment - Aura Herbs";                  desc="Take our personalised health assessment quiz to discover the right clinical herbal protocols for your unique health profile and wellness goals.";        img="assets/img/product/kedi.jpg";          alt="Aura Herbs Health Assessment Quiz" }
  [PSCustomObject]@{ file="health-challenges.html";     ptype="website"; title="Health Challenges and Clinical Solutions - Aura Herbs";        desc="Explore evidence-based herbal solutions for common health challenges. Over 40 conditions addressed with proven clinical protocols.";                       img="assets/img/product/kedi.jpg";          alt="Aura Herbs Health Challenge Solutions" }
  [PSCustomObject]@{ file="ai-doctor.html";             ptype="website"; title="AI Health Assistant - Aura Herbs";                             desc="Get personalised health guidance from our AI-powered clinical assistant. Evidence-based herbal recommendations tailored to your health profile.";         img="assets/img/product/kedi.jpg";          alt="Aura Herbs AI Health Assistant" }
  [PSCustomObject]@{ file="auth.html";                  ptype="website"; title="Sign In - Aura Herbs";                                         desc="Access your Aura Herbs account to manage your clinical protocols, order history, and personalised health recommendations.";                              img="assets/img/product/kedi.jpg";          alt="Aura Herbs Account Login" }
  [PSCustomObject]@{ file="account.html";               ptype="website"; title="My Account - Aura Herbs";                                      desc="Manage your Aura Herbs account, orders, and personalised clinical protocol recommendations all in one place.";                                          img="assets/img/product/kedi.jpg";          alt="Aura Herbs My Account Dashboard" }
  [PSCustomObject]@{ file="404.html";                   ptype="website"; title="Page Not Found - Aura Herbs";                                  desc="The page you are looking for does not exist. Explore our clinical treatment protocols and health intelligence resources instead.";                     img="assets/img/product/kedi.jpg";          alt="Aura Herbs Page Not Found" }
  [PSCustomObject]@{ file="roi-calculator.html";        ptype="website"; title="Franchise ROI Calculator - Aura Herbs";                        desc="Calculate the return on investment for your Aura Herbs clinical franchise opportunity. Discover the earning potential in your region.";                 img="assets/img/product/promo.jpg";         alt="Aura Herbs Franchise ROI Calculator" }
  [PSCustomObject]@{ file="news-single.html";           ptype="article"; title="Health Intelligence News - Aura Herbs";                        desc="Latest health intelligence, clinical updates, and herbal research news from the Aura Herbs expert research team.";                                      img="assets/img/product/kedi.jpg";          alt="Aura Herbs Health News" }
  [PSCustomObject]@{ file="notifications.html";         ptype="website"; title="Notifications - Aura Herbs";                                   desc="Stay updated with the latest news, protocol updates, and health insights from Aura Herbs Clinical Global.";                                            img="assets/img/product/kedi.jpg";          alt="Aura Herbs Notifications Centre" }
  [PSCustomObject]@{ file="email-centre.html";          ptype="website"; title="Email Centre - Aura Herbs";                                    desc="Manage your Aura Herbs email communications, health protocol newsletters, and clinical updates in one convenient place.";                             img="assets/img/product/kedi.jpg";          alt="Aura Herbs Email Centre" }
  [PSCustomObject]@{ file="kedi.html";                  ptype="website"; title="Kedi Healthcare Products - Aura Herbs";                        desc="Explore the complete Kedi Healthcare range available through Aura Herbs. Medical-grade natural formulas for whole-body health.";                        img="assets/img/product/kedi.jpg";          alt="Kedi Healthcare Products by Aura Herbs" }
  [PSCustomObject]@{ file="ad-showcase.html";           ptype="website"; title="Clinical Protocol Showcase - Aura Herbs";                      desc="Discover our featured clinical herbal protocols and their evidence-based benefits for your health and wellbeing.";                                       img="assets/img/product/promo.jpg";         alt="Aura Herbs Clinical Protocol Showcase" }
)

function Build-OgBlock {
  param($p)
  $absImg  = "$BASE_URL/$($p.img)"
  $pageUrl = "$BASE_URL/$($p.file)"
  $block   = "`r`n"
  $block  += "    <!-- ===== Social Rich Preview Meta Tags ===== -->`r`n"
  $block  += "    <!-- Open Graph: Facebook, WhatsApp, LinkedIn, Telegram, Discord, Slack, Pinterest -->`r`n"
  $block  += "    <meta property=`"og:type`"             content=`"$($p.ptype)`">`r`n"
  $block  += "    <meta property=`"og:site_name`"        content=`"$SITE_NAME`">`r`n"
  $block  += "    <meta property=`"og:locale`"           content=`"en_US`">`r`n"
  $block  += "    <meta property=`"og:url`"              content=`"$pageUrl`">`r`n"
  $block  += "    <meta property=`"og:title`"            content=`"$($p.title)`">`r`n"
  $block  += "    <meta property=`"og:description`"      content=`"$($p.desc)`">`r`n"
  $block  += "    <meta property=`"og:image`"            content=`"$absImg`">`r`n"
  $block  += "    <meta property=`"og:image:secure_url`" content=`"$absImg`">`r`n"
  $block  += "    <meta property=`"og:image:type`"       content=`"image/jpeg`">`r`n"
  $block  += "    <meta property=`"og:image:width`"      content=`"1200`">`r`n"
  $block  += "    <meta property=`"og:image:height`"     content=`"630`">`r`n"
  $block  += "    <meta property=`"og:image:alt`"        content=`"$($p.alt)`">`r`n"
  $block  += "    <!-- Twitter / X Card -->`r`n"
  $block  += "    <meta name=`"twitter:card`"            content=`"summary_large_image`">`r`n"
  $block  += "    <meta name=`"twitter:site`"            content=`"$TW_HANDLE`">`r`n"
  $block  += "    <meta name=`"twitter:creator`"         content=`"$TW_HANDLE`">`r`n"
  $block  += "    <meta name=`"twitter:title`"           content=`"$($p.title)`">`r`n"
  $block  += "    <meta name=`"twitter:description`"     content=`"$($p.desc)`">`r`n"
  $block  += "    <meta name=`"twitter:image`"           content=`"$absImg`">`r`n"
  $block  += "    <meta name=`"twitter:image:alt`"       content=`"$($p.alt)`">`r`n"
  $block  += "    <!-- Pinterest -->`r`n"
  $block  += "    <meta name=`"pinterest:description`"   content=`"$($p.desc)`">`r`n"
  $block  += "    <meta name=`"pinterest:media`"         content=`"$absImg`">`r`n"
  return $block
}

Write-Host "`nInjecting social rich preview tags into all pages...`n"
$updated = 0; $skipped = 0

foreach ($p in $pages) {
  if (-not (Test-Path $p.file)) { Write-Host "  SKIP (not found): $($p.file)"; $skipped++; continue }

  $html = [System.IO.File]::ReadAllText((Resolve-Path $p.file).Path, [System.Text.Encoding]::UTF8)

  # ── Strip existing OG / Twitter / Pinterest tags ──────────────────────────
  $opts = [System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor [System.Text.RegularExpressions.RegexOptions]::Singleline
  $html = [regex]::Replace($html, '<meta\s+property="og:[^"]*"[^>]*/?\s*>', '',   $opts)
  $html = [regex]::Replace($html, "<meta\s+property='og:[^']*'[^>]*/?\s*>", '',   $opts)
  $html = [regex]::Replace($html, '<meta\s+name="twitter:[^"]*"[^>]*/?\s*>', '',  $opts)
  $html = [regex]::Replace($html, "<meta\s+name='twitter:[^']*'[^>]*/?\s*>", '',  $opts)
  $html = [regex]::Replace($html, '<meta\s+name="pinterest[^"]*"[^>]*/?\s*>', '', $opts)
  $html = [regex]::Replace($html, '<!--\s*={3,}\s*Social Rich Preview.*?-->', '',  $opts)
  $html = [regex]::Replace($html, '<!--\s*Social Metadata.*?-->', '',              $opts)
  $html = [regex]::Replace($html, '<!--\s*Open Graph.*?-->', '',                   $opts)
  $html = [regex]::Replace($html, '<!--\s*Twitter\s*/\s*X\s*Card.*?-->', '',       $opts)
  $html = [regex]::Replace($html, '<!--\s*Pinterest.*?-->', '',                    $opts)
  $html = [regex]::Replace($html, '<!--\s*WhatsApp.*?-->', '',                     $opts)
  # Collapse triple+ blank lines
  $html = [regex]::Replace($html, '(\r?\n[\t ]*){3,}', "`r`n`r`n")

  # ── Build and insert new OG block ─────────────────────────────────────────
  $ogBlock  = Build-OgBlock $p
  $inserted = $false
  $anchors  = @(
    '(?i)(<meta\s+name=[''"]description[''"][^>]*/?\s*>)',
    '(?i)(</title>)',
    '(?i)(<meta\s+charset[^>]*/?\s*>)',
    '(?i)(<head[^>]*>)'
  )
  foreach ($anchor in $anchors) {
    $m = [regex]::Match($html, $anchor)
    if ($m.Success) {
      $pos  = $m.Index + $m.Length
      $html = $html.Substring(0,$pos) + $ogBlock + $html.Substring($pos)
      $inserted = $true
      break
    }
  }

  if (-not $inserted) { Write-Host "  WARNING: No anchor in $($p.file) – skipped"; $skipped++; continue }

  [System.IO.File]::WriteAllText((Resolve-Path $p.file).Path, $html, [System.Text.Encoding]::UTF8)
  Write-Host "  UPDATED: $($p.file)"
  $updated++
}

Write-Host "`nDone! $updated pages updated, $skipped skipped."
