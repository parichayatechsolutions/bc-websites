// src/sections/gallery/CirclesGallery.tsx
// A row of round bubbles with a gold ring, one per kind of work, each
// showing a piece of that kind, like story highlights; tapping one shows
// that kind's work in a grid beneath. (Lab: gallery M, "Story circles",
// opening a grid below rather than a full-screen viewer.)
//
// Kinds from photo names, work-<kind>-<nn>.jpg; needs two. Up to six
// photos per kind. The grid swaps with a CSS fade.

import { useState } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import { photoCategories, photoCategory } from '../../app/photos'
import Media from '../../components/Media'

export default function CirclesGallery() {
  const { boutique } = useBoutique()
  const work = boutique.media.work
  const captions = boutique.media.captions ?? {}
  const kinds = photoCategories(work)
  const [index, setIndex] = useState(0)
  if (kinds.length < 2) return null
  const kind = kinds[index] ?? kinds[0]
  const photos = work.filter((f) => photoCategory(f) === kind).slice(0, 6)

  return (
    <section id="work" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Our work</h2>
        <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-6" role="group" aria-label="Kind of work">
          {kinds.map((k, i) => {
            const cover = work.find((f) => photoCategory(f) === k)!
            return (
              <li key={k}>
                <button type="button" onClick={() => setIndex(i)} aria-pressed={i === index} className="group flex w-20 cursor-pointer flex-col items-center gap-2 md:w-24">
                  <span className="block aspect-square w-full rounded-full p-1 ring-2 ring-accent/50 transition-[box-shadow] duration-200 ease-stitch group-hover:ring-accent group-aria-pressed:ring-4 group-aria-pressed:ring-accent">
                    <span className="block h-full w-full overflow-hidden rounded-full bg-paper">
                      <Media file={cover} alt="" />
                    </span>
                  </span>
                  <span className="t-small text-center group-aria-pressed:font-semibold group-aria-pressed:text-primary-ink">{k}</span>
                </button>
              </li>
            )
          })}
        </ul>
        <ul key={kind} className="mt-10 grid animate-[fade-in_700ms_var(--ease-stitch)] grid-cols-2 gap-3 md:grid-cols-3" aria-live="polite">
          {photos.map((f) => (
            <li key={f} className="aspect-[4/5] overflow-hidden bg-paper">
              <Media file={f} alt={captions[f] ?? `${kind} by ${boutique.brand.name}`} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
