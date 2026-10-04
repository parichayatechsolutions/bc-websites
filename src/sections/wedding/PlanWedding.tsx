// src/sections/wedding/PlanWedding.tsx
// The countdown plan: she picks her wedding date, and each piece gets the
// day to order it by, worked out from the shop's own lead times; anything
// already past its day is flagged with a line to ask about express.
// (Lab: wed A, "Countdown plan".)
//
// Only from `leadTimes` (data sheet 6i); hides without them or bridal
// work. Nothing is stored. No motion.

import { useState } from 'react'
import { IconAlertCircle, IconBrandWhatsapp, IconCalendarEvent } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Field from '../../components/Field'
import { asDate, longDate, today, useLeadTimes } from './weddingShared'

export default function PlanWedding() {
  const { boutique } = useBoutique()
  const { items, plan } = useLeadTimes()
  const [date, setDate] = useState('')
  if (!items.length) return null
  const wedding = date ? asDate(date) : undefined
  const rows = wedding ? plan(wedding) : []
  const late = rows.filter((r) => r.by < today())

  return (
    <section id="wedding-plan" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">Your order-by dates</h2>
          <p className="mt-4 max-w-[34ch] text-muted">From our usual lead times, counted back from your wedding.</p>
          <div className="mt-8 max-w-xs">
            <Field label="Wedding date" required>
              {(props) => <input {...props} type="date" value={date} onChange={(e) => setDate(e.target.value)} />}
            </Field>
          </div>
          <div className="mt-8">
            <Button
              href={whatsappLink(boutique, `Hi ${boutique.brand.name}, my wedding is on ${wedding ? longDate(wedding) : '…'}. I'd like to start on my outfits.`)}
              variant="primary"
              icon={IconBrandWhatsapp}
            >
              Start on my outfits
            </Button>
          </div>
        </div>
        <ul className="border-t border-ink/15 md:col-span-7" aria-live="polite">
          {(wedding ? rows : items.map((l) => ({ ...l, by: undefined }))).map((r) => {
            const past = r.by && r.by < today()
            return (
              <li key={r.item} className="grid gap-1 border-b border-ink/15 py-4 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6">
                <span>
                  <span className="t-3 block">{r.item}</span>
                  <span className="t-small text-muted">
                    {r.weeks} {r.weeks === 1 ? 'week' : 'weeks'} before
                  </span>
                </span>
                {r.by ? (
                  <span className={`flex items-center gap-2 font-semibold ${past ? 'text-error' : 'text-primary-ink'}`}>
                    {past ? <IconAlertCircle size={18} stroke={1.75} aria-hidden="true" /> : <IconCalendarEvent size={18} stroke={1.75} aria-hidden="true" />}
                    {past ? 'Past its usual time' : `Order by ${longDate(r.by)}`}
                  </span>
                ) : (
                  <span className="t-small text-muted">Pick your date</span>
                )}
              </li>
            )
          })}
          {late.length > 0 && <li className="pt-4 text-muted">For anything past its usual time, ask us about express.</li>}
        </ul>
      </div>
    </section>
  )
}
