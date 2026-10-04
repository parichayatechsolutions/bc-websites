// src/sections/saree/WaysSaree.tsx
// One silk saree, three ways: tabs for a wedding, an evening and the
// office, each with the blouse, the jewellery and the drape that suit it.
// (Lab: blog I, "How to wear".)
//
// General styling guidance. Shows only when their services include blouse
// stitching or saree work. Tabs follow the ARIA tabs pattern. No motion.

import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

const SAREE = /saree|sari|blouse|fall|pico|pleat|drap/i

const WAYS = [
  { name: 'For a wedding', rows: [['Blouse', 'Elbow sleeves with handwork on the back'], ['Jewellery', 'A temple necklace and jhumkas'], ['Drape', 'Classic Nivi, pleats pinned crisp']] },
  { name: 'For an evening', rows: [['Blouse', 'Sleeveless or a boat neck in a contrast colour'], ['Jewellery', 'One statement choker, nothing at the ears'], ['Drape', 'Pallu open and long over the arm']] },
  { name: 'For the office', rows: [['Blouse', 'A high neck with three-quarter sleeves'], ['Jewellery', 'Small studs and a thin chain'], ['Drape', 'Pallu pleated and pinned at the shoulder']] },
]

export default function WaysSaree() {
  const { boutique } = useBoutique()
  const id = useId()
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const [index, setIndex] = useState(0)
  const relevant = boutique.services.groups.flatMap((g) => g.items).some((i) => SAREE.test(i))
  if (!relevant) return null
  const way = WAYS[index]

  const onKey = (e: KeyboardEvent) => {
    const by = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!by) return
    const next = (index + by + WAYS.length) % WAYS.length
    setIndex(next)
    tabs.current[next]?.focus()
  }

  return (
    <section id="saree-ways" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[14ch] text-balance">One silk saree, three ways</h2>
        <div role="tablist" aria-label="Occasions" className="mt-10 flex flex-wrap gap-2" onKeyDown={onKey}>
          {WAYS.map((w, i) => (
            <button
              key={w.name}
              ref={(el) => {
                tabs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`${id}-t${i}`}
              aria-selected={i === index}
              aria-controls={`${id}-p`}
              tabIndex={i === index ? 0 : -1}
              onClick={() => setIndex(i)}
              className="min-h-11 cursor-pointer rounded-full border border-ink/25 px-5 transition-[background-color,border-color,color] duration-200 ease-stitch hover:border-ink aria-selected:border-primary-ink aria-selected:bg-primary-ink aria-selected:text-on-primary-ink"
            >
              {w.name}
            </button>
          ))}
        </div>
        <dl role="tabpanel" id={`${id}-p`} aria-labelledby={`${id}-t${index}`} className="mt-8 border-t-2 border-ink">
          {way.rows.map(([label, value]) => (
            <div key={label} className="grid gap-1 border-b border-ink/15 py-5 md:grid-cols-12 md:gap-8">
              <dt className="t-3 md:col-span-3">{label}</dt>
              <dd className="t-lead md:col-span-9">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like a blouse to wear my silk saree ${way.name.toLowerCase()}.`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask for the blouse
          </Button>
        </div>
      </div>
    </section>
  )
}
