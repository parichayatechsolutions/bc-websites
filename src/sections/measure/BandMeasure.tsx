// src/sections/measure/BandMeasure.tsx
// On the brand colour between two zari borders: the measurements as chips
// and the blouse drawing beside them showing where the tape goes for the
// one picked. (Lab: measure I, "Brand band".)
//
// Shows only for a boutique that stitches blouses. The drawing swaps with
// a CSS fade.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBlouse } from '../blouse/blouseShared'
import { MEASURES, TapeDrawing, useSendMeasurements } from './measureShared'

export default function BandMeasure() {
  const { stitchesBlouses } = useBlouse()
  const send = useSendMeasurements()
  const [index, setIndex] = useState(0)
  if (!stitchesBlouses) return null
  const m = MEASURES[index]

  return (
    <section id="measure" className="bg-primary text-on-primary">
      <div className="zari" aria-hidden="true" />
      <div className="section">
        <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-6">
            <h2 className="t-1 max-w-[12ch] text-balance">Where the tape goes</h2>
            <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Measurement">
              {MEASURES.map((mm, i) => (
                <button
                  key={mm.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-pressed={i === index}
                  className="min-h-11 cursor-pointer rounded-full border border-on-primary/40 px-4 transition-[background-color,color] duration-200 ease-stitch hover:border-on-primary aria-pressed:bg-light aria-pressed:text-ink"
                >
                  {mm.name}
                </button>
              ))}
            </div>
            <p className="mt-6 max-w-[40ch] opacity-90" aria-live="polite">
              {m.how}
            </p>
            <a
              href={send()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-12 items-center gap-2.5 rounded-full bg-light px-7 font-semibold text-ink transition-[scale] duration-200 ease-stitch active:scale-[0.97]"
            >
              <IconBrandWhatsapp size={20} stroke={1.75} aria-hidden="true" />
              Send my measurements
            </a>
          </div>
          <div key={index} className="aspect-[5/4] animate-[fade-in_700ms_var(--ease-stitch)] rounded-2xl bg-light p-6 md:col-span-6 md:p-10">
            <TapeDrawing measure={m} />
          </div>
        </div>
      </div>
      <div className="zari" aria-hidden="true" />
    </section>
  )
}
