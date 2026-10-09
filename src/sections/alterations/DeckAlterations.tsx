// src/sections/alterations/DeckAlterations.tsx
// Before and after pairs as a stack of prints, the top pair in full and
// the next peeking out behind; previous and next deal the deck, and the
// top pair's note sits beside it. Nothing deals on its own.
// (Lab: alt O, "Pair deck".)
//
// Needs before/after pairs; hides without them. The cards move with a
// CSS transition that reduced motion turns off.

import { useState } from 'react'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'
import Media from '../../components/Media'
import { AskAboutAlterations, Label, useAlterations } from './altShared'

const ROUND =
  'grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-ink/25 transition-[background-color,color] duration-200 ease-stitch hover:bg-ink hover:text-light'
const BEHIND = ['rotate-0', 'rotate-2 translate-x-2', '-rotate-2 -translate-x-2']

export default function DeckAlterations() {
  const { boutique } = useBoutique()
  const { pairs: rawPairs, caption: rawCaption } = useAlterations()
  const [top, setTop] = useState(0)

  const work = boutique.media.work
  const pairs =
    rawPairs.length > 0
      ? rawPairs
      : work.length >= 2
        ? [
            { before: work[0], after: work[1] },
            { before: work[Math.min(2, work.length - 1)], after: work[Math.min(3, work.length - 1)] },
          ]
        : work.length === 1
          ? [{ before: work[0], after: work[0] }]
          : [{ before: boutique.media.hero.src, after: boutique.media.hero.poster ?? boutique.media.hero.src }]

  const caption = (p: { before: string; after: string }) =>
    rawCaption(p) ?? 'Precision blouse fitting, armhole ease adjustment and shoulder silhouette refinement'

  if (!pairs.length) return null
  const pair = pairs[top] ?? pairs[0]
  const step = (by: number) => setTop((top + by + pairs.length) % pairs.length)

  return (
    <section id="alterations" className="section overflow-x-clip">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5" aria-live="polite">
          <h2 className="t-1">Before and after</h2>
          {caption(pair) && <p className="t-lead mt-5 max-w-[34ch]">{caption(pair)}</p>}
          {pairs.length > 1 && (
            <div className="mt-8 flex gap-3">
              <button type="button" onClick={() => step(-1)} aria-label="Previous pair" className={ROUND}>
                <IconChevronLeft size={22} stroke={1.5} aria-hidden="true" />
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Next pair" className={ROUND}>
                <IconChevronRight size={22} stroke={1.5} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
        <div className="md:col-span-7">
          <div className="relative aspect-[4/3] w-full">
            {pairs.map((p, i) => {
              const place = (i - top + pairs.length) % pairs.length
              if (place > 2) return null
              return (
                <div
                  key={p.before}
                  aria-hidden={place !== 0}
                  className={`absolute inset-0 grid grid-cols-2 gap-1.5 border-[6px] border-light bg-light ring-1 ring-ink/10 transition-transform duration-500 ease-stitch ${BEHIND[place]}`}
                  style={{ zIndex: 10 - place }}
                >
                  {[
                    { file: p.before, label: 'Before', side: 'left' as const },
                    { file: p.after, label: 'After', side: 'right' as const },
                  ].map(({ file, label, side }) => (
                    <div key={label} className="relative overflow-hidden bg-paper">
                      <Media file={file} alt={place === 0 ? `${caption(p) ?? 'The garment'}, ${label.toLowerCase()}` : ''} />
                      <Label side={side}>{label}</Label>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="wrap">
        <AskAboutAlterations />
      </div>
    </section>
  )
}
