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
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { trustPromises } from '../trust/trustFacts'
import { useStory } from './storyShared'

export default function TabsStory() {
  const { boutique } = useBoutique()
  const { owner, paragraphs: rawParagraphs, ownVoice, portrait } = useStory()
  const root = useRef<HTMLElement>(null)
  const id = useId()
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  const paragraphs =
    rawParagraphs.length > 0
      ? rawParagraphs
      : [
          boutique.owner?.story ??
            boutique.highlight ??
            `Bespoke couture tailoring, intricate bridal aari and maggam hand embroidery, and guaranteed first-trial perfection in our atelier.`,
        ]

  useMotion(root, () => {
    wipe('[data-story-panel]', { trigger: root.current })
  })

  if (!paragraphs.length) return null

  const promises = trustPromises(boutique)
  const team = boutique.team ?? []
  const storyPhoto =
    portrait ??
    boutique.media.teamAtWork ??
    boutique.media.interior?.[0] ??
    boutique.media.work?.[0]
  const promisePhoto =
    boutique.media.closeups?.[0] ??
    boutique.media.work?.[0] ??
    boutique.media.interior?.[0] ??
    boutique.media.storefront
  const workroomPhoto =
    boutique.media.teamAtWork ??
    boutique.media.interior?.[0] ??
    boutique.media.work?.[0]

  const panels: { name: string; body: ReactNode }[] = [
    {
      name: 'Our story',
      body: (
        <div className="grid gap-10 md:grid-cols-12 md:items-center">
          <div className={`${storyPhoto ? 'md:col-span-7' : 'max-w-[48ch]'} space-y-6`}>
            <div className="t-lead space-y-5">
              {paragraphs.map((p, i) => (
                <p key={p}>
                  {ownVoice && i === 0 ? '“' : ''}
                  {p}
                  {ownVoice && i === paragraphs.length - 1 ? '”' : ''}
                </p>
              ))}
            </div>
            <div className="border-l-2 border-primary-ink/30 pl-4 pt-1">
              <p className="t-3 font-semibold text-primary-ink">{owner.name}</p>
              {owner.role && <p className="t-small text-muted">{owner.role}</p>}
            </div>
          </div>
          {storyPhoto && (
            <div className="flex justify-center md:col-span-5 md:justify-end">
              <figure className="group relative w-full max-w-xs">
                <div className="arch relative aspect-[3/4] overflow-hidden bg-paper shadow-2xl ring-1 ring-ink/10 transition-transform duration-500 hover:scale-[1.02]">
                  <Media
                    file={storyPhoto}
                    alt={portrait ? owner.name : `${boutique.brand.name} atelier`}
                    priority
                    className="h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <p className="font-serif text-lg font-medium tracking-wide">
                      {portrait ? owner.name : boutique.brand.name}
                    </p>
                    <p className="text-xs uppercase tracking-wider text-white/80">
                      {portrait && owner.role ? owner.role : 'Founder & Designer'}
                    </p>
                  </div>
                </div>
              </figure>
            </div>
          )}
        </div>
      ),
    },
    ...(promises.length >= 3
      ? [
          {
            name: 'Our promise',
            body: (
              <div className="grid gap-10 md:grid-cols-12 md:items-center">
                <ul className={`${promisePhoto ? 'md:col-span-7' : 'max-w-3xl'} grid gap-6 sm:grid-cols-2`}>
                  {promises.map(({ title, text }) => (
                    <li key={title} className="border-t border-ink/15 pt-4">
                      <p className="t-3 font-semibold text-primary-ink">{title}</p>
                      <p className="mt-1 text-muted">{text}</p>
                    </li>
                  ))}
                </ul>
                {promisePhoto && (
                  <div className="flex justify-center md:col-span-5 md:justify-end">
                    <figure className="group relative w-full max-w-xs">
                      <div className="arch relative aspect-[3/4] overflow-hidden bg-paper shadow-2xl ring-1 ring-ink/10 transition-transform duration-500 hover:scale-[1.02]">
                        <Media
                          file={promisePhoto}
                          alt={`${boutique.brand.name} craftsmanship standards`}
                          priority
                          className="h-full w-full object-cover"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                          <p className="font-serif text-lg font-medium tracking-wide">
                            Artisanal Standards
                          </p>
                          <p className="text-xs uppercase tracking-wider text-white/80">
                            Guaranteed Fit & Finish
                          </p>
                        </div>
                      </div>
                    </figure>
                  </div>
                )}
              </div>
            ),
          },
        ]
      : []),
    ...(workroomPhoto || team.length
      ? [
          {
            name: 'Our workroom',
            body: (
              <div className="grid gap-10 md:grid-cols-12 md:items-center">
                <div className={`${workroomPhoto ? 'md:col-span-7' : 'max-w-3xl'} space-y-6`}>
                  {team.length > 0 ? (
                    <ul className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
                      {team.map((t) => (
                        <li key={t.name} className="border-t border-ink/15 pt-3">
                          <p className="t-3 font-semibold text-primary-ink">{t.name}</p>
                          <p className="mt-0.5 text-muted">{t.role}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="t-lead">
                      Every garment is crafted in-house by our dedicated master tailors, pattern cutters, and embroidery karigars.
                    </p>
                  )}
                </div>
                {workroomPhoto && (
                  <div className="flex justify-center md:col-span-5 md:justify-end">
                    <figure className="group relative w-full max-w-xs">
                      <div className="arch relative aspect-[3/4] overflow-hidden bg-paper shadow-2xl ring-1 ring-ink/10 transition-transform duration-500 hover:scale-[1.02]">
                        <Media
                          file={workroomPhoto}
                          alt={`Inside ${boutique.brand.name} workroom`}
                          priority
                          className="h-full w-full object-cover"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                          <p className="font-serif text-lg font-medium tracking-wide">
                            Our Workroom
                          </p>
                          <p className="text-xs uppercase tracking-wider text-white/80">
                            Handcrafted in Atelier
                          </p>
                        </div>
                      </div>
                    </figure>
                  </div>
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
    <section ref={root} id="story" className="section">
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
          data-story-panel
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
