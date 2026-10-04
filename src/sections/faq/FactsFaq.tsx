// src/sections/faq/FactsFaq.tsx
// The answers most people came for, set as facts before any question: the
// starting price, usual delivery, express and how to pay. The rest follow
// as questions that open. (Lab: faq J, "Quick facts".)
//
// Facts only from the config, and the starting price only when the boutique
// allows prices to be shown. Without at least two facts it's a plain
// accordion, so it never shows a half-empty row.
//
// No scroll motion. Answers open with a CSS height transition.

import type { Icon } from '@tabler/icons-react'
import { IconBolt, IconCalendarCheck, IconCoinRupee, IconTag } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'
import { Accordion, AskOnWhatsApp, faqItems } from './faqShared'

const COLUMNS = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4' } as Record<number, string>

export default function FactsFaq() {
  const { boutique } = useBoutique()
  const { pricing, permissions } = boutique
  const questions = faqItems(boutique)

  const cheapest = permissions.showPrices ? pricing?.startingAt?.[0] : undefined
  const express = pricing?.express?.split(',')[0].trim()
  const facts = [
    cheapest && { icon: IconTag, value: `₹${cheapest.price.toLocaleString('en-IN')}`, label: `${cheapest.item}, starting price` },
    pricing?.deliveryDays && { icon: IconCalendarCheck, value: `${pricing.deliveryDays} days`, label: 'Usual delivery' },
    express && { icon: IconBolt, value: express, label: 'Express, when you need it' },
    pricing?.paymentModes?.length && { icon: IconCoinRupee, value: pricing.paymentModes.join(' · '), label: 'Ways to pay' },
  ].filter(Boolean) as { icon: Icon; value: string; label: string }[]

  if (questions.length < 3) return null

  return (
    <section id="questions" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">The quick answers</h2>

        {facts.length > 1 && (
          <dl className={`mt-12 grid grid-cols-2 gap-x-6 gap-y-10 ${COLUMNS[facts.length]}`}>
            {facts.map(({ icon: FactIcon, value, label }) => (
              <div key={label} className="flex flex-col border-t border-ink/15 pt-6">
                <dt className="t-small order-last mt-1 text-muted">{label}</dt>
                <dd className="flex flex-col">
                  <FactIcon size={24} stroke={1.5} className="text-primary-ink" aria-hidden="true" />
                  <span className="t-2 mt-4 break-words">{value}</span>
                </dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-16 max-w-3xl">
          <Accordion questions={questions} />
          <AskOnWhatsApp />
        </div>
      </div>
    </section>
  )
}
