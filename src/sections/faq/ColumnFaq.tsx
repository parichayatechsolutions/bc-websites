// src/sections/faq/ColumnFaq.tsx
// "Ask the tailor", set as a newspaper column: a ruled masthead with the
// boutique's name, then each question in bold and its answer, running in
// two columns on a computer, the first answer opening with a drop capital.
// For the type-led designs. (Lab: faq P, "Ask the Tailor".)
//
// Their own questions first, then answers from their data (faqShared).
// Hides without any. No motion.

import { useBoutique } from '../../app/BoutiqueContext'
import { AskOnWhatsApp, faqItems } from './faqShared'

export default function ColumnFaq() {
  const { boutique } = useBoutique()
  const questions = faqItems(boutique, 8)
  if (!questions.length) return null

  return (
    <section id="faq" className="section">
      <div className="wrap">
        <div className="border-y-2 border-ink py-4 text-center">
          <h2 className="t-1">Ask the tailor</h2>
          <p className="t-small mt-1 text-muted">Questions answered by {boutique.brand.name}</p>
        </div>
        <div className="mt-10 gap-12 md:columns-2 md:[column-rule:1px_solid_color-mix(in_oklab,var(--c-ink)_15%,transparent)]">
          {questions.map((q, i) => (
            <div key={q.question} className="mb-8 break-inside-avoid">
              <h3 className="font-semibold">{q.question}</h3>
              <p
                className={`mt-2 text-muted ${
                  i === 0
                    ? 'first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-[3.2em] first-letter:leading-[0.85] first-letter:text-primary-ink'
                    : ''
                }`}
              >
                {q.answer}
              </p>
            </div>
          ))}
        </div>
        <AskOnWhatsApp />
      </div>
    </section>
  )
}
