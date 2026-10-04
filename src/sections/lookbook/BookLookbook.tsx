// src/sections/lookbook/BookLookbook.tsx
// The lookbook as an open book: two looks at a time on facing pages either
// side of a spine, each with its occasion and note; arrows turn to the
// next spread. Nothing turns on its own. On a phone, one page at a time.
// (Lab: look E, "Open book", with a ruled spine instead of a shadow.)
//
// Looks from photos look-<occasion>-<nn>.jpg; up to eight. Hides without
// any. The spread swaps with a CSS fade.

import { useState } from 'react'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'
import { byFunction, photoTag } from '../../app/photos'
import Media from '../../components/Media'

const ROUND =
  'grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-ink/25 transition-[background-color,color] duration-200 ease-stitch hover:bg-ink hover:text-light disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-ink'

export default function BookLookbook() {
  const { boutique } = useBoutique()
  const looks = byFunction(boutique.media.looks ?? [], 'look').slice(0, 8)
  const captions = boutique.media.captions ?? {}
  const [page, setPage] = useState(0)
  if (!looks.length) return null
  const spreads = Math.ceil(looks.length / 2)
  const shown = looks.slice(page * 2, page * 2 + 2)

  return (
    <section id="lookbook" className="section">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="t-1">The lookbook</h2>
          {spreads > 1 && (
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => setPage(page - 1)} disabled={page === 0} aria-label="Previous pages" className={ROUND}>
                <IconChevronLeft size={22} stroke={1.5} aria-hidden="true" />
              </button>
              <span className="t-small min-w-16 text-center tabular-nums text-muted" aria-live="polite">
                {page + 1} of {spreads}
              </span>
              <button type="button" onClick={() => setPage(page + 1)} disabled={page === spreads - 1} aria-label="Next pages" className={ROUND}>
                <IconChevronRight size={22} stroke={1.5} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
        <div key={page} className="mt-10 grid animate-[fade-in_700ms_var(--ease-stitch)] border border-ink/15 bg-paper p-4 md:grid-cols-2 md:p-8">
          {shown.map((f, i) => (
            <figure key={f} className={`py-4 md:py-0 ${i === 0 ? 'md:border-r md:border-ink/25 md:pr-8' : 'border-t border-ink/15 md:border-t-0 md:pl-8'}`}>
              <div className="aspect-[3/4] overflow-hidden bg-light">
                <Media file={f} alt={captions[f] ?? ''} />
              </div>
              <figcaption className="mt-4">
                <span className="t-3 block">{photoTag(f, 'look')}</span>
                {captions[f] && <span className="t-small block text-muted">{captions[f]}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
