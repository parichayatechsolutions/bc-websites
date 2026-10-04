// src/motion/useMotion.ts
// The setup every animated section needs, in one call: build in useGSAP,
// scoped to the section, only when the visitor hasn't asked for reduced
// motion, and undone when the section unmounts or the preference changes.
//
//   const root = useRef<HTMLElement>(null)
//   useMotion(root, ({ desktop }) => {
//     wipe('[data-photo]', { trigger: root.current })
//   })
//
// Selector strings inside `build` only match inside `scope`, and `build` is
// skipped when the section rendered nothing. Return a cleanup function from
// `build` for anything GSAP doesn't revert by itself.

import type { RefObject } from 'react'
import { gsap, MEDIA, useGSAP } from './gsap'

export function useMotion(
  scope: RefObject<HTMLElement | null>,
  build: (view: { desktop: boolean }) => void | (() => void),
  dependencies: unknown[] = [],
) {
  useGSAP(
    () => {
      // A section that hid itself for lack of data has nothing to animate.
      if (!scope.current) return
      const mm = gsap.matchMedia(scope.current)
      mm.add({ motion: MEDIA.motion, desktop: MEDIA.desktop }, (context) => {
        const { motion, desktop } = context.conditions as { motion: boolean; desktop: boolean }
        if (!motion) return
        return build({ desktop })
      })
      return () => mm.revert()
    },
    { scope, dependencies },
  )
}
