// src/sections/blouse/SpecBlouse.tsx
// A tailor's spec sheet: the choices for neck, back and sleeves above a
// ruled sheet that reads them back with dotted leaders (and the starting
// price, with permission), beside the front and back drawings.
// (Lab: blouse J, "Spec sheet".)
//
// Shows only for a boutique that stitches blouses. The drawing redraws
// with a CSS transition.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import Button from '../../components/Button'
import { BACKS, BlouseFlat, NECKS, SLEEVES } from './blouseDrawing'
import { Choices, useBlouse } from './blouseShared'

export default function SpecBlouse() {
  const { stitchesBlouses, priceLine, send } = useBlouse()
  const [neck, setNeck] = useState('round')
  const [back, setBack] = useState('u')
  const [sleeve, setSleeve] = useState('elbow')
  if (!stitchesBlouses) return null

  const name = (list: typeof NECKS, id: string) => list.find((o) => o.id === id)?.name ?? ''
  const spec = [
    { label: 'Neck', value: name(NECKS, neck) },
    { label: 'Back', value: name(BACKS, back) },
    { label: 'Sleeves', value: name(SLEEVES, sleeve) },
  ]

  return (
    <section id="blouse" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="space-y-6 md:col-span-6">
          <h2 className="t-1 max-w-[12ch] text-balance">Your blouse, spec by spec</h2>
          <Choices label="Neck" options={NECKS} value={neck} onChange={setNeck} />
          <Choices label="Back" options={BACKS} value={back} onChange={setBack} />
          <Choices label="Sleeves" options={SLEEVES} value={sleeve} onChange={setSleeve} />
        </div>
        <div className="md:col-span-6">
          <div className="grid grid-cols-2 gap-4 bg-paper p-5">
            {[false, true].map((isBack) => (
              <figure key={String(isBack)}>
                <div className="aspect-[5/4]">
                  <BlouseFlat neck={isBack ? back : neck} sleeve={sleeve} back={isBack} />
                </div>
                <figcaption className="t-small mt-2 text-center text-muted">{isBack ? 'Back' : 'Front'}</figcaption>
              </figure>
            ))}
          </div>
          <dl className="mt-6 border-t-2 border-ink" aria-live="polite">
            {spec.map((s) => (
              <div key={s.label} className="flex items-baseline gap-3 border-b border-ink/15 py-3">
                <dt className="text-muted">{s.label}</dt>
                <span aria-hidden="true" className="min-w-6 flex-1 translate-y-[-0.25em] border-b-2 border-dotted border-ink/25" />
                <dd className="font-semibold">{s.value}</dd>
              </div>
            ))}
          </dl>
          {priceLine && <p className="t-small mt-3 text-muted">{priceLine}</p>}
          <div className="mt-8">
            <Button href={send(neck, back, sleeve)} variant="primary" icon={IconBrandWhatsapp}>
              Send this spec
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
