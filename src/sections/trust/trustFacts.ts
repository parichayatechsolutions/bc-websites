// src/sections/trust/trustFacts.ts
// What the trust components may say about a boutique: only what its data
// says. The design lab filled gaps with stock claims ("trial fitting
// included", "price agreed first", a 4.9 rating); on a real boutique's site
// those are promises to customers that nobody made. So everything here comes
// from the config, and a boutique with thin data gets fewer facts, never
// invented ones.

import {
  IconBolt,
  IconBrandWhatsapp,
  IconCalendarCheck,
  IconCalendarStar,
  IconCoinRupee,
  IconHanger,
  IconLanguage,
  IconNeedleThread,
  IconParking,
  IconRulerMeasure,
  IconStarFilled,
  IconUsers,
  type Icon,
} from '@tabler/icons-react'
import { joinList as list } from '../../app/text'
import type { BoutiqueConfig } from '../../types/boutique'

export interface IFact {
  icon: Icon
  /** Starts with the number, so countUp() can tick it up: "4.8", "8,000+", "7 days". */
  value: string
  label: string
}

export interface IPromise {
  icon: Icon
  title: string
  text: string
}

const STITCHING = /stitch|blouse|tailor|alteration|lehenga|salwar|churidar|kurti|anarkali|frock|gown|sherwani|kurta/i
const HANDWORK = /aari|maggam|zardosi|zari|embroider|mirror|bead|stone|kantha|chikan|cutwork/i

function statIcon(label: string): Icon {
  if (/year/i.test(label)) return IconCalendarStar
  if (/garment|deliver|piece|order|outfit/i.test(label)) return IconHanger
  if (/team|people|tailor|staff/i.test(label)) return IconUsers
  return IconNeedleThread
}

const years = (b: BoutiqueConfig) => (b.established ? new Date().getFullYear() - b.established : 0)
const all = (b: BoutiqueConfig) => b.services.groups.flatMap((g) => g.items)
const expressTime = (b: BoutiqueConfig) => b.pricing?.express?.split(',')[0].trim()

/** Number-led facts for a stat row: rating, years, their own stats, delivery. At most four. */
export function trustFacts(b: BoutiqueConfig): IFact[] {
  const facts: IFact[] = []
  const { googleRating, googleReviewCount } = b.social
  if (googleRating) {
    facts.push({
      icon: IconStarFilled,
      value: googleRating.toFixed(1),
      label: googleReviewCount ? `On Google, from ${googleReviewCount.toLocaleString('en-IN')} reviews` : 'On Google',
    })
  }
  const stats = b.stats ?? []
  if (years(b) > 0 && !stats.some((s) => /year/i.test(s.label))) {
    facts.push({ icon: IconCalendarStar, value: String(years(b)), label: years(b) === 1 ? 'Year stitching' : 'Years stitching' })
  }
  for (const s of stats) facts.push({ icon: statIcon(s.label), value: s.value, label: s.label })
  if (b.pricing?.deliveryDays) {
    facts.push({ icon: IconCalendarCheck, value: `${b.pricing.deliveryDays} days`, label: 'Usual delivery' })
  }
  return facts.slice(0, 4)
}

/** Sentences a customer can rely on, each backed by a field in the config. At most six. */
export function trustPromises(b: BoutiqueConfig): IPromise[] {
  const promises: IPromise[] = []
  const items = all(b)

  if (items.some((item) => STITCHING.test(item))) {
    promises.push({ icon: IconRulerMeasure, title: 'Made to your measurements', text: 'Cut and stitched for you, to fit the way you like.' })
  }
  if (b.pricing?.deliveryDays) {
    const express = expressTime(b)
    promises.push({
      icon: IconCalendarCheck,
      title: `Usually ready in ${b.pricing.deliveryDays} days`,
      text: express ? `Express when you need it: ${b.pricing.express}.` : 'Ask us when you order and we’ll give you a date.',
    })
  }
  const handwork = items.filter((item) => HANDWORK.test(item))
  if (handwork.length) {
    promises.push({ icon: IconNeedleThread, title: 'Handwork', text: `${list(handwork.slice(0, 4), true)}.` })
  }
  if (b.pricing?.paymentModes?.length) {
    promises.push({ icon: IconCoinRupee, title: 'Pay the way you like', text: `${list(b.pricing.paymentModes, true)}.` })
  }
  if (b.contact.languages?.length) {
    promises.push({ icon: IconLanguage, title: 'Talk to us in your language', text: `We speak ${list(b.contact.languages)}.` })
  }
  if (b.branches.some((branch) => branch.parking)) {
    promises.push({ icon: IconParking, title: 'Parking at the store', text: 'Come by car for your fittings.' })
  }
  promises.push({ icon: IconBrandWhatsapp, title: 'Ask on WhatsApp', text: 'Send a photo of a design you like and ask anything.' })
  return promises.slice(0, 6)
}

/** Short proof for one line: "4.8 on Google", "Since 2012", "Ready in 7 days". */
export function trustLine(b: BoutiqueConfig): { icon: Icon; text: string }[] {
  const line: { icon: Icon; text: string }[] = []
  if (b.social.googleRating) line.push({ icon: IconStarFilled, text: `${b.social.googleRating.toFixed(1)} on Google` })
  if (b.established) line.push({ icon: IconCalendarStar, text: `Since ${b.established}` })
  if (all(b).some((item) => STITCHING.test(item))) line.push({ icon: IconRulerMeasure, text: 'Made to measure' })
  if (b.pricing?.deliveryDays) line.push({ icon: IconCalendarCheck, text: `Ready in ${b.pricing.deliveryDays} days` })
  const express = expressTime(b)
  if (express) line.push({ icon: IconBolt, text: `Express in ${express}` })
  return line
}
