// src/sections/wedding/ReadyWedding.tsx
// How ready are you? A ruled checklist of the outfit steps (outfits
// decided, fabric bought, designs sent, measurements given, trial done…)
// she ticks off, beside a big percentage and a thin progress line; the
// button asks for help with what's left. (Lab: wed U, "How ready are
// you?".)
//
// Steps only, with no dates (DESIGN.md decision log). The ticks live only
// on her screen. Shows only for a boutique that does bridal work. No
// motion.

import { useState } from 'react'
import { IconBrandWhatsapp, IconCheck } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { useWedding } from './weddingShared'

const STEPS = [
  'Outfits decided for each function',
  'Fabrics and sarees bought',
  'Blouse designs chosen',
  'Measurements given',
  'First trial done',
  'Final fitting done',
  'Family outfits planned',
  'Fall, pico and pleats done',
]

export default function ReadyWedding() {
  const { boutique } = useBoutique()
  const { doesBridal } = useWedding()
  const [done, setDone] = useState<string[]>([])
  if (!doesBridal) return null
  const toggle = (s: string) => setDone(done.includes(s) ? done.filter((d) => d !== s) : [...done, s])
  const percent = Math.round((done.length / STEPS.length) * 100)
  const left = STEPS.filter((s) => !done.includes(s))

  return (
    <section id="wedding-ready" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="self-start md:sticky md:top-24 md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">How ready are you?</h2>
          <p className="mt-8 font-display leading-none tabular-nums text-primary-ink" style={{ fontSize: 'clamp(5rem, 16vw, 10rem)' }} aria-live="polite">
            {percent}%
          </p>
          <div className="mt-4 h-0.5 bg-ink/10" aria-hidden="true">
            <div className="h-full bg-primary-ink transition-[width] duration-300 ease-stitch" style={{ width: `${percent}%` }} />
          </div>
          <div className="mt-8">
            <Button
              href={whatsappLink(boutique, left.length ? `Hi ${boutique.brand.name}, I'm getting ready for my wedding. Could you help with: ${left.map((s) => s.toLowerCase()).join('; ')}?` : `Hi ${boutique.brand.name}, I'm all set for my wedding. Thank you!`)}
              variant="primary"
              icon={IconBrandWhatsapp}
            >
              Help with what’s left
            </Button>
          </div>
        </div>
        <ul className="border-t border-ink/15 md:col-span-7">
          {STEPS.map((s) => {
            const on = done.includes(s)
            return (
              <li key={s} className="border-b border-ink/15">
                <button type="button" onClick={() => toggle(s)} aria-pressed={on} className="group flex min-h-14 w-full cursor-pointer items-center gap-4 py-3 text-left">
                  <span
                    aria-hidden="true"
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-colors duration-200 ease-stitch ${on ? 'border-primary-ink bg-primary-ink text-on-primary-ink' : 'border-ink/30 group-hover:border-ink'}`}
                  >
                    {on && <IconCheck size={16} stroke={2} />}
                  </span>
                  <span className={`t-3 ${on ? 'text-muted line-through' : ''}`}>{s}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
