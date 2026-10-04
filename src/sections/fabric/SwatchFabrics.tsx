// src/sections/fabric/SwatchFabrics.tsx
// A swatch book: each fabric they stock as a square with a pinked edge, its
// name and what it's best for, and a button to ask about fabrics.
// (Lab: fabric A, "Swatch book".)
//
// Fabrics from `fabrics`; photos fabric-<nn>.jpg. Hides without any.
//
// Motion: the swatches uncover in turn as they come into view.
// Reduced motion: in place.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

// A pinking-shears edge: small zigzags all round the square.
const PINKED = (() => {
  const teeth = 12
  const step = 100 / teeth
  const side = (from: (t: number) => string) => Array.from({ length: teeth }, (_, i) => from(i)).join(',')
  return `polygon(${[
    side((i) => `${i * step}% 0%,${i * step + step / 2}% 2.5%`),
    side((i) => `100% ${i * step}%,97.5% ${i * step + step / 2}%`),
    side((i) => `${100 - i * step}% 100%,${100 - i * step - step / 2}% 97.5%`),
    side((i) => `0% ${100 - i * step}%,2.5% ${100 - i * step - step / 2}%`),
  ].join(',')})`
})()

export default function SwatchFabrics() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const fabrics = boutique.fabrics ?? []

  useMotion(root, () => {
    wipe('[data-swatch]', { trigger: root.current })
  })

  if (!fabrics.length) return null

  return (
    <section ref={root} id="fabrics" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Fabrics we stock</h2>
        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
          {fabrics.map((f) => (
            <li key={f.name}>
              <figure>
                <div data-swatch className="aspect-square bg-paper" style={{ clipPath: PINKED }}>
                  <Media file={f.photo} alt={`${f.name} swatch`} />
                </div>
                <figcaption className="mt-4">
                  <span className="t-3 block">{f.name}</span>
                  {f.bestFor && <span className="t-small mt-1 block text-muted">Best for {f.bestFor}</span>}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to ask about your fabrics.`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask about fabrics
          </Button>
        </div>
      </div>
    </section>
  )
}
