// src/sections/gallery/ClothesGallery.tsx
// Their work hanging from a thread rail on hooks, with chips for each
// kind of work that change what hangs. (Lab: gallery W, "Clothes rail".)
//
// Kinds from photo names, work-<kind>-<nn>.jpg; chips only with two or
// more kinds. Up to four pieces on the rail. Hides without work.
//
// Motion: the pieces settle from a small swing as the rail comes into
// view. Reduced motion: hanging still.

import { useRef, useState } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import { photoCategories, photoCategory } from '../../app/photos'
import Media from '../../components/Media'
import { sway } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

export default function ClothesGallery() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const work = boutique.media.work
  const captions = boutique.media.captions ?? {}
  const kinds = photoCategories(work)
  const [kind, setKind] = useState<string>()
  const pieces = (kind ? work.filter((f) => photoCategory(f) === kind) : work).slice(0, 4)

  useMotion(root, () => {
    sway('[data-piece]', { trigger: root.current })
  })

  if (!work.length) return null

  return (
    <section ref={root} id="work" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">From the rail</h2>
        {kinds.length > 1 && (
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Kind of work">
            {[undefined, ...kinds].map((k) => (
              <button
                key={k ?? 'all'}
                type="button"
                onClick={() => setKind(k)}
                aria-pressed={kind === k}
                className="min-h-11 cursor-pointer rounded-full border border-ink/25 px-5 transition-[background-color,border-color,color] duration-200 ease-stitch hover:border-ink aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
              >
                {k ?? 'All'}
              </button>
            ))}
          </div>
        )}
        <div className="relative mt-12">
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 rounded-full bg-thread" />
          <ul key={kind ?? 'all'} className="grid animate-[fade-in_700ms_var(--ease-stitch)] grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
            {pieces.map((f) => (
              <li key={f} data-piece className="flex flex-col items-center">
                <span aria-hidden="true" className="h-8 w-4 rounded-t-full border-2 border-b-0 border-ink/50" />
                <figure className="w-full">
                  <div className="arch aspect-[2/3] bg-paper">
                    <Media file={f} alt={captions[f] ?? `Work by ${boutique.brand.name}`} />
                  </div>
                  {(captions[f] ?? photoCategory(f)) && <figcaption className="t-small mt-3 text-center text-muted">{captions[f] ?? photoCategory(f)}</figcaption>}
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
