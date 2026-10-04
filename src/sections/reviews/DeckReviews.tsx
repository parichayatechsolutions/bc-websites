// src/sections/reviews/DeckReviews.tsx
// Dark, the reviews as a stack of cards, the top one in full and two
// peeking out behind; previous and next deal the deck. Nothing deals on
// its own. (Lab: reviews O, "Review deck".)
//
// Quotes as written, first names only (reviewShared); the Google rating
// beside when there is one. Hides without reviews. The cards move with a
// CSS transition that reduced motion turns off.

import { useState } from 'react'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { ratingText, Stars, useReviews } from './reviewShared'

const ROUND =
  'grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-light/40 transition-[background-color,color] duration-200 ease-stitch hover:bg-light hover:text-dark'
const BEHIND = ['rotate-0', 'rotate-2 translate-x-3', '-rotate-2 -translate-x-3']

export default function DeckReviews() {
  const { reviews, rating, count, google } = useReviews()
  const shown = reviews.slice(0, 8)
  const [top, setTop] = useState(0)
  if (!shown.length) return null
  const step = (by: number) => setTop((top + by + shown.length) % shown.length)

  return (
    <section id="reviews" className="section overflow-x-clip bg-dark text-light">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">What customers say</h2>
          {rating && (
            <div className="mt-5 flex items-center gap-3 text-accent-on-dark">
              <Stars rating={rating} />
              {google ? (
                <a href={google} target="_blank" rel="noopener noreferrer" className="link-stitch text-light/80">
                  {ratingText(rating, count)}
                </a>
              ) : (
                <p className="text-light/80">{ratingText(rating, count)}</p>
              )}
            </div>
          )}
          {shown.length > 1 && (
            <div className="mt-8 flex items-center gap-3">
              <button type="button" onClick={() => step(-1)} aria-label="Previous review" className={ROUND}>
                <IconChevronLeft size={22} stroke={1.5} aria-hidden="true" />
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Next review" className={ROUND}>
                <IconChevronRight size={22} stroke={1.5} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
        <div className="relative grid md:col-span-7" aria-live="polite">
          {shown.map((r, i) => {
            const place = (i - top + shown.length) % shown.length
            if (place > 2) return null
            return (
              <figure
                key={r.name + i}
                aria-hidden={place !== 0}
                className={`col-start-1 row-start-1 rounded-2xl bg-light p-8 text-ink transition-transform duration-500 ease-stitch md:p-10 ${BEHIND[place]}`}
                style={{ zIndex: 10 - place }}
              >
                <blockquote className="t-lead">“{r.text}”</blockquote>
                <figcaption className="mt-5 font-semibold text-primary-ink">{r.name.split(' ')[0]}</figcaption>
              </figure>
            )
          })}
        </div>
      </div>
    </section>
  )
}
