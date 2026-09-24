// src/app/directory-types.ts
// The shape of one line in the demo directory. Kept apart from directory.ts
// because that file is generated and rewritten by `npm run config`.

export interface IPlace {
  state: string
  city: string
  /** The locality people know the shop by: "Kengeri Satellite Town". */
  area: string
  pincode: string
}

export interface IDirectoryEntry {
  slug: string
  name: string
  tagline?: string
  logo?: string
  colors: { primary: string; accent: string }
  /** One per branch, so a boutique with two shops appears under both. */
  places: IPlace[]
  featured: string[]
  rating?: number
  /** They've bought their site. */
  sold: boolean
}
