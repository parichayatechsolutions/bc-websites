// src/sections/services/TilesServices.tsx
// Their starting prices as three tiles of brand colour, then every group
// of what they stitch as a row that opens to show its items.
// (Lab: services C, "Price tiles + accordion".)
//
// Tiles only with prices and permission; the groups always. Hides without
// services. Rows open with a CSS height transition.

import { useId, useState } from 'react'
import { IconBrandWhatsapp, IconPlus } from '@tabler/icons-react'
import { rupees } from '../../app/text'
import Button from '../../components/Button'
import { PRICE_NOTE, useServices } from './servicesShared'

export default function TilesServices({ id: sectionId = 'services' }: { id?: string } = {}) {
  const { groups, prices, delivery, askPrice } = useServices()
  const id = useId()
  const [open, setOpen] = useState(0)
  if (!groups.length) return null

  return (
    <section id={sectionId} className="section">
      <div className="wrap">
        <h2 className="t-1">What we stitch</h2>
        {prices.length > 0 && (
          <>
            <ul className={`mt-12 grid gap-3 ${prices.length > 2 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
              {prices.slice(0, 3).map(({ item, price }) => (
                <li key={item} className="bg-primary p-6 text-on-primary md:p-8">
                  <p className="opacity-85">{item}</p>
                  <p className="t-2 mt-2 tabular-nums">from {rupees(price)}</p>
                </li>
              ))}
            </ul>
            <p className="t-small mt-3 text-muted">{PRICE_NOTE}</p>
          </>
        )}
        <ul className="mt-12 border-b border-ink/15">
          {groups.map((g, i) => {
            const isOpen = i === open
            return (
              <li key={g.title} className="border-t border-ink/15">
                <h3>
                  <button
                    type="button"
                    id={`${id}-q${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`${id}-a${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex min-h-16 w-full cursor-pointer items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="t-3">
                      {g.title} <span className="t-small text-muted">· {g.items.length}</span>
                    </span>
                    <IconPlus size={22} stroke={1.5} aria-hidden="true" className={`shrink-0 text-primary-ink transition-transform duration-300 ease-stitch ${isOpen ? 'rotate-45' : ''}`} />
                  </button>
                </h3>
                <div
                  id={`${id}-a${i}`}
                  role="region"
                  aria-labelledby={`${id}-q${i}`}
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-300 ease-stitch ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <ul className="grid gap-x-10 gap-y-2 pb-6 sm:grid-cols-2">
                      {g.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
        {delivery && <p className="mt-6 text-muted">{delivery}</p>}
        <div className="mt-8">
          <Button href={askPrice} variant="primary" icon={IconBrandWhatsapp}>
            Ask for a price
          </Button>
        </div>
      </div>
    </section>
  )
}
