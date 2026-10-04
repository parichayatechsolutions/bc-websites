// src/sections/story/YearStory.tsx
// A block of brand colour with the year they started set huge, and the
// owner's story beside it. The year carries the weight a photograph would.
// (Lab: story I, "Year block".)
//
// Needs `established` and a story; hides without either. Story in
// quotation marks only in their own voice. No motion.

import { useStory } from './storyShared'

export default function YearStory() {
  const { owner, established, paragraphs, ownVoice } = useStory()
  if (!established || !paragraphs.length) return null

  return (
    <section id="story" aria-label="Our story" className="section">
      <div className="wrap grid gap-10 md:grid-cols-12 md:gap-16">
        <div className="flex flex-col justify-end bg-primary p-8 text-on-primary md:col-span-5 md:min-h-96 md:p-10">
          <p className="t-small opacity-80">Since</p>
          <p className="t-hero tabular-nums leading-none">{established}</p>
        </div>
        <div className="md:col-span-7 md:self-center">
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
