// src/sections/story/LetterStory.tsx
// The owner's story as a letter on paper: their words in full, signed with
// their name in the display face and their role beneath. Warm and personal,
// no photograph needed. (Lab: story F, "Letter".)
//
// A letter is in the writer's voice, so this shows only when the story is
// written as "I" or "we" (storyShared). The lab's "Dear customer" and "With
// love from our workroom" are left out: nothing is said in their name that
// they didn't write. No motion.

import { useStory } from './storyShared'

export default function LetterStory() {
  const { owner, paragraphs, ownVoice } = useStory()
  if (!paragraphs.length || !ownVoice) return null

  return (
    <section id="story" aria-label="Our story" className="section">
      <div className="wrap">
        <article className="mx-auto max-w-2xl border border-ink/10 bg-paper px-7 py-12 md:px-14 md:py-16">
          <div className="t-lead space-y-6">
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <footer className="mt-12">
            <p className="t-2 text-primary-ink">{owner.name}</p>
            {owner.role && <p className="t-small mt-1 text-muted">{owner.role}</p>}
          </footer>
        </article>
      </div>
    </section>
  )
}
