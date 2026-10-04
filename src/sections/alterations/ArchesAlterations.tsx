// src/sections/alterations/ArchesAlterations.tsx
// Before and after, each in a tall temple arch side by side, with the note
// beneath: the arch family's version. Up to two pairs.
// (Lab: alt K, "Arch pairs".)
//
// Needs before/after pairs; hides without them.
//
// Motion: the arches uncover in turn as they come into view.
// Reduced motion: in place.

import { useRef } from 'react'
import Media from '../../components/Media'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { AskAboutAlterations, useAlterations } from './altShared'

export default function ArchesAlterations() {
  const { pairs, caption } = useAlterations()
  const root = useRef<HTMLElement>(null)
  const shown = pairs.slice(0, 2)

  useMotion(root, () => {
    wipe('[data-arch]', { trigger: root.current })
  })

  if (!shown.length) return null

  return (
    <section ref={root} id="alterations" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[10ch] text-balance">Before and after</h2>
        <ul className="mt-12 space-y-14">
          {shown.map((pair) => (
            <li key={pair.before}>
              <figure>
                <div className="grid max-w-3xl grid-cols-2 gap-4 md:gap-8">
                  {[
                    { file: pair.before, label: 'Before' },
                    { file: pair.after, label: 'After' },
                  ].map(({ file, label }) => (
                    <div key={label}>
                      <div data-arch className="arch aspect-[2/3] bg-paper">
                        <Media file={file} alt={`${caption(pair) ?? 'The garment'}, ${label.toLowerCase()}`} />
                      </div>
                      <p className="t-small mt-3 text-center text-muted">{label}</p>
                    </div>
                  ))}
                </div>
                {caption(pair) && <figcaption className="t-3 mt-6 max-w-3xl">{caption(pair)}</figcaption>}
              </figure>
            </li>
          ))}
        </ul>
        <AskAboutAlterations />
      </div>
    </section>
  )
}
