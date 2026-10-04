// src/sections/gallery/SpreadGallery.tsx
// A list of the kinds of work down the left; choosing one lays out a
// magazine spread of that kind on the right: one tall photo and two
// smaller beside it, with their notes. (Lab: gallery F, "Lookbook
// spread".)
//
// Kinds from photo names, work-<kind>-<nn>.jpg; needs two. The spread
// swaps with a CSS fade.

import { useState } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import { photoCategories, photoCategory } from '../../app/photos'
import Media from '../../components/Media'

export default function SpreadGallery() {
  const { boutique } = useBoutique()
  const work = boutique.media.work
  const captions = boutique.media.captions ?? {}
  const kinds = photoCategories(work)
  const [index, setIndex] = useState(0)
  if (kinds.length < 2) return null
  const kind = kinds[index] ?? kinds[0]
  const [lead, ...rest] = work.filter((f) => photoCategory(f) === kind).slice(0, 3)

  return (
    <section id="work" className="section">
      <div className="wrap grid gap-10 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-4">
          <h2 className="t-1">Our work</h2>
          <ul className="mt-8 flex flex-wrap gap-2 md:flex-col md:gap-0 md:border-t md:border-ink/15" role="group" aria-label="Kind of work">
            {kinds.map((k, i) => (
              <li key={k} className="md:border-b md:border-ink/15">
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-pressed={i === index}
                  className="min-h-11 cursor-pointer rounded-full border border-ink/25 px-4 text-left transition-colors duration-200 ease-stitch hover:text-primary-ink aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink md:w-full md:rounded-none md:border-0 md:px-0 md:py-4 md:aria-pressed:bg-transparent md:aria-pressed:text-primary-ink"
                >
                  {k}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div key={kind} className="grid animate-[fade-in_700ms_var(--ease-stitch)] grid-cols-2 gap-3 md:col-span-8" aria-live="polite">
          <figure className={rest.length ? 'row-span-2' : 'col-span-2'}>
            <div className="aspect-[3/4] overflow-hidden bg-paper">
              <Media file={lead} alt={captions[lead] ?? `${kind} by ${boutique.brand.name}`} />
            </div>
            {captions[lead] && <figcaption className="t-small mt-2 text-muted">{captions[lead]}</figcaption>}
          </figure>
          {rest.map((f) => (
            <figure key={f}>
              <div className="aspect-square overflow-hidden bg-paper">
                <Media file={f} alt={captions[f] ?? `${kind} by ${boutique.brand.name}`} />
              </div>
              {captions[f] && <figcaption className="t-small mt-2 text-muted">{captions[f]}</figcaption>}
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
