// src/sections/wedding/weddingShared.ts
// What the wedding planner sections share: the functions of a wedding in
// the order they usually happen, with what a bride often wears to each
// and colours that suit it. General guidance, true of weddings, not of
// any boutique; every section offers it as something to ask about.
//
// No dates and no schedule: the dated planner waits for the shop's own
// lead times (DESIGN.md decision log).

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
