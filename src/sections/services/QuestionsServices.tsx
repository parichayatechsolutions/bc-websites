// src/sections/services/QuestionsServices.tsx
// Prices as the questions people ask: "What does a blouse cost?", "How long
// does it take?", "Can I get it sooner?", each opening to the answer from
// their own data. (Lab: services X, "Price questions".)
//
// Prices only with permission; delivery from `pricing.deliveryDays` and
// express from `pricing.express`. Needs two questions; hides otherwise.
// The answers open with a CSS height transition (faqShared).

import { useBoutique } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import { Accordion, AskOnWhatsApp, type IQuestion } from '../faq/faqShared'
import { PRICE_NOTE } from './servicesShared'

export default function QuestionsServices() {
  const { boutique } = useBoutique()
  const { pricing, permissions } = boutique
  const prices = permissions.showPrices ? (pricing?.startingAt ?? []) : []
  const questions: IQuestion[] = [
    ...prices.map((p) => ({ question: /s$/i.test(p.item) ? `What do ${p.item.toLowerCase()} cost?` : `What does a ${p.item.toLowerCase()} cost?`, answer: `From ${rupees(p.price)}. ${PRICE_NOTE.replace(/^Starting prices\. /, '')}` })),
    ...(pricing?.deliveryDays ? [{ question: 'How long does it take?', answer: `Usually ${pricing.deliveryDays} days.` }] : []),
    ...(pricing?.express ? [{ question: 'Can I get it sooner?', answer: `Yes, there’s express: ${pricing.express}.` }] : []),
  ].slice(0, 8)
  if (questions.length < 2) return null

  return (
    <section id="services" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[12ch] text-balance">Prices and times</h2>
        <div className="mt-10">
          <Accordion questions={questions} />
        </div>
        <AskOnWhatsApp />
      </div>
    </section>
  )
}
