// src/sections/fabric/PinboardFabrics.tsx
// The workroom pinboard: swatches of the fabrics they stock taped to a
// board at slight angles, each with its name written beneath. Warm and a
// little informal. (Lab: fabric L, "Workroom pinboard".)
//
// From `fabrics`; up to eight. Hides without any. The angles are fixed.
// No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'

const TURNS = ['-rotate-2', 'rotate-2', 'rotate-1', '-rotate-1', 'rotate-3', '-rotate-3', 'rotate-1', '-rotate-2']

export default function PinboardFabrics() {
  const { boutique } = useBoutique()
  const fabrics = (boutique.fabrics ?? []).slice(0, 8)
  if (!fabrics.length) return null

  return (
    <section id="fabrics" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">On our board</h2>
        <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 bg-paper p-6 md:grid-cols-4 md:p-10">
          {fabrics.map((f, i) => (
            <li key={f.name} className={`relative bg-light p-2 pb-4 ring-1 ring-ink/10 ${TURNS[i % TURNS.length]}`}>
              <span aria-hidden="true" className="absolute -top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 -rotate-3 bg-accent/35" />
              <div className="aspect-square overflow-hidden bg-paper">
                <Media file={f.photo} alt={`${f.name} swatch`} />
              </div>
              <p className="t-3 mt-3 text-center font-display italic">{f.name}</p>
              {f.bestFor && <p className="t-small mt-1 text-center text-muted">{f.bestFor}</p>}
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to ask about your fabrics.`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask about fabrics
          </Button>
        </div>
      </div>
    </section>
  )
}
