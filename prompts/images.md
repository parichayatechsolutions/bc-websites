# Image prompts (Gemini)

Use these when a boutique's own photos are missing or weak, typically for hero backgrounds, textures and mood shots.
**Never generate a boutique's actual products or storefront.** The site shows their real work; AI images are only for atmosphere.

Replace the `{curly}` slots before pasting. Take colours from the boutique's `config.ts`.

---

## Hero background: silk drape

```
Editorial close-up photograph of {primary colour name} silk fabric flowing in soft folds,
with {accent colour name} zari border catching warm window light. Shallow depth of field,
rich texture, luxury Indian bridal atmosphere. No people, no text, no logos.
Cinematic, 16:9, high resolution, space on the left side for a headline.
```

## Craft detail: embroidery macro

```
Macro photograph of hand {maggam / aari / zardosi} embroidery in progress on {primary colour name}
fabric, golden thread, needle mid-stitch, a craftsperson's fingertips softly out of focus.
Warm natural light, shallow depth of field, documentary style. No text. 4:5.
```

## Atelier mood

```
Interior of a small Indian tailoring atelier at golden hour, bolts of silk fabric in
{primary colour name} and {accent colour name} on wooden shelves, measuring tape and scissors
on a cutting table, soft dust in sunlight. No people, no text, no signage. 16:9, editorial.
```

## Texture background (for section fills)

```
Seamless flat-lay texture of {primary colour name} raw silk with subtle woven grain,
evenly lit, no folds, no pattern, no text. Square, high resolution.
```

## Tips

- If the background comes out busy, add "minimal, uncluttered, negative space".
- For dark templates, add "low-key lighting, deep shadows".
- Generate 4 variations and pick the one where the headline area is cleanest.
- Save into `boutiques/<slug>/photos/` as `ai-hero.jpg`, `ai-texture.jpg`, etc., so AI images are never mixed up with the boutique's real photos.
