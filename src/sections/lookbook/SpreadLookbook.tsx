// src/sections/lookbook/SpreadLookbook.tsx
// A lookbook told in chapters, one per occasion (haldi, sangeet, wedding,
// reception…): choosing a chapter lays out a magazine spread of one tall
// photo and two smaller, with the note for each. (Lab: look A, "Editorial
// spread".)
//
// Looks come from photos named look-<occasion>-<nn>.jpg, in the order the
// functions happen. Hides without any. Chapters show only when there are
// two or more occasions.
//
// Motion: the spread uncovers once as it comes into view; changing chapter
// swaps the photos with a CSS fade. Reduced motion: no uncovering.

import { useRef, useState } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import { byFunction, photoCategory, photoTag } from '../../app/photos'
import Media from '../../components/Media'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

export default function SpreadLookbook() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const looks = (boutique.media.looks && boutique.media.looks.length > 0)
    ? byFunction(boutique.media.looks, 'look')
    : boutique.media.work
  const captions = boutique.media.captions ?? {}
  const chapters = [...new Set(looks.map((f) => photoTag(f, 'look') ?? photoCategory(f) ?? 'Couture'))]
  const [chapter, setChapter] = useState(chapters[0])

  useMotion(root, () => {
    wipe('[data-spread] > *', { trigger: root.current })
  })

  if (!looks.length) return null
  const shown = looks.filter((f) => (photoTag(f, 'look') ?? photoCategory(f) ?? 'Couture') === chapter).slice(0, 3)
  const [tall, ...small] = shown.length ? shown : looks.slice(0, 3)

  return (
    <section ref={root} id="lookbook" className="section">
      <div className="wrap">
        <h2 className="t-1">The lookbook</h2>
        {chapters.length > 1 && (
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Occasion">
            {chapters.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setChapter(c)}
                aria-pressed={c === chapter}
                className="min-h-11 cursor-pointer rounded-full border border-ink/25 px-5 transition-[background-color,border-color,color,scale] duration-200 ease-stitch hover:border-ink active:scale-[0.97] aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
              >
                {c}
              </button>
            ))}
          </div>
        )}

        <div data-spread className="mt-10 grid gap-3 md:grid-cols-12 md:gap-4">
          <figure className={small.length ? 'md:col-span-7' : 'md:col-span-8'}>
            <div className="aspect-[4/5] overflow-hidden bg-paper">
              <Media key={tall} file={tall} alt={captions[tall] ?? ''} className="animate-[fade-in_700ms_var(--ease-stitch)]" />
            </div>
            {captions[tall] && <figcaption className="t-small mt-3 text-muted">{captions[tall]}</figcaption>}
          </figure>
          {small.length > 0 && (
            <div className="grid grid-cols-2 gap-3 md:col-span-5 md:grid-cols-1 md:content-end md:gap-4">
              {small.map((f) => (
                <figure key={f}>
                  <div className="aspect-[4/3] overflow-hidden bg-paper">
                    <Media file={f} alt={captions[f] ?? ''} className="animate-[fade-in_700ms_var(--ease-stitch)]" />
                  </div>
                  {captions[f] && <figcaption className="t-small mt-2 text-muted">{captions[f]}</figcaption>}
                </figure>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
