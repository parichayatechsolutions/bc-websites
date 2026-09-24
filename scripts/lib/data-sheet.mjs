// scripts/lib/data-sheet.mjs
// Reads a filled boutique data sheet (boutiques/<slug>/data.md) into a plain
// object, and turns that into a BoutiqueConfig.
//
// The sheet is filled in by people, not machines, so the parser is forgiving:
// a field matches by the start of its label, whether the person kept the full
// label from the template or shortened it; "NA", "-" and blanks count as empty;
// ticks can be [x] or [X]. Anything it can't make sense of is reported, never
// guessed silently.

// ─── Reading the sheet ───────────────────────────────────────

const EMPTY = /^(na|n\/a|nil|none|-|–|—|not applicable|\?)?$/i

const clean = (value) => {
  const v = (value ?? '').trim()
  return EMPTY.test(v) ? undefined : v
}

/** The label a field is matched by: the template label up to its first "(" or ":". */
const shortLabel = (label) => label.split(/[(:]/)[0].trim().toLowerCase()

/**
 * Value of the line whose label starts with `label`. Handles both
 * "- ★ Short story: how and why they started (…): <answer>" (full template label kept)
 * and "- Short story: <answer>" (label shortened).
 */
function field(lines, label) {
  const short = shortLabel(label)
  for (const raw of lines) {
    const line = raw.replace(/^\s*-\s*/, '').replace(/^★\s*/, '').trim()
    if (!line.toLowerCase().startsWith(short)) continue
    // Full template label kept, which may itself contain a colon.
    const afterFull = line.toLowerCase().startsWith(label.toLowerCase()) && line.slice(label.length).match(/^\s*:(.*)$/)
    if (afterFull) return clean(afterFull[1])
    // Shortened label, optionally followed by the template's "(hint)".
    // Anything else between label and colon means it's a different field
    // that starts the same way ("Instagram" vs "Instagram followers").
    const match = line.slice(short.length).match(/^\s*(\([^)]*\))?\s*:(.*)$/)
    if (match) return clean(match[2])
  }
  return undefined
}

/** Split into { number: lines[] } by "## 3. Location" headings. */
function sections(markdown) {
  const out = {}
  let current = null
  for (const line of markdown.split('\n')) {
    const heading = line.match(/^##\s+(\d+)\./)
    if (heading) {
      current = Number(heading[1])
      out[current] = []
    } else if (current !== null) {
      out[current].push(line)
    }
  }
  return out
}

/** Split lines into blocks by "### " headings, e.g. one block per branch. */
function blocks(lines) {
  const out = []
  for (const line of lines) {
    if (/^###\s+/.test(line)) out.push([])
    else if (out.length) out[out.length - 1].push(line)
  }
  return out
}

/** { 'Women': ['Designer blouse', …] } from "**Women**" headings followed by "- [x] …" lines. */
function ticked(lines) {
  const groups = {}
  let group = null
  for (const line of lines) {
    const heading = line.match(/^\*\*(.+?)\*\*\s*$/)
    if (heading) {
      group = heading[1].trim()
      continue
    }
    const box = line.match(/^\s*-\s*\[([ xX✓✔])\]\s*(.+)$/)
    if (box && group && box[1] !== ' ') (groups[group] ??= []).push(box[2].trim())
  }
  return groups
}

/** Numbered lines after the line containing `after`, e.g. the top-3 list. */
function numberedAfter(lines, after) {
  const start = lines.findIndex((l) => l.toLowerCase().includes(after.toLowerCase()))
  if (start === -1) return []
  const out = []
  for (const line of lines.slice(start + 1)) {
    const item = line.match(/^\s*\d+\.\s*(.*)$/)
    if (!item) break
    if (clean(item[1])) out.push(item[1].trim())
  }
  return out
}

export function readSheet(markdown) {
  const s = sections(markdown)
  const get = (n, label) => field(s[n] ?? [], label)

  const branches = blocks(s[3] ?? [])
    .map((b) => ({
      name: field(b, 'Branch name / area'),
      address: field(b, 'Full address'),
      landmark: field(b, 'Landmark'),
      area: field(b, 'Area / locality'),
      city: field(b, 'City'),
      state: field(b, 'State'),
      pincode: field(b, 'Pincode'),
      mapsUrl: field(b, 'Google Maps link'),
      hours: field(b, 'Opening hours'),
      parking: field(b, 'Parking available?'),
    }))
    .filter((b) => Object.values(b).some(Boolean))

  const reviews = (s[8] ?? [])
    .map((l) => l.match(/^\s*\d+\.\s*Name:\s*(.*?)\s*\|\s*Review:\s*(.*)$/i))
    .filter(Boolean)
    .map((m) => ({ name: clean(m[1]), text: clean(m[2]) }))
    .filter((r) => r.name && r.text)

  return {
    name: get(1, 'Boutique name'),
    localName: get(1, 'Name in local language'),
    owner: get(1, 'Owner name(s)'),
    ownerRole: get(1, "Owner's role"),
    yearStarted: get(1, 'Year started'),
    tagline: get(1, 'Tagline or slogan'),
    story: get(1, 'Short story: how and why they started (2–4 lines, in the owner\'s words if possible)'),
    different: get(1, 'What makes them different'),

    phone: get(2, 'Phone number'),
    whatsapp: get(2, 'WhatsApp number'),
    email: get(2, 'Email'),
    languages: get(2, 'Languages spoken at the store'),

    branches,

    instagram: get(4, 'Instagram'),
    facebook: get(4, 'Facebook'),
    youtube: get(4, 'YouTube'),
    googleBusiness: get(4, 'Google Business profile'),
    googleRating: get(4, 'Google rating'),
    googleReviews: get(4, 'Number of Google reviews'),

    stitched: ticked(s[5] ?? []),
    others: get(5, 'Others'),
    topThree: numberedAfter(s[5] ?? [], 'Top 3 things'),

    priceSimple: get(6, 'Starting price for a simple blouse'),
    priceDesigner: get(6, 'Starting price for a designer blouse'),
    priceBridal: get(6, 'Starting price for bridal work'),
    delivery: get(6, 'Normal delivery time'),
    express: get(6, 'Express delivery time and extra charge'),
    payment: get(6, 'Payment modes'),

    years: get(7, 'Years in business'),
    orders: get(7, 'Total customers / orders delivered'),
    teamSize: get(7, 'Team size'),

    reviews,

    colours: get(9, 'If yes, colour names or codes'),

    okDemo: get(10, 'Owner agreed that we can prepare a demo website for them?'),
    okPhotos: get(10, 'OK to use their photos and logo in the demo?'),
    okOwnerPhoto: get(10, "OK to show the owner's photo?"),
    okPrices: get(10, 'OK to show prices on the site?'),

    sold: get(11, 'Website sold?'),

    collectorNotes: {
      collectedBy: get(11, 'Collected by'),
      date: get(11, 'Date'),
      decisionMaker: get(11, 'Decision maker'),
      interestLevel: get(11, 'Interest level'),
      existingWebsite: get(11, 'Do they already have a website?'),
      goal: get(11, 'What they want most from a website'),
      followUpDate: get(11, 'Follow-up date'),
      notes: get(11, 'Anything else we should know'),
    },
  }
}

// ─── Turning it into a config ────────────────────────────────

const yes = (v) => /^(y|yes|haan|ok|okay|true)\b/i.test(v ?? '')

/** First number in the text: "₹1,200" → 1200, "7–10 days" → 7, "4.8 stars" → 4.8. */
const number = (v) => {
  const match = (v ?? '').replace(/,/g, '').match(/\d+(\.\d+)?/)
  return match ? Number(match[0]) : undefined
}

/** "Telugu, English and Hindi" → ['Telugu', 'English', 'Hindi'] */
const list = (v) =>
  (v ?? '')
    .split(/,|\/|\band\b/i)
    .map((x) => x.trim())
    .filter(Boolean)

/**
 * A place name written the same way every time, so that "Kengeri  Satellite Town."
 * and "Kengeri Satellite Town" group together in the demo directory's filters.
 */
const place = (v) => (v ?? '').replace(/\s+/g, ' ').replace(/[.,;]+$/, '').trim()

/** Free text split on commas only, since items may contain "and". */
const commaList = (v) =>
  (v ?? '')
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean)

/**
 * Indian numbers in one format, "+91 98765 43210", whatever way they were
 * written ("98765-43210", "09876543210", "919876543210"). WhatsApp links need
 * the country code. Anything else is returned as written for the validator
 * to flag.
 */
export function formatPhone(v) {
  if (!v) return v
  let digits = v.replace(/\D/g, '')
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2)
  if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1)
  if (digits.length === 10) return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`
  return v.trim()
}

/** "@priya.designs", "instagram.com/priya.designs" or a full link → a full https link. */
function socialUrl(v, site) {
  if (!v) return undefined
  if (/^https?:\/\//i.test(v)) return v
  if (/^(www\.)?[\w-]+\.[a-z]{2,}\//i.test(v)) return `https://${v}`
  const handle = v.replace(/^@/, '').trim()
  return /^[\w.]+$/.test(handle) ? `https://${site}/${handle}` : v
}

/** "Mirror / bead / stone work" → "Mirror, bead and stone work"; "Blouse (simple)" → "Blouse". */
function serviceName(item) {
  const plain = item.replace(/\s*\((simple)\)\s*$/i, '')
  const parts = plain.split(/\s*\/\s*/)
  if (parts.length === 1) return plain
  return parts.slice(0, -1).join(', ') + ' and ' + parts.at(-1)
}

const GROUP_TITLES = {
  Women: 'Women',
  Kids: 'Kids',
  Men: 'Men',
  'Embroidery and handwork': 'Handwork',
  'Other services': 'Services',
}

/**
 * Common colour names the team may write instead of codes. Approximate:
 * the generator warns whenever it uses one, so someone checks against the logo.
 */
const COLOUR_NAMES = {
  maroon: '#7A1F2B', wine: '#5E1A2E', red: '#B3261E', 'rani pink': '#C2185B', pink: '#D8577E',
  magenta: '#A0206E', purple: '#5B2A6E', lavender: '#9C88C4', 'peacock blue': '#0F5E73',
  navy: '#1F2A55', 'royal blue': '#2B4BA8', blue: '#2B5BA8', teal: '#1F7A7A',
  'bottle green': '#1F4D3A', 'deep green': '#1F4D3A', green: '#2E6B4F', 'mint green': '#8CC7A9',
  mustard: '#C99A2E', gold: '#C9A24A', golden: '#C9A24A', yellow: '#E0B000', orange: '#D2691E',
  peach: '#F2B38F', copper: '#B06A3B', brown: '#6B4226', black: '#1A1A1A', silver: '#9CA3AF',
}

function parseColours(text) {
  if (!text) return { colours: [], approximate: false }
  const hexes = text.match(/#[0-9a-f]{6}\b|#[0-9a-f]{3}\b/gi) ?? []
  if (hexes.length >= 2) return { colours: hexes.map((h) => h.toUpperCase()), approximate: false }

  // Longest names first so "peacock blue" wins over "blue".
  const lower = text.toLowerCase()
  const found = Object.keys(COLOUR_NAMES)
    .sort((a, b) => b.length - a.length)
    .reduce(
      (acc, name) => {
        const at = acc.rest.indexOf(name)
        if (at === -1) return acc
        return {
          rest: acc.rest.slice(0, at) + ' '.repeat(name.length) + acc.rest.slice(at + name.length),
          hits: [...acc.hits, { at, hex: COLOUR_NAMES[name] }],
        }
      },
      { rest: lower, hits: [] },
    )
    .hits.sort((a, b) => a.at - b.at)
    .map((h) => h.hex)

  return { colours: [...hexes.map((h) => h.toUpperCase()), ...found], approximate: found.length > 0 }
}

/**
 * Photos: use the files that exist in photos/. Where a shot from the list in
 * the data sheet hasn't been taken yet, name it anyway, so the site shows a
 * labelled placeholder and the validator lists it as missing.
 */
function mediaFor(files, sheet) {
  const stems = new Map(files.map((f) => [f.replace(/\.[^.]+$/, ''), f]))
  const has = (stem) => stems.get(stem)
  const numbered = (prefix, fallback) => {
    const found = [...stems.keys()].filter((s) => new RegExp(`^${prefix}-\\d+$`).test(s)).sort()
    return found.length ? found.map((s) => stems.get(s)) : fallback
  }

  const work = numbered('work', ['work-01.jpg', 'work-02.jpg', 'work-03.jpg', 'work-04.jpg', 'work-05.jpg'])
  const isVideo = (file) => /\.(mp4|webm)$/i.test(file ?? '')
  const video = has('video-01') ?? (isVideo(has('ai-hero')) ? has('ai-hero') : undefined)
  const hero = video
    ? { type: 'video', src: video, poster: has('ai-hero-poster') ?? work[0] }
    : { type: 'image', src: has('ai-hero') ?? work[0] }

  return {
    hero,
    storefront: has('storefront') ?? 'storefront.jpg',
    interior: numbered('interior', ['interior-1.jpg', 'interior-2.jpg']),
    teamAtWork: has('team-at-work') ?? 'team-at-work.jpg',
    work,
    closeups: numbered('closeup', ['closeup-01.jpg', 'closeup-02.jpg']),
    ownerPhoto: yes(sheet.okOwnerPhoto) ? (has('owner') ?? 'owner.jpg') : undefined,
    logo: has('logo') ?? 'logo.png',
  }
}

const drop = (obj) => {
  if (Array.isArray(obj)) return obj
  if (obj && typeof obj === 'object') {
    const out = {}
    for (const [k, v] of Object.entries(obj)) {
      const value = drop(v)
      if (value === undefined) continue
      if (Array.isArray(value) && value.length === 0 && !['testimonials', 'reviews', 'work'].includes(k)) continue
      if (value && typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0) continue
      out[k] = value
    }
    return out
  }
  return obj
}

/**
 * Returns { config, errors, warnings }. `errors` are required fields that
 * are missing or unreadable; a config with errors is not written.
 */
export function toConfig(sheet, { slug, photoFiles }) {
  const errors = []
  const warnings = []
  const need = (value, what) => {
    if (!value) errors.push(`Missing ${what}`)
    return value ?? ''
  }

  const name = need(sheet.name, 'boutique name')
  const ownerName = need(sheet.owner, 'owner name')
  const phone = formatPhone(need(sheet.phone, 'phone number'))

  const { colours, approximate } = parseColours(sheet.colours)
  if (colours.length < 2) {
    errors.push(
      'Missing brand colours: write two colour codes (e.g. #7A1F2B and #C9A24A) or two colour names under "If yes, colour names or codes"',
    )
  } else if (approximate) {
    warnings.push(`Brand colours were written as names and turned into approximate codes (${colours.slice(0, 2).join(', ')}). Check them against the logo.`)
  }

  if (sheet.okDemo && !yes(sheet.okDemo)) errors.push('The owner has not agreed to a demo (section 10)')
  if (!sheet.okDemo) errors.push('Missing permission: "Owner agreed that we can prepare a demo website" (section 10)')

  const branches = sheet.branches.map((b, i) => ({
    name: need(b.name, `branch ${i + 1} name / area`),
    address: need(b.address, `branch ${i + 1} full address`),
    landmark: b.landmark,
    area: place(need(b.area, `branch ${i + 1} area / locality`)),
    city: place(need(b.city, `branch ${i + 1} city`)),
    state: place(need(b.state, `branch ${i + 1} state`)),
    pincode: (b.pincode ?? '').replace(/\s+/g, ''),
    mapsUrl: need(b.mapsUrl, `branch ${i + 1} Google Maps link`),
    hours: b.hours,
    parking: b.parking ? yes(b.parking) : undefined,
  }))
  if (!branches.length) errors.push('Missing a branch: fill in at least "Branch 1 (main)"')
  branches.forEach((b, i) => {
    if (!b.pincode) errors.push(`Missing branch ${i + 1} pincode`)
    // The area is what the demo directory groups boutiques by, so one name only.
    if (b.area.includes('/') || b.area.includes(',')) {
      warnings.push(`Branch ${i + 1} area "${b.area}" has more than one name in it. Write the one locality people know, and put the rest in "Landmark".`)
    }
  })

  const whatsapp = !sheet.whatsapp || /^same/i.test(sheet.whatsapp) ? phone : formatPhone(sheet.whatsapp)

  const groups = Object.entries(sheet.stitched)
    .filter(([title]) => GROUP_TITLES[title])
    .map(([title, items]) => ({ title: GROUP_TITLES[title], items: items.map(serviceName) }))
  const others = commaList(sheet.others)
  if (others.length) {
    const services = groups.find((g) => g.title === 'Services')
    if (services) services.items.push(...others)
    else groups.push({ title: 'Services', items: others })
  }
  if (!groups.length) warnings.push('Nothing is ticked in section 5 (What they stitch)')
  if (sheet.topThree.length === 0) errors.push('Missing the top 3 things they are known for (section 5)')

  const prices = [
    ['Simple blouse', sheet.priceSimple],
    ['Designer blouse', sheet.priceDesigner],
    ['Bridal work', sheet.priceBridal],
  ]
    .map(([item, v]) => ({ item, price: number(v) }))
    .filter((p) => p.price)

  const stats = [
    sheet.years && { value: sheet.years, label: 'Years stitching' },
    sheet.orders && { value: sheet.orders, label: 'Garments delivered' },
    sheet.teamSize && { value: sheet.teamSize, label: 'People on our team' },
  ].filter(Boolean)

  const established = number(sheet.yearStarted)
  const media = mediaFor(photoFiles, sheet)

  const config = drop({
    slug,
    brand: {
      name,
      localName: sheet.localName,
      tagline: sheet.tagline,
      logo: media.logo,
      colors: { primary: colours[0] ?? '#7A1F2B', accent: colours[1] ?? '#C9A24A' },
    },
    owner: {
      name: ownerName,
      role: sheet.ownerRole,
      photo: media.ownerPhoto,
      story: sheet.story,
    },
    highlight: sheet.different,
    established: established && established > 1900 && established <= new Date().getFullYear() ? established : undefined,
    contact: {
      phone,
      whatsapp,
      email: sheet.email,
      languages: list(sheet.languages),
    },
    branches,
    social: {
      instagram: socialUrl(sheet.instagram, 'instagram.com'),
      facebook: socialUrl(sheet.facebook, 'facebook.com'),
      youtube: socialUrl(sheet.youtube, 'youtube.com'),
      googleBusiness: socialUrl(sheet.googleBusiness, 'g.page'),
      googleRating: number(sheet.googleRating),
      googleReviewCount: number(sheet.googleReviews),
    },
    services: { featured: sheet.topThree, groups },
    pricing: {
      startingAt: prices,
      deliveryDays: number(sheet.delivery),
      express: sheet.express,
      paymentModes: list(sheet.payment),
    },
    stats,
    reviews: sheet.reviews,
    testimonials: sheet.reviews,
    media: {
      hero: media.hero,
      storefront: media.storefront,
      interior: media.interior,
      teamAtWork: media.teamAtWork,
      work: media.work,
      closeups: media.closeups,
    },
    permissions: {
      showOwnerPhoto: yes(sheet.okOwnerPhoto),
      showPrices: yes(sheet.okPrices),
    },
    demo: {
      noindex: true,
      sold: yes(sheet.sold),
      preparedBy: sheet.collectorNotes?.collectedBy,
    },
    collectorNotes: Object.values(sheet.collectorNotes ?? {}).some(Boolean) ? sheet.collectorNotes : undefined,
  })

  return { config, errors, warnings }
}

// ─── Writing TypeScript ──────────────────────────────────────

const IDENT = /^[A-Za-z_$][\w$]*$/

/** Formats a value as TypeScript in the repo's style (single quotes, trailing commas). */
export function toTs(value, indent = 0) {
  const pad = '  '.repeat(indent + 1)
  const end = '  '.repeat(indent)
  if (typeof value === 'string') return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')}'`
  if (typeof value !== 'object' || value === null) return String(value)
  if (Array.isArray(value)) {
    if (!value.length) return '[]'
    const inline = `[${value.map((v) => toTs(v, indent)).join(', ')}]`
    if (value.every((v) => typeof v !== 'object') && inline.length + indent * 2 < 90) return inline
    return `[\n${value.map((v) => `${pad}${toTs(v, indent + 1)},`).join('\n')}\n${end}]`
  }
  const entries = Object.entries(value)
  const inline = `{ ${entries.map(([k, v]) => `${IDENT.test(k) ? k : `'${k}'`}: ${toTs(v, indent)}`).join(', ')} }`
  if (entries.every(([, v]) => typeof v !== 'object') && inline.length + indent * 2 < 90) return inline
  return `{\n${entries.map(([k, v]) => `${pad}${IDENT.test(k) ? k : `'${k}'`}: ${toTs(v, indent + 1)},`).join('\n')}\n${end}}`
}
