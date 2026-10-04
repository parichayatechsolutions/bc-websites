// src/sections/handwork/SamplerHandwork.tsx
// A sampler cloth, the kind embroiderers stitch to show their range: a
// framed panel with a square of each kind of work they do, drawn, and its
// name stitched beneath. (Lab: emb P, "Sampler".)
//
// Only works in their own services that have a drawn texture
// (stitchTextures); needs two. Drawings of the stitches, not their work.
// No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { STITCHES, Texture } from './stitchTextures'

export default function SamplerHandwork() {
  const { boutique } = useBoutique()
  const items = boutique.services.groups.flatMap((g) => g.items)
  const stitches = STITCHES.filter((s) => items.some((i) => s.match.test(i)))
  if (stitches.length < 2) return null

  return (
    <section id="handwork-sampler" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Our sampler</h2>
        <div className="mt-10 border-[10px] border-[#8a5a33] bg-paper p-5 md:p-8">
          <div className="border-2 border-dashed border-thread p-4 md:p-6">
            <p className="t-2 text-center font-display text-primary-ink italic">{boutique.brand.name}</p>
            <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
              {stitches.map((s) => (
                <li key={s.id}>
                  <div className="aspect-square overflow-hidden border border-ink/15">
                    <Texture kind={s.id} size={22} />
                  </div>
                  <p className="t-small mt-2 text-center font-semibold">{s.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to ask about handwork.`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask about handwork
          </Button>
        </div>
      </div>
    </section>
  )
}
