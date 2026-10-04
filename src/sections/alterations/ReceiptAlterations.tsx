// src/sections/alterations/ReceiptAlterations.tsx
// Their alteration rates printed like a till receipt: the shop's name and
// area at the top, each fix with its price, dashed rules, the express line
// at the foot, and a zigzag torn edge. (Lab: alter D, "Receipt".)
//
// Rates from `alterationPrices`, only with permission to show prices;
// hides otherwise. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'

const TORN = 'polygon(0 0,100% 0,100% calc(100% - 10px),95% 100%,90% calc(100% - 10px),85% 100%,80% calc(100% - 10px),75% 100%,70% calc(100% - 10px),65% 100%,60% calc(100% - 10px),55% 100%,50% calc(100% - 10px),45% 100%,40% calc(100% - 10px),35% 100%,30% calc(100% - 10px),25% 100%,20% calc(100% - 10px),15% 100%,10% calc(100% - 10px),5% 100%,0 calc(100% - 10px))'

export default function ReceiptAlterations() {
  const { boutique } = useBoutique()
  const rates = boutique.permissions.showPrices ? (boutique.alterationPrices ?? []) : []
  if (!rates.length) return null
  const branch = boutique.branches[0]

  return (
    <section id="alteration-prices" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">Alteration rates</h2>
          <p className="mt-5 max-w-[30ch] text-muted">Our usual prices. Send a photo of what needs fixing.</p>
          <div className="mt-8">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I have something that needs altering.`)} variant="primary" icon={IconBrandWhatsapp}>
              Send a photo
            </Button>
          </div>
        </div>
        <div className="md:col-span-7">
          <div className="mx-auto max-w-sm bg-paper px-7 pt-8 pb-12 tabular-nums" style={{ clipPath: TORN }}>
            <p className="text-center font-semibold">{boutique.brand.name}</p>
            {branch && <p className="t-small text-center text-muted">{branch.area || branch.city}</p>}
            <dl className="mt-6 space-y-2 border-y border-dashed border-ink/30 py-5">
              {rates.map(({ item, price }) => (
                <div key={item} className="flex items-baseline justify-between gap-4">
                  <dt className="t-small">{item}</dt>
                  <dd className="shrink-0">{rupees(price)}</dd>
                </div>
              ))}
            </dl>
            {boutique.pricing?.express && <p className="t-small mt-5 text-center text-muted">Express: {boutique.pricing.express}</p>}
          </div>
        </div>
      </div>
    </section>
  )
}
