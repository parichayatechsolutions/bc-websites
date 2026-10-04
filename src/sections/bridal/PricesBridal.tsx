// src/sections/bridal/PricesBridal.tsx
// Bridal packages led by their starting prices, set large in a ruled grid
// with the package name and a line of what's in it, and one button to book
// a consult. (Lab: bridal M, "Big prices".)
//
// Needs packages with prices and the boutique's permission to show them;
// hides otherwise.
//
// Motion: the prices count up once. Reduced motion: as written.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'
import { capitalise, rupees } from '../../app/text'
import Button from '../../components/Button'
import { countUp } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { useBridal } from './bridalShared'

export default function PricesBridal() {
  const { boutique } = useBoutique()
  const { packages, consult } = useBridal()
  const root = useRef<HTMLElement>(null)
  const priced = boutique.permissions.showPrices ? packages.filter((p) => p.price) : []

  useMotion(root, () => {
    countUp('[data-count]', { trigger: root.current })
  })

  if (!priced.length) return null

  return (
    <section ref={root} id="bridal" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Bridal, from</h2>
        <ul className={`mt-12 grid gap-px bg-ink/15 ${priced.length > 2 ? 'md:grid-cols-3' : priced.length === 2 ? 'md:grid-cols-2' : 'max-w-xl'}`}>
          {priced.map((p) => (
            <li key={p.name} className="bg-light p-7 md:p-8">
              <p data-count className="t-1 tabular-nums text-primary-ink">
                {rupees(p.price!)}
              </p>
              <h3 className="t-3 mt-4">{p.name}</h3>
              {p.includes.length > 0 && <p className="t-small mt-2 text-muted">{capitalise(p.includes.join(', '))}.</p>}
            </li>
          ))}
        </ul>
        <p className="t-small mt-6 text-muted">Starting prices. The final price depends on your design and fabric.</p>
        <div className="mt-8">
          <Button href={consult} variant="primary" icon={IconBrandWhatsapp}>
            Book a bridal consult
          </Button>
        </div>
      </div>
    </section>
  )
}
