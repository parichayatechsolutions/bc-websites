// src/sections/offer/CouponOffer.tsx
// A coupon with a perforated edge: the offer on one side, the code to show
// at the counter on the stub, with a button to copy it. (Lab: offer E,
// "Coupon ticket".)
//
// Only for an offer that has a code. Saying "show this at the counter"
// about an offer without one would invent how the shop redeems it, so this
// hides unless an offer running today has a code (offerShared.ts).
// No motion.

import { useState } from 'react'
import { IconBrandWhatsapp, IconCheck, IconCopy } from '@tabler/icons-react'
import Button from '../../components/Button'
import { untilText, useOffers } from './offerShared'

export default function CouponOffer() {
  const { offers, ask } = useOffers()
  const offer = offers.find((o) => o.code)
  const [copied, setCopied] = useState(false)
  if (!offer?.code) return null

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(offer.code!)
      setCopied(true)
    } catch {
      // No clipboard (an old browser, or an insecure page): the code is on screen to read.
    }
  }

  return (
    <section aria-label="Offer" className="section">
      <div className="wrap">
        <div className="relative grid overflow-hidden rounded-2xl border-2 border-primary-ink/40 md:grid-cols-[1fr_auto]">
          <div className="p-7 md:p-12">
            {offer.until && <p className="text-primary-ink">{untilText(offer.until)}</p>}
            <h2 className="t-2 mt-3 max-w-[22ch] text-balance">{offer.title}</h2>
            {offer.detail && <p className="mt-4 max-w-[44ch] text-muted">{offer.detail}</p>}
            <div className="mt-8">
              <Button href={ask(offer)} variant="primary" icon={IconBrandWhatsapp}>
                Book on WhatsApp
              </Button>
            </div>
          </div>

          {/* The stub: a dashed tear line with a notch at each end. */}
          <div className="relative flex flex-col items-start justify-center gap-3 border-t-2 border-dashed border-primary-ink/40 bg-paper p-7 md:min-w-72 md:items-center md:border-t-0 md:border-l-2 md:p-12 md:text-center">
            <span aria-hidden="true" className="absolute -top-3 -left-3 h-6 w-6 rounded-full border-2 border-primary-ink/40 bg-light md:-top-3 md:-left-3" />
            <span aria-hidden="true" className="absolute -top-3 -right-3 h-6 w-6 rounded-full border-2 border-primary-ink/40 bg-light md:top-auto md:-bottom-3 md:-left-3 md:right-auto" />
            <p className="t-small text-muted">Show this code at the counter</p>
            <p className="t-2 tracking-wide text-primary-ink break-all">{offer.code}</p>
            <button
              type="button"
              onClick={copy}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-ink/25 px-5 transition-[border-color,scale] duration-200 ease-stitch hover:border-ink active:scale-[0.97]"
            >
              {copied ? <IconCheck size={18} stroke={1.75} aria-hidden="true" /> : <IconCopy size={18} stroke={1.75} aria-hidden="true" />}
              <span aria-live="polite">{copied ? 'Copied' : 'Copy code'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
