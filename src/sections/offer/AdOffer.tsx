// src/sections/offer/AdOffer.tsx
// The offer set like a newspaper advertisement: a double-ruled box, the
// boutique's name as the advertiser, the offer large, its conditions, the
// last day and where to find them. For the type-led designs.
// (Lab: offer P, "Print ad".)
//
// Shows the first offer running today (offerShared); hides without one.
// No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { untilText, useOffers } from './offerShared'

export default function AdOffer() {
  const { boutique } = useBoutique()
  const { offers, ask } = useOffers()
  const offer = offers[0]
  if (!offer) return null
  const branch = boutique.branches[0]

  return (
    <section aria-label="Offer" className="section">
      <div className="wrap flex justify-center">
        <div className="w-full max-w-2xl border-[6px] border-double border-ink p-7 text-center md:p-12">
          <p className="t-small font-semibold">{boutique.brand.name}</p>
          <h2 className="t-1 mt-5 text-balance">{offer.title}</h2>
          {offer.detail && <p className="mt-5 text-muted">{offer.detail}</p>}
          <div className="mx-auto mt-6 w-24 border-t border-ink" aria-hidden="true" />
          <p className="mt-6">
            {[untilText(offer.until), branch && (branch.area || branch.city)].filter(Boolean).join(' · ')}
          </p>
          {offer.code && <p className="mt-2 font-semibold tracking-wide">Code: {offer.code}</p>}
          <div className="mt-8 flex justify-center">
            <Button href={ask(offer)} variant="primary" icon={IconBrandWhatsapp}>
              Ask about this offer
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
