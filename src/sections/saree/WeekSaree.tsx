// src/sections/saree/WeekSaree.tsx
// The wedding week's sarees: four ruled columns (mehendi, sangeet,
// wedding, reception), each with the kind of saree it usually calls for
// and which of their saree services it tends to need.
// (Lab: saree J, "Wedding week".)
//
// General guidance; the services listed are only theirs. Needs a saree
// service. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

const SAREE = /fall|pico|pleat|drap|kuchu|tassel|petticoat|polish/i

const DAYS = [
  { name: 'Mehendi', saree: 'Light cotton or georgette in bright colours, easy to sit in.', needs: /fall|pico/i },
  { name: 'Sangeet', saree: 'Something that moves: chiffon, georgette or organza.', needs: /pleat|drap|pico/i },
  { name: 'Wedding', saree: 'The heavy silk: Kanjivaram, Banarasi or pattu.', needs: /fall|pico|kuchu|tassel|pleat|drap/i },
  { name: 'Reception', saree: 'Lighter and dressier: tissue, net or a designer drape.', needs: /pleat|drap|kuchu|tassel/i },
]

export default function WeekSaree() {
  const { boutique } = useBoutique()
  const services = [...new Set(boutique.services.groups.flatMap((g) => g.items).filter((i) => SAREE.test(i)))]
  if (!services.length) return null

  return (
    <section id="saree-week" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[14ch] text-balance">A saree for each day</h2>
        <ul className="mt-12 grid border-t-2 border-ink sm:grid-cols-2 lg:grid-cols-4">
          {DAYS.map((d) => {
            const needs = services.filter((s) => d.needs.test(s))
            return (
              <li key={d.name} className="border-b border-ink/15 py-6 sm:pr-6 lg:border-r lg:border-b-0 lg:pl-6 lg:first:pl-0 lg:last:border-r-0">
                <h3 className="t-2 text-primary-ink">{d.name}</h3>
                <p className="mt-3">{d.saree}</p>
                {needs.length > 0 && <p className="t-small mt-3 text-muted">Often needs {needs.join(', ').toLowerCase()}</p>}
              </li>
            )
          })}
        </ul>
        <div className="mt-10">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I have sarees for a wedding week that need finishing.`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask about your sarees
          </Button>
        </div>
      </div>
    </section>
  )
}
