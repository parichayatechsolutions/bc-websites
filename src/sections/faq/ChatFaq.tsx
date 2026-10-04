// src/sections/faq/ChatFaq.tsx
// The questions and answers as a WhatsApp conversation: her questions on
// the right, the boutique's answers on the left, ending with a button to
// carry on the chat for real. Familiar to anyone who already shops on
// WhatsApp. (Lab: faq F, "WhatsApp chat".)
//
// Their own questions first, then answers from their data (faqShared);
// hides with fewer than three. No motion.

import { useBoutique } from '../../app/BoutiqueContext'
import Logo from '../../components/Logo'
import { AskOnWhatsApp, faqItems } from './faqShared'

export default function ChatFaq() {
  const { boutique } = useBoutique()
  const questions = faqItems(boutique, 6)
  if (questions.length < 3) return null

  return (
    <section id="questions" className="section">
      <div className="wrap max-w-3xl">
        <h2 className="t-1 max-w-[12ch] text-balance">You asked, we answered</h2>
        <div className="mt-10 rounded-2xl bg-paper p-5 md:p-8">
          <div className="flex items-center gap-3 border-b border-ink/10 pb-4">
            <Logo className="h-10 w-10 shrink-0 rounded-full" />
            <p className="min-w-0 truncate font-semibold">{boutique.brand.name}</p>
          </div>
          <dl className="mt-6 space-y-4">
            {questions.map(({ question, answer }) => (
              <div key={question} className="space-y-4">
                <dt className="ml-auto max-w-[85%] rounded-2xl rounded-tr-none bg-primary-ink p-4 text-on-primary-ink">{question}</dt>
                <dd className="max-w-[85%] rounded-2xl rounded-tl-none bg-light p-4">{answer}</dd>
              </div>
            ))}
          </dl>
        </div>
        <AskOnWhatsApp />
      </div>
    </section>
  )
}
