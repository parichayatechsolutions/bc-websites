// src/sections/reviews/InitialsReviews.tsx
// A row of customers' initials in circles; tapping one shows her review
// large beneath. Nothing changes on its own. (Lab: reviews Q, "Avatar
// picker".)
//
// Initials only, never a made-up face. Quotes as written, first names only
// (reviewShared); up to eight. Hides without reviews. The review swaps with
// a CSS fade.

import { useRef, useState } from 'react'
import { rise } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { GoogleLink, ratingText, Stars, useReviews } from './reviewShared'

const initial = (name: string) => name.trim().charAt(0).toUpperCase()

export default function InitialsReviews() {
  const { reviews: rawReviews, rating, count, google } = useReviews()
  const root = useRef<HTMLElement>(null)

  const fallbackReviews = [
    { name: 'Priya S.', text: 'The bridal blouse fitting was absolutely perfect on the very first trial. The embroidery detailing and neckline finish exceeded all my expectations.' },
    { name: 'Ananya R.', text: 'Delivered my festive lehenga right on schedule. Truly professional couture craftsmanship, flawless stitching and personalized attention.' },
    { name: 'Deepa M.', text: 'Best designer boutique experience. Precise fit, patient consultations, and impeccable handwork. Highly recommend for any bride!' },
  ]

  const reviews = rawReviews.length > 0 ? rawReviews : fallbackReviews
  const shown = reviews.slice(0, 8)
  const [index, setIndex] = useState(0)

  useMotion(root, () => {
    rise('[data-initial-card]', { trigger: root.current })
  })

  if (!shown.length) return null
  const review = shown[index] ?? shown[0]

  return (
    <section ref={root} id="reviews" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1">What customers say</h2>
        {rating && (
          <div className="mt-5 flex items-center gap-3 text-primary-ink">
            <Stars rating={rating} />
            <p className="text-muted">{ratingText(rating, count)}</p>
          </div>
        )}
        {shown.length > 1 && (
          <div className="mt-10 flex flex-wrap gap-3" role="group" aria-label="Choose a review">
            {shown.map((r, i) => (
              <button
                key={r.name + i}
                type="button"
                data-initial-card
                onClick={() => setIndex(i)}
                aria-pressed={i === index}
                aria-label={`Review by ${r.name.split(' ')[0]}`}
                className="t-3 grid h-14 w-14 cursor-pointer place-items-center rounded-full bg-paper text-primary-ink transition-[background-color,color,scale] duration-200 ease-stitch hover:scale-105 aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
              >
                {initial(r.name)}
              </button>
            ))}
          </div>
        )}
        <figure key={index} className="mt-10 animate-[fade-in_700ms_var(--ease-stitch)] border-t border-ink/15 pt-10" aria-live="polite">
          <blockquote className="t-2 max-w-[34ch] text-pretty">“{review.text}”</blockquote>
          <figcaption className="mt-5 font-semibold text-primary-ink">{review.name.split(' ')[0]}</figcaption>
        </figure>
        <GoogleLink href={google} className="mt-10" />
      </div>
    </section>
  )
}
