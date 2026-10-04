// src/sections/measure/GuideMeasure.tsx
// How to measure for a blouse: the ten measurements as a numbered list
// (the order to take them in); choosing one shows on the drawing where the
// tape goes and how to hold it. A button sends a ready-to-fill list on
// WhatsApp. (Lab: measure A, "Guide + diagram".)
//
// Needs no photographs. Shows only for a boutique that stitches blouses.
// No motion.

import { useState } from 'react'
import { IconBrandWhatsapp, IconChevronRight } from '@tabler/icons-react'
import Button from '../../components/Button'
import { useBlouse } from '../blouse/blouseShared'
import { MEASURES, TapeDrawing, useSendMeasurements } from './measureShared'

export default function GuideMeasure() {
  const { stitchesBlouses } = useBlouse()
  const send = useSendMeasurements()
  const [index, setIndex] = useState(0)
  if (!stitchesBlouses) return null
  const current = MEASURES[index]

  return (
    <section id="measure" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">How to measure</h2>
          <ol className="mt-10 border-t border-ink/15" aria-label="Measurements">
            {MEASURES.map((m, i) => (
              <li key={m.id} className="border-b border-ink/15">
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-pressed={i === index}
                  className="group flex min-h-12 w-full cursor-pointer items-center gap-4 py-3 text-left transition-colors duration-200 ease-stitch aria-pressed:text-primary-ink"
                >
                  <span className="t-small w-6 shrink-0 text-thread">{i + 1}</span>
                  <span className="flex-1">{m.name}</span>
                  <IconChevronRight
                    size={18}
                    stroke={1.5}
                    aria-hidden="true"
                    className="shrink-0 transition-transform duration-300 ease-stitch group-hover:translate-x-1"
                  />
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="md:col-span-7">
          <div className="sticky top-24">
            <div className="aspect-[5/4] bg-paper p-6 md:p-10">
              <TapeDrawing measure={current} />
            </div>
            <div className="mt-6" aria-live="polite">
              <p className="t-small text-muted">
                {index + 1} of {MEASURES.length} · {current.back ? 'Back' : 'Front'}
              </p>
              <h3 className="t-2 mt-2">{current.name}</h3>
              <p className="mt-3 max-w-[44ch] text-muted">{current.how}</p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button href={send()} variant="primary" icon={IconBrandWhatsapp}>
                Send my measurements
              </Button>
              <p className="t-small text-muted">Or bring a blouse that fits you well.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
