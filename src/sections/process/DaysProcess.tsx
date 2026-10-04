// src/sections/process/DaysProcess.tsx
// The making steps laid against their real delivery time: a scale from
// day 1 to the day it's usually ready, and a bar per step showing where it
// falls. (Lab: process G, "Day bars".)
//
// Only what the config supports: the first two steps happen on day 1 and
// the trial on the last day; cutting and stitching are shown across the days
// in between, without invented dates of their own. Needs
// `pricing.deliveryDays` (at least 3); hides without it.
//
// Motion: the bars draw out from the left once.
// Reduced motion: the bars in place.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import { draw } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { STEPS } from './steps'

export default function DaysProcess() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const days = boutique.pricing?.deliveryDays
  const express = boutique.pricing?.express

  useMotion(root, () => {
    draw('[data-bar]', { trigger: root.current, from: 'start' })
  })

  if (!days || days < 3) return null

  const day = 100 / days
  const spans = [
    { from: 0, to: day, when: 'Day 1' },
    { from: 0, to: day, when: 'Day 1' },
    { from: day, to: 100 - day, when: 'In between' },
    { from: day, to: 100 - day, when: 'In between' },
    { from: 100 - day, to: 100, when: `Day ${days}` },
  ]

  return (
    <section ref={root} id="process" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[14ch] text-balance">What happens, day by day</h2>
        <p className="mt-5 text-muted">
          Usually ready in {days} days.{express && ` Express: ${express}.`}
        </p>

        <div aria-hidden="true" className="mt-12 hidden gap-x-10 md:grid md:grid-cols-12">
          <div className="t-small flex justify-between text-muted md:col-span-8 md:col-start-5">
            <span>Day 1</span>
            <span>Day {days}</span>
          </div>
        </div>

        <ol className="mt-4 border-b border-ink/15 md:mt-3">
          {STEPS.map(({ title }, i) => (
            <li key={title} className="grid items-center gap-x-10 gap-y-3 border-t border-ink/15 py-5 md:grid-cols-12">
              <div className="flex items-baseline justify-between gap-4 md:col-span-4">
                <h3 className="t-3">{title}</h3>
                <span className="t-small shrink-0 text-muted">{spans[i].when}</span>
              </div>
              <div className="relative h-2 bg-ink/10 md:col-span-8" aria-hidden="true">
                <span
                  data-bar
                  className="absolute inset-y-0 bg-primary-ink"
                  style={{ left: `${spans[i].from}%`, width: `${spans[i].to - spans[i].from}%` }}
                />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
