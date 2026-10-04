// src/sections/story/CardStory.tsx
// The owner as an ID-style designer card: portrait (with permission; logo
// otherwise), name and role, the year they started and what they're known
// for, with the story beside it. (Lab: story Q, "Designer card".)
//
// Every field from the config; the card's rows drop away without data.
// Story in quotation marks only in their own voice. Hides without an owner
// name, which every config has. No motion.

import { useBoutique } from '../../app/BoutiqueContext'
import { Portrait, useStory } from './storyShared'

export default function CardStory() {
  const { boutique } = useBoutique()
  const { owner, established, paragraphs, ownVoice, portrait } = useStory()
  const rows = [
    owner.role && { label: 'Role', value: owner.role },
    established && { label: 'Since', value: String(established) },
    boutique.services.featured.length > 0 && { label: 'Known for', value: boutique.services.featured.join(', ') },
    boutique.branches[0] && { label: 'Where', value: boutique.branches[0].area || boutique.branches[0].city },
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <section id="story" aria-label="Our story" className="section">
      <div className="wrap grid items-start gap-12 md:grid-cols-12 md:gap-16">
        <div className="rounded-2xl border border-ink/15 bg-paper p-6 md:col-span-5 md:p-8">
          <div className="flex items-center gap-5">
            <Portrait file={portrait} name={owner.name} className="w-20" />
            <div className="min-w-0">
              <p className="t-3 break-words">{owner.name}</p>
              <p className="t-small text-muted">{boutique.brand.name}</p>
            </div>
          </div>
          {rows.length > 0 && (
            <dl className="mt-6 space-y-3 border-t border-ink/15 pt-5">
              {rows.map((r) => (
                <div key={r.label} className="grid grid-cols-[6rem_1fr] gap-3">
                  <dt className="t-small text-muted">{r.label}</dt>
                  <dd>{r.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        {paragraphs.length > 0 && (
          <div className="t-lead space-y-5 md:col-span-7">
            {paragraphs.map((p, i) => (
              <p key={p}>
                {ownVoice && i === 0 ? '“' : ''}
                {p}
                {ownVoice && i === paragraphs.length - 1 ? '”' : ''}
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
