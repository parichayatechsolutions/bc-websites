// src/sections/blouse/FaceBlouse.tsx
// Which neck suits you? Pick a face shape and see the necklines to try
// and the one to skip, each drawn, with a button to ask for the one she
// likes. (Lab: blog S, "Which neck suits you?".)
//
// Styling guidance, true of the cuts, and offered as suggestions. Shows
// only for a boutique that stitches blouses. The suggestions swap with a
// CSS fade.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { BlouseFlat, NECKS } from './blouseDrawing'
import { useBlouse } from './blouseShared'

const FACES = [
  { name: 'Round', tryNecks: ['v', 'sweet'], skip: 'boat' },
  { name: 'Oval', tryNecks: ['boat', 'square'], skip: undefined },
  { name: 'Square', tryNecks: ['round', 'sweet'], skip: 'square' },
  { name: 'Heart', tryNecks: ['round', 'boat'], skip: 'v' },
  { name: 'Long', tryNecks: ['boat', 'round'], skip: 'v' },
]

export default function FaceBlouse() {
  const { boutique } = useBoutique()
  const { stitchesBlouses } = useBlouse()
  const [index, setIndex] = useState(0)
  if (!stitchesBlouses) return null
  const face = FACES[index]
  const neck = (id: string) => NECKS.find((n) => n.id === id)!
  const cards = [...face.tryNecks.map((id) => ({ id, verdict: 'Try' })), ...(face.skip ? [{ id: face.skip, verdict: 'Skip' }] : [])]

  return (
    <section id="neck-guide" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Which neck suits you?</h2>
        <p className="t-3 mt-8">Your face shape</p>
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Face shape">
          {FACES.map((f, i) => (
            <button
              key={f.name}
              type="button"
              onClick={() => setIndex(i)}
              aria-pressed={i === index}
              className="min-h-11 cursor-pointer rounded-full border border-ink/25 px-5 transition-[background-color,border-color,color] duration-200 ease-stitch hover:border-ink aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
            >
              {f.name}
            </button>
          ))}
        </div>
        <ul key={index} className="mt-10 grid animate-[fade-in_700ms_var(--ease-stitch)] gap-4 sm:grid-cols-3" aria-live="polite">
          {cards.map(({ id, verdict }) => {
            const n = neck(id)
            const tryIt = verdict === 'Try'
            return (
              <li key={id} className={`rounded-2xl p-5 ${tryIt ? 'bg-paper' : 'border border-dashed border-ink/25'}`}>
                <p className={`t-small font-semibold ${tryIt ? 'text-primary-ink' : 'text-muted'}`}>{verdict}</p>
                <div className={`mt-3 aspect-[5/4] ${tryIt ? '' : 'opacity-50'}`}>
                  <BlouseFlat neck={id} sleeve="cap" />
                </div>
                <p className="t-3 mt-3">{n.name}</p>
                <p className="t-small text-muted">{n.note}</p>
                {tryIt && (
                  <a
                    href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like a blouse with ${n.phrase}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex min-h-11 items-center gap-2 font-semibold text-primary-ink"
                  >
                    <IconBrandWhatsapp size={18} stroke={1.75} aria-hidden="true" />
                    <span className="link-stitch">Ask for this</span>
                  </a>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
