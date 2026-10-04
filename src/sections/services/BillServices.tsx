// src/sections/services/BillServices.tsx
// Dark, with their starting prices written out on a slip torn from the
// shop's bill book: the name at the top, each item and its price on a
// ruled line, usual delivery at the foot, and a torn edge.
// (Lab: services M, "Bill book".)
//
// Starting prices only with permission; hides otherwise. Labelled as
// starting prices. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'
import { PRICE_NOTE } from './servicesShared'

// A torn foot: small uneven teeth along the bottom edge.
const TORN = `polygon(0 0, 100% 0, 100% 97%, ${Array.from({ length: 20 }, (_, i) => `${100 - (i + 0.5) * 5}% ${i % 2 ? 97 : 100}%`).join(', ')}, 0 97%)`

export default function BillServices() {
  const { boutique } = useBoutique()
  const prices = boutique.permissions.showPrices ? (boutique.pricing?.startingAt ?? []) : []
  if (!prices.length) return null
  const days = boutique.pricing?.deliveryDays
  const area = boutique.branches[0]?.area || boutique.branches[0]?.city

  return (
    <section id="services" className="section bg-dark text-light">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">What it costs</h2>
          <p className="mt-5 max-w-[34ch] text-light/75">{PRICE_NOTE}</p>
          <div className="mt-8">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like a price for `)} icon={IconBrandWhatsapp}>
              Ask for a price
            </Button>
          </div>
        </div>
        <div className="md:col-span-7">
          <div className="mx-auto max-w-md -rotate-1 bg-light px-7 pt-7 pb-12 text-ink" style={{ clipPath: TORN }}>
            <div className="border-b-2 border-ink pb-4 text-center">
              <p className="t-3 text-primary-ink">{boutique.brand.name}</p>
              {area && <p className="t-small text-muted">{area}</p>}
            </div>
            <p className="t-small mt-4 text-muted">Starting prices</p>
            <dl className="mt-2">
              {prices.map((p) => (
                <div key={p.item} className="flex items-baseline justify-between gap-4 border-b border-ink/20 py-3">
                  <dt>{p.item}</dt>
                  <dd className="shrink-0 tabular-nums">{rupees(p.price)}</dd>
                </div>
              ))}
            </dl>
            {days && <p className="t-small mt-4 text-muted">Usually ready in {days} days.</p>}
          </div>
        </div>
      </div>
    </section>
  )
}
