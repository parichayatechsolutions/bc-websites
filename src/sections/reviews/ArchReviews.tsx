// src/sections/reviews/ArchReviews.tsx
// One review at a time inside a tall arch of brand colour, like words
// carved over a temple door, with buttons to read the next. Nothing
// advances on its own. (Lab: reviews T, "Arch quote".)
//
// Quotes as written, first names only (reviewShared). Hides without
// reviews. The quote swaps with a CSS fade.

import { useState } from 'react'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { GoogleLink, ratingText, useReviews } from './reviewShared'

const ROUND =
  'grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-current/40 transition-[background-color,translate] duration-300 ease-stitch hover:-translate-y-1 hover:bg-on-primary/10 active:translate-y-0'

export default function ArchReviews() {
  const { reviews, rating, count, google } = useReviews()
  const [index, setIndex] = useState(0)
  if (!reviews.length) return null
  const r = reviews[index] ?? reviews[0]
  const step = (by: number) => setIndex((index + by + reviews.length) % reviews.length)

  return (
    <section id="reviews" className="section">
      <div className="wrap flex flex-col items-center">
        <div className="arch flex w-full max-w-xl flex-col items-center bg-primary px-8 pt-28 pb-12 text-center text-on-primary md:px-14 md:pt-36">
          <figure key={index} className="animate-[fade-in_700ms_var(--ease-stitch)]" aria-live="polite">
            <blockquote className="t-2 text-balance">“{r.text}”</blockquote>
            <figcaption className="mt-6 opacity-80">{r.name}</figcaption>
          </figure>
          {reviews.length > 1 && (
            <div className="mt-10 flex gap-3">
              <button type="button" onClick={() => step(-1)} aria-label="Previous review" className={ROUND}>
                <IconChevronLeft size={22} stroke={1.5} aria-hidden="true" />
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Next review" className={ROUND}>
                <IconChevronRight size={22} stroke={1.5} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
        {rating && <p className="t-small mt-8 text-muted">{ratingText(rating, count)}</p>}
        <GoogleLink href={google} className="mt-2 text-primary-ink" />
      </div>
    </section>
  )
}
