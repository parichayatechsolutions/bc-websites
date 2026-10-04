// src/sections/fabric/DeckFabrics.tsx
// Dark, the fabrics they stock as a stack of swatch cards, the top one in
// full and two peeking behind; previous and next deal the deck, and the
// top swatch's name and use sit beside it. Nothing deals on its own.
// (Lab: fabric O, "Swatch deck".)
//
// From `fabrics`. Hides without any. The cards move with a CSS transition
// that reduced motion turns off.

import { useState } from 'react'
import { IconBrandWhatsapp, IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'

const ROUND =
  'grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-light/40 transition-[background-color,color] duration-200 ease-stitch hover:bg-light hover:text-dark'
const BEHIND = ['rotate-0', 'rotate-3 translate-x-3', '-rotate-3 -translate-x-3']

export default function DeckFabrics() {
  const { boutique } = useBoutique()
  const fabrics = boutique.fabrics ?? []
  const [top, setTop] = useState(0)
  if (!fabrics.length) return null
  const fabric = fabrics[top] ?? fabrics[0]
  const step = (by: number) => setTop((top + by + fabrics.length) % fabrics.length)

  return (
    <section id="fabrics" className="section overflow-x-clip bg-dark text-light">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-6">
          <div className="relative mx-auto aspect-square w-full max-w-xs">
            {fabrics.map((f, i) => {
              const place = (i - top + fabrics.length) % fabrics.length
              if (place > 2) return null
              return (
                <div
                  key={f.name}
                  aria-hidden={place !== 0}
                  className={`absolute inset-0 border-[6px] border-light bg-light transition-transform duration-500 ease-stitch ${BEHIND[place]}`}
                  style={{ zIndex: 10 - place }}
                >
                  <Media file={f.photo} alt={place === 0 ? `${f.name} swatch` : ''} />
                </div>
              )
            })}
          </div>
        </div>
        <div className="md:col-span-6" aria-live="polite">
          <h2 className="t-1 max-w-[10ch] text-balance">Our fabrics</h2>
          <p className="t-2 mt-8 text-accent-on-dark">{fabric.name}</p>
          {fabric.bestFor && <p className="mt-2 text-light/80">Best for {fabric.bestFor}</p>}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to ask about your ${fabric.name}.`)} icon={IconBrandWhatsapp}>
              Ask about it
            </Button>
            {fabrics.length > 1 && (
              <>
                <button type="button" onClick={() => step(-1)} aria-label="Previous fabric" className={ROUND}>
                  <IconChevronLeft size={22} stroke={1.5} aria-hidden="true" />
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next fabric" className={ROUND}>
                  <IconChevronRight size={22} stroke={1.5} aria-hidden="true" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
