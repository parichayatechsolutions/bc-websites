// src/app/hours.ts
// "Open now" from a branch's day-by-day hours (`branch.week`, read from the
// data sheet by the parser). Times are the shop's own, in India, whatever
// time zone the visitor is in. Without `week` there's no status: sections
// show the hours as written, or hide the status, never a guess.

import { useEffect, useState } from 'react'
import type { Branch, DayHours } from '../types/boutique'

const SHOP_ZONE = 'Asia/Kolkata'
const DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

/** The shop's day (Monday = 0) and minutes past midnight, right now. */
function shopNow(at = new Date()): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: SHOP_ZONE, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(at)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  return { day: SHORT.indexOf(get('weekday')), minutes: Number(get('hour')) * 60 + Number(get('minute')) }
}

const toMinutes = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5))

/** "10:30" → "10:30am"; "20:00" → "8pm". */
export function clockLabel(t: string): string {
  const h = Number(t.slice(0, 2))
  const m = t.slice(3, 5)
  const half = h < 12 ? 'am' : 'pm'
  const h12 = h % 12 || 12
  return `${h12}${m === '00' ? '' : `:${m}`}${half}`
}

const range = (d: DayHours) => `${clockLabel(d.open)}–${clockLabel(d.close)}`

export interface IOpenState {
  open: boolean
  /** "Open now · until 8:30pm" or "Closed now · opens tomorrow at 10:30am". */
  label: string
  /** Today's hours, or "Closed today". */
  today: string
  /** Monday = 0. */
  todayIndex: number
}

/** Whether the branch is open right now, and the line that says so. */
export function openState(week: (DayHours | null)[], at = new Date()): IOpenState {
  const { day, minutes } = shopNow(at)
  const today = week[day]
  const todayText = today ? `Open today ${range(today)}` : 'Closed today'
  if (today && minutes >= toMinutes(today.open) && minutes < toMinutes(today.close)) {
    return { open: true, label: `Open now · until ${clockLabel(today.close)}`, today: todayText, todayIndex: day }
  }
  // Closed: find the next opening, later today or on a following day.
  for (let k = 0; k < 7; k++) {
    const d = (day + k) % 7
    const hours = week[d]
    if (!hours || (k === 0 && minutes >= toMinutes(hours.open))) continue
    const when = k === 0 ? 'today' : k === 1 ? 'tomorrow' : DAY_NAMES[d]
    return { open: false, label: `Closed now · opens ${when} at ${clockLabel(hours.open)}`, today: todayText, todayIndex: day }
  }
  return { open: false, label: 'Closed now', today: todayText, todayIndex: day }
}

/** Days with the same hours grouped: [{ days: 'Mon–Sat', hours: '10am–8pm' }, { days: 'Sun', hours: 'Closed' }]. */
export function weekRows(week: (DayHours | null)[]): { days: string; hours: string; indices: number[] }[] {
  const rows: { days: string; hours: string; indices: number[] }[] = []
  week.forEach((d, i) => {
    const hours = d ? range(d) : 'Closed'
    const last = rows[rows.length - 1]
    if (last && last.hours === hours && last.indices[last.indices.length - 1] === i - 1) last.indices.push(i)
    else rows.push({ days: '', hours, indices: [i] })
  })
  for (const r of rows) r.days = r.indices.length > 1 ? `${SHORT[r.indices[0]]}–${SHORT[r.indices[r.indices.length - 1]]}` : SHORT[r.indices[0]]
  return rows
}

/** Each day on its own line, Monday first, for a full table. */
export function weekDays(week: (DayHours | null)[]): { day: string; hours: string }[] {
  return week.map((d, i) => ({ day: DAY_NAMES[i], hours: d ? range(d) : 'Closed' }))
}

/** The branch's open state, refreshed every minute; undefined without day-by-day hours. */
export function useOpenState(branch?: Branch): IOpenState | undefined {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000)
    return () => window.clearInterval(timer)
  }, [])
  return branch?.week ? openState(branch.week, now) : undefined
}

/**
 * The shop's date `days` from today, moved on to the next day the branch is
 * open when its week is known. The date is noon UTC on that calendar day:
 * format it with `timeZone: 'UTC'` so it reads the same everywhere.
 */
export function readyBy(days: number, week?: (DayHours | null)[], at = new Date()): Date {
  const iso = at.toLocaleDateString('en-CA', { timeZone: SHOP_ZONE })
  const date = new Date(`${iso}T12:00:00Z`)
  date.setUTCDate(date.getUTCDate() + days)
  if (week?.some(Boolean)) {
    while (!week[(date.getUTCDay() + 6) % 7]) date.setUTCDate(date.getUTCDate() + 1)
  }
  return date
}
