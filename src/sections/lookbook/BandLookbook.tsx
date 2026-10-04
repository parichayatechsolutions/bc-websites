// src/sections/lookbook/BandLookbook.tsx
// On the brand colour between two zari borders, the looks each in a fine
// double gold frame with their occasion beneath. (Lab: look I, "Brand
// band".)
//
// Looks from photos look-<occasion>-<nn>.jpg, in the order the functions
// happen; up to four. Hides without any. No motion.

import { useBoutique } from '../../app/BoutiqueContext'
import { byFunction, photoTag } from '../../app/photos'
import Media from '../../components/Media'

export default function BandLookbook() {
  const { boutique } = useBoutique()
  const looks = byFunction(boutique.media.looks ?? [], 'look').slice(0, 4)
  const captions = boutique.media.captions ?? {}
  if (!looks.length) return null

  return (
    <section id="lookbook" className="bg-primary text-on-primary">
      <div className="zari" aria-hidden="true" />
      <div className="section">
        <div className="wrap">
          <h2 className="t-1 max-w-[12ch] text-balance">The lookbook</h2>
          <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
            {looks.map((f) => (
              <li key={f}>
                <figure>
                  <div className="border border-accent p-1">
                    <div className="border border-accent/60 p-1">
                      <div className="aspect-[3/4] overflow-hidden bg-paper">
                        <Media file={f} alt={captions[f] ?? ''} />
                      </div>
                    </div>
                  </div>
                  <figcaption className="mt-4">
                    <span className="t-3 block">{photoTag(f, 'look')}</span>
                    {captions[f] && <span className="t-small block opacity-85">{captions[f]}</span>}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="zari" aria-hidden="true" />
    </section>
  )
}
