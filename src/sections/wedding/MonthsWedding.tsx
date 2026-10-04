// src/sections/wedding/MonthsWedding.tsx
// Month by month: she picks her wedding date, and three month calendars
// (the wedding's month and the two before it) mark each piece's order-by
// day and the wedding itself, with a key beneath. (Lab: wed D, "Month by
// month".)
//
// Dates only from the shop's own `leadTimes` (data sheet 6i); a piece due
// before the three months shows in the key with its date. Hides without
// lead times or bridal work. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Field from '../../components/Field'
import { asDate, longDate, useLeadTimes } from './weddingShared'

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const same = (a: Date, b: Date) => a.toDateString() === b.toDateString()

function Month({ first, marks, wedding }: { first: Date; marks: Date[]; wedding: Date }) {
  const lead = (first.getDay() + 6) % 7
  const days = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate()
  return (
    <div>
      <p className="t-3">{first.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
      <div className="t-small mt-3 grid grid-cols-7 gap-1 text-center" aria-hidden="true">
        {DAYS.map((d, i) => (
          <span key={i} className="text-muted">
            {d}
          </span>
        ))}
        {Array.from({ length: lead }, (_, i) => (
          <span key={`e${i}`} />
        ))}
        {Array.from({ length: days }, (_, i) => {
          const day = new Date(first.getFullYear(), first.getMonth(), i + 1)
          const isWedding = same(day, wedding)
          const isMark = marks.some((m) => same(m, day))
          return (
            <span
              key={i}
              className={`grid aspect-square place-items-center rounded-full tabular-nums ${isWedding ? 'bg-primary-ink font-semibold text-on-primary-ink' : isMark ? 'bg-accent font-semibold text-on-accent' : ''}`}
            >
              {i + 1}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default function MonthsWedding() {
  const { boutique } = useBoutique()
  const { items, plan } = useLeadTimes()
  const [date, setDate] = useState('')
  if (!items.length) return null
  const wedding = date ? asDate(date) : undefined
  const rows = wedding ? plan(wedding) : []
  const months = wedding ? [2, 1, 0].map((k) => new Date(wedding.getFullYear(), wedding.getMonth() - k, 1)) : []

  return (
    <section id="wedding-months" className="section">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="t-1 max-w-[12ch] text-balance">Month by month</h2>
          <div className="w-full max-w-xs">
            <Field label="Wedding date" required>
              {(props) => <input {...props} type="date" value={date} onChange={(e) => setDate(e.target.value)} />}
            </Field>
          </div>
        </div>
        {wedding ? (
          <>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {months.map((m) => (
                <Month key={m.toISOString()} first={m} marks={rows.map((r) => r.by)} wedding={wedding} />
              ))}
            </div>
            <ul className="mt-10 grid gap-x-10 gap-y-2 border-t border-ink/15 pt-6 sm:grid-cols-2" aria-live="polite">
              {rows.map((r) => (
                <li key={r.item} className="flex items-baseline gap-3">
                  <span aria-hidden="true" className="h-3 w-3 shrink-0 translate-y-0.5 rounded-full bg-accent" />
                  <span>
                    <span className="font-semibold">{longDate(r.by)}</span> <span className="text-muted">· order {r.item.toLowerCase()}</span>
                  </span>
                </li>
              ))}
              <li className="flex items-baseline gap-3">
                <span aria-hidden="true" className="h-3 w-3 shrink-0 translate-y-0.5 rounded-full bg-primary-ink" />
                <span>
                  <span className="font-semibold">{longDate(wedding)}</span> <span className="text-muted">· your wedding</span>
                </span>
              </li>
            </ul>
          </>
        ) : (
          <p className="mt-10 rounded-2xl bg-paper p-8 text-muted">Pick your wedding date to see each order-by day, from our usual lead times.</p>
        )}
        <div className="mt-10">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, my wedding is on ${wedding ? longDate(wedding) : '…'}. Could we plan my outfits?`)} variant="primary" icon={IconBrandWhatsapp}>
            Plan it with us
          </Button>
        </div>
      </div>
    </section>
  )
}
