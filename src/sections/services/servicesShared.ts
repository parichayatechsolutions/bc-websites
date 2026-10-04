// src/sections/services/servicesShared.ts
// What the services sections share: prices only with the boutique's
// permission, the delivery line, and the WhatsApp price question.

import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'

export function useServices() {
  const { boutique } = useBoutique()
  const { services, pricing, permissions } = boutique
  const prices = permissions.showPrices ? (pricing?.startingAt ?? []) : []
  const delivery = [
    pricing?.deliveryDays && `Usually ready in ${pricing.deliveryDays} days`,
    pricing?.express && `Express: ${pricing.express}`,
  ]
    .filter(Boolean)
    .join(' · ')

  return {
    groups: services.groups,
    featured: services.featured,
    prices,
    delivery,
    askPrice: whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to know the price for `),
    askAbout: (item: string) => whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to ask about ${item.charAt(0).toLowerCase()}${item.slice(1)}.`),
  }
}

/** The line under any price: prices are where they start. */
export const PRICE_NOTE = 'Starting prices. The final price depends on the design and the handwork.'
