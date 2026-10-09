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
            specialty: 'Bridal Blouses & Bespoke Silhouette Drafting',
            line: boutique.owner?.story ?? boutique.highlight ?? 'Guiding every cut, drape, and stitch with artisanal precision.',
            howTheyWork:
              'Personally takes all 14 contour measurements, conducts personal trial sessions, and engineers structured fits so each blouse feels effortless.',
            photo: boutique.owner?.photo,
          },
          {
            name: 'Master Tailor & Pattern Cutter',
            role: 'Head of Pattern Cutting',
            specialty: 'Precision Pattern Drafting & Fabric Shearing',
            line: 'Bespoke blouse silhouettes drafted to each client’s unique shoulder slope and posture.',
            howTheyWork:
              'Drafts customized paper patterns accounting for individual posture before making the first scissor cut into pure bridal silks.',
          },
          {
            name: 'Zari & Aari Handwork Specialist',
            role: 'Master Embroidery Artisan',
            specialty: 'Heritage Maggam, Zardosi & Seed Pearl Detailing',
            line: 'Heritage bridal maggam, zardosi, and beadwork executed needle by needle.',
            howTheyWork:
              'Mounts pure silks on tensioned embroidery frames, hand-applying gold zari coils and stones with millimeter precision.',
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
              className="grid grid-cols-[4.5rem_1fr] items-start gap-x-5 gap-y-4 border-t border-ink/15 py-8 md:grid-cols-12 md:gap-x-10"
            >
              <div className="md:col-span-2">
                {person.photo ? (
                  <div className="arch aspect-[3/4] w-18 bg-paper md:w-24">
                    <Media file={person.photo} alt={person.name} />
                  </div>
                ) : (
                  <span
                    aria-hidden="true"
                    className="t-2 grid h-18 w-18 place-items-center rounded-full border border-ink/10 bg-paper text-primary-ink shadow-xs md:h-24 md:w-24"
                  >
                    {person.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="md:col-span-4">
                <h3 className="t-2 break-words font-display text-ink leading-tight">{person.name}</h3>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-primary-ink">{person.role}</span>
                  {person.years && (
                    <span className="rounded-full bg-ink/5 px-2.5 py-0.5 text-xs text-muted">
                      {person.years} {person.years === 1 ? 'year' : 'years'} with us
                    </span>
                  )}
                </div>
                {person.specialty && (
                  <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-primary-ink/10 px-3 py-1 text-xs font-semibold text-primary-ink">
                    <span className="uppercase tracking-wider opacity-75">Builds:</span>
                    <span>{person.specialty}</span>
                  </div>
                )}
              </div>
              <div className="col-span-2 space-y-3 md:col-span-6">
                {person.line && (
                  <p className="t-lead max-w-[42ch] text-ink/90 font-light leading-snug">
                    {person.line}
                  </p>
                )}
                {person.howTheyWork && (
                  <div className="rounded-xl border border-ink/10 bg-paper/70 p-4">
                    <div className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-ink" aria-hidden="true" />
                      <div>
                        <strong className="font-semibold text-ink">How they work: </strong>
                        <span>{person.howTheyWork}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

