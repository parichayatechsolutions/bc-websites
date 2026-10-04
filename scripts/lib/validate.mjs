// scripts/lib/validate.mjs
// Checks one boutique: its config in src/sites/<slug>/, the design its site
// opens in, and its data and photos in boutiques/<slug>/.
//
// Errors are things that would break the site or send customers to the wrong
// place (bad phone number, broken map link). Warnings are things that make
// the site weaker but still work (missing photos, few reviews). A boutique
// with errors must not be shown to its owner.

import { existsSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { designFor } from '../../src/designs/catalog.ts'
import { dataDir, designDir, siteDir } from './paths.mjs'

const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i
const URL = /^https?:\/\/[^\s]+\.[^\s]+$/i
const HEAVY_PHOTO = 1.5 * 1024 * 1024
const HEAVY_VIDEO = 8 * 1024 * 1024

/** Indian mobile or landline with country code, or any international number. */
function validPhone(v) {
  const digits = (v ?? '').replace(/\D/g, '')
  if (/^\+?91/.test((v ?? '').trim())) return digits.length === 12
  return (v ?? '').trim().startsWith('+') && digits.length >= 8 && digits.length <= 15
}

/** Every photo file name the config refers to. */
function referencedPhotos(config) {
  const m = config.media ?? {}
  return [
    config.brand?.logo,
    config.owner?.photo,
    m.hero?.src,
    m.hero?.poster,
    m.storefront,
    m.teamAtWork,
    ...(m.interior ?? []),
    ...(m.work ?? []),
    ...(m.closeups ?? []),
    ...(m.alterations ?? []).flatMap((p) => [p.before, p.after]),
    ...(m.looks ?? []),
    ...(m.drapes ?? []),
    ...(m.groom ?? []),
    ...[...(m.handworkPairs ?? []), ...(m.matching ?? [])].flatMap((p) => [p.first, p.second]),
    ...(config.rentals ?? []).map((r) => r.photo),
    ...(config.fabrics ?? []).map((f) => f.photo),
    ...(config.team ?? []).map((t) => t.photo),
    ...(config.posts ?? []).map((p) => p.photo),
  ].filter(Boolean)
}

export async function validateBoutique(slug) {
  const errors = []
  const warnings = []
  const configPath = join(siteDir(slug), 'config.ts')

  if (!existsSync(configPath)) {
    if (existsSync(join(dataDir(slug), 'data.md'))) warnings.push(`No src/sites/${slug}/config.ts yet. Make it with: npm run config -- ${slug}`)
    else errors.push(`No boutiques/${slug}/data.md and no src/sites/${slug}/config.ts`)
    return { errors, warnings }
  }

  let config
  try {
    // Cache-bust so a config regenerated in the same run is read fresh.
    config = (await import(`${pathToFileURL(configPath).href}?t=${Date.now()}`)).default
  } catch (e) {
    errors.push(`config.ts could not be read: ${e.message}`)
    return { errors, warnings }
  }

  const err = (cond, message) => cond || errors.push(message)
  const warn = (cond, message) => cond || warnings.push(message)

  // Identity
  err(config.slug === slug, `slug is "${config.slug}" but the folder is "${slug}"; they must match`)
  const design = designFor(slug)
  err(existsSync(join(designDir(design), 'Design.tsx')), `Its site opens in the design "${design}", which isn't in src/designs/. Fix the line for this boutique in src/designs/catalog.ts.`)
  err(config.brand?.name?.trim(), 'Boutique name is empty')
  err(config.owner?.name?.trim(), 'Owner name is empty')
  err(HEX.test(config.brand?.colors?.primary ?? ''), `Primary colour "${config.brand?.colors?.primary}" is not a colour code like #7A1F2B`)
  err(HEX.test(config.brand?.colors?.accent ?? ''), `Accent colour "${config.brand?.colors?.accent}" is not a colour code like #C9A24A`)
  for (const key of ['dark', 'light']) {
    const value = config.brand?.colors?.[key]
    if (value) err(HEX.test(value), `${key} colour "${value}" is not a colour code`)
  }

  // Contact: a wrong number here sends customers nowhere
  err(validPhone(config.contact?.phone), `Phone "${config.contact?.phone}" is not a full number with country code, e.g. +91 98765 43210`)
  err(validPhone(config.contact?.whatsapp), `WhatsApp "${config.contact?.whatsapp}" is not a full number with country code`)
  if (config.contact?.email) err(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.contact.email), `Email "${config.contact.email}" doesn't look right`)

  // Branches
  err(config.branches?.length > 0, 'No branches: at least one is needed')
  for (const [i, b] of (config.branches ?? []).entries()) {
    const which = `Branch ${i + 1}${b.name ? ` (${b.name})` : ''}`
    err(b.address?.trim(), `${which}: address is empty`)
    err(b.area?.trim(), `${which}: area / locality is empty. The demo directory groups boutiques by it.`)
    err(b.city?.trim(), `${which}: city is empty`)
    err(b.state?.trim(), `${which}: state is empty`)
    err(/^\d{6}$/.test(b.pincode ?? ''), `${which}: pincode "${b.pincode}" should be 6 digits`)
    if (b.area) {
      warn(!/[/,]/.test(b.area), `${which}: area "${b.area}" holds more than one name. Write the one locality people know; the rest belongs in "Landmark".`)
    }
    if (b.week) {
      err(b.week.length === 7 && b.week.every((d) => d === null || (d.open < d.close && /^\d{2}:\d{2}$/.test(d.open))), `${which}: the day-by-day opening hours are malformed. Re-run: npm run config`)
    } else if (b.hours) {
      warn(false, `${which}: opening hours "${b.hours}" aren't written for every day, so "open now" won't show. Write e.g. Mon–Sat 10am–8pm, Sun closed`)
    }
    err(URL.test(b.mapsUrl ?? ''), `${which}: Google Maps link "${b.mapsUrl ?? ''}" is not a link`)
    if (b.mapsUrl && URL.test(b.mapsUrl)) {
      warn(/google\.[a-z.]+\/maps|maps\.google|goo\.gl|maps\.app/i.test(b.mapsUrl), `${which}: map link doesn't look like Google Maps`)
    }
  }

  // Social links
  const social = config.social ?? {}
  for (const [key, value] of Object.entries(social)) {
    if (typeof value === 'string') err(URL.test(value), `${key} "${value}" is not a full link`)
  }
  if (social.instagram) warn(/instagram\.com\//i.test(social.instagram), `Instagram link doesn't point to instagram.com`)
  if (social.googleRating !== undefined) err(social.googleRating >= 1 && social.googleRating <= 5, `Google rating ${social.googleRating} should be between 1 and 5`)

  // Content that makes the site convincing
  err(config.services?.featured?.length > 0, 'Nothing listed as "most known for"')
  warn((config.services?.featured?.length ?? 0) >= 3, 'Fewer than 3 "most known for" items')
  const reviews = config.reviews ?? config.testimonials ?? []
  warn(reviews.length >= 3, `${reviews.length} customer reviews: 3 or more make the site more convincing`)
  warn((config.media?.work?.length ?? 0) >= 5, `${config.media?.work?.length ?? 0} work photos listed: 5 or more are recommended`)
  if (config.bridalPackages?.some((p) => p.price) && !config.permissions?.showPrices) {
    warnings.push('Bridal packages have prices, but permission to show prices is "no", so the prices are hidden')
  }

  if (!config.permissions?.showPrices) {
    if (config.alterationPrices?.length) warnings.push('Alteration prices are listed, but permission to show prices is "no", so they are hidden')
    if (config.classes?.some((c) => c.fee)) warnings.push('Class fees are listed, but permission to show prices is "no", so they are hidden')
  }
  for (const l of config.leadTimes ?? []) {
    warn(l.weeks <= 52, `Lead time for "${l.item}" is ${l.weeks} weeks. Check it: the planner counts back from the wedding date.`)
  }
  for (const c of config.classes ?? []) {
    if (c.nextBatch) warn(c.nextBatch >= new Date().toISOString().slice(0, 10), `Class "${c.name}": the next batch (${c.nextBatch}) has started. Update the date in data.md.`)
  }

  // Offers: a stale offer on the site is a promise the shop won't keep
  const today = new Date().toISOString().slice(0, 10)
  for (const offer of config.offers ?? []) {
    if (offer.until) {
      err(/^\d{4}-\d{2}-\d{2}$/.test(offer.until), `Offer "${offer.title}": last day "${offer.until}" should be written yyyy-mm-dd`)
      warn(offer.until >= today, `Offer "${offer.title}" ended on ${offer.until}. The site no longer shows it; remove it from data.md.`)
    }
  }

  if (config.owner?.photo && !config.permissions?.showOwnerPhoto) {
    warnings.push("An owner photo is listed but permission to show it is \"no\", so it won't be shown")
  }

  // Photos
  const photosDir = join(dataDir(slug), 'photos')
  const files = existsSync(photosDir) ? readdirSync(photosDir).filter((f) => !f.startsWith('.')) : []
  const referenced = [...new Set(referencedPhotos(config))]
  const missing = referenced.filter((f) => !files.includes(f))

  // A generated stand-in stands in for the real photograph of the same name.
  const standIns = new Map(
    files
      .filter((f) => f.startsWith('ai-'))
      .map((f) => [f.slice(3).replace(/\.[^.]+$/, ''), f]),
  )
  const stillMissing = missing.filter((f) => !standIns.has(f.replace(/\.[^.]+$/, '')))
  const covered = missing.filter((f) => standIns.has(f.replace(/\.[^.]+$/, '')))

  const unused = files.filter(
    (f) => !referenced.includes(f) && f !== 'photos-prompt.md' && !(f.startsWith('ai-') && covered.some((c) => `ai-${c.replace(/\.[^.]+$/, '')}` === f.replace(/\.[^.]+$/, ''))),
  )
  if (unused.length) warnings.push(`In photos/ but not used by the site: ${unused.join(', ')}`)

  if (stillMissing.length) {
    warnings.push(`Photos still to add to boutiques/${slug}/photos/: ${stillMissing.join(', ')}. Prompts for stand-ins: npm run prompts -- ${slug}`)
  }

  // A generated stand-in may stand in for work, never for a person.
  const people = (config.team ?? []).map((t) => t.photo).filter(Boolean)
  const fakePeople = covered.filter((f) => people.includes(f) || f === config.owner?.photo)
  if (fakePeople.length) {
    errors.push(`${fakePeople.join(', ')} ${fakePeople.length === 1 ? 'is a photo of a person standing in as a generated image' : 'are photos of people standing in as generated images'}. Remove the ai- file; a person's photo must be real.`)
  }

  if (covered.length) {
    const message = `${covered.length} photo${covered.length === 1 ? ' is' : 's are'} still a generated stand-in (ai-*). Replace with the boutique's real work before they sign.`
    // Once they've bought it, generated pictures of work they didn't make
    // would be shown to their customers as theirs. That is not a warning.
    if (config.demo?.sold) errors.push(message)
    else warnings.push(message)
  }

  const lonely = files
    .map((f) => f.match(/^(before|after)-(\d+)\./))
    .filter(Boolean)
    .filter(([, side, n]) => !files.some((g) => g.startsWith(`${side === 'before' ? 'after' : 'before'}-${n}.`)))
  if (lonely.length) {
    warnings.push(`Before and after photos come in pairs; these have no partner, so they aren't shown: ${lonely.map((m) => m.input).join(', ')}`)
  }

  for (const f of files) {
    const size = statSync(join(photosDir, f)).size
    const video = /\.(mp4|webm)$/i.test(f)
    const mb = (size / 1024 / 1024).toFixed(1)
    if (video ? size > HEAVY_VIDEO : size > HEAVY_PHOTO) warnings.push(`${f} is ${mb} MB, heavy for phones on mobile data`)
    if (/\.(heic|heif)$/i.test(f)) errors.push(`${f} is an iPhone HEIC photo, which browsers can't show. Export it as JPG`)
    if (/\s|[A-Z]/.test(f)) warnings.push(`"${f}": use lowercase names without spaces, as in the shot list`)
  }

  // Launch safety
  warn(config.demo?.noindex === true, 'demo.noindex is off: this site can appear on Google. Only do this after the boutique has signed')

  return { errors, warnings }
}
