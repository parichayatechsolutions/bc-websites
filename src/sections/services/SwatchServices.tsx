// src/sections/services/SwatchServices.tsx
// Each group of what they stitch on its own colour card, like a shade
// card: brand colour, accent, dark and paper in turn, the items listed on
// each. (Lab: services I, "Swatch cards".)
//
// Their own groups; the card colours are the brand's own roles, so text
// stays readable. Hides without services. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { useServices } from './servicesShared'

const CARDS = ['bg-primary text-on-primary', 'bg-accent text-on-accent', 'bg-dark text-light', 'bg-paper text-ink']

export default function SwatchServices() {
  const { boutique } = useBoutique()
  const { groups } = useServices()
  if (!groups.length) return null

  return (
    <section id="services" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">What we stitch</h2>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((g, i) => (
            <li key={g.title} className={`flex flex-col rounded-2xl p-7 ${CARDS[i % CARDS.length]}`}>
              <h3 className="t-2">{g.title}</h3>
              <ul className="mt-6 space-y-2 opacity-90">
                {g.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like a price for `)} variant="primary" icon={IconBrandWhatsapp}>
            Ask for a price
          </Button>
        </div>
      </div>
    </section>
  )
}
