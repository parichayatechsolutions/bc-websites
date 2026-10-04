// src/sections/instagram/StoriesInstagram.tsx
// Instagram's story highlights, made from the categories in their photo
// names: a ringed circle each for Bridal, Blouses, Lehengas…, then six
// pieces of work. (Lab: ig F, "Stories + grid".)
//
// Needs `social.instagram`; hides without it. The circles need photos
// named by category (work-bridal-01.jpg) in at least two categories, and
// drop away otherwise. The circles wrap rather than scroll sideways.
//
// Motion: the photos uncover in turn as the grid comes into view.
// Reduced motion: everything in place.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import { photoCategories, photoCategory } from '../../app/photos'
import Media from '../../components/Media'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { FollowButton, fullRows, Post, useInstagram } from './igShared'

export default function StoriesInstagram() {
  const { boutique } = useBoutique()
  const instagram = useInstagram()
  const root = useRef<HTMLElement>(null)
  const { work } = boutique.media
  const stories = photoCategories(work)
    .slice(0, 5)
    .map((category) => ({ category, file: work.find((f) => photoCategory(f) === category)! }))
  const posts = fullRows(work, 6)

  useMotion(root, () => {
    wipe('[data-grid] [data-post]', { trigger: root.current?.querySelector('[data-grid]') })
  })

  if (!instagram) return null

  return (
    <section ref={root} className="section">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="min-w-0">
            <h2 className="t-1 max-w-[14ch] text-balance">Fresh from the workroom</h2>
            <p className="mt-4 text-muted break-words">{instagram.handle}</p>
          </div>
          <FollowButton href={instagram.href} />
        </div>

        {stories.length > 1 && (
          <ul className="mt-12 flex flex-wrap gap-x-5 gap-y-6 md:gap-x-8">
            {stories.map(({ category, file }) => (
              <li key={category}>
                <a
                  href={instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-20 flex-col items-center gap-2 text-center md:w-24"
                >
                  <span className="block aspect-square w-full rounded-full border-2 border-accent p-1">
                    <span className="block h-full w-full overflow-hidden rounded-full bg-paper">
                      <Media file={file} alt="" className="transition-transform duration-700 ease-stitch group-hover:scale-[1.04]" />
                    </span>
                  </span>
                  <span className="t-small">{category}</span>
                </a>
              </li>
            ))}
          </ul>
        )}

        {posts.length > 0 && (
          <ul data-grid className="mt-10 grid grid-cols-3 gap-1 md:gap-2">
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
