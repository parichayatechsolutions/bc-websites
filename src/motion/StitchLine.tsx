// src/motion/StitchLine.tsx
// A running stitch that sews itself down
// the left lane of the page as the visitor scrolls, with a needle at its tip.
//
// The dashed thread is revealed through a solid mask path, so the dashes stay
// crisp while the mask's dash offset does the drawing. The tip is held at 70%
// of the viewport height for the whole run: the trigger starts when the top of
// the wrapper reaches that line and ends when the bottom does.

import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { EASE, gsap, MEDIA, SCRUB, useGSAP } from './gsap'

const MAX_CONTENT = 1200 // matches .wrap max-width
const WAVE = 560 // px of page per half-wave
const SWAY = 9 // px either side of the lane

function lanePath(width: number, height: number): string {
  const containerLeft = Math.max(0, (width - MAX_CONTENT) / 2)
  const x = containerLeft + (width >= 768 ? 44 : 22)
  let d = `M ${x} 0 Q ${x + SWAY} ${WAVE / 2} ${x} ${WAVE}`
  for (let y = WAVE * 2; y < height + WAVE; y += WAVE) d += ` T ${x} ${Math.min(y, height)}`
  return d
}

export default function StitchLine({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)
  const maskPath = useRef<SVGPathElement>(null)
  const needle = useRef<SVGCircleElement>(null)
  const maskId = `stitch${useId().replace(/[^a-zA-Z0-9]/g, '')}`
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const el = root.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize((prev) =>
        Math.abs(prev.width - width) < 1 && Math.abs(prev.height - height) < 1 ? prev : { width, height },
      )
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useGSAP(
    () => {
      const path = maskPath.current
      const dot = needle.current
      if (!path || !dot || !size.height) return

      const mm = gsap.matchMedia()
      mm.add(MEDIA.motion, () => {
        const length = path.getTotalLength()
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
        gsap.set(dot, { autoAlpha: 1 })

        gsap.to(path, {
          strokeDashoffset: 0,
          ease: EASE.scroll,
          scrollTrigger: {
            trigger: root.current,
            start: 'top 70%',
            end: 'bottom 70%',
            scrub: SCRUB.soft,
            onUpdate: (self) => {
              // Progress can be NaN for a frame while the page is mid-layout.
              if (!Number.isFinite(self.progress)) return
              const point = path.getPointAtLength(self.progress * length)
              if (Number.isFinite(point.x) && Number.isFinite(point.y)) gsap.set(dot, { attr: { cx: point.x, cy: point.y } })
            },
          },
        })
      })
      return () => mm.revert()
    },
    { scope: root, dependencies: [size.width, size.height], revertOnUpdate: true },
  )

  const d = size.height ? lanePath(size.width, size.height) : ''

  return (
    <div ref={root} className="relative">
      {children}
      {d && (
        <svg
          className="pointer-events-none absolute inset-0 z-20"
          width={size.width}
          height={size.height}
          aria-hidden="true"
        >
          <defs>
            <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={size.width} height={size.height}>
              <path ref={maskPath} d={d} fill="none" stroke="white" strokeWidth="8" />
            </mask>
          </defs>
          <path
            d={d}
            fill="none"
            stroke="var(--c-thread)"
            strokeWidth="2"
            strokeDasharray="11 8"
            strokeLinecap="round"
            mask={`url(#${maskId})`}
          />
          <circle ref={needle} cx="0" cy="0" r="3.5" fill="var(--c-accent)" stroke="var(--c-light)" strokeWidth="1.5" style={{ visibility: 'hidden' }} />
        </svg>
      )}
    </div>
  )
}
