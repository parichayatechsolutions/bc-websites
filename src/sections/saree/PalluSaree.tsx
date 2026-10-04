// src/sections/saree/PalluSaree.tsx
// Finish the pallu: kuchu, fringe, lace or a plain hem as choices, and the
// drawing of a pallu end changes to show each, with a button to ask for
// it. (Lab: saree K, "Finish the pallu".)
//
// The finishes are drawn, not photographs. Shows only when their services
// list kuchu, tassels or pallu work. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

const LINE = { stroke: 'var(--c-primary-ink)' }
const GOLD = { stroke: 'var(--c-accent)', fill: 'var(--c-accent)' }

// Each finish drawn along the bottom edge of a 240 × 160 pallu, the edge at y = 110.
const FINISHES = [
  {
    name: 'Kuchu',
    note: 'Knotted or beaded tassels, hand-tied along the edge.',
    draw: Array.from({ length: 9 }, (_, i) => {
      const x = 16 + i * 26
      return (
        <g key={i}>
          <path d={`M ${x} 110 L ${x} 128`} strokeWidth={1.4} style={LINE} />
          <circle cx={x} cy={131} r={3.5} style={GOLD} />
          <path d={`M ${x - 4} 134 L ${x - 5} 150 M ${x} 134 L ${x} 152 M ${x + 4} 134 L ${x + 5} 150`} strokeWidth={1.2} style={LINE} />
        </g>
      )
    }),
  },
  {
    name: 'Fringe',
    note: 'The loose threads twisted into a fine fringe.',
    draw: Array.from({ length: 46 }, (_, i) => <path key={i} d={`M ${6 + i * 5} 110 L ${6 + i * 5} ${130 + (i % 3) * 2}`} strokeWidth={1} style={LINE} />),
  },
  {
    name: 'Lace',
    note: 'A scalloped lace border stitched along the end.',
    draw: [
      <path key="lace" d={`M 0 110 ${Array.from({ length: 12 }, (_, i) => `Q ${10 + i * 20} 134 ${20 + i * 20} 110`).join(' ')}`} strokeWidth={1.4} style={{ ...GOLD, fillOpacity: 0.35 }} />,
    ],
  },
  { name: 'Plain', note: 'A neat rolled hem. Quiet, and lets the weave speak.', draw: [<path key="hem" d="M 0 108 L 240 108" strokeWidth={3} style={LINE} />] },
]

export default function PalluSaree() {
  const { boutique } = useBoutique()
  const offers = boutique.services.groups.flatMap((g) => g.items).some((i) => /kuchu|tassel|pallu|fringe/i.test(i))
  const [index, setIndex] = useState(0)
  if (!offers) return null
  const finish = FINISHES[index]

  return (
    <section id="saree-pallu" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">Finish the pallu</h2>
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Pallu finish">
            {FINISHES.map((f, i) => (
              <button
                key={f.name}
                type="button"
                onClick={() => setIndex(i)}
                aria-pressed={i === index}
                className="min-h-11 cursor-pointer rounded-full border border-ink/25 px-5 transition-[background-color,border-color,color] duration-200 ease-stitch hover:border-ink aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
              >
                {f.name}
              </button>
            ))}
          </div>
          <p className="mt-6 text-muted" aria-live="polite">
            {finish.note}
          </p>
          <div className="mt-8">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like a ${finish.name.toLowerCase()} finish on my pallu.`)} variant="primary" icon={IconBrandWhatsapp}>
              Ask for {finish.name.toLowerCase()}
            </Button>
          </div>
        </div>
        <figure className="bg-paper p-6 md:col-span-7 md:p-10">
          <svg viewBox="0 0 240 160" aria-hidden="true" className="block w-full" fill="none">
            <rect x={0} y={0} width={240} height={110} style={{ fill: 'color-mix(in oklab, var(--c-primary) 75%, var(--c-dark))' }} />
            <path d="M 0 84 L 240 84 M 0 92 L 240 92" strokeWidth={3} style={{ stroke: 'var(--c-accent)' }} />
            <path d={Array.from({ length: 12 }, (_, i) => `M ${i * 22} 10 L ${i * 22 + 40} 70`).join(' ')} strokeWidth={1} opacity={0.35} style={{ stroke: 'var(--c-accent)' }} />
            {finish.draw}
          </svg>
          <figcaption className="t-small mt-4 text-center text-muted">The end of the pallu, {finish.name.toLowerCase()}</figcaption>
        </figure>
      </div>
    </section>
  )
}
