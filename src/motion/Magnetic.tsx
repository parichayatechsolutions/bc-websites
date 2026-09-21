// src/motion/Magnetic.tsx
// Leans its child a little toward the cursor, so the main call to action
// feels within reach. Reserved for the primary WhatsApp button in a view;
// more than one per screen and the effect becomes noise.
// Does nothing on touch screens or for visitors who prefer reduced motion.

import { useRef, type ReactNode } from 'react'
import { DURATION, EASE, gsap, useGSAP } from './gsap'

const PULL = 0.25 // share of the cursor's offset the element follows

export default function Magnetic({ children }: { children: ReactNode }) {
  const root = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const el = root.current!
      const mm = gsap.matchMedia()
      mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
        const x = gsap.quickTo(el, 'x', { duration: DURATION.base, ease: EASE.settle })
        const y = gsap.quickTo(el, 'y', { duration: DURATION.base, ease: EASE.settle })

        const onMove = (e: PointerEvent) => {
          const box = el.getBoundingClientRect()
          x((e.clientX - box.left - box.width / 2) * PULL)
          y((e.clientY - box.top - box.height / 2) * PULL)
        }
        const onLeave = () => {
          x(0)
          y(0)
        }

        el.addEventListener('pointermove', onMove)
        el.addEventListener('pointerleave', onLeave)
        return () => {
          el.removeEventListener('pointermove', onMove)
          el.removeEventListener('pointerleave', onLeave)
        }
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <span ref={root} className="inline-block">
      {children}
    </span>
  )
}
