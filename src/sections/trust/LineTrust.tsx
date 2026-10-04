// src/sections/trust/LineTrust.tsx
// One slim line of proof, made for just under the hero: rating, the year
// they started, made to measure, delivery, express. (Lab: trust Q, "Chip
// row".)
//
// The lab drew these as outlined pills. Pills are this library's button
// shape, so a row of them reads as tappable; here they're plain icon-and-
// text items instead, because nothing in the row does anything.
//
// Only what the config holds (see trustFacts.ts); hides below two items.
// No motion: it's read in a glance.

import { useBoutique } from '../../app/BoutiqueContext'
import { trustLine } from './trustFacts'

export default function LineTrust() {
  const { boutique } = useBoutique()
  const line = trustLine(boutique)

  if (line.length < 2) return null

  return (
    <section aria-label="Why customers choose us" className="band border-y border-ink/10 bg-paper">
      <ul className="wrap flex flex-wrap items-center gap-x-8 gap-y-3 md:justify-between">
        {line.map(({ icon: ItemIcon, text }) => (
          <li key={text} className="flex items-center gap-2">
            <ItemIcon size={20} stroke={1.5} className="shrink-0 text-primary-ink" aria-hidden="true" />
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
