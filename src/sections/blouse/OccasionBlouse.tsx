// src/sections/blouse/OccasionBlouse.tsx
// Start from the occasion: a wedding, a reception, a festival or the
// office sets a suggested neck, back and sleeves, drawn front and back;
// she can change any of them before sending. (Lab: blouse Q, "By
// occasion".)
//
// The suggestions are general styling, not the boutique's rules. Shows only
// for a boutique that stitches blouses. The drawing redraws with a CSS
// transition.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import Button from '../../components/Button'
import { BACKS, BlouseFlat, describe, NECKS, SLEEVES } from './blouseDrawing'
import { Choices, useBlouse } from './blouseShared'

const OCCASIONS = [
  { name: 'Wedding', neck: 'sweet', back: 'u', sleeve: 'elbow' },
  { name: 'Reception', neck: 'boat', back: 'vb', sleeve: 'cap' },
  { name: 'Festival', neck: 'round', back: 'win', sleeve: 'puff' },
  { name: 'Office', neck: 'high', back: 'sq', sleeve: 'three' },
]

export default function OccasionBlouse() {
  const { stitchesBlouses, priceLine, send } = useBlouse()
  const [occasion, setOccasion] = useState(OCCASIONS[0].name)
  const [neck, setNeck] = useState(OCCASIONS[0].neck)
  const [back, setBack] = useState(OCCASIONS[0].back)
  const [sleeve, setSleeve] = useState(OCCASIONS[0].sleeve)
  if (!stitchesBlouses) return null

  const pick = (o: (typeof OCCASIONS)[number]) => {
    setOccasion(o.name)
    setNeck(o.neck)
    setBack(o.back)
    setSleeve(o.sleeve)
  }
  const summary = describe(neck, back, sleeve)

  return (
    <section id="blouse" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[14ch] text-balance">A blouse for the occasion</h2>
        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Occasion">
          {OCCASIONS.map((o) => (
            <button
              key={o.name}
              type="button"
              onClick={() => pick(o)}
              aria-pressed={o.name === occasion}
              className="min-h-11 cursor-pointer rounded-full border border-ink/25 px-5 transition-[background-color,border-color,color,scale] duration-200 ease-stitch hover:border-ink active:scale-[0.97] aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
            >
              {o.name}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="grid grid-cols-2 gap-4 self-start bg-paper p-5 md:col-span-7 md:p-8">
            {[false, true].map((isBack) => (
              <figure key={String(isBack)}>
                <div className="aspect-[5/4]">
                  <BlouseFlat neck={isBack ? back : neck} sleeve={sleeve} back={isBack} />
                </div>
                <figcaption className="t-small mt-2 text-center text-muted">{isBack ? 'Back' : 'Front'}</figcaption>
              </figure>
            ))}
          </div>
          <div className="space-y-6 md:col-span-5">
            <p className="t-3" aria-live="polite">
              {summary.charAt(0).toUpperCase() + summary.slice(1)}.
            </p>
            <Choices label="Change the neck" options={NECKS} value={neck} onChange={setNeck} />
            <Choices label="Change the back" options={BACKS} value={back} onChange={setBack} />
            <Choices label="Change the sleeves" options={SLEEVES} value={sleeve} onChange={setSleeve} />
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
              <Button href={send(neck, back, sleeve)} variant="primary" icon={IconBrandWhatsapp}>
                Send this design
              </Button>
              {priceLine && <p className="t-small text-muted">{priceLine}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
