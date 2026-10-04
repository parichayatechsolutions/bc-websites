// src/sections/alterations/DiagonalAlterations.tsx
// Before and after in one frame, split on the bias: the before photo in the
// upper-left triangle, the after in the lower-right, a fine line along the
// cut. Reads at a glance, nothing to drag. (Lab: alt G, "Diagonal split".)
//
// Needs before/after pairs; up to two shown. Hides without them. No motion.

import Media from '../../components/Media'
import { AskAboutAlterations, Label, useAlterations } from './altShared'

export default function DiagonalAlterations() {
  const { pairs, caption } = useAlterations()
  const shown = pairs.slice(0, 2)
  if (!shown.length) return null

  return (
    <section id="alterations" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[10ch] text-balance">Before and after</h2>
        <ul className={`mt-12 grid gap-10 ${shown.length > 1 ? 'md:grid-cols-2' : 'max-w-2xl'}`}>
          {shown.map((pair) => (
            <li key={pair.before}>
              <figure>
                <div className="relative aspect-square overflow-hidden bg-paper">
                  <div className="absolute inset-0 [clip-path:polygon(0_0,100%_0,0_100%)]">
                    <Media file={pair.before} alt={`${caption(pair) ?? 'The garment'}, before`} />
                  </div>
                  <div className="absolute inset-0 [clip-path:polygon(100%_0,100%_100%,0_100%)]">
                    <Media file={pair.after} alt={`${caption(pair) ?? 'The garment'}, after`} />
                  </div>
                  <span aria-hidden="true" className="absolute top-1/2 left-1/2 h-px w-[142%] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-light" />
                  <Label side="left">Before</Label>
                  <span className="t-small absolute right-3 bottom-3 bg-dark/75 px-2.5 py-1 text-light">After</span>
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
