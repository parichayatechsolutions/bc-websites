// src/theme/fonts.ts
// Approved font pairings. A boutique's Site.tsx picks one; nothing else loads
// fonts. Each pair is a display face (names, headings, numbers, quotes) and a
// body face (everything else). Add a pair here, with why it suits boutiques,
// rather than naming fonts inside a Site.tsx.

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
} satisfies Record<string, IFontPair>
