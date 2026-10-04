// src/sections/wedding/FamilyWedding.tsx
// The family around the bride: the bride in the centre and the family
// in a ring around her (her mother, his mother, sisters, brothers, the
// little ones, the groom); tapping one shows what usually suits their part
// in the day. (Lab: wed F, "Family web".)
//
// General guidance. On a phone the ring becomes a grid. Shows only for a
// boutique that does bridal work. The note swaps with a CSS fade.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { useWedding } from './weddingShared'

const FAMILY = [
  { name: 'The bride', look: 'The heaviest work of the day; everything else is chosen to sit beside her.' },
  { name: 'The groom', look: 'A sherwani or bandhgala that picks up one colour from her outfit.' },
  { name: 'Her mother', look: 'A rich silk saree, a shade quieter than the bride.' },
  { name: 'His mother', look: 'A silk saree or lehenga that sits with the family’s colours.' },
  { name: 'Sisters', look: 'Lehengas or sarees in one palette, so the photos hang together.' },
  { name: 'Brothers', look: 'Kurtas with matching jackets, in the sisters’ colours.' },
  { name: 'The little ones', look: 'Pattu langas and kurta sets, soft enough to wear all day.' },
]

export default function FamilyWedding() {
  const { boutique } = useBoutique()
  const { doesBridal } = useWedding()
  const [index, setIndex] = useState(0)
  if (!doesBridal) return null
  const person = FAMILY[index]
  const ring = FAMILY.slice(1)

  const Chip = ({ i }: { i: number }) => (
    <button
      type="button"
      onClick={() => setIndex(i)}
      aria-pressed={i === index}
      className="min-h-11 cursor-pointer rounded-full border border-ink/25 bg-light px-4 transition-[background-color,border-color,color] duration-200 ease-stitch hover:border-ink aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
    >
      {FAMILY[i].name}
    </button>
  )

  return (
    <section id="wedding-family" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          {/* A ring on a computer; a simple wrap of chips on a phone. */}
          <div className="relative hidden aspect-square md:block" role="group" aria-label="Family">
            <span aria-hidden="true" className="absolute inset-[14%] rounded-full border-2 border-dashed border-thread" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Chip i={0} />
            </div>
            {ring.map((_, k) => {
              const a = (k / ring.length) * Math.PI * 2 - Math.PI / 2
              return (
                <div key={k} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${50 + 36 * Math.cos(a)}%`, top: `${50 + 36 * Math.sin(a)}%` }}>
                  <Chip i={k + 1} />
                </div>
              )
            })}
          </div>
          <div className="flex flex-wrap gap-2 md:hidden" role="group" aria-label="Family">
            {FAMILY.map((_, i) => (
              <Chip key={i} i={i} />
            ))}
          </div>
        </div>
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">Dressing the family</h2>
          <div key={index} className="mt-8 animate-[fade-in_700ms_var(--ease-stitch)]" aria-live="polite">
            <p className="t-2 text-primary-ink">{person.name}</p>
            <p className="t-lead mt-3 max-w-[34ch]">{person.look}</p>
          </div>
          <div className="mt-8">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, we'd like outfits for the family for a wedding. Could we talk?`)} variant="primary" icon={IconBrandWhatsapp}>
              Plan the family’s outfits
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
