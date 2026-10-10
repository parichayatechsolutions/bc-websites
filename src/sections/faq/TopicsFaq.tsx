// src/sections/faq/TopicsFaq.tsx
// Questions sorted under topic tabs (prices, timing, ordering, visiting),
// so a customer goes straight to what she came to ask.
// (Lab: faq C, "Topic tabs".)
//
// Topics are worked out from each question's words; tabs show only for
// topics with questions, and not at all when everything falls under one.
// Their own questions first, then answers from their data (faqShared);
// hides with fewer than three. Tabs follow the ARIA pattern.

import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import { Accordion, AskOnWhatsApp, faqItems, type IQuestion } from './faqShared'

const TOPICS: { name: string; match: RegExp }[] = [
  { name: 'Prices', match: /price|cost|charge|how much|pay|upi|card|cash/i },
  { name: 'Timing', match: /how long|days|deliver|ready|express|time|urgent/i },
  { name: 'Visiting', match: /where|address|location|visit|park|open|hours|branch/i },
  { name: 'Ordering', match: /./ },
]

export default function TopicsFaq() {
  const { boutique } = useBoutique()
  const id = useId()
  const questions = faqItems(boutique, 12)
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  if (questions.length < 3) return null

  const groups = TOPICS.map((t) => ({ name: t.name, items: [] as IQuestion[] }))
  for (const q of questions) groups[TOPICS.findIndex((t) => t.match.test(q.question))].items.push(q)
  const topics = groups.filter((g) => g.items.length)
  const current = topics[active] ?? topics[0]

  const onKey = (e: KeyboardEvent) => {
    const by = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!by) return
    e.preventDefault()
    const next = (active + by + topics.length) % topics.length
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <section
      id="questions"
      className="relative overflow-hidden py-10 md:py-14 border-t border-b border-ink/10 bg-cover bg-center"
      style={{
        backgroundImage: "linear-gradient(to bottom, rgba(248, 243, 252, 0.80), rgba(240, 233, 247, 0.87)), url('/botanical-luxe-bg.jpg')",
      }}
    >
      <div className="wrap max-w-4xl">
        <h2 className="t-1">Questions, answered</h2>
        {topics.length > 1 && (
          <div role="tablist" aria-label="Topics" onKeyDown={onKey} className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-b border-ink/15">
            {topics.map((t, i) => (
              <button
                key={t.name}
                ref={(el) => {
                  tabs.current[i] = el
                }}
                type="button"
                role="tab"
                id={`${id}-tab${i}`}
                aria-selected={t.name === current.name}
                aria-controls={`${id}-panel`}
                tabIndex={t.name === current.name ? 0 : -1}
                onClick={() => setActive(i)}
                className="-mb-px min-h-12 cursor-pointer border-b-2 border-transparent transition-colors duration-200 ease-stitch hover:text-primary-ink aria-selected:border-primary-ink aria-selected:text-primary-ink"
              >
                {t.name}
              </button>
            ))}
          </div>
        )}
        <div
          key={current.name}
          id={`${id}-panel`}
          role={topics.length > 1 ? 'tabpanel' : undefined}
          aria-labelledby={topics.length > 1 ? `${id}-tab${active}` : undefined}
          className="mt-8"
        >
          <Accordion questions={current.items} />
        </div>
        <AskOnWhatsApp />
      </div>
    </section>
  )
}
