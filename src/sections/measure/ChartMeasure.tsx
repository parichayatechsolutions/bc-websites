// src/sections/measure/ChartMeasure.tsx
// A general blouse size chart, in inches or centimetres: the usual under
// bust, shoulder, armhole and sleeve round for each bust size, so she can
// check her numbers look right.
// (Lab: measure C, "Size chart".)
//
// These are common starting points, labelled as such; her own measurements
// will differ. Shows only for a boutique that stitches blouses. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import Button from '../../components/Button'
import { useBlouse } from '../blouse/blouseShared'
import { useSendMeasurements } from './measureShared'

// Bust, under bust, shoulder, armhole, sleeve round, in inches.
const SIZES = [
  [32, 27, 13.5, 14, 10.5],
  [34, 29, 14, 15, 11],
  [36, 31, 14.5, 16, 11.5],
  [38, 33, 15, 17, 12],
  [40, 35, 15.5, 18, 12.5],
  [42, 37, 16, 19, 13],
]
const HEADS = ['Bust', 'Under bust', 'Shoulder', 'Armhole', 'Sleeve round']

export default function ChartMeasure() {
  const { stitchesBlouses } = useBlouse()
  const send = useSendMeasurements()
  const [cm, setCm] = useState(false)
  if (!stitchesBlouses) return null

  const show = (inches: number) => (cm ? Math.round(inches * 2.54) : inches)

  return (
    <section id="size-chart" className="section">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="t-1 max-w-[12ch] text-balance">Usual blouse sizes</h2>
          <div className="flex gap-2" role="group" aria-label="Units">
            {['Inches', 'Centimetres'].map((u, i) => (
              <button
                key={u}
                type="button"
                onClick={() => setCm(i === 1)}
                aria-pressed={cm === (i === 1)}
                className="min-h-11 cursor-pointer rounded-full border border-ink/25 px-5 transition-[background-color,border-color,color] duration-200 ease-stitch hover:border-ink aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
              >
                {u}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-4 max-w-[52ch] text-muted">Common starting points for each bust size. Your own measurements will differ, so measure yourself or bring a blouse that fits.</p>

        <div className="mt-10">
          <table className="t-small w-full border-collapse text-left tabular-nums md:text-base">
            <thead>
              <tr className="border-b-2 border-ink">
                {HEADS.map((h) => (
                  <th key={h} scope="col" className="py-3 pr-3 align-bottom font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SIZES.map((sizes) => (
                <tr key={sizes[0]} className="border-b border-ink/15">
                  {sizes.map((value, j) =>
                    j === 0 ? (
                      <th key={j} scope="row" className="py-3 pr-3 font-semibold text-primary-ink">
                        {show(value)}
                      </th>
                    ) : (
                      <td key={j} className="py-3 pr-3">
                        {show(value)}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10">
          <Button href={send({}, cm ? 'centimetres' : 'inches')} variant="primary" icon={IconBrandWhatsapp}>
            Send my measurements
          </Button>
        </div>
      </div>
    </section>
  )
}
