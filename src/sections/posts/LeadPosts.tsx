// src/sections/posts/LeadPosts.tsx
// The newest style note as a large lead (photo and text side by side),
// then the next three in ruled columns beneath, like a magazine's front
// page. Each note is shown in full. (Lab: blog B, "Style notes".)
//
// From `posts`, newest first; hides without any. No motion.

import { useBoutique } from '../../app/BoutiqueContext'
import Media from '../../components/Media'

const long = (date?: string) =>
  date ? new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : undefined

export default function LeadPosts() {
  const { boutique } = useBoutique()
  const posts = [...(boutique.posts ?? [])].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
  if (!posts.length) return null
  const [lead, ...rest] = posts
  const next = rest.slice(0, 3)

  return (
    <section id="journal" className="section">
      <div className="wrap">
        <h2 className="t-1">Style notes</h2>
        <article className={`mt-10 grid items-center gap-8 ${lead.photo ? 'md:grid-cols-2 md:gap-12' : ''}`}>
          {lead.photo && (
            <div className="aspect-[4/3] overflow-hidden bg-paper">
              <Media file={lead.photo} alt="" />
            </div>
          )}
          <div>
            {lead.date && <p className="t-small text-muted">{long(lead.date)}</p>}
            <h3 className="t-1 mt-2 max-w-[18ch] text-balance">{lead.title}</h3>
            <p className="t-lead mt-5 max-w-[44ch]">{lead.text}</p>
          </div>
        </article>
        {next.length > 0 && (
          <div className={`mt-14 grid gap-10 border-t-2 border-ink pt-8 ${next.length > 1 ? 'md:grid-cols-3' : ''}`}>
            {next.map((p) => (
              <article key={p.title} className="md:border-l md:border-ink/15 md:pl-6 md:first:border-l-0 md:first:pl-0">
                {p.date && <p className="t-small text-muted">{long(p.date)}</p>}
                <h3 className="t-3 mt-1 text-balance">{p.title}</h3>
                <p className="mt-3 text-muted">{p.text}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
