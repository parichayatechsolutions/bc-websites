// src/sections/offer/ArchOffer.tsx
// The offer set inside a tall temple arch of brand colour: its last day,
// the offer, its conditions and a button, centred like a shrine notice.
// (Lab: offer K, "Arch card".)
//
// Shows the first offer running today (offerShared); hides without one.
// No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import Button from '../../components/Button'
import { untilText, useOffers } from './offerShared'

export default function ArchOffer() {
  const { offers, ask } = useOffers()
  const offer = offers[0]
  if (!offer) return null

  return (
    <section aria-label="Offer" className="section">
      <div className="wrap flex justify-center">
        <div className="arch flex w-full max-w-lg flex-col items-center bg-primary px-8 pt-28 pb-12 text-center text-on-primary md:px-14 md:pt-36">
          {offer.until && <p className="t-small opacity-85">{untilText(offer.until)}</p>}
          <h2 className="t-2 mt-4 text-balance">{offer.title}</h2>
          {offer.detail && <p className="mt-5 max-w-[34ch] opacity-90">{offer.detail}</p>}
          {offer.code && <p className="mt-5 font-semibold tracking-wide">Code: {offer.code}</p>}
          <div className="mt-8">
            <Button href={ask(offer)} icon={IconBrandWhatsapp}>
              Ask about this offer
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
