// src/sections/team/HandsTeam.tsx
// Many hands: the people a piece passes through, in the order they touch
// it (design, cutting, stitching, handwork, finishing), strung along a
// thread with each person's name and role. (Lab: team W, "Many hands".)
//
// From `team`, placed by the words in each role; a real sequence, so
// numbered. Only stages someone covers; needs three. Photos only with
// their yes.
//
// Motion: the thread draws itself down once. Reduced motion: in place.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import Media from '../../components/Media'
import { draw } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

const STAGES = [
  { stage: 'Design', match: /design|stylist/i },
  { stage: 'Cutting', match: /cut|master|pattern/i },
  { stage: 'Stitching', match: /tailor|stitch|machin/i },
  { stage: 'Handwork', match: /embroider|aari|maggam|zardo|handwork|karigar/i },
  { stage: 'Finishing', match: /finish|press|quality|iron/i },
]

export default function HandsTeam() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const used = new Set<string>()
  const hands = STAGES.flatMap((s) => {
    const person = (boutique.team ?? []).find((p) => !used.has(p.name) && s.match.test(p.role))
    if (!person) return []
    used.add(person.name)
    return [{ ...s, person }]
  })

  useMotion(root, () => {
    draw('[data-thread]', { trigger: root.current, from: 'top' })
  })

  if (hands.length < 3) return null

  return (
    <section ref={root} id="team" className="section">
      <div className="wrap max-w-3xl">
        <h2 className="t-1 max-w-[14ch] text-balance">The hands your piece passes through</h2>
        <ol className="relative mt-12">
          <span data-thread aria-hidden="true" className="absolute top-8 bottom-8 left-8 border-l-2 border-dashed border-thread" />
          {hands.map(({ stage, person }, i) => (
            <li key={stage} className="relative flex items-center gap-6 py-4">
              {person.photo ? (
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-thread bg-paper">
                  <Media file={person.photo} alt="" />
                </div>
              ) : (
                <span aria-hidden="true" className="grid h-16 w-16 shrink-0 place-items-center rounded-full border-2 border-thread bg-light font-display text-2xl text-primary-ink">
                  {person.name.charAt(0)}
                </span>
              )}
              <div>
                <p className="t-small text-primary-ink">
                  {i + 1}. {stage}
                </p>
                <p className="t-3">{person.name}</p>
                <p className="t-small text-muted">{person.role}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
