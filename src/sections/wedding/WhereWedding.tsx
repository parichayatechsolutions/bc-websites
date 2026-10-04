// src/sections/wedding/WhereWedding.tsx
// Where should I be? Dark, a slider for how many weeks are left before the
// wedding; beneath it, the pieces that should already be ordered by now and
// the ones still to come, from the shop's own lead times.
// (Lab: wed X, "Where should I be?".)
//
// Only from `leadTimes` (data sheet 6i); hides without them or bridal
// work. No motion.

import { useId, useState } from 'react'
import { IconBrandWhatsapp, IconCheck, IconClock } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useLeadTimes } from './weddingShared'

export default function WhereWedding() {
  const { boutique } = useBoutique()
  const { items } = useLeadTimes()
  const id = useId()
  const max = Math.max(12, ...items.map((l) => l.weeks + 2))
  const [weeks, setWeeks] = useState(8)
  if (!items.length) return null
  const now = items.filter((l) => l.weeks >= weeks)
  const soon = items.filter((l) => l.weeks < weeks)

  return (
    <section id="wedding-where" className="section bg-dark text-light">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[12ch] text-balance">Where should I be?</h2>
        <label htmlFor={id} className="t-3 mt-10 block">
          <span className="font-display text-6xl tabular-nums text-accent-on-dark">{weeks}</span> {weeks === 1 ? 'week' : 'weeks'} to go
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={max}
          value={weeks}
          onChange={(e) => setWeeks(Number(e.target.value))}
          className="mt-4 h-11 w-full cursor-pointer accent-[var(--c-accent-on-dark)]"
        />
        <div className="mt-8 grid gap-8 md:grid-cols-2" aria-live="polite">
          <div>
            <p className="t-small text-light/70">Should be ordered by now</p>
            <ul className="mt-3 space-y-3">
              {now.length ? (
                now.map((l) => (
                  <li key={l.item} className="flex gap-3">
                    <IconCheck size={20} stroke={1.75} className="mt-0.5 shrink-0 text-accent-on-dark" aria-hidden="true" />
                    <span>
                      {l.item} <span className="text-light/60">({l.weeks} weeks before)</span>
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-light/60">Nothing yet.</li>
              )}
            </ul>
          </div>
          <div>
            <p className="t-small text-light/70">Still to come</p>
            <ul className="mt-3 space-y-3">
              {soon.length ? (
                soon.map((l) => (
                  <li key={l.item} className="flex gap-3">
                    <IconClock size={20} stroke={1.75} className="mt-0.5 shrink-0 text-light/60" aria-hidden="true" />
                    <span>
                      {l.item} <span className="text-light/60">(in {weeks - l.weeks} {weeks - l.weeks === 1 ? 'week' : 'weeks'})</span>
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-light/60">Everything should be under way.</li>
              )}
            </ul>
          </div>
        </div>
        <p className="t-small mt-8 text-light/60">From our usual lead times.</p>
        <a
          href={whatsappLink(boutique, `Hi ${boutique.brand.name}, my wedding is about ${weeks} weeks away. Where should I be with my outfits?`)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-12 items-center gap-2.5 rounded-full bg-light px-7 font-semibold text-ink transition-[scale] duration-200 ease-stitch active:scale-[0.97]"
        >
          <IconBrandWhatsapp size={20} stroke={1.75} aria-hidden="true" />
          Ask where to start
        </a>
      </div>
    </section>
  )
}
