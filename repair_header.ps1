# repair_header.ps1
# Repairs the corrupted header section in index.html by finding stable anchors
# and replacing the garbage between them with correct HTML.

$file = "C:\Users\user\.gemini\antigravity\scratch\Kedi health - Copy\index.html"
$content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

Write-Host "File length: $($content.Length) chars"

# ── Anchor 1: end of the top-bar (currency switcher close) ────────────────────
# Stable string unique to the top bar's closing sequence
$anchor1Str = 'data-currency-set="PI">&#960; Pi</a>'
$a1idx = $content.IndexOf($anchor1Str)
if ($a1idx -lt 0) { Write-Error "ANCHOR_1 not found!"; exit 1 }

# Walk forward past closing tags:  </li></ul></li></ul></div></li></ul></div></div></div>
# We'll find the next occurrence of </div> three times after the currency closer
# Just search for the known end-of-topbar marker:
$topbarEnd = '</div>' + "`r`n" + '            <div class="container mxw_1360">'
$a1End = $content.IndexOf($topbarEnd, $a1idx)
if ($a1End -lt 0) {
    # try without \r
    $topbarEnd = '</div>' + "`n" + '            <div class="container mxw_1360">'
    $a1End = $content.IndexOf($topbarEnd, $a1idx)
}
if ($a1End -lt 0) {
    # Fall back: find the position after all the closing div cluster
    # We know the structure ends with: </div>\n            </div>\n        </div>\n    </div>
    # Let's try a different unique end
    $topbarEnd2 = 'class="header__top-info'
    $topbarStart = $content.IndexOf($topbarEnd2)
    Write-Host "header__top-info found at $topbarStart"
}
Write-Host "topbarEnd pattern search result: $a1End"

# ── Simpler approach: find the boundary line by line ─────────────────────────
$lines = $content -split "`n"
Write-Host "Total lines: $($lines.Count)"

$startLine = -1
$endLine = -1

for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match 'data-currency-set="PI"') {
        Write-Host "Found PI currency at line $i"
        # Now find the next closing sequence - look for end of the header__top block
        for ($j = $i; $j -lt [Math]::Min($i+30, $lines.Count); $j++) {
            if ($lines[$j] -match '^\s*</div>\s*$') {
                # Check if it looks like the end of the container
                if ($j+1 -lt $lines.Count -and $lines[$j+1] -match '^\s*</div>\s*$') {
                    if ($j+2 -lt $lines.Count -and $lines[$j+2] -match '^\s*</div>\s*$') {
                        $startLine = $j + 2  # the last </div> of the top bar block
                        Write-Host "Found topbar end at line $startLine"
                        break
                    }
                }
            }
        }
        break
    }
}

for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match 'header__wrap.*data-uk-sticky') {
        $endLine = $i
        Write-Host "Found header__wrap at line $endLine"
        break
    }
}

if ($startLine -lt 0 -or $endLine -lt 0) {
    Write-Error "Could not find anchors. startLine=$startLine endLine=$endLine"
    
    # Debug: print lines around the PI entry
    for ($i = 0; $i -lt $lines.Count; $i++) {
        if ($lines[$i] -match 'data-currency-set="PI"') {
            Write-Host "=== Context around PI (lines $($i-2) to $($i+20)):"
            for ($j = [Math]::Max(0,$i-2); $j -lt [Math]::Min($lines.Count,$i+25); $j++) {
                Write-Host "$j`: $($lines[$j])"
            }
            break
        }
    }
    exit 1
}

Write-Host "Will replace lines $($startLine+1) through $($endLine-1) with the carousel middle"

# ── Build the replacement HTML ────────────────────────────────────────────────
$middle = @"
            </div>
            <div class="container mxw_1360">
                <div class="header__middle ul_li_between">
                    <div class="header__logo">
                        <a href="index.html">
                            <img src="assets/img/logo/logo.svg" alt="Kedi Healthcare">
                        </a>
                    </div>
                    <div class="header-date">
                        <i class="far fa-calendar-alt"></i><span id="header-live-date">Loading...</span>
                        <script>
                            (function(){
                                var d = new Date();
                                var opts = { weekday:'long', year:'numeric', month:'short', day:'numeric' };
                                var el = document.getElementById('header-live-date');
                                if(el) el.textContent = d.toLocaleDateString('en-US', opts);
                            })();
                        </script>
                    </div>
                    <!-- Header Ad Carousel -->
                    <div class="header-ad-carousel" id="headerAdCarousel">
                        <div class="hac-track" id="hacTrack">
                            <div class="hac-slide">
                                <a href="shop-single.html?id=p1" class="hac-link">
                                    <div class="hac-img-wrap"><img src="assets/img/product/massage chair.jpeg" alt="VIP Massage Chair"></div>
                                    <div class="hac-info">
                                        <span class="hac-badge">Clinical Hub</span>
                                        <p class="hac-name">VIP Massage Chair</p>
                                        <p class="hac-price">&#8358;<span data-base-price="1200000">1,200,000</span></p>
                                    </div>
                                </a>
                            </div>
                            <div class="hac-slide">
                                <a href="shop-single.html?id=p2" class="hac-link">
                                    <div class="hac-img-wrap"><img src="assets/img/product/refresh tea.jpeg" alt="Refresh Tea"></div>
                                    <div class="hac-info">
                                        <span class="hac-badge">Wellness</span>
                                        <p class="hac-name">Refresh Tea</p>
                                        <p class="hac-price">&#8358;<span data-base-price="18500">18,500</span></p>
                                    </div>
                                </a>
                            </div>
                            <div class="hac-slide">
                                <a href="shop-single.html?id=p3" class="hac-link">
                                    <div class="hac-img-wrap"><img src="assets/img/product/colon tea.jpeg" alt="Colon Tea"></div>
                                    <div class="hac-info">
                                        <span class="hac-badge">Detox</span>
                                        <p class="hac-name">Colon Tea</p>
                                        <p class="hac-price">&#8358;<span data-base-price="16500">16,500</span></p>
                                    </div>
                                </a>
                            </div>
                            <div class="hac-slide">
                                <a href="shop-single.html?id=p4" class="hac-link">
                                    <div class="hac-img-wrap"><img src="assets/img/product/gumcare toothpaste.jpeg" alt="Gumcare Toothpaste"></div>
                                    <div class="hac-info">
                                        <span class="hac-badge">Oral Care</span>
                                        <p class="hac-name">Gumcare Toothpaste</p>
                                        <p class="hac-price">&#8358;<span data-base-price="9500">9,500</span></p>
                                    </div>
                                </a>
                            </div>
                            <div class="hac-slide">
                                <a href="shop-single.html?id=p5" class="hac-link">
                                    <div class="hac-img-wrap"><img src="assets/img/product/7 layer sanitary pad.jpeg" alt="7-Layer Sanitary Pad"></div>
                                    <div class="hac-info">
                                        <span class="hac-badge">Women's Health</span>
                                        <p class="hac-name">7-Layer Sanitary Pad</p>
                                        <p class="hac-price">&#8358;<span data-base-price="7500">7,500</span></p>
                                    </div>
                                </a>
                            </div>
                            <div class="hac-slide">
                                <a href="shop-single.html?id=p6" class="hac-link">
                                    <div class="hac-img-wrap"><img src="assets/img/product/reishi capsule.jpeg" alt="Reishi Capsule"></div>
                                    <div class="hac-info">
                                        <span class="hac-badge">Immunity</span>
                                        <p class="hac-name">Reishi Capsule</p>
                                        <p class="hac-price">&#8358;<span data-base-price="22000">22,000</span></p>
                                    </div>
                                </a>
                            </div>
                            <div class="hac-slide">
                                <a href="shop-single.html?id=p7" class="hac-link">
                                    <div class="hac-img-wrap"><img src="assets/img/product/ultramega.jpeg" alt="Ultramega"></div>
                                    <div class="hac-info">
                                        <span class="hac-badge">Vitality</span>
                                        <p class="hac-name">Ultramega</p>
                                        <p class="hac-price">&#8358;<span data-base-price="31000">31,000</span></p>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="hac-dots" id="hacDots"></div>
                    </div>
                    <style>
                        .header-ad-carousel{position:relative;width:300px;min-width:220px;height:90px;overflow:hidden;border-radius:12px;background:linear-gradient(135deg,rgba(16,185,129,.08),rgba(255,255,255,.95));border:1.5px solid rgba(16,185,129,.25);box-shadow:0 4px 20px rgba(16,185,129,.12),0 1px 4px rgba(0,0,0,.06);}
                        .hac-track{display:flex;flex-direction:column;transition:transform .55s cubic-bezier(.4,0,.2,1);}
                        .hac-slide{width:300px;min-width:300px;height:90px;flex-shrink:0;}
                        .hac-link{display:flex;align-items:center;gap:12px;padding:10px 14px;text-decoration:none;height:100%;box-sizing:border-box;}
                        .hac-img-wrap{width:60px;height:60px;border-radius:10px;overflow:hidden;flex-shrink:0;background:#f0fdf4;display:flex;align-items:center;justify-content:center;border:1px solid rgba(16,185,129,.2);}
                        .hac-img-wrap img{width:100%;height:100%;object-fit:cover;}
                        .hac-info{display:flex;flex-direction:column;gap:2px;flex:1;min-width:0;}
                        .hac-badge{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#10b981;background:rgba(16,185,129,.1);border-radius:4px;padding:2px 6px;display:inline-block;width:fit-content;}
                        .hac-name{font-size:13px;font-weight:700;color:#0f172a;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
                        .hac-price{font-size:12px;font-weight:600;color:#10b981;margin:0;}
                        .hac-dots{position:absolute;bottom:5px;right:8px;display:flex;gap:4px;}
                        .hac-dot{width:5px;height:5px;border-radius:50%;background:rgba(16,185,129,.3);transition:background .3s,transform .3s;cursor:pointer;}
                        .hac-dot.active{background:#10b981;transform:scale(1.3);}
                        @media(max-width:991px){.header-ad-carousel{display:none;}}
                    </style>
                    <script>
                        (function(){
                            var slides=document.querySelectorAll('#hacTrack .hac-slide');
                            var track=document.getElementById('hacTrack');
                            var dotsC=document.getElementById('hacDots');
                            var current=0,total=slides.length,timer=null,slideH=90;
                            for(var i=0;i<total;i++){
                                var dot=document.createElement('span');
                                dot.className='hac-dot'+(i===0?' active':'');
                                dot.setAttribute('data-idx',i);
                                dot.addEventListener('click',(function(idx){return function(){goTo(idx);resetTimer();};})(i));
                                dotsC.appendChild(dot);
                            }
                            function goTo(idx){
                                current=(idx+total)%total;
                                track.style.transform='translateY(-'+(current*slideH)+'px)';
                                dotsC.querySelectorAll('.hac-dot').forEach(function(d,i){d.classList.toggle('active',i===current);});
                            }
                            function next(){goTo(current+1);}
                            function resetTimer(){clearInterval(timer);timer=setInterval(next,3500);}
                            var car=document.getElementById('headerAdCarousel');
                            car.addEventListener('mouseenter',function(){clearInterval(timer);});
                            car.addEventListener('mouseleave',resetTimer);
                            resetTimer();
                        })();
                    </script>
                    <div class="d-none d-lg-block">
                        <div class="ul_li">
                            <div class="header__language style-2 mr-25">
                                <ul>
                                    <li>
                                        <a href="#!" class="lang-btn"><img src="assets/img/icon/usd_flag.png" alt=""> English <i class="far fa-chevron-down"></i></a>
                                        <ul class="lang_sub_list">
                                            <li><a href="#">English</a></li>
                                            <li><a href="#">Yoruba</a></li>
                                            <li><a href="#">Hausa</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <div class="header__social">
                                <a href="#!"><i class="fab fa-facebook-f"></i></a>
                                <a href="#!"><i class="fab fa-twitter"></i></a>
                                <a href="#!"><i class="fab fa-instagram"></i></a>
                                <a href="#!"><i class="fab fa-youtube"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
"@

# ── Reconstruct the file ──────────────────────────────────────────────────────
$before = ($lines[0..$startLine]) -join "`n"
$after  = ($lines[$endLine..($lines.Count-1)]) -join "`n"
$newContent = $before + "`n" + $middle + "`n" + $after

[System.IO.File]::WriteAllText($file, $newContent, [System.Text.Encoding]::UTF8)

Write-Host "`nSUCCESS: File written ($($newContent.Length) chars)"
Write-Host "header__middle present: $($newContent.Contains('header__middle'))"
Write-Host "hacTrack carousel present: $($newContent.Contains('hacTrack'))"
Write-Host "header__wrap present: $($newContent.Contains('header__wrap'))"
Write-Host "header-live-date present: $($newContent.Contains('header-live-date'))"
