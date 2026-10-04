// src/sections/instagram/FilmInstagram.tsx
// Dark, their work along a strip of film with sprocket holes top and
// bottom, each frame linking to their Instagram, the handle and a follow
// button above. (Lab: ig L, "Film strip", wrapping onto a second strip
// rather than scrolling sideways.)
//
// Needs `social.instagram` and work photos; up to eight, four to a strip
// on a computer and two on a phone. Hides otherwise. No motion.

import { IconBrandInstagram } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { Post, useInstagram } from './igShared'

const SPROCKETS = 'h-2.5 border-y-[5px] border-dashed border-light/25'

export default function FilmInstagram() {
  const { boutique } = useBoutique()
  const ig = useInstagram()
  const photos = boutique.media.work.slice(0, 8)
  if (!ig || !photos.length) return null

  return (
    <section id="instagram" className="section bg-dark text-light">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="t-1 max-w-[12ch] text-balance">On Instagram</h2>
            <p className="t-lead mt-3 text-accent-on-dark">{ig.handle}</p>
          </div>
          <Button href={ig.href} variant="outline-light" icon={IconBrandInstagram}>
            Follow on Instagram
          </Button>
        </div>
        <div className="mt-10 bg-light/5 px-3 py-2">
          <div aria-hidden="true" className={SPROCKETS} />
          <ul className="grid grid-cols-2 gap-3 py-3 md:grid-cols-4">
            {photos.map((f) => (
              <li key={f} className="aspect-square">
                <Post file={f} href={ig.href} />
              </li>
            ))}
          </ul>
          <div aria-hidden="true" className={SPROCKETS} />
        </div>
      </div>
    </section>
  )
}
