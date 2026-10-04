// src/sections/measure/QuestionsMeasure.tsx
// Questions people have about measuring themselves, answered: what to
// wear, how tight to hold the tape, inches or centimetres, measuring
// alone, between sizes. (Lab: measure X, "Questions".)
//
// General measuring advice, true anywhere; nothing here promises what the
// boutique will do. Shows only for a boutique that stitches blouses. The
// answers open with a CSS height transition (faqShared).

import { Accordion, AskOnWhatsApp } from '../faq/faqShared'
import { useBlouse } from '../blouse/blouseShared'

const QUESTIONS = [
  { question: 'What should I wear to measure?', answer: 'A thin top, or the bra you’ll wear under the blouse. Not over a kurta or anything thick.' },
  { question: 'How tight should the tape be?', answer: 'Snug but not pulling: you should just be able to slide one finger under it.' },
  { question: 'Inches or centimetres?', answer: 'Either is fine. Just say which you used when you send them.' },
  { question: 'Can I measure on my own?', answer: 'Most of them, with a mirror. Shoulder and back neck are easier with someone helping.' },
  { question: 'What if I’m between two numbers?', answer: 'Send the larger one and say so. It’s easier to take a blouse in than to let it out.' },
  { question: 'Can I measure a blouse that fits instead?', answer: 'Yes, lay it flat and measure across it, then double the width measurements. Say that’s what you did.' },
]

export default function QuestionsMeasure() {
  const { stitchesBlouses } = useBlouse()
  if (!stitchesBlouses) return null

  return (
    <section id="measure-questions" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[14ch] text-balance">Measuring yourself</h2>
        <div className="mt-10">
          <Accordion questions={QUESTIONS} />
        </div>
        <AskOnWhatsApp />
      </div>
    </section>
  )
}
