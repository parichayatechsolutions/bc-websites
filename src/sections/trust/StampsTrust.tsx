// src/sections/trust/StampsTrust.tsx
// Their facts as ink stamps, round with a dashed inner ring, set at slight
// angles like stamps on an order book: the rating, years, their numbers and
// delivery. (Lab: trust J, "Stamps".)
//
// Only facts from the config (trustFacts); hides below two. The tilt is
// fixed, not animated. No motion.

import { useBoutique } from '../../app/BoutiqueContext'
import { trustFacts } from './trustFacts'

const TILTS = ['-rotate-6', 'rotate-3', '-rotate-2', 'rotate-6']

export default function StampsTrust() {
  const { boutique } = useBoutique()
  const facts = trustFacts(boutique)
  if (facts.length < 2) return null

  return (
    <section aria-label="At a glance" className="section bg-paper">
      <dl className="wrap flex flex-wrap justify-center gap-8 md:gap-12">
        {facts.map(({ value, label }, i) => (
          <div
            key={label}
            className={`grid aspect-square w-36 place-items-center rounded-full border-2 border-primary-ink p-1.5 text-primary-ink md:w-44 ${TILTS[i % TILTS.length]}`}
          >
            <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-dashed border-primary-ink p-3 text-center">
              <dt className="t-small order-last mt-1 max-w-[11ch] font-semibold">{label}</dt>
              <dd className="t-2 tabular-nums">{value}</dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  )
}
