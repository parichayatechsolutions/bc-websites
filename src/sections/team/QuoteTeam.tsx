// src/sections/team/QuoteTeam.tsx
// One person's line set large as a pull quote, their portrait beside it
// (only with their yes), and the rest of the team named beneath.
// (Lab: team R, "Pull quote".)
//
// The first person with a `line`. It wears quotation marks only when it's
// in their own voice ("I", "my", "we"); a line the owner wrote about them is
// shown plainly, so no one is quoted saying what they didn't. Hides
// without anyone who has a line. No motion.

import { useBoutique } from '../../app/BoutiqueContext'
import Media from '../../components/Media'

const OWN_VOICE = /\b(i|i'm|i’m|i've|i’ve|my|me|we|our|us)\b/i

export default function QuoteTeam() {
  const { boutique } = useBoutique()
  const team = boutique.team ?? []
  const person = team.find((p) => p.line)
  if (!person?.line) return null
  const quoted = OWN_VOICE.test(person.line)
  const others = team.filter((p) => p !== person)

  return (
    <section id="team" className="section">
      <div className="wrap">
        <figure className={`grid items-center gap-10 ${person.photo ? 'md:grid-cols-12 md:gap-16' : ''}`}>
          {person.photo && (
            <div className="arch aspect-[3/4] max-w-xs bg-paper md:col-span-4">
              <Media file={person.photo} alt={person.name} />
            </div>
          )}
          <div className={person.photo ? 'md:col-span-8' : 'max-w-4xl'}>
            {quoted ? (
              <blockquote className="t-1 max-w-[22ch] text-balance">“{person.line}”</blockquote>
            ) : (
              <p className="t-1 max-w-[22ch] text-balance">{person.line}</p>
            )}
            <figcaption className="mt-8">
              <span className="t-3 block text-primary-ink">{person.name}</span>
              <span className="text-muted">
                {person.role}
                {person.years ? ` · ${person.years} years` : ''}
              </span>
            </figcaption>
          </div>
        </figure>
        {others.length > 0 && (
          <p className="mt-14 border-t border-ink/15 pt-6 text-muted">
            Also on the team: {others.map((p) => `${p.name} (${p.role.toLowerCase()})`).join(', ')}
          </p>
        )}
      </div>
    </section>
  )
}
