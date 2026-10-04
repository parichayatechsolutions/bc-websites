// src/sections/blouse/RoomBlouse.tsx
// The design room: dark, a large blouse drawing in the middle with a
// Front and Back switch, the neck choices on one side and the back and
// sleeves on the other. (Lab: blouse D, "Design room".)
//
// On a phone the drawing comes first and the choices follow. Picking a
// back turns the drawing round. Shows only for a boutique that stitches
// blouses. The drawing swaps with a CSS fade.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { BACKS, BlouseFlat, NECKS, SLEEVES, type IOption } from './blouseDrawing'
import { useBlouse } from './blouseShared'

function Options({ label, options, value, onChange }: { label: string; options: IOption[]; value: string; onChange: (id: string) => void }) {
  return (
    <div role="group" aria-label={label}>
      <p className="t-small text-light/70">{label}</p>
      <ul className="mt-2">
        {options.map((o) => (
          <li key={o.id}>
            <button
              type="button"
              onClick={() => onChange(o.id)}
              aria-pressed={o.id === value}
              className="flex min-h-11 w-full cursor-pointer items-center border-b border-light/10 text-left transition-colors duration-200 ease-stitch hover:text-accent-on-dark aria-pressed:font-semibold aria-pressed:text-accent-on-dark"
            >
              {o.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function RoomBlouse() {
  const { stitchesBlouses, priceLine, send } = useBlouse()
  const [neck, setNeck] = useState('round')
  const [back, setBack] = useState('u')
  const [sleeve, setSleeve] = useState('elbow')
  const [showBack, setShowBack] = useState(false)
  if (!stitchesBlouses) return null

  return (
    <section id="blouse" className="section bg-dark text-light">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">The design room</h2>
        <div className="mt-12 grid gap-10 md:grid-cols-[1fr_2fr_1fr] md:gap-12">
          <div className="order-2 md:order-1">
            <Options
              label="Neck"
              options={NECKS}
              value={neck}
              onChange={(id) => {
                setNeck(id)
                setShowBack(false)
              }}
            />
          </div>
          <div className="order-1 md:order-2">
            <div className="flex justify-center">
              <div className="inline-flex rounded-full border border-light/30 p-1" role="group" aria-label="Show">
                {['Front', 'Back'].map((side, i) => (
                  <button
                    key={side}
                    type="button"
                    onClick={() => setShowBack(i === 1)}
                    aria-pressed={showBack === (i === 1)}
                    className="min-h-11 cursor-pointer rounded-full px-6 transition-[background-color,color] duration-200 ease-stitch aria-pressed:bg-light aria-pressed:text-ink"
                  >
                    {side}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-6 aspect-[5/4] rounded-2xl bg-light p-6 md:p-10">
              <div key={String(showBack)} className="h-full animate-[fade-in_700ms_var(--ease-stitch)]">
                <BlouseFlat neck={showBack ? back : neck} sleeve={sleeve} back={showBack} />
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <a
                href={send(neck, back, sleeve)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-light px-7 font-semibold text-ink transition-[scale] duration-200 ease-stitch active:scale-[0.97]"
              >
                <IconBrandWhatsapp size={20} stroke={1.75} aria-hidden="true" />
                Send this design
              </a>
              {priceLine && <p className="t-small text-light/70">{priceLine}</p>}
            </div>
          </div>
          <div className="order-3 space-y-8">
            <Options
              label="Back"
              options={BACKS}
              value={back}
              onChange={(id) => {
                setBack(id)
                setShowBack(true)
              }}
            />
            <Options label="Sleeves" options={SLEEVES} value={sleeve} onChange={setSleeve} />
          </div>
        </div>
      </div>
    </section>
  )
}
