// src/theme/fonts.ts
// Approved font pairings. A design in src/designs/ picks one; nothing else
// loads fonts. Each pair is a display face (names, headings, numbers, quotes)
// and a body face (everything else). Add a pair here, with why it suits
// boutiques, rather than naming fonts inside a design.
//
// The display face carries the boutique name at up to 11rem, so it needs
// weight at that size; the body face needs a light, a regular and a semibold.

export interface IFontPair {
  display: string
  body: string
  /** Google Fonts stylesheet for both faces, with only the weights used. */
  href: string
}

export const FONTS = {
  /** Heavy, high-contrast Devanagari-ready serif with a warm humanist sans, both from Indian foundries. Traditional, silk, temple. */
  rozhaMukta: {
    display: 'Rozha One',
    body: 'Mukta',
    href: 'https://fonts.googleapis.com/css2?family=Mukta:wght@300;400;600&family=Rozha+One&display=swap',
  },

  /** Thin, high-contrast old-style serif with a geometric sans. Quiet luxury: the label in a designer's window. */
  cormorantJost: {
    display: 'Cormorant Garamond',
    body: 'Jost',
    href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Jost:wght@300;400;600&display=swap',
  },

  /** Roman inscriptional capitals with a friendly grotesque. Formal and ceremonial, like a wedding invitation. */
  marcellusKarla: {
    display: 'Marcellus',
    body: 'Karla',
    href: 'https://fonts.googleapis.com/css2?family=Karla:wght@300;400;600&family=Marcellus&display=swap',
  },

  /** A modern high-contrast display serif with its own matching sans. Editorial and current, for a boutique that wants to look new. */
  dmSerifSans: {
    display: 'DM Serif Display',
    body: 'DM Sans',
    href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;600&family=DM+Serif+Display&display=swap',
  },
} satisfies Record<string, IFontPair>
