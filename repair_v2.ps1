# repair_v2.ps1 - Precise line-number based header reconstruction

$file = "C:\Users\user\.gemini\antigravity\scratch\Kedi health - Copy\index.html"
$lines = [System.IO.File]::ReadAllLines($file, [System.Text.Encoding]::UTF8)

Write-Host "Total lines: $($lines.Count)"

# Verify anchors
Write-Host "Line 450: $($lines[449])"   # PI currency (0-indexed = 449)
Write-Host "Line 454: $($lines[453])"   # </div> closing currency switcher
Write-Host "Line 455: $($lines[454])"   # header__category (orphaned)
Write-Host "Line 572: $($lines[571])"   # </header>

# We split the file into 3 parts:
# PART A: lines 1..454  (0-indexed: 0..453)  -- top bar through currency switcher close
# [INSERT_1]: closing tags for top-bar li/ul/div/div/div
# [INSERT_2]: header__middle with carousel
# [INSERT_3]: header__wrap + container + header__main + header__logo opening
# PART B: lines 455..572  (0-indexed: 454..571) -- nav content (already correct inside)
# PART C: lines 573..end (0-indexed: 572..end) -- rest of page

$partA = $lines[0..453]
$partB = $lines[454..571]
$partC = $lines[572..($lines.Count-1)]

$insert1 = @(
    '                            </li>',
    '                        </ul>',
    '                    </div>',
    '                </div>',
    '            </div>'
)

$insert2 = @(
    '            <div class="container mxw_1360">',
    '                <div class="header__middle ul_li_between">',
    '                    <div class="header__logo">',
    '                        <a href="index.html">',
    '                            <img src="assets/img/logo/logo.svg" alt="Kedi Healthcare">',
    '                        </a>',
    '                    </div>',
    '                    <div class="header-date">',
    '                        <i class="far fa-calendar-alt"></i><span id="header-live-date">Loading...</span>',
    '                        <script>',
    '                            (function(){',
    '                                var d = new Date();',
    '                                var opts = { weekday:"long", year:"numeric", month:"short", day:"numeric" };',
    '                                var el = document.getElementById("header-live-date");',
    '                                if(el) el.textContent = d.toLocaleDateString("en-US", opts);',
    '                            })();',
    '                        </script>',
    '                    </div>',
    '                    <!-- Header Ad Carousel -->',
    '                    <div class="header-ad-carousel" id="headerAdCarousel">',
    '                        <div class="hac-track" id="hacTrack">',
    '                            <div class="hac-slide">',
    '                                <a href="shop-single.html?id=p1" class="hac-link">',
    '                                    <div class="hac-img-wrap"><img src="assets/img/product/massage chair.jpeg" alt="VIP Massage Chair"></div>',
    '                                    <div class="hac-info">',
    '                                        <span class="hac-badge">Clinical Hub</span>',
    '                                        <p class="hac-name">VIP Massage Chair</p>',
    '                                        <p class="hac-price">&#8358;<span data-base-price="1200000">1,200,000</span></p>',
    '                                    </div>',
    '                                </a>',
    '                            </div>',
    '                            <div class="hac-slide">',
    '                                <a href="shop-single.html?id=p2" class="hac-link">',
    '                                    <div class="hac-img-wrap"><img src="assets/img/product/refresh tea.jpeg" alt="Refresh Tea"></div>',
    '                                    <div class="hac-info">',
    '                                        <span class="hac-badge">Wellness</span>',
    '                                        <p class="hac-name">Refresh Tea</p>',
    '                                        <p class="hac-price">&#8358;<span data-base-price="18500">18,500</span></p>',
    '                                    </div>',
    '                                </a>',
    '                            </div>',
    '                            <div class="hac-slide">',
    '                                <a href="shop-single.html?id=p3" class="hac-link">',
    '                                    <div class="hac-img-wrap"><img src="assets/img/product/colon tea.jpeg" alt="Colon Tea"></div>',
    '                                    <div class="hac-info">',
    '                                        <span class="hac-badge">Detox</span>',
    '                                        <p class="hac-name">Colon Tea</p>',
    '                                        <p class="hac-price">&#8358;<span data-base-price="16500">16,500</span></p>',
    '                                    </div>',
    '                                </a>',
    '                            </div>',
    '                            <div class="hac-slide">',
    '                                <a href="shop-single.html?id=p4" class="hac-link">',
    '                                    <div class="hac-img-wrap"><img src="assets/img/product/gumcare toothpaste.jpeg" alt="Gumcare Toothpaste"></div>',
    '                                    <div class="hac-info">',
    '                                        <span class="hac-badge">Oral Care</span>',
    '                                        <p class="hac-name">Gumcare Toothpaste</p>',
    '                                        <p class="hac-price">&#8358;<span data-base-price="9500">9,500</span></p>',
    '                                    </div>',
    '                                </a>',
    '                            </div>',
    '                            <div class="hac-slide">',
    '                                <a href="shop-single.html?id=p5" class="hac-link">',
    '                                    <div class="hac-img-wrap"><img src="assets/img/product/7 layer sanitary pad.jpeg" alt="7-Layer Sanitary Pad"></div>',
    '                                    <div class="hac-info">',
    '                                        <span class="hac-badge">Women&apos;s Health</span>',
    '                                        <p class="hac-name">7-Layer Sanitary Pad</p>',
    '                                        <p class="hac-price">&#8358;<span data-base-price="7500">7,500</span></p>',
    '                                    </div>',
    '                                </a>',
    '                            </div>',
    '                            <div class="hac-slide">',
    '                                <a href="shop-single.html?id=p6" class="hac-link">',
    '                                    <div class="hac-img-wrap"><img src="assets/img/product/reishi capsule.jpeg" alt="Reishi Capsule"></div>',
    '                                    <div class="hac-info">',
    '                                        <span class="hac-badge">Immunity</span>',
    '                                        <p class="hac-name">Reishi Capsule</p>',
    '                                        <p class="hac-price">&#8358;<span data-base-price="22000">22,000</span></p>',
    '                                    </div>',
    '                                </a>',
    '                            </div>',
    '                            <div class="hac-slide">',
    '                                <a href="shop-single.html?id=p7" class="hac-link">',
    '                                    <div class="hac-img-wrap"><img src="assets/img/product/ultramega.jpeg" alt="Ultramega"></div>',
    '                                    <div class="hac-info">',
    '                                        <span class="hac-badge">Vitality</span>',
    '                                        <p class="hac-name">Ultramega</p>',
    '                                        <p class="hac-price">&#8358;<span data-base-price="31000">31,000</span></p>',
    '                                    </div>',
    '                                </a>',
    '                            </div>',
    '                        </div>',
    '                        <div class="hac-dots" id="hacDots"></div>',
    '                    </div>',
    '                    <style>',
    '                        .header-ad-carousel{position:relative;width:300px;min-width:220px;height:90px;overflow:hidden;border-radius:12px;background:linear-gradient(135deg,rgba(16,185,129,.08),rgba(255,255,255,.95));border:1.5px solid rgba(16,185,129,.25);box-shadow:0 4px 20px rgba(16,185,129,.12),0 1px 4px rgba(0,0,0,.06);}',
    '                        .hac-track{display:flex;flex-direction:column;transition:transform .55s cubic-bezier(.4,0,.2,1);}',
    '                        .hac-slide{width:300px;min-width:300px;height:90px;flex-shrink:0;}',
    '                        .hac-link{display:flex;align-items:center;gap:12px;padding:10px 14px;text-decoration:none;height:100%;box-sizing:border-box;}',
    '                        .hac-img-wrap{width:60px;height:60px;border-radius:10px;overflow:hidden;flex-shrink:0;background:#f0fdf4;display:flex;align-items:center;justify-content:center;border:1px solid rgba(16,185,129,.2);}',
    '                        .hac-img-wrap img{width:100%;height:100%;object-fit:cover;}',
    '                        .hac-info{display:flex;flex-direction:column;gap:2px;flex:1;min-width:0;}',
    '                        .hac-badge{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#10b981;background:rgba(16,185,129,.1);border-radius:4px;padding:2px 6px;display:inline-block;width:fit-content;}',
    '                        .hac-name{font-size:13px;font-weight:700;color:#0f172a;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
    '                        .hac-price{font-size:12px;font-weight:600;color:#10b981;margin:0;}',
    '                        .hac-dots{position:absolute;bottom:5px;right:8px;display:flex;gap:4px;}',
    '                        .hac-dot{width:5px;height:5px;border-radius:50%;background:rgba(16,185,129,.3);transition:background .3s,transform .3s;cursor:pointer;}',
    '                        .hac-dot.active{background:#10b981;transform:scale(1.3);}',
    '                        @media(max-width:991px){.header-ad-carousel{display:none;}}',
    '                    </style>',
    '                    <script>',
    '                        (function(){',
    '                            var slides=document.querySelectorAll("#hacTrack .hac-slide");',
    '                            var track=document.getElementById("hacTrack");',
    '                            var dotsC=document.getElementById("hacDots");',
    '                            var current=0,total=slides.length,timer=null,slideH=90;',
    '                            for(var i=0;i<total;i++){',
    '                                var dot=document.createElement("span");',
    '                                dot.className="hac-dot"+(i===0?" active":"");',
    '                                dot.setAttribute("data-idx",i);',
    '                                dot.addEventListener("click",(function(idx){return function(){goTo(idx);resetTimer();};})(i));',
    '                                dotsC.appendChild(dot);',
    '                            }',
    '                            function goTo(idx){',
    '                                current=(idx+total)%total;',
    '                                track.style.transform="translateY(-"+(current*slideH)+"px)";',
    '                                dotsC.querySelectorAll(".hac-dot").forEach(function(d,i){d.classList.toggle("active",i===current);});',
    '                            }',
    '                            function next(){goTo(current+1);}',
    '                            function resetTimer(){clearInterval(timer);timer=setInterval(next,3500);}',
    '                            var car=document.getElementById("headerAdCarousel");',
    '                            car.addEventListener("mouseenter",function(){clearInterval(timer);});',
    '                            car.addEventListener("mouseleave",resetTimer);',
    '                            resetTimer();',
    '                        })();',
    '                    </script>',
    '                    <div class="d-none d-lg-block">',
    '                        <div class="ul_li">',
    '                            <div class="header__language style-2 mr-25">',
    '                                <ul>',
    '                                    <li>',
    '                                        <a href="#!" class="lang-btn"><img src="assets/img/icon/usd_flag.png" alt=""> English <i class="far fa-chevron-down"></i></a>',
    '                                        <ul class="lang_sub_list">',
    '                                            <li><a href="#">English</a></li>',
    '                                            <li><a href="#">Yoruba</a></li>',
    '                                            <li><a href="#">Hausa</a></li>',
    '                                        </ul>',
    '                                    </li>',
    '                                </ul>',
    '                            </div>',
    '                            <div class="header__social">',
    '                                <a href="#!"><i class="fab fa-facebook-f"></i></a>',
    '                                <a href="#!"><i class="fab fa-twitter"></i></a>',
    '                                <a href="#!"><i class="fab fa-instagram"></i></a>',
    '                                <a href="#!"><i class="fab fa-youtube"></i></a>',
    '                            </div>',
    '                        </div>',
    '                    </div>',
    '                </div>',
    '            </div>'
)

$insert3 = @(
    '            <div class="header__wrap" data-uk-sticky="top: 250; animation: uk-animation-slide-top;">',
    '                <div class="container mxw_1360">',
    '                    <div class="header__main ul_li">',
    '                        <div class="header__logo">',
    '                            <a href="index.html">',
    '                                <img src="assets/img/logo/logo.svg" alt="Kedi Healthcare">',
    '                            </a>',
    '                        </div>'
)

$newLines = $partA + $insert1 + $insert2 + $insert3 + $partB + $partC

[System.IO.File]::WriteAllLines($file, $newLines, [System.Text.Encoding]::UTF8)

Write-Host ""
Write-Host "=== SUCCESS ==="
Write-Host "Total lines written: $($newLines.Count)"

# Verify
$verify = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)
Write-Host "header__middle present: $($verify.Contains('header__middle'))"
Write-Host "hacTrack present:       $($verify.Contains('hacTrack'))"
Write-Host "header__wrap present:   $($verify.Contains('header__wrap'))"
Write-Host "header-live-date:       $($verify.Contains('header-live-date'))"
Write-Host "header-ad-carousel:     $($verify.Contains('header-ad-carousel'))"
Write-Host "data-base-price:        $($verify.Contains('data-base-price'))"
