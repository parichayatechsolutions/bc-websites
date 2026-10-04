// src/sections/posts/ProgressPosts.tsx
// A long read with its place kept: the newest style note as an article,
// and a slim bar fixed above it while she reads, with a progress line and
// the minutes left, worked out from the length of the text.
// (Lab: blog T, "Reading progress", following the page's own scroll
// rather than a scrolling frame.)
//
// From `posts`, the newest; hides without any. Reading time at 200 words a
// minute. The progress line follows the scroll, so it means something
// (DESIGN.md); it's a plain width, not an animation.

import { useEffect, useRef, useState } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import Media from '../../components/Media'

const WORDS_A_MINUTE = 200

export default function ProgressPosts() {
  const { boutique } = useBoutique()
  const article = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  const post = [...(boutique.posts ?? [])].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))[0]

  useEffect(() => {
    const onScroll = () => {
      const el = article.current
      if (!el) return
      const { top, height } = el.getBoundingClientRect()
      const read = Math.min(Math.max(-top + window.innerHeight * 0.3, 0), height)
      setProgress(height ? read / height : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!post) return null
  const minutes = Math.max(1, Math.round(post.text.split(/\s+/).length / WORDS_A_MINUTE))
  const left = Math.max(0, Math.ceil(minutes * (1 - progress)))

  return (
    <section id="journal" className="section">
      <div className="wrap max-w-3xl">
        <article ref={article}>
          <div className="sticky top-20 z-10 -mx-5 bg-light/95 px-5 py-3 backdrop-blur md:mx-0 md:px-0">
            <div className="t-small flex justify-between text-muted">
              <span>{minutes} min read</span>
              <span aria-live="off">{progress >= 1 ? 'Done' : `${left} min left`}</span>
            </div>
            <div className="mt-2 h-0.5 bg-ink/10" aria-hidden="true">
              <div className="h-full bg-primary-ink" style={{ width: `${Math.round(progress * 100)}%` }} />
            </div>
          </div>
          <h2 className="t-1 mt-8 text-balance">{post.title}</h2>
          {post.photo && (
            <div className="mt-8 aspect-[16/9] overflow-hidden bg-paper">
              <Media file={post.photo} alt="" />
            </div>
          )}
          <p className="t-lead mt-8 whitespace-pre-line">{post.text}</p>
        </article>
      </div>
    </section>
  )
}
