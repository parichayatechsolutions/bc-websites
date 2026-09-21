// src/motion/SmoothScroll.tsx
// Weighted scrolling (Lenis) driven by GSAP's ticker, so scroll-linked
// animations and the scroll itself update on the same frame.
// Lenis turns itself off for visitors who prefer reduced motion.
// useLenis() gives components the instance, e.g. to jump to the top on a page
// change or to freeze the page while a menu is open.

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap'

const LenisContext = createContext<Lenis | null>(null)

export const useLenis = () => useContext(LenisContext)

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const instance = new Lenis({ lerp: 0.09, anchors: true, autoRaf: false })
    instance.on('scroll', ScrollTrigger.update)

    const tick = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Pinned sections measure themselves on mount; web fonts and images
    // change those heights, so measure again once they arrive.
    const refresh = () => ScrollTrigger.refresh()
    document.fonts.ready.then(refresh)
    window.addEventListener('load', refresh)

    setLenis(instance)
    return () => {
      window.removeEventListener('load', refresh)
      gsap.ticker.remove(tick)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
