// src/sections/reviews/FramesReviews.tsx
// On the brand colour, each review set inside a double gold frame, like a
// framed letter on the shop wall, with the rating above.
// (Lab: reviews R, "Zari frames".)
//
// Quotes as written, first names only (reviewShared); up to four. Hides
// without reviews. No motion.

import { ratingText, useReviews } from './reviewShared'

export default function FramesReviews() {
  const { reviews, rating, count, google } = useReviews()
  const shown = reviews.slice(0, 4)
  if (!shown.length) return null

  return (
    <section id="reviews" className="bg-primary text-on-primary">
      <div className="zari" aria-hidden="true" />
      <div className="section">
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
          <ul className={`mt-12 grid gap-6 ${shown.length > 1 ? 'md:grid-cols-2' : 'max-w-2xl'}`}>
            {shown.map((r, i) => (
              <li key={r.name + i} className="border border-accent p-1.5">
                <figure className="h-full border border-accent/60 p-7 text-center md:p-10">
                  <blockquote className="t-lead">“{r.text}”</blockquote>
                  <figcaption className="mt-5 font-semibold">{r.name.split(' ')[0]}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="zari" aria-hidden="true" />
    </section>
  )
}
