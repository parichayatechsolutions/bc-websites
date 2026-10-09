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
    href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Jost:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap',
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

  /** A sturdy Devanagari-ready serif with a clean geometric sans, both from the Indian Type Foundry. Warm and festive without being heavy: the saree-border designs. */
  lailaPoppins: {
    display: 'Laila',
    body: 'Poppins',
    href: 'https://fonts.googleapis.com/css2?family=Laila:wght@600&family=Poppins:wght@300;400;600&display=swap',
  },

  /** A bold, high-contrast display serif with a friendly grotesque. Confident and young, for a boutique that leads with range and price. */
  yesevaWork: {
    display: 'Yeseva One',
    body: 'Work Sans',
    href: 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;600&family=Yeseva+One&display=swap',
  },

  /** A dark, newsy display serif with a plain modern sans. Reads like a well-set newspaper: the type-led design for boutiques with few photographs. */
  gloockFigtree: {
    display: 'Gloock',
    body: 'Figtree',
    href: 'https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;600&family=Gloock&display=swap',
  },

  /** A couture Didone with a tight modern sans. Fashion-magazine luxury, for the bridal design. */
  bodoniInter: {
    display: 'Bodoni Moda',
    body: 'Inter Tight',
    href: 'https://fonts.googleapis.com/css2?family=Bodoni+Moda:wght@500;700&family=Inter+Tight:wght@300;400;600&display=swap',
  },
} satisfies Record<string, IFontPair>
