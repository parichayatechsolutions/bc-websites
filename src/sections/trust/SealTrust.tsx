// src/sections/trust/SealTrust.tsx
// Their facts as round seals with a double ring: the rating, years, their
// own numbers and delivery, each in its own medallion. Ceremonial where
// StatTrust is plain. (Lab: trust B, "Seal rings".)
//
// Only facts from the config (trustFacts); hides below two. Seals wrap two
// to a row on a phone.
//
// Motion: the numbers count up once as the seals come into view.
// Reduced motion: as written.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import { countUp } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { trustFacts } from './trustFacts'

export default function SealTrust() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const facts = trustFacts(boutique)

  useMotion(root, () => {
    countUp('[data-count]', { trigger: root.current })
  })

  if (facts.length < 2) return null

  return (
    <section ref={root} aria-label="At a glance" className="section">
      <dl className="wrap flex flex-wrap justify-center gap-6 md:gap-10">
        {facts.map(({ icon: FactIcon, value, label }) => (
          <div key={label} className="grid aspect-square w-40 place-items-center rounded-full border-2 border-primary-ink/50 p-1.5 md:w-52">
            <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-primary-ink/25 p-3 text-center">
              <dt className="t-small order-last mt-1 max-w-[12ch] text-muted">{label}</dt>
              <dd className="flex flex-col items-center">
                <FactIcon size={20} stroke={1.5} className="text-primary-ink" aria-hidden="true" />
                <span data-count className="t-2 mt-2 tabular-nums">
                  {value}
                </span>
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  )
}
