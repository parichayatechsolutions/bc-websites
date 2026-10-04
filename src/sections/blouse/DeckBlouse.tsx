// src/sections/blouse/DeckBlouse.tsx
// Dark, four classic combinations of neck, back and sleeves as a stack of
// cards, each drawn front and back with a line on when it works; previous
// and next deal the deck. (Lab: blouse O, "Design deck", with classic
// combinations rather than "popular" ones, which would be a claim.)
//
// The combinations are shared with NotesBlouse. Shows only for a boutique
// that stitches blouses. The cards move with a CSS transition that
// reduced motion turns off.

import { useState } from 'react'
import { IconBrandWhatsapp, IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { BlouseFlat } from './blouseDrawing'
import { CLASSICS, useBlouse } from './blouseShared'

const ROUND =
  'grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-light/40 transition-[background-color,color] duration-200 ease-stitch hover:bg-light hover:text-dark'
const BEHIND = ['rotate-0', 'rotate-3 translate-x-3', '-rotate-3 -translate-x-3']

export default function DeckBlouse() {
  const { stitchesBlouses, send } = useBlouse()
  const [top, setTop] = useState(0)
  if (!stitchesBlouses) return null
  const look = CLASSICS[top]
  const step = (by: number) => setTop((top + by + CLASSICS.length) % CLASSICS.length)

  return (
    <section id="blouse" className="section overflow-x-clip bg-dark text-light">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="relative grid md:col-span-7">
          {CLASSICS.map((l, i) => {
            const place = (i - top + CLASSICS.length) % CLASSICS.length
            if (place > 2) return null
            return (
              <div
                key={l.name}
                aria-hidden="true"
                className={`col-start-1 row-start-1 grid grid-cols-2 gap-3 rounded-2xl bg-light p-5 transition-transform duration-500 ease-stitch ${BEHIND[place]}`}
                style={{ zIndex: 10 - place }}
              >
                <div className="aspect-[5/4]">
                  <BlouseFlat neck={l.neck} sleeve={l.sleeve} />
                </div>
                <div className="aspect-[5/4]">
                  <BlouseFlat neck={l.back} sleeve={l.sleeve} back />
                </div>
              </div>
            )
          })}
        </div>
        <div className="md:col-span-5" aria-live="polite">
          <h2 className="t-1 max-w-[10ch] text-balance">Four classics</h2>
          <p className="t-2 mt-8 text-accent-on-dark">{look.name}</p>
          <p className="mt-2 max-w-[34ch] text-light/80">{look.note}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={send(look.neck, look.back, look.sleeve)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-light px-7 font-semibold text-ink transition-[scale] duration-200 ease-stitch active:scale-[0.97]"
            >
              <IconBrandWhatsapp size={20} stroke={1.75} aria-hidden="true" />
              Ask for this one
            </a>
            <button type="button" onClick={() => step(-1)} aria-label="Previous design" className={ROUND}>
              <IconChevronLeft size={22} stroke={1.5} aria-hidden="true" />
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Next design" className={ROUND}>
              <IconChevronRight size={22} stroke={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
