// src/designs/catalog.ts
// The list of designs a boutique's site can be built in, and which design each
// boutique gets. Plain data with no React in it, so the build scripts can read
// it too.
//
// A design is a whole look: its navigation, its footer, its pages and the
// order of the components on them, and its font pair. Every boutique can be
// seen in every design at /<slug>/d/<design>, which is what the demo directory
// shows as cards. What /<slug> itself shows is decided here.

export interface IDesignMeta {
  /** Folder name in src/designs/, and the id in the address. */
  id: string
  name: string
  /** One line for the design's card in the demo directory. */
  description: string
}

/** In the order they appear on a boutique's card wall. */
export const DESIGNS: IDesignMeta[] = [
  {
    id: 'arch',
    name: 'Arch',
    description: 'Dark and ceremonial. The name over a temple arch that opens as you scroll, then their work sliding past on the brand colour.',
  },
  {
    id: 'atelier',
    name: 'Atelier',
    description: 'Light and unhurried. Name beside one tall photo, then the work in a quiet grid. For a boutique that wants to look expensive rather than loud.',
  },
  {
    id: 'poster',
    name: 'Poster',
    description: 'Formal. The name framed over a full photo like a printed invitation, with the making of a piece told step by step.',
  },
  {
    id: 'ledger',
    name: 'Ledger',
    description: 'Type first. The name across the full width like a masthead, the facts in a line under it, and the work in a grid. Modern and plain-spoken.',
  },
]

export const DESIGN_IDS = DESIGNS.map((d) => d.id)

/**
 * Boutiques whose design has been settled — usually because the owner picked
 * one from their card wall. Add a line here rather than editing a config:
 * config.ts is generated from data.md and would be overwritten.
 */
export const ASSIGNED: Record<string, string> = {
  'sample-boutique': 'arch',
}

/** Same slug, same number, every time and on both the server and the page. */
function hash(text: string): number {
  let h = 0
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) >>> 0
  return h
}

/**
 * The design a boutique's own address (/<slug>) shows. Until someone picks
 * one, it comes from the slug, so neighbouring boutiques don't open with the
 * same page.
 */
export function designFor(slug: string): string {
  const chosen = ASSIGNED[slug]
  if (chosen && DESIGN_IDS.includes(chosen)) return chosen
  return DESIGN_IDS[hash(slug) % DESIGN_IDS.length]
}

export const isDesign = (id: string | undefined): id is string => Boolean(id && DESIGN_IDS.includes(id))
