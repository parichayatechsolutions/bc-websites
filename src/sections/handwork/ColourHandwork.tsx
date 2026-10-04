// src/sections/handwork/ColourHandwork.tsx
// Colour match: pick the colour of her fabric and see thread colours that
// usually work on it, as swatches, with a button to ask.
// (Lab: emb Z, "Colour match".)
//
// The pairings are general colour guidance, set directly since they're
// the cloth's colours. Needs a handwork item in their services. The
// suggestions swap with a CSS fade.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

const HANDWORK = /aari|maggam|zardosi|zardozi|mirror|bead|stone|embroider|kantha|chikan/i

const FABRICS = [
  { name: 'Red', hex: '#b3202a', threads: [['Gold', '#d6a838'], ['Antique gold', '#a07a3c'], ['Green', '#2f7d4a']] },
  { name: 'Maroon', hex: '#6e1423', threads: [['Gold', '#d6a838'], ['Copper', '#b5643a'], ['Pink', '#e58fb0']] },
  { name: 'Green', hex: '#2f7d4a', threads: [['Gold', '#d6a838'], ['Pink', '#d9507a'], ['Orange', '#e07a1f']] },
  { name: 'Blue', hex: '#244e9c', threads: [['Silver', '#b9bcc2'], ['Gold', '#d6a838'], ['Pink', '#e58fb0']] },
  { name: 'Pink', hex: '#e58fb0', threads: [['Silver', '#b9bcc2'], ['Rose gold', '#c98b7f'], ['Green', '#2f7d4a']] },
  { name: 'Cream', hex: '#efe3c8', threads: [['Gold', '#d6a838'], ['Maroon', '#6e1423'], ['Pastel green', '#9fc8a0']] },
  { name: 'Black', hex: '#1d1b1a', threads: [['Gold', '#d6a838'], ['Silver', '#b9bcc2'], ['Red', '#b3202a']] },
]

export default function ColourHandwork() {
  const { boutique } = useBoutique()
  const doesHandwork = boutique.services.groups.flatMap((g) => g.items).some((i) => HANDWORK.test(i))
  const [index, setIndex] = useState(0)
  if (!doesHandwork) return null
  const fabric = FABRICS[index]

  return (
    <section id="handwork-colour" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[12ch] text-balance">Thread to match</h2>
        <p className="t-3 mt-8">Your fabric</p>
        <div className="mt-3 flex flex-wrap gap-3" role="group" aria-label="Fabric colour">
          {FABRICS.map((f, i) => (
            <button
              key={f.name}
              type="button"
              onClick={() => setIndex(i)}
              aria-pressed={i === index}
              aria-label={f.name}
              title={f.name}
              className="h-12 w-12 cursor-pointer rounded-full ring-1 ring-ink/20 ring-offset-2 ring-offset-light transition-[box-shadow] duration-200 ease-stitch hover:ring-ink aria-pressed:ring-2 aria-pressed:ring-ink"
              style={{ backgroundColor: f.hex }}
            />
          ))}
        </div>
        <div key={index} className="mt-10 animate-[fade-in_700ms_var(--ease-stitch)] rounded-2xl p-6 md:p-10" style={{ backgroundColor: fabric.hex }} aria-live="polite">
          <ul className="grid grid-cols-3 gap-3">
            {fabric.threads.map(([name, hex]) => (
              <li key={name} className="rounded-2xl bg-light p-4 text-center text-ink">
                <span aria-hidden="true" className="mx-auto block h-12 w-12 rounded-full" style={{ backgroundColor: hex, backgroundImage: 'repeating-linear-gradient(35deg, rgba(255,255,255,0.22) 0 1px, transparent 1px 4px)' }} />
                <span className="t-small mt-2 block font-semibold">{name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I have a ${fabric.name.toLowerCase()} fabric. Which thread colours would you suggest for the handwork?`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask what would suit
          </Button>
        </div>
      </div>
    </section>
  )
}
