// src/sections/measure/NotesMeasure.tsx
// Fit notes: how to measure yourself, set as a magazine page under a
// ruled masthead: every measurement and how to take it running in two
// columns, the first opening with a drop capital, and a button to send.
// For the type-led designs. (Lab: measure P, "Fit notes".)
//
// Shows only for a boutique that stitches blouses. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { useBlouse } from '../blouse/blouseShared'
import { MEASURES, useSendMeasurements } from './measureShared'

export default function NotesMeasure() {
  const { boutique } = useBoutique()
  const { stitchesBlouses } = useBlouse()
  const send = useSendMeasurements()
  if (!stitchesBlouses) return null

  return (
    <section id="measure" className="section">
      <div className="wrap">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-y-2 border-ink py-4">
          <h2 className="t-1">Fit notes</h2>
          <p className="text-muted">{boutique.brand.name}</p>
        </div>
        <p className="t-lead mt-8 max-w-[56ch] first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-[3.2em] first-letter:leading-[0.85] first-letter:text-primary-ink">
          A soft tape, a thin top and a mirror are all you need. Keep the tape snug but not tight, and write each number down as you go.
        </p>
        <dl className="mt-10 gap-12 md:columns-2 md:[column-rule:1px_solid_color-mix(in_oklab,var(--c-ink)_15%,transparent)]">
          {MEASURES.map((m) => (
            <div key={m.id} className="mb-6 break-inside-avoid">
              <dt className="font-semibold">{m.name}</dt>
              <dd className="mt-1 text-muted">{m.how}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 border-t border-ink/15 pt-8">
          <Button href={send()} variant="primary" icon={IconBrandWhatsapp}>
            Send my measurements
          </Button>
        </div>
      </div>
    </section>
  )
}
