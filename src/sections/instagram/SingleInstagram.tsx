// src/sections/instagram/SingleInstagram.tsx
// One piece large, as if just posted, beside a short invitation to follow
// them, with their handle and the piece's note. Quiet and confident.
// (Lab: ig M, "Single post".)
//
// Needs `social.instagram`; hides without it. The piece is their first
// work photo; without one only the invitation stays.
//
// Motion: the photo settles once as it comes into view.
// Reduced motion: in place.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import Media from '../../components/Media'
import { settle } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { FollowButton, useInstagram } from './igShared'

export default function SingleInstagram() {
  const { boutique } = useBoutique()
  const instagram = useInstagram()
  const root = useRef<HTMLElement>(null)
  const file = boutique.media.work[0]
  const note = file ? boutique.media.captions?.[file] : undefined

  useMotion(root, () => {
    settle('[data-photo]', { trigger: root.current })
  })

  if (!instagram) return null

  return (
    <section ref={root} className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        {file && (
          <a href={instagram.href} target="_blank" rel="noopener noreferrer" className="group block aspect-square overflow-hidden bg-paper md:col-span-7">
            <div data-photo className="h-full w-full">
              <Media file={file} alt={note ?? ''} className="transition-transform duration-700 ease-stitch group-hover:scale-[1.04]" />
            </div>
          </a>
        )}
        <div className={file ? 'md:col-span-5' : 'md:col-span-8'}>
          <h2 className="t-1 max-w-[12ch] text-balance">New on our Instagram</h2>
          {note && <p className="t-lead mt-5 max-w-[30ch] text-muted">{note}</p>}
          <p className="mt-6 break-words">{instagram.handle}</p>
          <div className="mt-8">
            <FollowButton href={instagram.href} />
          </div>
        </div>
      </div>
    </section>
  )
}
