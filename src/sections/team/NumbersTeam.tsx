// src/sections/team/NumbersTeam.tsx
// The team by the numbers, dark, in one ruled row: how many of them, their
// years at the craft together, the year the boutique started and the
// Google rating. (Lab: team O, "By the numbers".)
//
// Only from the config: years only when the team's are filled in. Needs
// a team and two figures. A band, not a full section.
//
// Motion: the figures count up once. Reduced motion: as written.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import { countUp } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

export default function NumbersTeam() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const team = boutique.team ?? []
  const years = team.reduce((sum, p) => sum + (p.years ?? 0), 0)
  const figures = [
    team.length > 1 && { value: String(team.length), label: 'People in the workroom' },
    years > 0 && { value: String(years), label: 'Years at the craft, between them' },
    boutique.established && { value: String(boutique.established), label: 'The year we started' },
    boutique.social.googleRating && { value: boutique.social.googleRating.toFixed(1), label: 'On Google' },
  ].filter(Boolean) as { value: string; label: string }[]

  useMotion(root, () => {
    countUp('[data-count]', { trigger: root.current })
  })

  if (!team.length || figures.length < 2) return null

  return (
    <section ref={root} id="team-numbers" aria-label="Our team in numbers" className="band bg-dark text-light">
      <dl className="wrap grid grid-cols-2 md:grid-cols-4">
        {figures.map((f) => (
          <div key={f.label} className="flex flex-col-reverse justify-end border-b border-light/15 py-6 pr-4 md:border-r md:border-b-0 md:px-6 md:first:pl-0 md:last:border-r-0">
            <dt className="t-small mt-2 text-light/75">{f.label}</dt>
            <dd data-count={f.label.startsWith('The year') ? undefined : ''} className="font-display text-5xl leading-none tabular-nums text-accent-on-dark">
              {f.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
