// src/sections/men/PairMen.tsx
// Kurta and jacket: pick a colour for each and a simple drawing shows the
// pair together, then the button asks for that combination.
// (Lab: men S, "Kurta and jacket".)
//
// The colours are the cloth's, so they're set directly. Shows only when
// their Men group lists kurtas and a jacket (Nehru, bandhgala, waistcoat).
// The drawing recolours with a CSS transition.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

const COLOURS = [
  { name: 'Ivory', hex: '#efe6d2' },
  { name: 'Beige', hex: '#cdb894' },
  { name: 'Maroon', hex: '#6e1423' },
  { name: 'Bottle green', hex: '#1f4d3a' },
  { name: 'Navy', hex: '#1f2b4d' },
  { name: 'Mustard', hex: '#c9952c' },
  { name: 'Black', hex: '#1d1b1a' },
]

function Swatches({ label, value, onChange }: { label: string; value: number; onChange: (i: number) => void }) {
  return (
    <div role="group" aria-label={label}>
      <p className="t-small text-muted">{label}</p>
      <div className="mt-3 flex flex-wrap gap-3">
        {COLOURS.map((c, i) => (
          <button
            key={c.name}
            type="button"
            onClick={() => onChange(i)}
            aria-pressed={i === value}
            aria-label={c.name}
            title={c.name}
            className="h-11 w-11 cursor-pointer rounded-full ring-1 ring-ink/20 ring-offset-2 ring-offset-light transition-[box-shadow] duration-200 ease-stitch hover:ring-ink aria-pressed:ring-2 aria-pressed:ring-ink"
            style={{ backgroundColor: c.hex }}
          />
        ))}
      </div>
    </div>
  )
}

export default function PairMen() {
  const { boutique } = useBoutique()
  const items = boutique.services.groups.find((g) => /^men/i.test(g.title))?.items ?? []
  const [kurta, setKurta] = useState(0)
  const [jacket, setJacket] = useState(2)
  if (!items.some((i) => /kurta/i.test(i)) || !items.some((i) => /jacket|nehru|bandh|waistcoat|jodhpuri/i.test(i))) return null
  const k = COLOURS[kurta]
  const j = COLOURS[jacket]

  return (
    <section id="men-pair" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="space-y-6 md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">Kurta and jacket</h2>
          <Swatches label="Kurta" value={kurta} onChange={setKurta} />
          <Swatches label="Jacket" value={jacket} onChange={setJacket} />
          <p aria-live="polite">
            A {k.name.toLowerCase()} kurta with a {j.name.toLowerCase()} jacket.
          </p>
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like a ${k.name.toLowerCase()} kurta with a ${j.name.toLowerCase()} jacket.`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask for this pair
          </Button>
        </div>
        <figure className="bg-paper p-6 md:col-span-7 md:p-10">
          <svg viewBox="0 0 200 220" aria-hidden="true" className="mx-auto block w-full max-w-xs" strokeWidth={1.5} strokeLinejoin="round" style={{ stroke: 'var(--c-ink)' }}>
            <path d="M 78 16 Q 100 26 122 16 L 150 28 L 176 96 L 160 102 L 146 66 L 150 206 L 50 206 L 54 66 L 40 102 L 24 96 L 50 28 Z" className="transition-[fill] duration-300 ease-stitch" style={{ fill: k.hex }} />
            <path d="M 66 22 L 92 30 L 100 110 L 100 170 L 60 170 L 56 66 Z M 134 22 L 108 30 L 100 110 L 100 170 L 140 170 L 144 66 Z" className="transition-[fill] duration-300 ease-stitch" style={{ fill: j.hex }} />
            <path d="M 88 12 L 112 12 L 112 22 L 88 22 Z" style={{ fill: j.hex }} />
            {[80, 100, 120, 140].map((y) => (
              <circle key={y} cx={104} cy={y} r={2.2} style={{ fill: 'var(--c-accent)', stroke: 'none' }} />
            ))}
          </svg>
        </figure>
      </div>
    </section>
  )
}
