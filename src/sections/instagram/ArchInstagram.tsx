// src/sections/instagram/ArchInstagram.tsx
// Their work in a row of temple arches, each a link to their Instagram,
// with the handle and a follow button. The arch family's Instagram.
// (Lab: ig K, "Arch windows".)
//
// Needs `social.instagram`; hides without it. Six photos at most; the
// arches wrap into rows of three on a phone.
//
// Motion: the arches uncover in turn as they come into view.
// Reduced motion: in place.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { FollowButton, Post, useInstagram } from './igShared'

export default function ArchInstagram() {
  const { boutique } = useBoutique()
  const instagram = useInstagram()
  const root = useRef<HTMLElement>(null)
  const posts = boutique.media.work.slice(0, 6)

  useMotion(root, () => {
    wipe('[data-arch]', { trigger: root.current })
  })

  if (!instagram) return null

  return (
    <section ref={root} className="section">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="min-w-0">
            <h2 className="t-1 max-w-[14ch] text-balance">Fresh from the workroom</h2>
            <p className="mt-4 break-words text-muted">{instagram.handle}</p>
          </div>
          <FollowButton href={instagram.href} />
        </div>
        {posts.length > 0 && (
          <ul className="mt-12 grid grid-cols-3 gap-3 md:grid-cols-6 md:gap-4">
            {posts.map((file) => (
              <li key={file} data-arch className="arch aspect-[2/3]">
                <Post file={file} href={instagram.href} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
