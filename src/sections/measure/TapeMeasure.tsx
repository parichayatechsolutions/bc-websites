// src/sections/measure/TapeMeasure.tsx
// Dark, with the ten measurements laid out as lengths of gold tape, tick
// marks along each; tapping one shows on the drawing where the tape goes
// and how to take it. (Lab: measure D, "Tape measure".)
//
// Shows only for a boutique that stitches blouses. The drawing swaps with
// a CSS fade.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import Button from '../../components/Button'
import { useBlouse } from '../blouse/blouseShared'
import { MEASURES, TapeDrawing, useSendMeasurements } from './measureShared'

// Inch ticks along a length of tape.
const TICKS = {
  backgroundImage: 'repeating-linear-gradient(90deg, color-mix(in oklab, var(--c-on-accent) 45%, transparent) 0 1px, transparent 1px 10px)',
  backgroundSize: '100% 35%',
  backgroundRepeat: 'no-repeat',
}

export default function TapeMeasure() {
  const { stitchesBlouses } = useBlouse()
  const send = useSendMeasurements()
  const [index, setIndex] = useState(0)
  if (!stitchesBlouses) return null
  const m = MEASURES[index]

  return (
    <section id="measure" className="section bg-dark text-light">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-6">
          <h2 className="t-1 max-w-[12ch] text-balance">Measure as we do</h2>
          <ul className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Measurement">
            {MEASURES.map((mm, i) => (
              <li key={mm.id}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-pressed={i === index}
                  style={TICKS}
                  className="min-h-12 cursor-pointer bg-accent px-4 pt-3 pb-2 text-on-accent transition-[background-color,color] duration-200 ease-stitch hover:bg-[color-mix(in_oklab,var(--c-accent)_85%,white)] aria-pressed:bg-light aria-pressed:text-ink"
                >
                  {mm.name}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Button href={send()} icon={IconBrandWhatsapp}>
              Send my measurements
            </Button>
          </div>
        </div>
        <div key={index} className="animate-[fade-in_700ms_var(--ease-stitch)] md:col-span-6" aria-live="polite">
          <div className="aspect-[5/4] rounded-2xl bg-light p-6 md:p-10">
            <TapeDrawing measure={m} />
          </div>
          <p className="t-3 mt-6">{m.name}</p>
          <p className="mt-2 text-light/80">{m.how}</p>
        </div>
      </div>
    </section>
  )
}
