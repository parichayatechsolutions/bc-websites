// src/sections/process/IndexProcess.tsx
// The making steps as a typeset index: a large thread-coloured number, the
// step in the display face, and one line about it, in ruled rows. Very
// editorial, for the type-led designs. (Lab: process P, "Type index".)
//
// Numbered, because the steps are a real sequence. Built-in copy from
// steps.ts. No motion.

import { useBoutique } from '../../app/BoutiqueContext'
import { STEPS } from './steps'

export default function IndexProcess() {
  const { boutique } = useBoutique()
  const { pricing } = boutique

  return (
    <section id="process" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[14ch] text-balance">How your garment is made</h2>

        <ol className="mt-12 border-b border-ink/15">
          {STEPS.map(({ title, short }, i) => (
            <li key={title} className="grid grid-cols-[3.5rem_1fr] items-baseline gap-x-6 border-t border-ink/15 py-6 md:grid-cols-12 md:gap-x-10">
              <span className="t-1 text-thread md:col-span-2" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="t-2 md:col-span-5">{title}</h3>
              <p className="col-start-2 mt-2 text-muted md:col-span-5 md:col-start-auto md:mt-0">{short}</p>
            </li>
          ))}
        </ol>

        {pricing?.deliveryDays && (
          <p className="mt-10 text-muted">
            Usually ready in {pricing.deliveryDays} days.{pricing.express && ` Express: ${pricing.express}.`}
          </p>
        )}
      </div>
    </section>
  )
}
