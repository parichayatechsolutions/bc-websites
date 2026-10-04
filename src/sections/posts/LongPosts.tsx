// src/sections/posts/LongPosts.tsx
// The long read: one style note set as an article (big title, date, a
// wide photo when there is one, the text in a narrow column with a drop
// capital) and the other notes listed beneath to read in its place.
// (Lab: blog F, "The long read".)
//
// From `posts`, newest first; hides without any. There are no separate
// article pages: choosing another note swaps it in, with a CSS fade.

import { useRef, useState } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import Media from '../../components/Media'

const long = (date?: string) =>
  date ? new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : undefined

export default function LongPosts() {
  const { boutique } = useBoutique()
  const top = useRef<HTMLElement>(null)
  const posts = [...(boutique.posts ?? [])].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
  const [index, setIndex] = useState(0)
  if (!posts.length) return null
  const post = posts[index] ?? posts[0]

  const open = (i: number) => {
    setIndex(i)
    top.current?.scrollIntoView({ block: 'start' })
  }

  return (
    <section id="journal" className="section">
      <div className="wrap">
        <article ref={top} key={index} className="mx-auto max-w-3xl scroll-mt-24 animate-[fade-in_700ms_var(--ease-stitch)]">
          {post.date && <p className="t-small text-muted">{long(post.date)}</p>}
          <h2 className="t-1 mt-3 text-balance">{post.title}</h2>
          {post.photo && (
            <div className="mt-10 aspect-[16/9] overflow-hidden bg-paper">
              <Media file={post.photo} alt="" />
            </div>
          )}
          <div className="t-lead mt-10 max-w-[60ch] whitespace-pre-line first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[3.6em] first-letter:leading-[0.85] first-letter:text-primary-ink">
            {post.text}
          </div>
        </article>
        {posts.length > 1 && (
          <nav aria-label="More style notes" className="mx-auto mt-16 max-w-3xl border-t-2 border-ink pt-4">
            <h3 className="t-3">More notes</h3>
            <ul className="mt-2">
              {posts.map((p, i) =>
                i === index ? null : (
                  <li key={p.title} className="border-b border-ink/15">
                    <button type="button" onClick={() => open(i)} className="flex min-h-14 w-full cursor-pointer flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4 text-left">
                      <span className="link-stitch t-3">{p.title}</span>
                      {p.date && <span className="t-small text-muted">{long(p.date)}</span>}
                    </button>
                  </li>
                ),
              )}
            </ul>
          </nav>
        )}
      </div>
    </section>
  )
}
