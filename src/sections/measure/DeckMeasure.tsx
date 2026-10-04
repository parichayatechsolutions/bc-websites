// src/sections/measure/DeckMeasure.tsx
// Dark, the measurements as a deck of cards dealt one by one: the top card
// shows the drawing, the name and how to take it, with the next peeking
// behind; previous and next deal. Nothing deals on its own.
// (Lab: measure O, "Card deck".)
//
// Shows only for a boutique that stitches blouses. The cards move with a
// CSS transition that reduced motion turns off.

import { useState } from 'react'
import { IconBrandWhatsapp, IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import Button from '../../components/Button'
import { useBlouse } from '../blouse/blouseShared'
import { MEASURES, TapeDrawing, useSendMeasurements } from './measureShared'

const ROUND =
  'grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-light/40 transition-[background-color,color] duration-200 ease-stitch hover:bg-light hover:text-dark'
const BEHIND = ['rotate-0', 'rotate-3 translate-x-3', '-rotate-3 -translate-x-3']

export default function DeckMeasure() {
  const { stitchesBlouses } = useBlouse()
  const send = useSendMeasurements()
  const [top, setTop] = useState(0)
  if (!stitchesBlouses) return null
  const step = (by: number) => setTop((top + by + MEASURES.length) % MEASURES.length)

  return (
    <section id="measure" className="section bg-dark text-light">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">One at a time</h2>
          <div className="mt-8 flex items-center gap-3">
            <button type="button" onClick={() => step(-1)} aria-label="Previous measurement" className={ROUND}>
              <IconChevronLeft size={22} stroke={1.5} aria-hidden="true" />
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Next measurement" className={ROUND}>
              <IconChevronRight size={22} stroke={1.5} aria-hidden="true" />
            </button>
            <span className="t-small tabular-nums text-light/70" aria-live="polite">
              {top + 1} of {MEASURES.length}
            </span>
          </div>
          <div className="mt-8">
            <Button href={send()} icon={IconBrandWhatsapp}>
              Send my measurements
            </Button>
          </div>
        </div>
        <div className="relative grid md:col-span-7">
          {MEASURES.map((m, i) => {
            const place = (i - top + MEASURES.length) % MEASURES.length
            if (place > 2) return null
            return (
              <article
                key={m.id}
                aria-hidden={place !== 0}
                className={`col-start-1 row-start-1 rounded-2xl bg-light p-6 text-ink transition-transform duration-500 ease-stitch md:p-8 ${BEHIND[place]}`}
                style={{ zIndex: 10 - place }}
              >
                <div className="aspect-[5/4] bg-paper p-4">
                  <TapeDrawing measure={m} />
                </div>
                <h3 className="t-2 mt-5">{m.name}</h3>
                <p className="mt-2 text-muted">{m.how}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
