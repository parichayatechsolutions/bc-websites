// src/sections/fabric/fabricKinds.ts
// What's generally true of a fabric by its kind: how heavy, how shiny and
// how much it drapes, each 1 (least) to 5 (most). Matched by name, so a
// fabric the list doesn't know is simply left out of the comparisons.

import type { Fabric } from '../../types/boutique'

export type Scale = [weight: number, sheen: number, drape: number]

const KINDS: { match: RegExp; scale: Scale }[] = [
  { match: /banaras|brocade/i, scale: [4, 5, 2] },
  { match: /velvet/i, scale: [5, 3, 2] },
  { match: /silk|kanjiv|pattu|tussar/i, scale: [3, 4, 3] },
  { match: /georgette/i, scale: [2, 2, 5] },
  { match: /chiffon/i, scale: [1, 2, 5] },
  { match: /crepe/i, scale: [2, 2, 4] },
  { match: /organza|tissue/i, scale: [1, 4, 1] },
  { match: /net/i, scale: [1, 2, 3] },
  { match: /linen/i, scale: [3, 1, 2] },
  { match: /cotton|mul|khadi/i, scale: [3, 1, 2] },
]

export const SCALES = ['Weight', 'Sheen', 'Drape'] as const

/** Their fabrics whose kind is known, with its scale. */
export function scaled(fabrics: Fabric[]): { fabric: Fabric; scale: Scale }[] {
  return fabrics.flatMap((fabric) => {
    const kind = KINDS.find((k) => k.match.test(fabric.name))
    return kind ? [{ fabric, scale: kind.scale }] : []
  })
}
