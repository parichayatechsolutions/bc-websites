// src/sections/instagram/BandInstagram.tsx
// On the brand colour, their work as a row of framed square tiles, each
// in a fine gold edge, between the handle and the follow link, with a
// zari border along the foot. (Lab: ig I, "Brand band".)
//
// Needs `social.instagram` and work photos; whole rows only (fullRows,
// up to six). Hides otherwise. No motion.

import { IconBrandInstagram } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'
import { fullRows, Post, useInstagram } from './igShared'

export default function BandInstagram() {
  const { boutique } = useBoutique()
  const ig = useInstagram()
  const photos = fullRows(boutique.media.work, 6)
  if (!ig || !photos.length) return null

  return (
    <section id="instagram" className="bg-primary text-on-primary">
      <div className="section">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="t-1 max-w-[12ch] text-balance">On Instagram</h2>
            <a href={ig.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 font-semibold">
              <IconBrandInstagram size={22} stroke={1.75} aria-hidden="true" />
              <span className="link-stitch">{ig.handle}</span>
            </a>
          </div>
          <ul className="mt-10 grid grid-cols-3 gap-3 md:grid-cols-6">
            {photos.map((f) => (
              <li key={f} className="aspect-square border border-accent p-1">
                <Post file={f} href={ig.href} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="zari" aria-hidden="true" />
    </section>
  )
}
