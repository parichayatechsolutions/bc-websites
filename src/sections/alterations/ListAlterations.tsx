// src/sections/alterations/ListAlterations.tsx
// What they fix as a list beside one drag-to-compare photo; tapping a line
// shows that alteration. (Lab: alt M, "What we fix".)
//
// The lab's list was a stock set of fixes. Here the list is the notes the
// boutique wrote for its own before/after photos, so it never claims a fix
// they haven't shown. Without notes the list drops away and the photo
// stands alone. Hides without pairs in the config.
//
// Motion: the divider sweeps across and back once as it comes into view.
// Reduced motion: the divider rests in the middle.

import { useRef, useState } from 'react'
import { IconChevronRight } from '@tabler/icons-react'
import { useMotion } from '../../motion/useMotion'
import { AskAboutAlterations, Compare, sweep, useAlterations } from './altShared'

export default function ListAlterations() {
  const { pairs, caption } = useAlterations()
  const [index, setIndex] = useState(0)
  const root = useRef<HTMLElement>(null)

  useMotion(root, () => {
    sweep(root.current)
  })

  if (!pairs.length) return null
  const pair = pairs[index] ?? pairs[0]
  const noted = pairs.map((p, i) => ({ i, note: caption(p) })).filter((p) => p.note)

  return (
    <section ref={root} id="alterations" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">What we can fix</h2>
          {noted.length > 0 && (
            <ul className="mt-10 border-t border-ink/15" role="group" aria-label="Alterations">
              {noted.map(({ i, note }) => (
                <li key={i} className="border-b border-ink/15">
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-pressed={i === index}
                    className="group flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 py-4 text-left transition-colors duration-200 ease-stitch aria-pressed:text-primary-ink"
                  >
                    <span>{note}</span>
                    <IconChevronRight
                      size={20}
                      stroke={1.5}
                      aria-hidden="true"
                      className="shrink-0 transition-transform duration-300 ease-stitch group-hover:translate-x-1"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="md:col-span-7">
          <Compare key={pair.before} pair={pair} caption={caption(pair)} className="aspect-[4/5]" />
          <p className="t-small mt-4 text-muted">Drag across the photo to compare.</p>
        </div>
      </div>
      <div className="wrap">
        <AskAboutAlterations />
      </div>
    </section>
  )
}
