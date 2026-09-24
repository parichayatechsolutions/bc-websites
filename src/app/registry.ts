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

/** URL of a file in boutiques/<slug>/photos/, or undefined if it hasn't been added yet. */
export function photoUrl(slug: string, file?: PhotoFile): string | undefined {
  return file ? photos[`/boutiques/${slug}/photos/${file}`] : undefined
}
