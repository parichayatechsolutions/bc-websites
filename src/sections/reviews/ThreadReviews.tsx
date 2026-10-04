// src/sections/reviews/ThreadReviews.tsx
// Reviews strung along a dashed thread with a gold knot at each, falling
// left and right of the thread on a computer and down one side on a phone.
// (Lab: reviews K, "Thread timeline".)
//
// Quotes as written, first names only (reviewShared); up to six. The
// Google rating above when there is one. Hides without reviews.
//
// Motion: the thread draws itself down once. Reduced motion: in place.

import { useRef } from 'react'
import { draw } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { GoogleLink, ratingText, Stars, useReviews } from './reviewShared'

export default function ThreadReviews() {
  const { reviews, rating, count, google } = useReviews()
  const root = useRef<HTMLElement>(null)
  const shown = reviews.slice(0, 6)

  useMotion(root, () => {
    draw('[data-thread]', { trigger: root.current, from: 'top' })
  })

  if (!shown.length) return null

  return (
    <section ref={root} id="reviews" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance md:mx-auto md:text-center">What customers say</h2>
        {rating && (
          <div className="mt-5 flex items-center gap-3 text-primary-ink md:justify-center">
            <Stars rating={rating} />
            <p className="text-muted">{ratingText(rating, count)}</p>
          </div>
        )}
        <div className="relative mt-14">
          <span data-thread aria-hidden="true" className="absolute top-2 bottom-2 left-[7px] border-l-2 border-dashed border-thread md:left-1/2 md:-translate-x-1/2" />
          <ul className="relative space-y-10 md:space-y-4">
            {shown.map((r, i) => (
              <li key={r.name + i} className={`relative pl-10 md:w-1/2 md:pl-0 ${i % 2 ? 'md:ml-auto md:pl-12' : 'md:pr-12 md:text-right'}`}>
                <span
                  aria-hidden="true"
                  className={`absolute top-2 left-0 h-4 w-4 rounded-full bg-accent ring-4 ring-light ${i % 2 ? 'md:left-0 md:-translate-x-1/2' : 'md:right-0 md:left-auto md:translate-x-1/2'}`}
                />
                <figure>
                  <blockquote className="t-lead">“{r.text}”</blockquote>
                  <figcaption className="mt-3 font-semibold text-primary-ink">{r.name.split(' ')[0]}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
        {google && (
          <div className="mt-12 md:text-center">
            <GoogleLink href={google} />
          </div>
        )}
      </div>
    </section>
  )
}
