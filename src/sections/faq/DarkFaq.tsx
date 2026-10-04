// src/sections/faq/DarkFaq.tsx
// Dark, the questions opening one at a time on a ruled list, the open
// answer in a lighter tone, for the darker designs. (Lab: faq D, "Dark
// accordion", without the numerals, which aren't a sequence, or the glow,
// which DESIGN.md forbids.)
//
// Their own questions first, then answers from their data (faqShared).
// Hides without any. The answers open with a CSS height transition.

import { useId, useState } from 'react'
import { IconBrandWhatsapp, IconPlus } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { faqItems } from './faqShared'

export default function DarkFaq() {
  const { boutique } = useBoutique()
  const id = useId()
  const questions = faqItems(boutique, 8)
  const [open, setOpen] = useState(0)
  if (!questions.length) return null

  return (
    <section id="faq" className="section bg-dark text-light">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-4">
          <h2 className="t-1 max-w-[10ch] text-balance">Questions people ask</h2>
          <div className="mt-8">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I have a question.`)} icon={IconBrandWhatsapp}>
              Ask us on WhatsApp
            </Button>
          </div>
        </div>
        <ul className="border-b border-light/15 md:col-span-8">
          {questions.map(({ question, answer }, i) => {
            const isOpen = i === open
            return (
              <li key={question} className="border-t border-light/15">
                <h3>
                  <button
                    type="button"
                    id={`${id}-q${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`${id}-a${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="group flex min-h-16 w-full cursor-pointer items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="t-3">{question}</span>
                    <IconPlus
                      size={22}
                      stroke={1.5}
                      aria-hidden="true"
                      className={`shrink-0 text-accent-on-dark transition-transform duration-300 ease-stitch group-hover:scale-110 ${isOpen ? 'rotate-45' : ''}`}
                    />
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
                    <p className="max-w-[60ch] pb-6 text-light/75">{answer}</p>
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
