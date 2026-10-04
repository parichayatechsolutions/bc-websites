// src/sections/alterations/StoryAlterations.tsx
// "A second life", set as a magazine cover story: one before and after
// pair large under a ruled masthead, its note as the standfirst opening
// with a drop capital, and any other pairs small beneath.
// (Lab: alt P, "A Second Life".)
//
// The note is their caption, never a story written for them. Needs
// before/after pairs; up to three. Hides without them. No motion.

import Media from '../../components/Media'
import { AskAboutAlterations, Label, useAlterations } from './altShared'

export default function StoryAlterations() {
  const { pairs, caption } = useAlterations()
  if (!pairs.length) return null
  const [lead, ...rest] = pairs.slice(0, 3)
  const note = caption(lead)

  return (
    <section id="alterations" className="section">
      <div className="wrap">
        <div className="border-y-2 border-ink py-4">
          <h2 className="t-1">A second life</h2>
        </div>
        <figure className="mt-10">
          <div className="grid grid-cols-2 gap-3">
            {[
              { file: lead.before, label: 'Before', side: 'left' as const },
              { file: lead.after, label: 'After', side: 'right' as const },
            ].map(({ file, label, side }) => (
              <div key={label} className="relative aspect-[3/4] overflow-hidden bg-paper md:aspect-[4/5]">
                <Media file={file} alt={`${note ?? 'The garment'}, ${label.toLowerCase()}`} />
                <Label side={side}>{label}</Label>
              </div>
            ))}
          </div>
          {note && (
            <figcaption className="t-lead mt-6 max-w-[48ch] first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-[3.2em] first-letter:leading-[0.85] first-letter:text-primary-ink">
              {note}
            </figcaption>
          )}
        </figure>
        {rest.length > 0 && (
          <ul className="mt-12 grid gap-8 border-t border-ink/15 pt-8 sm:grid-cols-2">
            {rest.map((pair) => (
              <li key={pair.before}>
                <figure>
                  <div className="grid grid-cols-2 gap-2">
                    {[pair.before, pair.after].map((file, i) => (
                      <div key={file} className="relative aspect-[3/4] overflow-hidden bg-paper">
                        <Media file={file} alt={`${caption(pair) ?? 'The garment'}, ${i ? 'after' : 'before'}`} />
                        <Label side={i ? 'right' : 'left'}>{i ? 'After' : 'Before'}</Label>
                      </div>
                    ))}
                  </div>
                  {caption(pair) && <figcaption className="t-small mt-2 text-muted">{caption(pair)}</figcaption>}
                </figure>
              </li>
            ))}
          </ul>
        )}
        <AskAboutAlterations />
      </div>
    </section>
  )
}
