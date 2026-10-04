// src/sections/team/ContributorsTeam.tsx
// A magazine's contributors page: under a ruled masthead, each person in
// two ruled columns with their name in bold, their role and years, and
// their line in a sentence after. For the type-led designs.
// (Lab: team E, "Contributors page".)
//
// From `team`; hides without anyone. No photos. No motion.

import { useBoutique } from '../../app/BoutiqueContext'

export default function ContributorsTeam() {
  const { boutique } = useBoutique()
  const team = boutique.team ?? []
  if (!team.length) return null

  return (
    <section id="team" className="section">
      <div className="wrap">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-y-2 border-ink py-4">
          <h2 className="t-1">Contributors</h2>
          <p className="text-muted">{boutique.brand.name}</p>
        </div>
        <ul className="mt-10 gap-12 md:columns-2 md:[column-rule:1px_solid_color-mix(in_oklab,var(--c-ink)_15%,transparent)]">
          {team.map((p) => (
            <li key={p.name} className="mb-8 break-inside-avoid">
              <p>
                <span className="font-semibold">{p.name}</span>
                <span className="text-muted">
                  {' '}
                  · {p.role}
                  {p.years ? `, ${p.years} years` : ''}
                </span>
              </p>
              {p.line && <p className="mt-1 max-w-[52ch]">{p.line}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
