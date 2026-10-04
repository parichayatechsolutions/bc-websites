// src/sections/services/IconServices.tsx
// What they stitch, a tab per group, each item an icon tile that asks its
// price on WhatsApp. Quick to tap on a phone. (Lab: services E, "Icon
// grid".)
//
// Their own groups and items; the icon is chosen from the item's name.
// Tabs only with more than one group. Tabs follow the ARIA tabs pattern.
// No motion.

import { useId, useRef, useState, type KeyboardEvent } from 'react'
import {
  IconBabyCarriage,
  IconHanger,
  IconNeedleThread,
  IconRulerMeasure,
  IconScissors,
  IconShirt,
  IconSparkles,
  type Icon,
} from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useServices } from './servicesShared'

function iconFor(item: string): Icon {
  if (/alter|fit|resiz/i.test(item)) return IconScissors
  if (/aari|maggam|embroider|zardo|handwork|mirror|bead/i.test(item)) return IconNeedleThread
  if (/kid|child|frock|langa|baby/i.test(item)) return IconBabyCarriage
  if (/shirt|kurta|sherwani|men/i.test(item)) return IconShirt
  if (/bridal|lehenga|designer/i.test(item)) return IconSparkles
  if (/measure/i.test(item)) return IconRulerMeasure
  return IconHanger
}

export default function IconServices() {
  const { boutique } = useBoutique()
  const { groups } = useServices()
  const id = useId()
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const [index, setIndex] = useState(0)
  if (!groups.length) return null
  const group = groups[index] ?? groups[0]
  const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1)

  const onKey = (e: KeyboardEvent) => {
    const by = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!by) return
    const next = (index + by + groups.length) % groups.length
    setIndex(next)
    tabs.current[next]?.focus()
  }

  return (
    <section id="services" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">What we stitch</h2>
        {groups.length > 1 && (
          <div role="tablist" aria-label="Kinds of work" className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-b border-ink/15" onKeyDown={onKey}>
            {groups.map((g, i) => (
              <button
                key={g.title}
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
                {g.title}
              </button>
            ))}
          </div>
        )}
        <ul
          role={groups.length > 1 ? 'tabpanel' : undefined}
          id={`${id}-p`}
          aria-labelledby={groups.length > 1 ? `${id}-t${index}` : undefined}
          className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
        >
          {group.items.map((item) => {
            const ItemIcon = iconFor(item)
            return (
              <li key={item}>
                <a
                  href={whatsappLink(boutique, `Hi ${boutique.brand.name}, what's the price for ${lower(item)}?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full min-h-32 flex-col justify-between gap-4 rounded-2xl bg-paper p-5 transition-colors duration-200 ease-stitch hover:bg-primary-ink hover:text-on-primary-ink"
                >
                  <ItemIcon size={28} stroke={1.5} className="text-primary-ink transition-colors duration-200 ease-stitch group-hover:text-on-primary-ink" aria-hidden="true" />
                  <span>
                    <span className="block font-semibold text-pretty">{item}</span>
                    <span className="t-small opacity-75">Ask the price</span>
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
