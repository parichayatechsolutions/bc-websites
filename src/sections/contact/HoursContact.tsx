// src/sections/contact/HoursContact.tsx
// The hours board: dark, whether they're open right now set large, the
// week's hours beneath with today marked, and WhatsApp and Call beside.
// (Lab: contact I, "Hours board".)
//
// The main branch's day-by-day hours (app/hours), in the shop's own time;
// hides without them. Updates each minute. No motion.

import { IconBrandWhatsapp, IconPhone } from '@tabler/icons-react'
import { telLink, useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useOpenState, weekDays } from '../../app/hours'
import { capitalise } from '../../app/text'
import Button from '../../components/Button'

export default function HoursContact() {
  const { boutique } = useBoutique()
  const branch = boutique.branches[0]
  const state = useOpenState(branch)
  if (!branch?.week || !state) return null
  const [status, detail] = state.label.split(' · ')

  return (
    <section id="contact" className="section bg-dark text-light">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-6">
          <p className="flex items-center gap-3" aria-live="polite">
            <span aria-hidden="true" className={`h-3 w-3 rounded-full ${state.open ? 'bg-accent-on-dark' : 'border-2 border-light/60'}`} />
            <span className="t-1">{status}</span>
          </p>
          {detail && <p className="t-lead mt-3 text-light/80">{capitalise(detail)}</p>}
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={whatsappLink(boutique)} icon={IconBrandWhatsapp}>
              Chat on WhatsApp
            </Button>
            <Button href={telLink(boutique.contact.phone)} variant="outline-light" icon={IconPhone}>
              Call {boutique.contact.phone}
            </Button>
          </div>
        </div>
        <div className="md:col-span-6">
          <h2 className="t-3">Opening hours</h2>
          <dl className="mt-4 border-t border-light/15">
            {weekDays(branch.week).map((d, i) => (
              <div
                key={d.day}
                className={`flex items-baseline justify-between gap-4 border-b border-light/15 py-3 ${i === state.todayIndex ? 'font-semibold text-accent-on-dark' : ''}`}
              >
                <dt>
                  {d.day}
                  {i === state.todayIndex && <span className="t-small ml-2 font-normal">today</span>}
                </dt>
                <dd className="tabular-nums">{d.hours}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
