// src/sections/services/MenuServices.tsx
// Dark and ceremonial, framed like a printed menu: the starting prices with
// dotted leaders, what they stitch grouped underneath, the delivery times,
// and a button to ask for a price. For the darker, formal designs.
// (Lab: services D, "Tailoring menu".)
//
// Prices only with the boutique's permission; without them the menu shows
// the groups alone. Hides when nothing is listed at all.
//
// Motion: the gold frame draws out from the centre once.
// Reduced motion: the frame in place.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'
import { draw } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { PRICE_NOTE, useServices } from './servicesShared'

export default function MenuServices() {
  const { boutique } = useBoutique()
  const { groups, prices, delivery, askPrice } = useServices()
  const root = useRef<HTMLElement>(null)

  useMotion(root, () => {
    draw('[data-frame]', { trigger: root.current })
  })

  if (!groups.length && !prices.length) return null

  return (
    <section ref={root} id="services" className="section bg-dark text-light">
      <div className="wrap">
        <div data-frame className="border border-accent-on-dark/50 p-1.5">
          <div className="border border-accent-on-dark/25 px-6 py-12 text-center md:px-14 md:py-16">
            <h2 className="t-1">The tailoring menu</h2>
            <p className="t-small mt-3 text-light/70">{boutique.brand.name}</p>

            {prices.length > 0 && (
              <>
                <dl className="mx-auto mt-12 max-w-xl space-y-4 text-left">
                  {prices.map(({ item, price }) => (
                    <div key={item} className="flex items-baseline gap-3">
                      <dt>{item}</dt>
                      <span aria-hidden="true" className="mb-1.5 flex-1 border-b border-dotted border-light/35" />
                      <dd className="t-3 text-accent-on-dark">from {rupees(price)}</dd>
                    </div>
                  ))}
                </dl>
                <p className="t-small mt-6 text-light/60">{PRICE_NOTE}</p>
              </>
            )}

            {groups.length > 0 && (
              <div className="mx-auto mt-14 grid max-w-3xl gap-x-12 gap-y-8 text-left sm:grid-cols-2">
                {groups.map((g) => (
                  <div key={g.title}>
                    <h3 className="t-3 text-accent-on-dark">{g.title}</h3>
                    <p className="mt-2 text-light/80">{g.items.join(', ')}</p>
                  </div>
                ))}
              </div>
            )}

            {delivery && <p className="t-small mt-12 text-light/70">{delivery}</p>}
            <div className="mt-8">
              <Button href={askPrice} icon={IconBrandWhatsapp}>
                Ask for a price
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
