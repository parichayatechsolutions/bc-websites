// src/sections/men/SuitingMen.tsx
// Suiting cloths as swatches: plain, pinstripe, herringbone, check, linen
// and silk dupion, each drawn as its weave pattern with what it suits;
// pick one to ask about it. (Lab: men L, "Suiting swatches".)
//
// The patterns are drawn, not photographs of their stock, and the notes
// are general. Shows only when their Men group lists suits, blazers,
// sherwanis or similar. No motion.

import { useState, type CSSProperties } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

const INK = 'color-mix(in oklab, var(--c-light) 55%, transparent)'
const CLOTHS: { name: string; note: string; style: CSSProperties }[] = [
  { name: 'Plain', note: 'Goes anywhere; the safest first suit.', style: { backgroundColor: 'var(--c-dark)' } },
  { name: 'Pinstripe', note: 'Fine vertical lines that lengthen. Formal and sharp.', style: { backgroundColor: 'var(--c-dark)', backgroundImage: `repeating-linear-gradient(90deg, ${INK} 0 1px, transparent 1px 14px)` } },
  { name: 'Herringbone', note: 'A broken zigzag weave with texture. Winter and evenings.', style: { backgroundColor: 'var(--c-dark)', backgroundImage: `repeating-linear-gradient(45deg, ${INK} 0 1px, transparent 1px 7px), repeating-linear-gradient(-45deg, ${INK} 0 1px, transparent 1px 7px)`, backgroundSize: '14px 100%', backgroundPosition: '0 0, 7px 0' } },
  { name: 'Check', note: 'Windowpane or glen check. Smart with a relaxed edge.', style: { backgroundColor: 'var(--c-dark)', backgroundImage: `repeating-linear-gradient(0deg, ${INK} 0 1px, transparent 1px 22px), repeating-linear-gradient(90deg, ${INK} 0 1px, transparent 1px 22px)` } },
  { name: 'Linen', note: 'Light and breathable; creases, and that’s the charm. Summer.', style: { backgroundColor: '#d8ccb4', backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.07) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(0,0,0,0.05) 0 1px, transparent 1px 4px)' } },
  { name: 'Silk dupion', note: 'A crisp slubbed sheen. Sherwanis and wedding jackets.', style: { backgroundColor: 'var(--c-primary)', backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.12) 0 2px, transparent 2px 9px, rgba(0,0,0,0.08) 9px 10px, transparent 10px 17px)' } },
]

export default function SuitingMen() {
  const { boutique } = useBoutique()
  const items = boutique.services.groups.find((g) => /^men/i.test(g.title))?.items ?? []
  const [index, setIndex] = useState(0)
  if (!items.some((i) => /suit|blazer|sherwani|jodhpuri|bandh|waistcoat|jacket/i.test(i))) return null
  const cloth = CLOTHS[index]

  return (
    <section id="men-suiting" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Pick the cloth</h2>
        <ul className="mt-12 grid grid-cols-3 gap-3 md:grid-cols-6" role="group" aria-label="Suiting">
          {CLOTHS.map((c, i) => (
            <li key={c.name}>
              <button type="button" onClick={() => setIndex(i)} aria-pressed={i === index} className="group w-full cursor-pointer">
                <span
                  aria-hidden="true"
                  className="block aspect-square w-full ring-offset-2 ring-offset-light transition-[box-shadow] duration-200 ease-stitch group-hover:ring-2 group-hover:ring-ink/30 group-aria-pressed:ring-2 group-aria-pressed:ring-primary-ink"
                  style={c.style}
                />
                <span className="t-small mt-2 block text-center group-aria-pressed:font-semibold group-aria-pressed:text-primary-ink">{c.name}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-ink/15 pt-8" aria-live="polite">
          <div>
            <p className="t-3">{cloth.name}</p>
            <p className="mt-1 max-w-[48ch] text-muted">{cloth.note}</p>
          </div>
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like a suit in ${cloth.name.toLowerCase()}. Do you have it?`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask about {cloth.name.toLowerCase()}
          </Button>
        </div>
      </div>
    </section>
  )
}
