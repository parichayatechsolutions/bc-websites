// src/sections/story/QuoteStory.tsx
// The owner's first line, set large, and nothing else to read: a small
// arched portrait, their name, role and year beside it. For a page that
// needs the person in one glance rather than the whole story.
// (Lab: story B, "Big quote".)
//
// Quotation marks only when the story is in their own voice (storyShared);
// otherwise it's set as a statement. Hides without a story.
//
// Motion: the line's words come into focus once.
// Reduced motion: the line in place.

import { useRef } from 'react'
import { blurIn } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { Portrait, useStory } from './storyShared'

export default function QuoteStory() {
  const { owner, established, first, ownVoice, portrait } = useStory()
  const root = useRef<HTMLElement>(null)

  useMotion(root, () => {
    blurIn('[data-line]', { trigger: root.current })
  })

  if (!first) return null
  const Line = ownVoice ? 'blockquote' : 'p'

  return (
    <section ref={root} id="story" className="section">
      <figure className="wrap">
        <Line data-line className="t-1 max-w-[22ch] text-balance">
          {ownVoice ? `“${first}”` : first}
        </Line>
        <figcaption className="mt-10 flex items-end gap-5">
          <Portrait file={portrait} name={owner.name} />
          <span>
            <span className="t-3 block">{owner.name}</span>
            <span className="t-small text-muted">{[owner.role, established && `since ${established}`].filter(Boolean).join(', ')}</span>
          </span>
        </figcaption>
      </figure>
    </section>
  )
}
