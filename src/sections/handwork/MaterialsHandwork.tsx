// src/sections/handwork/MaterialsHandwork.tsx
// What handwork is made of: zari, sequins, beads, pearls, kundan stones
// and crystals in a ruled list, each with what it brings to a piece.
// (Lab: emb N, "What it is made of".)
//
// General craft knowledge, not a list of their stock. Needs a handwork
// item in their services. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

const HANDWORK = /aari|maggam|zardosi|zardozi|mirror|bead|stone|embroidery|kantha|chikan|cutwork/i

const MATERIALS = [
  { name: 'Zari', note: 'Metallic thread, gold or silver, the base of most bridal work.' },
  { name: 'Sequins', note: 'Small discs that catch the light; for festive and party wear.' },
  { name: 'Beads', note: 'Glass or crystal, strung into lines and fills.' },
  { name: 'Pearls', note: 'Soft and classic; borders, necklines and drops.' },
  { name: 'Kundan stones', note: 'Flat set stones in gold foil, for a jewellery-like finish.' },
  { name: 'Mirrors', note: 'Small mirrors stitched in place, bright and traditional.' },
]

export default function MaterialsHandwork() {
  const { boutique } = useBoutique()
  const doesHandwork = boutique.services.groups.flatMap((g) => g.items).some((i) => HANDWORK.test(i))
  if (!doesHandwork) return null

  return (
    <section id="handwork-materials" className="section">
      <div className="wrap">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-2 border-ink pb-4">
          <h2 className="t-1">What it’s made of</h2>
          <p className="text-muted">{boutique.brand.name}</p>
        </div>
        <dl className="gap-12 md:columns-2">
          {MATERIALS.map((m) => (
            <div key={m.name} className="break-inside-avoid border-b border-ink/15 py-5">
              <dt className="t-3 text-primary-ink">{m.name}</dt>
              <dd className="mt-1 text-muted">{m.note}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to ask about handwork for my outfit.`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask about handwork
          </Button>
        </div>
      </div>
    </section>
  )
}
