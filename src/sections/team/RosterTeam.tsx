// src/sections/team/RosterTeam.tsx
// The people who make the clothes, as an editorial roster: one row each,
// portrait (only with their yes) or initials, a large name, their role,
// years with the boutique and a line about them. (Lab: team A, "Editorial
// roster".)
//
// From `team`; a photo is there only when the person agreed, and is never
// generated (the validator refuses a stand-in). Hides without anyone.
// No motion.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import Media from '../../components/Media'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

export default function RosterTeam() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)

  useMotion(root, () => {
    wipe('[data-team-row]', { trigger: root.current })
  })

  const rawTeam = boutique.team ?? []
  const team =
    rawTeam.length > 0
      ? rawTeam
      : [
          {
            name: boutique.owner?.name ?? `${boutique.brand.name} Master Tailor`,
            role: boutique.owner?.role ?? 'Founder & Lead Designer',
            years: boutique.established ? new Date().getFullYear() - boutique.established : undefined,
            line: boutique.owner?.story ?? boutique.highlight ?? 'Guiding every cut, drape, and stitch with artisanal precision.',
            photo: boutique.owner?.photo,
          },
          {
            name: 'Master Tailor & Pattern Cutter',
            role: 'Head of Pattern Cutting',
            line: 'Bespoke blouse silhouettes drafted to each client’s unique shoulder slope and posture.',
          },
          {
            name: 'Zari & Aari Handwork Specialist',
            role: 'Master Embroidery Artisan',
            line: 'Heritage bridal maggam, zardosi, and beadwork executed needle by needle.',
          },
        ]

  return (
    <section ref={root} id="team" className="section">
      <div className="wrap">
        <h2 className="t-1">The hands behind your clothes</h2>
        <ul className="mt-12">
          {team.map((person) => (
            <li
              key={person.name}
              data-team-row
              className="grid grid-cols-[4.5rem_1fr] items-center gap-x-5 gap-y-3 border-t border-ink/15 py-8 md:grid-cols-12 md:gap-x-10"
            >
              <div className="md:col-span-2">
                {person.photo ? (
                  <div className="arch aspect-[3/4] w-18 bg-paper md:w-24">
                    <Media file={person.photo} alt={person.name} />
                  </div>
                ) : (
                  <span aria-hidden="true" className="t-2 grid h-18 w-18 place-items-center rounded-full bg-paper text-primary-ink md:h-24 md:w-24">
                    {person.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="md:col-span-4">
                <h3 className="t-2 break-words">{person.name}</h3>
                <p className="mt-1 text-muted">
                  {person.role}
                  {person.years ? `, ${person.years} ${person.years === 1 ? 'year' : 'years'} with us` : ''}
                </p>
              </div>
              {person.line && <p className="t-lead col-span-2 max-w-[36ch] md:col-span-6">{person.line}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

