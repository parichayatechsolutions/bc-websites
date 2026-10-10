// src/sections/instagram/GridInstagram.tsx
// Their profile as people know it: logo, handle and a follow button over a
// tight three-across grid of their work. (Lab: ig A, "Profile + grid".)
//
// Needs `social.instagram`; hides without it. The grid shows whole rows
// only, and drops away when there are no work photos, leaving the profile
// and the button.
//
// Motion: the photos uncover in turn as the grid comes into view.
// Reduced motion: the grid in place.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import Logo from '../../components/Logo'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { FollowButton, fullRows, Post, useInstagram } from './igShared'

export default function GridInstagram() {
  const { boutique } = useBoutique()
  const rawInstagram = useInstagram()
  const fallbackHandle = `@${boutique.slug.replace(/^[0-9]+-/, '')}`
  const instagram = rawInstagram ?? { handle: fallbackHandle, href: `https://instagram.com/${fallbackHandle.replace('@', '')}` }
  const root = useRef<HTMLElement>(null)
  const workPhotos = boutique.media.work.length > 0 ? boutique.media.work : [boutique.media.hero.src]
  const posts = fullRows(workPhotos, 9)
  const area = boutique.branches[0]?.area

  useMotion(root, () => {
    wipe('[data-grid] [data-post]', { trigger: root.current?.querySelector('[data-grid]') })
  })

  if (!instagram) return null

  return (
    <section
      ref={root}
      className="relative overflow-hidden py-10 md:py-14 border-t border-b border-accent/20 bg-cover bg-center"
      style={{
        backgroundImage: "linear-gradient(to bottom, rgba(253, 251, 247, 0.78), rgba(246, 240, 232, 0.85)), url('/botanical-luxe-bg.jpg')",
      }}
    >
      <div className="wrap">
        <h2 className="t-1">Fresh from the workroom</h2>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-y border-ink/10 py-5">
          <div className="flex min-w-0 items-center gap-4">
            <Logo className="h-14 w-14 shrink-0 rounded-full" />
            <div className="min-w-0">
              <p className="font-semibold break-words">{instagram.handle}</p>
              <p className="t-small text-muted">
                {boutique.brand.name}
                {area && ` · ${area}`}
              </p>
            </div>
          </div>
          <FollowButton href={instagram.href} />
        </div>

        {posts.length > 0 && (
          <ul data-grid className="mt-6 grid grid-cols-3 gap-1 md:gap-2">
            {posts.map((file) => (
              <li key={file} className="aspect-square">
                <Post file={file} href={instagram.href} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
