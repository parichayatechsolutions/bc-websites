// src/sections/team/FounderTeam.tsx
// The founder and the workroom together: the owner in an arch (with their
// permission; their logo otherwise), their story in their own words, and
// the team named beneath with their roles. (Lab: team B, "Founder letter".)
//
// The story appears in quotation marks only when it's written as "I" or
// "we" (storyShared). Needs `team`; hides without anyone. No motion.

import { useBoutique } from '../../app/BoutiqueContext'
import { Portrait, useStory } from '../story/storyShared'

export default function FounderTeam() {
  const { boutique } = useBoutique()
  const { owner, paragraphs, ownVoice, portrait } = useStory()
  const team = boutique.team ?? []
  if (!team.length) return null

  return (
    <section id="team" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <figure className="flex items-end gap-5 md:col-span-4 md:flex-col md:items-start">
          <Portrait file={portrait} name={owner.name} className="w-32 md:w-full md:max-w-xs" />
          <figcaption>
            <span className="t-3 block">{owner.name}</span>
            {owner.role && <span className="t-small text-muted">{owner.role}</span>}
          </figcaption>
        </figure>

        <div className="md:col-span-8">
          <h2 className="t-1 max-w-[14ch] text-balance">Who makes your clothes</h2>
          {paragraphs.length > 0 && (
            <div className="t-lead mt-8 max-w-[36ch] space-y-5 text-muted">
              {paragraphs.map((p, i) => (
                <p key={p}>{ownVoice && i === 0 ? `“${p}` : p}{ownVoice && i === paragraphs.length - 1 ? '”' : ''}</p>
              ))}
            </div>
          )}

          <ul className="mt-12 grid gap-x-10 gap-y-6 border-t border-ink/15 pt-8 sm:grid-cols-2">
            {team.map((person) => (
              <li key={person.name}>
                <span className="t-3 block">{person.name}</span>
                <span className="text-muted">{person.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
