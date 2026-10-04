// src/sections/bridal/CompareBridal.tsx
// The bridal packages compared in one table: every inclusion down the side,
// a column per package, a tick where it's included, starting prices across
// the top. (Lab: bridal C, "Compare table".)
//
// From `bridalPackages`; needs two or more. Inclusions match when they're
// written the same way. Prices only with permission. No motion.

import { IconBrandWhatsapp, IconCheck, IconMinus } from '@tabler/icons-react'
import { capitalise } from '../../app/text'
import Button from '../../components/Button'
import { useBridal } from './bridalShared'

export default function CompareBridal() {
  const { packages, price, pricesShown, consult } = useBridal()
  if (packages.length < 2) return null
  const shown = packages.slice(0, 3)
  const has = (includes: string[], item: string) => includes.some((i) => i.toLowerCase() === item.toLowerCase())
  const rows = [...new Map(shown.flatMap((p) => p.includes).map((i) => [i.toLowerCase(), i])).values()]

  return (
    <section id="bridal" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Compare the packages</h2>
        <table className="t-small mt-12 w-full border-collapse text-left md:text-base">
          <thead>
            <tr className="border-b-2 border-ink">
              <th scope="col" className="py-4 pr-3">
                <span className="sr-only">Included</span>
              </th>
              {shown.map((p) => (
                <th key={p.name} scope="col" className="px-2 py-4 align-bottom">
                  <span className="t-3 block text-primary-ink">{p.name}</span>
                  {price(p) && <span className="mt-1 block font-normal text-muted">{price(p)}</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((item) => (
              <tr key={item} className="border-b border-ink/15">
                <th scope="row" className="py-3 pr-3 font-normal">
                  {capitalise(item)}
                </th>
                {shown.map((p) => (
                  <td key={p.name} className="px-2 py-3">
                    {has(p.includes, item) ? (
                      <IconCheck size={20} stroke={2} className="text-primary-ink" aria-label="Included" />
                    ) : (
                      <IconMinus size={20} stroke={1.5} className="text-muted" aria-label="Not included" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Button href={consult} variant="primary" icon={IconBrandWhatsapp}>
            Book a bridal consult
          </Button>
          {pricesShown && <p className="t-small text-muted">Starting prices. The final price depends on your design and fabric.</p>}
        </div>
      </div>
    </section>
  )
}
