// src/sections/team/SignaturesTeam.tsx
// Signed by the people who make it: each person's name set large in the
// display face over a signature line, their role and years beneath, the
// way a maker signs their work. Needs no photos. (Lab: team I,
// "Signatures".)
//
// From `team`; hides without anyone. The display face, not a fake
// handwriting font: the names are typeset, not forged signatures.
//
// Motion: the signature lines draw out in turn. Reduced motion: in place.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import { draw } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

export default function SignaturesTeam() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const team = boutique.team ?? []

  useMotion(root, () => {
    draw('[data-line]', { trigger: root.current, from: 'start' })
  })

  if (!team.length) return null

  return (
    <section ref={root} id="team" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Made by</h2>
        <ul className="mt-12 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((p) => (
            <li key={p.name}>
              <p className="t-2 font-display text-pretty text-primary-ink italic">{p.name}</p>
              <span data-line aria-hidden="true" className="mt-3 block border-t border-ink/60" />
              <p className="t-small mt-3">
                {p.role}
                {p.years ? <span className="text-muted"> · {p.years} years</span> : null}
              </p>
              {p.line && <p className="t-small mt-2 max-w-[36ch] text-muted">{p.line}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
