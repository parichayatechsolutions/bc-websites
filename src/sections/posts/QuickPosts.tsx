// src/sections/posts/QuickPosts.tsx
// Quick tips: each style note as a short card with its title and text,
// wrapping into a grid rather than running off the side as a rail, so all
// of them can be seen at once. (Lab: blog R, "Quick tips", as a grid: a
// sideways rail would scroll the page on a phone.)
//
// From `posts`, newest first, up to nine; hides without any. No motion.

import { useBoutique } from '../../app/BoutiqueContext'
import Media from '../../components/Media'

export default function QuickPosts() {
  const { boutique } = useBoutique()
  const posts = [...(boutique.posts ?? [])].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? '')).slice(0, 9)
  if (!posts.length) return null

  return (
    <section id="tips" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Quick tips</h2>
        <ul className={`mt-12 grid gap-4 ${posts.length > 1 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'max-w-xl'}`}>
          {posts.map((p) => (
            <li key={p.title} className="flex flex-col overflow-hidden rounded-2xl bg-paper">
              {p.photo && (
                <div className="aspect-[3/2] overflow-hidden">
                  <Media file={p.photo} alt="" />
                </div>
              )}
              <div className="p-6">
                <h3 className="t-3 text-pretty">{p.title}</h3>
                <p className="mt-3 text-muted">{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
