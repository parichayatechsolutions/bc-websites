Add-Type -TypeDefinition @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public class VastraBridalGenerator {
    public static void GenerateVariant(string inputPath, string outputPath, float targetHue, float satMult, float lightMult) {
        using (Bitmap src = new Bitmap(inputPath)) {
            Bitmap dst = new Bitmap(src.Width, src.Height, PixelFormat.Format32bppArgb);
            BitmapData srcData = src.LockBits(new Rectangle(0, 0, src.Width, src.Height), ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
            BitmapData dstData = dst.LockBits(new Rectangle(0, 0, dst.Width, dst.Height), ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);

            int bytes = Math.Abs(srcData.Stride) * src.Height;
            byte[] rgbValues = new byte[bytes];
            byte[] resultValues = new byte[bytes];

            Marshal.Copy(srcData.Scan0, rgbValues, 0, bytes);

            for (int i = 0; i < bytes; i += 4) {
                byte b = rgbValues[i];
                byte g = rgbValues[i + 1];
                byte r = rgbValues[i + 2];
                byte a = rgbValues[i + 3];

                float rf = r / 255f, gf = g / 255f, bf = b / 255f;
                float max = Math.Max(rf, Math.Max(gf, bf));
                float min = Math.Min(rf, Math.Min(gf, bf));
                float delta = max - min;
                float l = (max + min) / 2f;

                float h = 0f, s = 0f;
                if (delta > 0.001f) {
                    s = l > 0.5f ? delta / (2f - max - min) : delta / (max + min);
                    if (max == rf) {
                        h = ((gf - bf) / delta) + (gf < bf ? 6f : 0f);
                    } else if (max == gf) {
                        h = ((bf - rf) / delta) + 2f;
                    } else {
                        h = ((rf - gf) / delta) + 4f;
                    }
                    h *= 60f;
                }

                // Detect the silk fabric (red/crimson base):
                // Hue is in [325..360] or [0..25], saturation > 0.25, lightness < 0.85
                // Keeps gold embroidery (hue 30..55) and white satin backdrop (s < 0.2) untouched
                if ((h >= 325f || h <= 25f) && s > 0.25f && l < 0.85f) {
                    // Shift to target hue
                    h = targetHue;
                    s = Math.Min(1f, Math.Max(0f, s * satMult));
                    l = Math.Min(1f, Math.Max(0f, l * lightMult));

                    float q = l < 0.5f ? l * (1f + s) : l + s - (l * s);
                    float p = 2f * l - q;
                    float hk = h / 360f;

                    float tr = hk + 1f/3f;
                    float tg = hk;
                    float tb = hk - 1f/3f;

                    if (tr < 0f) tr += 1f; if (tr > 1f) tr -= 1f;
                    if (tg < 0f) tg += 1f; if (tg > 1f) tg -= 1f;
                    if (tb < 0f) tb += 1f; if (tb > 1f) tb -= 1f;

                    float cr = (tr < 1f/6f) ? p + (q - p) * 6f * tr : (tr < 0.5f) ? q : (tr < 2f/3f) ? p + (q - p) * (2f/3f - tr) * 6f : p;
                    float cg = (tg < 1f/6f) ? p + (q - p) * 6f * tg : (tg < 0.5f) ? q : (tg < 2f/3f) ? p + (q - p) * (2f/3f - tg) * 6f : p;
                    float cb = (tb < 1f/6f) ? p + (q - p) * 6f * tb : (tb < 0.5f) ? q : (tb < 2f/3f) ? p + (q - p) * (2f/3f - tb) * 6f : p;

                    r = (byte)Math.Min(255, Math.Max(0, (int)(cr * 255f)));
                    g = (byte)Math.Min(255, Math.Max(0, (int)(cg * 255f)));
                    b = (byte)Math.Min(255, Math.Max(0, (int)(cb * 255f)));
                }

                resultValues[i] = b;
                resultValues[i + 1] = g;
                resultValues[i + 2] = r;
                resultValues[i + 3] = a;
            }

            Marshal.Copy(resultValues, 0, dstData.Scan0, bytes);
            src.UnlockBits(srcData);
            dst.UnlockBits(dstData);

            ImageCodecInfo codec = null;
            foreach (var c in ImageCodecInfo.GetImageEncoders()) {
                if (c.MimeType == "image/jpeg") { codec = c; break; }
            }
            EncoderParameters ep = new EncoderParameters(1);
            ep.Param[0] = new EncoderParameter(Encoder.Quality, 88L);
            dst.Save(outputPath, codec, ep);
            dst.Dispose();
        }
    }
}
"@ -ReferencedAssemblies "System.Drawing"

$inputImg = "C:\Users\Aravind\Desktop\git\bc-websites\boutiques\1-lavishboutique\photos\Gemini_Generated_Image_mnjkoomnjkoomnjk.png"

# 1. Muhurtham: Deep Royal Maroon (Hue 350, slightly deeper richness)
$outMuhurtham = "C:\Users\Aravind\Desktop\git\bc-websites\boutiques\2-vastravinyasaki\photos\work-bridal-01.jpg"
[VastraBridalGenerator]::GenerateVariant($inputImg, $outMuhurtham, 348.0, 1.05, 0.90)

# 2. Reception: Royal Peacock Sapphire Blue (Hue 218, vivid festive blue)
$outReception = "C:\Users\Aravind\Desktop\git\bc-websites\boutiques\2-vastravinyasaki\photos\work-bridal-02.jpg"
[VastraBridalGenerator]::GenerateVariant($inputImg, $outReception, 218.0, 1.10, 0.95)

# 3. Haldi & Sangeet Trousseau: Royal Emerald Teal Green (Hue 160)
$outTrousseau = "C:\Users\Aravind\Desktop\git\bc-websites\boutiques\2-vastravinyasaki\photos\work-bridal-03.jpg"
[VastraBridalGenerator]::GenerateVariant($inputImg, $outTrousseau, 160.0, 1.05, 0.95)

Write-Output "All 3 Vastra Vinyasaki bridal photos generated successfully!"
