// src/sections/instagram/PolaroidInstagram.tsx
// Their work as instant photos, tilted a little and scattered, each with
// its note written beneath, linking to their Instagram. Personal and warm.
// (Lab: ig J, "Polaroids".)
//
// Needs `social.instagram`; hides without it. Up to six photos; the tilt is
// fixed.
//
// Motion: the prints settle from a small swing as they come into view.
// Reduced motion: still.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import { photoCategory } from '../../app/photos'
import Media from '../../components/Media'
import { sway } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { FollowButton, useInstagram } from './igShared'

const TILTS = ['-rotate-3', 'rotate-2', '-rotate-1', 'rotate-3', '-rotate-2', 'rotate-1']

export default function PolaroidInstagram() {
  const { boutique } = useBoutique()
  const instagram = useInstagram()
  const root = useRef<HTMLElement>(null)
  const prints = boutique.media.work.slice(0, 6)
  const captions = boutique.media.captions ?? {}

  useMotion(root, () => {
    sway('[data-print]', { trigger: root.current })
  })

  if (!instagram) return null

  return (
    <section ref={root} className="section bg-paper">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="min-w-0">
            <h2 className="t-1 max-w-[14ch] text-balance">Snapshots from the workroom</h2>
            <p className="mt-4 break-words text-muted">{instagram.handle}</p>
          </div>
          <FollowButton href={instagram.href} />
        </div>
        {prints.length > 0 && (
          <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 md:gap-x-10">
            {prints.map((f, i) => (
              <li key={f} data-print className={TILTS[i % TILTS.length]}>
                <a href={instagram.href} target="_blank" rel="noopener noreferrer" className="group block bg-light p-3 pb-5">
                  <span className="block aspect-square overflow-hidden bg-paper">
                    <Media file={f} alt={captions[f] ?? ''} className="transition-transform duration-700 ease-stitch group-hover:scale-[1.04]" />
                  </span>
                  <span className="t-small mt-3 block">{captions[f] ?? photoCategory(f) ?? 'Our work'}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
