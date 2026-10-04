// src/sections/bridal/bridalShared.ts
// What the bridal sections share: the packages, whether prices may be
// shown, the WhatsApp messages, and whether this boutique does bridal work
// at all (for the consult invitation, which needs no packages).

import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import type { BridalPackage } from '../../types/boutique'

const BRIDAL = /bridal|bride|wedding|muhurtham|trousseau/i

export function useBridal() {
  const { boutique } = useBoutique()
  const packages = boutique.bridalPackages ?? []
  const showPrices = boutique.permissions.showPrices
  const doesBridal =
    packages.length > 0 ||
    [...boutique.services.featured, ...boutique.services.groups.flatMap((g) => g.items)].some((item) => BRIDAL.test(item))

  return {
    packages,
    doesBridal,
    /** "From ₹12,000", or nothing when prices are private or missing. */
    price: (p: BridalPackage) => (showPrices && p.price ? `From ${rupees(p.price)}` : undefined),
    pricesShown: showPrices && packages.some((p) => p.price),
    ask: (p: BridalPackage) => whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to know more about your ${p.name} bridal package.`),
    consult: whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to book a bridal consult. My wedding is on `),
  }
}
