// src/sections/alterations/ServicesAlterations.tsx
// What they alter in a ruled list (with each rate, when they show prices)
// beside one drag-to-compare photo in an arch that stays in view while
// the list scrolls past on a computer. (Lab: alt Y, "Services + slider".)
//
// Needs before/after pairs. The list is their alteration rates with
// permission, else the alteration items in their services; without either
// it's just the photo.
//
// Motion: the divider sweeps once to show it moves. Reduced motion: still.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import { useMotion } from '../../motion/useMotion'
import { AskAboutAlterations, Compare, sweep, useAlterations } from './altShared'

const ALTER = /alter|fitting|hem|loosen|tighten|resiz|shorten|lengthen|repair/i

export default function ServicesAlterations() {
  const { boutique } = useBoutique()
  const { pairs, caption } = useAlterations()
  const root = useRef<HTMLElement>(null)
  const rates = boutique.permissions.showPrices ? (boutique.alterationPrices ?? []) : []
  const items = rates.length
    ? rates.map((r) => ({ item: r.item, price: rupees(r.price) }))
    : [...new Set(boutique.services.groups.flatMap((g) => g.items).filter((i) => ALTER.test(i)))].map((item) => ({ item, price: undefined }))

  useMotion(root, () => {
    sweep(root.current)
  })

  if (!pairs.length) return null
  const pair = pairs[0]

  return (
    <section ref={root} id="alterations" className="section">
      <div className="wrap grid items-start gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:sticky md:top-24 md:col-span-5">
          <Compare key={pair.before} pair={pair} caption={caption(pair)} className="arch aspect-[3/4]" />
          {caption(pair) && <p className="t-small mt-3 text-muted">{caption(pair)}</p>}
        </div>
        <div className="md:col-span-7">
          <h2 className="t-1 max-w-[12ch] text-balance">Alterations</h2>
          {items.length > 0 && (
            <dl className="mt-10 border-t border-ink/15">
              {items.map(({ item, price }) => (
                <div key={item} className="flex items-baseline justify-between gap-4 border-b border-ink/15 py-4">
                  <dt className="t-3">{item}</dt>
                  {price && <dd className="shrink-0 tabular-nums text-primary-ink">{price}</dd>}
                </div>
              ))}
            </dl>
          )}
          <AskAboutAlterations />
        </div>
      </div>
    </section>
  )
}
