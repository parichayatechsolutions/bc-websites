// src/sections/saree/MapSaree.tsx
// A saree drawn laid out flat (body, border, pallu and blouse piece); tap
// a part and the services they do for it show beside, each a link to ask.
// (Lab: saree Z, "Saree map".)
//
// A part appears only when one of their services is for it; needs two.
// The parts light with a CSS transition.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'

const PARTS = [
  { id: 'body', name: 'Body', match: /pleat|drap|polish|iron|\bpress/i, d: 'M 10 10 L 290 10 L 290 98 L 10 98 Z' },
  { id: 'border', name: 'Border', match: /fall|pico|border|lace/i, d: 'M 10 98 L 290 98 L 290 116 L 10 116 Z' },
  { id: 'pallu', name: 'Pallu', match: /kuchu|tassel|fringe|pallu/i, d: 'M 290 10 L 390 10 L 390 116 L 290 116 Z' },
  { id: 'blouse', name: 'Blouse piece', match: /blouse/i, d: 'M 10 126 L 110 126 L 110 156 L 10 156 Z' },
]

export default function MapSaree() {
  const { boutique } = useBoutique()
  const items = [...new Set(boutique.services.groups.flatMap((g) => g.items))]
  const parts = PARTS.map((p) => ({ ...p, services: items.filter((i) => p.match.test(i)) })).filter((p) => p.services.length)
  const [index, setIndex] = useState(0)
  if (parts.length < 2) return null
  const part = parts[index] ?? parts[0]
  const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1)

  return (
    <section id="saree-map" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <svg viewBox="0 0 400 166" aria-hidden="true" className="block w-full">
            {PARTS.map((p) => {
              const on = p.id === part.id
              const has = parts.some((x) => x.id === p.id)
              return (
                <path
                  key={p.id}
                  d={p.d}
                  strokeWidth={1.5}
                  className="transition-[fill] duration-300 ease-stitch"
                  style={{
                    stroke: 'var(--c-primary-ink)',
                    fill: on ? 'var(--c-accent)' : has ? 'color-mix(in oklab, var(--c-primary) 18%, var(--c-light))' : 'var(--c-paper)',
                  }}
                />
              )
            })}
          </svg>
          <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Part of the saree">
            {parts.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-pressed={i === index}
                className="min-h-11 cursor-pointer rounded-full border border-ink/25 px-5 transition-[background-color,border-color,color] duration-200 ease-stitch hover:border-ink aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
        <div className="md:col-span-5" aria-live="polite">
          <h2 className="t-1 max-w-[10ch] text-balance">Every part of your saree</h2>
          <p className="t-3 mt-8 text-primary-ink">{part.name}</p>
          <ul className="mt-3 border-t border-ink/15">
            {part.services.map((s) => (
              <li key={s} className="border-b border-ink/15">
                <a
                  href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I need ${lower(s)} for my saree.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-14 items-center justify-between gap-4 py-3"
                >
                  <span className="link-stitch">{s}</span>
                  <IconBrandWhatsapp size={18} stroke={1.75} aria-hidden="true" className="shrink-0 text-primary-ink" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
