// scripts/lib/paths.mjs
// Where a boutique's parts live. Data the team fills in stays outside src/;
// everything that is code lives inside it.
//
//   boutiques/<slug>/data.md       the filled data sheet
//   boutiques/<slug>/photos/       logo, photos, clips
//   src/sites/<slug>/config.ts     generated from data.md
//   src/designs/<id>/Design.tsx    the pages every boutique can be drawn on

import { existsSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

export const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
export const dataRoot = join(root, 'boutiques')
export const sitesRoot = join(root, 'src', 'sites')
export const designsRoot = join(root, 'src', 'designs')

export const dataDir = (slug) => join(dataRoot, slug)
export const siteDir = (slug) => join(sitesRoot, slug)
export const designDir = (id) => join(designsRoot, id)

/** Every boutique that has a data folder or a site folder, templates excluded. */
export function allSlugs() {
  const folders = (dir) =>
    existsSync(dir)
      ? readdirSync(dir, { withFileTypes: true })
          .filter((d) => d.isDirectory() && !d.name.startsWith('_'))
          .map((d) => d.name)
      : []
  return [...new Set([...folders(dataRoot), ...folders(sitesRoot)])].sort()
}
