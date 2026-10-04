// src/sections/fabric/CareFabrics.tsx
// How to look after each fabric they stock: a tab per fabric, and for the
// one picked, how to wash, iron and store it. (Lab: fabric X, "Care
// guide".)
//
// Only their fabrics whose kind is known (silk, cotton, georgette…); the
// care notes are general, true of the cloth itself. Hides without a match;
// with one, no tabs. Tabs follow the ARIA tabs pattern. No motion.

import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { IconArchive, IconIroning, IconWashMachine } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'

const CARE = [
  { match: /silk|kanjiv|kanchi|banaras|pattu|paithani/i, wash: 'Dry clean the first few times; after that, a gentle cold hand wash with mild soap.', iron: 'Low heat on the reverse, with a cloth between the iron and the silk.', store: 'Folded in a muslin cloth, refolded every few months so the creases don’t set.' },
  { match: /cotton|mul|khadi|cambric/i, wash: 'Cold or lukewarm, dark colours apart for the first washes.', iron: 'Medium to hot while still a little damp.', store: 'Folded or hung, anywhere dry and out of direct sun.' },
  { match: /georgette|chiffon/i, wash: 'Cold hand wash; don’t wring, roll it in a towel.', iron: 'Low heat on the reverse, or steam.', store: 'Folded loosely; hanging can stretch it.' },
  { match: /linen/i, wash: 'Cold or lukewarm; it softens with every wash.', iron: 'Hot, while damp. Creases are part of linen’s charm.', store: 'Hung, or folded loosely.' },
  { match: /velvet/i, wash: 'Dry clean only.', iron: 'Never press flat; steam from the reverse.', store: 'Hung, with nothing pressing on the pile.' },
  { match: /organza|net/i, wash: 'Dry clean, or a very gentle cold hand wash.', iron: 'Lowest heat with a cloth over it, or steam.', store: 'Hung, or folded with tissue between the layers.' },
  { match: /crepe/i, wash: 'Cold hand wash or dry clean; it can shrink in heat.', iron: 'Low heat on the reverse.', store: 'Hung, away from damp.' },
]

const ROWS = [
  { key: 'wash', label: 'Wash', icon: IconWashMachine },
  { key: 'iron', label: 'Iron', icon: IconIroning },
  { key: 'store', label: 'Store', icon: IconArchive },
] as const

export default function CareFabrics() {
  const { boutique } = useBoutique()
  const id = useId()
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const [index, setIndex] = useState(0)
  const fabrics = (boutique.fabrics ?? [])
    .map((f) => ({ name: f.name, care: CARE.find((c) => c.match.test(f.name)) }))
    .filter((f): f is { name: string; care: (typeof CARE)[number] } => Boolean(f.care))
    .slice(0, 6)
  if (!fabrics.length) return null
  const fabric = fabrics[index] ?? fabrics[0]

  const onKey = (e: KeyboardEvent) => {
    const by = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!by) return
    const next = (index + by + fabrics.length) % fabrics.length
    setIndex(next)
    tabs.current[next]?.focus()
  }

  return (
    <section id="fabric-care" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[12ch] text-balance">Caring for your fabric</h2>
        {fabrics.length > 1 && (
          <div role="tablist" aria-label="Fabrics" className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-b border-ink/15" onKeyDown={onKey}>
            {fabrics.map((f, i) => (
              <button
                key={f.name}
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
                className="-mb-px min-h-12 cursor-pointer border-b-2 border-transparent transition-colors duration-200 ease-stitch hover:text-primary-ink aria-selected:border-primary-ink aria-selected:font-semibold aria-selected:text-primary-ink"
              >
                {f.name}
              </button>
            ))}
          </div>
        )}
        <div role={fabrics.length > 1 ? 'tabpanel' : undefined} id={`${id}-p`} aria-labelledby={fabrics.length > 1 ? `${id}-t${index}` : undefined} className="mt-8">
          {fabrics.length === 1 && <h3 className="t-3">{fabric.name}</h3>}
          <dl className="grid gap-4 md:grid-cols-3">
            {ROWS.map(({ key, label, icon: Icon }) => (
              <div key={key} className="rounded-2xl bg-paper p-6">
                <dt className="flex items-center gap-3 font-semibold">
                  <Icon size={24} stroke={1.5} className="text-primary-ink" aria-hidden="true" />
                  {label}
                </dt>
                <dd className="mt-3 text-muted">{fabric.care[key]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
