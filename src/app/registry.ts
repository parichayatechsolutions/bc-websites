// src/app/registry.ts
// Finds every boutique at build time. A boutique's code lives in src/sites/<slug>/:
//   config.ts  its details (generated from boutiques/<slug>/data.md)
//   Site.tsx   its page: components from src/sections, in the order it wants
// Its photos stay with its data in boutiques/<slug>/photos/.
// Pages load on demand, so adding a 500th boutique doesn't slow down the others.

import type { ComponentType } from 'react'
import type { BoutiqueConfig, PhotoFile } from '../types/boutique'
import type { IFontPair } from '../theme/fonts'

export interface ISite {
  default: ComponentType
  fonts: IFontPair
}

const configs = import.meta.glob<{ default: BoutiqueConfig }>(['/src/sites/*/config.ts', '!/src/sites/_*/**'])
const sites = import.meta.glob<ISite>(['/src/sites/*/Site.tsx', '!/src/sites/_*/**'])

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

export async function loadSite(slug: string): Promise<ISite | null> {
  const load = sites[`/src/sites/${slug}/Site.tsx`]
  return load ? await load() : null
}

/** URL of a file in boutiques/<slug>/photos/, or undefined if it hasn't been added yet. */
export function photoUrl(slug: string, file?: PhotoFile): string | undefined {
  return file ? photos[`/boutiques/${slug}/photos/${file}`] : undefined
}
