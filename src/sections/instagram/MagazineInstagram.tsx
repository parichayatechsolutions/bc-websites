// src/sections/instagram/MagazineInstagram.tsx
// "From our feed", set as a magazine page: a ruled masthead with their
// handle, one piece large and four small beside it, each linking to their
// Instagram. (Lab: ig P, "Magazine", without "this week": the photos are
// their work, not a live feed.)
//
// Needs `social.instagram` and work photos; up to five. Hides otherwise.
// No motion.

import { useBoutique } from '../../app/BoutiqueContext'
import { FollowButton, Post, useInstagram } from './igShared'

export default function MagazineInstagram() {
  const { boutique } = useBoutique()
  const ig = useInstagram()
  const photos = boutique.media.work.slice(0, 5)
  if (!ig || !photos.length) return null
  const [lead, ...rest] = photos

  return (
    <section id="instagram" className="section">
      <div className="wrap">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-2 border-ink pb-4">
          <h2 className="t-1">From our feed</h2>
          <a href={ig.href} target="_blank" rel="noopener noreferrer" className="link-stitch font-semibold text-primary-ink">
            {ig.handle}
          </a>
        </div>
        <div className={`mt-8 grid gap-3 ${rest.length ? 'md:grid-cols-2' : 'max-w-xl'}`}>
          <div className="aspect-[4/5]">
            <Post file={lead} href={ig.href} />
          </div>
          {rest.length > 0 && (
            <ul className="grid grid-cols-2 gap-3">
              {rest.map((f) => (
                <li key={f} className="aspect-square">
                  <Post file={f} href={ig.href} />
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-10">
          <FollowButton href={ig.href} />
        </div>
      </div>
    </section>
  )
}
