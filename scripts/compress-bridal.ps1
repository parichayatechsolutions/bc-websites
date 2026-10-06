Add-Type -AssemblyName System.Drawing

function CompressJpeg($inPath, $outPath, [long]$quality) {
    $bmp = [System.Drawing.Bitmap]::FromFile($inPath)
    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $encoder = [System.Drawing.Imaging.Encoder]::Quality
    $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($encoder, $quality)
    $tempPath = $outPath + '.tmp.jpg'
    $bmp.Save($tempPath, $codec, $params)
    $bmp.Dispose()
    Move-Item $tempPath $outPath -Force
}

CompressJpeg 'boutiques\1-lavishboutique\photos\work-bridal-01.jpg' 'boutiques\1-lavishboutique\photos\work-bridal-01.jpg' 85
CompressJpeg 'boutiques\1-lavishboutique\photos\work-bridal-03.jpg' 'boutiques\1-lavishboutique\photos\work-bridal-03.jpg' 85
Write-Output 'Compressed successfully'
