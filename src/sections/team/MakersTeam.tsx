// src/sections/team/MakersTeam.tsx
// The designer and the makers, split down the middle: the owner on dark
// with their portrait (with permission) and first line, the team on light
// with their roles and a line each. (Lab: team X, "Designer and makers".)
//
// From `team` and `owner`; hides without a team. The owner's line is in
// quotation marks only when the story is in their own voice. No motion.

import { useBoutique } from '../../app/BoutiqueContext'
import { Portrait, useStory } from '../story/storyShared'

export default function MakersTeam() {
  const { boutique } = useBoutique()
  const { owner, first, ownVoice, portrait } = useStory()
  const team = boutique.team ?? []
  if (!team.length) return null

  return (
    <section id="team" aria-label="Who makes your clothes" className="grid md:grid-cols-2">
      <div className="flex flex-col justify-end gap-8 bg-dark px-5 py-16 text-light md:px-12 md:py-24">
        <Portrait file={portrait} name={owner.name} className="w-36 md:w-48" />
        <div>
          <p className="t-small text-accent-on-dark">{owner.role ?? 'Designer'}</p>
          <h2 className="t-1 mt-2">{owner.name}</h2>
          {first && <p className="t-lead mt-5 max-w-[30ch] text-light/85">{ownVoice ? `“${first}”` : first}</p>}
        </div>
      </div>
      <div className="bg-light px-5 py-16 md:px-12 md:py-24">
        <h3 className="t-2">The makers</h3>
        <ul className="mt-8 space-y-6">
          {team.map((t) => (
            <li key={t.name} className="border-t border-ink/15 pt-5">
              <p className="t-3">{t.name}</p>
              <p className="text-primary-ink">{t.role}</p>
              {t.line && <p className="mt-2 text-muted">{t.line}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
