// src/sections/team/OneTeam.tsx
// One person at a time, large: their portrait (only with their yes;
// initials otherwise), their name, role and years, and the line about them,
// with previous and next to meet the rest. Nothing moves on its own.
// (Lab: team J, "One at a time".)
//
// From `team`; hides without anyone. The person swaps with a CSS fade.

import { useState } from 'react'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'
import Media from '../../components/Media'

const ROUND =
  'grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-ink/25 transition-[background-color,color,translate] duration-300 ease-stitch hover:-translate-y-1 hover:bg-ink hover:text-light active:translate-y-0'

export default function OneTeam() {
  const { boutique } = useBoutique()
  const team = boutique.team ?? []
  const [index, setIndex] = useState(0)
  if (!team.length) return null
  const person = team[index] ?? team[0]
  const step = (by: number) => setIndex((index + by + team.length) % team.length)

  return (
    <section id="team" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Meet the team</h2>
        <div key={index} className="mt-12 grid animate-[fade-in_700ms_var(--ease-stitch)] items-center gap-10 md:grid-cols-12 md:gap-16" aria-live="polite">
          <div className="md:col-span-5">
            {person.photo ? (
              <div className="arch aspect-[3/4] max-w-sm bg-paper">
                <Media file={person.photo} alt={person.name} />
              </div>
            ) : (
              <div aria-hidden="true" className="arch grid aspect-[3/4] max-w-sm place-items-center bg-paper">
                <span className="t-hero text-primary-ink">{person.name.charAt(0).toUpperCase()}</span>
              </div>
            )}
          </div>
          <div className="md:col-span-7">
            <p className="t-small text-muted">
              {index + 1} of {team.length}
            </p>
            <h3 className="t-1 mt-2 break-words">{person.name}</h3>
            <p className="mt-3 text-primary-ink">
              {person.role}
              {person.years ? `, ${person.years} ${person.years === 1 ? 'year' : 'years'} with us` : ''}
            </p>
            {person.line && <p className="t-lead mt-6 max-w-[34ch]">{person.line}</p>}
            {team.length > 1 && (
              <div className="mt-10 flex gap-3">
                <button type="button" onClick={() => step(-1)} aria-label="Previous person" className={ROUND}>
                  <IconChevronLeft size={22} stroke={1.5} aria-hidden="true" />
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next person" className={ROUND}>
                  <IconChevronRight size={22} stroke={1.5} aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
