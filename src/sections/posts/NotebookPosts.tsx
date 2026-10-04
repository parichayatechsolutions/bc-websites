// src/sections/posts/NotebookPosts.tsx
// Their style notes as a page from the workroom notebook: a cream page with
// a thread-coloured margin rule, each note dated in the margin and written
// out in full. Warm and personal. (Lab: blog M, "Notebook", without a
// handwriting font: the boutique's own font pair carries it.)
//
// From `posts`, newest first; hides without any. No motion.

import { useBoutique } from '../../app/BoutiqueContext'

const long = (date?: string) => (date ? new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '')

export default function NotebookPosts() {
  const { boutique } = useBoutique()
  const posts = [...(boutique.posts ?? [])].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
  if (!posts.length) return null

  return (
    <section id="notes" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[14ch] text-balance">From our notebook</h2>
        <div className="mt-12 max-w-3xl border border-ink/10 bg-paper">
          {posts.map((p) => (
            <article key={p.title} className="grid grid-cols-[5.5rem_1fr] border-b border-ink/10 last:border-b-0 md:grid-cols-[8rem_1fr]">
              <p className="t-small border-r-2 border-thread/60 px-3 py-6 text-muted md:px-5">{long(p.date)}</p>
              <div className="px-5 py-6 md:px-8">
                <h3 className="t-3">{p.title}</h3>
                <p className="mt-2 max-w-[56ch]">{p.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
