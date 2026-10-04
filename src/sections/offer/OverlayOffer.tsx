// src/sections/offer/OverlayOffer.tsx
// The offer over a full-width photograph of their work, under a dark veil
// so it reads: its last day, the offer large, its conditions and a button.
// (Lab: offer U, "Photo overlay", with a flat veil instead of a gradient.)
//
// Shows the first offer running today (offerShared); hides without one.
// No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'
import { untilText, useOffers } from './offerShared'

export default function OverlayOffer() {
  const { boutique } = useBoutique()
  const { offers, ask } = useOffers()
  const offer = offers[0]
  if (!offer) return null
  const photo = boutique.media.work[1] ?? boutique.media.work[0] ?? boutique.media.hero.src

  return (
    <section aria-label="Offer" className="relative isolate overflow-hidden py-24 text-light md:py-36">
      <div className="absolute inset-0 -z-10">
        <Media file={photo} alt="" />
        <div className="absolute inset-0 bg-dark/65" aria-hidden="true" />
      </div>
      <div className="wrap">
        {offer.until && <p className="text-accent-on-dark">{untilText(offer.until)}</p>}
        <h2 className="t-1 mt-4 max-w-[18ch] text-balance">{offer.title}</h2>
        {offer.detail && <p className="t-lead mt-6 max-w-[36ch] text-light/85">{offer.detail}</p>}
        <div className="mt-10">
          <Button href={ask(offer)} icon={IconBrandWhatsapp}>
            Ask about this offer
          </Button>
        </div>
      </div>
    </section>
  )
}
