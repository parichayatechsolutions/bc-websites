// src/sections/team/YearsTeam.tsx
// The years between them: their team's combined years with the boutique set
// huge, and beside it each person with their years along a dotted leader.
// Experience made visible. (Lab: team F, "Years between us".)
//
// From `team`; needs years for two or more people. Hides otherwise.
//
// Motion: the total counts up once. Reduced motion: as written.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import { countUp } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

export default function YearsTeam() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const people = (boutique.team ?? []).filter((t) => t.years)
  const total = people.reduce((sum, t) => sum + (t.years ?? 0), 0)

  useMotion(root, () => {
    countUp('[data-count]', { trigger: root.current })
  })

  if (people.length < 2) return null

  return (
    <section ref={root} id="team-years" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <p data-count className="t-hero tabular-nums text-primary-ink">
            {total}
          </p>
          <h2 className="t-3 mt-2">years of stitching between us</h2>
        </div>
        <dl className="md:col-span-7 md:self-end">
          {people.map((t) => (
            <div key={t.name} className="flex items-baseline gap-3 py-3">
              <dt>
                {t.name}
                <span className="text-muted">, {t.role}</span>
              </dt>
              <span aria-hidden="true" className="mb-1.5 min-w-6 flex-1 border-b border-dotted border-ink/35" />
              <dd className="shrink-0 tabular-nums">
                {t.years} {t.years === 1 ? 'year' : 'years'}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
