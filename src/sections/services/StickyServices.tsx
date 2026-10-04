// src/sections/services/StickyServices.tsx
// What they stitch as cards, one per group, full of item chips, beside a
// dark price card that stays in view as the groups scroll past on a
// computer. (Lab: services S, "Sticky price card".)
//
// The price card only with permission and starting prices; without it the
// groups take the full width. Hides without services. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'
import { PRICE_NOTE, useServices } from './servicesShared'

export default function StickyServices() {
  const { boutique } = useBoutique()
  const { groups } = useServices()
  const prices = boutique.permissions.showPrices ? (boutique.pricing?.startingAt ?? []) : []
  if (!groups.length) return null

  return (
    <section id="services" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">What we stitch</h2>
        <div className={`mt-12 grid gap-8 ${prices.length ? 'md:grid-cols-12' : ''}`}>
          <ul className={`grid gap-4 sm:grid-cols-2 ${prices.length ? 'md:col-span-8' : 'lg:grid-cols-3'}`}>
            {groups.map((g) => (
              <li key={g.title} className="rounded-2xl border border-ink/15 p-6">
                <h3 className="t-3">{g.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <li key={item} className="t-small rounded-full bg-paper px-3 py-1.5">
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          {prices.length > 0 && (
            <aside className="self-start rounded-2xl bg-dark p-7 text-light md:sticky md:top-24 md:col-span-4">
              <h3 className="t-3">Starting prices</h3>
              <dl className="mt-4">
                {prices.map((p) => (
                  <div key={p.item} className="flex items-baseline justify-between gap-4 border-b border-light/15 py-3">
                    <dt>{p.item}</dt>
                    <dd className="shrink-0 tabular-nums text-accent-on-dark">{rupees(p.price)}</dd>
                  </div>
                ))}
              </dl>
              <p className="t-small mt-4 text-light/70">{PRICE_NOTE}</p>
              <div className="mt-6">
                <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like a price for `)} icon={IconBrandWhatsapp}>
                  Ask for a price
                </Button>
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  )
}
