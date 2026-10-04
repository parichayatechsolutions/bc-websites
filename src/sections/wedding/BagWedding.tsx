// src/sections/wedding/BagWedding.tsx
// The wedding-day bag: a short intro that stays in view beside a ruled
// list of the small things that save an outfit on the day (safety pins,
// spare hooks, a needle and matching thread…), struck through as she packs
// them. (Lab: wed H, "Wedding-day bag".)
//
// General advice. The ticks live only on her screen. Shows only for a
// boutique that does bridal work. No motion.

import { useState } from 'react'
import { IconCheck } from '@tabler/icons-react'
import { useWedding } from './weddingShared'

const ITEMS = [
  'Safety pins, large and small',
  'Spare blouse hooks',
  'A needle and thread in each outfit’s colour',
  'Double-sided fabric tape',
  'Dupatta and saree pins',
  'A spare petticoat drawstring',
  'Flat shoes for between functions',
  'A small steamer or a pressed hanky',
]

export default function BagWedding() {
  const { doesBridal } = useWedding()
  const [packed, setPacked] = useState<string[]>([])
  if (!doesBridal) return null
  const toggle = (item: string) => setPacked(packed.includes(item) ? packed.filter((p) => p !== item) : [...packed, item])

  return (
    <section id="wedding-bag" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="self-start md:sticky md:top-24 md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">The wedding-day bag</h2>
          <p className="t-lead mt-5 max-w-[30ch] text-muted">The small things that save an outfit when a hook gives way at the sangeet.</p>
          <p className="t-small mt-6 tabular-nums text-muted" aria-live="polite">
            {packed.length} of {ITEMS.length} packed
          </p>
        </div>
        <ul className="border-t border-ink/15 md:col-span-7">
          {ITEMS.map((item) => {
            const on = packed.includes(item)
            return (
              <li key={item} className="border-b border-ink/15">
                <button type="button" onClick={() => toggle(item)} aria-pressed={on} className="group flex min-h-14 w-full cursor-pointer items-center gap-4 py-3 text-left">
                  <span
                    aria-hidden="true"
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-colors duration-200 ease-stitch ${on ? 'border-primary-ink bg-primary-ink text-on-primary-ink' : 'border-ink/30 group-hover:border-ink'}`}
                  >
                    {on && <IconCheck size={16} stroke={2} />}
                  </span>
                  <span className={`t-3 transition-colors duration-200 ease-stitch ${on ? 'text-muted line-through' : ''}`}>{item}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
