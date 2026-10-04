// src/sections/reviews/NumbersReviews.tsx
// The numbers first, set huge: the Google rating, the number of reviews and
// the garments they've delivered; then one review beneath to put a voice to
// them. (Lab: reviews M, "Big numbers".)
//
// Numbers only from the config; needs the rating, or at least two numbers.
// Hides otherwise.
//
// Motion: the numbers count up once. Reduced motion: as written.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import { countUp } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { GoogleLink, useReviews } from './reviewShared'

export default function NumbersReviews() {
  const { boutique } = useBoutique()
  const { reviews, rating, count, google } = useReviews()
  const root = useRef<HTMLElement>(null)
  const garments = boutique.stats?.find((s) => /garment|deliver|order|piece/i.test(s.label))

  const numbers = [
    rating && { value: rating.toFixed(1), label: 'On Google' },
    count && { value: count.toLocaleString('en-IN'), label: 'Reviews' },
    garments && { value: garments.value, label: garments.label },
  ].filter(Boolean) as { value: string; label: string }[]

  useMotion(root, () => {
    countUp('[data-count]', { trigger: root.current })
  })

  if (numbers.length < 2) return null
  const lead = reviews[0]

  return (
    <section ref={root} id="reviews" className="section bg-dark text-light">
      <div className="wrap">
        <dl className="grid gap-10 sm:grid-cols-3">
          {numbers.map(({ value, label }) => (
            <div key={label} className="flex flex-col border-t border-light/20 pt-6">
              <dt className="order-last mt-2 text-light/70">{label}</dt>
              <dd data-count className="t-hero tabular-nums text-accent-on-dark">
                {value}
              </dd>
            </div>
          ))}
        </dl>
        {lead && (
          <figure className="mt-16 max-w-3xl">
            <blockquote className="t-2 text-balance">“{lead.text}”</blockquote>
            <figcaption className="mt-5 text-light/70">{lead.name}</figcaption>
          </figure>
        )}
        <GoogleLink href={google} className="mt-8 text-accent-on-dark" />
      </div>
    </section>
  )
}
