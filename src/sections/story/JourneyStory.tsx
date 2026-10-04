// src/sections/story/JourneyStory.tsx
// Their journey on a dashed thread: the year they started at the top with
// the story's first paragraph, the rest of the story as stops along the
// way, and "Today" at the end with what they're known for.
// (Lab: story C, "Journey timeline".)
//
// Only the start year is dated; nothing between is given a year that the
// story doesn't. Needs `established` and the owner's story.
//
// Motion: the thread draws itself down once. Reduced motion: in place.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import { joinList } from '../../app/text'
import { draw } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { useStory } from './storyShared'

export default function JourneyStory() {
  const { boutique } = useBoutique()
  const { owner, established, paragraphs } = useStory()
  const root = useRef<HTMLElement>(null)
  const known = boutique.services.featured

  useMotion(root, () => {
    draw('[data-thread]', { trigger: root.current, from: 'top' })
  })

  if (!established || !paragraphs.length) return null
  const stops = [
    { label: String(established), text: paragraphs[0] },
    ...paragraphs.slice(1).map((text) => ({ label: undefined, text })),
    ...(known.length ? [{ label: 'Today', text: `Known for ${joinList(known, true)}.` }] : []),
  ]

  return (
    <section ref={root} id="story" className="section">
      <div className="wrap max-w-3xl">
        <h2 className="t-1 max-w-[12ch] text-balance">Our journey</h2>
        <ol className="relative mt-12">
          <span data-thread aria-hidden="true" className="absolute top-3 bottom-3 left-[7px] border-l-2 border-dashed border-thread" />
          {stops.map((s, i) => (
            <li key={i} className="relative pb-10 pl-10 last:pb-0">
              <span aria-hidden="true" className={`absolute top-2 left-0 h-4 w-4 rounded-full ring-4 ring-light ${s.label ? 'bg-primary-ink' : 'bg-accent'}`} />
              {s.label && <p className="t-2 text-primary-ink">{s.label}</p>}
              <p className={`max-w-[56ch] ${s.label ? 'mt-2' : ''}`}>{s.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 font-semibold">
          {owner.name}
          {owner.role && <span className="font-normal text-muted">, {owner.role}</span>}
        </p>
      </div>
    </section>
  )
}
