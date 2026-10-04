// src/sections/faq/BrandFaq.tsx
// The questions on the brand colour, opening one at a time, with a fine
// gold edge to the list and a zari border along the foot of the section.
// (Lab: faq I, "Brand accordion".)
//
// Their own questions first, then answers from their data (faqShared).
// Hides without any. The answers open with a CSS height transition.

import { useId, useState } from 'react'
import { IconBrandWhatsapp, IconPlus } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { faqItems } from './faqShared'

export default function BrandFaq() {
  const { boutique } = useBoutique()
  const id = useId()
  const questions = faqItems(boutique, 8)
  const [open, setOpen] = useState(0)
  if (!questions.length) return null

  return (
    <section id="faq" className="bg-primary text-on-primary">
      <div className="section">
        <div className="wrap max-w-4xl">
          <h2 className="t-1 max-w-[12ch] text-balance">Questions people ask</h2>
          <ul className="mt-10 border-y border-accent">
            {questions.map(({ question, answer }, i) => {
              const isOpen = i === open
              return (
                <li key={question} className="border-t border-on-primary/20 first:border-t-0">
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
                        className={`shrink-0 transition-transform duration-300 ease-stitch group-hover:scale-110 ${isOpen ? 'rotate-45' : ''}`}
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
                      <p className="max-w-[60ch] pb-6 opacity-85">{answer}</p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
          <a
            href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I have a question.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex min-h-12 items-center gap-2.5 rounded-full bg-light px-7 font-semibold text-ink transition-[scale] duration-200 ease-stitch active:scale-[0.97]"
          >
            <IconBrandWhatsapp size={20} stroke={1.75} aria-hidden="true" />
            Ask us on WhatsApp
          </a>
        </div>
      </div>
      <div className="zari" aria-hidden="true" />
    </section>
  )
}
