// src/sections/team/CraftTeam.tsx
// Who does what, as a typeset index: each person's craft or role set large,
// their name and years beside it, so a customer knows whose hands her
// piece passes through. (Lab: team G, "By craft".)
//
// From `team`; hides without anyone. No photos. No motion.

import { useBoutique } from '../../app/BoutiqueContext'

export default function CraftTeam() {
  const { boutique } = useBoutique()
  const team = boutique.team ?? []
  if (!team.length) return null

  return (
    <section id="team" className="section">
      <div className="wrap">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-2 border-ink pb-4">
          <h2 className="t-1">Who does what</h2>
          <p className="text-muted">{boutique.brand.name}</p>
        </div>
        <dl>
          {team.map((person) => (
            <div key={person.name} className="grid gap-2 border-b border-ink/15 py-6 md:grid-cols-12 md:items-baseline md:gap-10">
              <dt className="t-2 md:col-span-7">{person.role}</dt>
              <dd className="md:col-span-5 md:text-right">
                <span className="t-3">{person.name}</span>
                {person.years ? <span className="text-muted">, {person.years} {person.years === 1 ? 'year' : 'years'}</span> : null}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
