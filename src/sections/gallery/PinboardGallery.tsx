// src/sections/gallery/PinboardGallery.tsx
// The workroom pinboard: their work as prints taped to a board at slight
// angles, each labelled by kind in the corner, the way tailors keep a wall
// of finished pieces. Warm and a little informal.
// (Lab: gallery S, "Workroom pinboard".)
//
// Up to eight work photos; hides without any. The tilt is fixed, not
// animated.
//
// Motion: the prints settle from a small swing as they come into view.
// Reduced motion: still.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import { photoCategory } from '../../app/photos'
import Media from '../../components/Media'
import { sway } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

const TILTS = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', 'rotate-1', '-rotate-2', 'rotate-2', '-rotate-1']

export default function PinboardGallery() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const prints = boutique.media.work.slice(0, 8)
  const captions = boutique.media.captions ?? {}

  useMotion(root, () => {
    sway('[data-print]', { trigger: root.current })
  })

  if (!prints.length) return null

  return (
    <section ref={root} id="work" className="section bg-paper">
      <div className="wrap">
        <h2 className="t-1">From the workroom wall</h2>
        <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4 md:gap-x-8">
          {prints.map((f, i) => (
            <li key={f} data-print className={TILTS[i % TILTS.length]}>
              <figure className="relative bg-light p-2.5 pb-4">
                <span aria-hidden="true" className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 -rotate-3 bg-accent/40" />
                <div className="aspect-[4/5] overflow-hidden bg-paper">
                  <Media file={f} alt={captions[f] ?? ''} />
                </div>
                <figcaption className="t-small mt-3">{photoCategory(f) ?? captions[f] ?? 'Our work'}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
