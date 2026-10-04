// src/sections/alterations/LadderAlterations.tsx
// Their alteration rates as a ladder of bars, cheapest at the top, each bar
// as long as its price, so the small fixes look as small as they are.
// (Lab: alter P, "Price ladder".)
//
// Rates from `alterationPrices`, only with permission to show prices;
// hides otherwise.
//
// Motion: the bars draw out from the left once. Reduced motion: in place.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'
import { draw } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

export default function LadderAlterations() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const rates = boutique.permissions.showPrices ? [...(boutique.alterationPrices ?? [])].sort((a, b) => a.price - b.price) : []

  useMotion(root, () => {
    draw('[data-bar]', { trigger: root.current, from: 'start' })
  })

  if (!rates.length) return null
  const most = rates[rates.length - 1].price

  return (
    <section ref={root} id="alteration-ladder" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[12ch] text-balance">Alterations, from {rupees(rates[0].price)}</h2>
        <dl className="mt-12 space-y-5">
          {rates.map(({ item, price }) => (
            <div key={item}>
              <div className="flex items-baseline justify-between gap-4">
                <dt>{item}</dt>
                <dd className="t-3 shrink-0 tabular-nums text-primary-ink">{rupees(price)}</dd>
              </div>
              <div className="mt-2 h-2 bg-ink/10" aria-hidden="true">
                <div data-bar className="h-full bg-primary-ink" style={{ width: `${Math.max(6, (price / most) * 100)}%` }} />
              </div>
            </div>
          ))}
        </dl>
        <div className="mt-10">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I have something that needs altering.`)} variant="primary" icon={IconBrandWhatsapp}>
            Send a photo on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  )
}
