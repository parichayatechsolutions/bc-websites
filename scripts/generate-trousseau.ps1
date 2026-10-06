Add-Type -TypeDefinition @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public class ImageHueShifter {
    public static void ShiftHue(string inputPath, string outputPath, float targetHue) {
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

                // Check saturation and color to only shift the main fabric (red / maroon / purple)
                // Gold / zari is around r > 160, g > 120, b < 90, hue around 35-50 deg
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

                // Fabric color detection:
                // Red / crimson / magenta fabric in user image has hue: (h >= 320 || h <= 20) and s > 0.25 and l between 0.15 and 0.8
                // We keep gold zari (hue 30..55) and white fabric (s < 0.15) unchanged!
                if ((h >= 325f || h <= 25f) && s > 0.25f && l < 0.85f) {
                    // Shift fabric to targetHue (e.g. 155f for emerald green)
                    h = targetHue + (h > 180f ? (h - 360f) * 0.5f : h * 0.5f);
                    if (h < 0f) h += 360f;
                    if (h >= 360f) h -= 360f;

                    // Convert back to RGB
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

            dst.Save(outputPath, ImageFormat.Jpeg);
        }
    }
}
"@ -ReferencedAssemblies "System.Drawing"

$input = "C:\Users\Aravind\Desktop\git\bc-websites\boutiques\1-lavishboutique\photos\Gemini_Generated_Image_mnjkoomnjkoomnjk.png"
$output = "C:\Users\Aravind\.gemini\antigravity-ide\brain\02b8643b-4245-4f0d-a485-56e4e6ac89d8\lavish_bridal_emerald_trousseau.jpg"

[ImageHueShifter]::ShiftHue($input, $output, 155.0)
Write-Output "Successfully generated $output"
