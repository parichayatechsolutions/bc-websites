// src/sections/blouse/ArchBlouse.tsx
// Every neckline drawn inside its own temple arch; tapping one picks it
// and shows what it suits beneath the row, with a button to ask for it.
// The arch family's blouse picker. (Lab: blouse K, "Neck arches".)
//
// The notes are styling guidance, true of the cut. Shows only for a
// boutique that stitches blouses. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { BlouseFlat, NECKS } from './blouseDrawing'
import { useBlouse } from './blouseShared'

export default function ArchBlouse() {
  const { boutique } = useBoutique()
  const { stitchesBlouses, priceLine } = useBlouse()
  const [index, setIndex] = useState(0)
  if (!stitchesBlouses) return null
  const neck = NECKS[index]

  return (
    <section id="blouse" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Choose your neckline</h2>
        <ul className="mt-12 grid grid-cols-3 gap-3 md:grid-cols-6" role="group" aria-label="Neckline">
          {NECKS.map((n, i) => (
            <li key={n.id}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-pressed={i === index}
                className="group flex w-full cursor-pointer flex-col items-center"
              >
                <span className="arch flex aspect-[2/3] w-full items-center border-2 border-accent/50 bg-paper px-2 transition-[border-color,background-color] duration-200 ease-stitch group-hover:border-accent group-aria-pressed:border-primary-ink group-aria-pressed:bg-light">
                  <span className="block aspect-[5/4] w-full">
                    <BlouseFlat neck={n.id} sleeve="cap" />
                  </span>
                </span>
                <span className="mt-3 group-aria-pressed:font-semibold group-aria-pressed:text-primary-ink">{n.name}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-ink/15 pt-8" aria-live="polite">
          <div>
            <p className="t-3">{neck.name}</p>
            <p className="mt-1 text-muted">{neck.note}</p>
            {priceLine && <p className="t-small mt-2 text-muted">{priceLine}</p>}
          </div>
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like a blouse with ${neck.phrase}.`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask for this neck
          </Button>
        </div>
      </div>
    </section>
  )
}
