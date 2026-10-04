// src/sections/trust/CountersTrust.tsx
// Dark tiles, one per fact, each a large figure that counts up once with
// its icon and label: the rating, years stitching, their own stats, usual
// delivery. (Lab: trust O, "Counters".)
//
// Only facts from the config (trustFacts); hides below two.
//
// Motion: the figures count up once. Reduced motion: as written.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import { countUp } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { trustFacts } from './trustFacts'

export default function CountersTrust() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const facts = trustFacts(boutique)

  useMotion(root, () => {
    countUp('[data-count]', { trigger: root.current })
  })

  if (facts.length < 2) return null

  return (
    <section ref={root} id="trust" aria-label="In numbers" className="band">
      <div className="wrap">
        <dl className={`grid grid-cols-2 gap-3 ${facts.length > 2 ? 'md:grid-cols-4' : ''}`}>
          {facts.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col-reverse justify-end rounded-2xl bg-dark p-6 text-light md:p-8">
              <dt className="t-small mt-2 text-light/75">{label}</dt>
              <dd className="flex items-center gap-3">
                <Icon size={24} stroke={1.5} className="shrink-0 text-accent-on-dark" aria-hidden="true" />
                <span data-count className="font-display text-4xl leading-none tabular-nums md:text-5xl">
                  {value}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
