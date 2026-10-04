// src/sections/blouse/TurnBlouse.tsx
// One large blouse drawing with a Front and Back switch to turn it, and
// the choices for neck, back and sleeves beside it. The big drawing makes
// the details easy to see. (Lab: blouse H, "Front / back".)
//
// Picking a back turns the drawing round to show it. Shows only for a
// boutique that stitches blouses. The drawing swaps with a CSS fade
// rather than a 3D turn (DESIGN.md: no 3D).

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import Button from '../../components/Button'
import { BACKS, BlouseFlat, NECKS, SLEEVES } from './blouseDrawing'
import { Choices, useBlouse } from './blouseShared'

const SIDES = ['Front', 'Back'] as const

export default function TurnBlouse() {
  const { stitchesBlouses, priceLine, send } = useBlouse()
  const [neck, setNeck] = useState('round')
  const [back, setBack] = useState('u')
  const [sleeve, setSleeve] = useState('elbow')
  const [showBack, setShowBack] = useState(false)
  if (!stitchesBlouses) return null

  return (
    <section id="blouse" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <div className="flex justify-center">
            <div className="inline-flex rounded-full border border-ink/25 p-1" role="group" aria-label="Show">
              {SIDES.map((side, i) => (
                <button
                  key={side}
                  type="button"
                  onClick={() => setShowBack(i === 1)}
                  aria-pressed={showBack === (i === 1)}
                  className="min-h-11 cursor-pointer rounded-full px-6 transition-[background-color,color] duration-200 ease-stitch aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
                >
                  {side}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 aspect-[5/4] bg-paper p-6 md:p-12">
            <div key={String(showBack)} className="h-full animate-[fade-in_700ms_var(--ease-stitch)]">
              <BlouseFlat neck={showBack ? back : neck} sleeve={sleeve} back={showBack} />
            </div>
          </div>
        </div>
        <div className="space-y-6 md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">Design your blouse</h2>
          <Choices
            label="Neck"
            options={NECKS}
            value={neck}
            onChange={(id) => {
              setNeck(id)
              setShowBack(false)
            }}
          />
          <Choices
            label="Back"
            options={BACKS}
            value={back}
            onChange={(id) => {
              setBack(id)
              setShowBack(true)
            }}
          />
          <Choices label="Sleeves" options={SLEEVES} value={sleeve} onChange={setSleeve} />
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
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
