// src/sections/services/TabsServices.tsx
// What they stitch behind group tabs (Women, Kids, Handwork…), the chosen
// group's items listed large, with a card beside it holding the starting
// prices, delivery and a button to ask for a price.
// (Lab: services G, "Tabs + price card".)
//
// Tabs follow the ARIA pattern (arrow keys move between them). Prices only
// with permission; the card shows delivery and the button regardless.
// Hides without services. No motion.

import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { rupees } from '../../app/text'
import Button from '../../components/Button'
import { PRICE_NOTE, useServices } from './servicesShared'

export default function TabsServices() {
  const { groups, prices, delivery, askPrice } = useServices()
  const id = useId()
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  if (!groups.length) return null
  const group = groups[active] ?? groups[0]

  const onKey = (e: KeyboardEvent) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!step) return
    e.preventDefault()
    const next = (active + step + groups.length) % groups.length
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <section id="services" className="section">
      <div className="wrap">
        <h2 className="t-1">What we stitch</h2>
        <div role="tablist" aria-label="Groups" onKeyDown={onKey} className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-b border-ink/15">
          {groups.map((g, i) => (
            <button
              key={g.title}
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
              className="-mb-px min-h-12 cursor-pointer border-b-2 border-transparent transition-colors duration-200 ease-stitch hover:text-primary-ink aria-selected:border-primary-ink aria-selected:text-primary-ink"
            >
              {g.title}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-12 md:grid-cols-12 md:gap-16">
          <ul id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab${active}`} className="space-y-3 md:col-span-7">
            {group.items.map((item) => (
              <li key={item} className="t-3">
                {item}
              </li>
            ))}
          </ul>
          <div className="md:col-span-5">
            <div className="md:sticky md:top-24 bg-primary p-7 text-on-primary md:p-8">
              {prices.length > 0 && (
                <dl className="space-y-3">
                  {prices.map(({ item, price }) => (
                    <div key={item} className="flex items-baseline justify-between gap-4">
                      <dt>{item}</dt>
                      <dd className="t-3">from {rupees(price)}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {delivery && <p className={`t-small opacity-85 ${prices.length ? 'mt-6 border-t border-current/25 pt-5' : ''}`}>{delivery}</p>}
              <div className="mt-6">
                <Button href={askPrice} icon={IconBrandWhatsapp}>
                  Ask for a price
                </Button>
              </div>
              {prices.length > 0 && <p className="t-small mt-4 opacity-75">{PRICE_NOTE}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
