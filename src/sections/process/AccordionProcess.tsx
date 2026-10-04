// src/sections/process/AccordionProcess.tsx
// The making steps as a numbered list that opens one step at a time: the
// title and one line always showing, the full description on tap. Compact
// for a page with a lot on it. (Lab: process J, "Accordion".)
//
// Numbered because the steps are a real sequence; built-in copy from
// steps.ts. Opens with a CSS height transition that reduced motion turns
// off.

import { useId, useState } from 'react'
import { IconPlus } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'
import { STEPS } from './steps'

export default function AccordionProcess() {
  const { boutique } = useBoutique()
  const id = useId()
  const [open, setOpen] = useState(0)
  const { pricing } = boutique

  return (
    <section id="process" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[14ch] text-balance">How your garment is made</h2>
        <ol className="mt-12 border-b border-ink/15">
          {STEPS.map(({ title, short, body }, i) => {
            const isOpen = i === open
            return (
              <li key={title} className="border-t border-ink/15">
                <h3>
                  <button
                    type="button"
                    id={`${id}-q${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`${id}-a${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="group grid min-h-16 w-full cursor-pointer grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 py-5 text-left"
                  >
                    <span className="t-2 text-thread" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span>
                      <span className="t-3 block">{title}</span>
                      <span className="t-small text-muted">{short}</span>
                    </span>
                    <IconPlus size={22} stroke={1.5} aria-hidden="true" className={`text-primary-ink transition-transform duration-300 ease-stitch ${isOpen ? 'rotate-45' : ''}`} />
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
                    <p className="max-w-[56ch] pb-6 pl-14 text-muted">{body}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
        {pricing?.deliveryDays && (
          <p className="mt-8 text-muted">
            Usually ready in {pricing.deliveryDays} days.{pricing.express && ` Express: ${pricing.express}.`}
          </p>
        )}
      </div>
    </section>
  )
}
