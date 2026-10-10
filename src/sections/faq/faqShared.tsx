// src/sections/faq/faqShared.tsx
// The questions the FAQ sections answer, and the pieces they share.
//
// The boutique's own questions (data sheet 8b) come first, in their words.
// Then the questions every customer asks, answered from their real data:
// how long, how much, how to pay, alterations, where, languages, parking.
// Each appears only when the data holds the answer, and is skipped when
// their own list already asks it. So a boutique with an empty 8b still gets
// a useful FAQ, and nothing in it is invented.

import { useId, useState } from 'react'
import { IconBrandWhatsapp, IconPlus } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { joinList as list, rupees } from '../../app/text'
import Button from '../../components/Button'
import type { BoutiqueConfig } from '../../types/boutique'

export interface IQuestion {
  question: string
  answer: string
}

/** Their questions, then the answers their data can give. At most `max`. */
export function faqItems(b: BoutiqueConfig, max = 8): IQuestion[] {
  const own = b.faq ?? []
  const asked = (topic: RegExp) => own.some((q) => topic.test(q.question))
  const items = b.services.groups.flatMap((g) => g.items)
  const derived: (IQuestion & { topic: RegExp })[] = []
  const { pricing } = b

  if (pricing?.deliveryDays) {
    derived.push({
      topic: /how long|days|deliver|ready|time/i,
      question: 'How long does stitching take?',
      answer: `Usually ${pricing.deliveryDays} days.${pricing.express ? ` If you need it sooner, there’s express: ${pricing.express}.` : ''}`,
    })
  }
  if (b.permissions.showPrices && pricing?.startingAt?.length) {
    const prices = pricing.startingAt.map((p, i) => `${i === 0 ? p.item : p.item.toLowerCase()} from ${rupees(p.price)}`)
    derived.push({
      topic: /price|cost|charge|how much/i,
      question: 'How much does it cost?',
      answer: `${list(prices)}. The final price depends on the design and the handwork.`,
    })
  }
  if (pricing?.paymentModes?.length) {
    derived.push({ topic: /pay|upi|card|cash/i, question: 'How can I pay?', answer: `${list(pricing.paymentModes, true)}.` })
  }
  if (items.some((item) => /alteration/i.test(item))) {
    derived.push({
      topic: /alter/i,
      question: 'Do you do alterations?',
      answer: 'Yes. Bring the garment in, or send us a photo of it on WhatsApp first.',
    })
  }
  if (b.branches.length) {
    const [first] = b.branches
    derived.push({
      topic: /where|address|location|find you/i,
      question: b.branches.length > 1 ? 'Where are your branches?' : 'Where is the store?',
      answer:
        b.branches.length > 1
          ? `We have ${b.branches.length} branches: ${list(b.branches.map((br) => br.area || br.city))}.`
          : `${first.address}, ${first.city} ${first.pincode}.${first.landmark ? ` ${first.landmark}.` : ''}${first.hours ? ` Open ${first.hours}.` : ''}`,
    })
  }
  if (b.contact.languages?.length) {
    derived.push({ topic: /language|speak/i, question: 'Which languages do you speak?', answer: `${list(b.contact.languages)}.` })
  }
  if (b.branches.some((br) => br.parking)) {
    derived.push({ topic: /park/i, question: 'Is there parking?', answer: 'Yes, there’s parking at the store.' })
  }

  return [...own, ...derived.filter((d) => !asked(d.topic)).map(({ question, answer }) => ({ question, answer }))].slice(0, max)
}

/**
 * Questions that open one at a time. The first is open to begin with, so
 * it's clear the rows open. Closed answers are inert, so a screen reader or
 * the Tab key skips them, and they open with a CSS height transition that
 * reduced motion turns off.
 */
export function Accordion({ questions }: { questions: IQuestion[] }) {
  const id = useId()
  const [open, setOpen] = useState(0)

  return (
    <ul className="border-b border-ink/15">
      {questions.map(({ question, answer }, i) => {
        const isOpen = i === open
        return (
          <li key={question} className="border-t border-ink/15">
            <h3>
              <button
                type="button"
                id={`${id}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-a${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="group flex min-h-16 w-full cursor-pointer items-center justify-between gap-6 py-5 text-left"
              >
                <span className="t-3">{question}</span>
                <IconPlus
                  size={22}
                  stroke={1.5}
                  aria-hidden="true"
                  className={`shrink-0 text-primary-ink transition-transform duration-300 ease-stitch group-hover:scale-110 ${isOpen ? 'rotate-45' : ''}`}
                />
              </button>
            </h3>
            <div
              id={`${id}-a${i}`}
              role="region"
              aria-labelledby={`${id}-q${i}`}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows] duration-300 ease-stitch ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="overflow-hidden">
                <p className="max-w-[60ch] pb-6 text-muted">{answer}</p>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

/** The way out of every FAQ: ask the rest on WhatsApp. */
export function AskOnWhatsApp() {
  const { boutique } = useBoutique()
  return (
    <div className="mt-14 flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-white/70 p-6 border border-ink/10 shadow-xs backdrop-blur-xs">
      <p className="t-3">Still wondering about something?</p>
      <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I have a question.`)} variant="primary" icon={IconBrandWhatsapp}>
        Ask us on WhatsApp
      </Button>
    </div>
  )
}
