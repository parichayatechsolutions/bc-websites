// src/sections/saree/FallSaree.tsx
// Matching a fall: tap the colour of her saree and the drawing shows the
// fall stitched along the inside of the hem in a matching shade, then a
// button to ask for it. (Lab: saree D, "Fall matching".)
//
// The colours are the saree's, not the brand's, so they're set directly.
// Shows only when their services list a fall. The colours change with a
// CSS transition.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

const COLOURS = [
  { name: 'Red', hex: '#b3202a' },
  { name: 'Maroon', hex: '#6e1423' },
  { name: 'Pink', hex: '#d9507a' },
  { name: 'Orange', hex: '#e07a1f' },
  { name: 'Yellow', hex: '#e8b923' },
  { name: 'Green', hex: '#2f7d4a' },
  { name: 'Blue', hex: '#244e9c' },
  { name: 'Purple', hex: '#5d2e8c' },
  { name: 'Cream', hex: '#efe3c8' },
  { name: 'Black', hex: '#1d1b1a' },
]

export default function FallSaree() {
  const { boutique } = useBoutique()
  const offersFall = boutique.services.groups.flatMap((g) => g.items).some((i) => /\bfall/i.test(i))
  const [index, setIndex] = useState(0)
  if (!offersFall) return null
  const colour = COLOURS[index]
  const fall = `color-mix(in oklab, ${colour.hex} 82%, ${colour.name === 'Black' ? 'white' : 'black'})`

  return (
    <section id="saree-fall" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">A fall to match</h2>
          <p className="mt-5 max-w-[34ch] text-muted">A fall is a strip stitched inside the hem; it gives the saree weight and takes the wear. Pick your saree’s colour.</p>
          <div className="mt-8 flex flex-wrap gap-3" role="group" aria-label="Saree colour">
            {COLOURS.map((c, i) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setIndex(i)}
                aria-pressed={i === index}
                aria-label={c.name}
                title={c.name}
                className="h-11 w-11 cursor-pointer rounded-full ring-1 ring-ink/20 ring-offset-2 ring-offset-light transition-[box-shadow] duration-200 ease-stitch hover:ring-ink aria-pressed:ring-2 aria-pressed:ring-ink"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
          <div className="mt-10">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I need a fall stitched on my ${colour.name.toLowerCase()} saree.`)} variant="primary" icon={IconBrandWhatsapp}>
              Ask for a {colour.name.toLowerCase()} fall
            </Button>
          </div>
        </div>
        <figure className="bg-paper p-6 md:col-span-7 md:p-10">
          <svg viewBox="0 0 300 180" aria-hidden="true" className="block w-full">
            <path d="M 10 10 L 290 10 L 290 150 Q 150 162 10 150 Z" className="transition-[fill] duration-300 ease-stitch" style={{ fill: colour.hex }} />
            <path d="M 10 128 Q 150 140 290 128 L 290 150 Q 150 162 10 150 Z" className="transition-[fill] duration-300 ease-stitch" style={{ fill: fall }} />
            <path d="M 10 128 Q 150 140 290 128" fill="none" strokeWidth={1.2} strokeDasharray="4 3" style={{ stroke: 'color-mix(in oklab, white 70%, transparent)' }} />
          </svg>
          <figcaption className="t-small mt-4 text-center text-muted">The inside of the hem, with the fall along it</figcaption>
        </figure>
      </div>
    </section>
  )
}
