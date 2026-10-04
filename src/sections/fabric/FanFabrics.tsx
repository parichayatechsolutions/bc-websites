// src/sections/fabric/FanFabrics.tsx
// Their fabrics fanned out like a shade card; tapping a swatch lifts it to
// the front and shows its name and what it's best for beside the fan.
// (Lab: fabric C, "Swatch fan".)
//
// From `fabrics`; up to seven in the fan. Hides without any. The swatches
// move with a CSS transition that reduced motion turns off.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'

export default function FanFabrics() {
  const { boutique } = useBoutique()
  const fabrics = (boutique.fabrics ?? []).slice(0, 7)
  const [active, setActive] = useState(0)
  if (!fabrics.length) return null
  const fabric = fabrics[active] ?? fabrics[0]
  const mid = (fabrics.length - 1) / 2

  return (
    <section id="fabrics" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <ul className="relative mx-auto h-80 w-full max-w-md md:h-96" role="group" aria-label="Fabrics">
            {fabrics.map((f, i) => {
              const on = i === active
              return (
                <li
                  key={f.name}
                  className="absolute bottom-0 left-1/2 w-32 origin-bottom transition-transform duration-300 ease-stitch md:w-40"
                  style={{ transform: `translateX(-50%) rotate(${on ? 0 : (i - mid) * 9}deg) translateY(${on ? -16 : 0}px)`, zIndex: on ? 20 : i }}
                >
                  <button type="button" onClick={() => setActive(i)} aria-pressed={on} aria-label={f.name} className="block w-full cursor-pointer border-4 border-light bg-paper">
                    <span className="block aspect-[2/3] overflow-hidden">
                      <Media file={f.photo} alt="" />
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="md:col-span-5" aria-live="polite">
          <h2 className="t-1 max-w-[10ch] text-balance">Our fabrics</h2>
          <p className="t-2 mt-8 text-primary-ink">{fabric.name}</p>
          {fabric.bestFor && <p className="mt-2 text-muted">Best for {fabric.bestFor}</p>}
          <p className="t-small mt-6 text-muted">Tap a swatch to see it.</p>
          <div className="mt-8">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to ask about your ${fabric.name}.`)} variant="primary" icon={IconBrandWhatsapp}>
              Ask about this fabric
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
