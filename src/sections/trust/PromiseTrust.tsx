// src/sections/trust/PromiseTrust.tsx
// What a customer can count on, set beside the Google rating: made to
// measure, usual delivery, the handwork they do, how to pay, the languages
// they speak. (Lab: trust G, "Promise list".)
//
// Every promise comes from a field in the config (see trustFacts.ts), so the
// list is shorter for a boutique with less data, and hides below three.
//
// Motion: the rating's stars appear one by one.
// Reduced motion: all five stars at once.

import { useRef } from 'react'
import { IconBrandWhatsapp, IconStar, IconStarFilled } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { starsIn } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { trustPromises } from './trustFacts'

export default function PromiseTrust() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const promises = trustPromises(boutique)
  const { googleRating, googleReviewCount } = boutique.social

  useMotion(root, () => {
    starsIn('[data-star]', { trigger: root.current })
  })

  if (promises.length < 3) return null

  return (
    <section ref={root} className="section">
      <div className="wrap grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[12ch] text-balance">What you can count on</h2>

          {googleRating && (
            <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="flex gap-0.5 text-primary-ink" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((n) =>
                  n <= Math.round(googleRating) ? (
                    <IconStarFilled key={n} data-star size={20} />
                  ) : (
                    <IconStar key={n} data-star size={20} stroke={1.5} />
                  ),
                )}
              </span>
              <span className="text-muted">
                {googleRating.toFixed(1)} on Google
                {googleReviewCount && `, from ${googleReviewCount.toLocaleString('en-IN')} reviews`}
              </span>
            </p>
          )}

          <div className="mt-10">
            <Button href={whatsappLink(boutique)} variant="primary" icon={IconBrandWhatsapp}>
              Ask us on WhatsApp
            </Button>
          </div>
        </div>

        <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 md:col-span-7">
          {promises.map(({ icon: PromiseIcon, title, text }) => (
            <li key={title} className="border-t border-ink/15 pt-6">
              <PromiseIcon size={26} stroke={1.5} className="text-primary-ink" aria-hidden="true" />
              <h3 className="t-3 mt-4">{title}</h3>
              <p className="mt-2 max-w-[36ch] text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
