// src/sections/trust/BandTrust.tsx
// A brand-colour band between two zari borders holding their proof as a
// row of round badges, each an icon with a short fact beneath. A band,
// not a full section, for under the hero. (Lab: trust I, "Zari band".)
//
// Only facts from the config (trustLine); hides below two. No motion.

import { useBoutique } from '../../app/BoutiqueContext'
import { trustLine } from './trustFacts'

export default function BandTrust() {
  const { boutique } = useBoutique()
  const facts = trustLine(boutique)
  if (facts.length < 2) return null

  return (
    <section id="trust" aria-label="Why customers come to us" className="bg-primary text-on-primary">
      <div className="zari" aria-hidden="true" />
      <div className="band">
        <ul className="wrap flex flex-wrap justify-center gap-x-8 gap-y-6 md:justify-between">
          {facts.map(({ icon: Icon, text }) => (
            <li key={text} className="flex w-28 flex-col items-center gap-3 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full border border-accent">
                <Icon size={24} stroke={1.5} aria-hidden="true" />
              </span>
              <span className="t-small font-semibold text-balance">{text}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="zari" aria-hidden="true" />
    </section>
  )
}
