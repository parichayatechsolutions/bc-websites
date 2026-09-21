// src/motion/gsap.ts
// One place that registers GSAP plugins. Import gsap and friends from here,
// never from 'gsap' directly, so plugins are always registered first.

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

/** Conditions for gsap.matchMedia(): every animation checks `motion` first. */
export const MEDIA = {
  motion: '(prefers-reduced-motion: no-preference)',
  desktop: '(min-width: 768px)',
  mobile: '(max-width: 767px)',
}

export { gsap, ScrollTrigger, SplitText, useGSAP }
export { DURATION, EASE, SCRUB, STAGGER } from './tokens'
