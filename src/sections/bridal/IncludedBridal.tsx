// src/sections/bridal/IncludedBridal.tsx
// What each package includes: a tab per package over one list of
// everything any package offers, ticked where the chosen package has it
// and greyed where it doesn't, so the difference is plain.
// (Lab: bridal U, "What is included".)
//
// From `bridalPackages`; needs two or more with something listed. Prices
// only with permission. Tabs follow the ARIA tabs pattern. No motion.

import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { IconBrandWhatsapp, IconCheck, IconMinus } from '@tabler/icons-react'
import { capitalise } from '../../app/text'
import Button from '../../components/Button'
import { useBridal } from './bridalShared'

export default function IncludedBridal() {
  const { packages, price, ask } = useBridal()
  const id = useId()
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const [index, setIndex] = useState(0)
  const every = [...new Set(packages.flatMap((p) => p.includes.map((i) => i.toLowerCase())))]
  if (packages.length < 2 || !every.length) return null
  const chosen = packages[index] ?? packages[0]
  const has = new Set(chosen.includes.map((i) => i.toLowerCase()))

  const onKey = (e: KeyboardEvent) => {
    const by = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!by) return
    const next = (index + by + packages.length) % packages.length
    setIndex(next)
    tabs.current[next]?.focus()
  }

  return (
    <section id="bridal" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[12ch] text-balance">What’s included</h2>
        <div role="tablist" aria-label="Bridal packages" className="mt-10 flex flex-wrap gap-2" onKeyDown={onKey}>
          {packages.map((p, i) => (
            <button
              key={p.name}
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
              {p.name}
            </button>
          ))}
        </div>
        <div role="tabpanel" id={`${id}-p`} aria-labelledby={`${id}-t${index}`} className="mt-8 rounded-2xl border border-ink/15 p-6 md:p-10">
          {price(chosen) && <p className="t-2">{price(chosen)}</p>}
          <ul className={price(chosen) ? 'mt-6' : ''}>
            {every.map((item) => {
              const yes = has.has(item)
              return (
                <li key={item} className={`flex items-center gap-3 border-b border-ink/10 py-3 ${yes ? '' : 'text-muted line-through decoration-ink/30'}`}>
                  {yes ? (
                    <IconCheck size={20} stroke={1.75} className="shrink-0 text-primary-ink" aria-hidden="true" />
                  ) : (
                    <IconMinus size={20} stroke={1.5} className="shrink-0" aria-hidden="true" />
                  )}
                  <span>
                    {capitalise(item)}
                    {!yes && <span className="sr-only"> (not in this package)</span>}
                  </span>
                </li>
              )
            })}
          </ul>
          <div className="mt-8">
            <Button href={ask(chosen)} variant="primary" icon={IconBrandWhatsapp}>
              Ask about {chosen.name}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
