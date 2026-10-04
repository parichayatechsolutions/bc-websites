// src/sections/bridal/DeckBridal.tsx
// The bridal packages as a stack of cards, the top one in full and the
// next two peeking out behind; previous and next deal the deck. Nothing
// deals on its own. (Lab: bridal O, "Package deck".)
//
// From `bridalPackages`; prices only with permission. Hides without
// packages. The cards move with a CSS transition that reduced motion
// turns off.

import { useState } from 'react'
import { IconBrandWhatsapp, IconCheck, IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { capitalise } from '../../app/text'
import Button from '../../components/Button'
import { useBridal } from './bridalShared'

const ROUND =
  'grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-ink/25 transition-[background-color,color] duration-200 ease-stitch hover:bg-ink hover:text-light'
const BEHIND = ['rotate-0', 'rotate-2 translate-x-3', '-rotate-2 -translate-x-3']

export default function DeckBridal() {
  const { packages, price, ask, consult } = useBridal()
  const [top, setTop] = useState(0)
  if (!packages.length) return null
  const step = (by: number) => setTop((top + by + packages.length) % packages.length)

  return (
    <section id="bridal" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">Bridal packages</h2>
          {packages.length > 1 && (
            <div className="mt-8 flex items-center gap-3">
              <button type="button" onClick={() => step(-1)} aria-label="Previous package" className={ROUND}>
                <IconChevronLeft size={22} stroke={1.5} aria-hidden="true" />
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Next package" className={ROUND}>
                <IconChevronRight size={22} stroke={1.5} aria-hidden="true" />
              </button>
              <span className="t-small tabular-nums text-muted" aria-live="polite">
                {top + 1} of {packages.length}
              </span>
            </div>
          )}
          <div className="mt-8">
            <Button href={consult} variant="outline-dark" icon={IconBrandWhatsapp}>
              Book a bridal consult
            </Button>
          </div>
        </div>
        <div className="relative grid md:col-span-7">
          {packages.map((p, i) => {
            const place = (i - top + packages.length) % packages.length
            if (place > 2) return null
            return (
              <article
                key={p.name}
                aria-hidden={place !== 0}
                inert={place !== 0}
                className={`col-start-1 row-start-1 rounded-2xl border border-ink/15 bg-light p-7 transition-transform duration-500 ease-stitch md:p-10 ${BEHIND[place]}`}
                style={{ zIndex: 10 - place }}
              >
                <h3 className="t-2 text-primary-ink">{p.name}</h3>
                {price(p) && <p className="t-3 mt-2">{price(p)}</p>}
                {p.includes.length > 0 && (
                  <ul className="mt-6 space-y-3 border-t border-ink/15 pt-6">
                    {p.includes.map((item) => (
                      <li key={item} className="grid grid-cols-[1.25rem_1fr] gap-3">
                        <IconCheck size={20} stroke={1.75} className="mt-1 text-primary-ink" aria-hidden="true" />
                        {capitalise(item)}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-8">
                  <Button href={ask(p)} variant="primary" icon={IconBrandWhatsapp}>
                    Ask about it
                  </Button>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
