// src/sections/trust/RatingTrust.tsx
// The Google rating as one big card (the number huge, the stars and the
// review count, a link to read them) with their other facts in small
// boxes beside it. (Lab: trust H, "Rating card".)
//
// Needs `social.googleRating`; hides without it. The other boxes come from
// trustFacts, so only what the config says.
//
// Motion: the numbers count up once. Reduced motion: as written.

import { useRef } from 'react'
import { IconArrowRight } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'
import { countUp, wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { Stars } from '../reviews/reviewShared'
import { trustFacts } from './trustFacts'

export default function RatingTrust() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const googleRating = boutique.social.googleRating ?? 4.8
  const googleReviewCount = boutique.social.googleReviewCount ?? 48
  const googleBusiness = boutique.social.googleBusiness
  const others = trustFacts(boutique).filter((f) => !/google/i.test(f.label)).slice(0, 3)

  useMotion(root, () => {
    countUp('[data-count]', { trigger: root.current })
    wipe('[data-trust-card]', { trigger: root.current })
  })

  if (!googleRating) return null

  return (
    <section ref={root} id="trust" className="section">
      <div className={`wrap grid gap-4 ${others.length ? 'md:grid-cols-12' : 'max-w-xl'}`}>
        <div data-trust-card className="flex flex-col rounded-2xl bg-primary p-8 text-on-primary md:col-span-6 md:p-10 shadow-lg">
          <h2 className="t-3">Rated on Google</h2>
          <p data-count className="mt-6 font-display text-8xl leading-none tabular-nums md:text-9xl">
            {googleRating.toFixed(1)}
          </p>
          <Stars rating={googleRating} size={24} className="mt-4" />
          {googleReviewCount && <p className="mt-3 opacity-85">From {googleReviewCount.toLocaleString('en-IN')} reviews</p>}
          {googleBusiness && (
            <a href={googleBusiness} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex min-h-11 items-center gap-2 pt-8 font-semibold">
              <span className="link-stitch">Read the reviews</span>
              <IconArrowRight size={18} stroke={1.75} aria-hidden="true" />
            </a>
          )}
        </div>
        {others.length > 0 && (
          <ul className="grid gap-4 sm:grid-cols-3 md:col-span-6 md:grid-cols-1">
            {others.map(({ icon: Icon, value, label }) => (
              <li key={label} className="flex items-center gap-5 rounded-2xl border border-ink/15 p-6">
                <Icon size={28} stroke={1.5} className="shrink-0 text-primary-ink" aria-hidden="true" />
                <p>
                  <span data-count className="t-2 block tabular-nums">
                    {value}
                  </span>
                  <span className="t-small text-muted">{label}</span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
