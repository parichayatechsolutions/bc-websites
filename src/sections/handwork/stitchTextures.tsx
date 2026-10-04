// src/sections/handwork/stitchTextures.tsx
// Kinds of handwork drawn as simple repeating textures (chain loops for
// aari, raised dots and zari lines for maggam, coils for zardosi, mirrors,
// beads, running stitch for kantha) so a section can show the idea of a
// stitch without a photo that might not match their work. Drawn in the
// brand's thread and accent colours.

import { useId } from 'react'

export interface IStitch {
  id: string
  name: string
  match: RegExp
}

export const STITCHES: IStitch[] = [
  { id: 'aari', name: 'Aari', match: /aari/i },
  { id: 'maggam', name: 'Maggam', match: /maggam/i },
  { id: 'zardosi', name: 'Zardosi', match: /zardosi|zardozi/i },
  { id: 'mirror', name: 'Mirror work', match: /mirror/i },
  { id: 'beads', name: 'Beads and stones', match: /bead|stone|sequin/i },
  { id: 'kantha', name: 'Kantha', match: /kantha|hand embroidery|chikan/i },
]

/** The motif inside one tile of the pattern, on a 20 × 20 grid. */
function Tile({ kind }: { kind: string }) {
  const thread = { stroke: 'var(--c-thread)', fill: 'none' }
  const gold = { stroke: 'var(--c-accent)', fill: 'var(--c-accent)' }
  switch (kind) {
    case 'aari':
      return <path d="M 2 10 q 4 -6 8 0 q 4 6 8 0" strokeWidth={1.4} style={thread} />
    case 'maggam':
      return (
        <>
          <path d="M 0 10 L 20 10" strokeWidth={1} style={{ stroke: 'var(--c-accent)' }} />
          <circle cx={10} cy={5} r={2.2} style={gold} />
          <circle cx={10} cy={15} r={2.2} style={gold} />
        </>
      )
    case 'zardosi':
      return <path d="M 4 10 a 3 3 0 1 1 6 0 a 3 3 0 1 1 6 0" strokeWidth={1.6} style={{ stroke: 'var(--c-accent)', fill: 'none' }} />
    case 'mirror':
      return (
        <>
          <circle cx={10} cy={10} r={5} strokeWidth={1.2} style={{ stroke: 'var(--c-thread)', fill: 'var(--c-light)' }} />
          <circle cx={10} cy={10} r={3} style={{ fill: 'color-mix(in oklab, var(--c-light) 60%, var(--c-ink))' }} />
        </>
      )
    case 'beads':
      return (
        <>
          <circle cx={5} cy={5} r={1.8} style={gold} />
          <circle cx={15} cy={15} r={1.8} style={gold} />
          <circle cx={15} cy={5} r={1.2} style={{ fill: 'var(--c-thread)' }} />
        </>
      )
    default:
      return <path d="M 1 6 L 7 6 M 11 6 L 17 6 M 4 14 L 10 14 M 14 14 L 20 14" strokeWidth={1.4} strokeLinecap="round" style={thread} />
  }
}

/** A field of one stitch, filling its box. `size` is the tile size in px: smaller is denser. */
export function Texture({ kind, size = 20, className = '' }: { kind: string; size?: number; className?: string }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg aria-hidden="true" className={`block h-full w-full ${className}`}>
      <defs>
        <pattern id={`stitch-${id}`} width={size} height={size} patternUnits="userSpaceOnUse" viewBox="0 0 20 20">
          <Tile kind={kind} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" style={{ fill: 'color-mix(in oklab, var(--c-primary) 14%, var(--c-light))' }} />
      <rect width="100%" height="100%" fill={`url(#stitch-${id})`} />
    </svg>
  )
}
