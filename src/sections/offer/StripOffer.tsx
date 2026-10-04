// src/sections/offer/StripOffer.tsx
// One offer in a slim band of brand colour, with its last day and a link to
// ask about it. (Lab: offer A, "Top strip".)
//
// The lab ran it across the very top of the page; here it's a band to place
// under the hero or between sections, since a floating navigation would sit
// on top of anything above the page. Shows the first offer running today
// (offerShared.ts) and hides when there is none. No motion.

import { IconArrowRight, IconGift } from '@tabler/icons-react'
import { untilText, useOffers } from './offerShared'

export default function StripOffer() {
  const { offers, ask } = useOffers()
  const offer = offers[0]
  if (!offer) return null

  return (
    <aside aria-label="Offer" className="band bg-primary text-on-primary">
      <div className="wrap flex flex-wrap items-center gap-x-6 gap-y-3">
        <IconGift size={24} stroke={1.5} aria-hidden="true" className="shrink-0" />
        <p className="min-w-0 flex-1 basis-64">
          <span className="font-semibold">{offer.title}</span>
          {offer.until && <span className="opacity-80">. {untilText(offer.until)}</span>}
        </p>
        <a
          href={ask(offer)}
          target="_blank"
          rel="noopener noreferrer"
          className="link-stitch inline-flex min-h-11 items-center gap-2 font-semibold"
        >
          Ask on WhatsApp
          <IconArrowRight size={18} stroke={1.75} aria-hidden="true" />
        </a>
      </div>
    </aside>
  )
}
