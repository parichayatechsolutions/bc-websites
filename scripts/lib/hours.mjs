// scripts/lib/hours.mjs
// Reads a branch's opening hours as people write them ("Mon–Sat 10am–8pm,
// Sun closed", "Mon–Wed, Fri–Sun 11:00am–9:00pm, Thu closed", "Daily 10:30
// AM - 9 PM") into a week of times the site can check "open now" against.
//
// Returns seven entries, Monday first: { open: '10:30', close: '20:30' } in
// 24-hour time, or null for a closed day. Returns undefined when it can't
// account for all seven days or can't read a time, so a page never shows
// "open now" from a guess; the free-text hours still show as written.

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
const ALL = /\b(daily|every ?day|all days|all week|mon(day)?\s*(to|–|-|—)\s*sun(day)?)\b/i

/** "Mon" / "monday" / "Tues" → 0–6, or -1. */
function dayIndex(word) {
  const w = word.toLowerCase().slice(0, 3)
  return DAYS.indexOf(w)
}

/** "10am", "10:30 AM", "8.30pm", "20:00" → "10:00", "10:30", "20:30", "20:00". */
function clock(text) {
  const m = text.trim().match(/^(\d{1,2})(?:[:.](\d{2}))?\s*(am|pm|a\.m\.|p\.m\.)?$/i)
  if (!m) return undefined
  let h = Number(m[1])
  const min = m[2] ?? '00'
  const half = (m[3] ?? '').toLowerCase().replace(/\./g, '')
  if (half === 'pm' && h < 12) h += 12
  if (half === 'am' && h === 12) h = 0
  if (h > 23 || Number(min) > 59) return undefined
  return `${String(h).padStart(2, '0')}:${min}`
}

/** The days a piece like "Mon–Sat", "Sun", "Mon, Wed" or "Daily" covers. */
function daysIn(text) {
  if (ALL.test(text)) return [0, 1, 2, 3, 4, 5, 6]
  const out = []
  for (const part of text.split(/[,&/]|\band\b/i)) {
    const range = part.match(/([a-z]{3,9})\s*(?:–|-|—|to)\s*([a-z]{3,9})/i)
    if (range) {
      const a = dayIndex(range[1])
      const b = dayIndex(range[2])
      if (a < 0 || b < 0) return undefined
      for (let i = a; ; i = (i + 1) % 7) {
        out.push(i)
        if (i === b) break
      }
      continue
    }
    const one = part.match(/[a-z]{3,9}/i)
    if (one) {
      const i = dayIndex(one[0])
      if (i < 0) return undefined
      out.push(i)
    }
  }
  return out
}

export function parseHours(text) {
  if (!text) return undefined
  const week = Array(7).fill(undefined)
  // Each comma-separated piece is days with a time or "closed"; days without
  // either carry on to the next piece ("Mon–Wed, Fri–Sun 11am–9pm").
  let pending = []
  for (const piece of text.split(/[,;]/)) {
    const time = piece.match(/(\d{1,2}(?:[:.]\d{2})?\s*(?:am|pm|a\.m\.|p\.m\.)?)\s*(?:–|-|—|to)\s*(\d{1,2}(?:[:.]\d{2})?\s*(?:am|pm|a\.m\.|p\.m\.)?)/i)
    const closed = /closed|holiday|off\b/i.test(piece)
    const daysText = time ? piece.slice(0, time.index) : piece.replace(/closed|holiday|off\b/gi, '')
    const days = daysText.trim() ? daysIn(daysText) : ALL.test(piece) ? [0, 1, 2, 3, 4, 5, 6] : []
    if (days === undefined) return undefined
    const covered = [...pending, ...days]
    if (time) {
      const open = clock(time[1])
      let close = clock(time[2])
      if (!open || !close) return undefined
      // "10–7" means seven in the evening; anything still before opening is a mistake.
      if (close <= open && Number(close.slice(0, 2)) < 12) close = `${Number(close.slice(0, 2)) + 12}${close.slice(2)}`
      if (close <= open) return undefined
      // "Mon–Sun 11am–9pm" with no days before the time means every day.
      for (const d of covered.length ? covered : [0, 1, 2, 3, 4, 5, 6]) week[d] = { open, close }
      pending = []
    } else if (closed) {
      for (const d of covered) week[d] = null
      pending = []
    } else {
      pending = covered
    }
  }
  return week.every((d) => d !== undefined) ? week : undefined
}
