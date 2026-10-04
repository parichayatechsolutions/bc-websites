// src/sections/contact/PassContact.tsx
// A fitting pass that fills itself in: she picks a day this week and a
// time of day, the ticket beside shows her choice under the boutique's
// name, and the button sends it as a request. (Lab: contact Y, "Fitting
// pass".)
//
// It asks for a time; the boutique confirms. The days run from today for
// a week. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

const TIMES = ['Morning', 'Afternoon', 'Evening']
const PILL =
  'min-h-11 cursor-pointer rounded-full border border-ink/25 px-4 transition-[background-color,border-color,color] duration-200 ease-stitch hover:border-ink aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink'

export default function PassContact() {
  const { boutique } = useBoutique()
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i)
    return {
      short: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric' }),
      long: d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' }),
    }
  })
  const [day, setDay] = useState(1)
  const [time, setTime] = useState(0)
  const area = boutique.branches[0]?.area || boutique.branches[0]?.city

  return (
    <section id="contact" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-6">
          <h2 className="t-1 max-w-[12ch] text-balance">Come for a fitting</h2>
          <div className="mt-8" role="group" aria-label="Day">
            <p className="t-small text-muted">Day</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {days.map((d, i) => (
                <button key={d.long} type="button" onClick={() => setDay(i)} aria-pressed={i === day} className={PILL}>
                  {d.short}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6" role="group" aria-label="Time of day">
            <p className="t-small text-muted">Time</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {TIMES.map((t, i) => (
                <button key={t} type="button" onClick={() => setTime(i)} aria-pressed={i === time} className={PILL}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="md:col-span-6">
          <div className="grid grid-cols-[1fr_auto] overflow-hidden rounded-2xl border border-ink/20" aria-live="polite">
            <div className="bg-paper p-6 md:p-8">
              <p className="t-3 text-primary-ink">{boutique.brand.name}</p>
              {area && <p className="t-small text-muted">{area}</p>}
              <p className="t-small mt-6 text-muted">Fitting</p>
              <p className="t-2">{days[day].long}</p>
              <p className="mt-1">{TIMES[time]}</p>
            </div>
            <div aria-hidden="true" className="flex w-14 items-center justify-center border-l-2 border-dashed border-ink/25 bg-primary text-on-primary">
              <span className="t-small font-semibold tracking-widest [writing-mode:vertical-rl]">Fitting</span>
            </div>
          </div>
          <div className="mt-6">
            <Button
              href={whatsappLink(boutique, `Hi ${boutique.brand.name}, could I come for a fitting on ${days[day].long}, in the ${TIMES[time].toLowerCase()}?`)}
              variant="primary"
              icon={IconBrandWhatsapp}
            >
              Ask for this time
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
