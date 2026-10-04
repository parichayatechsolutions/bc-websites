// src/sections/blouse/BuilderBlouse.tsx
// Design a blouse in three choices: neck, back and sleeves, with the front
// and back drawn live beside them as a tailor would sketch them. One button
// sends the design on WhatsApp in words. (Lab: blouse A, "Builder".)
//
// Needs no photographs. Shows only for a boutique that stitches blouses;
// the starting price line only with permission. The drawing redraws with a
// CSS transition; no scroll motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import Button from '../../components/Button'
import { BACKS, BlouseFlat, describe, NECKS, SLEEVES } from './blouseDrawing'
import { Choices, useBlouse } from './blouseShared'

export default function BuilderBlouse() {
  const { stitchesBlouses, priceLine, send } = useBlouse()
  const [neck, setNeck] = useState('round')
  const [back, setBack] = useState('u')
  const [sleeve, setSleeve] = useState('elbow')
  if (!stitchesBlouses) return null

  const summary = describe(neck, back, sleeve)

  return (
    <section id="blouse" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[12ch] text-balance">Design your blouse</h2>
          <p className="mt-5 max-w-[36ch] text-muted">Pick a neck, a back and sleeves, then send the design to us on WhatsApp.</p>
          <div className="mt-10 space-y-8">
            <Choices label="Neck" options={NECKS} value={neck} onChange={setNeck} />
            <Choices label="Back" options={BACKS} value={back} onChange={setBack} />
            <Choices label="Sleeves" options={SLEEVES} value={sleeve} onChange={setSleeve} />
          </div>
        </div>

        <div className="md:col-span-7">
          <div className="grid grid-cols-2 gap-4 bg-paper p-5 md:gap-8 md:p-8">
            {[false, true].map((isBack) => (
              <figure key={String(isBack)}>
                <div className="aspect-[5/4]">
                  <BlouseFlat neck={isBack ? back : neck} sleeve={sleeve} back={isBack} />
                </div>
                <figcaption className="t-small mt-2 text-center text-muted">{isBack ? 'Back' : 'Front'}</figcaption>
              </figure>
            ))}
          </div>
          <p className="t-3 mt-6" aria-live="polite">
            {summary.charAt(0).toUpperCase() + summary.slice(1)}.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button href={send(neck, back, sleeve)} variant="primary" icon={IconBrandWhatsapp}>
              Send this design
            </Button>
            {priceLine && <p className="t-small text-muted">{priceLine}</p>}
          </div>
        </div>
      </div>
    </section>
  )
}
