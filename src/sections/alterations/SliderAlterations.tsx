// src/sections/alterations/SliderAlterations.tsx
// One large before/after photo to drag across, with its note underneath.
// With more than one pair, previous and next buttons step through them;
// nothing moves on its own. (Lab: alt A, "Drag slider".)
//
// Needs before/after pairs in the config (before-01.jpg with after-01.jpg);
// hides without them.
//
// Motion: the divider sweeps across and back once as it comes into view.
// Reduced motion: the divider rests in the middle.

import { useRef, useState } from 'react'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { useMotion } from '../../motion/useMotion'
import { AskAboutAlterations, Compare, sweep, useAlterations } from './altShared'

const ROUND =
  'grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-ink/25 transition-[background-color,color,translate] duration-300 ease-stitch hover:-translate-y-1 hover:bg-ink hover:text-light active:translate-y-0'

export default function SliderAlterations() {
  const { pairs, caption } = useAlterations()
  const [index, setIndex] = useState(0)
  const root = useRef<HTMLElement>(null)

  useMotion(root, () => {
    sweep(root.current)
  })

  if (!pairs.length) return null
  const pair = pairs[index] ?? pairs[0]
  const step = (by: number) => setIndex((index + by + pairs.length) % pairs.length)

  return (
    <section ref={root} id="alterations" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[10ch] text-balance">Before and after</h2>
        <p className="mt-4 text-muted">Drag across the photo to compare.</p>

        <Compare key={pair.before} pair={pair} caption={caption(pair)} className="mt-10 aspect-[4/5] md:aspect-[16/10]" />

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-[50ch] text-muted">{caption(pair)}</p>
          {pairs.length > 1 && (
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => step(-1)} aria-label="Previous alteration" className={ROUND}>
                <IconChevronLeft size={22} stroke={1.5} aria-hidden="true" />
              </button>
              <span className="t-small min-w-14 text-center text-muted" aria-live="polite">
                {index + 1} of {pairs.length}
              </span>
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
