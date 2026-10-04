// src/sections/faq/StepFaq.tsx
// One question at a time, answered in full, with a progress bar and
// previous and next. Calm and readable on a phone. Nothing advances on its
// own. (Lab: faq Y, "One at a time".)
//
// Their own questions first, then answers from their data (faqShared);
// hides with fewer than three. The answer swaps with a CSS fade.

import { useState } from 'react'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'
import { AskOnWhatsApp, faqItems } from './faqShared'

const ROUND =
  'grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-ink/25 transition-[background-color,color,translate] duration-300 ease-stitch hover:-translate-y-1 hover:bg-ink hover:text-light active:translate-y-0'

export default function StepFaq() {
  const { boutique } = useBoutique()
  const questions = faqItems(boutique)
  const [index, setIndex] = useState(0)
  if (questions.length < 3) return null
  const q = questions[index] ?? questions[0]
  const step = (by: number) => setIndex((index + by + questions.length) % questions.length)

  return (
    <section id="questions" className="section">
      <div className="wrap max-w-3xl">
        <h2 className="t-1 max-w-[12ch] text-balance">Questions, answered</h2>
        <div className="mt-10 h-1.5 bg-ink/10" role="progressbar" aria-valuemin={1} aria-valuemax={questions.length} aria-valuenow={index + 1} aria-label="Question">
          <div className="h-full bg-primary-ink transition-[width] duration-300 ease-stitch" style={{ width: `${((index + 1) / questions.length) * 100}%` }} />
        </div>
        <div key={index} className="mt-10 min-h-56 animate-[fade-in_700ms_var(--ease-stitch)]" aria-live="polite">
          <p className="t-small text-muted">
            {index + 1} of {questions.length}
          </p>
          <h3 className="t-2 mt-3">{q.question}</h3>
          <p className="t-lead mt-5 text-muted">{q.answer}</p>
        </div>
        <div className="mt-6 flex gap-3">
          <button type="button" onClick={() => step(-1)} aria-label="Previous question" className={ROUND}>
            <IconChevronLeft size={22} stroke={1.5} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Next question" className={ROUND}>
            <IconChevronRight size={22} stroke={1.5} aria-hidden="true" />
          </button>
        </div>
        <AskOnWhatsApp />
      </div>
    </section>
  )
}
