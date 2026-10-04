// src/sections/story/CollageStory.tsx
// The story beside a collage of three photos overlapping: the owner (only
// with permission), the workroom and a close-up of their work.
// (Lab: story Y, "Photo collage".)
//
// Photos that aren't there drop out of the collage; the owner's place goes
// to the workroom when there's no portrait they've allowed. Story in
// quotation marks only in their own voice. Hides without a story.
//
// Motion: the photos uncover in turn as they come into view.
// Reduced motion: in place.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import Media from '../../components/Media'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { useStory } from './storyShared'

const SPOTS = [
  'left-0 top-0 w-[58%] aspect-[3/4] arch',
  'right-0 top-[18%] w-[46%] aspect-square',
  'left-[22%] bottom-0 w-[40%] aspect-[4/5]',
]

export default function CollageStory() {
  const { boutique } = useBoutique()
  const { owner, paragraphs, ownVoice, portrait } = useStory()
  const root = useRef<HTMLElement>(null)
  const { media } = boutique
  const photos = [portrait, media.teamAtWork ?? media.interior?.[0], media.closeups?.[0] ?? media.work[0]].filter(
    (f): f is string => Boolean(f),
  )

  useMotion(root, () => {
    wipe('[data-collage]', { trigger: root.current })
  })

  if (!paragraphs.length) return null

  return (
    <section ref={root} id="story" aria-label="Our story" className="section">
      <div className="wrap grid items-center gap-14 md:grid-cols-12 md:gap-16">
        {photos.length > 0 && (
          <div className="relative aspect-square md:col-span-6">
            {photos.map((file, i) => (
              <div key={file} data-collage className={`absolute overflow-hidden bg-paper ring-4 ring-light ${SPOTS[i]}`}>
                <Media file={file} alt={file === portrait ? owner.name : ''} />
              </div>
            ))}
          </div>
        )}
        <div className={photos.length ? 'md:col-span-6' : 'md:col-span-8'}>
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
