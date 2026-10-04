// src/sections/blouse/NecksBlouse.tsx
// Start with the neck: every neckline as a drawn card with a line on what
// it suits, then the back and sleeves underneath and a button to send the
// design. The neck sets the whole look, so it gets the room.
// (Lab: blouse C, "Neck gallery".)
//
// Needs no photographs. Shows only for a boutique that stitches blouses.
// No motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import Button from '../../components/Button'
import { BACKS, BlouseFlat, NECKS, SLEEVES } from './blouseDrawing'
import { Choices, useBlouse } from './blouseShared'

export default function NecksBlouse() {
  const { stitchesBlouses, priceLine, send } = useBlouse()
  const [neck, setNeck] = useState('round')
  const [back, setBack] = useState('u')
  const [sleeve, setSleeve] = useState('cap')
  if (!stitchesBlouses) return null

  return (
    <section id="blouse" className="section">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="t-1 max-w-[12ch] text-balance">Start with the neck</h2>
          <p className="max-w-[36ch] text-muted">The neck sets the whole look. Choose one, then the back and sleeves.</p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3" role="group" aria-label="Neck">
          {NECKS.map((n) => (
            <li key={n.id}>
              <button
                type="button"
                onClick={() => setNeck(n.id)}
                aria-pressed={n.id === neck}
                className="flex h-full w-full cursor-pointer flex-col border border-ink/15 bg-paper p-4 text-left transition-colors duration-200 ease-stitch hover:border-ink aria-pressed:border-primary-ink aria-pressed:outline-2 aria-pressed:outline-primary-ink md:p-6"
              >
                <span className="block aspect-[5/4] w-full">
                  <BlouseFlat neck={n.id} sleeve={sleeve} />
                </span>
                <span className="t-3 mt-4">{n.name}</span>
                <span className="t-small mt-1 text-muted">{n.note}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <Choices label="Back" options={BACKS} value={back} onChange={setBack} />
          <Choices label="Sleeves" options={SLEEVES} value={sleeve} onChange={setSleeve} />
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ink/15 pt-8">
          <Button href={send(neck, back, sleeve)} variant="primary" icon={IconBrandWhatsapp}>
            Send this design
          </Button>
          {priceLine && <p className="t-small text-muted">{priceLine}</p>}
        </div>
      </div>
    </section>
  )
}
