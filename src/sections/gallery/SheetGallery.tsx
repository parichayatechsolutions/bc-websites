// src/sections/gallery/SheetGallery.tsx
// A photographer's contact sheet: their work printed along near-black film
// strips edged with sprocket holes, each frame labelled with its kind in
// gold. (Lab: gallery R, "Contact sheet", without frame numbers, which
// aren't a sequence here.)
//
// Work photos, up to twelve, four to a strip (two on a phone). Hides
// without any.
//
// Motion: each strip's frames uncover from the left as it comes into view.
// Reduced motion: in place.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import { photoCategory } from '../../app/photos'
import Media from '../../components/Media'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

const SPROCKETS = 'h-2.5 border-y-[5px] border-dashed border-light/25'

export default function SheetGallery() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const photos = boutique.media.work.slice(0, 12)
  const captions = boutique.media.captions ?? {}
  const strips = Array.from({ length: Math.ceil(photos.length / 4) }, (_, i) => photos.slice(i * 4, i * 4 + 4))

  useMotion(root, () => {
    wipe('[data-frame]', { trigger: root.current, from: 'left' })
  })

  if (!photos.length) return null

  return (
    <section ref={root} id="work" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Our work</h2>
        <div className="mt-12 space-y-4">
          {strips.map((strip) => (
            <div key={strip[0]} className="bg-dark px-3 py-2 text-light">
              <div aria-hidden="true" className={SPROCKETS} />
              <div>
                <ul className="grid grid-cols-2 gap-3 py-3 md:grid-cols-4">
                  {strip.map((f) => (
                    <li key={f}>
                      <figure>
                        <div data-frame className="aspect-[4/5] overflow-hidden bg-light/5">
                          <Media file={f} alt={captions[f] ?? `Work by ${boutique.brand.name}`} />
                        </div>
                        {(photoCategory(f) ?? captions[f]) && (
                          <figcaption className="t-small mt-2 truncate text-accent-on-dark">{photoCategory(f) ?? captions[f]}</figcaption>
                        )}
                      </figure>
                    </li>
                  ))}
                </ul>
              </div>
              <div aria-hidden="true" className={SPROCKETS} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
