// src/sections/process/StickyProcess.tsx
// How a garment gets made, from first conversation to final fitting.
// The steps scroll past a photo that stays in place and changes to match
// whichever step is in the middle of the screen.

import { useRef, useState } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import Media from '../../components/Media'
import { EASE, gsap, MEDIA, SCRUB, ScrollTrigger, useGSAP } from '../../motion/gsap'

const STEPS = [
  {
    title: 'Consultation',
    body: 'Bring your fabric, a photo you love, or just an idea. We sketch the design with you and suggest what will suit the occasion.',
  },
  {
    title: 'Measurements',
    body: 'Every measurement is taken by hand and kept under your name, so your next order starts from a perfect fit.',
  },
  {
    title: 'Cutting',
    body: 'Your pattern is drafted to your own measurements, not a standard size, and cut by the master tailor.',
  },
  {
    title: 'Stitching and handwork',
    body: 'The garment is stitched, then embroidered by hand wherever the design calls for it.',
  },
  {
    title: 'Trial and finishing',
    body: 'You try it on. We adjust until it sits exactly right, then press it and pack it for you.',
  },
]

export default function StickyProcess() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const { media, pricing } = boutique

  // One photo per step, from whatever the boutique has shared.
  const pool = [
    ...(media.interior ?? []),
    ...(media.teamAtWork ? [media.teamAtWork] : []),
    ...(media.closeups ?? []),
    ...media.work,
  ]
  const photos = STEPS.map((_, i) => pool[i % Math.max(pool.length, 1)])

  useGSAP(
    () => {
      const steps = gsap.utils.toArray<HTMLElement>('[data-step]')
      const triggers = steps.map((step, i) =>
        ScrollTrigger.create({
          trigger: step,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => self.isActive && setActive(i),
        }),
      )

      const mm = gsap.matchMedia()
      mm.add(MEDIA.motion, () => {
        steps.forEach((step) =>
          gsap.fromTo(
            step,
            { opacity: 0.3 },
            {
              opacity: 1,
              ease: EASE.scroll,
              scrollTrigger: { trigger: step, start: 'top 80%', end: 'top 55%', scrub: SCRUB.exact },
            },
          ),
        )
      })

      return () => {
        triggers.forEach((t) => t.kill())
        mm.revert()
      }
    },
    { scope: root },
  )

  return (
    <section ref={root} className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[14ch] text-balance">How your garment is made</h2>
        {pricing?.deliveryDays && (
          <p className="mt-5 max-w-lg text-muted">
            Ready in about {pricing.deliveryDays} days.
            {pricing.express && ` In a hurry? Express stitching takes ${pricing.express}.`}
          </p>
        )}

        <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-20">
          {/* Photo that follows the steps (desktop only; phones see one photo per step) */}
          <div className="hidden md:block">
            <div className="sticky top-[14vh] aspect-[4/5] w-full overflow-hidden rounded-t-[999px]">
              {photos.map((file, i) => (
                <div
                  key={i}
                  className="absolute inset-0 transition-[opacity,transform] duration-700 ease-stitch"
                  style={{ opacity: i === active ? 1 : 0, transform: `scale(${i === active ? 1 : 1.06})` }}
                >
                  <Media file={file} alt="" />
                </div>
              ))}
            </div>
          </div>

          <ol className="space-y-[14vh] md:py-[18vh]">
            {STEPS.map((step, i) => (
              <li key={step.title} data-step className="grid grid-cols-[auto_1fr] gap-x-6">
                <span className="t-2 text-thread" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3 className="t-2">{step.title}</h3>
                  <p className="mt-4 max-w-[44ch] text-muted">{step.body}</p>
                  <div className="arch mt-8 aspect-[4/5] w-3/4 md:hidden">
                    <Media file={photos[i]} alt="" />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
