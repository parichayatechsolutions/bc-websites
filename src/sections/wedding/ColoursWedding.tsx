// src/sections/wedding/ColoursWedding.tsx
// A colour story for the wedding: one palette strip per function, in the
// order they happen, so the outfits across the week hang together.
// (Lab: wed G, "Colour story".)
//
// General palettes (weddingShared), set directly since they're the cloth's
// colours. Shows only for a boutique that does bridal work. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { FUNCTIONS, useWedding } from './weddingShared'

export default function ColoursWedding() {
  const { boutique } = useBoutique()
  const { doesBridal } = useWedding()
  if (!doesBridal) return null

  return (
    <section id="wedding-colours" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[14ch] text-balance">A colour for every function</h2>
        <ul className="mt-12 space-y-4">
          {FUNCTIONS.map((f) => (
            <li key={f.name} className="grid items-center gap-3 sm:grid-cols-[10rem_1fr] sm:gap-8">
              <p className="t-3">{f.name}</p>
              <span aria-hidden="true" className="flex h-12 overflow-hidden rounded-full ring-1 ring-ink/10">
                {f.palette.map((c) => (
                  <span key={c} className="flex-1" style={{ backgroundColor: c }} />
                ))}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, could you help us plan the colours for our wedding outfits?`)} variant="primary" icon={IconBrandWhatsapp}>
            Plan the colours with us
          </Button>
        </div>
      </div>
    </section>
  )
}
