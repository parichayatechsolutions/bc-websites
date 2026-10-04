// src/sections/reviews/RuledReviews.tsx
// Calm and type-led: each review in its own ruled row, the words on the
// left and the customer's name on the right, the rating as a plain line
// under the heading. Suits the type-first designs.
// (Lab: reviews S, "Ruled list", without its numbers or row hover: the rows
// aren't a sequence and can't be clicked.)
//
// Quotes as written, first names only (reviewShared.tsx). Hides without
// reviews. No motion.

import { GoogleLink, ratingText, useReviews } from './reviewShared'

export default function RuledReviews() {
  const { reviews, rating, count, google } = useReviews()
  if (!reviews.length) return null

  return (
    <section id="reviews" className="section">
      <div className="wrap">
        <h2 className="t-1">In their words</h2>
        {rating && <p className="mt-4 text-muted">{ratingText(rating, count)}</p>}

        <ul className="mt-12 border-b border-ink/15">
          {reviews.map((r) => (
            <li key={r.name + r.text} className="grid gap-4 border-t border-ink/15 py-8 md:grid-cols-12 md:gap-10">
              <blockquote className="t-3 max-w-[40ch] md:col-span-9">“{r.text}”</blockquote>
              <p className="text-muted md:col-span-3 md:text-right">{r.name}</p>
            </li>
          ))}
        </ul>

        <GoogleLink href={google} className="mt-8 text-primary-ink" />
      </div>
    </section>
  )
}
