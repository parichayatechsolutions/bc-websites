// src/sections/contact/FittingContact.tsx
// Book a fitting in two choices: a day from the coming week and a time of
// day. A summary card shows the request, and one button sends it on
// WhatsApp. It says plainly that this is a request, not a booking: the
// site can't see their diary. (Lab: contact E, "Book a fitting".)
//
// Days are worked out in the visitor's browser, so they're always the
// coming seven. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp, IconCalendarEvent, IconClock, IconMapPin } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

const TIMES = ['Morning', 'Afternoon', 'Evening']

const CHIP =
  'cursor-pointer border border-ink/25 transition-[background-color,border-color,color,scale] duration-200 ease-stitch hover:border-ink active:scale-[0.97] aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink'

export default function FittingContact() {
  const { boutique } = useBoutique()
  const [day, setDay] = useState(1)
  const [time, setTime] = useState(0)
  const area = boutique.branches[0]?.area

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i)
    return d
  })
  const chosen = days[day]
  const long = chosen.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })
  const message = `Hi ${boutique.brand.name}, I'd like to come in for a fitting on ${long}, in the ${TIMES[time].toLowerCase()}. Is that free?`

  return (
    <section id="contact" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <h2 className="t-1">Book a fitting</h2>

          <h3 className="t-3 mt-10">Pick a day</h3>
          <div className="mt-5 grid grid-cols-4 gap-2 sm:grid-cols-7" role="group" aria-label="Day">
            {days.map((d, i) => (
              <button
                key={d.toDateString()}
                type="button"
                onClick={() => setDay(i)}
                aria-pressed={i === day}
                aria-label={d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
                className={`flex min-h-20 flex-col items-center justify-center rounded-full ${CHIP}`}
              >
                <span className="t-small">{i === 0 ? 'Today' : d.toLocaleDateString('en-IN', { weekday: 'short' })}</span>
                <span className="t-3">{d.getDate()}</span>
                <span className="t-small opacity-75">{d.toLocaleDateString('en-IN', { month: 'short' })}</span>
              </button>
            ))}
          </div>

          <h3 className="t-3 mt-10">Pick a time</h3>
          <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Time of day">
            {TIMES.map((t, i) => (
              <button key={t} type="button" onClick={() => setTime(i)} aria-pressed={i === time} className={`min-h-11 rounded-full px-5 ${CHIP}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-5 md:pt-4">
          <div className="rounded-2xl bg-paper p-6 md:p-8" aria-live="polite">
            <p className="t-small text-muted">Your fitting</p>
            <p className="t-3 mt-4 flex gap-3">
              <IconCalendarEvent size={24} stroke={1.5} className="mt-1 shrink-0 text-primary-ink" aria-hidden="true" />
              {long}
            </p>
            <p className="mt-3 flex gap-3">
              <IconClock size={22} stroke={1.5} className="mt-0.5 shrink-0 text-primary-ink" aria-hidden="true" />
              {TIMES[time]}
            </p>
            {area && (
              <p className="mt-3 flex gap-3">
                <IconMapPin size={22} stroke={1.5} className="mt-0.5 shrink-0 text-primary-ink" aria-hidden="true" />
                {area}
              </p>
            )}
            <div className="mt-8">
              <Button href={whatsappLink(boutique, message)} variant="primary" icon={IconBrandWhatsapp}>
                Request this fitting
              </Button>
            </div>
            <p className="t-small mt-4 text-muted">This sends a request on WhatsApp, not a confirmed booking.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
