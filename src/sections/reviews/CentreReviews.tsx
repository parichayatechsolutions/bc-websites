// src/sections/reviews/CentreReviews.tsx
// One review at a time, centred and set large under a big quote mark, with
// the customer's name and round buttons to move between reviews. Nothing
// advances on its own. (Lab: reviews E, "Centre quote".)
//
// Quotes as written, first names only (reviewShared). Hides without
// reviews. Switching swaps the quote with a CSS fade.

import { useState } from 'react'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { GoogleLink, ratingText, useReviews } from './reviewShared'

const ROUND =
  'grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-ink/25 transition-[background-color,color,translate] duration-300 ease-stitch hover:-translate-y-1 hover:bg-ink hover:text-light active:translate-y-0'

export default function CentreReviews() {
  const { reviews, rating, count, google } = useReviews()
  const [index, setIndex] = useState(0)
  if (!reviews.length) return null
  const review = reviews[index] ?? reviews[0]
  const step = (by: number) => setIndex((index + by + reviews.length) % reviews.length)

  return (
    <section id="reviews" className="section text-center">
      <div className="wrap flex flex-col items-center">
        <p aria-hidden="true" className="t-hero leading-none text-primary-ink">
          “
        </p>
        <figure key={index} className="animate-[fade-in_700ms_var(--ease-stitch)]" aria-live="polite">
          <blockquote className="t-2 max-w-[28ch] text-balance">{review.text}</blockquote>
          <figcaption className="mt-6 text-muted">{review.name}</figcaption>
        </figure>

        {reviews.length > 1 && (
          <div className="mt-10 flex items-center gap-4">
            <button type="button" onClick={() => step(-1)} aria-label="Previous review" className={ROUND}>
              <IconChevronLeft size={22} stroke={1.5} aria-hidden="true" />
            </button>
            <span className="t-small min-w-14 text-muted">
              {index + 1} of {reviews.length}
            </span>
            <button type="button" onClick={() => step(1)} aria-label="Next review" className={ROUND}>
              <IconChevronRight size={22} stroke={1.5} aria-hidden="true" />
            </button>
          </div>
        )}

        {rating && <p className="t-small mt-10 text-muted">{ratingText(rating, count)}</p>}
        <GoogleLink href={google} className="mt-3 text-primary-ink" />
      </div>
    </section>
  )
}
