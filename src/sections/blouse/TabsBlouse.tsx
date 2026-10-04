// src/sections/blouse/TabsBlouse.tsx
// Design a blouse part by part: an underlined tab for the neck, the back
// and the sleeves, each showing its options as drawn tiles, with a summary
// card beside that reads the choices back and sends them.
// (Lab: blouse E, "Part tabs".)
//
// Shows only for a boutique that stitches blouses. Tabs follow the ARIA
// tabs pattern. No motion.

import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import Button from '../../components/Button'
import { BACKS, BlouseFlat, describe, NECKS, SLEEVES } from './blouseDrawing'
import { useBlouse } from './blouseShared'

export default function TabsBlouse() {
  const { stitchesBlouses, priceLine, send } = useBlouse()
  const id = useId()
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const [tab, setTab] = useState(0)
  const [picks, setPicks] = useState({ neck: 'round', back: 'u', sleeve: 'elbow' })
  if (!stitchesBlouses) return null

  const parts = [
    { key: 'neck' as const, label: 'Neck', options: NECKS, draw: (o: string) => <BlouseFlat neck={o} sleeve="cap" /> },
    { key: 'back' as const, label: 'Back', options: BACKS, draw: (o: string) => <BlouseFlat neck={o} sleeve="cap" back /> },
    { key: 'sleeve' as const, label: 'Sleeves', options: SLEEVES, draw: (o: string) => <BlouseFlat neck="round" sleeve={o} /> },
  ]
  const part = parts[tab]

  const onKey = (e: KeyboardEvent) => {
    const by = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!by) return
    const next = (tab + by + parts.length) % parts.length
    setTab(next)
    tabs.current[next]?.focus()
  }

  return (
    <section id="blouse" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-8">
          <h2 className="t-1 max-w-[12ch] text-balance">Design your blouse</h2>
          <div role="tablist" aria-label="Parts" className="mt-8 flex gap-6 border-b border-ink/15" onKeyDown={onKey}>
            {parts.map((p, i) => (
              <button
                key={p.key}
                ref={(el) => {
                  tabs.current[i] = el
                }}
                type="button"
                role="tab"
                id={`${id}-t${i}`}
                aria-selected={i === tab}
                aria-controls={`${id}-p`}
                tabIndex={i === tab ? 0 : -1}
                onClick={() => setTab(i)}
                className="-mb-px min-h-12 cursor-pointer border-b-2 border-transparent transition-colors duration-200 ease-stitch hover:text-primary-ink aria-selected:border-primary-ink aria-selected:font-semibold aria-selected:text-primary-ink"
              >
                {p.label}
              </button>
            ))}
          </div>
          <ul role="tabpanel" id={`${id}-p`} aria-labelledby={`${id}-t${tab}`} className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {part.options.map((o) => (
              <li key={o.id}>
                <button
                  type="button"
                  onClick={() => setPicks({ ...picks, [part.key]: o.id })}
                  aria-pressed={picks[part.key] === o.id}
                  className="w-full cursor-pointer rounded-2xl border border-ink/15 p-3 text-left transition-[border-color,background-color] duration-200 ease-stitch hover:border-ink aria-pressed:border-primary-ink aria-pressed:bg-paper"
                >
                  <span className="block aspect-[5/4]">{part.draw(o.id)}</span>
                  <span className="mt-2 block font-semibold">{o.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <aside className="self-start rounded-2xl bg-paper p-6 md:sticky md:top-24 md:col-span-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="aspect-[5/4]">
              <BlouseFlat neck={picks.neck} sleeve={picks.sleeve} />
            </div>
            <div className="aspect-[5/4]">
              <BlouseFlat neck={picks.back} sleeve={picks.sleeve} back />
            </div>
          </div>
          <p className="mt-4" aria-live="polite">
            A blouse with {describe(picks.neck, picks.back, picks.sleeve)}.
          </p>
          {priceLine && <p className="t-small mt-2 text-muted">{priceLine}</p>}
          <div className="mt-6">
            <Button href={send(picks.neck, picks.back, picks.sleeve)} variant="primary" icon={IconBrandWhatsapp}>
              Send this design
            </Button>
          </div>
        </aside>
      </div>
    </section>
  )
}
