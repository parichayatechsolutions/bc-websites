// src/sections/faq/ArchesFaq.tsx
// Each question and its answer inside its own small temple arch with a
// fine gold edge, in a grid, all open at once. The arch family's FAQ
// without a photo. (Lab: faq L, "Arch cards".)
//
// Their own questions first, then answers from their data (faqShared);
// up to six. Hides without any. No motion.

import { useBoutique } from '../../app/BoutiqueContext'
import { AskOnWhatsApp, faqItems } from './faqShared'

export default function ArchesFaq() {
  const { boutique } = useBoutique()
  const questions = faqItems(boutique, 6)
  if (!questions.length) return null

  return (
    <section id="faq" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Questions people ask</h2>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {questions.map(({ question, answer }) => (
            <li key={question} className="arch border-2 border-accent/60 bg-paper px-7 pt-16 pb-8 text-center">
              <h3 className="t-3 text-balance text-primary-ink">{question}</h3>
              <p className="mt-4 text-muted">{answer}</p>
            </li>
          ))}
        </ul>
        <AskOnWhatsApp />
      </div>
    </section>
  )
}
