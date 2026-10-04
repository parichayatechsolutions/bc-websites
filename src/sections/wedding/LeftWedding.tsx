// src/sections/wedding/LeftWedding.tsx
// Counting down: dark, she picks her wedding date and the days left are
// set enormous, with the next three pieces to order and their dates from
// the shop's own lead times beneath. (Lab: wed L, "Counting down".)
//
// Only from `leadTimes` (data sheet 6i); hides without them or bridal
// work. Pieces whose day has passed are left out of "next" and noted as a
// question for express. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Field from '../../components/Field'
import { asDate, daysUntil, longDate, today, useLeadTimes } from './weddingShared'

export default function LeftWedding() {
  const { boutique } = useBoutique()
  const { items, plan } = useLeadTimes()
  const [date, setDate] = useState('')
  if (!items.length) return null
  const wedding = date ? asDate(date) : undefined
  const left = wedding ? daysUntil(wedding) : undefined
  const rows = wedding ? plan(wedding).sort((a, b) => a.by.getTime() - b.by.getTime()) : []
  const next = rows.filter((r) => r.by >= today()).slice(0, 3)
  const late = rows.filter((r) => r.by < today())

  return (
    <section id="wedding-countdown" className="section bg-dark text-light">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">Counting down</h2>
          <div className="mt-8 max-w-xs rounded-2xl bg-light p-5 text-ink">
            <Field label="Wedding date" required>
              {(props) => <input {...props} type="date" value={date} onChange={(e) => setDate(e.target.value)} />}
            </Field>
          </div>
        </div>
        <div className="md:col-span-7" aria-live="polite">
          {left !== undefined && left >= 0 ? (
            <>
              <p className="font-display leading-none tabular-nums text-accent-on-dark" style={{ fontSize: 'clamp(6rem, 22vw, 14rem)' }}>
                {left}
              </p>
              <p className="t-3 mt-2">{left === 1 ? 'day to go' : 'days to go'}</p>
              {next.length > 0 && (
                <ol className="mt-10 border-t border-light/15">
                  {next.map((r) => (
                    <li key={r.item} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-light/15 py-4">
                      <span className="t-3">Order {r.item.toLowerCase()}</span>
                      <span className="text-accent-on-dark">by {longDate(r.by)}</span>
                    </li>
                  ))}
                </ol>
              )}
              {late.length > 0 && <p className="mt-6 text-light/75">Past its usual time: {late.map((r) => r.item.toLowerCase()).join(', ')}. Ask us about express.</p>}
              <a
                href={whatsappLink(boutique, `Hi ${boutique.brand.name}, my wedding is ${left} days away. I'd like to start on my outfits.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex min-h-12 items-center gap-2.5 rounded-full bg-light px-7 font-semibold text-ink transition-[scale] duration-200 ease-stitch active:scale-[0.97]"
              >
                <IconBrandWhatsapp size={20} stroke={1.75} aria-hidden="true" />
                Start on my outfits
              </a>
            </>
          ) : (
            <p className="t-2 text-light/75">{wedding ? 'That date has passed.' : 'Pick your date to start the countdown.'}</p>
          )}
        </div>
      </div>
    </section>
  )
}
