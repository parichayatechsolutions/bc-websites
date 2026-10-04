// src/sections/instagram/MasonryInstagram.tsx
// Their work in columns of mixed heights, like a busy feed, each photo a
// link to their Instagram, with the handle and a follow button.
// (Lab: ig C, "Masonry".)
//
// Needs `social.instagram`; hides without it. Up to nine photos.
//
// Motion: the photos uncover in turn as they come into view.
// Reduced motion: in place.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { FollowButton, Post, useInstagram } from './igShared'

const SHAPES = ['aspect-[4/5]', 'aspect-square', 'aspect-[3/4]', 'aspect-[4/5]', 'aspect-[5/4]', 'aspect-[3/4]']

export default function MasonryInstagram() {
  const { boutique } = useBoutique()
  const instagram = useInstagram()
  const root = useRef<HTMLElement>(null)
  const posts = boutique.media.work.slice(0, 9)

  useMotion(root, () => {
    wipe('[data-tile]', { trigger: root.current })
  })

  if (!instagram) return null

  return (
    <section ref={root} className="section">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="min-w-0">
            <h2 className="t-1 max-w-[14ch] text-balance">On our Instagram</h2>
            <p className="mt-4 break-words text-muted">{instagram.handle}</p>
          </div>
          <FollowButton href={instagram.href} />
        </div>
        {posts.length > 0 && (
          <ul className="mt-12 columns-2 gap-2 md:columns-3 md:gap-3 [&>li]:mb-2 [&>li]:break-inside-avoid md:[&>li]:mb-3">
            {posts.map((file, i) => (
              <li key={file} data-tile className={SHAPES[i % SHAPES.length]}>
                <Post file={file} href={instagram.href} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
