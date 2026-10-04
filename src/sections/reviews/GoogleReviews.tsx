// src/sections/reviews/GoogleReviews.tsx
// Review cards each led by the customer's initial in a circle, under the
// overall Google rating, with two buttons: read all reviews, and write one
// of your own. (Lab: reviews Y, "Google cards", with the stars on the
// overall rating only, never on a single review.)
//
// Quotes as written, first names only (reviewShared); up to six. The
// buttons need `social.googleBusiness`. Hides without reviews. No motion.

import { IconArrowRight, IconPencil } from '@tabler/icons-react'
import { ratingText, Stars, useReviews } from './reviewShared'

export default function GoogleReviews() {
  const { reviews, rating, count, google } = useReviews()
  const shown = reviews.slice(0, 6)
  if (!shown.length) return null

  return (
    <section id="reviews" className="section">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="t-1 max-w-[12ch] text-balance">What customers say</h2>
            {rating && (
              <div className="mt-4 flex items-center gap-3 text-primary-ink">
                <Stars rating={rating} />
                <p className="text-muted">{ratingText(rating, count)}</p>
              </div>
            )}
          </div>
          {google && (
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <a href={google} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 font-semibold">
                <span className="link-stitch">Read all reviews</span>
                <IconArrowRight size={18} stroke={1.75} aria-hidden="true" />
              </a>
              <a href={google} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 font-semibold text-primary-ink">
                <IconPencil size={18} stroke={1.75} aria-hidden="true" />
                <span className="link-stitch">Write a review</span>
              </a>
            </div>
          )}
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((r, i) => (
            <li key={r.name + i} className="rounded-2xl border border-ink/15 p-6">
              <figure>
                <figcaption className="flex items-center gap-3">
                  <span aria-hidden="true" className="t-3 grid h-11 w-11 place-items-center rounded-full bg-primary-ink text-on-primary-ink">
                    {r.name.trim().charAt(0).toUpperCase()}
                  </span>
                  <span className="font-semibold">{r.name.split(' ')[0]}</span>
                </figcaption>
                <blockquote className="mt-4">“{r.text}”</blockquote>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
