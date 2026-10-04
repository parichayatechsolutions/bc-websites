// src/sections/offer/BarOffer.tsx
// A slim bar pinned to the foot of the screen with their current offer,
// its last day and a link to ask, which she can close. Once closed it
// stays closed for the visit. (Lab: offer G, "Sticky bar".)
//
// The first offer running today (offerShared); renders nothing without
// one. Place it once in a design beside SiteShell, not with a floating
// WhatsApp control, which would sit on top of it.
//
// Motion: rises in once past the hero (stickyShared). Reduced motion:
// always there.

import { useRef, useState } from 'react'
import { IconBrandWhatsapp, IconX } from '@tabler/icons-react'
import { useShowAfterFirstScreen } from '../contact/stickyShared'
import { untilText, useOffers } from './offerShared'

const KEY = 'offer-bar-closed'

function wasClosed(title: string) {
  try {
    return sessionStorage.getItem(KEY) === title
  } catch {
    return false
  }
}

export default function BarOffer() {
  const { offers, ask } = useOffers()
  const root = useRef<HTMLDivElement>(null)
  const offer = offers[0]
  const [closed, setClosed] = useState(() => (offer ? wasClosed(offer.title) : true))
  useShowAfterFirstScreen(root)

  const close = () => {
    setClosed(true)
    try {
      if (offer) sessionStorage.setItem(KEY, offer.title)
    } catch {
      // Storage blocked: it stays closed until the page reloads.
    }
  }

  return (
    <div ref={root} className="pointer-events-none fixed inset-x-0 bottom-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:p-5">
      {offer && !closed && (
        <aside
          aria-label="Offer"
          className="pointer-events-auto mx-auto flex max-w-3xl items-center gap-3 rounded-full bg-primary py-2 pr-2 pl-5 text-on-primary md:gap-5 md:pl-7"
        >
          <p className="min-w-0 flex-1 py-1 leading-snug">
            <span className="font-semibold">{offer.title}</span>
            {offer.until && <span className="t-small block opacity-80 md:ml-3 md:inline">{untilText(offer.until)}</span>}
          </p>
          <a
            href={ask(offer)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ask about this offer on WhatsApp"
            className="flex h-11 shrink-0 items-center gap-2 rounded-full bg-light px-4 font-semibold text-ink transition-[scale] duration-200 ease-stitch active:scale-[0.97]"
          >
            <IconBrandWhatsapp size={20} stroke={1.75} aria-hidden="true" />
            <span className="hidden sm:inline">Ask</span>
          </a>
          <button
            type="button"
            onClick={close}
            aria-label="Close offer"
            className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full transition-colors duration-200 ease-stitch hover:bg-on-primary/15"
          >
            <IconX size={20} stroke={1.75} aria-hidden="true" />
          </button>
        </aside>
      )}
    </div>
  )
}
