// src/sections/men/NotesMen.tsx
// Which cloth for what: men's fabrics in ruled rows (cotton, linen, wool
// blends, silk, khadi, jacquard) with what each is best for.
// (Lab: men H, "Fabric notes".)
//
// General tailoring knowledge, not a list of their stock. Needs a Men
// group in their services. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

const CLOTHS = [
  { name: 'Cotton', note: 'Shirts and kurtas for every day; breathes in the heat.' },
  { name: 'Linen', note: 'Summer shirts and relaxed suits; cool, creases easily.' },
  { name: 'Wool blends', note: 'Suits and trousers that hold a crease; for cooler evenings.' },
  { name: 'Silk', note: 'Kurtas and sherwanis for weddings and festivals.' },
  { name: 'Khadi', note: 'Handspun, textured kurtas and jackets with a soft fall.' },
  { name: 'Jacquard and brocade', note: 'Woven patterns for sherwanis and bandhgalas.' },
]

export default function NotesMen() {
  const { boutique } = useBoutique()
  const forMen = boutique.services.groups.some((g) => /^men/i.test(g.title))
  if (!forMen) return null

  return (
    <section id="men-fabrics" className="section">
      <div className="wrap">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-2 border-ink pb-4">
          <h2 className="t-1">Which cloth for what</h2>
          <p className="text-muted">For men</p>
        </div>
        <dl>
          {CLOTHS.map((c) => (
            <div key={c.name} className="grid gap-1 border-b border-ink/15 py-5 md:grid-cols-12 md:gap-10">
              <dt className="t-2 md:col-span-4">{c.name}</dt>
              <dd className="text-muted md:col-span-8 md:self-center">{c.note}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, which cloth would you suggest for a man's outfit?`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask which suits
          </Button>
        </div>
      </div>
    </section>
  )
}
