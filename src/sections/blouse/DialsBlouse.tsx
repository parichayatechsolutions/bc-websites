// src/sections/blouse/DialsBlouse.tsx
// Mix and match: three dials (neck, back, sleeves), each turned with
// previous and next arrows, the front and back drawing changing as they
// turn. Playful, and quick on a phone. (Lab: blouse M, "Mix and match".)
//
// Shows only for a boutique that stitches blouses. The drawing redraws
// with a CSS transition.

import { useState } from 'react'
import { IconBrandWhatsapp, IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import Button from '../../components/Button'
import { BACKS, BlouseFlat, NECKS, SLEEVES, type IOption } from './blouseDrawing'
import { useBlouse } from './blouseShared'

const ARROW =
  'grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-ink/25 transition-[background-color,color] duration-200 ease-stitch hover:bg-ink hover:text-light'

function Dial({ label, options, index, onChange }: { label: string; options: IOption[]; index: number; onChange: (i: number) => void }) {
  const turn = (by: number) => onChange((index + by + options.length) % options.length)
  return (
    <div className="flex items-center justify-between gap-4 border-t border-ink/15 py-4">
      <button type="button" onClick={() => turn(-1)} aria-label={`Previous ${label.toLowerCase()}`} className={ARROW}>
        <IconChevronLeft size={20} stroke={1.75} aria-hidden="true" />
      </button>
      <div className="text-center" aria-live="polite">
        <p className="t-small text-muted">{label}</p>
        <p className="t-3">{options[index].name}</p>
      </div>
      <button type="button" onClick={() => turn(1)} aria-label={`Next ${label.toLowerCase()}`} className={ARROW}>
        <IconChevronRight size={20} stroke={1.75} aria-hidden="true" />
      </button>
    </div>
  )
}

export default function DialsBlouse() {
  const { stitchesBlouses, priceLine, send } = useBlouse()
  const [neck, setNeck] = useState(0)
  const [back, setBack] = useState(0)
  const [sleeve, setSleeve] = useState(3)
  if (!stitchesBlouses) return null
  const ids = [NECKS[neck].id, BACKS[back].id, SLEEVES[sleeve].id] as const

  return (
    <section id="blouse" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">Mix and match</h2>
          <div className="mt-8 border-b border-ink/15">
            <Dial label="Neck" options={NECKS} index={neck} onChange={setNeck} />
            <Dial label="Back" options={BACKS} index={back} onChange={setBack} />
            <Dial label="Sleeves" options={SLEEVES} index={sleeve} onChange={setSleeve} />
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button href={send(...ids)} variant="primary" icon={IconBrandWhatsapp}>
              Send this design
            </Button>
            {priceLine && <p className="t-small text-muted">{priceLine}</p>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 self-start bg-paper p-5 md:col-span-7 md:p-8">
          {[false, true].map((isBack) => (
            <figure key={String(isBack)}>
              <div className="aspect-[5/4]">
                <BlouseFlat neck={isBack ? ids[1] : ids[0]} sleeve={ids[2]} back={isBack} />
              </div>
              <figcaption className="t-small mt-2 text-center text-muted">{isBack ? 'Back' : 'Front'}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
