// src/sections/alterations/StackedAlterations.tsx
// Before above, after below, with an arrow between, so the change reads
// top to bottom the way a phone scrolls. Up to three pairs side by side on
// a computer. (Lab: alt J, "Stacked".)
//
// Needs before/after pairs; hides without them.
//
// Motion: the photos uncover in turn as they come into view.
// Reduced motion: in place.

import { useRef } from 'react'
import { IconArrowDown } from '@tabler/icons-react'
import Media from '../../components/Media'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { AskAboutAlterations, Label, useAlterations } from './altShared'

const COLUMNS = { 1: 'max-w-md', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3' } as Record<number, string>

export default function StackedAlterations() {
  const { pairs, caption } = useAlterations()
  const root = useRef<HTMLElement>(null)
  const shown = pairs.slice(0, 3)

  useMotion(root, () => {
    wipe('[data-stack]', { trigger: root.current })
  })

  if (!shown.length) return null

  return (
    <section ref={root} id="alterations" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[10ch] text-balance">Before and after</h2>
        <ul className={`mt-12 grid gap-12 md:gap-8 ${COLUMNS[shown.length]}`}>
          {shown.map((pair) => (
            <li key={pair.before}>
              <figure>
                {[
                  { file: pair.before, label: 'Before' },
                  { file: pair.after, label: 'After' },
                ].map(({ file, label }, i) => (
                  <div key={label}>
                    {i === 1 && (
                      <span className="my-3 flex justify-center text-thread" aria-hidden="true">
                        <IconArrowDown size={24} stroke={1.5} />
                      </span>
                    )}
                    <div data-stack className="relative aspect-[4/3] overflow-hidden bg-paper">
                      <Media file={file} alt={`${caption(pair) ?? 'The garment'}, ${label.toLowerCase()}`} />
                      <Label side="left">{label}</Label>
                    </div>
                  </div>
                ))}
                {caption(pair) && <figcaption className="mt-4 text-muted">{caption(pair)}</figcaption>}
              </figure>
            </li>
          ))}
        </ul>
        <AskAboutAlterations />
      </div>
    </section>
  )
}
