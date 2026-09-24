// src/app/registry.ts
// Finds every boutique at build time. A boutique's only code is
// src/sites/<slug>/config.ts, its details, generated from
// boutiques/<slug>/data.md. Its photos stay with its data in
// boutiques/<slug>/photos/, and the page it's drawn on comes from
// src/designs/.
// Configs load on demand, so adding a 500th boutique doesn't slow the others.

import type { BoutiqueConfig, PhotoFile } from '../types/boutique'

const configs = import.meta.glob<{ default: BoutiqueConfig }>(['/src/sites/*/config.ts', '!/src/sites/_*/**'])

const photos = import.meta.glob<string>(
  '/boutiques/*/photos/*.{jpg,jpeg,png,webp,avif,svg,mp4,webm}',
  { eager: true, query: '?url', import: 'default' },
)

export const boutiqueSlugs = Object.keys(configs)
  .map((path) => path.split('/')[3]) // /src/sites/<slug>/config.ts
  .sort()

export async function loadBoutique(slug: string): Promise<BoutiqueConfig | null> {
  const load = configs[`/src/sites/${slug}/config.ts`]
  return load ? (await load()).default : null
}

const AI_STANDINS = ['jpg', 'jpeg', 'png', 'webp', 'avif']

/**
 * URL of a file in boutiques/<slug>/photos/, or undefined if it hasn't been
 * added yet.
 *
 * A config always names the real photograph ("storefront.jpg"). Until the
 * boutique gives us theirs, a generated stand-in saved as "ai-storefront.jpg"
 * is used in its place, so the demo is never a grid of empty boxes — and the
 * moment the real file lands beside it, the real one wins with no config
 * change. `npm run prompts` writes the prompts for those stand-ins.
 */
export function photoUrl(slug: string, file?: PhotoFile): string | undefined {
  if (!file) return undefined
  const real = photos[`/boutiques/${slug}/photos/${file}`]
  if (real) return real
  const stem = file.replace(/\.[^.]+$/, '')
  for (const extension of AI_STANDINS) {
    const stand = photos[`/boutiques/${slug}/photos/ai-${stem}.${extension}`]
    if (stand) return stand
  }
  return undefined
}
