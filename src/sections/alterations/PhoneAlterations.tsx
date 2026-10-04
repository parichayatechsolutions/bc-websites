// src/sections/alterations/PhoneAlterations.tsx
// Their alteration rates as a phone's settings screen: a drawn phone
// holding grouped rows, each fix with its price and a chevron, beside a
// button to send a photo. (Lab: alter W, "On your phone".)
//
// Rates from `alterationPrices`, only with permission; hides otherwise.
// A drawing, so the rows aren't buttons. No motion.

import { IconBrandWhatsapp, IconChevronRight } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'

export default function PhoneAlterations() {
  const { boutique } = useBoutique()
  const rates = boutique.permissions.showPrices ? (boutique.alterationPrices ?? []).slice(0, 10) : []
  if (!rates.length) return null

  return (
    <section id="alteration-prices" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">Alteration rates</h2>
          <p className="t-lead mt-5 max-w-[30ch] text-muted">Send us a photo of what needs fixing.</p>
          <div className="mt-8">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I have something that needs altering.`)} variant="primary" icon={IconBrandWhatsapp}>
              Send a photo on WhatsApp
            </Button>
          </div>
        </div>
        <div className="md:col-span-7">
          <div className="mx-auto w-full max-w-xs rounded-[2.5rem] border-[10px] border-dark bg-paper px-3 pt-8 pb-6">
            <span aria-hidden="true" className="mx-auto -mt-5 mb-4 block h-1.5 w-16 rounded-full bg-dark" />
            <p className="t-3 px-2">Alterations</p>
            <p className="t-small px-2 text-muted">{boutique.brand.name}</p>
            <dl className="mt-4 overflow-hidden rounded-2xl bg-light">
              {rates.map(({ item, price }) => (
                <div key={item} className="flex items-center gap-3 border-b border-ink/10 px-4 py-3 last:border-b-0">
                  <dt className="t-small min-w-0 flex-1">{item}</dt>
                  <dd className="t-small shrink-0 tabular-nums text-muted">{rupees(price)}</dd>
                  <IconChevronRight size={14} stroke={1.75} className="shrink-0 text-muted" aria-hidden="true" />
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
