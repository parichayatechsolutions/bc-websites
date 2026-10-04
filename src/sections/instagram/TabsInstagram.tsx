// src/sections/instagram/TabsInstagram.tsx
// Their work on Instagram, filtered by kind: Bridal, Blouses, Lehengas,
// Kids… as tabs over a square grid, each photo a link to their profile.
// (Lab: ig X, "Category tabs".)
//
// Needs `social.instagram`; hides without it. Tabs come from photo names
// (work-bridal-01.jpg) and show only with two or more kinds. No motion.

import { useState } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import { photoCategories, photoCategory } from '../../app/photos'
import { FollowButton, Post, useInstagram } from './igShared'

const ALL = 'All'

export default function TabsInstagram() {
  const { boutique } = useBoutique()
  const instagram = useInstagram()
  const work = boutique.media.work
  const kinds = photoCategories(work)
  const [shown, setShown] = useState(ALL)
  if (!instagram) return null

  const posts = (shown === ALL ? work : work.filter((f) => photoCategory(f) === shown)).slice(0, 9)

  return (
    <section className="section">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="min-w-0">
            <h2 className="t-1 max-w-[14ch] text-balance">On our Instagram</h2>
            <p className="mt-4 break-words text-muted">{instagram.handle}</p>
          </div>
          <FollowButton href={instagram.href} />
        </div>

        {kinds.length > 1 && (
          <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Kind">
            {[ALL, ...kinds].map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setShown(k)}
                aria-pressed={k === shown}
                className="min-h-11 cursor-pointer rounded-full border border-ink/25 px-5 transition-[background-color,border-color,color,scale] duration-200 ease-stitch hover:border-ink active:scale-[0.97] aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
              >
                {k}
              </button>
            ))}
          </div>
        )}

        {posts.length > 0 && (
          <ul className="mt-8 grid grid-cols-3 gap-1 md:gap-2">
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
