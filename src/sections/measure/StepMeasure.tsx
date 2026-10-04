// src/sections/measure/StepMeasure.tsx
// Measure one thing at a time: the drawing shows where the tape goes, a
// line says how, and one field takes the number; next moves on. At the end
// every number goes in one WhatsApp message. Easier than ten fields at once
// on a phone. (Lab: measure E, "One at a time".)
//
// Shows only for a boutique that stitches blouses. No motion.

import { useState } from 'react'
import { IconArrowLeft, IconArrowRight, IconBrandWhatsapp } from '@tabler/icons-react'
import Button from '../../components/Button'
import Field from '../../components/Field'
import { useBlouse } from '../blouse/blouseShared'
import { MEASURES, TapeDrawing, useSendMeasurements } from './measureShared'

const STEP_BUTTON =
  'inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full border border-ink/30 px-6 font-semibold transition-[border-color,scale] duration-200 ease-stitch hover:border-ink active:scale-[0.97] disabled:cursor-default disabled:opacity-40'

export default function StepMeasure() {
  const { stitchesBlouses } = useBlouse()
  const send = useSendMeasurements()
  const [index, setIndex] = useState(0)
  const [values, setValues] = useState<Record<string, string>>({})
  if (!stitchesBlouses) return null
  const m = MEASURES[index]
  const last = index === MEASURES.length - 1

  return (
    <section id="measure" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-6">
          <div className="aspect-[5/4] bg-paper p-6 md:p-10">
            <TapeDrawing measure={m} />
          </div>
        </div>
        <div className="md:col-span-6">
          <h2 className="t-1">Measure yourself</h2>
          <p className="t-small mt-6 text-muted">
            Measurement {index + 1} of {MEASURES.length}
          </p>
          <div className="mt-3 h-1.5 bg-ink/10" aria-hidden="true">
            <div className="h-full bg-primary-ink transition-[width] duration-300 ease-stitch" style={{ width: `${((index + 1) / MEASURES.length) * 100}%` }} />
          </div>
          <p className="t-2 mt-6" aria-hidden="true">
            {m.name}
          </p>
          <p className="mt-3 max-w-[40ch] text-muted">{m.how}</p>
          <div className="mt-6 max-w-xs">
            {/* `required` only drops Field's "(optional)"; the field may be left blank. */}
            <Field key={m.id} label={`${m.name}, in inches`} required>
              {(field) => (
                <input
                  {...field}
                  type="number"
                  inputMode="decimal"
                  step="0.5"
                  min="0"
                  value={values[m.id] ?? ''}
                  onChange={(e) => setValues({ ...values, [m.id]: e.target.value })}
                />
              )}
            </Field>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" onClick={() => setIndex(index - 1)} disabled={index === 0} className={STEP_BUTTON}>
              <IconArrowLeft size={18} stroke={1.75} aria-hidden="true" />
              Back
            </button>
            {!last && (
              <button type="button" onClick={() => setIndex(index + 1)} className={STEP_BUTTON}>
                Next
                <IconArrowRight size={18} stroke={1.75} aria-hidden="true" />
              </button>
            )}
          </div>
          {last && (
            <div className="mt-8">
              <Button href={send(values)} variant="primary" icon={IconBrandWhatsapp}>
                Send my measurements
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
