// src/sections/visit/TabsVisit.tsx
// Finding them, in three tabs: the map, the opening hours, and how to get
// in touch. One compact panel instead of a long section.
// (Lab: map O, "Map tabs".)
//
// The first branch. A tab without data (no hours) is left out. Tabs follow
// the ARIA pattern (arrow keys). No motion.

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { IconBrandWhatsapp, IconDirections, IconPhone } from '@tabler/icons-react'
import { telLink, useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { MapFrame } from './mapShared'

export default function TabsVisit() {
  const { boutique } = useBoutique()
  const id = useId()
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const branch = boutique.branches[0]
  if (!branch) return null

  const panels: { name: string; body: ReactNode }[] = [
    {
      name: 'Map',
      body: (
        <div>
          <div className="aspect-[4/3] w-full overflow-hidden bg-paper md:aspect-[16/9]">
            <MapFrame branch={branch} />
          </div>
          <p className="mt-4">
            {branch.address}, {branch.city} {branch.pincode}
          </p>
          <div className="mt-5">
            <Button href={branch.mapsUrl} variant="outline-dark" icon={IconDirections}>
              Get directions
            </Button>
          </div>
        </div>
      ),
    },
    ...(branch.hours ? [{ name: 'Hours', body: <p className="t-2">{branch.hours}</p> }] : []),
    {
      name: 'Contact',
      body: (
        <div className="flex flex-wrap gap-3">
          <Button href={whatsappLink(boutique)} variant="primary" icon={IconBrandWhatsapp}>
            Chat on WhatsApp
          </Button>
          <Button href={telLink(boutique.contact.phone)} variant="outline-dark" icon={IconPhone}>
            Call {boutique.contact.phone}
          </Button>
        </div>
      ),
    },
  ]
  const current = panels[active] ?? panels[0]

  const onKey = (e: KeyboardEvent) => {
    const by = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!by) return
    e.preventDefault()
    const next = (active + by + panels.length) % panels.length
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <section id="visit" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1">Find us</h2>
        <div role="tablist" aria-label="Find us" onKeyDown={onKey} className="mt-8 flex gap-x-8 border-b border-ink/15">
          {panels.map((p, i) => (
            <button
              key={p.name}
              ref={(el) => {
                tabs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`${id}-tab${i}`}
              aria-selected={i === active}
              aria-controls={`${id}-panel`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className="-mb-px min-h-12 cursor-pointer border-b-2 border-transparent transition-colors duration-200 ease-stitch hover:text-primary-ink aria-selected:border-primary-ink aria-selected:text-primary-ink"
            >
              {p.name}
            </button>
          ))}
        </div>
        <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab${active}`} className="mt-8">
          {current.body}
        </div>
      </div>
    </section>
  )
}
