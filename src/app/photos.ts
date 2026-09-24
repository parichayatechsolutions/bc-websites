// src/app/photos.ts
// A work photo carries its own category in its file name —
// "work-bridal-01.jpg" is Bridal — so the lookbook templates can group a
// boutique's work without anyone filling in another form field.
//
// This is deliberate: every boutique's ticked service groups come out the
// same (Women, Kids, Handwork, Services), so grouping by those would give
// five hundred identical grids. What they photograph differs; what they tick
// doesn't.

import type { PhotoFile } from '../types/boutique'

/** The words the data sheet asks for, in the order a customer looks for them. */
const NAMES: Record<string, string> = {
  bridal: 'Bridal',
  lehenga: 'Lehengas',
  saree: 'Sarees',
  blouse: 'Blouses',
  gown: 'Gowns',
  western: 'Western',
  kids: 'Kids',
  men: 'Men',
}

const ORDER = Object.keys(NAMES)

/** "work-bridal-01.jpg" → "Bridal". "work-01.jpg" → undefined. */
export function photoCategory(file: PhotoFile): string | undefined {
  const found = file.match(/^work-([a-z]+)-\d+\./i)
  if (!found) return undefined
  const key = found[1].toLowerCase()
  return NAMES[key] ?? key.charAt(0).toUpperCase() + key.slice(1)
}

/**
 * The categories in a boutique's work, in the order above, with anything
 * unrecognised after them. Empty when nothing is named by category, which is
 * how a gallery knows to hide its rail.
 */
export function photoCategories(files: PhotoFile[]): string[] {
  const found = [...new Set(files.map(photoCategory).filter((c): c is string => Boolean(c)))]
  const rank = (name: string) => {
    const at = ORDER.findIndex((key) => NAMES[key] === name)
    return at === -1 ? ORDER.length : at
  }
  return found.sort((a, b) => rank(a) - rank(b) || a.localeCompare(b))
}
