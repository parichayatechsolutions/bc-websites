// src/sections/contact/RingWhatsApp.tsx
// The round floating WhatsApp button with a thread ring around it that
// sews itself closed as she reads down the page: how far she's come, and
// the button is always one tap away. (Lab: wa J, "Progress ring".)
//
// The ring is tied to the scrollbar, so it means something (DESIGN.md).
// Place it once in a design, beside SiteShell, not with another sticky
// WhatsApp control.
//
// Motion: rises in once past the hero (stickyShared); the ring follows
// the scroll. Reduced motion: always there, with a plain full ring.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { EASE, gsap } from '../../motion/gsap'
import { useMotion } from '../../motion/useMotion'
import { useShowAfterFirstScreen } from './stickyShared'

// Circumference of the ring (r = 30), for the dash trick.
const LENGTH = 2 * Math.PI * 30

export default function RingWhatsApp() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLDivElement>(null)
  useShowAfterFirstScreen(root)

  useMotion(root, () => {
    gsap.fromTo(
      '[data-ring]',
      { strokeDashoffset: LENGTH },
      { strokeDashoffset: 0, ease: EASE.scroll, scrollTrigger: { start: 0, end: 'max', scrub: true } },
    )
  })

  return (
    <div ref={root} className="pointer-events-none fixed right-0 bottom-0 z-40 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:p-6">
      <a
        href={whatsappLink(boutique)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with ${boutique.brand.name} on WhatsApp`}
        className="pointer-events-auto relative grid h-17 w-17 place-items-center transition-[translate] duration-300 ease-stitch hover:-translate-y-1 active:translate-y-0"
      >
        <svg viewBox="0 0 68 68" aria-hidden="true" className="absolute inset-0 h-full w-full -rotate-90">
          <circle cx="34" cy="34" r="30" fill="none" strokeWidth={2} strokeDasharray="3 3" style={{ stroke: 'color-mix(in oklab, var(--c-thread) 35%, transparent)' }} />
          <circle data-ring cx="34" cy="34" r="30" fill="none" strokeWidth={3} strokeLinecap="round" strokeDasharray={LENGTH} style={{ stroke: 'var(--c-thread)' }} />
        </svg>
        <span className="grid h-13 w-13 place-items-center rounded-full bg-primary-ink text-on-primary-ink">
          <IconBrandWhatsapp size={26} stroke={1.75} aria-hidden="true" />
        </span>
      </a>
    </div>
  )
}
