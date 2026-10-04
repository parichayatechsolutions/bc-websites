// src/sections/trust/ArchTrust.tsx
// Their proof as a row of small temple arches, each holding one fact (the
// rating, the year they started, made to measure, delivery, express) with
// its icon. The arch family's trust row. (Lab: trust K, "Arch badges".)
//
// Only facts from the config (trustLine); hides below two.
//
// Motion: the arches uncover in turn as they come into view.
// Reduced motion: in place.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { trustLine } from './trustFacts'

export default function ArchTrust() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const facts = trustLine(boutique)

  useMotion(root, () => {
    wipe('[data-arch]', { trigger: root.current })
  })

  if (facts.length < 2) return null

  return (
    <section ref={root} id="trust" aria-label="Why customers come to us" className="band">
      <div className="wrap">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {facts.map(({ icon: Icon, text }) => (
            <li key={text} data-arch className="arch flex aspect-[3/4] flex-col items-center justify-center gap-4 border-2 border-accent/60 bg-paper p-4 text-center">
              <Icon size={30} stroke={1.5} className="text-primary-ink" aria-hidden="true" />
              <span className="t-3 text-balance">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
