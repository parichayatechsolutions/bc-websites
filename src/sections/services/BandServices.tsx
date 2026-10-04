// src/sections/services/BandServices.tsx
// A brand-colour band between two zari borders with their starting prices
// as pills in a row ("Blouse from ₹800"), and a link to ask. A band, not a
// full section, for between sections. (Lab: services R, "Price band".)
//
// Starting prices only with permission; hides otherwise. Labelled as
// starting prices. No motion.

import { IconArrowRight } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'

export default function BandServices() {
  const { boutique } = useBoutique()
  const prices = boutique.permissions.showPrices ? (boutique.pricing?.startingAt ?? []) : []
  if (!prices.length) return null

  return (
    <section id="prices" aria-label="Starting prices" className="bg-primary text-on-primary">
      <div className="zari" aria-hidden="true" />
      <div className="band">
        <div className="wrap flex flex-wrap items-center justify-between gap-6">
          <ul className="flex flex-wrap gap-2">
            {prices.map((p) => (
              <li key={p.item} className="rounded-full border border-on-primary/40 px-4 py-2">
                {p.item} <span className="opacity-80">from</span> <span className="font-semibold tabular-nums">{rupees(p.price)}</span>
              </li>
            ))}
          </ul>
          <a href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like a price for `)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 font-semibold">
            <span className="link-stitch">Ask for a price</span>
            <IconArrowRight size={18} stroke={1.75} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="zari" aria-hidden="true" />
    </section>
  )
}
