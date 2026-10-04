// src/sections/bridal/AccordionBridal.tsx
// Bridal packages as rows that open: each row shows the package's name and
// starting price, and opens to list what's included with a button to ask.
// Compact for a long page. (Lab: bridal J, "Accordion".)
//
// From `bridalPackages`, prices only with permission; hides without
// packages. Rows open with a CSS height transition.

import { useId, useState } from 'react'
import { IconBrandWhatsapp, IconCheck, IconPlus } from '@tabler/icons-react'
import { capitalise } from '../../app/text'
import Button from '../../components/Button'
import { useBridal } from './bridalShared'

export default function AccordionBridal() {
  const { packages, price, pricesShown, ask } = useBridal()
  const id = useId()
  const [open, setOpen] = useState(0)
  if (!packages.length) return null

  return (
    <section id="bridal" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[12ch] text-balance">Bridal packages</h2>
        <ul className="mt-12 border-b border-ink/15">
          {packages.map((p, i) => {
            const isOpen = i === open
            return (
              <li key={p.name} className="border-t border-ink/15">
                <h3>
                  <button
                    type="button"
                    id={`${id}-q${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`${id}-a${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex min-h-16 w-full cursor-pointer items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="t-2">{p.name}</span>
                    <span className="flex shrink-0 items-center gap-4">
                      {price(p) && <span className="hidden text-primary-ink sm:inline">{price(p)}</span>}
                      <IconPlus size={22} stroke={1.5} aria-hidden="true" className={`text-primary-ink transition-transform duration-300 ease-stitch ${isOpen ? 'rotate-45' : ''}`} />
                    </span>
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
                    <div className="pb-8">
                      {price(p) && <p className="text-primary-ink sm:hidden">{price(p)}</p>}
                      <ul className="mt-3 space-y-2">
                        {p.includes.map((item) => (
                          <li key={item} className="flex gap-3">
                            <IconCheck size={20} stroke={1.75} className="mt-1 shrink-0 text-primary-ink" aria-hidden="true" />
                            {capitalise(item)}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6">
                        <Button href={ask(p)} variant="outline-dark" icon={IconBrandWhatsapp}>
                          Ask about {p.name}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
        {pricesShown && <p className="t-small mt-6 text-muted">Starting prices. The final price depends on your design and fabric.</p>}
      </div>
    </section>
  )
}
