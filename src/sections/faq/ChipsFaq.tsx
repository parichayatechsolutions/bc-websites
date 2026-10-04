// src/sections/faq/ChipsFaq.tsx
// Every question as a chip; tapping one shows its answer on a card below.
// Quick to scan, and only one answer to read at a time.
// (Lab: faq X, "Question chips".)
//
// Their own questions first, then answers from their data (faqShared).
// Hides without any. The answer swaps with a CSS fade.

import { useState } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import { AskOnWhatsApp, faqItems } from './faqShared'

export default function ChipsFaq() {
  const { boutique } = useBoutique()
  const questions = faqItems(boutique, 8)
  const [index, setIndex] = useState(0)
  if (!questions.length) return null
  const current = questions[index] ?? questions[0]

  return (
    <section id="faq" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[12ch] text-balance">Questions people ask</h2>
        <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Questions">
          {questions.map((q, i) => (
            <button
              key={q.question}
              type="button"
              onClick={() => setIndex(i)}
              aria-pressed={i === index}
              className="min-h-11 cursor-pointer rounded-full border border-ink/25 px-4 py-2 text-left transition-[background-color,border-color,color] duration-200 ease-stitch hover:border-ink aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
            >
              {q.question}
            </button>
          ))}
        </div>
        <div key={index} className="mt-8 animate-[fade-in_700ms_var(--ease-stitch)] rounded-2xl bg-paper p-7 md:p-10" aria-live="polite">
          <h3 className="t-3">{current.question}</h3>
          <p className="t-lead mt-4 max-w-[52ch]">{current.answer}</p>
        </div>
        <AskOnWhatsApp />
      </div>
    </section>
  )
}
