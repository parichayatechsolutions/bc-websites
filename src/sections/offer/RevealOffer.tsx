// src/sections/offer/RevealOffer.tsx
// A gift card, closed, with "Tap to open"; tapping it slides the cover
// aside and shows the offer, its conditions, last day and code, with a
// button to ask. (Lab: offer Q, "Tap to reveal".)
//
// The first offer running today (offerShared); hides without one. Nothing
// is held back from screen readers: the offer is in the page either way.
// The cover slides with a CSS transition that reduced motion turns off.

import { useState } from 'react'
import { IconBrandWhatsapp, IconGift } from '@tabler/icons-react'
import Button from '../../components/Button'
import { untilText, useOffers } from './offerShared'

export default function RevealOffer() {
  const { offers, ask } = useOffers()
  const [open, setOpen] = useState(false)
  const offer = offers[0]
  if (!offer) return null

  return (
    <section id="offers" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">Something for you</h2>
          <p className="mt-4 text-muted">An offer running now.</p>
        </div>
        <div className="relative overflow-hidden rounded-2xl border-2 border-accent md:col-span-7">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-hidden={open}
            tabIndex={open ? -1 : 0}
            className={`absolute inset-0 z-10 flex cursor-pointer flex-col items-center justify-center gap-4 bg-primary text-on-primary transition-transform duration-700 ease-stitch ${open ? 'translate-x-full' : 'translate-x-0'}`}
          >
            <IconGift size={48} stroke={1.25} aria-hidden="true" />
            <span className="t-3">Tap to open</span>
            <span className="sr-only">the offer</span>
          </button>
          <div className="bg-paper p-8 md:p-12">
            <p className="t-2 max-w-[20ch] text-balance">{offer.title}</p>
            {offer.detail && <p className="mt-4 max-w-[44ch] text-muted">{offer.detail}</p>}
            <p className="t-small mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {offer.until && <span>{untilText(offer.until)}</span>}
              {offer.code && (
                <span>
                  Code <span className="font-semibold tracking-wide text-primary-ink">{offer.code}</span>
                </span>
              )}
            </p>
            <div className="mt-8">
              <Button href={ask(offer)} variant="primary" icon={IconBrandWhatsapp}>
                Ask about this offer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
