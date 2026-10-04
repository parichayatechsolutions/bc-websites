// src/sections/fabric/CompareFabrics.tsx
// Compare two fabrics: pick any two they stock and see them side by side
// on three dot scales (weight, sheen and drape), with their swatches.
// (Lab: fabric H, "Compare two".)
//
// Only their fabrics whose kind is known (silk, georgette, cotton…); the
// scales are general, true of the cloth. Needs two. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'
import { scaled, SCALES } from './fabricKinds'

const PILL =
  'min-h-11 cursor-pointer rounded-full border border-ink/25 px-4 transition-[background-color,border-color,color] duration-200 ease-stitch hover:border-ink aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink'

function Dots({ n }: { n: number }) {
  return (
    <span className="flex gap-1.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`h-3 w-3 rounded-full ${i <= n ? 'bg-primary-ink' : 'bg-ink/15'}`} />
      ))}
    </span>
  )
}

export default function CompareFabrics() {
  const { boutique } = useBoutique()
  const fabrics = scaled(boutique.fabrics ?? []).slice(0, 8)
  const [picked, setPicked] = useState<[number, number]>([0, 1])
  if (fabrics.length < 2) return null

  const pick = (slot: 0 | 1, i: number) => setPicked(slot === 0 ? [i, picked[1]] : [picked[0], i])
  const pair = picked.map((i) => fabrics[i] ?? fabrics[0])

  return (
    <section id="fabrics-compare" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Compare two fabrics</h2>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {([0, 1] as const).map((slot) => {
            const { fabric, scale } = pair[slot]
            return (
              <div key={slot}>
                <div className="flex flex-wrap gap-2" role="group" aria-label={slot === 0 ? 'First fabric' : 'Second fabric'}>
                  {fabrics.map((f, i) => (
                    <button key={f.fabric.name} type="button" onClick={() => pick(slot, i)} aria-pressed={picked[slot] === i} className={PILL}>
                      {f.fabric.name}
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex gap-5 rounded-2xl bg-paper p-5" aria-live="polite">
                  <div className="h-24 w-24 shrink-0 overflow-hidden bg-light">
                    <Media file={fabric.photo} alt={`${fabric.name} swatch`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="t-3">{fabric.name}</p>
                    <dl className="mt-3 space-y-2">
                      {SCALES.map((label, i) => (
                        <div key={label} className="flex items-center justify-between gap-4">
                          <dt className="t-small text-muted">{label}</dt>
                          <dd>
                            <Dots n={scale[i]} />
                            <span className="sr-only">
                              {scale[i]} of 5
                            </span>
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-10">
          <Button
            href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'm deciding between ${pair[0].fabric.name} and ${pair[1].fabric.name}. Could you help me choose?`)}
            variant="primary"
            icon={IconBrandWhatsapp}
          >
            Help me choose
          </Button>
        </div>
      </div>
    </section>
  )
}
