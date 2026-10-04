// src/motion/tokens.ts
// Every GSAP timing on every boutique site comes from here. CSS transitions use
// the matching --ease-stitch and duration classes documented in docs/DESIGN.md.
// If a new animation needs a value that isn't here, the animation is probably
// wrong. Change a token only when you mean it to change everywhere.

export const EASE = {
  /** Things arriving: letters rising, the arch appearing. Fast start, long settle. */
  enter: 'expo.out',
  /** Secondary arrivals that follow the main one. */
  settle: 'power3.out',
  /** A shape changing while the visitor scrolls (the arch opening). */
  morph: 'power2.inOut',
  /** Something leaving as the visitor scrolls past it. */
  exit: 'power1.in',
  /** Anything tied 1:1 to the scrollbar. */
  scroll: 'none',
} as const

export const DURATION = {
  quick: 0.35,
  base: 0.6,
  slow: 1.1,
} as const

/** Stagger between letters or words in a text reveal, or things arriving in turn. */
export const STAGGER = {
  letters: 0.035,
  words: 0.1,
  /** Photos, frames, stars or lines that arrive one after another. */
  items: 0.08,
} as const

/**
 * Where a scroll-started animation begins. `arrive`: when the top of the
 * element is 85% of the way down the screen, so it plays as it comes into
 * view rather than after the visitor has already read past it.
 */
export const TRIGGER = {
  arrive: 'top 85%',
} as const

/**
 * Scroll smoothing for scrubbed animations. `true` follows the scrollbar
 * exactly; a number (seconds) lets the animation catch up softly.
 */
export const SCRUB = {
  exact: true,
  soft: 0.6,
} as const
