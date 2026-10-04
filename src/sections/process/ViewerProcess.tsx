// src/sections/process/ViewerProcess.tsx
// The making steps one at a time: a tab per step, and a panel with a photo
// and the full description, with a button to the next step. For a page
// with room for detail. (Lab: process E, "Step viewer".)
//
// Tabs follow the ARIA pattern (arrow keys). Photos come from whatever they
// have shared (interior, team at work, close-ups, work), as StickyProcess
// does. Built-in copy from steps.ts. The panel swaps with a CSS fade.

import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { IconArrowRight } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'
import Media from '../../components/Media'
import { STEPS } from './steps'

export default function ViewerProcess() {
  const { boutique } = useBoutique()
  const id = useId()
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const { media } = boutique
  const pool = [...(media.interior ?? []), ...(media.teamAtWork ? [media.teamAtWork] : []), ...(media.closeups ?? []), ...media.work]
  const step = STEPS[active]

  const go = (i: number) => {
    setActive(i)
    tabs.current[i]?.focus()
  }
  const onKey = (e: KeyboardEvent) => {
    const by = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!by) return
    e.preventDefault()
    go((active + by + STEPS.length) % STEPS.length)
  }

  return (
    <section id="process" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[14ch] text-balance">How your garment is made</h2>
        <div role="tablist" aria-label="Steps" onKeyDown={onKey} className="mt-10 flex flex-wrap gap-2">
          {STEPS.map((s, i) => (
            <button
              key={s.title}
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
              className="group min-h-11 cursor-pointer rounded-full border border-ink/25 px-4 transition-[background-color,border-color,color,scale] duration-200 ease-stitch hover:border-ink active:scale-[0.97] aria-selected:border-primary-ink aria-selected:bg-primary-ink aria-selected:text-on-primary-ink"
            >
              <span className="text-thread group-aria-selected:text-current">{i + 1}</span> {s.title}
            </button>
          ))}
        </div>

        <div
          key={active}
          id={`${id}-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-tab${active}`}
          className="mt-10 grid animate-[fade-in_700ms_var(--ease-stitch)] items-center gap-10 md:grid-cols-12 md:gap-16"
        >
          <div className="arch aspect-[4/5] max-w-md bg-paper md:col-span-5">
            {pool.length > 0 && <Media file={pool[active % pool.length]} alt="" />}
          </div>
          <div className="md:col-span-7">
            <p className="t-small text-thread">
              Step {active + 1} of {STEPS.length}
            </p>
            <h3 className="t-2 mt-2">{step.title}</h3>
            <p className="t-lead mt-5 max-w-[34ch] text-muted">{step.body}</p>
            {active < STEPS.length - 1 && (
              <button type="button" onClick={() => go(active + 1)} className="group mt-8 inline-flex min-h-11 cursor-pointer items-center gap-2 font-semibold text-primary-ink">
                <span className="link-stitch">Next: {STEPS[active + 1].title}</span>
                <IconArrowRight size={18} stroke={1.75} aria-hidden="true" className="transition-transform duration-300 ease-stitch group-hover:translate-x-1" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
