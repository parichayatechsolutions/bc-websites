// src/sections/reviews/RatingReviews.tsx
// What customers say, led by the Google rating when the boutique has one.

import { IconStar, IconStarFilled } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'

export default function RatingReviews() {
  const { boutique } = useBoutique()
  const { stats, social } = boutique
  const reviews = boutique.reviews ?? boutique.testimonials ?? []

  if (!reviews.length && !stats?.length) return null

  return (
    <section className="section bg-dark text-light">
      <div className="wrap">
        {social.googleRating && (
          <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="t-hero text-accent-on-dark">{social.googleRating.toFixed(1)}</span>
            <span className="flex gap-1 self-center text-accent-on-dark" aria-hidden="true">
              {[1, 2, 3, 4, 5].map((n) =>
                n <= Math.round(social.googleRating!) ? (
                  <IconStarFilled key={n} size={26} />
                ) : (
                  <IconStar key={n} size={26} stroke={1.5} />
                ),
              )}
            </span>
            <span className="t-lead w-full text-light/80">
              on Google
              {social.googleReviewCount && `, from ${social.googleReviewCount.toLocaleString('en-IN')} reviews`}
            </span>
          </p>
        )}

        {reviews.length > 0 && (
          <ul className="mt-20 grid gap-14 md:grid-cols-3 md:gap-10">
            {reviews.slice(0, 3).map((t) => (
              <li key={t.name + t.text}>
                <figure>
                  <blockquote className="t-3 text-light">“{t.text}”</blockquote>
                  <figcaption className="mt-5 text-light/60">{t.name}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        )}

        {stats && stats.length > 0 && (
          <dl className="mt-24 grid grid-cols-2 gap-y-10 border-t border-light/15 pt-10 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-light/70">{s.label}</dt>
                <dd className="t-2 text-accent-on-dark">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  )
}
