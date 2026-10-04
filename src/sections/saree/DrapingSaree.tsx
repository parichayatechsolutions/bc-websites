// src/sections/saree/DrapingSaree.tsx
// A draping appointment: dark, pick a day this week and a time of day to
// come in and be draped, and the button asks for it on WhatsApp.
// (Lab: saree O, "Draping appointment".)
//
// It asks; the boutique confirms. Shows only when their services list
// draping. The opening hours of the first branch show when they have them.
// No motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

const TIMES = ['Morning', 'Afternoon', 'Evening']
const PILL =
  'min-h-11 cursor-pointer rounded-full border border-light/30 px-4 transition-[background-color,border-color,color] duration-200 ease-stitch hover:border-light aria-pressed:bg-light aria-pressed:text-ink'

export default function DrapingSaree() {
  const { boutique } = useBoutique()
  const offers = boutique.services.groups.flatMap((g) => g.items).some((i) => /drap/i.test(i))
  const [day, setDay] = useState(1)
  const [time, setTime] = useState(0)
  if (!offers) return null
  const hours = boutique.branches[0]?.hours

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i)
    return {
      label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric' }),
      long: d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' }),
    }
  })

  return (
    <section id="saree-draping" className="section bg-dark text-light">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[12ch] text-balance">Come in to be draped</h2>
        {hours && <p className="mt-4 text-light/75">Open {hours}</p>}
        <div className="mt-10" role="group" aria-label="Day">
          <p className="t-small text-light/70">Day</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {days.map((d, i) => (
              <button key={d.long} type="button" onClick={() => setDay(i)} aria-pressed={i === day} className={PILL}>
                {d.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6" role="group" aria-label="Time of day">
          <p className="t-small text-light/70">Time</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {TIMES.map((t, i) => (
              <button key={t} type="button" onClick={() => setTime(i)} aria-pressed={i === time} className={PILL}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-10">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, could I come in to have my saree draped on ${days[day].long}, in the ${TIMES[time].toLowerCase()}?`)} icon={IconBrandWhatsapp}>
            Ask for this time
          </Button>
        </div>
      </div>
    </section>
  )
}
