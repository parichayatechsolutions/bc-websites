// src/sections/offer/BandOffer.tsx
// A brand-colour band between two zari borders: the offer, its last day,
// their Google rating beside it, and a link to ask. A band, not a full
// section, for between sections. (Lab: offer I, "Zari band".)
//
// The first offer running today (offerShared); hides without one. The
// rating only when they have one. No motion.

import { IconArrowRight, IconStarFilled } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'
import { untilText, useOffers } from './offerShared'

export default function BandOffer() {
  const { boutique } = useBoutique()
  const { offers, ask } = useOffers()
  const offer = offers[0]
  if (!offer) return null
  const rating = boutique.social.googleRating

  return (
    <aside aria-label="Offer" className="bg-primary text-on-primary">
      <div className="zari" aria-hidden="true" />
      <div className="band">
        <div className="wrap flex flex-wrap items-center justify-between gap-x-10 gap-y-4">
          <div className="min-w-0 basis-72">
            <p className="t-3">{offer.title}</p>
            {offer.until && <p className="t-small mt-1 opacity-80">{untilText(offer.until)}</p>}
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {rating && (
              <p className="t-small flex items-center gap-1.5 opacity-90">
                <IconStarFilled size={16} aria-hidden="true" />
                {rating.toFixed(1)} on Google
              </p>
            )}
            <a href={ask(offer)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 font-semibold">
              <span className="link-stitch">Ask on WhatsApp</span>
              <IconArrowRight size={18} stroke={1.75} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <div className="zari" aria-hidden="true" />
    </aside>
  )
}
