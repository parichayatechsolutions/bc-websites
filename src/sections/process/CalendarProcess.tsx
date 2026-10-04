// src/sections/process/CalendarProcess.tsx
// The making as calendar pages: day 1 (talk and measure), the days in
// between (cut, stitch, handwork) and the last day (trial and pick up),
// each a tear-off page with a brand-colour top. (Lab: process W,
// "Calendar".)
//
// Needs `pricing.deliveryDays`. Only day 1 and the usual delivery day are
// dated; the steps between aren't given days (DESIGN.md decision log).
// Hides without delivery days. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { STEPS } from './steps'

export default function CalendarProcess() {
  const { boutique } = useBoutique()
  const days = boutique.pricing?.deliveryDays
  if (!days) return null

  const pages = [
    { label: 'Day', big: '1', steps: STEPS.slice(0, 2) },
    ...(days > 2 ? [{ label: 'In between', big: undefined, steps: STEPS.slice(2, 4) }] : []),
    { label: 'Day', big: String(days), steps: days > 2 ? STEPS.slice(4) : STEPS.slice(2) },
  ]

  return (
    <section id="process" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[14ch] text-balance">Usually ready in {days} days</h2>
        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {pages.map((page) => (
            <li key={page.label + page.big} className="overflow-hidden rounded-2xl border border-ink/15">
              <div className="flex h-12 items-center justify-center bg-primary-ink text-on-primary-ink">
                <span className="t-small font-semibold">{page.big ? `${page.label} ${page.big}` : page.label}</span>
              </div>
              <div className="p-6 text-center md:p-8">
                <p aria-hidden="true" className="font-display text-7xl leading-none tabular-nums text-primary-ink">
                  {page.big ?? '…'}
                </p>
                <ul className="mt-6 space-y-4 text-left">
                  {page.steps.map(({ title, short, icon: Icon }) => (
                    <li key={title} className="flex gap-3">
                      <Icon size={22} stroke={1.5} className="mt-0.5 shrink-0 text-primary-ink" aria-hidden="true" />
                      <span>
                        <span className="block font-semibold">{title}</span>
                        <span className="t-small text-muted">{short}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
        {boutique.pricing?.express && <p className="mt-8 text-muted">Need it sooner? Express: {boutique.pricing.express}.</p>}
        <div className="mt-8">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to order. When would it be ready?`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask for a date
          </Button>
        </div>
      </div>
    </section>
  )
}
