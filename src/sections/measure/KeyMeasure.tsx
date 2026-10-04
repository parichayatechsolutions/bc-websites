// src/sections/measure/KeyMeasure.tsx
// Every tape line at once: the blouse drawn front and back with all ten
// measurements marked and numbered, and a key beside it saying how to take
// each. A printable-feeling reference. (Lab: measure H, "Front and back".)
//
// Shows only for a boutique that stitches blouses. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import Button from '../../components/Button'
import { BlouseFlat } from '../blouse/blouseDrawing'
import { useBlouse } from '../blouse/blouseShared'
import { MEASURES, useSendMeasurements } from './measureShared'

/** Middle of a tape path, from its first and last points. */
function middle(path: string): [number, number] {
  const n = path.match(/-?\d+(\.\d+)?/g)!.map(Number)
  return [(n[0] + n[n.length - 2]) / 2, (n[1] + n[n.length - 1]) / 2]
}

export default function KeyMeasure() {
  const { stitchesBlouses } = useBlouse()
  const send = useSendMeasurements()
  if (!stitchesBlouses) return null
  const numbered = MEASURES.map((m, i) => ({ ...m, n: i + 1 }))

  return (
    <section id="measure" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Where the tape goes</h2>
        <div className="mt-12 grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="grid gap-4 bg-paper p-5 sm:grid-cols-2 md:col-span-7 md:p-8">
            {[false, true].map((back) => (
              <figure key={String(back)}>
                <div className="aspect-[5/4]">
                  <BlouseFlat neck={back ? 'u' : 'round'} sleeve="elbow" back={back}>
                    {numbered
                      .filter((m) => Boolean(m.back) === back)
                      .map((m) => {
                        const [x, y] = middle(m.tape)
                        return (
                          <g key={m.id}>
                            <path d={m.tape} fill="none" strokeWidth={2} strokeDasharray="4 3" style={{ stroke: 'var(--c-thread)' }} />
                            <circle cx={x} cy={y} r={6} style={{ fill: 'var(--c-primary-ink)' }} />
                            <text x={x} y={y + 2.6} textAnchor="middle" fontSize={7.5} fontWeight={600} style={{ fill: 'var(--c-on-primary-ink)' }}>
                              {m.n}
                            </text>
                          </g>
                        )
                      })}
                  </BlouseFlat>
                </div>
                <figcaption className="t-small mt-2 text-center text-muted">{back ? 'Back' : 'Front'}</figcaption>
              </figure>
            ))}
          </div>
          <ol className="space-y-4 md:col-span-5">
            {numbered.map((m) => (
              <li key={m.id} className="grid grid-cols-[2rem_1fr] gap-x-3">
                <span className="t-3 text-thread" aria-hidden="true">
                  {m.n}
                </span>
                <span>
                  <span className="font-semibold">{m.name}</span>
                  <span className="t-small block text-muted">{m.how}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-10">
          <Button href={send()} variant="primary" icon={IconBrandWhatsapp}>
            Send my measurements
          </Button>
        </div>
      </div>
    </section>
  )
}
