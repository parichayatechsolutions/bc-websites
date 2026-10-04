// src/sections/reviews/ChatReviews.tsx
// What customers said, as messages arriving in a chat: each review a
// bubble with the customer's initial and name, the way most of them reached
// the boutique in the first place. (Lab: reviews G, "Chat bubbles".)
//
// Quotes as written, first names only, no stars on single reviews
// (reviewShared). Hides without reviews. No motion.

import { GoogleLink, ratingText, useReviews } from './reviewShared'

export default function ChatReviews() {
  const { reviews, rating, count, google } = useReviews()
  if (!reviews.length) return null

  return (
    <section id="reviews" className="section">
      <div className="wrap max-w-3xl">
        <h2 className="t-1 max-w-[14ch] text-balance">What customers wrote to us</h2>
        {rating && <p className="mt-4 text-muted">{ratingText(rating, count)}</p>}
        <ul className="mt-10 space-y-5 rounded-2xl bg-paper p-5 md:p-8">
          {reviews.slice(0, 6).map((r, i) => (
            <li key={r.name + r.text} className={`flex items-end gap-3 ${i % 2 ? 'md:ml-16' : ''}`}>
              <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-sm text-on-primary">
                {r.name.charAt(0).toUpperCase()}
              </span>
              <figure className="max-w-[85%] rounded-2xl rounded-bl-none bg-light p-4">
                <figcaption className="t-small font-semibold text-primary-ink">{r.name}</figcaption>
                <blockquote className="mt-1">{r.text}</blockquote>
              </figure>
            </li>
          ))}
        </ul>
        <GoogleLink href={google} className="mt-6 text-primary-ink" />
      </div>
    </section>
  )
}
