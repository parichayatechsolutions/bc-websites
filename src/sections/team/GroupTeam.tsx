// src/sections/team/GroupTeam.tsx
// The team together: one wide photograph of them at work, and beneath it
// everyone's name and role in a line, like a caption. (Lab: team U, "Group
// photo", without "from left", since the config doesn't say who stands
// where.)
//
// Needs their workroom photo (`media.teamAtWork`, taken with everyone's
// agreement) and a team. Hides otherwise. No motion.

import { useBoutique } from '../../app/BoutiqueContext'
import Media from '../../components/Media'

export default function GroupTeam() {
  const { boutique } = useBoutique()
  const team = boutique.team ?? []
  const photo = boutique.media.teamAtWork
  if (!photo || !team.length) return null

  return (
    <section id="team" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">The team</h2>
        <figure className="mt-10">
          <div className="aspect-[4/3] overflow-hidden bg-paper md:aspect-[21/9]">
            <Media file={photo} alt={`The team at ${boutique.brand.name} at work`} />
          </div>
          <figcaption className="mt-5 max-w-[80ch] text-muted">
            {team.map((p, i) => (
              <span key={p.name}>
                <span className="font-semibold text-ink">{p.name}</span>, {p.role.toLowerCase()}
                {i < team.length - 1 ? ' · ' : '.'}
              </span>
            ))}
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
