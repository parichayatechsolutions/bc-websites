// src/sections/kids/GrowthKids.tsx
// A growth chart: a measuring stick marked with ages, tallest at the top;
// tapping an age shows the usual height, chest and garment length for it.
// (Lab: kids V, "Growth chart".)
//
// Common starting points (kidsSizes), labelled as such; every child
// differs. Needs a Kids group in their services. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { SIZES } from './kidsSizes'

export default function GrowthKids() {
  const { boutique } = useBoutique()
  const hasKids = boutique.services.groups.some((g) => /^kid|child/i.test(g.title))
  const [index, setIndex] = useState(3)
  if (!hasKids) return null
  const [age, height, chest, length] = SIZES[index]

  return (
    <section id="kids-sizes" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">Sizes by age</h2>
          <p className="mt-5 max-w-[34ch] text-muted">Tap an age for the usual sizes, as a starting point. Every child is different, so measure if you can.</p>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t-2 border-ink pt-6" aria-live="polite">
            <div className="col-span-3">
              <dt className="sr-only">Age</dt>
              <dd className="t-2 text-primary-ink">{age}</dd>
            </div>
            {[
              ['Height', `${height} cm`],
              ['Chest', `${chest} in`],
              ['Length', `${length} in`],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="t-small text-muted">{label}</dt>
                <dd className="t-3 tabular-nums">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like something stitched for my child, who is ${age.replace(' years', '')} years old.`)} variant="primary" icon={IconBrandWhatsapp}>
              Ask about an outfit
            </Button>
          </div>
        </div>
        <ol className="relative flex flex-col-reverse border-l-[14px] border-accent md:col-span-6 md:col-start-7" role="group" aria-label="Age">
          {SIZES.map(([a], i) => (
            <li key={a} className="border-t border-ink/15 first:border-b">
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-pressed={i === index}
                className="group flex min-h-12 w-full cursor-pointer items-center gap-4 text-left"
              >
                <span aria-hidden="true" className="h-0.5 w-6 bg-ink/40 transition-[width,background-color] duration-200 ease-stitch group-hover:w-10 group-aria-pressed:w-14 group-aria-pressed:bg-primary-ink" />
                <span className="group-aria-pressed:font-semibold group-aria-pressed:text-primary-ink">{a}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
