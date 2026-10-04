// src/sections/gallery/WallGallery.tsx
// A gallery wall on their brand colour: the work hung salon-style at mixed
// sizes, each piece in a double frame, like the walls of a fine shop.
// (Lab: gallery I, "Gallery wall".)
//
// Their work photos; hides without any. Columns on a phone become two.
//
// Motion: the frames uncover in turn as they come into view.
// Reduced motion: in place.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import Media from '../../components/Media'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

const SHAPES = ['aspect-[3/4]', 'aspect-square', 'aspect-[4/5]', 'aspect-[3/4]', 'aspect-[5/4]', 'aspect-[4/5]']

export default function WallGallery() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const work = boutique.media.work.slice(0, 9)
  const captions = boutique.media.captions ?? {}

  useMotion(root, () => {
    wipe('[data-frame]', { trigger: root.current })
  })

  if (!work.length) return null

  return (
    <section ref={root} id="work" className="section bg-primary text-on-primary">
      <div className="wrap">
        <h2 className="t-1">Our work</h2>
        <ul className="mt-12 columns-2 gap-4 md:columns-3 md:gap-6 [&>li]:mb-4 [&>li]:break-inside-avoid md:[&>li]:mb-6">
          {work.map((file, i) => (
            <li key={file}>
              <figure data-frame className="border border-current/40 p-1.5">
                <div className={`border border-current/25 ${SHAPES[i % SHAPES.length]} overflow-hidden bg-dark/20`}>
                  <Media file={file} alt={captions[file] ?? ''} />
                </div>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
