// src/sections/faq/CardsFaq.tsx
// Every question and its answer on its own card, in a grid, all open at
// once: quick to scan on a computer, a simple list on a phone.
// (Lab: faq E, "Card grid".)
//
// Their own questions first, then answers from their data (faqShared);
// hides with fewer than three. No motion.

import { IconHelpCircle } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'
import { AskOnWhatsApp, faqItems } from './faqShared'

export default function CardsFaq() {
  const { boutique } = useBoutique()
  const questions = faqItems(boutique)
  if (questions.length < 3) return null

  return (
    <section id="questions" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Questions, answered</h2>
        <dl className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {questions.map(({ question, answer }) => (
            <div key={question} className="rounded-2xl border border-ink/15 p-6 md:p-7">
              <IconHelpCircle size={26} stroke={1.5} className="text-primary-ink" aria-hidden="true" />
              <dt className="t-3 mt-4">{question}</dt>
              <dd className="mt-3 text-muted">{answer}</dd>
            </div>
          ))}
        </dl>
        <AskOnWhatsApp />
      </div>
    </section>
  )
}
