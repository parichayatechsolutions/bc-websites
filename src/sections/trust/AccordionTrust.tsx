// src/sections/trust/AccordionTrust.tsx
// What a customer can count on, as rows that open to explain: made to
// measure, delivery, handwork, payment, languages. Short to scan, with the
// detail a tap away. (Lab: trust X, "Promise accordion".)
//
// Every promise comes from the config (trustFacts); hides below three.
// Rows open with a CSS height transition that reduced motion turns off.

import { useId, useState } from 'react'
import { IconBrandWhatsapp, IconPlus } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { trustPromises } from './trustFacts'

export default function AccordionTrust() {
  const { boutique } = useBoutique()
  const id = useId()
  const promises = trustPromises(boutique)
  const [open, setOpen] = useState(0)
  if (promises.length < 3) return null

  return (
    <section id="promises" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[14ch] text-balance">What you can count on</h2>
        <ul className="mt-12 border-b border-ink/15">
          {promises.map(({ icon: PromiseIcon, title, text }, i) => {
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
                    className="flex min-h-16 w-full cursor-pointer items-center gap-4 py-5 text-left"
                  >
                    <PromiseIcon size={24} stroke={1.5} className="shrink-0 text-primary-ink" aria-hidden="true" />
                    <span className="t-3 flex-1">{title}</span>
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
                    <p className="pb-6 pl-10 text-muted">{text}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
        <div className="mt-10">
          <Button href={whatsappLink(boutique)} variant="primary" icon={IconBrandWhatsapp}>
            Ask us on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  )
}
