// src/sections/alterations/FixableAlterations.tsx
// Is it fixable? Each of their alterations as a question that opens
// ("Can you take in a blouse?"), the price in the row and a line to send
// a photo inside. (Lab: alter L, "Is it fixable?".)
//
// Rates from `alterationPrices`, only with permission; hides otherwise.
// The answers open with a CSS height transition.

import { useId, useState } from 'react'
import { IconPlus } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'

export default function FixableAlterations() {
  const { boutique } = useBoutique()
  const id = useId()
  const rates = boutique.permissions.showPrices ? (boutique.alterationPrices ?? []) : []
  const [open, setOpen] = useState(0)
  if (!rates.length) return null

  return (
    <section id="alteration-prices" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[12ch] text-balance">Is it fixable?</h2>
        <ul className="mt-10 border-b border-ink/15">
          {rates.map(({ item, price }, i) => {
            const isOpen = i === open
            return (
              <li key={item} className="border-t border-ink/15">
                <h3>
                  <button
                    type="button"
                    id={`${id}-q${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`${id}-a${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="group flex min-h-16 w-full cursor-pointer items-center justify-between gap-6 py-4 text-left"
                  >
                    <span className="t-3">{item}?</span>
                    <span className="flex shrink-0 items-center gap-4">
                      <span className="tabular-nums text-primary-ink">{rupees(price)}</span>
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
                    <p className="pb-5 text-muted">
                      Yes, from {rupees(price)}.{' '}
                      <a
                        href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I need this done: ${item.toLowerCase()}. Here's a photo:`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-stitch font-semibold text-primary-ink"
                      >
                        Send a photo
                      </a>
                    </p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
