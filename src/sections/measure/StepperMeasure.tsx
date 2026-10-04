// src/sections/measure/StepperMeasure.tsx
// Set each measurement with big plus and minus buttons instead of typing:
// pick a measurement, tap to the number, and the list fills in as she goes.
// Easy on a phone and hard to get wrong. (Lab: measure M, "Stepper".)
//
// Starts each measurement at a common value as a convenience; the numbers
// sent are only the ones she set. Shows only for a boutique that stitches
// blouses. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp, IconMinus, IconPlus } from '@tabler/icons-react'
import Button from '../../components/Button'
import { useBlouse } from '../blouse/blouseShared'
import { MEASURES, TapeDrawing, useSendMeasurements } from './measureShared'

// Where each stepper starts, in inches: a common middle value, not a guess about her.
const START: Record<string, number> = { bust: 34, under: 29, waist: 29, shoulder: 14.5, armhole: 16, sleeve: 11, round: 11, fneck: 7, bneck: 9, length: 14.5 }

const ROUND =
  'grid h-16 w-16 cursor-pointer place-items-center rounded-full border border-ink/25 transition-[background-color,color,scale] duration-200 ease-stitch hover:bg-ink hover:text-light active:scale-[0.95]'

export default function StepperMeasure() {
  const { stitchesBlouses } = useBlouse()
  const send = useSendMeasurements()
  const [index, setIndex] = useState(0)
  const [values, setValues] = useState<Record<string, number>>({})
  if (!stitchesBlouses) return null

  const m = MEASURES[index]
  const value = values[m.id] ?? START[m.id]
  const set = (v: number) => setValues({ ...values, [m.id]: Math.max(0, Math.round(v * 2) / 2) })
  const sent = Object.fromEntries(Object.entries(values).map(([k, v]) => [k, String(v)]))

  return (
    <section id="measure" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-6">
          <h2 className="t-1 max-w-[12ch] text-balance">Set your measurements</h2>
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Measurement">
            {MEASURES.map((mm, i) => (
              <button
                key={mm.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-pressed={i === index}
                className="min-h-11 cursor-pointer rounded-full border border-ink/25 px-4 transition-[background-color,border-color,color] duration-200 ease-stitch hover:border-ink aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
              >
                {mm.name}
                {values[mm.id] !== undefined && ' ✓'}
              </button>
            ))}
          </div>
          <div className="mt-10 flex items-center justify-center gap-6">
            <button type="button" onClick={() => set(value - 0.5)} aria-label={`Less ${m.name.toLowerCase()}`} className={ROUND}>
              <IconMinus size={26} stroke={1.75} aria-hidden="true" />
            </button>
            <p className="min-w-32 text-center" aria-live="polite">
              <span className="t-hero tabular-nums text-primary-ink">{value}</span>
              <span className="t-small block text-muted">inches · {m.name}</span>
            </p>
            <button type="button" onClick={() => set(value + 0.5)} aria-label={`More ${m.name.toLowerCase()}`} className={ROUND}>
              <IconPlus size={26} stroke={1.75} aria-hidden="true" />
            </button>
          </div>
          <div className="mt-10">
            <Button href={send(sent)} variant="primary" icon={IconBrandWhatsapp}>
              Send {Object.keys(values).length || ''} measurement{Object.keys(values).length === 1 ? '' : 's'}
            </Button>
          </div>
        </div>
        <div className="md:col-span-6">
          <div className="aspect-[5/4] bg-paper p-6 md:p-10">
            <TapeDrawing measure={m} />
          </div>
          <p className="mt-4 text-muted">{m.how}</p>
        </div>
      </div>
    </section>
  )
}
