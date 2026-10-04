// src/sections/reviews/PhotoReviews.tsx
// A piece of their work in a tall arch with a review card in brand colour
// overlapping its foot, so the words sit beside the work they're about.
// Small buttons pick between reviews. (Lab: reviews J, "Photo + review".)
//
// Quotes as written (reviewShared); the photo is their first bridal piece,
// or their first piece. Hides without reviews. No scroll motion.

import { useState } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import { photoCategory } from '../../app/photos'
import Media from '../../components/Media'
import { GoogleLink, ratingText, useReviews } from './reviewShared'

export default function PhotoReviews() {
  const { boutique } = useBoutique()
  const { reviews, rating, count, google } = useReviews()
  const [index, setIndex] = useState(0)
  if (!reviews.length) return null

  const work = boutique.media.work
  const photo = work.find((f) => photoCategory(f) === 'Bridal') ?? work[0] ?? boutique.media.hero.src
  const review = reviews[index] ?? reviews[0]

  return (
    <section id="reviews" className="section">
      <div className="wrap grid items-end gap-10 md:grid-cols-12 md:gap-0">
        <div className="md:col-span-6">
          <div className="arch aspect-[3/4] max-w-md bg-paper">
            <Media file={photo} alt="" />
          </div>
        </div>
        <div className="relative md:col-span-6 md:-ml-24 md:mb-16">
          <figure key={index} className="animate-[fade-in_700ms_var(--ease-stitch)] bg-primary p-8 text-on-primary md:p-10" aria-live="polite">
            <blockquote className="t-3">“{review.text}”</blockquote>
            <figcaption className="mt-5 opacity-80">{review.name}</figcaption>
          </figure>
          {reviews.length > 1 && (
            <div className="mt-5 flex gap-2" role="group" aria-label="Reviews">
              {reviews.slice(0, 6).map((r, i) => (
                <button
                  key={r.name + i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-pressed={i === index}
                  aria-label={`Review by ${r.name}`}
                  className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-ink/25 transition-colors duration-200 ease-stitch hover:border-ink aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
                >
                  {r.name.charAt(0).toUpperCase()}
                </button>
              ))}
            </div>
          )}
          {rating && <p className="t-small mt-6 text-muted">{ratingText(rating, count)}</p>}
          <GoogleLink href={google} className="mt-2 text-primary-ink" />
        </div>
      </div>
    </section>
  )
}
