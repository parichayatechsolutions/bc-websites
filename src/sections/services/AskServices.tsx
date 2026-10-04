// src/sections/services/AskServices.tsx
// A price in three taps: what garment, any handwork, then send; the last
// step reads back what she picked and the button asks for that price on
// WhatsApp. (Lab: services W, "Three-tap price", without the dotted
// backdrop.) It asks rather than shows, so it needs no prices and no
// permission.
//
// Garments are their own services outside the handwork and other-services
// groups, less saree and alteration jobs; the handwork step is their own handwork, plus "No handwork", and
// is left out (two taps) when they list none. Hides without garments.
// No motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { midSentence } from '../../app/text'
import Button from '../../components/Button'

const NOT_GARMENTS = /handwork|embroider|service|other/i
const HANDWORK = /aari|maggam|zardosi|zardozi|zari|mirror|bead|stone|sequin|embroider|kantha|chikan|cutwork/i
// Saree and alteration jobs listed among the garments are services, not things to price as a garment.
const JOBS = /fall|pico|pleat|drap|kuchu|tassel|alteration/i
const NONE = 'No handwork'

function Choices({ label, items, value, onPick }: { label: string; items: string[]; value: string; onPick: (item: string) => void }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label={label}>
      {items.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onPick(item)}
          aria-pressed={value === item}
          className="min-h-11 max-w-full cursor-pointer rounded-full border border-ink/25 bg-light px-4 py-2 text-left transition-[background-color,color,border-color] duration-200 ease-stitch hover:border-ink aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
        >
          {item}
        </button>
      ))}
    </div>
  )
}

function Step({ n, children }: { n: number; children: string }) {
  return (
    <h3 className="flex items-center gap-3 font-semibold">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary font-display text-on-primary" aria-hidden="true">
        {n}
      </span>
      {children}
    </h3>
  )
}

export default function AskServices() {
  const { boutique } = useBoutique()
  const { groups } = boutique.services
  const garments = [...new Set(groups.filter((g) => !NOT_GARMENTS.test(g.title)).flatMap((g) => g.items).filter((i) => !JOBS.test(i)))]
  const works = [...new Set(groups.flatMap((g) => g.items).filter((i) => HANDWORK.test(i)))]
  const [garment, setGarment] = useState('')
  const [work, setWork] = useState('')
  if (!garments.length) return null

  const handwork = works.length > 0
  const picked = garment || garments[0]
  const withWork = handwork && work && work !== NONE ? work : ''
  const summary = `${picked}${handwork ? (withWork ? `, with ${midSentence(withWork)}` : work === NONE ? ', no handwork' : '') : ''}`
  const message = `Hi ${boutique.brand.name}, could you tell me the price? ${picked}${withWork ? `, with ${midSentence(withWork)}` : work === NONE ? ', no handwork' : ''}.`

  return (
    <section id="price-taps" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[14ch] text-balance">Get a price in {handwork ? 'three' : 'two'} taps</h2>
        <ol className="mt-10 space-y-10">
          <li>
            <Step n={1}>What garment?</Step>
            <Choices label="Garment" items={garments} value={picked} onPick={setGarment} />
          </li>
          {handwork && (
            <li>
              <Step n={2}>Any handwork?</Step>
              <Choices label="Handwork" items={[...works, NONE]} value={work} onPick={setWork} />
            </li>
          )}
          <li className="flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-ink/15 pt-8">
            <p className="t-3 min-w-0 flex-1 basis-64 text-pretty" aria-live="polite">
              {summary}
            </p>
            <Button href={whatsappLink(boutique, message)} variant="primary" icon={IconBrandWhatsapp}>
              Ask for the price
            </Button>
          </li>
        </ol>
      </div>
    </section>
  )
}
