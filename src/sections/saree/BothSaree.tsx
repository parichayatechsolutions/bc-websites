// src/sections/saree/BothSaree.tsx
// One drop-off for both: bring the saree and its blouse piece together,
// and the blouse is stitched while the saree is finished; two columns for
// what each gets, from their own services. (Lab: saree Y, "Saree +
// blouse".)
//
// Needs a blouse item and a saree service in their services. It asks;
// timings aren't promised. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

const SAREE = /fall|pico|pleat|drap|kuchu|tassel|petticoat|polish/i
const BLOUSE = /blouse/i

export default function BothSaree() {
  const { boutique } = useBoutique()
  const items = [...new Set(boutique.services.groups.flatMap((g) => g.items))]
  const saree = items.filter((i) => SAREE.test(i))
  const blouse = items.filter((i) => BLOUSE.test(i))
  if (!saree.length || !blouse.length) return null

  const columns = [
    { title: 'The blouse', items: blouse },
    { title: 'The saree', items: saree },
  ]

  return (
    <section id="saree-both" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[14ch] text-balance">Bring both together</h2>
        <p className="t-lead mt-5 max-w-[44ch] text-muted">The saree and its blouse piece in one visit: we work on both.</p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {columns.map((c) => (
            <div key={c.title} className="rounded-2xl bg-paper p-7">
              <h3 className="t-2">{c.title}</h3>
              <ul className="mt-4 space-y-2">
                {c.items.map((i) => (
                  <li key={i} className="border-b border-ink/10 pb-2">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to bring a saree and its blouse piece together: the blouse stitched and the saree finished.`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask about both
          </Button>
        </div>
      </div>
    </section>
  )
}
