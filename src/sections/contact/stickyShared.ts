// src/sections/contact/stickyShared.ts
// For the WhatsApp controls that stay on screen: they keep out of the way
// while the hero (which has its own WhatsApp button) is in view, rise in
// once the visitor scrolls past most of the first screen, and step back if
// she scrolls up to the top again.
//
// Reduced motion: always visible, from the first screen.

import type { RefObject } from 'react'
import { DURATION, EASE, gsap, ScrollTrigger } from '../../motion/gsap'
import { useMotion } from '../../motion/useMotion'

/** Share of the first screen to scroll past before the control appears. */
const AFTER = 0.6

export function useShowAfterFirstScreen(ref: RefObject<HTMLElement | null>) {
  useMotion(ref, () => {
    const el = ref.current!
    let shown = false
    gsap.set(el, { autoAlpha: 0, yPercent: 60 })

    const show = (on: boolean) => {
      if (on === shown) return
      shown = on
      gsap.to(el, { autoAlpha: on ? 1 : 0, yPercent: on ? 0 : 60, duration: DURATION.base, ease: EASE.settle, overwrite: true })
    }

    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => show(self.scroll() > window.innerHeight * AFTER),
    })
    show(window.scrollY > window.innerHeight * AFTER)
  })
}
