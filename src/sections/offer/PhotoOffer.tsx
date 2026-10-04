// src/sections/offer/PhotoOffer.tsx
// The offer given a section of its own: a piece of their work in an arch
// beside the offer, its conditions, its last day and a WhatsApp button.
// Any other offers running today follow as short lines.
// (Lab: offer C, "Photo card".)
//
// Offers only from the config, and only those running today
// (offerShared.ts); hides when there are none.
//
// Motion: the photo settles once as it comes into view.
// Reduced motion: the photo in place.

import { useRef } from 'react'
import { IconBrandWhatsapp, IconGift } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'
import { settle } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { untilText, useOffers } from './offerShared'

export default function PhotoOffer() {
  const { boutique } = useBoutique()
  const { offers, ask } = useOffers()
  const root = useRef<HTMLElement>(null)
  const [offer, ...more] = offers
  const photo = boutique.media.work[0] ?? boutique.media.hero.poster ?? boutique.media.hero.src

  useMotion(root, () => {
    settle('[data-photo]', { trigger: root.current })
  })

  if (!offer) return null

  return (
    <section ref={root} aria-label="Offer" className="section">
      <div className="wrap grid items-center gap-10 md:grid-cols-12 md:gap-16">
        <div className="arch aspect-[4/5] w-full max-w-md bg-paper md:col-span-5">
          <div data-photo className="h-full w-full">
            <Media file={photo} alt="" />
          </div>
        </div>

        <div className="md:col-span-7">
          <p className="flex items-center gap-2 text-primary-ink">
            <IconGift size={22} stroke={1.5} aria-hidden="true" />
            {untilText(offer.until) ?? 'Offer'}
          </p>
          <h2 className="t-2 mt-4 max-w-[22ch] text-balance">{offer.title}</h2>
          {offer.detail && <p className="mt-5 max-w-[44ch] text-muted">{offer.detail}</p>}
          <div className="mt-8">
            <Button href={ask(offer)} variant="primary" icon={IconBrandWhatsapp}>
              Ask about this offer
            </Button>
          </div>

          {more.length > 0 && (
            <ul className="mt-12 border-t border-ink/15">
              {more.map((o) => (
                <li key={o.title} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-ink/15 py-4">
                  <span>{o.title}</span>
                  {o.until && <span className="t-small text-muted">{untilText(o.until)}</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
