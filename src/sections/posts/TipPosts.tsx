// src/sections/posts/TipPosts.tsx
// One style note at a time, set large on the brand colour: its title and
// text, with previous and next to read the others. Nothing advances on its
// own. (Lab: blog O, "Tip of the day".)
//
// From `posts`, newest first; hides without any. The note swaps with a CSS
// fade.

import { useState } from 'react'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'

const ROUND =
  'grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-current/40 transition-[background-color,translate] duration-300 ease-stitch hover:-translate-y-1 hover:bg-on-primary/10 active:translate-y-0'

export default function TipPosts() {
  const { boutique } = useBoutique()
  const posts = [...(boutique.posts ?? [])].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
  const [index, setIndex] = useState(0)
  if (!posts.length) return null
  const post = posts[index] ?? posts[0]
  const step = (by: number) => setIndex((index + by + posts.length) % posts.length)

  return (
    <section id="tips" aria-label="Style notes" className="section bg-primary text-on-primary">
      <div className="wrap">
        <div key={index} className="animate-[fade-in_700ms_var(--ease-stitch)]" aria-live="polite">
          <p className="t-small opacity-80">Style note{posts.length > 1 ? ` · ${index + 1} of ${posts.length}` : ''}</p>
          <h2 className="t-1 mt-4 max-w-[18ch] text-balance">{post.title}</h2>
          <p className="t-lead mt-6 max-w-[40ch] opacity-90">{post.text}</p>
        </div>
        {posts.length > 1 && (
          <div className="mt-10 flex gap-3">
            <button type="button" onClick={() => step(-1)} aria-label="Previous note" className={ROUND}>
              <IconChevronLeft size={22} stroke={1.5} aria-hidden="true" />
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Next note" className={ROUND}>
              <IconChevronRight size={22} stroke={1.5} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
