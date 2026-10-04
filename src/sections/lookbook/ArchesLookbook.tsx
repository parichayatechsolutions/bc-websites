// src/sections/lookbook/ArchesLookbook.tsx
// Five looks in a row of tall temple arches, each with its occasion
// beneath, like a corridor of shrines. The arch family's lookbook.
// (Lab: look K, "Arches".)
//
// Looks from photos look-<occasion>-<nn>.jpg, in the order the functions
// happen; up to five. Hides without any. Arches wrap into rows on a phone.
//
// Motion: the arches uncover in turn as they come into view.
// Reduced motion: in place.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import { byFunction, photoTag } from '../../app/photos'
import Media from '../../components/Media'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

export default function ArchesLookbook() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const looks = byFunction(boutique.media.looks ?? [], 'look').slice(0, 5)
  const captions = boutique.media.captions ?? {}

  useMotion(root, () => {
    wipe('[data-arch]', { trigger: root.current })
  })

  if (!looks.length) return null

  return (
    <section ref={root} id="lookbook" className="section">
      <div className="wrap">
        <h2 className="t-1">The lookbook</h2>
        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:grid-cols-5">
          {looks.map((f) => (
            <li key={f}>
              <figure>
                <div data-arch className="arch aspect-[2/3] bg-paper">
                  <Media file={f} alt={captions[f] ?? ''} />
                </div>
                <figcaption className="mt-3 text-center">
                  <span className="t-3 block">{photoTag(f, 'look')}</span>
                  {captions[f] && <span className="t-small mt-1 block text-muted">{captions[f]}</span>}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
