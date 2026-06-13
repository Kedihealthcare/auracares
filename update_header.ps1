$header = Get-Content "correct_header.txt" -Raw
$content = Get-Content "home-3.html" -Raw

$content = $content -replace '(?s)<!-- header start -->.*?<!-- header end -->', $header.Trim()

Set-Content -Path "home-3.html" -Value $content -Encoding UTF8
Write-Output "Replaced header in home-3.html"
