// src/sections/rental/CompareRental.tsx
// Rent or stitch? The two side by side, from the boutique's own numbers:
// what renting costs a day and the sizes it comes in, against what a
// stitched bridal piece starts at and how long it takes. Helps a customer
// decide before she asks. (Lab: rental F, "Rent or stitch?".)
//
// Needs `rentals`; the stitching column uses their bridal starting price
// and delivery days where they have them. Prices only with permission.
// No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'

export default function CompareRental() {
  const { boutique } = useBoutique()
  const pieces = boutique.rentals ?? []
  if (!pieces.length) return null

  const showPrices = boutique.permissions.showPrices
  const rents = pieces.map((p) => p.pricePerDay).filter((n): n is number => Boolean(n))
  const bridal = boutique.pricing?.startingAt?.find((p) => /bridal/i.test(p.item)) ?? boutique.pricing?.startingAt?.at(-1)
  const days = boutique.pricing?.deliveryDays

  const rows = [
    { what: 'Cost', rent: showPrices && rents.length ? `From ${rupees(Math.min(...rents))} a day` : 'Ask us', stitch: showPrices && bridal ? `${bridal.item} from ${rupees(bridal.price)}` : 'Ask us' },
    { what: 'Time', rent: 'Ready when it’s free on your date', stitch: days ? `Usually ${days} days, longer with handwork` : 'Ask us' },
    { what: 'Fit', rent: 'Chosen from the sizes we have', stitch: 'Cut to your measurements' },
    { what: 'After', rent: 'Returned after the function', stitch: 'Yours to keep and wear again' },
  ]

  return (
    <section id="rent-or-stitch" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[12ch] text-balance">Rent or stitch?</h2>
        <dl className="mt-12">
          <div className="grid grid-cols-2 gap-4 border-b-2 border-ink pb-3 md:grid-cols-12" aria-hidden="true">
            <span className="hidden md:col-span-2 md:block" />
            <span className="t-3 md:col-span-5">Rent</span>
            <span className="t-3 md:col-span-5">Stitch</span>
          </div>
          {rows.map((r) => (
            <div key={r.what} className="grid grid-cols-2 gap-x-4 gap-y-2 border-b border-ink/15 py-5 md:grid-cols-12">
              <dt className="col-span-2 font-semibold text-primary-ink md:col-span-2">{r.what}</dt>
              <dd className="md:col-span-5">
                <span className="sr-only">Rent: </span>
                {r.rent}
              </dd>
              <dd className="md:col-span-5">
                <span className="sr-only">Stitch: </span>
                {r.stitch}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-10">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, should I rent or have something stitched for my function?`)} variant="primary" icon={IconBrandWhatsapp}>
            Help me decide
          </Button>
        </div>
      </div>
    </section>
  )
}
