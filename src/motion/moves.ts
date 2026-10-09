// src/motion/moves.ts
// The supporting moves sections share, rebuilt in GSAP from the design lab's
// alive.js (docs/COMPONENTS.md maps each lab motion to one of these). Every
// timing comes from tokens.ts, so a move looks the same in every section.
//
// Call them inside useMotion(), never on their own: that is what keeps them
// away from visitors who prefer reduced motion, who see the resting markup.
// Each returns its GSAP animation, so it can be placed on a timeline.
//
// Pass `trigger` to play once when that element scrolls into view. Leave it
// out to play on load, which only the page opener should do.
//
// These are supporting moves, not a page's signature motion. A section uses
// one or two; a page where every section wipes in is the fade-up-everywhere
// pattern DESIGN.md forbids, by another name.

import { DURATION, EASE, gsap, SCRUB, SplitText, STAGGER, TRIGGER } from './gsap'

export interface IMove {
  /** Play once when this element scrolls into view. Leave out to play on load (page openers only). */
  trigger?: gsap.DOMTarget
  /** Seconds to wait, to line up with another move. */
  delay?: number
}

function when({ trigger, delay = 0 }: IMove): { delay: number; scrollTrigger?: ScrollTrigger.Vars } {
  return trigger ? { delay, scrollTrigger: { trigger, start: TRIGGER.arrive, once: true } } : { delay }
}

/**
 * Letters (or words) rise into place from under a mask. The boutique name in
 * an opener. Letters for short names in a heavy face; words read better for
 * long names and light faces.
 */
export function rise(target: gsap.DOMTarget, { by = 'letters', ...move }: IMove & { by?: 'letters' | 'words' } = {}) {
  const letters = by === 'letters'
  const split = SplitText.create(target, letters ? { type: 'words,chars', mask: 'chars' } : { type: 'words', mask: 'words' })
  return gsap.from(letters ? split.chars : split.words, {
    yPercent: letters ? 110 : 115,
    duration: DURATION.slow,
    ease: EASE.enter,
    stagger: letters ? STAGGER.letters : STAGGER.words,
    ...when(move),
  })
}

/**
 * Words come into focus, softer than rise. Words rather than letters: blur is
 * expensive to draw, and mid-range phones stutter on one blur per letter.
 */
export function blurIn(target: gsap.DOMTarget, move: IMove = {}) {
  const split = SplitText.create(target, { type: 'words' })
  return gsap.from(split.words, {
    autoAlpha: 0,
    filter: 'blur(10px)',
    duration: DURATION.slow,
    ease: EASE.enter,
    stagger: STAGGER.words,
    ...when(move),
  })
}

/**
 * A number ticks up to its value: "4.8", "1,200+", "25 years". Whatever is
 * written in the element is the value, and stays there for reduced motion.
 * Text that doesn't start with a number is left alone. Give the element
 * `tabular-nums` so it doesn't change width while counting.
 */
export function countUp(targets: gsap.DOMTarget, move: IMove = {}) {
  const restores: (() => void)[] = []
  const restoreAll = () => restores.forEach((restore) => restore())
  // Put the real text back however the count ends: finished, or cut short
  // because the section unmounted or reduced motion was switched on.
  const tl = gsap.timeline({ ...when(move), onComplete: restoreAll, onInterrupt: restoreAll })
  for (const el of gsap.utils.toArray<HTMLElement>(targets)) {
    const written = el.textContent ?? ''
    const parts = written.match(/^(\D*)(\d[\d,]*(?:\.\d+)?)(.*)$/s)
    if (!parts) continue
    const [, before, digits, after] = parts
    const value = Number(digits.replace(/,/g, ''))
    if (!value) continue
    const decimals = digits.split('.')[1]?.length ?? 0
    const format = (n: number) =>
      digits.includes(',')
        ? n.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        : n.toFixed(decimals)
    const show = (n: number) => (el.textContent = before + format(n) + after)
    restores.push(() => (el.textContent = written))

    const counter = { n: 0 }
    show(0)
    tl.to(counter, { n: value, duration: DURATION.slow, ease: EASE.enter, onUpdate: () => show(counter.n) }, 0)
  }
  return tl
}

/**
 * A photo eases down from slightly too close. Animate the image inside an
 * `overflow-hidden` frame, not the frame, so the layout doesn't move.
 */
function hasTargets(targets: gsap.DOMTarget): boolean {
  if (!targets) return false
  if (typeof targets === 'string') {
    if (typeof document === 'undefined') return false
    return document.querySelectorAll(targets).length > 0
  }
  if (Array.isArray(targets) || (typeof NodeList !== 'undefined' && targets instanceof NodeList)) {
    return targets.length > 0
  }
  return true
}

export function settle(targets: gsap.DOMTarget, move: IMove = {}) {
  if (!hasTargets(targets)) return undefined
  return gsap.from(targets, { scale: 1.25, duration: DURATION.slow, ease: EASE.enter, stagger: STAGGER.items, ...when(move) })
}

/** Frames uncover from one edge, one after another. The lab's "Photos wipe up". */
export function wipe(targets: gsap.DOMTarget, { from = 'bottom', ...move }: IMove & { from?: 'bottom' | 'top' | 'left' } = {}) {
  if (!hasTargets(targets)) return undefined
  const start = { bottom: 'inset(100% 0% 0% 0%)', top: 'inset(0% 0% 100% 0%)', left: 'inset(0% 100% 0% 0%)' }[from]
  return gsap.from(targets, { clipPath: start, duration: DURATION.slow, ease: EASE.enter, stagger: STAGGER.items, ...when(move) })
}

/**
 * A line, border or frame draws itself out: zari borders, dotted price
 * leaders, threads. Uses a clip rather than a scale, so dashes and woven
 * patterns are uncovered instead of squashed.
 */
export function draw(targets: gsap.DOMTarget, { from = 'centre', ...move }: IMove & { from?: 'centre' | 'start' | 'top' } = {}) {
  if (!hasTargets(targets)) return undefined
  const start = { centre: 'inset(0% 50% 0% 50%)', start: 'inset(0% 100% 0% 0%)', top: 'inset(0% 0% 100% 0%)' }[from]
  return gsap.from(targets, { clipPath: start, duration: DURATION.slow, ease: EASE.morph, stagger: STAGGER.items, ...when(move) })
}

/**
 * Hanging things settle from a small swing: swing tags, pinned notes, garments
 * on a rail. One easing out, no wobble back (DESIGN.md: no spring overshoot).
 */
export function sway(targets: gsap.DOMTarget, move: IMove = {}) {
  if (!hasTargets(targets)) return undefined
  return gsap.from(targets, {
    rotation: (i: number) => (i % 2 ? 5 : -5),
    transformOrigin: '50% 0%',
    duration: DURATION.slow,
    ease: EASE.enter,
    stagger: STAGGER.items,
    ...when(move),
  })
}

/** Rating stars appear one by one. */
export function starsIn(targets: gsap.DOMTarget, move: IMove = {}) {
  if (!hasTargets(targets)) return undefined
  return gsap.from(targets, { autoAlpha: 0, scale: 0.6, duration: DURATION.quick, ease: EASE.settle, stagger: STAGGER.items, ...when(move) })
}

/**
 * A photo drifts inside its frame while the frame scrolls past. The target
 * must be taller than its frame (e.g. `absolute inset-x-0 -top-[6%] h-[112%]`)
 * so no edge shows. Photos only: DESIGN.md forbids parallax on text.
 */
export function drift(targets: gsap.DOMTarget, { trigger, amount = 8 }: { trigger: gsap.DOMTarget; amount?: number }) {
  return gsap.to(targets, {
    yPercent: -amount,
    ease: EASE.scroll,
    scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: SCRUB.soft },
  })
}
