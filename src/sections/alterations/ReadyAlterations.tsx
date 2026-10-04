// src/sections/alterations/ReadyAlterations.tsx
// When will it be ready? She taps the fix she needs and a calendar tile
// shows the day it would usually be ready if she brought it in today, with
// a button that asks whether that works. (Lab: alter X, "Ready on", with a
// border for the tile instead of a drop shadow.)
//
// From `alterationPrices` rows that have days (data sheet 6d); hides
// without one. The date is today in the shop's time plus those days, moved
// on to the next day the first branch is open (src/app/hours.ts). The
// price only with permission. The tile changes with a CSS fade.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { readyBy } from '../../app/hours'
import { rupees, usually } from '../../app/text'
import Button from '../../components/Button'

const part = (date: Date, options: Intl.DateTimeFormatOptions) => date.toLocaleDateString('en-IN', { timeZone: 'UTC', ...options })

export default function ReadyAlterations() {
  const { boutique } = useBoutique()
  const rows = (boutique.alterationPrices ?? []).filter((a): a is typeof a & { days: number } => Boolean(a.days))
  const [picked, setPicked] = useState(0)
  if (!rows.length) return null

  const fix = rows[Math.min(picked, rows.length - 1)]
  const date = readyBy(fix.days, boutique.branches[0]?.week)
  const long = part(date, { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <section id="alteration-ready" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <h2 className="t-1 max-w-[12ch] text-balance">When will it be ready?</h2>
          <p className="mt-5 max-w-[36ch] text-muted">Tap the fix you need to see when it would usually be ready if you bring it in today.</p>
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Your fix">
            {rows.map(({ item }, i) => (
              <button
                key={item}
                type="button"
                onClick={() => setPicked(i)}
                aria-pressed={fix.item === item}
                className="min-h-11 max-w-full cursor-pointer rounded-full border border-ink/25 px-4 py-2 text-left transition-[background-color,color,border-color] duration-200 ease-stitch hover:border-ink aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-5">
          <div key={fix.item} className="mx-auto w-full max-w-[17rem] animate-[fade-in_700ms_var(--ease-stitch)] overflow-hidden rounded-2xl border border-ink/15 bg-light text-center" aria-live="polite">
            <p className="bg-primary py-3 text-sm font-semibold tracking-[0.2em] text-on-primary uppercase">{part(date, { month: 'long' })}</p>
            <div className="px-5 pt-5 pb-6">
              <p className="font-display text-[5rem] leading-none tabular-nums" aria-hidden="true">
                {part(date, { day: 'numeric' })}
              </p>
              <p className="mt-1 font-semibold" aria-hidden="true">
                {part(date, { weekday: 'long' })}
              </p>
              <p className="sr-only">Usually ready by {long}</p>
              <p className="t-small mt-3 text-pretty text-muted">
                {fix.item} · {usually(fix.days).toLowerCase()}
                {boutique.permissions.showPrices && ` · ${rupees(fix.price)}`}
              </p>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <Button
              href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to bring in a garment for this: ${fix.item}. Would it be ready by ${long}?`)}
              variant="primary"
              icon={IconBrandWhatsapp}
            >
              Ask if that works
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
