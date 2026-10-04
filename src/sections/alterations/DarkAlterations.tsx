// src/sections/alterations/DarkAlterations.tsx
// The drag-to-compare photo on a dark ground, with its note and previous /
// next for more pairs: the evening version of SliderAlterations, for the
// darker designs. (Lab: alt D, "Dark slider".)
//
// Needs before/after pairs; hides without them.
//
// Motion: the divider sweeps across and back once as it comes into view.
// Reduced motion: it rests in the middle.

import { useRef, useState } from 'react'
import { IconBrandWhatsapp, IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { useMotion } from '../../motion/useMotion'
import { Compare, sweep, useAlterations } from './altShared'

const ROUND =
  'grid h-12 w-12 cursor-pointer place-items-center rounded-full bg-light/10 text-light transition-[background-color,translate] duration-300 ease-stitch hover:-translate-y-1 hover:bg-light/20 active:translate-y-0'

export default function DarkAlterations() {
  const { boutique } = useBoutique()
  const { pairs, caption } = useAlterations()
  const [index, setIndex] = useState(0)
  const root = useRef<HTMLElement>(null)

  useMotion(root, () => {
    sweep(root.current)
  })

  if (!pairs.length) return null
  const pair = pairs[index] ?? pairs[0]
  const step = (by: number) => setIndex((index + by + pairs.length) % pairs.length)

  return (
    <section ref={root} id="alterations" className="section bg-dark text-light">
      <div className="wrap max-w-5xl">
        <h2 className="t-1 max-w-[10ch] text-balance">Before and after</h2>
        <Compare key={pair.before} pair={pair} caption={caption(pair)} className="mt-10 aspect-[4/5] md:aspect-[16/10]" />
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-[50ch] text-light/80">{caption(pair) ?? 'Drag across the photo to compare.'}</p>
          {pairs.length > 1 && (
            <div className="flex gap-3">
              <button type="button" onClick={() => step(-1)} aria-label="Previous alteration" className={ROUND}>
                <IconChevronLeft size={22} stroke={1.5} aria-hidden="true" />
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Next alteration" className={ROUND}>
                <IconChevronRight size={22} stroke={1.5} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
        <div className="mt-10">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I have something that needs altering.`)} icon={IconBrandWhatsapp}>
            Send a photo on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  )
}
