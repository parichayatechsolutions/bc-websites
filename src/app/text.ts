// src/app/text.ts
// Small helpers for writing a boutique's data into sentences.

/**
 * "Telugu, English and Hindi". With `lower`, words after the first lose their
 * capital unless they're an abbreviation, for lists of common nouns:
 * "Cash, UPI and card", "Aari work, maggam work and zardosi".
 */
export function joinList(items: string[], lower = false): string {
  const words = items.map((item, i) => (!lower || i === 0 || item === item.toUpperCase() ? item : item.toLowerCase()))
  return words.length > 1 ? `${words.slice(0, -1).join(', ')} and ${words.at(-1)}` : words.join('')
}

/** "Opposite City Bus Stand" → "opposite City Bus Stand", to sit mid-sentence. */
export const midSentence = (text: string) => text.charAt(0).toLowerCase() + text.slice(1)

/** "Simple blouse" → "Simple blouse"; "matching saree fall" → "Matching saree fall". */
export const capitalise = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

/** ₹12,000 */
export const rupees = (n: number) => `₹${n.toLocaleString('en-IN')}`
