// src/sections/saree/SeasonSaree.tsx
// Silk care, season by season: tabs for the monsoon, after the rains, the
// wedding season and summer, each with what to do for silk sarees then.
// (Lab: saree P, "Season by season".)
//
// General care, true of silk. Needs a saree service. Tabs follow the ARIA
// tabs pattern. No motion.

import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'

const SAREE = /saree|sari|fall|pico|pleat|drap|kuchu|tassel/i

const SEASONS = [
  { name: 'Monsoon', care: ['Keep silks in a dry cupboard with a pouch of silica or neem.', 'Air them on a dry day; don’t let damp sit in the folds.', 'Wear cotton and synthetics out in the rain.'] },
  { name: 'After the rains', care: ['Take every silk out and air it in the shade.', 'Refold along new lines so the creases don’t set.', 'Check the zari for dark spots and keep it wrapped.'] },
  { name: 'Wedding season', care: ['Steam rather than iron the day before.', 'Air a worn silk before you fold it away.', 'Dry clean only when it needs it, not after every wear.'] },
  { name: 'Summer', care: ['Keep silks out of direct sun to save the colour.', 'Store in muslin, never in plastic.', 'Wear cottons and linens for the hottest days.'] },
]

export default function SeasonSaree() {
  const { boutique } = useBoutique()
  const id = useId()
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const [index, setIndex] = useState(0)
  const doesSarees = boutique.services.groups.flatMap((g) => g.items).some((i) => SAREE.test(i))
  if (!doesSarees) return null
  const season = SEASONS[index]

  const onKey = (e: KeyboardEvent) => {
    const by = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!by) return
    const next = (index + by + SEASONS.length) % SEASONS.length
    setIndex(next)
    tabs.current[next]?.focus()
  }

  return (
    <section id="saree-seasons" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[14ch] text-balance">Silk care through the year</h2>
        <div role="tablist" aria-label="Seasons" className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-b border-ink/15" onKeyDown={onKey}>
          {SEASONS.map((s, i) => (
            <button
              key={s.name}
              ref={(el) => {
                tabs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`${id}-t${i}`}
              aria-selected={i === index}
              aria-controls={`${id}-p`}
              tabIndex={i === index ? 0 : -1}
              onClick={() => setIndex(i)}
              className="-mb-px min-h-12 cursor-pointer border-b-2 border-transparent transition-colors duration-200 ease-stitch hover:text-primary-ink aria-selected:border-primary-ink aria-selected:font-semibold aria-selected:text-primary-ink"
            >
              {s.name}
            </button>
          ))}
        </div>
        <ul role="tabpanel" id={`${id}-p`} aria-labelledby={`${id}-t${index}`} className="mt-8 space-y-4">
          {season.care.map((c) => (
            <li key={c} className="t-lead flex gap-4">
              <span aria-hidden="true" className="mt-3 h-2 w-2 shrink-0 rounded-full bg-thread" />
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
