$content = Get-Content "home-3.html" -Raw

# In the desktop menu
$content = $content -replace '<li><a href="checkout\.html">Shop Cart</a></li>\s*<li><a href="checkout\.html">Shop Checkout</a></li>\s*<li><a href="account\.html">Account</a></li>', '<li><a href="checkout.html">Checkout</a></li>
                                            <li><a href="account.html">Account / Logout</a></li>'

# In the mobile menu
$content = $content -replace '<li><a href="checkout\.html" class="add-to-cart-btn">Shop Cart</a></li>\s*<li><a href="checkout\.html" class="add-to-cart-btn">Shop Checkout</a></li>\s*<li><a href="account\.html" class="login-sign-btn">Account</a></li>', '<li><a href="checkout.html" class="add-to-cart-btn">Checkout</a></li>
                            <li><a href="account.html" class="login-sign-btn">Account / Logout</a></li>'

# In the cart sidebar
$oldCartBtns = '<li><a href="checkout.html" class="add-to-cart-btn" class="thm-btn">
                            <span class="btn-wrap">
                                <span>View Cart</span>
                                <span>View Cart</span>
                            </span>
                        </a></li>
                    <li><a href="checkout.html" class="add-to-cart-btn" class="thm-btn thm-btn__black">
                            <span class="btn-wrap">
                                <span>Checkout</span>
                                <span>Checkout</span>
                            </span>
                        </a></li>'

$newCartBtns = '<li><a href="checkout.html" class="add-to-cart-btn" class="thm-btn thm-btn__black" style="width:100%">
                            <span class="btn-wrap">
                                <span>Checkout</span>
                                <span>Checkout</span>
                            </span>
                        </a></li>'

$content = $content.Replace($oldCartBtns, $newCartBtns)

Set-Content -Path "home-3.html" -Value $content -Encoding UTF8
Write-Output "Fixed home-3.html redundancy"
