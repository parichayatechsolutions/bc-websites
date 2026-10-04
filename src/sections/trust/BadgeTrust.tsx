// src/sections/trust/BadgeTrust.tsx
// A single Google rating badge: the stars, the rating and the number of
// reviews in one compact, bordered block, linking to their Google listing
// when they have one. Small enough for under a hero or beside a form.
// (Lab: trust N, "Google badge".)
//
// Needs the Google rating; hides without it. No motion.

import { IconBrandGoogle } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'
import { Stars } from '../reviews/reviewShared'

export default function BadgeTrust() {
  const { boutique } = useBoutique()
  const { googleRating, googleReviewCount, googleBusiness } = boutique.social
  if (!googleRating) return null

  const content = (
    <>
      <IconBrandGoogle size={28} stroke={1.5} className="shrink-0 text-primary-ink" aria-hidden="true" />
      <span className="flex flex-col">
        <span className="flex items-center gap-2">
          <span className="t-3 tabular-nums">{googleRating.toFixed(1)}</span>
          <Stars rating={googleRating} size={18} className="text-primary-ink" />
        </span>
        <span className="t-small text-muted">
          On Google{googleReviewCount ? `, from ${googleReviewCount.toLocaleString('en-IN')} reviews` : ''}
        </span>
      </span>
    </>
  )

  const box = 'inline-flex items-center gap-4 rounded-2xl border border-ink/15 bg-light px-5 py-4'

  return (
    <section aria-label="Google rating" className="band">
      <div className="wrap flex justify-center">
        {googleBusiness ? (
          <a href={googleBusiness} target="_blank" rel="noopener noreferrer" className={`${box} transition-colors duration-200 ease-stitch hover:border-ink`}>
            {content}
          </a>
        ) : (
          <div className={box}>{content}</div>
        )}
      </div>
    </section>
  )
}
