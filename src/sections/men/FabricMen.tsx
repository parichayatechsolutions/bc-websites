// src/sections/men/FabricMen.tsx
// Bring your own fabric, for him: how much cloth each garment usually
// needs, so he buys the right length before he comes in.
// (Lab: men Q, "Bring your fabric".)
//
// Usual lengths for an average build, labelled as a guide; tall or broad
// builds need more. Needs a Men group in their services. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

const LENGTHS = [
  { garment: 'Shirt', metres: '1.6 to 2' },
  { garment: 'Trousers', metres: '1.2 to 1.4' },
  { garment: 'Kurta', metres: '2.5 to 3' },
  { garment: 'Pyjama or churidar', metres: '2 to 2.5' },
  { garment: 'Nehru jacket', metres: '1.2 to 1.5' },
  { garment: 'Sherwani', metres: '3 to 3.5' },
]

export default function FabricMen() {
  const { boutique } = useBoutique()
  if (!boutique.services.groups.some((g) => /^men/i.test(g.title))) return null

  return (
    <section id="men-fabric" className="section bg-paper">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[12ch] text-balance">Bringing your own fabric?</h2>
          <p className="mt-5 max-w-[32ch] text-muted">How much each garment usually needs, for an average build. Taller or broader? Add a little.</p>
          <div className="mt-8">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, how much fabric should I buy for my outfit?`)} variant="primary" icon={IconBrandWhatsapp}>
              Ask before you buy
            </Button>
          </div>
        </div>
        <dl className="md:col-span-7">
          {LENGTHS.map(({ garment, metres }) => (
            <div key={garment} className="flex items-baseline justify-between gap-4 border-b border-ink/15 py-4">
              <dt className="t-3">{garment}</dt>
              <dd className="shrink-0 tabular-nums text-primary-ink">{metres} m</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
