// src/sections/gallery/ColonnadeGallery.tsx
// What they make, as a temple corridor: one tall arch per category (Bridal,
// Blouses, Lehengas…) holding a piece from it, the name and count beneath.
// The arch family's way into the work. (Lab: gallery E, "Arch colonnade".)
//
// Categories come from the photo names (work-bridal-01.jpg); hides with
// fewer than two. Arches wrap into rows on a phone, never scroll sideways.
//
// Motion: the arches uncover in turn as they come into view.
// Reduced motion: the arches in place.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import { photoCategories, photoCategory } from '../../app/photos'
import Media from '../../components/Media'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

const COLUMNS = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4', 5: 'md:grid-cols-5' } as Record<number, string>

export default function ColonnadeGallery() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const work = boutique.media.work
  const kinds = photoCategories(work)
    .slice(0, 5)
    .map((kind) => {
      const files = work.filter((f) => photoCategory(f) === kind)
      return { kind, file: files[0], count: files.length }
    })

  useMotion(root, () => {
    wipe('[data-arch]', { trigger: root.current })
  })

  if (kinds.length < 2) return null

  return (
    <section ref={root} id="work" className="section">
      <div className="wrap">
        <h2 className="t-1">What we make</h2>
        <ul className={`mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 ${COLUMNS[kinds.length]}`}>
          {kinds.map(({ kind, file, count }) => (
            <li key={kind}>
              <figure>
                <div data-arch className="arch aspect-[2/3] w-full bg-paper">
                  <Media file={file} alt="" />
                </div>
                <figcaption className="mt-4 text-center">
                  <span className="t-3 block">{kind}</span>
                  <span className="t-small text-muted">{count === 1 ? '1 piece' : `${count} pieces`}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
