// src/sections/bridal/TabBridal.tsx
// One bridal package at a time: tabs with the package names, and the chosen
// one in full with its price, what's included and a button to ask. Easier
// to read on a phone than cards or a comparison table.
// (Lab: bridal D, "Package tabs".)
//
// Tabs follow the ARIA pattern: arrow keys move between them. A single
// package shows without tabs. Prices only with the boutique's permission;
// hides without packages in the config. No motion.

import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { IconBrandWhatsapp, IconCheck } from '@tabler/icons-react'
import { capitalise } from '../../app/text'
import Button from '../../components/Button'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { useBridal } from './bridalShared'

export default function TabBridal() {
  const { packages: rawPackages, price, pricesShown, ask } = useBridal()
  const id = useId()
  const root = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  useMotion(root, () => {
    wipe('[data-bridal-content]', { trigger: root.current })
  })

  const packages =
    rawPackages.length > 0
      ? rawPackages
      : [
          {
            name: 'Muhurtham Bridal Essence',
            includes: [
              'Designer bridal blouse with maggam/aari handwork',
              'Matching saree fall, pico and luxury kuchu tassels',
              'Two dedicated trial fittings with personal designer',
              'Priority 7-day turnaround delivery',
            ],
          },
          {
            name: 'Reception Royal Couture',
            includes: [
              'Bespoke bridal lehenga or Indo-western gown fitting',
              'Intricate zardosi, pearl, and metallic hand embroidery',
              'Dupatta draping and veil finishing',
              'Complimentary final styling consultation',
            ],
          },
        ]

  const current = packages[active] ?? packages[0]

  const onKey = (e: KeyboardEvent) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    e.preventDefault()
    const next = (active + step + packages.length) % packages.length
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <section ref={root} id="bridal" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Bridal packages</h2>

        <div data-bridal-content>


        {packages.length > 1 && (
          <div role="tablist" aria-label="Bridal packages" onKeyDown={onKey} className="mt-10 flex flex-wrap gap-2">
            {packages.map((p, i) => (
              <button
                key={p.name}
                ref={(el) => {
                  tabs.current[i] = el
                }}
                type="button"
                role="tab"
                id={`${id}-tab${i}`}
                aria-selected={i === active}
                aria-controls={`${id}-panel`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                className="min-h-11 cursor-pointer rounded-full border border-ink/25 px-5 transition-[background-color,border-color,color,scale] duration-200 ease-stitch hover:border-ink active:scale-[0.97] aria-selected:border-primary-ink aria-selected:bg-primary-ink aria-selected:text-on-primary-ink"
              >
                {p.name}
              </button>
            ))}
          </div>
        )}

        <div
          id={`${id}-panel`}
          role={packages.length > 1 ? 'tabpanel' : undefined}
          aria-labelledby={packages.length > 1 ? `${id}-tab${active}` : undefined}
          className="mt-8 grid gap-10 border-t border-ink/15 pt-10 md:grid-cols-12"
        >
          <div className="md:col-span-5">
            <h3 className="t-2 text-primary-ink">{current.name}</h3>
            {price(current) && <p className="t-3 mt-3">{price(current)}</p>}
            {pricesShown && <p className="t-small mt-6 max-w-[34ch] text-muted">Starting prices. The final price depends on your design and fabric.</p>}
          </div>
          <div className="md:col-span-7">
            {current.includes.length > 0 && (
              <ul className="space-y-4">
                {current.includes.map((item) => (
                  <li key={item} className="grid grid-cols-[1.5rem_1fr] gap-3">
                    <IconCheck size={22} stroke={1.75} className="mt-0.5 text-primary-ink" aria-hidden="true" />
                    {capitalise(item)}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-10">
              <Button href={ask(current)} variant="primary" icon={IconBrandWhatsapp}>
                Ask about this package
              </Button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}
