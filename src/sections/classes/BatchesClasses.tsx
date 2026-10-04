// src/sections/classes/BatchesClasses.tsx
// Upcoming batches: every class with a start date still to come, soonest
// first, the date set large beside the class name, length and level, and
// a link to ask for a seat. (Lab: class N, "Upcoming batches", without the
// lab's seats left, which the config doesn't hold.)
//
// From `classes`; only batches that haven't started. Hides when none have a
// future date. No motion.

import { IconArrowRight } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'

export default function BatchesClasses() {
  const { boutique } = useBoutique()
  const today = new Date().toLocaleDateString('en-CA')
  const batches = (boutique.classes ?? []).filter((c) => c.nextBatch && c.nextBatch >= today).sort((a, b) => a.nextBatch!.localeCompare(b.nextBatch!))
  if (!batches.length) return null

  return (
    <section id="batches" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Next batches</h2>
        <ul className="mt-12 border-b border-ink/15">
          {batches.map((c) => {
            const date = new Date(`${c.nextBatch}T00:00:00`)
            return (
              <li key={c.name} className="border-t border-ink/15">
                <a
                  href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like a seat in the ${c.name} class starting ${date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-[5rem_1fr_auto] items-center gap-x-5 py-6 md:grid-cols-[8rem_1fr_auto] md:gap-x-10"
                >
                  <span className="text-primary-ink">
                    <span className="t-1 block leading-none tabular-nums">{date.getDate()}</span>
                    <span className="t-small">{date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</span>
                  </span>
                  <span>
                    <span className="t-3 block">{c.name}</span>
                    <span className="t-small text-muted">{[c.level, c.length].filter(Boolean).join(' · ')}</span>
                  </span>
                  <IconArrowRight size={22} stroke={1.5} aria-hidden="true" className="text-primary-ink transition-transform duration-300 ease-stitch group-hover:translate-x-1" />
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
