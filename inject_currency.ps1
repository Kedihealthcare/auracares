$content = Get-Content "home-3.html" -Raw -Encoding UTF8

# Regex to find <span ...>&#8358;10,000</span>
$pattern = '(?i)<span([^>]*)>&#8358;([0-9,]+)</span>'

$evaluator = [System.Text.RegularExpressions.MatchEvaluator] {
    param([System.Text.RegularExpressions.Match]$match)
    
    $attrs = $match.Groups[1].Value
    $priceStr = $match.Groups[2].Value
    
    if ($attrs -match 'data-base-price') {
        return $match.Value
    }
    
    $priceVal = $priceStr -replace ',', ''
    return "<span$attrs data-base-price=`"$priceVal`">&#8358;$priceStr</span>"
}

$newContent = [System.Text.RegularExpressions.Regex]::Replace($content, $pattern, $evaluator)

# Replace the old currency switcher in the header with the new one
$oldSwitcher = '<div class="header__language currency">
                                    <ul>
                                        <li><a href="#!" class="lang-btn"><img src="assets/img/icon/usd_icon.svg" alt="">Ã â‚¬ <i class="far fa-chevron-down"></i></a>
                                            <ul class="lang_sub_list">
                                                <li><a href="#">Ã â‚¬</a></li>
                                                <li><a href="#">BTC</a></li> 
                                                <li><a href="#">USDT</a></li> 
                                            </ul>
                                        </li>
                                    </ul>
                                </div>'

$newSwitcher = '<div class="hidden md:flex items-center space-x-2 bg-slate-900/5 p-1 rounded-full border border-slate-200">
                                    <button data-currency-set="NGN" class="currency-switch-btn w-6 h-6 rounded-full text-[9px] font-bold flex items-center justify-center hover:bg-white hover:shadow-sm">&#8358;</button>
                                    <button data-currency-set="USD" class="currency-switch-btn w-6 h-6 rounded-full text-[9px] font-bold flex items-center justify-center hover:bg-white hover:shadow-sm">$</button>
                                    <button data-currency-set="PI" class="currency-switch-btn w-6 h-6 rounded-full text-[9px] font-bold flex items-center justify-center hover:bg-white hover:shadow-sm">Ï€</button>
                                </div>'

if ($newContent.Contains($oldSwitcher)) {
    $newContent = $newContent.Replace($oldSwitcher, $newSwitcher)
    Write-Host "Replaced old currency switcher."
}

Set-Content "home-3.html" -Value $newContent -Encoding UTF8
Write-Host "Injected data-base-price into home-3.html"
