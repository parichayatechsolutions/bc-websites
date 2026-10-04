// src/sections/trust/PaperTrust.tsx
// "By the numbers", set like a newspaper: a ruled masthead with the
// boutique's name, then each fact as a column with its figure set large
// and its label beneath, ruled apart. For the type-led designs.
// (Lab: trust P, "By the numbers".)
//
// Only facts from the config (trustFacts); hides below two.
//
// Motion: the figures count up once. Reduced motion: as written.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import { countUp } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { trustFacts } from './trustFacts'

export default function PaperTrust() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const facts = trustFacts(boutique)

  useMotion(root, () => {
    countUp('[data-count]', { trigger: root.current })
  })

  if (facts.length < 2) return null

  return (
    <section ref={root} id="trust" className="section">
      <div className="wrap">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-y-2 border-ink py-4">
          <h2 className="t-1">By the numbers</h2>
          <p className="text-muted">{boutique.brand.name}</p>
        </div>
        <dl className="grid grid-cols-2 md:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="flex flex-col-reverse justify-end border-b border-ink/15 py-8 pr-4 md:border-r md:border-b-0 md:px-6 md:first:pl-0 md:last:border-r-0">
              <dt className="mt-2 text-muted">{f.label}</dt>
              <dd data-count className="font-display text-5xl leading-none tabular-nums md:text-6xl">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
