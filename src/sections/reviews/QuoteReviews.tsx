// src/sections/reviews/QuoteReviews.tsx
// What customers say, on the page's own light background: one review set
// large as the opening quote, the rest beside it, and the Google rating as a
// plain line rather than a headline number. The quiet alternative to
// RatingReviews, for a design that already has a dark section.

import { IconStarFilled } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'

export default function QuoteReviews() {
  const { boutique } = useBoutique()
  const { stats, social } = boutique
  const reviews = boutique.reviews ?? boutique.testimonials ?? []

  if (!reviews.length && !stats?.length) return null

  const [lead, ...rest] = reviews

  return (
    <section className="section border-t border-ink/10 bg-light">
      <div className="wrap">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
          <h2 className="t-1">In their words</h2>
          {social.googleRating && (
            <p className="flex items-center gap-2 text-muted">
              <IconStarFilled size={18} className="text-primary-ink" aria-hidden="true" />
              <span>
                {social.googleRating.toFixed(1)} on Google
                {social.googleReviewCount && `, from ${social.googleReviewCount.toLocaleString('en-IN')} reviews`}
              </span>
            </p>
          )}
        </div>

        {lead && (
          <figure className="mt-14 max-w-[26ch]">
            <blockquote className="t-2 text-balance">“{lead.text}”</blockquote>
            <figcaption className="mt-5 text-muted">{lead.name}</figcaption>
          </figure>
        )}

        {rest.length > 0 && (
          <ul className="mt-16 grid gap-10 border-t border-ink/15 pt-12 md:grid-cols-2 md:gap-14">
            {rest.slice(0, 4).map((t) => (
              <li key={t.name + t.text}>
                <figure>
                  <blockquote className="t-lead max-w-[34ch]">“{t.text}”</blockquote>
                  <figcaption className="mt-4 text-muted">{t.name}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        )}

        {stats && stats.length > 0 && (
          <dl className="mt-16 grid grid-cols-2 gap-y-10 border-t border-ink/15 pt-12 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-muted">{s.label}</dt>
                <dd className="t-2 text-primary-ink">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  )
}
