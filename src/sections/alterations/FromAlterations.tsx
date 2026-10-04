// src/sections/alterations/FromAlterations.tsx
// Alterations from their lowest price, set huge, beside a ruled list of
// every fix and its price. Says "small jobs are welcome" without saying it.
// (Lab: alter I, "From ₹".)
//
// Rates from `alterationPrices`, only with permission; hides otherwise.
//
// Motion: the big price counts up once. Reduced motion: as written.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'
import { countUp } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

export default function FromAlterations() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const rates = boutique.permissions.showPrices ? (boutique.alterationPrices ?? []) : []

  useMotion(root, () => {
    countUp('[data-count]', { trigger: root.current })
  })

  if (!rates.length) return null
  const lowest = Math.min(...rates.map((r) => r.price))

  return (
    <section ref={root} id="alteration-prices" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-3">Alterations from</h2>
          <p data-count className="t-hero mt-2 tabular-nums text-primary-ink">
            {rupees(lowest)}
          </p>
          <div className="mt-8">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I have something that needs altering.`)} variant="primary" icon={IconBrandWhatsapp}>
              Send a photo on WhatsApp
            </Button>
          </div>
        </div>
        <dl className="md:col-span-7">
          {rates.map(({ item, price }) => (
            <div key={item} className="flex items-baseline justify-between gap-4 border-b border-ink/15 py-4">
              <dt>{item}</dt>
              <dd className="shrink-0 tabular-nums text-primary-ink">{rupees(price)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
