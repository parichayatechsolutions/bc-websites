// src/sections/blouse/GuideBlouse.tsx
// A neckline guide: each neck drawn, what it does for the wearer and what
// to wear with it, in rows that open one at a time.
// (Lab: blouse X, "Neck guide".)
//
// General styling guidance, true of the cut itself. Shows only for a
// boutique that stitches blouses; ends with a button to ask about one.
// Answers open with a CSS height transition.

import { useId, useState } from 'react'
import { IconBrandWhatsapp, IconPlus } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { BlouseFlat, NECKS } from './blouseDrawing'
import { useBlouse } from './blouseShared'

const WEAR: Record<string, string> = {
  round: 'Temple jewellery or a simple chain.',
  boat: 'Chokers, and light silks.',
  v: 'Long necklaces and pendants.',
  square: 'Broad necklaces and bridal sets.',
  sweet: 'Bridal sets and heavy silks.',
  high: 'Statement earrings, and no necklace.',
}

export default function GuideBlouse() {
  const { boutique } = useBoutique()
  const { stitchesBlouses } = useBlouse()
  const id = useId()
  const [open, setOpen] = useState(0)
  if (!stitchesBlouses) return null

  return (
    <section id="neck-guide" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[12ch] text-balance">Which neck suits you?</h2>
        <ul className="mt-12 border-b border-ink/15">
          {NECKS.map((n, i) => {
            const isOpen = i === open
            return (
              <li key={n.id} className="border-t border-ink/15">
                <h3>
                  <button
                    type="button"
                    id={`${id}-q${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`${id}-a${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="group flex min-h-16 w-full cursor-pointer items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="t-3">{n.name}</span>
                    <IconPlus size={22} stroke={1.5} aria-hidden="true" className={`shrink-0 text-primary-ink transition-transform duration-300 ease-stitch ${isOpen ? 'rotate-45' : ''}`} />
                  </button>
                </h3>
                <div
                  id={`${id}-a${i}`}
                  role="region"
                  aria-labelledby={`${id}-q${i}`}
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-300 ease-stitch ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <div className="grid items-center gap-6 pb-8 sm:grid-cols-[12rem_1fr]">
                      <div className="aspect-[5/4] w-48 bg-paper p-3">
                        <BlouseFlat neck={n.id} sleeve="cap" />
                      </div>
                      <div>
                        <p>{n.note}</p>
                        <p className="mt-2 text-muted">Wear with: {WEAR[n.id]}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
        <div className="mt-10">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, could you help me choose a neck for my blouse?`)} variant="primary" icon={IconBrandWhatsapp}>
            Help me choose
          </Button>
        </div>
      </div>
    </section>
  )
}
