// src/sections/process/ZigzagProcess.tsx
// The making steps as alternating rows: a photo on one side, a huge step
// number and the description on the other, swapping sides down the page.
// (Lab: process H, "Zig-zag".)
//
// Numbered because the steps are a real sequence; built-in copy from
// steps.ts. Photos come from what they've shared (interior, team at work,
// close-ups, work); a step without one keeps just its text.
//
// Motion: the photos uncover in turn as they come into view.
// Reduced motion: in place.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import Media from '../../components/Media'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { STEPS } from './steps'

export default function ZigzagProcess() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const { media } = boutique
  const pool = [...(media.interior ?? []), ...(media.teamAtWork ? [media.teamAtWork] : []), ...(media.closeups ?? []), ...media.work]

  useMotion(root, () => {
    wipe('[data-step-photo]', { trigger: root.current })
  })

  return (
    <section ref={root} id="process" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[14ch] text-balance">How your garment is made</h2>
        <ol className="mt-14 space-y-14 md:space-y-20">
          {STEPS.map(({ title, body }, i) => (
            <li key={title} className="grid items-center gap-6 md:grid-cols-12 md:gap-12">
              {pool.length > 0 && (
                <div data-step-photo className={`aspect-[4/3] overflow-hidden bg-paper md:col-span-6 ${i % 2 ? 'md:order-2 md:col-start-7' : ''}`}>
                  <Media file={pool[i % pool.length]} alt="" />
                </div>
              )}
              <div className={`md:col-span-5 ${i % 2 ? 'md:order-1 md:col-start-1' : 'md:col-start-8'}`}>
                <span className="t-hero leading-none text-thread" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="t-2 mt-2">{title}</h3>
                <p className="mt-3 max-w-[40ch] text-muted">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
