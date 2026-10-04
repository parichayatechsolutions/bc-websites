// src/sections/instagram/DarkInstagram.tsx
// Dark, their work as a three-by-three grid of squares with no gaps,
// under the handle, and a button to follow. Lets the colours of the work
// carry the section. (Lab: ig D, "Dark grid", without the glow, which
// DESIGN.md forbids.)
//
// Needs `social.instagram` and work photos; whole rows only (fullRows,
// up to nine). Hides otherwise. No motion.

import { IconBrandInstagram } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { fullRows, Post, useInstagram } from './igShared'

export default function DarkInstagram() {
  const { boutique } = useBoutique()
  const ig = useInstagram()
  const photos = fullRows(boutique.media.work, 9)
  if (!ig || !photos.length) return null

  return (
    <section id="instagram" className="section bg-dark text-light">
      <div className="wrap grid gap-10 md:grid-cols-12 md:items-end md:gap-16">
        <div className="md:col-span-4">
          <h2 className="t-1 max-w-[10ch] text-balance">Follow our work</h2>
          <p className="t-lead mt-4 text-accent-on-dark">{ig.handle}</p>
          <div className="mt-8">
            <Button href={ig.href} variant="outline-light" icon={IconBrandInstagram}>
              Follow on Instagram
            </Button>
          </div>
        </div>
        <ul className="grid grid-cols-3 md:col-span-8">
          {photos.map((f) => (
            <li key={f} className="aspect-square">
              <Post file={f} href={ig.href} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
