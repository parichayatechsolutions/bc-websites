// src/sections/saree/PicoSaree.tsx
// What pico does, drawn: a raw saree edge with loose threads beside the
// same edge rolled and stitched tight, and a line on why it matters, with
// a button to ask for it. (Lab: saree E, "What pico does".)
//
// The explanation is true of the finish. Shows only when their services
// list pico. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

const CLOTH = { fill: 'color-mix(in oklab, var(--c-primary) 22%, var(--c-light))' }
const LINE = { stroke: 'var(--c-primary-ink)' }

// A ragged edge with threads hanging from it, on a 200 × 120 grid.
// Right to left, so the outline closes back at the top-left corner.
const RAW_EDGE = Array.from({ length: 21 }, (_, i) => `${200 - i * 10} ${86 + (i % 3) * 3 - (i % 2) * 2}`).join(' L ')
const THREADS = Array.from({ length: 9 }, (_, i) => `M ${12 + i * 22} ${88} q 3 10 -2 ${16 + (i % 3) * 5}`).join(' ')
// A tight zigzag along a rolled edge.
const PICO = Array.from({ length: 40 }, (_, i) => `${i * 5} ${i % 2 ? 80 : 90}`).join(' L ')

export default function PicoSaree() {
  const { boutique } = useBoutique()
  const offersPico = boutique.services.groups.flatMap((g) => g.items).some((i) => /pico/i.test(i))
  if (!offersPico) return null

  const sides = [
    {
      label: 'Raw edge',
      svg: (
        <>
          <path d={`M 0 0 L 200 0 L ${RAW_EDGE} Z`} style={CLOTH} />
          <path d={THREADS} fill="none" strokeWidth={1.2} strokeLinecap="round" style={LINE} />
        </>
      ),
    },
    {
      label: 'With pico',
      svg: (
        <>
          <path d="M 0 0 L 200 0 L 200 90 L 0 90 Z" style={CLOTH} />
          <path d="M 0 85 L 200 85" fill="none" strokeWidth={10} style={{ stroke: 'color-mix(in oklab, var(--c-primary) 32%, var(--c-light))' }} />
          <path d={`M ${PICO}`} fill="none" strokeWidth={1.4} strokeLinejoin="round" style={LINE} />
        </>
      ),
    },
  ]

  return (
    <section id="saree-pico" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="grid gap-4 sm:grid-cols-2 md:col-span-7">
          {sides.map((s) => (
            <figure key={s.label} className="bg-paper p-5">
              <svg viewBox="0 0 200 120" aria-hidden="true" className="block w-full">
                {s.svg}
              </svg>
              <figcaption className="t-small mt-3 text-center text-muted">{s.label}</figcaption>
            </figure>
          ))}
        </div>
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">What pico does</h2>
          <p className="t-lead mt-5 max-w-[36ch]">A saree’s cut edge frays a little more each time it’s worn. Pico rolls it and stitches it tight, so it stays neat for years.</p>
          <div className="mt-8">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I need pico done on my saree.`)} variant="primary" icon={IconBrandWhatsapp}>
              Ask for pico
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
