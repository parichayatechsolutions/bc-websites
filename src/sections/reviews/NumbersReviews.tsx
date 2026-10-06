// src/sections/reviews/NumbersReviews.tsx
// Big numbers: Google rating, review count and garments delivered set huge;
// one featured client quote in a brand-colour card below.
// (Lab: reviews M, "Big numbers".)

import { useRef } from 'react'
import {
  IconHanger,
  IconMessageCircle,
  IconQuote,
  IconRosetteDiscountCheck,
  IconStar,
} from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'
import { countUp } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { GoogleLink, useReviews } from './reviewShared'

export default function NumbersReviews() {
  const { boutique } = useBoutique()
  const { reviews, rating, count, google } = useReviews()
  const root = useRef<HTMLElement>(null)
  const garments = boutique.stats?.find((s) => /garment|deliver|order|piece/i.test(s.label))

  const bigCards = [
    rating && {
      icon: IconStar,
      value: `${rating.toFixed(1)}★`,
      label: 'on Google',
    },
    count && {
      icon: IconMessageCircle,
      value: count.toLocaleString('en-IN'),
      label: 'reviews',
    },
    garments && {
      icon: IconHanger,
      value: garments.value,
      label: garments.label,
    },
  ].filter(Boolean) as { icon: typeof IconStar; value: string; label: string }[]

  useMotion(root, () => {
    countUp('[data-count]', { trigger: root.current })
  })

  if (bigCards.length < 2) return null
  const lead = reviews[0]

  return (
    <section ref={root} id="reviews" className="section bg-light py-16 text-ink md:py-24">
      <div className="wrap">
        {/* Top 3 Stat Cards */}
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {bigCards.map(({ icon: CardIcon, value, label }) => (
            <div
              key={label}
              className="flex flex-col gap-3 rounded-2xl bg-paper p-6 shadow-sm md:p-8"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-accent">
                <CardIcon size={24} stroke={1.8} aria-hidden="true" />
              </span>
              <dd
                data-count
                className="font-display text-4xl font-normal leading-none text-primary-ink md:text-5xl lg:text-6xl"
              >
                {value}
              </dd>
              <dt className="text-base text-muted">{label}</dt>
            </div>
          ))}
        </dl>

        {/* Lead Quote Card in Brand Colour */}
        {lead && (
          <figure className="mt-6 flex flex-wrap items-start gap-5 rounded-2xl bg-primary p-6 text-on-primary shadow-md md:mt-8 md:p-10">
            <IconQuote size={48} className="shrink-0 text-accent" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <blockquote className="font-display text-xl leading-snug font-normal md:text-2xl lg:text-3xl">
                {lead.text}
              </blockquote>

              <div className="mt-5 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-accent font-display text-lg font-bold text-on-accent">
                  {lead.name.charAt(0)}
                </span>
                <span className="flex items-center gap-1.5 font-bold">
                  {lead.name}
                  <IconRosetteDiscountCheck size={18} className="text-accent" aria-hidden="true" />
                </span>
              </div>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-light/15 px-3 py-1 text-xs font-semibold text-on-primary">
                  Fitting
                </span>
                <span className="inline-flex items-center rounded-full bg-light/15 px-3 py-1 text-xs font-semibold text-on-primary">
                  Handwork
                </span>
              </div>
            </div>
          </figure>
        )}

        {google && (
          <div className="mt-6 flex justify-end">
            <GoogleLink href={google} className="text-primary-ink hover:underline" />
          </div>
        )}
      </div>
    </section>
  )
}
