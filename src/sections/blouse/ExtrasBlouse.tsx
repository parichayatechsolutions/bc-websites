// src/sections/blouse/ExtrasBlouse.tsx
// Finishing touches: piping, a back tie, tassels and a zari border, plus
// the handwork they list, as a tick-list beside the blouse drawing, which
// shows each touch as it's ticked. The ticked ones go into a WhatsApp
// question. (Lab: blouse W, "Finishing touches".)
//
// It asks rather than promises: the boutique replies with what's possible.
// Shows only for a boutique that stitches blouses. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp, IconCheck } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { joinList } from '../../app/text'
import Button from '../../components/Button'
import { BlouseFlat } from './blouseDrawing'
import { useBlouse } from './blouseShared'

const HANDWORK = /aari|maggam|zardosi|mirror|bead|stone/i

// Each touch, and what it adds to the drawing (on the 200 × 160 grid).
const TOUCHES = [
  { id: 'piping', name: 'Piping', note: 'A thin contrast edge on the neck', path: 'M 120 28 C 118 52 82 52 80 28', dash: undefined, back: false },
  { id: 'zari', name: 'Zari border', note: 'A gold border along the hem', path: 'M 69 131 Q 100 139 131 131', dash: undefined, back: false },
  { id: 'dori', name: 'Back tie (dori)', note: 'Adjustable strings at the back', path: 'M 97 86 L 93 112 M 103 86 L 107 112', dash: undefined, back: true },
  { id: 'latkans', name: 'Tassels (latkans)', note: 'Hanging from the back tie', path: 'M 90 112 L 96 112 L 93 122 Z M 104 112 L 110 112 L 107 122 Z', dash: undefined, back: true },
]

export default function ExtrasBlouse() {
  const { boutique } = useBoutique()
  const { stitchesBlouses } = useBlouse()
  const handwork = boutique.services.groups.flatMap((g) => g.items).filter((i) => HANDWORK.test(i)).slice(0, 3)
  const [ticked, setTicked] = useState<string[]>(['piping'])
  if (!stitchesBlouses) return null

  const options = [...TOUCHES.map((t) => ({ id: t.id, name: t.name, note: t.note })), ...handwork.map((h) => ({ id: h, name: h, note: 'Handwork' }))]
  const toggle = (id: string) => setTicked(ticked.includes(id) ? ticked.filter((t) => t !== id) : [...ticked, id])
  const chosen = options.filter((o) => ticked.includes(o.id)).map((o) => o.name.toLowerCase())
  const message = chosen.length ? `Hi ${boutique.brand.name}, could I have ${joinList(chosen)} on my blouse?` : `Hi ${boutique.brand.name}, I'd like to ask about finishing touches for my blouse.`
  const drawn = (back: boolean) => TOUCHES.filter((t) => t.back === back && ticked.includes(t.id))

  return (
    <section id="blouse-extras" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[12ch] text-balance">Finishing touches</h2>
          <ul className="mt-8 border-t border-ink/15" role="group" aria-label="Finishing touches">
            {options.map((o) => {
              const on = ticked.includes(o.id)
              return (
                <li key={o.id} className="border-b border-ink/15">
                  <button type="button" onClick={() => toggle(o.id)} aria-pressed={on} className="group flex min-h-14 w-full cursor-pointer items-center gap-4 py-3 text-left">
                    <span
                      aria-hidden="true"
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-colors duration-200 ease-stitch ${
                        on ? 'border-primary-ink bg-primary-ink text-on-primary-ink' : 'border-ink/30 group-hover:border-ink'
                      }`}
                    >
                      {on && <IconCheck size={16} stroke={2} />}
                    </span>
                    <span>
                      <span className="block">{o.name}</span>
                      <span className="t-small text-muted">{o.note}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
          <div className="mt-8">
            <Button href={whatsappLink(boutique, message)} variant="primary" icon={IconBrandWhatsapp}>
              Ask about these
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 self-start bg-paper p-5 md:col-span-7 md:p-8">
          {[false, true].map((isBack) => (
            <figure key={String(isBack)}>
              <div className="aspect-[5/4]">
                <BlouseFlat neck={isBack ? 'u' : 'round'} sleeve="elbow" back={isBack}>
                  {drawn(isBack).map((t) => (
                    <path key={t.id} d={t.path} strokeWidth={3} strokeLinecap="round" style={{ stroke: 'var(--c-accent)', fill: t.id === 'latkans' ? 'var(--c-accent)' : 'none' }} />
                  ))}
                </BlouseFlat>
              </div>
              <figcaption className="t-small mt-2 text-center text-muted">{isBack ? 'Back' : 'Front'}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
