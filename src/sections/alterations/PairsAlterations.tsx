// src/sections/alterations/PairsAlterations.tsx
// Every before/after pair laid out side by side with its note, nothing to
// drag or tap. Shows the range of what they fix at a glance.
// (Lab: alt C, "Pairs grid".)
//
// Needs before/after pairs in the config; hides without them.
//
// Motion: the pairs uncover in turn as they come into view.
// Reduced motion: the pairs in place.

import { useRef } from 'react'
import Media from '../../components/Media'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { AskAboutAlterations, Label, useAlterations } from './altShared'

export default function PairsAlterations() {
  const { pairs, caption } = useAlterations()
  const root = useRef<HTMLElement>(null)

  useMotion(root, () => {
    wipe('[data-pair]', { trigger: root.current })
  })

  if (!pairs.length) return null

  return (
    <section ref={root} id="alterations" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[10ch] text-balance">Before and after</h2>

        <ul className={`mt-12 grid gap-x-8 gap-y-12 ${pairs.length > 1 ? 'md:grid-cols-2' : 'max-w-3xl'}`}>
          {pairs.map((pair) => (
            <li key={pair.before}>
              <figure>
                <div data-pair className="grid grid-cols-2 gap-1">
                  {[
                    { file: pair.before, label: 'Before' },
                    { file: pair.after, label: 'After' },
                  ].map(({ file, label }) => (
                    <div key={label} className="relative aspect-[3/4] overflow-hidden bg-paper">
                      <Media file={file} alt={`${caption(pair) ?? 'The garment'}, ${label.toLowerCase()}`} />
                      <Label side="left">{label}</Label>
                    </div>
                  ))}
                </div>
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
