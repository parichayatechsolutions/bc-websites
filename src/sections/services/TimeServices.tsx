// src/sections/services/TimeServices.tsx
// How long it takes: their usual delivery and their express service drawn
// as two bars of days, so the difference is seen, with starting prices
// beneath. (Lab: services H, "How long it takes".)
//
// Needs `pricing.deliveryDays`. The express bar shows only when the express
// line gives a time in hours or days ("48 hours", "3 days"); otherwise the
// express line is shown as written. Prices only with permission.
//
// Motion: the bars draw out from the left once. Reduced motion: in place.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { rupees } from '../../app/text'
import Button from '../../components/Button'
import { draw } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { PRICE_NOTE, useServices } from './servicesShared'

/** Days from "48 hours", "2 days", "next day". */
function expressDays(text?: string): number | undefined {
  if (!text) return undefined
  const hours = text.match(/(\d+)\s*(hours?|hrs?)/i)
  if (hours) return Math.max(1, Math.ceil(Number(hours[1]) / 24))
  const days = text.match(/(\d+)\s*days?/i)
  if (days) return Number(days[1])
  return /next day|tomorrow/i.test(text) ? 1 : undefined
}

export default function TimeServices() {
  const { boutique } = useBoutique()
  const { prices } = useServices()
  const root = useRef<HTMLElement>(null)
  const normal = boutique.pricing?.deliveryDays
  const express = boutique.pricing?.express
  const fast = expressDays(express)

  useMotion(root, () => {
    draw('[data-bar]', { trigger: root.current, from: 'start' })
  })

  if (!normal) return null
  const bars = [
    { label: 'Usual', days: normal, note: `${normal} days` },
    ...(fast && fast < normal ? [{ label: 'Express', days: fast, note: express! }] : []),
  ]

  return (
    <section ref={root} id="timing" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[12ch] text-balance">How long it takes</h2>
        <dl className="mt-12 space-y-8">
          {bars.map((b) => (
            <div key={b.label}>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="t-3">{b.label}</dt>
                <dd className="text-muted">{b.note}</dd>
              </div>
              <div className="mt-3 h-4 bg-ink/10" aria-hidden="true">
                <div data-bar className={`h-full ${b.label === 'Express' ? 'bg-accent' : 'bg-primary-ink'}`} style={{ width: `${(b.days / normal) * 100}%` }} />
              </div>
            </div>
          ))}
        </dl>
        {express && !(fast && fast < normal) && <p className="mt-6 text-muted">Express: {express}</p>}

        {prices.length > 0 && (
          <ul className="mt-12 flex flex-wrap gap-x-10 gap-y-3 border-t border-ink/15 pt-8">
            {prices.map(({ item, price }) => (
              <li key={item}>
                {item} <span className="text-muted">from {rupees(price)}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, when could you have something ready for me?`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask for a date
          </Button>
          {prices.length > 0 && <p className="t-small text-muted">{PRICE_NOTE}</p>}
        </div>
      </div>
    </section>
  )
}
