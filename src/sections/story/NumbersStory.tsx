// src/sections/story/NumbersStory.tsx
// The story with its numbers beside it: a column of large figures (years,
// garments, rating, team) next to the owner's words, so the story is backed
// by facts at a glance. (Lab: story H, "Numbers first".)
//
// Numbers only from the config (trustFacts); the column drops away with
// fewer than two. Story in quotation marks only in their own voice. Hides
// without a story.
//
// Motion: the numbers count up once. Reduced motion: as written.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import { countUp } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { trustFacts } from '../trust/trustFacts'
import { useStory } from './storyShared'

export default function NumbersStory() {
  const { boutique } = useBoutique()
  const { owner, paragraphs, ownVoice } = useStory()
  const root = useRef<HTMLElement>(null)
  const facts = trustFacts(boutique)

  useMotion(root, () => {
    countUp('[data-count]', { trigger: root.current })
  })

  if (!paragraphs.length) return null

  return (
    <section ref={root} id="story" aria-label="Our story" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        {facts.length > 1 && (
          <dl className="grid grid-cols-2 gap-6 md:col-span-4 md:grid-cols-1">
            {facts.map(({ value, label }) => (
              <div key={label} className="flex flex-col border-t border-ink/15 pt-4">
                <dt className="t-small order-last mt-1 text-muted">{label}</dt>
                <dd data-count className="t-1 tabular-nums text-primary-ink">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        )}
        <div className={facts.length > 1 ? 'md:col-span-8' : 'md:col-span-9'}>
          <div className="t-lead space-y-5">
            {paragraphs.map((p, i) => (
              <p key={p}>
                {ownVoice && i === 0 ? '“' : ''}
                {p}
                {ownVoice && i === paragraphs.length - 1 ? '”' : ''}
              </p>
            ))}
          </div>
          <p className="mt-8">
            <span className="t-3 block">{owner.name}</span>
            {owner.role && <span className="t-small text-muted">{owner.role}</span>}
          </p>
        </div>
      </div>
    </section>
  )
}
