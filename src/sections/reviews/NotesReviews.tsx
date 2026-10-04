// src/sections/reviews/NotesReviews.tsx
// On the brand colour, reviews as paper notes pinned to a board at slight
// angles, each with a pin at the top and the customer's first name.
// (Lab: reviews H, "Pinned notes".)
//
// Quotes as written, first names only (reviewShared); up to six. The
// Google rating above when there is one. Hides without reviews. The
// angles are fixed. No motion.

import { ratingText, useReviews } from './reviewShared'

const TURNS = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', 'rotate-[-1.5deg]', 'rotate-[1.5deg]']

export default function NotesReviews() {
  const { reviews, rating, count, google } = useReviews()
  const shown = reviews.slice(0, 6)
  if (!shown.length) return null

  return (
    <section id="reviews" className="section bg-primary text-on-primary">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">What customers say</h2>
        {rating && (
          <p className="mt-4 opacity-85">
            {google ? (
              <a href={google} target="_blank" rel="noopener noreferrer" className="link-stitch">
                {ratingText(rating, count)}
              </a>
            ) : (
              ratingText(rating, count)
            )}
          </p>
        )}
        <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((r, i) => (
            <li key={r.name + i} className={`relative bg-light p-7 pt-9 text-ink ${TURNS[i % TURNS.length]}`}>
              <span aria-hidden="true" className="absolute -top-2 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full bg-accent ring-2 ring-dark/20" />
              <figure>
                <blockquote>“{r.text}”</blockquote>
                <figcaption className="mt-4 font-semibold text-primary-ink">{r.name.split(' ')[0]}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
