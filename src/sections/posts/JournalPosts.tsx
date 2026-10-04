// src/sections/posts/JournalPosts.tsx
// The journal: their style notes under a ruled masthead, the newest as the
// lead story (with its photo when there is one), the rest in a ruled list.
// Each note is shown in full; there are no separate article pages.
// (Lab: blog A, "The Journal".)
//
// From `posts`, newest first; written or approved by the boutique (data
// sheet 8c). Hides without any. No motion.

import { useBoutique } from '../../app/BoutiqueContext'
import Media from '../../components/Media'

const long = (date?: string) =>
  date ? new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : undefined

export default function JournalPosts() {
  const { boutique } = useBoutique()
  const posts = [...(boutique.posts ?? [])].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
  if (!posts.length) return null
  const [lead, ...rest] = posts

  return (
    <section id="journal" className="section">
      <div className="wrap">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-2 border-ink pb-4">
          <h2 className="t-1">Style notes</h2>
          <p className="text-muted">{boutique.brand.name}</p>
        </div>

        <article className="grid gap-8 border-b border-ink/15 py-10 md:grid-cols-12 md:gap-12">
          {lead.photo && (
            <div className="aspect-[4/3] overflow-hidden bg-paper md:col-span-6">
              <Media file={lead.photo} alt="" />
            </div>
          )}
          <div className={lead.photo ? 'md:col-span-6' : 'md:col-span-9'}>
            {lead.date && <p className="t-small text-muted">{long(lead.date)}</p>}
            <h3 className="t-2 mt-2 max-w-[22ch] text-balance">{lead.title}</h3>
            <p className="t-lead mt-5 max-w-[40ch]">{lead.text}</p>
          </div>
        </article>

        {rest.length > 0 && (
          <ul>
            {rest.map((p) => (
              <li key={p.title} className="grid gap-3 border-b border-ink/15 py-8 md:grid-cols-12 md:gap-10">
                <p className="t-small text-muted md:col-span-3">{long(p.date)}</p>
                <div className="md:col-span-9">
                  <h3 className="t-3">{p.title}</h3>
                  <p className="mt-2 max-w-[60ch] text-muted">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
