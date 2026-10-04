// src/sections/handwork/ZonesHandwork.tsx
// Where should the handwork go? Neckline, sleeves, back or all over: each
// choice lights up that part of the blouse drawing, and one button asks for
// handwork there. (Lab: emb I, "Where it goes".)
//
// Shows only for a boutique whose services include handwork. The drawing is
// the blouse designer's (blouseDrawing). No motion beyond the CSS redraw.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { BlouseFlat } from '../blouse/blouseDrawing'

const HANDWORK = /aari|maggam|zardosi|zari|embroider|mirror|bead|stone|kantha|chikan/i

// Stitched paths over the drawing, on its 200 × 160 grid.
const ZONES = [
  { id: 'neck', name: 'Neckline', back: false, path: 'M 80 28 C 82 52 118 52 120 28 M 76 31 C 79 58 121 58 124 31' },
  { id: 'sleeves', name: 'Sleeves', back: false, path: 'M 29 92 L 43 98 M 26 100 L 40 106 M 171 92 L 157 98 M 174 100 L 160 106' },
  { id: 'back', name: 'Back', back: true, path: 'M 80 28 C 79 106 121 106 120 28 M 76 30 C 74 114 126 114 124 30' },
  { id: 'all', name: 'All over', back: false, path: 'M 80 28 C 82 52 118 52 120 28 M 70 70 L 130 70 M 69 100 L 131 100 M 69 131 Q 100 139 131 131 M 26 100 L 40 106 M 174 100 L 160 106' },
]

export default function ZonesHandwork() {
  const { boutique } = useBoutique()
  const [zone, setZone] = useState(ZONES[0])
  const doesHandwork = boutique.services.groups.flatMap((g) => g.items).some((item) => HANDWORK.test(item))
  if (!doesHandwork) return null

  return (
    <section id="handwork-zones" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[12ch] text-balance">Where should the work go?</h2>
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Where">
            {ZONES.map((z) => (
              <button
                key={z.id}
                type="button"
                onClick={() => setZone(z)}
                aria-pressed={z.id === zone.id}
                className="min-h-11 cursor-pointer rounded-full border border-ink/25 px-5 transition-[background-color,border-color,color,scale] duration-200 ease-stitch hover:border-ink active:scale-[0.97] aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
              >
                {z.name}
              </button>
            ))}
          </div>
          <div className="mt-10">
            <Button
              href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like handwork on the ${zone.id === 'all' ? 'whole blouse' : zone.name.toLowerCase()}.`)}
              variant="primary"
              icon={IconBrandWhatsapp}
            >
              Ask about handwork
            </Button>
          </div>
        </div>
        <figure className="md:col-span-7">
          <div className="aspect-[5/4] bg-paper p-6 md:p-10">
            <BlouseFlat neck={zone.back ? 'u' : 'round'} sleeve="elbow" back={zone.back}>
              <path d={zone.path} fill="none" strokeWidth={3.4} strokeLinecap="round" strokeDasharray="0 6" style={{ stroke: 'var(--c-thread)' }} />
            </BlouseFlat>
          </div>
          <figcaption className="t-small mt-2 text-center text-muted">{zone.back ? 'Back' : 'Front'}</figcaption>
        </figure>
      </div>
    </section>
  )
}
