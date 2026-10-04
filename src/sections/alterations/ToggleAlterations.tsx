// src/sections/alterations/ToggleAlterations.tsx
// One large photo with a Before / After switch over it: a tap shows the
// other, which reads more easily on a phone than dragging. More pairs step
// with previous and next. (Lab: alt E, "Tap toggle".)
//
// Needs before/after pairs; hides without them. The photo swaps with a CSS
// fade.

import { useState } from 'react'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import Media from '../../components/Media'
import { AskAboutAlterations, useAlterations } from './altShared'

const ROUND =
  'grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-ink/25 transition-[background-color,color,translate] duration-300 ease-stitch hover:-translate-y-1 hover:bg-ink hover:text-light active:translate-y-0'

export default function ToggleAlterations() {
  const { pairs, caption } = useAlterations()
  const [index, setIndex] = useState(0)
  const [after, setAfter] = useState(true)
  if (!pairs.length) return null

  const pair = pairs[index] ?? pairs[0]
  const file = after ? pair.after : pair.before
  const note = caption(pair)
  const step = (by: number) => {
    setIndex((index + by + pairs.length) % pairs.length)
    setAfter(true)
  }

  return (
    <section id="alterations" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[10ch] text-balance">Before and after</h2>
        <div className="relative mt-10 aspect-[4/5] overflow-hidden bg-paper md:aspect-[4/3]">
          <Media key={file} file={file} alt={`${note ?? 'The garment'}, ${after ? 'after' : 'before'}`} className="animate-[fade-in_700ms_var(--ease-stitch)]" />
          <div className="absolute top-4 left-1/2 inline-flex -translate-x-1/2 rounded-full bg-light p-1" role="group" aria-label="Show">
            {['Before', 'After'].map((side) => (
              <button
                key={side}
                type="button"
                onClick={() => setAfter(side === 'After')}
                aria-pressed={after === (side === 'After')}
                className="min-h-11 cursor-pointer rounded-full px-5 text-ink transition-[background-color,color] duration-200 ease-stitch aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
              >
                {side}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-[50ch] text-muted">{note}</p>
          {pairs.length > 1 && (
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => step(-1)} aria-label="Previous alteration" className={ROUND}>
                <IconChevronLeft size={22} stroke={1.5} aria-hidden="true" />
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Next alteration" className={ROUND}>
                <IconChevronRight size={22} stroke={1.5} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
        <AskAboutAlterations />
      </div>
    </section>
  )
}
