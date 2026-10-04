// src/sections/classes/CalendarClasses.tsx
// Never miss the start: each upcoming batch with its date and an "Add to
// calendar" link that opens a ready-filled Google Calendar event, plus a
// button to ask for a seat. (Lab: class X, "Add to calendar".)
//
// From `classes`; only batches that haven't started. Hides when none have a
// future date. The calendar event is all-day, at the first branch's address.
// No motion.

import { IconBrandWhatsapp, IconCalendarPlus } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'

const ymd = (date: string) => date.replace(/-/g, '')
const nextDay = (date: string) => {
  const d = new Date(`${date}T00:00:00`)
  d.setDate(d.getDate() + 1)
  return d.toLocaleDateString('en-CA').replace(/-/g, '')
}

export default function CalendarClasses() {
  const { boutique } = useBoutique()
  const today = new Date().toLocaleDateString('en-CA')
  const batches = (boutique.classes ?? []).filter((c) => c.nextBatch && c.nextBatch >= today)
  if (!batches.length) return null
  const branch = boutique.branches[0]
  const where = branch ? `${branch.address}, ${branch.city} ${branch.pincode}` : ''

  return (
    <section id="classes" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[12ch] text-balance">Save the date</h2>
        <ul className="mt-12 border-b border-ink/15">
          {batches.map((c) => {
            const calendar = `https://calendar.google.com/calendar/render?${new URLSearchParams({
              action: 'TEMPLATE',
              text: `${c.name} at ${boutique.brand.name}`,
              dates: `${ymd(c.nextBatch!)}/${nextDay(c.nextBatch!)}`,
              details: [c.level, c.length].filter(Boolean).join(' · '),
              location: where,
            })}`
            return (
              <li key={c.name} className="flex flex-wrap items-center justify-between gap-4 border-t border-ink/15 py-6">
                <div>
                  <h3 className="t-3">{c.name}</h3>
                  <p className="text-muted">Starts {new Date(`${c.nextBatch}T00:00:00`).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  <a href={calendar} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 font-semibold text-primary-ink">
                    <IconCalendarPlus size={20} stroke={1.75} aria-hidden="true" />
                    <span className="link-stitch">Add to calendar</span>
                  </a>
                  <a
                    href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like a seat in the ${c.name} class.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 font-semibold text-primary-ink"
                  >
                    <IconBrandWhatsapp size={20} stroke={1.75} aria-hidden="true" />
                    <span className="link-stitch">Ask for a seat</span>
                  </a>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
