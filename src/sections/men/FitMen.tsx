// src/sections/men/FitMen.tsx
// Choose your fit: slim, regular and relaxed drawn as simple shirt
// shapes, narrower to wider, each with the usual room it leaves at the
// chest; pick one to ask for it. (Lab: men C, "Choose your fit".)
//
// The ease figures are general tailoring guidance, labelled as usual.
// Shows only when their Men group lists shirts, kurtas or suits. No
// motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

// How far each side of the body flares out from the 100-wide centre.
const FITS = [
  { name: 'Slim', ease: '2 to 3 inches', note: 'Close to the body. Sharp, but leaves little room to move.', waist: 26 },
  { name: 'Regular', ease: 'about 4 inches', note: 'Room to move without looking loose. Suits most people.', waist: 30 },
  { name: 'Relaxed', ease: '6 inches or more', note: 'Easy and airy, for warm days and long hours.', waist: 35 },
]

function Shape({ waist }: { waist: number }) {
  const l = 50 - waist
  const r = 50 + waist
  return (
    <svg viewBox="0 0 100 110" aria-hidden="true" className="block h-full w-full" strokeWidth={1.8} strokeLinejoin="round" style={{ stroke: 'var(--c-primary-ink)' }}>
      <path
        d={`M 38 8 Q 50 14 62 8 L 82 16 L 96 46 L 86 50 L 78 34 L ${r} 104 L ${l} 104 L 22 34 L 14 50 L 4 46 L 18 16 Z`}
        style={{ fill: 'color-mix(in oklab, var(--c-primary) 12%, var(--c-light))' }}
        className="transition-[d] duration-300 ease-stitch"
      />
      <path d="M 50 12 L 50 104" fill="none" strokeDasharray="3 3" />
    </svg>
  )
}

export default function FitMen() {
  const { boutique } = useBoutique()
  const items = boutique.services.groups.find((g) => /^men/i.test(g.title))?.items ?? []
  const [index, setIndex] = useState(1)
  if (!items.some((i) => /shirt|kurta|suit|sherwani/i.test(i))) return null
  const fit = FITS[index]

  return (
    <section id="men-fit" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[12ch] text-balance">Choose your fit</h2>
        <ul className="mt-12 grid grid-cols-3 gap-3 md:gap-6" role="group" aria-label="Fit">
          {FITS.map((f, i) => (
            <li key={f.name}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-pressed={i === index}
                className="group w-full cursor-pointer rounded-2xl border border-ink/15 p-3 transition-[border-color,background-color] duration-200 ease-stitch hover:border-ink aria-pressed:border-primary-ink aria-pressed:bg-paper md:p-6"
              >
                <span className="mx-auto block aspect-[10/11] max-w-40">
                  <Shape waist={f.waist} />
                </span>
                <span className="mt-3 block text-center group-aria-pressed:font-semibold group-aria-pressed:text-primary-ink">{f.name}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-ink/15 pt-8" aria-live="polite">
          <div>
            <p className="t-3">
              {fit.name} <span className="t-small font-normal text-muted">· usually {fit.ease} of room at the chest</span>
            </p>
            <p className="mt-1 max-w-[44ch] text-muted">{fit.note}</p>
          </div>
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like a ${fit.name.toLowerCase()} fit.`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask for a {fit.name.toLowerCase()} fit
          </Button>
        </div>
      </div>
    </section>
  )
}
