// src/sections/faq/PanelFaq.tsx
// Pick a question from the list; its answer fills a panel of brand colour
// beside it. One answer at a time, large and easy to read.
// (Lab: faq G, "List + answer panel".)
//
// The list is a set of toggle buttons; the panel announces changes to
// screen readers. Their own questions first, then answers from their data;
// hides with fewer than three. The answer swaps with a CSS fade.

import { useState } from 'react'
import { IconChevronRight } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'
import { AskOnWhatsApp, faqItems } from './faqShared'

export default function PanelFaq() {
  const { boutique } = useBoutique()
  const questions = faqItems(boutique)
  const [index, setIndex] = useState(0)
  if (questions.length < 3) return null
  const current = questions[index] ?? questions[0]

  return (
    <section id="questions" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Questions, answered</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-12 md:gap-12">
          <ul className="border-t border-ink/15 md:col-span-6" role="group" aria-label="Questions">
            {questions.map((q, i) => (
              <li key={q.question} className="border-b border-ink/15">
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-pressed={i === index}
                  className="group flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 py-4 text-left transition-colors duration-200 ease-stitch aria-pressed:text-primary-ink"
                >
                  <span>{q.question}</span>
                  <IconChevronRight size={18} stroke={1.5} aria-hidden="true" className="shrink-0 transition-transform duration-300 ease-stitch group-hover:translate-x-1" />
                </button>
              </li>
            ))}
          </ul>
          <div className="md:col-span-6">
            <div key={index} className="animate-[fade-in_700ms_var(--ease-stitch)] bg-primary p-7 text-on-primary md:sticky md:top-24 md:p-10" aria-live="polite">
              <h3 className="t-3">{current.question}</h3>
              <p className="t-lead mt-5">{current.answer}</p>
            </div>
          </div>
        </div>
        <AskOnWhatsApp />
      </div>
    </section>
  )
}
