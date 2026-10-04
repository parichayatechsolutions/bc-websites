// src/sections/measure/FormMeasure.tsx
// Fill in, send, done: a field for each of the ten measurements, inches or
// centimetres, and one button that sends them on WhatsApp. Focusing a field
// shows on the drawing where that tape goes. Nothing is stored or sent
// anywhere but the WhatsApp message she chooses to send.
// (Lab: measure B, "Fill in".)
//
// Needs no photographs. Shows only for a boutique that stitches blouses.
// No motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import Button from '../../components/Button'
import Field from '../../components/Field'
import { useBlouse } from '../blouse/blouseShared'
import { MEASURES, TapeDrawing, useSendMeasurements } from './measureShared'

const UNITS = [
  { id: 'inches', short: 'in' },
  { id: 'centimetres', short: 'cm' },
]

export default function FormMeasure() {
  const { stitchesBlouses } = useBlouse()
  const send = useSendMeasurements()
  const [unit, setUnit] = useState(UNITS[0])
  const [values, setValues] = useState<Record<string, string>>({})
  const [focus, setFocus] = useState(0)
  if (!stitchesBlouses) return null
  const current = MEASURES[focus]
  const filled = Object.values(values).filter((v) => v.trim()).length

  return (
    <section id="measure" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <h2 className="t-1 max-w-[12ch] text-balance">Send your measurements</h2>

          <div className="mt-8 flex gap-2" role="group" aria-label="Units">
            {UNITS.map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => setUnit(u)}
                aria-pressed={u.id === unit.id}
                className="min-h-11 cursor-pointer rounded-full border border-ink/25 px-5 transition-[background-color,border-color,color,scale] duration-200 ease-stitch hover:border-ink active:scale-[0.97] aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
              >
                {u.id.charAt(0).toUpperCase() + u.id.slice(1)}
              </button>
            ))}
          </div>

          <p className="mt-6 text-muted">Fill in what you have; leave the rest blank.</p>
          <div className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2">
            {MEASURES.map((m, i) => (
              // `required` only drops Field's "(optional)" from ten labels; every field may be left blank.
              <Field key={m.id} label={`${m.name}, ${unit.short}`} required>
                {(field) => (
                  <input
                    {...field}
                    type="number"
                    inputMode="decimal"
                    step="0.5"
                    min="0"
                    value={values[m.id] ?? ''}
                    onChange={(e) => setValues({ ...values, [m.id]: e.target.value })}
                    onFocus={() => setFocus(i)}
                  />
                )}
              </Field>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button href={send(values, unit.id)} variant="primary" icon={IconBrandWhatsapp}>
              {filled ? `Send ${filled} measurement${filled === 1 ? '' : 's'}` : 'Send my measurements'}
            </Button>
            <p className="t-small text-muted">Or bring a blouse that fits you well.</p>
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="sticky top-24">
            <div className="aspect-[5/4] bg-paper p-6 md:p-8">
              <TapeDrawing measure={current} />
            </div>
            <div className="mt-5" aria-live="polite">
              <p className="t-3">{current.name}</p>
              <p className="mt-2 text-muted">{current.how}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
