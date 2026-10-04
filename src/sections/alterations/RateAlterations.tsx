// src/sections/alterations/RateAlterations.tsx
// Their alteration rates as a printed rate card: each alteration with a
// dotted leader to its price, the express line under it, and a button to
// send a photo of what needs fixing. (Lab: alter B, "Printed price list".)
//
// Rates from `alterationPrices`, shown only with the boutique's permission
// to show prices; hides otherwise. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'

export default function RateAlterations() {
  const { boutique } = useBoutique()
  const rates = boutique.permissions.showPrices ? (boutique.alterationPrices ?? []) : []
  if (!rates.length) return null

  return (
    <section id="alteration-prices" className="section">
      <div className="wrap">
        <div className="mx-auto max-w-3xl border border-ink/15 bg-paper px-6 py-10 md:px-14 md:py-14">
          <h2 className="t-2 text-center">Alteration rates</h2>
          <p className="t-small mt-2 text-center text-muted">{boutique.brand.name}</p>
          <dl className="mt-10 grid gap-x-12 gap-y-4 md:grid-cols-2">
            {rates.map(({ item, price }) => (
              <div key={item} className="flex items-baseline gap-3">
                <dt className="min-w-0">{item}</dt>
                <span aria-hidden="true" className="mb-1.5 min-w-6 flex-1 border-b border-dotted border-ink/35" />
                <dd className="t-3 shrink-0 text-primary-ink">{rupees(price)}</dd>
              </div>
            ))}
          </dl>
          {boutique.pricing?.express && <p className="t-small mt-8 text-center text-muted">Express: {boutique.pricing.express}</p>}
          <div className="mt-8 flex justify-center">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I have something that needs altering. Here's a photo.`)} variant="primary" icon={IconBrandWhatsapp}>
              Send a photo on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
