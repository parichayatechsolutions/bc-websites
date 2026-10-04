// src/sections/offer/CardsOffer.tsx
// Several offers side by side as cards (festive, wedding season, express),
// each with its conditions, last day and a WhatsApp ask.
// (Lab: offer H, "Three offers".)
//
// Only offers running today (offerShared); needs at least two, since one
// offer belongs in StripOffer or PhotoOffer. No motion.

import { IconBrandWhatsapp, IconGift } from '@tabler/icons-react'
import { untilText, useOffers } from './offerShared'

export default function CardsOffer() {
  const { offers, ask } = useOffers()
  if (offers.length < 2) return null
  const shown = offers.slice(0, 3)

  return (
    <section id="offers" aria-label="Offers" className="section">
      <div className="wrap">
        <h2 className="t-1">Offers right now</h2>
        <ul className={`mt-12 grid gap-4 ${shown.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
          {shown.map((offer) => (
            <li key={offer.title} className="flex flex-col rounded-2xl border border-ink/15 p-7 md:p-8">
              <IconGift size={26} stroke={1.5} className="text-primary-ink" aria-hidden="true" />
              {offer.until && <p className="t-small mt-5 text-muted">{untilText(offer.until)}</p>}
              <h3 className="t-3 mt-2">{offer.title}</h3>
              {offer.detail && <p className="mt-3 mb-6 text-muted">{offer.detail}</p>}
              {offer.code && <p className="mb-6 font-semibold tracking-wide text-primary-ink">Code: {offer.code}</p>}
              <a href={ask(offer)} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex min-h-11 items-center gap-2 font-semibold text-primary-ink">
                <IconBrandWhatsapp size={18} stroke={1.75} aria-hidden="true" />
                <span className="link-stitch">Ask about this offer</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
