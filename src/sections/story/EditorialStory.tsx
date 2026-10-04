// src/sections/story/EditorialStory.tsx
// Dark and editorial: the year they started set huge and faint behind, the
// story's first sentence as the headline, the rest in two columns with a
// drop cap, signed with the owner's name. Needs no photograph.
// (Lab: story E, "Dark editorial".)
//
// Works whether the story is in their voice or about them. Hides without a
// story; the year drops away without `established`. No motion.

import { Fragment } from 'react'
import { useStory } from './storyShared'

export default function EditorialStory() {
  const { owner, established, first, rest } = useStory()
  if (!first) return null

  return (
    <section id="story" aria-label="Our story" className="section relative overflow-hidden bg-dark text-light">
      {established && (
        <p
          aria-hidden="true"
          className="t-hero pointer-events-none absolute -top-[0.12em] right-0 leading-none text-light/[0.07] select-none md:right-[4vw]"
        >
          {established}
        </p>
      )}
      <div className="wrap relative">
        <h2 className="t-2 max-w-[24ch] text-balance">{first}</h2>
        {rest && (
          <p className="t-lead mt-10 max-w-5xl text-light/85 md:columns-2 md:gap-12 first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[3.4em] first-letter:leading-[0.85] first-letter:text-accent-on-dark">
            {rest.split('\n').map((line, i) => (
              <Fragment key={i}>
                {i > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </p>
        )}
        <p className="mt-12 border-t border-light/15 pt-6">
          <span className="t-3 block">{owner.name}</span>
          {owner.role && <span className="t-small text-light/70">{owner.role}</span>}
        </p>
      </div>
    </section>
  )
}
