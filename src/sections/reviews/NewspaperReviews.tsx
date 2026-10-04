// src/sections/reviews/NewspaperReviews.tsx
// Customer reports, set like a newspaper page: a ruled masthead, the
// first review as the headline quote, the rest in columns with a drop cap
// each, signed with the customer's name. For the type-led designs.
// (Lab: reviews P, "Newspaper".)
//
// Quotes as written, first names only (reviewShared). Hides without
// reviews. No motion.

import { useBoutique } from '../../app/BoutiqueContext'
import { GoogleLink, ratingText, useReviews } from './reviewShared'

export default function NewspaperReviews() {
  const { boutique } = useBoutique()
  const { reviews, rating, count, google } = useReviews()
  if (!reviews.length) return null
  const [lead, ...rest] = reviews

  return (
    <section id="reviews" className="section">
      <div className="wrap">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-y-[3px] border-double border-ink/60 py-3">
          <h2 className="t-3">Customer reports</h2>
          <p className="t-small text-muted">{rating ? ratingText(rating, count) : boutique.brand.name}</p>
        </div>
        <figure className="mt-10 border-b border-ink/15 pb-10">
          <blockquote className="t-1 max-w-[24ch] text-balance">“{lead.text}”</blockquote>
          <figcaption className="mt-5 text-muted">{lead.name}</figcaption>
        </figure>
        {rest.length > 0 && (
          <div className="mt-10 gap-10 md:columns-2 lg:columns-3">
            {rest.map((r) => (
              <figure key={r.name + r.text} className="mb-8 break-inside-avoid">
                <blockquote className="first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-[3.2em] first-letter:leading-[0.85] first-letter:text-primary-ink">
                  {r.text}
                </blockquote>
                <figcaption className="t-small mt-3 text-muted">{r.name}</figcaption>
              </figure>
            ))}
          </div>
        )}
        <GoogleLink href={google} className="mt-4 text-primary-ink" />
      </div>
    </section>
  )
}
