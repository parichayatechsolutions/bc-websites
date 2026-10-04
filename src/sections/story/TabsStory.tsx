// src/sections/story/TabsStory.tsx
// Three tabs: their story, what a customer can count on, and their
// workroom. Each tab is built from the config: the owner's words, the
// promises their data supports, and their team or workroom photo.
// (Lab: story S, "Story tabs".)
//
// Tabs without content are left out; with only one, it shows without tabs.
// Hides without a story. Tabs follow the ARIA pattern (arrow keys).

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import Media from '../../components/Media'
import { trustPromises } from '../trust/trustFacts'
import { useStory } from './storyShared'

export default function TabsStory() {
  const { boutique } = useBoutique()
  const { owner, paragraphs, ownVoice } = useStory()
  const id = useId()
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  if (!paragraphs.length) return null

  const promises = trustPromises(boutique)
  const team = boutique.team ?? []
  const photo = boutique.media.teamAtWork ?? boutique.media.interior?.[0]

  const panels: { name: string; body: ReactNode }[] = [
    {
      name: 'Our story',
      body: (
        <div className="t-lead max-w-[40ch] space-y-5">
          {paragraphs.map((p, i) => (
            <p key={p}>
              {ownVoice && i === 0 ? '“' : ''}
              {p}
              {ownVoice && i === paragraphs.length - 1 ? '”' : ''}
            </p>
          ))}
          <p className="t-3">{owner.name}</p>
        </div>
      ),
    },
    ...(promises.length >= 3
      ? [
          {
            name: 'Our promise',
            body: (
              <ul className="grid max-w-3xl gap-6 sm:grid-cols-2">
                {promises.map(({ title, text }) => (
                  <li key={title} className="border-t border-ink/15 pt-4">
                    <p className="t-3">{title}</p>
                    <p className="mt-1 text-muted">{text}</p>
                  </li>
                ))}
              </ul>
            ),
          },
        ]
      : []),
    ...(photo || team.length
      ? [
          {
            name: 'Our workroom',
            body: (
              <div className="grid gap-8 md:grid-cols-2">
                {photo && (
                  <div className="aspect-[4/3] overflow-hidden bg-paper">
                    <Media file={photo} alt={`Inside ${boutique.brand.name}`} />
                  </div>
                )}
                {team.length > 0 && (
                  <ul className="space-y-4">
                    {team.map((t) => (
                      <li key={t.name}>
                        <p className="t-3">{t.name}</p>
                        <p className="text-muted">{t.role}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ),
          },
        ]
      : []),
  ]
  const current = panels[active] ?? panels[0]

  const onKey = (e: KeyboardEvent) => {
    const by = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!by) return
    e.preventDefault()
    const next = (active + by + panels.length) % panels.length
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <section id="story" className="section">
      <div className="wrap">
        <h2 className="t-1">About us</h2>
        {panels.length > 1 && (
          <div role="tablist" aria-label="About us" onKeyDown={onKey} className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-b border-ink/15">
            {panels.map((p, i) => (
              <button
                key={p.name}
                ref={(el) => {
                  tabs.current[i] = el
                }}
                type="button"
                role="tab"
                id={`${id}-tab${i}`}
                aria-selected={p.name === current.name}
                aria-controls={`${id}-panel`}
                tabIndex={p.name === current.name ? 0 : -1}
                onClick={() => setActive(i)}
                className="-mb-px min-h-12 cursor-pointer border-b-2 border-transparent transition-colors duration-200 ease-stitch hover:text-primary-ink aria-selected:border-primary-ink aria-selected:text-primary-ink"
              >
                {p.name}
              </button>
            ))}
          </div>
        )}
        <div
          key={current.name}
          id={`${id}-panel`}
          role={panels.length > 1 ? 'tabpanel' : undefined}
          aria-labelledby={panels.length > 1 ? `${id}-tab${active}` : undefined}
          className="mt-10 animate-[fade-in_700ms_var(--ease-stitch)]"
        >
          {current.body}
        </div>
      </div>
    </section>
  )
}
