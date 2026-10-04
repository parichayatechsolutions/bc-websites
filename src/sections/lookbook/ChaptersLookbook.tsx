// src/sections/lookbook/ChaptersLookbook.tsx
// Dark, one chapter per occasion: a wide photograph for each, with the
// occasion set large beneath it and its note, chapter after chapter down
// the page. (Lab: look B, "Chapters".)
//
// Looks from photos look-<occasion>-<nn>.jpg, one per occasion, in the
// order the functions happen; up to five. Hides without any.
//
// Motion: each photo uncovers as it comes into view. Reduced motion: in
// place.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import { byFunction, photoTag } from '../../app/photos'
import Media from '../../components/Media'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

export default function ChaptersLookbook() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const captions = boutique.media.captions ?? {}
  const seen = new Set<string>()
  const chapters = byFunction(boutique.media.looks ?? [], 'look')
    .filter((f) => {
      const tag = photoTag(f, 'look') ?? f
      if (seen.has(tag)) return false
      seen.add(tag)
      return true
    })
    .slice(0, 5)

  useMotion(root, () => {
    for (const el of root.current!.querySelectorAll('[data-chapter]')) wipe(el, { trigger: el })
  })

  if (!chapters.length) return null

  return (
    <section ref={root} id="lookbook" className="section bg-dark text-light">
      <div className="wrap">
        <h2 className="t-1">The lookbook</h2>
        <ol className="mt-12 space-y-20 md:space-y-28">
          {chapters.map((f) => (
            <li key={f}>
              <figure>
                <div data-chapter className="aspect-[4/5] overflow-hidden bg-light/5 sm:aspect-[16/9]">
                  <Media file={f} alt={captions[f] ?? ''} />
                </div>
                <figcaption className="mt-6 flex flex-wrap items-baseline justify-between gap-x-10 gap-y-2">
                  <span className="t-hero">{photoTag(f, 'look')}</span>
                  {captions[f] && <span className="max-w-[36ch] text-light/80">{captions[f]}</span>}
                </figcaption>
              </figure>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
