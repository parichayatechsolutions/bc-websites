// src/sections/process/ThreadProcess.tsx
// The five making steps as round icon markers strung on a dashed thread:
// across the page on a computer, down it on a phone. Ties to the running
// stitch and needs no photographs. (Lab: process B, "Thread line".)
//
// Numbered, because the steps are a real sequence. Built-in step copy from
// steps.ts; the delivery line only when the config has it.
//
// Motion: the thread draws itself out once as the steps come into view.
// Reduced motion: the thread in place.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import { draw } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { STEPS } from './steps'

export default function ThreadProcess() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const { pricing } = boutique

  useMotion(root, ({ desktop }) => {
    draw('[data-thread]', { trigger: root.current, from: desktop ? 'start' : 'top' })
  })

  return (
    <section ref={root} id="process" className="section">
      <div className="wrap">
        <h2 className="t-1">From your idea to a perfect fit</h2>

        <div className="relative mt-14">
          {/* The thread: down through the markers on a phone, across them on a computer. */}
          <span
            data-thread
            aria-hidden="true"
            className="absolute top-7 bottom-7 left-7 border-l-2 border-dashed border-thread md:top-7 md:right-[10%] md:bottom-auto md:left-[10%] md:border-t-2 md:border-l-0"
          />
          <ol className="relative grid gap-10 md:grid-cols-5 md:gap-6">
          {STEPS.map(({ title, short, icon: StepIcon }, i) => (
            <li key={title} className="relative grid grid-cols-[3.5rem_1fr] gap-x-5 md:flex md:flex-col md:items-center md:text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full border-2 border-thread bg-light text-primary-ink">
                <StepIcon size={24} stroke={1.5} aria-hidden="true" />
              </span>
              <div className="md:mt-5">
                <p className="t-small text-thread">Step {i + 1}</p>
                <h3 className="t-3 mt-1">{title}</h3>
                <p className="mt-2 text-muted md:mx-auto md:max-w-[22ch]">{short}</p>
              </div>
            </li>
          ))}
          </ol>
        </div>

        {pricing?.deliveryDays && (
          <p className="mt-14 text-muted">
            Usually ready in {pricing.deliveryDays} days.{pricing.express && ` Express: ${pricing.express}.`}
          </p>
        )}
      </div>
    </section>
  )
}
