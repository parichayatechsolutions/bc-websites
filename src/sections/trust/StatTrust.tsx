// src/sections/trust/StatTrust.tsx
// Proof in numbers, in one ruled row: the Google rating, years stitching,
// the boutique's own stats and usual delivery time. A band rather than a
// section, so it sits between two sections without taking a whole screen.
// (Lab: trust A, "Stat strip".)
//
// Only what the config holds (see trustFacts.ts), so it hides for a
// boutique with fewer than two facts rather than padding the row.
//
// Motion: the numbers count up once as the row comes into view.
// Reduced motion: the numbers as written.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import { countUp } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { trustFacts } from './trustFacts'

const COLUMNS = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4' } as Record<number, string>

export default function StatTrust() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const facts = trustFacts(boutique)

  useMotion(root, () => {
    countUp('[data-count]', { trigger: root.current })
  })

  if (facts.length < 2) return null

  return (
    <section ref={root} aria-label="At a glance" className="band">
      <dl className={`wrap grid grid-cols-2 gap-x-6 gap-y-10 ${COLUMNS[facts.length]}`}>
        {facts.map(({ icon: FactIcon, value, label }) => (
          <div key={label} className="flex flex-col border-t border-ink/15 pt-6">
            <dt className="t-small order-last mt-1 text-muted">{label}</dt>
            <dd className="flex flex-col">
              <FactIcon size={24} stroke={1.5} className="text-primary-ink" aria-hidden="true" />
              <span data-count className="t-2 mt-4 tabular-nums">
                {value}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
