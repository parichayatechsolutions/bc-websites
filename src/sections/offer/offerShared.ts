// src/sections/offer/offerShared.ts
// The offers a boutique is running today. An offer is a promise to the
// shop's customers, so the sections show only what's in the config, and an
// offer disappears the day after its last day, by the visitor's own date,
// whether or not anyone remembers to take it out of data.md.

import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import type { Offer } from '../../types/boutique'

/** Today as yyyy-mm-dd in the visitor's time zone. */
const today = () => new Date().toLocaleDateString('en-CA')

export function useOffers() {
  const { boutique } = useBoutique()
  const offers = (boutique.offers ?? []).filter((o) => !o.until || o.until >= today())
  const ask = (offer: Offer) => whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to know more about your offer: ${offer.title}`)
  return { offers, ask }
}

/** "Until 31 January", with the year only when it isn't this year. */
export function untilText(until?: string): string | undefined {
  if (!until) return undefined
  const date = new Date(`${until}T00:00:00`)
  const year = date.getFullYear() !== new Date().getFullYear()
  return `Until ${date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', ...(year ? { year: 'numeric' } : {}) })}`
}
