// src/sections/services/MedallionServices.tsx
// Three round medallions with a fine gold edge, each holding a starting
// price, above every group of what they stitch in ruled columns.
// (Lab: services L, "Price medallions".)
//
// Medallions only with permission and starting prices (the first three);
// the groups always. Hides without any services. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'
import { PRICE_NOTE, useServices } from './servicesShared'

export default function MedallionServices() {
  const { boutique } = useBoutique()
  const { groups } = useServices()
  const prices = boutique.permissions.showPrices ? (boutique.pricing?.startingAt ?? []).slice(0, 3) : []
  if (!groups.length) return null

  return (
    <section id="services" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">What we stitch</h2>
        {prices.length > 0 && (
          <>
            <ul className="mt-12 flex flex-wrap justify-center gap-6 md:justify-start md:gap-10">
              {prices.map((p) => (
                <li key={p.item} className="grid aspect-square w-40 place-items-center rounded-full border-2 border-accent p-1.5 md:w-48">
                  <div className="grid h-full w-full place-content-center rounded-full bg-paper p-4 text-center">
                    <p className="t-small text-pretty text-muted">{p.item} from</p>
                    <p className="t-2 mt-1 tabular-nums text-primary-ink">{rupees(p.price)}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="t-small mt-6 text-muted">{PRICE_NOTE}</p>
          </>
        )}
        <div className="mt-14 gap-12 sm:columns-2 lg:columns-3">
          {groups.map((g) => (
            <div key={g.title} className="mb-10 break-inside-avoid">
              <h3 className="t-3 border-b-2 border-ink pb-2">{g.title}</h3>
              <ul>
                {g.items.map((item) => (
                  <li key={item} className="border-b border-ink/15 py-2.5">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like a price for `)} variant="primary" icon={IconBrandWhatsapp}>
          Ask for a price
        </Button>
      </div>
    </section>
  )
}
