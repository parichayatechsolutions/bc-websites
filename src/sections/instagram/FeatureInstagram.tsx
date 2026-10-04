// src/sections/instagram/FeatureInstagram.tsx
// One piece large with its caption, four smaller beside it, then the follow
// button. Works from five photos, so it suits a boutique with a small
// portfolio. (Lab: ig H, "Feature + four".)
//
// Needs `social.instagram`; hides without it. With fewer than five photos
// the smaller tiles thin out; with none, only the heading and button stay.
//
// Motion: the photos uncover in turn, the large one first.
// Reduced motion: everything in place.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { FollowButton, Post, useInstagram } from './igShared'

export default function FeatureInstagram() {
  const { boutique } = useBoutique()
  const instagram = useInstagram()
  const root = useRef<HTMLElement>(null)
  const [feature, ...rest] = boutique.media.work
  const small = rest.slice(0, 4)
  const caption = feature ? boutique.media.captions?.[feature] : undefined

  useMotion(root, () => {
    wipe('[data-grid] [data-post]', { trigger: root.current?.querySelector('[data-grid]') })
  })

  if (!instagram) return null

  return (
    <section ref={root} className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[14ch] text-balance">Fresh from the workroom</h2>

        {feature && (
          <figure className="mt-12">
            <div data-grid className="grid grid-cols-2 gap-1 md:grid-cols-4 md:gap-2">
              <div className={`col-span-2 aspect-square md:row-span-2 ${small.length > 1 ? 'md:aspect-auto' : ''}`}>
                <Post file={feature} href={instagram.href} />
              </div>
              {small.map((file) => (
                <div key={file} className="aspect-square">
                  <Post file={file} href={instagram.href} />
                </div>
              ))}
            </div>
            {caption && <figcaption className="t-small mt-4 text-muted">{caption}</figcaption>}
          </figure>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <FollowButton href={instagram.href} />
          <span className="text-muted break-words">{instagram.handle}</span>
        </div>
      </div>
    </section>
  )
}
