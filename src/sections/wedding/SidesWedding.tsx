// src/sections/wedding/SidesWedding.tsx
// Both families, both sides: a split screen, the bride's side on paper and
// the groom's side on dark, each listing what they stitch for that side,
// with a button to ask. (Lab: wed R, "Both families".)
//
// From their own services: the bride's side from their bridal, blouse,
// lehenga and saree work, the groom's from their Men group. Needs both.
// No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { useWedding } from './weddingShared'

const BRIDE = /bridal|blouse|lehenga|saree|sari|half saree|gown|anarkali|maggam|aari/i

export default function SidesWedding() {
  const { boutique } = useBoutique()
  const { doesBridal } = useWedding()
  const groups = boutique.services.groups
  const groom = groups.find((g) => /^men/i.test(g.title))?.items ?? []
  const bride = [...new Set(groups.filter((g) => !/^men/i.test(g.title)).flatMap((g) => g.items).filter((i) => BRIDE.test(i)))].slice(0, 8)
  if (!doesBridal || !groom.length || !bride.length) return null

  const sides = [
    { title: 'The bride’s side', items: bride, dark: false },
    { title: 'The groom’s side', items: groom.slice(0, 8), dark: true },
  ]

  return (
    <section id="wedding-sides" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Both families, both sides</h2>
        <div className="mt-12 grid md:grid-cols-2">
          {sides.map((s) => (
            <div key={s.title} className={`flex flex-col p-8 md:p-12 ${s.dark ? 'bg-dark text-light' : 'bg-paper'}`}>
              <h3 className="t-2">{s.title}</h3>
              <ul className="mt-6 mb-10 space-y-3">
                {s.items.map((item) => (
                  <li key={item} className={`border-b pb-3 ${s.dark ? 'border-light/15' : 'border-ink/15'}`}>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <Button
                  href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to talk about outfits for the ${s.dark ? 'groom' : 'bride'}'s side of a wedding.`)}
                  variant={s.dark ? 'outline-light' : 'outline-dark'}
                  icon={IconBrandWhatsapp}
                >
                  Ask for {s.dark ? 'the groom’s side' : 'the bride’s side'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
