// src/sections/alterations/BoardAlterations.tsx
// The rate card on the wall: their alteration prices on a dark letter
// board inside a frame, each fix and its price on a dotted line, as it
// would hang behind the counter. (Lab: alter A, "Letter board".)
//
// Rates from `alterationPrices`, only with permission; hides otherwise.
// No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'

export default function BoardAlterations() {
  const { boutique } = useBoutique()
  const rates = boutique.permissions.showPrices ? (boutique.alterationPrices ?? []) : []
  if (!rates.length) return null

  return (
    <section id="alteration-prices" className="section">
      <div className="wrap max-w-3xl">
        <h2 className="t-1 max-w-[12ch] text-balance">Alteration rates</h2>
        <div className="mt-10 border-[10px] border-primary-ink bg-dark p-6 text-light md:p-10">
          <p className="t-3 text-center text-accent-on-dark">{boutique.brand.name}</p>
          <dl className="mt-8 space-y-4 font-semibold tracking-wide">
            {rates.map(({ item, price }) => (
              <div key={item} className="flex items-baseline gap-3">
                <dt className="min-w-0">{item}</dt>
                <span aria-hidden="true" className="min-w-6 flex-1 translate-y-[-0.25em] border-b-2 border-dotted border-light/35" />
                <dd className="shrink-0 tabular-nums">{rupees(price)}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-10">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I have something that needs altering.`)} variant="primary" icon={IconBrandWhatsapp}>
            Send a photo on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  )
}
