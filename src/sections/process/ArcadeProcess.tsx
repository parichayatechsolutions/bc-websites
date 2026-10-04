// src/sections/process/ArcadeProcess.tsx
// The making steps as an arcade on their brand colour: five tall arches
// drawn in fine line, one per step, each with its Roman numeral, name and
// one line. Ceremonial, for the arch designs. (Lab: process I, "Arcade".)
//
// Numbered because the steps are a real sequence; built-in copy from
// steps.ts. Arches wrap into two columns on a phone.
//
// Motion: the arches uncover from the floor up in turn.
// Reduced motion: in place.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { STEPS } from './steps'

const ROMAN = ['I', 'II', 'III', 'IV', 'V']

export default function ArcadeProcess() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const { pricing } = boutique

  useMotion(root, () => {
    wipe('[data-arch]', { trigger: root.current })
  })

  return (
    <section ref={root} id="process" className="section bg-primary text-on-primary">
      <div className="wrap">
        <h2 className="t-1 max-w-[14ch] text-balance">How your garment is made</h2>
        <ol className="mt-14 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-5 md:gap-5">
          {STEPS.map(({ title, short }, i) => (
            <li key={title} data-arch className="flex min-h-72 flex-col items-center rounded-t-full border border-current/40 px-4 pt-14 pb-6 text-center last:col-span-2 md:last:col-span-1">
              <span className="t-2" aria-hidden="true">
                {ROMAN[i]}
              </span>
              <h3 className="t-3 mt-6">{title}</h3>
              <p className="t-small mt-3 opacity-85">{short}</p>
            </li>
          ))}
        </ol>
        {pricing?.deliveryDays && (
          <p className="mt-12 opacity-85">
            Usually ready in {pricing.deliveryDays} days.{pricing.express && ` Express: ${pricing.express}.`}
          </p>
        )}
      </div>
    </section>
  )
}
