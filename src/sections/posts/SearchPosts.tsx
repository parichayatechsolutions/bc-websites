// src/sections/posts/SearchPosts.tsx
// Search their style notes: type "neck", "silk" or "wedding" and the notes
// narrow to those that mention it; when none do, a button asks the question
// on WhatsApp instead. (Lab: blog Q, "Search".)
//
// From `posts`; hides without any. No motion.

import { useId, useState } from 'react'
import { IconBrandWhatsapp, IconSearch } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

export default function SearchPosts() {
  const { boutique } = useBoutique()
  const id = useId()
  const [query, setQuery] = useState('')
  const posts = boutique.posts ?? []
  if (!posts.length) return null

  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  const found = words.length ? posts.filter((p) => words.every((w) => `${p.title} ${p.text}`.toLowerCase().includes(w))) : posts

  return (
    <section id="notes" className="section">
      <div className="wrap max-w-3xl">
        <h2 className="t-1">Style notes</h2>
        <label htmlFor={id} className="mt-8 flex min-h-14 items-center gap-3 rounded-full border border-ink/25 bg-light px-5 focus-within:border-primary-ink">
          <IconSearch size={22} stroke={1.5} className="shrink-0 text-muted" aria-hidden="true" />
          <span className="sr-only">Search the notes</span>
          <input
            id={id}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try neck, silk or wedding"
            className="min-w-0 flex-1 bg-transparent py-3 outline-none placeholder:text-muted/70"
          />
        </label>
        <p className="t-small mt-3 text-muted" aria-live="polite">
          {words.length ? `${found.length} ${found.length === 1 ? 'note' : 'notes'}` : `${posts.length} notes`}
        </p>
        {found.length > 0 ? (
          <div className="mt-8 space-y-10">
            {found.map((p) => (
              <article key={p.title} className="border-t border-ink/15 pt-6">
                <h3 className="t-3">{p.title}</h3>
                <p className="mt-2 text-muted">{p.text}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 border-t border-ink/15 pt-8">
            <p className="text-muted">Nothing on that yet. Ask us instead.</p>
            <div className="mt-5">
              <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I have a question about ${query.trim()}.`)} variant="primary" icon={IconBrandWhatsapp}>
                Ask about “{query.trim()}”
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
