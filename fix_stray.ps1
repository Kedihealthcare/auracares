$path = "c:\Users\user\Desktop\kedi\Kedi health\index.html"
$content = Get-Content -Path $path
$newContent = $content[0..5681] + $content[5683..($content.Count-1)]
$newContent | Set-Content -Path $path -Encoding UTF8
Write-Output "Fixed"
