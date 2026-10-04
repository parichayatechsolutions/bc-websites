// src/sections/posts/ContentsPosts.tsx
// Their style notes as a book: a contents page of titles and dates in two
// columns, each a link down to the note in full beneath.
// (Lab: blog P, "Contents".)
//
// From `posts`, newest first; hides without any. No motion.

import { useId } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'

const long = (date?: string) => (date ? new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : undefined)

export default function ContentsPosts() {
  const { boutique } = useBoutique()
  const id = useId()
  const posts = [...(boutique.posts ?? [])].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
  if (!posts.length) return null

  return (
    <section id="notes" className="section">
      <div className="wrap">
        <h2 className="t-1">Style notes</h2>
        <nav aria-label="Contents" className="mt-10">
          <ol className="grid gap-x-12 border-t-2 border-ink md:grid-cols-2">
            {posts.map((p, i) => (
              <li key={p.title} className="border-b border-ink/15">
                <a href={`#${id}-${i}`} className="group flex min-h-14 items-baseline gap-4 py-4">
                  <span className="t-small w-6 shrink-0 text-muted">{i + 1}</span>
                  <span className="link-stitch is-quiet flex-1">{p.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="mt-16 max-w-3xl space-y-14">
          {posts.map((p, i) => (
            <article key={p.title} id={`${id}-${i}`} className="scroll-mt-28">
              {p.date && <p className="t-small text-muted">{long(p.date)}</p>}
              <h3 className="t-2 mt-2">{p.title}</h3>
              <p className="t-lead mt-4">{p.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
