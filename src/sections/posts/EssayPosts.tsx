// src/sections/posts/EssayPosts.tsx
// A photo essay: their style notes that have photos, as alternating rows
// of a large photo and the note beside it, swapping sides down the page.
// (Lab: blog V, "Photo essay".)
//
// From `posts` with a photo, newest first, up to five; needs two. Each
// note is shown in full.
//
// Motion: each photo uncovers as it comes into view. Reduced motion: in
// place.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import Media from '../../components/Media'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

export default function EssayPosts() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const posts = [...(boutique.posts ?? [])]
    .filter((p) => p.photo)
    .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
    .slice(0, 5)

  useMotion(root, () => {
    for (const el of root.current!.querySelectorAll('[data-photo]')) wipe(el, { trigger: el })
  })

  if (posts.length < 2) return null

  return (
    <section ref={root} id="journal" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Style notes</h2>
        <div className="mt-14 space-y-16 md:space-y-24">
          {posts.map((p, i) => (
            <article key={p.title} className="grid items-center gap-8 md:grid-cols-12 md:gap-16">
              <div data-photo className={`aspect-[4/5] overflow-hidden bg-paper md:col-span-6 ${i % 2 ? 'md:order-2' : ''}`}>
                <Media file={p.photo!} alt="" />
              </div>
              <div className={`md:col-span-6 ${i % 2 ? 'md:order-1' : ''}`}>
                <h3 className="t-2 max-w-[20ch] text-balance">{p.title}</h3>
                <p className="t-lead mt-5 max-w-[40ch] text-muted">{p.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
