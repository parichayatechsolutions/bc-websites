// src/sections/lookbook/FilmLookbook.tsx
// Dark and cinematic: one look at a time in a wide frame, its occasion and
// note beneath, and a strip of thumbnails to choose from, with previous and
// next. Nothing moves on its own. (Lab: look V, "Filmstrip".)
//
// Looks from photos look-<occasion>-<nn>.jpg; hides without any. The photo
// swaps with a CSS fade.

import { useState } from 'react'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'
import { byFunction, photoTag } from '../../app/photos'
import Media from '../../components/Media'

const ROUND =
  'grid h-12 w-12 cursor-pointer place-items-center rounded-full bg-light/10 text-light transition-[background-color,translate] duration-300 ease-stitch hover:-translate-y-1 hover:bg-light/20 active:translate-y-0'

export default function FilmLookbook() {
  const { boutique } = useBoutique()
  const looks = byFunction(boutique.media.looks ?? [], 'look')
  const captions = boutique.media.captions ?? {}
  const [index, setIndex] = useState(0)
  if (!looks.length) return null
  const file = looks[index] ?? looks[0]
  const step = (by: number) => setIndex((index + by + looks.length) % looks.length)

  return (
    <section id="lookbook" className="section bg-dark text-light">
      <div className="wrap">
        <h2 className="t-1">The lookbook</h2>
        <div className="mt-10 aspect-[4/5] overflow-hidden bg-light/5 sm:aspect-[16/9]">
          <Media key={file} file={file} alt={captions[file] ?? ''} className="animate-[fade-in_700ms_var(--ease-stitch)]" />
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4" aria-live="polite">
          <p>
            {photoTag(file, 'look') && <span className="t-small block text-accent-on-dark">{photoTag(file, 'look')}</span>}
            {captions[file] && <span className="text-light/85">{captions[file]}</span>}
          </p>
          {looks.length > 1 && (
            <div className="flex gap-3">
              <button type="button" onClick={() => step(-1)} aria-label="Previous look" className={ROUND}>
                <IconChevronLeft size={22} stroke={1.5} aria-hidden="true" />
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Next look" className={ROUND}>
                <IconChevronRight size={22} stroke={1.5} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
        {looks.length > 1 && (
          <ul className="mt-8 grid grid-cols-4 gap-1 sm:grid-cols-6 md:grid-cols-8" aria-label="Choose a look">
            {looks.map((f, i) => (
              <li key={f}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-pressed={i === index}
                  aria-label={captions[f] ?? `Look ${i + 1}`}
                  className="block aspect-square w-full cursor-pointer overflow-hidden opacity-50 transition-opacity duration-200 ease-stitch hover:opacity-100 aria-pressed:opacity-100 aria-pressed:outline-2 aria-pressed:outline-offset-2 aria-pressed:outline-accent"
                >
                  <Media file={f} alt="" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
