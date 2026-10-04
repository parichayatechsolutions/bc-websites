// src/sections/fabric/RollFabrics.tsx
// Each fabric they stock seen as the end of a rolled bolt: a round swatch
// inside rings like the layers of the roll, its name and what it's best
// for beneath. (Lab: fabric V, "Roll ends".)
//
// From `fabrics`; photos fabric-<nn>.jpg. Hides without any.
//
// Motion: each swatch eases in from slightly near as the row comes into
// view. Reduced motion: still.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'
import { settle } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

export default function RollFabrics() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const fabrics = boutique.fabrics ?? []

  useMotion(root, () => {
    settle('[data-swatch]', { trigger: root.current })
  })

  if (!fabrics.length) return null

  return (
    <section ref={root} id="fabrics" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Off the roll</h2>
        <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {fabrics.map((f) => (
            <li key={f.name} className="text-center">
              <div className="mx-auto aspect-square w-full max-w-48 rounded-full border-2 border-ink/15 p-1.5">
                <div className="h-full w-full rounded-full border border-ink/20 p-1.5">
                  <div className="h-full w-full rounded-full border border-ink/25 p-1">
                    <div className="h-full w-full overflow-hidden rounded-full bg-paper">
                      <div data-swatch className="h-full w-full">
                        <Media file={f.photo} alt={`${f.name} swatch`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="t-3 mt-4">{f.name}</p>
              {f.bestFor && <p className="t-small mt-1 text-muted">Best for {f.bestFor}</p>}
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
