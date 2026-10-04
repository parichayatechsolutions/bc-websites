// src/sections/story/WordsStory.tsx
// The story's first sentence set large and coming into focus word by word
// as it arrives, the rest beneath it in a narrow column, signed by the
// owner. (Lab: story R, "Word by word".)
//
// Quotation marks only when the story is in the owner's own voice
// (storyShared). Needs the owner's story.
//
// Motion: the opening line's words come into focus once. Reduced motion:
// in focus from the start.

import { useRef } from 'react'
import { blurIn } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { useStory } from './storyShared'

export default function WordsStory() {
  const { owner, first, rest, ownVoice } = useStory()
  const root = useRef<HTMLElement>(null)

  useMotion(root, () => {
    blurIn('[data-words]', { trigger: root.current })
  })

  if (!first) return null
  const Opening = ownVoice ? 'blockquote' : 'p'

  return (
    <section ref={root} id="story" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="sr-only">Our story</h2>
        <Opening data-words className="t-1 text-balance">
          {ownVoice ? `“${first}”` : first}
        </Opening>
        {rest && <p className="t-lead mt-10 max-w-[52ch] whitespace-pre-line text-muted">{rest}</p>}
        <p className="mt-8 font-semibold text-primary-ink">
          {ownVoice && '— '}
          {owner.name}
          {owner.role && <span className="font-normal text-muted">, {owner.role}</span>}
        </p>
      </div>
    </section>
  )
}
