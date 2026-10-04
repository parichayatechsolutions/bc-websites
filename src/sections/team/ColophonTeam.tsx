// src/sections/team/ColophonTeam.tsx
// A colophon, the credit line at the back of a book: "Designed by …, cut
// by …, stitched by …, embroidered by …", from their team, as one quiet
// band. (Lab: team Y, "Colophon".)
//
// From `team`, matched to each craft by the words in their role; needs two
// crafts. A band, not a full section. No motion.

import { useBoutique } from '../../app/BoutiqueContext'

const CRAFTS = [
  { verb: 'Designed', match: /design|stylist/i },
  { verb: 'Cut', match: /cut|master|pattern/i },
  { verb: 'Stitched', match: /tailor|stitch|machin/i },
  { verb: 'Embroidered', match: /embroider|aari|maggam|zardo|handwork|karigar/i },
  { verb: 'Finished', match: /finish|press|quality/i },
]

export default function ColophonTeam() {
  const { boutique } = useBoutique()
  const team = boutique.team ?? []
  const credits = CRAFTS.map((c) => ({ verb: c.verb, people: team.filter((p) => c.match.test(p.role)).map((p) => p.name) })).filter((c) => c.people.length)
  if (credits.length < 2) return null

  return (
    <section id="team" aria-label="Who made it" className="band">
      <div className="wrap">
        <p className="t-lead mx-auto max-w-[56ch] border-y border-ink/15 py-8 text-center text-balance">
          {credits.map((c, i) => (
            <span key={c.verb}>
              {i === 0 ? c.verb : c.verb.toLowerCase()} by <span className="font-display italic text-primary-ink">{c.people.join(' and ')}</span>
              {i < credits.length - 1 ? ', ' : '.'}
            </span>
          ))}
          <span className="t-small mt-3 block text-muted">At {boutique.brand.name}</span>
        </p>
      </div>
    </section>
  )
}
