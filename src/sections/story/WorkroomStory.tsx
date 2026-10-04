// src/sections/story/WorkroomStory.tsx
// Their workroom, full width, with the owner's story on a card over its
// lower corner: the place first, then the person. (Lab: story K, "Workroom
// photo", with a solid card rather than frosted glass, so the words read
// over any photo.)
//
// Photo: their team at work, or the first interior shot. Story in quotation
// marks only when written in their own voice (storyShared). Hides without a
// story.
//
// Motion: the photo drifts a little as the page scrolls. Reduced motion: still.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import Media from '../../components/Media'
import { drift } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { useStory } from './storyShared'

export default function WorkroomStory() {
  const { boutique } = useBoutique()
  const { owner, paragraphs, ownVoice } = useStory()
  const root = useRef<HTMLElement>(null)
  const photo = boutique.media.teamAtWork ?? boutique.media.interior?.[0]

  useMotion(root, () => {
    drift('[data-drift]', { trigger: root.current, amount: 6 })
  })

  if (!paragraphs.length) return null

  return (
    <section ref={root} id="story" aria-label="Our story" className="section">
      <div className="relative">
        {photo && (
          <div className="relative h-[60vh] overflow-hidden bg-paper md:h-[80vh]">
            <div data-drift className="absolute inset-x-0 -top-[6%] h-[112%]">
              <Media file={photo} alt={`Inside ${boutique.brand.name}`} />
            </div>
          </div>
        )}
        <div className={photo ? 'wrap relative -mt-24 md:absolute md:inset-x-0 md:bottom-12 md:mt-0' : 'wrap'}>
          <div className="max-w-xl bg-light p-7 md:p-10">
            <div className="t-lead space-y-4">
              {paragraphs.map((p, i) => (
                <p key={p}>
                  {ownVoice && i === 0 ? '“' : ''}
                  {p}
                  {ownVoice && i === paragraphs.length - 1 ? '”' : ''}
                </p>
              ))}
            </div>
            <p className="mt-6">
              <span className="t-3 block">{owner.name}</span>
              {owner.role && <span className="t-small text-muted">{owner.role}</span>}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
