Add-Type -AssemblyName System.Drawing

$photosDir = "C:\Users\Aravind\Desktop\git\bc-websites\boutiques\4-shaaridesignerhouse\photos"
$vastraPhotos = "C:\Users\Aravind\Desktop\git\bc-websites\boutiques\2-vastravinyasaki\photos"

function CropImage($srcPath, $dstPath, $cropX, $cropY, $cropW, $cropH) {
    $src = [System.Drawing.Image]::FromFile($srcPath)
    $dst = New-Object System.Drawing.Bitmap($cropW, $cropH)
    $g = [System.Drawing.Graphics]::FromImage($dst)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    
    $srcRect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
    $dstRect = New-Object System.Drawing.Rectangle(0, 0, $cropW, $cropH)
    
    $g.DrawImage($src, $dstRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    $src.Dispose()
    
    $dst.Save($dstPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $dst.Dispose()
    Write-Host "Created $dstPath ($cropW x $cropH)"
}

# 1. Closeup 01: Macro closeup of peacock sleeve embroidery from work-bridal-01.jpg
$srcBridal1 = Join-Path $photosDir "work-bridal-01.jpg"
if (Test-Path $srcBridal1) {
    $img = [System.Drawing.Image]::FromFile($srcBridal1)
    $w = $img.Width
    $h = $img.Height
    $img.Dispose()
    
    $cropW = [int]($w * 0.42)
    $cropH = [int]($w * 0.42)
    $cropX = [int]($w * 0.08)
    $cropY = [int]($h * 0.28)
    CropImage $srcBridal1 (Join-Path $photosDir "closeup-01.jpg") $cropX $cropY $cropW $cropH
}

# 2. Closeup 02: Macro closeup of neckline zardosi from work-bridal-02.jpg
$srcBridal2 = Join-Path $photosDir "work-bridal-02.jpg"
if (Test-Path $srcBridal2) {
    $img = [System.Drawing.Image]::FromFile($srcBridal2)
    $w = $img.Width
    $h = $img.Height
    $img.Dispose()
    
    $cropW = [int]($w * 0.45)
    $cropH = [int]($w * 0.45)
    $cropX = [int]($w * 0.28)
    $cropY = [int]($h * 0.52)
    CropImage $srcBridal2 (Join-Path $photosDir "closeup-02.jpg") $cropX $cropY $cropW $cropH
}

# 3. Work Saree 01: Saree drape from work-bridal-03.jpg
$srcBridal3 = Join-Path $photosDir "work-bridal-03.jpg"
if (Test-Path $srcBridal3) {
    $img = [System.Drawing.Image]::FromFile($srcBridal3)
    $w = $img.Width
    $h = $img.Height
    $img.Dispose()
    
    $cropW = [int]($w * 0.55)
    $cropH = [int]($h * 0.68)
    $cropX = [int]($w * 0.18)
    $cropY = [int]($h * 0.16)
    CropImage $srcBridal3 (Join-Path $photosDir "work-saree-01.jpg") $cropX $cropY $cropW $cropH
}

# 4. Kids wear
$srcKids = Join-Path $vastraPhotos "work-kids-01.jpg"
if (Test-Path $srcKids) {
    Copy-Item $srcKids (Join-Path $photosDir "work-kids-01.jpg") -Force
    Write-Host "Copied work-kids-01.jpg"
}

# 5. Alterations Before & After
$srcBefore = Join-Path $vastraPhotos "before-01.jpg"
$srcAfter = Join-Path $vastraPhotos "after-01.jpg"
if ((Test-Path $srcBefore) -and (Test-Path $srcAfter)) {
    Copy-Item $srcBefore (Join-Path $photosDir "before-01.jpg") -Force
    Copy-Item $srcAfter (Join-Path $photosDir "after-01.jpg") -Force
    Write-Host "Copied before-01.jpg and after-01.jpg"
}
