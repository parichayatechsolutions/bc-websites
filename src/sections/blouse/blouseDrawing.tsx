// src/sections/blouse/blouseDrawing.tsx
// A blouse drawn flat, as a tailor sketches it: front or back, with a choice
// of neck, back and sleeves. Ported from the design lab's line drawings, on
// a 200 × 160 grid, so the blouse designer and the measurement guide draw
// the same garment.
//
// The notes are styling guidance, true of the cut itself, not claims about
// any boutique.

import type { ReactNode } from 'react'

type Point = [number, number]

export interface IOption {
  id: string
  name: string
  note: string
  /** How it reads in a sentence: "a round neck". */
  phrase: string
}

export const NECKS: IOption[] = [
  { id: 'round', name: 'Round', note: 'Classic, and easy to wear with any saree.', phrase: 'a round neck' },
  { id: 'boat', name: 'Boat', note: 'Wide and shallow; shows the collarbone.', phrase: 'a boat neck' },
  { id: 'v', name: 'V-neck', note: 'Lengthens the neck.', phrase: 'a V-neck' },
  { id: 'square', name: 'Square', note: 'A neat frame for a necklace.', phrase: 'a square neck' },
  { id: 'sweet', name: 'Sweetheart', note: 'A soft curve for bridal and party wear.', phrase: 'a sweetheart neck' },
  { id: 'high', name: 'High neck', note: 'Covers the neck and leaves room for work on the collar.', phrase: 'a high neck' },
]

export const BACKS: IOption[] = [
  { id: 'u', name: 'Deep U', note: 'The classic bridal back.', phrase: 'a deep U back' },
  { id: 'vb', name: 'Deep V', note: 'Dramatic; often finished with a tie.', phrase: 'a deep V back' },
  { id: 'win', name: 'Keyhole', note: 'A small opening with more coverage.', phrase: 'a keyhole back' },
  { id: 'sq', name: 'Low square', note: 'A clean frame for back embroidery.', phrase: 'a low square back' },
]

export const SLEEVES: IOption[] = [
  { id: 'none', name: 'Sleeveless', note: 'Light and cool for summer functions.', phrase: 'no sleeves' },
  { id: 'cap', name: 'Cap', note: 'Just covers the shoulder.', phrase: 'cap sleeves' },
  { id: 'puff', name: 'Puff', note: 'Gathered at the top for a playful shape.', phrase: 'puff sleeves' },
  { id: 'elbow', name: 'Elbow', note: 'Room for sleeve work.', phrase: 'elbow-length sleeves' },
  { id: 'three', name: 'Three-quarter', note: 'Graceful and covered.', phrase: 'three-quarter sleeves' },
]

// Neck openings: left shoulder point, right shoulder point, the curve between.
const FRONT: Record<string, [Point, Point, string]> = {
  round: [[80, 28], [120, 28], 'C 118 52 82 52 80 28'],
  boat: [[68, 31], [132, 31], 'C 120 43 80 43 68 31'],
  v: [[80, 28], [120, 28], 'L 100 66 L 80 28'],
  square: [[80, 28], [120, 28], 'L 120 50 L 80 50 L 80 28'],
  sweet: [[80, 28], [120, 28], 'C 123 50 107 57 100 46 C 93 57 77 50 80 28'],
  high: [[88, 22], [112, 22], 'C 110 31 90 31 88 22'],
}
const BACK: Record<string, [Point, Point, string, string?]> = {
  u: [[80, 28], [120, 28], 'C 121 106 79 106 80 28'],
  vb: [[80, 28], [120, 28], 'L 100 108 L 80 28'],
  win: [[82, 28], [118, 28], 'C 116 40 84 40 82 28', ' M 100 50 C 113 50 113 72 100 80 C 87 72 87 50 100 50 Z'],
  sq: [[78, 28], [122, 28], 'L 122 84 L 78 84 L 78 28'],
}
// The left sleeve's outline from shoulder to underarm; the right is mirrored.
const SLEEVE: Record<string, Point[]> = {
  none: [[60, 33], [56, 50], [60, 66]],
  cap: [[50, 36], [38, 58], [50, 66]],
  puff: [[50, 36], [38, 37], [29, 47], [31, 60], [42, 66], [55, 68]],
  elbow: [[50, 36], [26, 100], [40, 106]],
  three: [[50, 36], [18, 132], [32, 137]],
}

const pt = (p: Point) => `${p[0]} ${p[1]}`
const mirror = (p: Point): Point => [200 - p[0], p[1]]

export function blousePath(neck: string, sleeve: string, back = false): string {
  const [left, right, curve, extra = ''] = back ? BACK[neck] ?? BACK.u : [...(FRONT[neck] ?? FRONT.round), '']
  const arm = SLEEVE[sleeve] ?? SLEEVE.cap
  const leftArm = arm.map(pt).join(' L ')
  const rightArm = [...arm].reverse().map((p) => pt(mirror(p))).join(' L ')
  return `M ${pt(left)} L ${leftArm} L 64 76 L 68 139 Q 100 147 132 139 L 136 76 L ${rightArm} L ${pt(right)} ${curve} Z${extra}`
}

/** The blouse in brand-tinted line, drawn to fill its box. `children` are drawn on top (a tape line). */
export function BlouseFlat({
  neck,
  sleeve,
  back = false,
  className = '',
  children,
}: {
  neck: string
  sleeve: string
  back?: boolean
  className?: string
  children?: ReactNode
}) {
  return (
    <svg viewBox="0 0 200 160" aria-hidden="true" className={`block h-full w-full overflow-visible ${className}`}>
      <path
        d={blousePath(neck, sleeve, back)}
        fillRule="evenodd"
        strokeWidth={1.6}
        strokeLinejoin="round"
        className="transition-[d] duration-300 ease-stitch"
        style={{ fill: 'color-mix(in oklab, var(--c-primary) 12%, var(--c-light))', stroke: 'var(--c-primary-ink)' }}
      />
      {!back && (
        <path d="M 85 141 L 89 106 M 115 141 L 111 106" fill="none" strokeWidth={1} strokeDasharray="3 3" opacity={0.55} style={{ stroke: 'var(--c-primary-ink)' }} />
      )}
      {children}
    </svg>
  )
}

/** "a round neck, a deep U back and elbow-length sleeves" */
export function describe(neck: string, back: string, sleeve: string): string {
  const find = (list: IOption[], id: string) => list.find((o) => o.id === id)?.phrase ?? ''
  return `${find(NECKS, neck)}, ${find(BACKS, back)} and ${find(SLEEVES, sleeve)}`
}
