// src/sections/blouse/MedallionBlouse.tsx
// On the brand colour between two zari borders, every neckline drawn in a
// gold-ringed round medallion; tapping one picks it and shows what it
// suits, with a button to ask. (Lab: blouse I, "Neck medallions".)
//
// The notes are styling guidance, true of the cut. Shows only for a
// boutique that stitches blouses. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { BlouseFlat, NECKS } from './blouseDrawing'
import { useBlouse } from './blouseShared'

export default function MedallionBlouse() {
  const { boutique } = useBoutique()
  const { stitchesBlouses } = useBlouse()
  const [index, setIndex] = useState(0)
  if (!stitchesBlouses) return null
  const neck = NECKS[index]

  return (
    <section id="blouse" className="bg-primary text-on-primary">
      <div className="zari" aria-hidden="true" />
      <div className="section">
        <div className="wrap">
          <h2 className="t-1 max-w-[12ch] text-balance">Choose your neckline</h2>
          <ul className="mt-12 grid grid-cols-3 gap-4 md:grid-cols-6" role="group" aria-label="Neckline">
            {NECKS.map((n, i) => (
              <li key={n.id}>
                <button type="button" onClick={() => setIndex(i)} aria-pressed={i === index} className="group flex w-full cursor-pointer flex-col items-center gap-3">
                  <span className="grid aspect-square w-full place-items-center rounded-full border-2 border-accent/60 bg-light p-[14%] transition-[border-color,scale] duration-200 ease-stitch group-hover:border-accent group-aria-pressed:scale-105 group-aria-pressed:border-accent group-aria-pressed:border-4">
                    <span className="block aspect-[5/4] w-full">
                      <BlouseFlat neck={n.id} sleeve="none" />
                    </span>
                  </span>
                  <span className="t-small group-aria-pressed:font-semibold">{n.name}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-on-primary/25 pt-8" aria-live="polite">
            <div>
              <p className="t-3">{neck.name}</p>
              <p className="mt-1 opacity-85">{neck.note}</p>
            </div>
            <a
              href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like a blouse with ${neck.phrase}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-light px-7 font-semibold text-ink transition-[scale] duration-200 ease-stitch active:scale-[0.97]"
            >
              <IconBrandWhatsapp size={20} stroke={1.75} aria-hidden="true" />
              Ask for this neck
            </a>
          </div>
        </div>
      </div>
      <div className="zari" aria-hidden="true" />
    </section>
  )
}
