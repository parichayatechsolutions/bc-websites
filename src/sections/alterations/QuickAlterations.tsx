// src/sections/alterations/QuickAlterations.tsx
// Quickest first: their alterations with how long each usually takes, in
// ruled rows she can sort by time or, when prices are shown, by price.
// (Lab: alter H, "Quickest first", as ruled rows rather than rounded
// tiles, and the time as plain text, since only tappable things are pills.)
//
// From `alterationPrices` rows that have days (data sheet 6d); needs two.
// Prices only with permission. No motion: the rows reorder in place.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees, usually } from '../../app/text'
import Button from '../../components/Button'

export default function QuickAlterations() {
  const { boutique } = useBoutique()
  const prices = boutique.permissions.showPrices
  const rows = (boutique.alterationPrices ?? []).filter((a): a is typeof a & { days: number } => Boolean(a.days))
  const [by, setBy] = useState<'time' | 'price'>('time')
  if (rows.length < 2) return null

  const sorted = [...rows].sort((a, b) => (by === 'price' ? a.price - b.price || a.days - b.days : a.days - b.days || a.price - b.price))

  return (
    <section id="alteration-times" className="section">
      <div className="wrap max-w-4xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="t-1 max-w-[12ch] text-balance">{by === 'price' ? 'Cheapest first' : 'Quickest first'}</h2>
          {prices && (
            <div className="inline-flex rounded-full border border-ink/25 p-1" role="group" aria-label="Sort by">
              {(['time', 'price'] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setBy(key)}
                  aria-pressed={by === key}
                  className="min-h-11 cursor-pointer rounded-full px-5 transition-[background-color,color] duration-200 ease-stitch aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
                >
                  {key === 'time' ? 'By time' : 'By price'}
                </button>
              ))}
            </div>
          )}
        </div>
        <ul className="mt-10 border-t border-ink/15" aria-live="polite">
          {sorted.map(({ item, days, price }) => (
            <li key={item} className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-1 border-b border-ink/15 py-4 sm:grid-cols-[minmax(0,1fr)_auto_5rem]">
              <span className="min-w-0 break-words">{item}</span>
              <span className="t-small font-semibold text-primary-ink sm:text-right">{usually(days)}</span>
              {prices && <span className="t-3 col-start-2 row-start-1 text-right tabular-nums sm:col-start-3">{rupees(price)}</span>}
            </li>
          ))}
        </ul>
        <p className="t-small mt-4 text-muted">{prices ? 'Usual times and starting prices.' : 'Usual times.'} We confirm when we see the garment.</p>
        <div className="mt-10">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I have something that needs altering.`)} variant="primary" icon={IconBrandWhatsapp}>
            Send a photo on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  )
}
