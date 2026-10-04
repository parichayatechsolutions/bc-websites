// src/sections/reviews/SealReviews.tsx
// The Google rating set in a round seal with a double ring, beside two
// reviews and a link to read the rest on Google. Compact, for a boutique
// with a good rating and only a few written reviews.
// (Lab: reviews F, "Rating seal", without "every review is from a real
// customer": not something we can vouch for.)
//
// Needs the Google rating; hides without it. Without written reviews the
// seal stands with the link.
//
// Motion: the stars appear one by one. Reduced motion: in place.

import { useRef } from 'react'
import { starsIn } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { GoogleLink, Stars, useReviews } from './reviewShared'

export default function SealReviews() {
  const { reviews, rating, count, google } = useReviews()
  const root = useRef<HTMLElement>(null)

  useMotion(root, () => {
    starsIn('[data-star]', { trigger: root.current })
  })

  if (!rating) return null

  return (
    <section ref={root} id="reviews" className="section">
      <div className="wrap grid items-center gap-14 md:grid-cols-12 md:gap-16">
        <div className="flex justify-center md:col-span-5">
          <div className="grid aspect-square w-64 place-items-center rounded-full border-2 border-primary-ink/60 p-2 md:w-80">
            <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-primary-ink/30 text-center">
              <p className="t-1 text-primary-ink">
                {rating.toFixed(1)}
              </p>
              <Stars rating={rating} size={22} className="mt-2 text-primary-ink" />
              <p className="t-small mt-3 max-w-[16ch] text-muted">
                On Google{count ? `, from ${count.toLocaleString('en-IN')} reviews` : ''}
              </p>
            </div>
          </div>
        </div>

        <div className="md:col-span-7">
          <h2 className="t-1 max-w-[14ch] text-balance">What customers say</h2>
          {reviews.length > 0 && (
            <ul className="mt-10 space-y-8">
              {reviews.slice(0, 2).map((r) => (
                <li key={r.name + r.text} className="border-t border-ink/15 pt-8">
                  <figure>
                    <blockquote className="t-3">“{r.text}”</blockquote>
                    <figcaption className="mt-4 text-muted">{r.name}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          )}
          <GoogleLink href={google} className="mt-8 text-primary-ink" />
        </div>
      </div>
    </section>
  )
}
