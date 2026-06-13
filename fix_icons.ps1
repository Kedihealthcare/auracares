$content = Get-Content "home-3.html" -Raw

# Replace cart.html with checkout.html globally
$content = $content -replace '"cart\.html"', '"checkout.html"'

# Fix the header__icons block
$oldIcons = '<div class="header__icons ul_li mr-15">
                                <div class="icon">
                                    <a href="#!"><img src="assets/img/icon/user.svg" alt=""></a>
                                </div>
                                <div class="icon wishlist-icon">
                                    <a href="#!">
                                        <img src="assets/img/icon/heart.svg" alt="">
                                        <span class="count">0</span>
                                    </a>
                                </div>
                                <div class="icon">
                                    <a href="#!">
                                        <img src="assets/img/icon/bookmark.svg" alt="">
                                        <span class="count">0</span>
                                    </a>
                                </div>
                            </div>'

$newIcons = '<div class="header__icons ul_li mr-15">
                                <div class="icon">
                                    <a href="checkout.html" class="add-to-cart-btn">
                                        <img src="assets/img/icon/shopping_bag.svg" alt="">
                                        <span class="count">0</span>
                                    </a>
                                </div>
                                <div class="icon wishlist-icon">
                                    <a href="#!">
                                        <img src="assets/img/icon/heart.svg" alt="">
                                        <span class="count">0</span>
                                    </a>
                                </div>
                                <div class="icon">
                                    <a href="account.html" class="login-sign-btn">
                                        <img src="assets/img/icon/user.svg" alt="">
                                    </a>
                                </div>
                            </div>'

# Note: We use string replace for exact block to avoid regex special chars issues
$content = $content.Replace($oldIcons, $newIcons)

Set-Content -Path "home-3.html" -Value $content -Encoding UTF8
Write-Output "Updated icons and cart.html references."
