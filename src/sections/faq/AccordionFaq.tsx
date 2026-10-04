// src/sections/faq/AccordionFaq.tsx
// Questions that open one at a time, the heading beside them on a computer
// and above them on a phone. The plainest FAQ, and the easiest to use with a
// thumb. (Lab: faq A, "Accordion", without its numbers: questions aren't a
// sequence.)
//
// Their own questions first, then answers from their data (faqShared.ts);
// hides with fewer than three.
//
// No scroll motion. Answers open with a CSS height transition.

import { useBoutique } from '../../app/BoutiqueContext'
import { Accordion, AskOnWhatsApp, faqItems } from './faqShared'

export default function AccordionFaq() {
  const { boutique } = useBoutique()
  const questions = faqItems(boutique)
  if (questions.length < 3) return null

  return (
    <section id="questions" className="section">
      <div className="wrap grid gap-10 md:grid-cols-12">
        <h2 className="t-1 max-w-[10ch] text-balance md:col-span-4">Questions, answered</h2>
        <div className="md:col-span-8">
          <Accordion questions={questions} />
          <AskOnWhatsApp />
        </div>
      </div>
    </section>
  )
}
