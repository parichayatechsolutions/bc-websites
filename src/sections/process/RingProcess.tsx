// src/sections/process/RingProcess.tsx
// The making steps around a progress ring: numbered dots to choose a step,
// the ring filling to show how far through it is, and the step's name and
// description in the middle. (Lab: process Y, "Progress ring".)
//
// Numbered because the steps are a real sequence; built-in copy from
// steps.ts. The ring fills with a CSS transition that reduced motion turns
// off; nothing advances on its own.

import { useState } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import { STEPS } from './steps'

const R = 46
const C = 2 * Math.PI * R

export default function RingProcess() {
  const { boutique } = useBoutique()
  const [active, setActive] = useState(0)
  const step = STEPS[active]
  const { pricing } = boutique

  return (
    <section id="process" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[12ch] text-balance">How your garment is made</h2>
          <ol className="mt-8 flex flex-wrap gap-2" aria-label="Steps">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={i === active}
                  aria-label={`Step ${i + 1}: ${s.title}`}
                  className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-ink/25 font-semibold transition-[background-color,border-color,color] duration-200 ease-stitch hover:border-ink aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ol>
          {pricing?.deliveryDays && (
            <p className="mt-8 text-muted">
              Usually ready in {pricing.deliveryDays} days.{pricing.express && ` Express: ${pricing.express}.`}
            </p>
          )}
        </div>
        <div className="md:col-span-7">
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
              <circle cx="50" cy="50" r={R} fill="none" strokeWidth="2" style={{ stroke: 'color-mix(in oklab, var(--c-ink) 12%, transparent)' }} />
              <circle
                cx="50"
                cy="50"
                r={R}
                fill="none"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C * (1 - (active + 1) / STEPS.length)}
                className="transition-[stroke-dashoffset] duration-700 ease-stitch"
                style={{ stroke: 'var(--c-primary-ink)' }}
              />
            </svg>
            <div className="absolute inset-[14%] flex flex-col items-center justify-center text-center" aria-live="polite">
              <p className="t-small text-thread">
                Step {active + 1} of {STEPS.length}
              </p>
              <h3 className="t-2 mt-2">{step.title}</h3>
              <p className="mt-3 max-w-[28ch] text-muted">{step.short}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
