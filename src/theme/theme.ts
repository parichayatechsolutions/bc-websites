// src/theme/theme.ts
// Turns a boutique's brand colours into the full palette every section reads.
//
// A boutique's colours come from its logo, and logos are not designed for
// reading text. So besides the raw brand colours, this derives "safe" variants
// that are nudged darker or lighter until they pass WCAG contrast against the
// background they sit on. Sections use the safe variant whenever brand colour
// is used for text or icons (see docs/DESIGN.md, "Colour roles"). This is what
// lets 500 different palettes all stay readable without anyone checking by hand.

import type { CSSProperties } from 'react'
import type { BoutiqueConfig } from '../types/boutique'

type RGB = [number, number, number]

const toRgb = (hex: string): RGB => {
  const v = hex.replace('#', '')
  const full = v.length === 3 ? [...v].map((c) => c + c).join('') : v
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16)) as RGB
}

const toHex = (rgb: RGB) => '#' + rgb.map((c) => Math.round(c).toString(16).padStart(2, '0')).join('')

/** `amount` of the way from a to b (0 = a, 1 = b). */
const mix = (a: string, b: string, amount: number) => {
  const [x, y] = [toRgb(a), toRgb(b)]
  return toHex(x.map((c, i) => c + (y[i] - c) * amount) as RGB)
}

function luminance(hex: string): number {
  const [r, g, b] = toRgb(hex).map((c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

/** Black or white, whichever reads better on the given background. */
export function readableOn(bg: string): string {
  return contrast(bg, '#ffffff') >= contrast(bg, '#000000') ? '#ffffff' : '#000000'
}

/**
 * The colour, moved step by step toward `toward` until it reaches `ratio`
 * against `bg`. Unchanged if it already passes, so strong brand colours stay
 * exactly as the boutique chose them.
 */
function ensureContrast(color: string, bg: string, ratio: number, toward: string): string {
  for (let step = 0; step <= 20; step++) {
    const candidate = mix(color, toward, step / 20)
    if (contrast(candidate, bg) >= ratio) return candidate
  }
  return toward
}

/** WCAG AA: 4.5 for body text, 3 for large text, icons and graphics. */
const TEXT = 4.5
const GRAPHIC = 3

export function palette(colors: BoutiqueConfig['brand']['colors']) {
  const { primary, accent } = colors
  const dark = colors.dark ?? mix(primary, '#000000', 0.78)
  const light = colors.light ?? mix(primary, '#ffffff', 0.95)
  const primaryInk = ensureContrast(primary, light, TEXT, dark)

  return {
    primary,
    accent,
    dark,
    light,
    onPrimary: readableOn(primary),
    onAccent: readableOn(accent),
    /** Primary for text, icons and filled buttons on the light background. */
    primaryInk,
    onPrimaryInk: readableOn(primaryInk),
    /** Accent for text and icons on the dark background. */
    accentOnDark: ensureContrast(accent, dark, TEXT, light),
    /** The running stitch on the light background. */
    thread: ensureContrast(accent, light, GRAPHIC, dark),
    /** Secondary text on the light background. */
    muted: ensureContrast(mix(dark, light, 0.35), light, TEXT, dark),
  }
}

export function themeStyle(
  colors: BoutiqueConfig['brand']['colors'],
  fonts: { display: string; body: string },
): CSSProperties {
  const p = palette(colors)
  return {
    '--c-primary': p.primary,
    '--c-accent': p.accent,
    '--c-dark': p.dark,
    '--c-light': p.light,
    // A ground with a whisper of the brand in it. Photographs of cloth look
    // dead on a page that is pure neutral, and wrong on one that is properly
    // coloured; this sits between, and stays different for every boutique.
    '--c-paper': mix(p.light, p.primary, 0.045),
    '--c-on-primary': p.onPrimary,
    '--c-on-accent': p.onAccent,
    '--c-primary-ink': p.primaryInk,
    '--c-on-primary-ink': p.onPrimaryInk,
    '--c-accent-on-dark': p.accentOnDark,
    '--c-thread': p.thread,
    '--c-muted': p.muted,
    '--f-display': `'${fonts.display}', Georgia, serif`,
    '--f-body': `'${fonts.body}', system-ui, sans-serif`,
  } as CSSProperties
}

/**
 * Font size for a display line that must fit however long the boutique's
 * name is. Scales down with the square root of the length, so a name four
 * times longer gets half the size, which keeps the block's area roughly even.
 * `base` is the size in vw a ~14-character name gets.
 */
export function fitDisplay(text: string, base = 12, maxRem = 11, minRem = 2.4): CSSProperties {
  const vw = Math.min(base, base * Math.sqrt(14 / Math.max(text.length, 1)))
  return { fontSize: `clamp(${minRem}rem, ${vw.toFixed(2)}vw, ${maxRem}rem)` }
}
