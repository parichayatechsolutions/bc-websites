// src/sections/offer/BookByOffer.tsx
// "Book by" an offer's last day: the date set as a calendar tile, the days
// left counted from the visitor's own date, the offer beside it and a
// button. Makes the deadline concrete without a ticking clock.
// (Lab: offer M, "Book by".)
//
// Needs an offer running today that has a last day; hides otherwise.
// No motion; the count changes only between visits.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import Button from '../../components/Button'
import { useOffers } from './offerShared'

export default function BookByOffer() {
  const { offers, ask } = useOffers()
  const offer = offers.find((o) => o.until)
  if (!offer?.until) return null

  const last = new Date(`${offer.until}T00:00:00`)
  const today = new Date(new Date().toDateString())
  const left = Math.round((last.getTime() - today.getTime()) / 86_400_000)

  return (
    <section aria-label="Offer" className="section bg-paper">
      <div className="wrap grid items-center gap-10 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-4">
          <div className="mx-auto w-48 overflow-hidden rounded-2xl border border-ink/15 bg-light text-center md:mx-0">
            <p className="bg-primary-ink py-2 text-on-primary-ink">{last.toLocaleDateString('en-IN', { month: 'long' })}</p>
            <p className="t-hero py-4 leading-none tabular-nums">{last.getDate()}</p>
            <p className="t-small pb-3 text-muted">{last.toLocaleDateString('en-IN', { weekday: 'long' })}</p>
          </div>
        </div>
        <div className="md:col-span-8">
          <p className="text-primary-ink">{left === 0 ? 'Last day today' : left === 1 ? '1 day left' : `${left} days left`}</p>
          <h2 className="t-2 mt-3 max-w-[22ch] text-balance">Book by {last.toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}: {offer.title}</h2>
          {offer.detail && <p className="mt-4 max-w-[44ch] text-muted">{offer.detail}</p>}
          <div className="mt-8">
            <Button href={ask(offer)} variant="primary" icon={IconBrandWhatsapp}>
              Book on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
