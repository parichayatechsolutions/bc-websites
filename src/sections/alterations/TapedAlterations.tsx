// src/sections/alterations/TapedAlterations.tsx
// Before and after as prints taped to the page: each pair side by side on
// a white mount, held at the top by two strips of tape, the note written
// beneath. Warm and a little informal. (Lab: alt L, "Taped polaroids".)
//
// Needs before/after pairs; up to three. Hides without them. The tilt is
// fixed. No motion.

import Media from '../../components/Media'
import { AskAboutAlterations, Label, useAlterations } from './altShared'

const TURNS = ['-rotate-1', 'rotate-1', '-rotate-[0.5deg]']
const TAPE = 'absolute -top-3 h-6 w-20 bg-accent/35'

export default function TapedAlterations() {
  const { pairs, caption } = useAlterations()
  const shown = pairs.slice(0, 3)
  if (!shown.length) return null

  return (
    <section id="alterations" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[10ch] text-balance">Before and after</h2>
        <ul className="mt-14 grid gap-14 lg:grid-cols-2">
          {shown.map((pair, i) => (
            <li key={pair.before} className={`relative bg-light p-3 pb-5 ring-1 ring-ink/10 ${TURNS[i % TURNS.length]}`}>
              <span aria-hidden="true" className={`${TAPE} left-6 -rotate-6`} />
              <span aria-hidden="true" className={`${TAPE} right-6 rotate-6`} />
              <figure>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { file: pair.before, label: 'Before', side: 'left' as const },
                    { file: pair.after, label: 'After', side: 'right' as const },
                  ].map(({ file, label, side }) => (
                    <div key={label} className="relative aspect-[3/4] overflow-hidden bg-paper">
                      <Media file={file} alt={`${caption(pair) ?? 'The garment'}, ${label.toLowerCase()}`} />
                      <Label side={side}>{label}</Label>
                    </div>
                  ))}
                </div>
                {caption(pair) && <figcaption className="t-3 mt-4 px-1 font-display italic">{caption(pair)}</figcaption>}
              </figure>
            </li>
          ))}
        </ul>
        <AskAboutAlterations />
      </div>
    </section>
  )
}
