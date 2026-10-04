// src/sections/gallery/DiamondGallery.tsx
// On the brand colour, their work cut into diamonds with a fine gold
// edge, set in a lattice like a carved jaali screen.
// (Lab: gallery Q, "Diamond lattice".)
//
// Work photos, up to eight: rows of four on a computer, two on a phone,
// the diamonds meeting at their points. Hides without any.
//
// Motion: the diamonds uncover in turn as they come into view.
// Reduced motion: in place.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import Media from '../../components/Media'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

const DIAMOND = 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)'

export default function DiamondGallery() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const photos = boutique.media.work.slice(0, 8)
  const captions = boutique.media.captions ?? {}

  useMotion(root, () => {
    wipe('[data-diamond]', { trigger: root.current })
  })

  if (!photos.length) return null

  return (
    <section ref={root} id="work" className="section bg-primary text-on-primary">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Our work</h2>
        <ul className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center">
          {photos.map((f) => (
            <li key={f} data-diamond className="w-1/2 p-0.5 md:w-1/4">
              <div className="aspect-square bg-accent p-[3px]" style={{ clipPath: DIAMOND }}>
                <div className="h-full w-full overflow-hidden bg-paper" style={{ clipPath: DIAMOND }}>
                  <Media file={f} alt={captions[f] ?? `Work by ${boutique.brand.name}`} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
