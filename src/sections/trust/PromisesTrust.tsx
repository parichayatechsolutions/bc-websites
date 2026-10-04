// src/sections/trust/PromisesTrust.tsx
// What a customer can count on, as a grid of up to six: an icon, a short
// title and a line each (made to measure, usual delivery, handwork, how to
// pay, languages, parking). (Lab: trust M, "Six promises".)
//
// Only promises backed by their data (trustPromises), so a thin config
// gets fewer. Hides below three. No motion.

import { useBoutique } from '../../app/BoutiqueContext'
import { trustPromises } from './trustFacts'

export default function PromisesTrust() {
  const { boutique } = useBoutique()
  const promises = trustPromises(boutique)
  if (promises.length < 3) return null

  return (
    <section id="trust" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[14ch] text-balance">What you can count on</h2>
        <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {promises.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-paper text-primary-ink">
                <Icon size={24} stroke={1.5} aria-hidden="true" />
              </span>
              <span>
                <span className="t-3 block">{title}</span>
                <span className="mt-1 block text-muted">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
