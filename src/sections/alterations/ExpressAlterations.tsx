// src/sections/alterations/ExpressAlterations.tsx
// Normal or express: a switch between their usual time and their express
// service, the big figure and line changing with it, above their
// alteration rates. (Lab: alter R, "Normal or express".)
//
// Needs both `pricing.deliveryDays` and `pricing.express`, shown as
// written; the rates only with permission. Shows only when their services
// list alterations. The figure swaps with a CSS fade.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'

export default function ExpressAlterations() {
  const { boutique } = useBoutique()
  const { pricing } = boutique
  const alters = boutique.services.groups.flatMap((g) => g.items).some((i) => /alter/i.test(i))
  const rates = boutique.permissions.showPrices ? (boutique.alterationPrices ?? []) : []
  const [express, setExpress] = useState(false)
  if (!alters || !pricing?.deliveryDays || !pricing.express) return null

  return (
    <section id="alteration-express" className="section">
      <div className="wrap max-w-3xl">
        <h2 className="t-1 max-w-[12ch] text-balance">How soon do you need it?</h2>
        <div className="mt-8 inline-flex rounded-full border border-ink/25 p-1" role="group" aria-label="Speed">
          {['Usual', 'Express'].map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => setExpress(i === 1)}
              aria-pressed={express === (i === 1)}
              className="min-h-11 cursor-pointer rounded-full px-6 transition-[background-color,color] duration-200 ease-stitch aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
            >
              {label}
            </button>
          ))}
        </div>
        <p key={String(express)} className="t-1 mt-8 animate-[fade-in_700ms_var(--ease-stitch)] text-primary-ink" aria-live="polite">
          {express ? pricing.express : `About ${pricing.deliveryDays} days`}
        </p>
        {rates.length > 0 && (
          <dl className="mt-10 border-t border-ink/15">
            {rates.map(({ item, price }) => (
              <div key={item} className="flex items-baseline justify-between gap-4 border-b border-ink/15 py-3">
                <dt>{item}</dt>
                <dd className="shrink-0 tabular-nums">{rupees(price)}</dd>
              </div>
            ))}
          </dl>
        )}
        <div className="mt-10">
          <Button
            href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I have something that needs altering${express ? ' urgently, on express' : ''}.`)}
            variant="primary"
            icon={IconBrandWhatsapp}
          >
            {express ? 'Ask for express' : 'Send a photo on WhatsApp'}
          </Button>
        </div>
      </div>
    </section>
  )
}
