// src/sections/posts/StartPosts.tsx
// "Start here": the first three style notes as they list them, kept in
// view down the left on a computer, beside every other note in full on
// the right. (Lab: blog K, "Start here".)
//
// From `posts`: the first three in the data sheet's order are the ones to
// start with (their choice); the rest follow newest first. Needs four.
// The essentials link down to their notes. No motion.

import { useBoutique } from '../../app/BoutiqueContext'

const slug = (title: string) => 'note-' + title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export default function StartPosts() {
  const { boutique } = useBoutique()
  const posts = boutique.posts ?? []
  if (posts.length < 4) return null
  const start = posts.slice(0, 3)
  const rest = posts.slice(3).sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))

  return (
    <section id="journal" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <aside className="self-start md:sticky md:top-24 md:col-span-4">
          <h2 className="t-1">Start here</h2>
          <ol className="mt-6 space-y-3 border-t-2 border-ink pt-4">
            {start.map((p, i) => (
              <li key={p.title}>
                <a href={`#${slug(p.title)}`} className="group flex min-h-11 gap-3">
                  <span className="t-3 text-thread">{i + 1}</span>
                  <span className="link-stitch t-3">{p.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </aside>
        <div className="space-y-12 md:col-span-8">
          {[...start, ...rest].map((p) => (
            <article key={p.title} id={slug(p.title)} className="scroll-mt-24 border-t border-ink/15 pt-8">
              <h3 className="t-2 max-w-[24ch] text-balance">{p.title}</h3>
              <p className="t-lead mt-4 max-w-[52ch] whitespace-pre-line text-muted">{p.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
