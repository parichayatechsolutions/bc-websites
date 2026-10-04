// src/sections/services/PriceServices.tsx
// One number does the work: their lowest starting price set enormous ("Simple
// blouse from ₹450"), the other prices in a line beneath, delivery times and
// a button to ask. For a boutique whose prices are its pitch, or whose list
// of services is thin. (Lab: services J, "Big price".)
//
// Needs starting prices and permission to show them; hides otherwise.
//
// Motion: the big number counts up once. Reduced motion: the number as
// written.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { rupees } from '../../app/text'
import Button from '../../components/Button'
import { countUp } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { PRICE_NOTE, useServices } from './servicesShared'

export default function PriceServices() {
  const { prices, delivery, askPrice } = useServices()
  const root = useRef<HTMLElement>(null)

  useMotion(root, () => {
    countUp('[data-count]', { trigger: root.current })
  })

  if (!prices.length) return null
  const [first, ...rest] = [...prices].sort((a, b) => a.price - b.price)

  return (
    <section ref={root} id="services" className="section">
      <div className="wrap">
        <h2 className="t-3">{first.item} from</h2>
        <p data-count className="t-hero mt-2 text-primary-ink tabular-nums">
          {rupees(first.price)}
        </p>

        {rest.length > 0 && (
          <ul className="t-3 mt-10 flex flex-wrap gap-x-10 gap-y-3 border-t border-ink/15 pt-8">
            {rest.map(({ item, price }) => (
              <li key={item}>
                {item} <span className="text-muted">from {rupees(price)}</span>
              </li>
            ))}
          </ul>
        )}

        {delivery && <p className="mt-8 text-muted">{delivery}</p>}
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Button href={askPrice} variant="primary" icon={IconBrandWhatsapp}>
            Ask for a price
          </Button>
          <p className="t-small max-w-[40ch] text-muted">{PRICE_NOTE}</p>
        </div>
      </div>
    </section>
  )
}
