// src/sections/alterations/GridAlterations.tsx
// Every alteration rate in one table, grouped by garment: a ruled heading
// row for each garment, its fixes and prices beneath. Everything at once,
// for the customer who wants to compare. (Lab: alter T, "Price grid".)
//
// Rates from `alterationPrices`, only with permission, grouped by the
// garment each names (anything unnamed under "Other"). Needs three rates;
// hides otherwise. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'

const GARMENTS = ['Blouse', 'Kurti', 'Kurta', 'Lehenga', 'Salwar', 'Churidar', 'Gown', 'Saree', 'Pant', 'Shirt', 'Frock']
const names = (g: string) => new RegExp(`\\b${g}`, 'i')

export default function GridAlterations() {
  const { boutique } = useBoutique()
  const rates = boutique.permissions.showPrices ? (boutique.alterationPrices ?? []) : []
  if (rates.length < 3) return null
  const groups = [
    ...GARMENTS.map((g) => ({ name: g, rates: rates.filter((r) => names(g).test(r.item)) })),
    { name: 'Other', rates: rates.filter((r) => !GARMENTS.some((g) => names(g).test(r.item))) },
  ].filter((g) => g.rates.length)

  return (
    <section id="alteration-prices" className="section">
      <div className="wrap max-w-3xl">
        <h2 className="t-1 max-w-[12ch] text-balance">Alteration rates</h2>
        <table className="mt-10 w-full border-collapse text-left">
          <thead className="sr-only">
            <tr>
              <th scope="col">Alteration</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          {groups.map((g) => (
            <tbody key={g.name}>
              <tr>
                <th colSpan={2} scope="colgroup" className="t-3 border-b-2 border-ink pt-8 pb-2 text-primary-ink">
                  {g.name}
                </th>
              </tr>
              {g.rates.map((r) => (
                <tr key={r.item} className="border-b border-ink/15">
                  <th scope="row" className="py-3 pr-4 font-normal">
                    {r.item}
                  </th>
                  <td className="py-3 text-right tabular-nums">{rupees(r.price)}</td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
        <div className="mt-10">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I have something that needs altering.`)} variant="primary" icon={IconBrandWhatsapp}>
            Send a photo on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  )
}
