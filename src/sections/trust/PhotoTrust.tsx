// src/sections/trust/PhotoTrust.tsx
// Their facts as solid cards laid over a full-width photograph of their
// work: proof and work in one frame. (Lab: trust U, "Photo overlay", with
// solid cards instead of frosted glass, so they read over any photo.)
//
// Only facts from the config (trustFacts); hides below two. The photo is
// their first work photo or their hero.
//
// Motion: the numbers count up once. Reduced motion: as written.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import Media from '../../components/Media'
import { countUp } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { trustFacts } from './trustFacts'

export default function PhotoTrust() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const facts = trustFacts(boutique)
  const photo = boutique.media.work[0] ?? boutique.media.hero.src

  useMotion(root, () => {
    countUp('[data-count]', { trigger: root.current })
  })

  if (facts.length < 2) return null

  return (
    <section ref={root} aria-label="At a glance" className="relative isolate overflow-hidden py-24 md:py-36">
      <div className="absolute inset-0 -z-10">
        <Media file={photo} alt="" />
      </div>
      <dl className={`wrap grid grid-cols-2 gap-3 ${facts.length > 3 ? 'md:grid-cols-4' : 'md:grid-cols-3'}`}>
        {facts.map(({ icon: FactIcon, value, label }) => (
          <div key={label} className="flex flex-col bg-light p-5 text-ink md:p-6">
            <dt className="t-small order-last mt-1 text-muted">{label}</dt>
            <dd className="flex flex-col">
              <FactIcon size={22} stroke={1.5} className="text-primary-ink" aria-hidden="true" />
              <span data-count className="t-2 mt-3 tabular-nums">
                {value}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
