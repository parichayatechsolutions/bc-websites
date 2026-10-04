// src/sections/men/EastWestMen.tsx
// Ethnic and western, side by side: two panels, one on the brand colour
// and one on paper, each listing what they stitch for men in that style
// with a button to ask. (Lab: men U, "East and west".)
//
// Their Men group's items, sorted by name into the two styles. Shows only
// when both have something, since one panel alone isn't a comparison.
// No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

const ETHNIC = /kurta|sherwani|bandh|jodhpuri|nehru|pathani|dhoti|achkan|indo|veshti|mundu|safa|pagdi/i
const WESTERN = /shirt|trouser|suit|blazer|pant|waistcoat|coat|tuxedo/i

export default function EastWestMen() {
  const { boutique } = useBoutique()
  const items = boutique.services.groups.find((g) => /^men/i.test(g.title))?.items ?? []
  const ethnic = items.filter((i) => ETHNIC.test(i))
  const western = items.filter((i) => !ETHNIC.test(i) && WESTERN.test(i))
  if (!ethnic.length || !western.length) return null

  const panels = [
    { title: 'Ethnic', items: ethnic, dark: true },
    { title: 'Western', items: western, dark: false },
  ]

  return (
    <section id="men" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">For men</h2>
        <div className="mt-12 grid md:grid-cols-2">
          {panels.map((p) => (
            <div key={p.title} className={`flex flex-col p-8 md:p-12 ${p.dark ? 'bg-primary text-on-primary' : 'bg-paper'}`}>
              <h3 className="t-2">{p.title}</h3>
              <ul className="mt-6 mb-10 space-y-3">
                {p.items.map((item) => (
                  <li key={item} className={`border-b pb-3 ${p.dark ? 'border-on-primary/25' : 'border-ink/15'}`}>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <Button
                  href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to ask about ${p.title.toLowerCase()} wear for men.`)}
                  variant={p.dark ? 'outline-light' : 'outline-dark'}
                  icon={IconBrandWhatsapp}
                >
                  Ask about {p.title.toLowerCase()}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
