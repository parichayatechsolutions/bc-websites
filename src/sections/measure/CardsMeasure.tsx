// src/sections/measure/CardsMeasure.tsx
// A card for every measurement, each with its drawing and name; tapping a
// card turns it over to show how to take it. All ten at a glance.
// (Lab: measure G, "Cards", turning by swapping faces, not in 3D.)
//
// Shows only for a boutique that stitches blouses. The faces swap with a
// CSS fade.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import Button from '../../components/Button'
import { useBlouse } from '../blouse/blouseShared'
import { MEASURES, TapeDrawing, useSendMeasurements } from './measureShared'

export default function CardsMeasure() {
  const { stitchesBlouses } = useBlouse()
  const send = useSendMeasurements()
  const [open, setOpen] = useState<string>()
  if (!stitchesBlouses) return null

  return (
    <section id="measure" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Ten measurements</h2>
        <p className="mt-4 text-muted">Tap a card to see how to take it.</p>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {MEASURES.map((m) => {
            const turned = open === m.id
            return (
              <li key={m.id}>
                <button
                  type="button"
                  onClick={() => setOpen(turned ? undefined : m.id)}
                  aria-expanded={turned}
                  className="flex aspect-[3/4] w-full cursor-pointer flex-col rounded-2xl border border-ink/15 p-4 text-left transition-[border-color,background-color] duration-200 ease-stitch hover:border-ink aria-expanded:border-primary-ink aria-expanded:bg-paper"
                >
                  <span className="font-semibold">{m.name}</span>
                  {turned ? (
                    <span className="t-small mt-3 animate-[fade-in_700ms_var(--ease-stitch)] text-muted">{m.how}</span>
                  ) : (
                    <span className="mt-auto block aspect-[5/4] w-full">
                      <TapeDrawing measure={m} />
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
        <div className="mt-10">
          <Button href={send()} variant="primary" icon={IconBrandWhatsapp}>
            Send my measurements
          </Button>
        </div>
      </div>
    </section>
  )
}
