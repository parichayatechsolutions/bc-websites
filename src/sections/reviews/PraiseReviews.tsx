// src/sections/reviews/PraiseReviews.tsx
// What customers praise, by topic: tabs for the fit, the handwork and
// delivery on time, each showing the reviews that actually talk about it.
// (Lab: reviews X, "Praise tabs".)
//
// A tab appears only when some of their reviews mention its topic (by
// their own words); needs two tabs. Quotes as written, first names only.
// Tabs follow the ARIA tabs pattern. No motion.

import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { GoogleLink, useReviews } from './reviewShared'

const TOPICS = [
  { name: 'The fit', match: /\bfit|fitting|perfect size|measure/i },
  { name: 'The handwork', match: /aari|maggam|embroider|handwork|work is|design/i },
  { name: 'On time', match: /on time|in time|before|quick|fast|deliver|promised/i },
  { name: 'Alterations', match: /alter/i },
]

export default function PraiseReviews() {
  const { reviews, google } = useReviews()
  const id = useId()
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const [index, setIndex] = useState(0)
  const topics = TOPICS.map((t) => ({ ...t, reviews: reviews.filter((r) => t.match.test(r.text)).slice(0, 3) })).filter((t) => t.reviews.length)
  if (topics.length < 2) return null
  const topic = topics[index] ?? topics[0]

  const onKey = (e: KeyboardEvent) => {
    const by = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!by) return
    const next = (index + by + topics.length) % topics.length
    setIndex(next)
    tabs.current[next]?.focus()
  }

  return (
    <section id="reviews" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[12ch] text-balance">What customers praise</h2>
        <div role="tablist" aria-label="Topics" className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-b border-ink/15" onKeyDown={onKey}>
          {topics.map((t, i) => (
            <button
              key={t.name}
              ref={(el) => {
                tabs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`${id}-t${i}`}
              aria-selected={i === index}
              aria-controls={`${id}-p`}
              tabIndex={i === index ? 0 : -1}
              onClick={() => setIndex(i)}
              className="-mb-px min-h-12 cursor-pointer border-b-2 border-transparent transition-colors duration-200 ease-stitch hover:text-primary-ink aria-selected:border-primary-ink aria-selected:font-semibold aria-selected:text-primary-ink"
            >
              {t.name}
            </button>
          ))}
        </div>
        <ul role="tabpanel" id={`${id}-p`} aria-labelledby={`${id}-t${index}`} className="mt-8 space-y-8">
          {topic.reviews.map((r, i) => (
            <li key={r.name + i}>
              <figure>
                <blockquote className="t-lead max-w-[48ch]">“{r.text}”</blockquote>
                <figcaption className="mt-3 font-semibold text-primary-ink">{r.name.split(' ')[0]}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <GoogleLink href={google} className="mt-10" />
      </div>
    </section>
  )
}
