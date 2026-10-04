// src/sections/fabric/ScaleFabrics.tsx
// Fabrics by feel: their fabrics placed along two scales, sheer to heavy
// and matte to shiny, as swatch dots on a chart, with a list that names
// each one beside it. (Lab: fabric M, "Feel scale".)
//
// Only their fabrics whose kind is known (fabricKinds); the positions are
// general, true of the cloth. Needs two. Tapping a name or dot picks it.
// No motion.

import { useState } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import Media from '../../components/Media'
import { scaled } from './fabricKinds'

export default function ScaleFabrics() {
  const { boutique } = useBoutique()
  const fabrics = scaled(boutique.fabrics ?? []).slice(0, 8)
  const [index, setIndex] = useState(0)
  if (fabrics.length < 2) return null
  const picked = fabrics[index] ?? fabrics[0]

  // Fabrics of the same kind share a spot; nudge them apart a little.
  const place = (i: number) => {
    const [weight, sheen] = fabrics[i].scale
    const same = fabrics.slice(0, i).filter((f) => f.scale[0] === weight && f.scale[1] === sheen).length
    return { left: `${((weight - 1) / 4) * 84 + 8 + same * 4}%`, top: `${92 - ((sheen - 1) / 4) * 84 - same * 4}%` }
  }

  return (
    <section id="fabrics-feel" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <div className="relative aspect-square border-b-2 border-l-2 border-ink/40 bg-paper">
            {fabrics.map((f, i) => (
              <button
                key={f.fabric.name}
                type="button"
                onClick={() => setIndex(i)}
                aria-pressed={i === index}
                aria-label={f.fabric.name}
                className="absolute h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-pointer overflow-hidden rounded-full ring-2 ring-light transition-[box-shadow,scale] duration-200 ease-stitch hover:scale-110 aria-pressed:z-10 aria-pressed:scale-125 aria-pressed:ring-primary-ink"
                style={place(i)}
              >
                <Media file={f.fabric.photo} alt="" />
              </button>
            ))}
          </div>
          <p className="t-small mt-3 text-muted">Left to right, light to heavy. Bottom to top, matte to shiny.</p>
        </div>
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">Fabrics by feel</h2>
          <ul className="mt-8 border-t border-ink/15" role="group" aria-label="Fabrics">
            {fabrics.map((f, i) => (
              <li key={f.fabric.name} className="border-b border-ink/15">
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-pressed={i === index}
                  className="flex min-h-12 w-full cursor-pointer items-center justify-between gap-4 py-2 text-left transition-colors duration-200 ease-stitch hover:text-primary-ink aria-pressed:font-semibold aria-pressed:text-primary-ink"
                >
                  {f.fabric.name}
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-muted" aria-live="polite">
            {picked.fabric.name}: {['very light', 'light', 'medium', 'heavy', 'very heavy'][picked.scale[0] - 1]},{' '}
            {['matte', 'soft sheen', 'some sheen', 'shiny', 'very shiny'][picked.scale[1] - 1]}, and{' '}
            {['crisp', 'fairly crisp', 'drapes a little', 'drapes well', 'flows'][picked.scale[2] - 1]}.
            {picked.fabric.bestFor && ` Best for ${picked.fabric.bestFor}.`}
          </p>
        </div>
      </div>
    </section>
  )
}
