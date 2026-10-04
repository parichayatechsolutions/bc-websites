// src/sections/lookbook/FunctionsLookbook.tsx
// Every function of the wedding, in order, strung along a dashed thread:
// a look for each (mehendi, haldi, sangeet, wedding, reception) with its
// name and note, across the page on a computer and down it on a phone.
// (Lab: look M, "Every function".)
//
// Looks from photos look-<occasion>-<nn>.jpg, one per function, in the
// order they happen. Hides without any.
//
// Motion: the thread draws itself out once. Reduced motion: in place.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import { byFunction, photoTag } from '../../app/photos'
import Media from '../../components/Media'
import { draw } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

// Static class names, so Tailwind sees them.
const COLUMNS: Record<number, string> = { 3: 'md:grid-cols-3', 4: 'md:grid-cols-4', 5: 'md:grid-cols-5', 6: 'md:grid-cols-6' }

export default function FunctionsLookbook() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const captions = boutique.media.captions ?? {}
  const seen = new Set<string>()
  const looks = byFunction(boutique.media.looks ?? [], 'look').filter((f) => {
    const tag = photoTag(f, 'look') ?? f
    if (seen.has(tag)) return false
    seen.add(tag)
    return true
  }).slice(0, 6)

  useMotion(root, ({ desktop }) => {
    draw('[data-thread]', { trigger: root.current, from: desktop ? 'start' : 'top' })
  })

  if (!looks.length) return null

  return (
    <section ref={root} id="lookbook" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[14ch] text-balance">A look for every function</h2>
        <div className="relative mt-14">
          <span
            data-thread
            aria-hidden="true"
            className="absolute top-4 bottom-4 left-[7px] border-l-2 border-dashed border-thread md:top-4 md:right-0 md:bottom-auto md:left-0 md:border-t-2 md:border-l-0"
          />
          <ol className={`relative grid gap-10 md:gap-6 ${COLUMNS[Math.max(looks.length, 3)]}`}>
            {looks.map((f) => (
              <li key={f} className="grid grid-cols-[2rem_1fr] gap-x-5 md:block">
                <span aria-hidden="true" className="mt-2 block h-4 w-4 rounded-full border-2 border-thread bg-light" />
                <figure className="md:mt-6">
                  <div className="arch aspect-[2/3] max-w-[14rem] bg-paper">
                    <Media file={f} alt={captions[f] ?? ''} />
                  </div>
                  <figcaption className="mt-3">
                    <span className="t-3 block">{photoTag(f, 'look')}</span>
                    {captions[f] && <span className="t-small block text-muted">{captions[f]}</span>}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
