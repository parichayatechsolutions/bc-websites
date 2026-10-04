// src/sections/faq/RowsFaq.tsx
// Every answer open, in ruled rows: the question on the left, the answer on
// the right on a computer, one under the other on a phone. Nothing to tap,
// so it reads like a printed page; suits the type-led designs.
// (Lab: faq K, "Two columns".)
//
// Their own questions first, then answers from their data (faqShared.ts);
// hides with fewer than three. No motion.

import { useBoutique } from '../../app/BoutiqueContext'
import { AskOnWhatsApp, faqItems } from './faqShared'

export default function RowsFaq() {
  const { boutique } = useBoutique()
  const questions = faqItems(boutique)
  if (questions.length < 3) return null

  return (
    <section id="questions" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[10ch] text-balance">Questions, answered</h2>
        <dl className="mt-12 border-b border-ink/15">
          {questions.map(({ question, answer }) => (
            <div key={question} className="grid gap-3 border-t border-ink/15 py-8 md:grid-cols-12 md:gap-10">
              <dt className="t-3 md:col-span-5">{question}</dt>
              <dd className="max-w-[60ch] text-muted md:col-span-7">{answer}</dd>
            </div>
          ))}
        </dl>
        <AskOnWhatsApp />
      </div>
    </section>
  )
}
