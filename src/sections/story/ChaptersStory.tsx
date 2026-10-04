// src/sections/story/ChaptersStory.tsx
// The owner's story in chapters: each of its paragraphs set as a numbered
// chapter, the number large in the thread colour in the margin, the
// paragraph beside it. (Lab: story P, "Chapters", numbered rather than
// titled: titles would be words she didn't write.)
//
// Numbered because the paragraphs are a real sequence. Needs a story of
// two paragraphs or more. No motion.

import { useStory } from './storyShared'

export default function ChaptersStory() {
  const { owner, paragraphs } = useStory()
  if (paragraphs.length < 2) return null

  return (
    <section id="story" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[12ch] text-balance">Our story</h2>
        <ol className="mt-12">
          {paragraphs.map((p, i) => (
            <li key={p} className="grid grid-cols-[3rem_1fr] gap-x-6 border-t border-ink/15 py-8 md:grid-cols-[6rem_1fr]">
              <span aria-hidden="true" className="font-display text-4xl leading-none tabular-nums text-thread md:text-6xl">
                {i + 1}
              </span>
              <p className="t-lead max-w-[52ch]">{p}</p>
            </li>
          ))}
        </ol>
        <p className="border-t border-ink/15 pt-6 font-semibold">
          {owner.name}
          {owner.role && <span className="font-normal text-muted">, {owner.role}</span>}
        </p>
      </div>
    </section>
  )
}
