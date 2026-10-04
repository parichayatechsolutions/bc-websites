// src/sections/wedding/weddingShared.ts
// What the wedding planner sections share: the functions of a wedding in
// the order they usually happen, with what a bride often wears to each
// and colours that suit it. General guidance, true of weddings, not of
// any boutique; every section offers it as something to ask about.
//
// Dates come only from the shop's own lead times (data sheet 6i, `leadTimes`):
// how many weeks before the wedding to order each piece. Without them the
// dated planner sections hide (DESIGN.md decision log).

import { useBoutique } from '../../app/BoutiqueContext'
import { useBridal } from '../bridal/bridalShared'

export interface IFunction {
  name: string
  /** What a bride often wears. */
  wear: string
  /** Colours that suit the function, as hex: the cloth's colours, not the brand's. */
  palette: string[]
}

export const FUNCTIONS: IFunction[] = [
  { name: 'Engagement', wear: 'A light lehenga or a silk saree', palette: ['#e58fb0', '#efe3c8', '#d6a838', '#9fc8a0'] },
  { name: 'Mehendi', wear: 'A sharara or a short lehenga, easy to sit in', palette: ['#2f7d4a', '#e8b923', '#f7a072', '#9fc8a0'] },
  { name: 'Haldi', wear: 'Cotton in yellow, nothing you’ll miss if it stains', palette: ['#e8b923', '#f4d35e', '#ffffff', '#e07a1f'] },
  { name: 'Sangeet', wear: 'Something that moves: a flared lehenga or a gown', palette: ['#5d2e8c', '#d9507a', '#d6a838', '#244e9c'] },
  { name: 'Wedding', wear: 'The bridal saree or lehenga, with the heaviest work', palette: ['#b3202a', '#6e1423', '#d6a838', '#2f7d4a'] },
  { name: 'Reception', wear: 'A lighter, dressier lehenga, gown or saree', palette: ['#2b2d6e', '#c98b7f', '#b9bcc2', '#efe3c8'] },
]

/** Whether to show the planner at all: only for a boutique that does bridal work. */
export function useWedding() {
  return useBridal()
}

const DAY = 24 * 60 * 60 * 1000

/** Today at midnight, in the visitor's time zone. */
export const today = () => new Date(new Date().toLocaleDateString('en-CA') + 'T00:00:00')

/** A yyyy-mm-dd date at midnight. */
export const asDate = (iso: string) => new Date(`${iso}T00:00:00`)

export const longDate = (d: Date) => d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long' })

/** Whole days from today to a date (negative once it has passed). */
export const daysUntil = (d: Date) => Math.round((d.getTime() - today().getTime()) / DAY)

/**
 * The shop's lead times, earliest order first, and for a wedding date the
 * day each piece should be ordered by. Empty without lead times or bridal
 * work, which is how the dated sections know to hide.
 */
export function useLeadTimes() {
  const { boutique } = useBoutique()
  const { doesBridal } = useBridal()
  const items = doesBridal ? [...(boutique.leadTimes ?? [])].sort((a, b) => b.weeks - a.weeks) : []
  return {
    items,
    /** Each piece with its order-by date for a wedding on `wedding`. */
    plan: (wedding: Date) => items.map((l) => ({ ...l, by: new Date(wedding.getTime() - l.weeks * 7 * DAY) })),
  }
}
