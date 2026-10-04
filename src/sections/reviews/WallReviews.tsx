// src/sections/reviews/WallReviews.tsx
// A wall of what customers wrote, in columns at their natural lengths on a
// warm ground, the rating at the top. For a boutique with plenty of reviews.
// (Lab: reviews D, "Quote wall".)
//
// Quotes as written, first names only, no stars on single reviews
// (reviewShared.tsx). Hides with fewer than three reviews, where a wall
// would look empty; QuoteReviews or SealReviews suit fewer.
//
// Motion: the rating's stars appear one by one. Reduced motion: in place.

import { useRef } from 'react'
import { starsIn } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { GoogleLink, ratingText, Stars, useReviews } from './reviewShared'

export default function WallReviews() {
  const { reviews, rating, count, google } = useReviews()
  const root = useRef<HTMLElement>(null)

  useMotion(root, () => {
    starsIn('[data-star]', { trigger: root.current })
  })

  if (reviews.length < 3) return null

  return (
    <section ref={root} id="reviews" className="section bg-paper">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="t-1 max-w-[14ch] text-balance">What customers say</h2>
          {rating && (
            <p className="flex flex-wrap items-center gap-3">
              <Stars rating={rating} className="text-primary-ink" />
              <span className="text-muted">{ratingText(rating, count)}</span>
            </p>
          )}
        </div>

        <ul className="mt-12 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4 [&>li]:break-inside-avoid">
          {reviews.map((r) => (
            <li key={r.name + r.text}>
              <figure className="border border-ink/10 bg-light p-6 md:p-8">
                <blockquote className="t-3">“{r.text}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 text-muted">
                  <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-sm text-on-primary">
                    {r.name.charAt(0).toUpperCase()}
                  </span>
                  {r.name}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <GoogleLink href={google} className="mt-8 text-primary-ink" />
      </div>
    </section>
  )
}
