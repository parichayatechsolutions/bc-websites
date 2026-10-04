// src/sections/trust/TimelineTrust.tsx
// The boutique's story in milestones along a dashed thread: when they
// opened, the garments they've delivered, the reviews they've earned, and
// where they are today. (Lab: trust V, "Timeline".)
//
// Every milestone comes from the config: the year they started, their own
// stats, their Google reviews, their area. Hides with fewer than three.
//
// Motion: the thread draws itself down once. Reduced motion: in place.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import { draw } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

export default function TimelineTrust() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const { established, stats, social, branches } = boutique
  const city = branches[0]?.city
  const garments = stats?.find((s) => /garment|deliver|order|piece/i.test(s.label))

  const milestones = [
    established && { when: String(established), what: city ? `We opened in ${city}` : 'We opened our doors' },
    garments && { when: garments.value, what: garments.label },
    social.googleReviewCount && {
      when: social.googleReviewCount.toLocaleString('en-IN'),
      what: `Reviews on Google${social.googleRating ? `, rated ${social.googleRating.toFixed(1)}` : ''}`,
    },
    branches.length > 0 && { when: 'Today', what: branches.length > 1 ? `${branches.length} branches` : `Still stitching in ${branches[0].area || city}` },
  ].filter(Boolean) as { when: string; what: string }[]

  useMotion(root, () => {
    draw('[data-thread]', { trigger: root.current, from: 'top' })
  })

  if (milestones.length < 3) return null

  return (
    <section ref={root} id="timeline" className="section">
      <div className="wrap max-w-3xl">
        <h2 className="t-1 max-w-[12ch] text-balance">How far we’ve come</h2>
        <div className="relative mt-12">
          <span data-thread aria-hidden="true" className="absolute top-2 bottom-2 left-[0.6875rem] border-l-2 border-dashed border-thread" />
          <ol className="relative space-y-10 pl-10">
          {milestones.map(({ when, what }) => (
            <li key={when + what} className="relative">
              <span aria-hidden="true" className="absolute top-2 -left-10 h-6 w-6 rounded-full border-2 border-thread bg-light" />
              <p className="t-2 tabular-nums text-primary-ink">{when}</p>
              <p className="mt-1 text-muted">{what}</p>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
