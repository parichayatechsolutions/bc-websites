// src/sections/handwork/ZariHandwork.tsx
// Dark, the colours zari comes in (antique gold, bright gold, silver,
// copper, rose gold) as round swatches of fine threads, each with what it
// goes with; pick one to ask for it. (Lab: emb R, "Zari colours".)
//
// The colours are zari's own, so they're set directly; the notes are
// general. Shows only when their services list zari, maggam or zardosi
// work. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

const ZARI = [
  { name: 'Antique gold', hex: '#a07a3c', note: 'Muted and rich. Heirloom silks and temple jewellery.' },
  { name: 'Bright gold', hex: '#d6a838', note: 'Classic and festive. Reds, maroons and greens.' },
  { name: 'Silver', hex: '#b9bcc2', note: 'Cool and quiet. Pastels, blues and evening wear.' },
  { name: 'Copper', hex: '#b5643a', note: 'Warm and unusual. Mustards, olives and earth tones.' },
  { name: 'Rose gold', hex: '#c98b7f', note: 'Soft and modern. Blush, peach and ivory.' },
]

export default function ZariHandwork() {
  const { boutique } = useBoutique()
  const doesZari = boutique.services.groups.flatMap((g) => g.items).some((i) => /zari|maggam|zardosi|zardozi/i.test(i))
  const [index, setIndex] = useState(1)
  if (!doesZari) return null
  const zari = ZARI[index]

  return (
    <section id="handwork-zari" className="section bg-dark text-light">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">The colour of the zari</h2>
        <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-8 md:gap-x-10" role="group" aria-label="Zari colour">
          {ZARI.map((z, i) => (
            <li key={z.name}>
              <button type="button" onClick={() => setIndex(i)} aria-pressed={i === index} className="group flex w-20 cursor-pointer flex-col items-center gap-3 md:w-24">
                <span
                  aria-hidden="true"
                  className="block aspect-square w-full rounded-full ring-offset-4 ring-offset-dark transition-[box-shadow] duration-200 ease-stitch group-hover:ring-2 group-hover:ring-light/40 group-aria-pressed:ring-2 group-aria-pressed:ring-light"
                  style={{ backgroundColor: z.hex, backgroundImage: 'repeating-linear-gradient(35deg, rgba(255,255,255,0.22) 0 1px, transparent 1px 4px)' }}
                />
                <span className="t-small text-center group-aria-pressed:font-semibold">{z.name}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-light/15 pt-8" aria-live="polite">
          <div>
            <p className="t-3">{zari.name}</p>
            <p className="mt-1 max-w-[44ch] text-light/80">{zari.note}</p>
          </div>
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like ${zari.name.toLowerCase()} zari work. Could you tell me more?`)} icon={IconBrandWhatsapp}>
            Ask for {zari.name.toLowerCase()}
          </Button>
        </div>
      </div>
    </section>
  )
}
