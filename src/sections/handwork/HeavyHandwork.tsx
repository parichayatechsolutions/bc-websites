// src/sections/handwork/HeavyHandwork.tsx
// How heavy? Dark, a segmented control from light to bridal; the drawn
// texture beside it gets denser at each step, with a line on where each
// weight of work suits. (Lab: emb J, "How heavy?".)
//
// The texture is a drawing of the idea, not their work. Needs a handwork
// item in their services. The texture swaps with a CSS fade.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { STITCHES, Texture } from './stitchTextures'

const LEVELS = [
  { name: 'Light', size: 44, note: 'A few motifs on the neckline or sleeves. Everyday and office wear.' },
  { name: 'Medium', size: 30, note: 'Borders and a worked back. Festivals and functions.' },
  { name: 'Heavy', size: 20, note: 'Most of the blouse worked. Receptions and family weddings.' },
  { name: 'Bridal', size: 13, note: 'Worked all over, edge to edge. The wedding day.' },
]

export default function HeavyHandwork() {
  const { boutique } = useBoutique()
  const items = boutique.services.groups.flatMap((g) => g.items)
  const stitch = STITCHES.find((s) => items.some((i) => s.match.test(i)))
  const [index, setIndex] = useState(1)
  if (!stitch) return null
  const level = LEVELS[index]

  return (
    <section id="handwork-weight" className="section bg-dark text-light">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">How heavy?</h2>
          <div className="mt-8 inline-flex flex-wrap rounded-full border border-light/30 p-1" role="group" aria-label="Weight of work">
            {LEVELS.map((l, i) => (
              <button
                key={l.name}
                type="button"
                onClick={() => setIndex(i)}
                aria-pressed={i === index}
                className="min-h-11 cursor-pointer rounded-full px-4 transition-[background-color,color] duration-200 ease-stitch aria-pressed:bg-light aria-pressed:text-ink"
              >
                {l.name}
              </button>
            ))}
          </div>
          <p className="mt-6 max-w-[34ch] text-light/80" aria-live="polite">
            {level.note}
          </p>
          <div className="mt-8">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like ${level.name.toLowerCase()} handwork on my blouse.`)} icon={IconBrandWhatsapp}>
              Ask about {level.name.toLowerCase()} work
            </Button>
          </div>
        </div>
        <figure className="md:col-span-7">
          <div key={level.name} className="aspect-[4/3] animate-[fade-in_700ms_var(--ease-stitch)] overflow-hidden rounded-2xl">
            <Texture kind={stitch.id} size={level.size} />
          </div>
          <figcaption className="t-small mt-3 text-center text-light/70">{level.name} work, drawn</figcaption>
        </figure>
      </div>
    </section>
  )
}
