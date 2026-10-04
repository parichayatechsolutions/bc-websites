// src/sections/blouse/SketchBlouse.tsx
// A tailor's sketchbook: graph paper with the blouse drawn front and back
// at slight angles, and notes written beside it in the display face,
// changing as she picks the neck, back and sleeves above.
// (Lab: blouse L, "Sketchbook".)
//
// The notes are the cuts' own guidance. Shows only for a boutique that
// stitches blouses. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import Button from '../../components/Button'
import { BACKS, BlouseFlat, NECKS, SLEEVES } from './blouseDrawing'
import { Choices, useBlouse } from './blouseShared'

const GRAPH = {
  backgroundColor: 'var(--c-light)',
  backgroundImage:
    'linear-gradient(color-mix(in oklab, var(--c-thread) 18%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--c-thread) 18%, transparent) 1px, transparent 1px)',
  backgroundSize: '20px 20px',
}

export default function SketchBlouse() {
  const { stitchesBlouses, send } = useBlouse()
  const [neck, setNeck] = useState('round')
  const [back, setBack] = useState('u')
  const [sleeve, setSleeve] = useState('elbow')
  if (!stitchesBlouses) return null
  const note = (list: typeof NECKS, id: string) => list.find((o) => o.id === id)!

  return (
    <section id="blouse" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Sketch your blouse</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Choices label="Neck" options={NECKS} value={neck} onChange={setNeck} />
          <Choices label="Back" options={BACKS} value={back} onChange={setBack} />
          <Choices label="Sleeves" options={SLEEVES} value={sleeve} onChange={setSleeve} />
        </div>
        <div className="mt-10 grid gap-6 rounded-2xl border border-ink/15 p-6 md:grid-cols-12 md:p-10" style={GRAPH}>
          <div className="grid grid-cols-2 gap-6 md:col-span-7">
            <div className="aspect-[5/4] -rotate-3">
              <BlouseFlat neck={neck} sleeve={sleeve} />
            </div>
            <div className="mt-8 aspect-[5/4] rotate-2">
              <BlouseFlat neck={back} sleeve={sleeve} back />
            </div>
          </div>
          <ul className="space-y-3 font-display text-lg leading-snug text-primary-ink italic md:col-span-5" aria-live="polite">
            {[note(NECKS, neck), note(BACKS, back), note(SLEEVES, sleeve)].map((o) => (
              <li key={o.id}>
                — {o.name}: {o.note.charAt(0).toLowerCase() + o.note.slice(1)}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8">
          <Button href={send(neck, back, sleeve)} variant="primary" icon={IconBrandWhatsapp}>
            Send this sketch
          </Button>
        </div>
      </div>
    </section>
  )
}
