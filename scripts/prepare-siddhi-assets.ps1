Add-Type -AssemblyName System.Drawing

$photosDir = "C:\Users\Aravind\Desktop\git\bc-websites\boutiques\3-siddhiboutique\photos"
$artifactsDir = "C:\Users\Aravind\.gemini\antigravity-ide\brain\02b8643b-4245-4f0d-a485-56e4e6ac89d8"

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

# 1. Closeup 01: Macro closeup of Peacock sleeve embroidery on work-blouse-01.jpg
$srcBlouse1 = Join-Path $photosDir "work-blouse-01.jpg"
if (Test-Path $srcBlouse1) {
    # work-blouse-01 is 1024x1365 (or similar 3:4). The sleeve is on the right/left
    $img = [System.Drawing.Image]::FromFile($srcBlouse1)
    $w = $img.Width
    $h = $img.Height
    $img.Dispose()
    
    $cropW = [int]($w * 0.45)
    $cropH = [int]($w * 0.45)
    $cropX = [int]($w * 0.52)
    $cropY = [int]($h * 0.28)
    CropImage $srcBlouse1 (Join-Path $photosDir "closeup-01.jpg") $cropX $cropY $cropW $cropH
}

# 2. Closeup 02: Macro closeup of neckline zardosi from work-bridal-01.jpg
$srcBridal1 = Join-Path $photosDir "work-bridal-01.jpg"
if (Test-Path $srcBridal1) {
    $img = [System.Drawing.Image]::FromFile($srcBridal1)
    $w = $img.Width
    $h = $img.Height
    $img.Dispose()
    
    $cropW = [int]($w * 0.42)
    $cropH = [int]($w * 0.42)
    $cropX = [int]($w * 0.38)
    $cropY = [int]($h * 0.56)
    CropImage $srcBridal1 (Join-Path $photosDir "closeup-02.jpg") $cropX $cropY $cropW $cropH
}

# 3. Work Saree 01: Beautiful silk saree drape from work-bridal-03.jpg
$srcBridal3 = Join-Path $photosDir "work-bridal-03.jpg"
if (Test-Path $srcBridal3) {
    $img = [System.Drawing.Image]::FromFile($srcBridal3)
    $w = $img.Width
    $h = $img.Height
    $img.Dispose()
    
    $cropW = [int]($w * 0.52)
    $cropH = [int]($h * 0.65)
    $cropX = [int]($w * 0.26)
    $cropY = [int]($h * 0.25)
    CropImage $srcBridal3 (Join-Path $photosDir "work-saree-01.jpg") $cropX $cropY $cropW $cropH
}

# 4. Work Kids 01: Kids wear (from vastra_kids_wear with Rose Pink shift or Lavish)
$srcKids = Join-Path $artifactsDir "vastra_kids_wear_1791268859861.jpg"
if (Test-Path $srcKids) {
    Copy-Item $srcKids (Join-Path $photosDir "work-kids-01.jpg")
    Write-Host "Created work-kids-01.jpg"
}

# 5. Before & After Alterations
$srcBefore = Join-Path $artifactsDir "vastra_alter_before_1791268882407.jpg"
$srcAfter = Join-Path $artifactsDir "vastra_alter_after_1791268920092.jpg"
if ((Test-Path $srcBefore) -and (Test-Path $srcAfter)) {
    Copy-Item $srcBefore (Join-Path $photosDir "before-01.jpg")
    Copy-Item $srcAfter (Join-Path $photosDir "after-01.jpg")
    Write-Host "Created before-01.jpg and after-01.jpg"
}
