// src/sections/kids/FirstsKids.tsx
// A year of firsts: the occasions a little one is dressed up for (naming
// ceremony, first rice, first birthday, first festival) along a thread,
// each a link to ask for an outfit for it. (Lab: kids E, "A year of
// firsts".)
//
// The occasions are general, true of growing up, not claims about the
// boutique. Their ages show when `services.kidsAges` is filled. Needs a
// Kids group in their services.
//
// Motion: the thread draws itself down once. Reduced motion: in place.

import { useRef } from 'react'
import { IconBabyCarriage, IconBowl, IconCake, IconConfetti, IconSchool, IconSparkles } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { draw } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

const FIRSTS = [
  { name: 'Naming ceremony', note: 'Soft, light cotton for the cradle', icon: IconBabyCarriage },
  { name: 'First rice ceremony', note: 'A tiny silk langa or dhoti set', icon: IconBowl },
  { name: 'First birthday', note: 'A frock or kurta set for the photos', icon: IconCake },
  { name: 'First festival', note: 'Something bright for Diwali, Onam or Eid', icon: IconSparkles },
  { name: 'A family wedding', note: 'Something to match the rest of the family', icon: IconConfetti },
  { name: 'School annual day', note: 'An outfit for the stage', icon: IconSchool },
]

export default function FirstsKids() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const hasKids = boutique.services.groups.some((g) => /^kid|child/i.test(g.title))
  const ages = boutique.services.kidsAges

  useMotion(root, () => {
    draw('[data-thread]', { trigger: root.current, from: 'top' })
  })

  if (!hasKids) return null

  return (
    <section ref={root} id="kids" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">A year of firsts</h2>
          {ages && <p className="t-lead mt-6 text-muted">We stitch for children from {ages}.</p>}
        </div>
        <ol className="relative md:col-span-7">
          <span data-thread aria-hidden="true" className="absolute top-6 bottom-6 left-[1.4rem] border-l-2 border-dashed border-thread" />
          {FIRSTS.map(({ name, note, icon: Icon }) => (
            <li key={name}>
              <a
                href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like an outfit stitched for my child's ${name.toLowerCase()}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex min-h-16 items-center gap-5 py-3"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-thread bg-light text-primary-ink transition-colors duration-200 ease-stitch group-hover:bg-primary-ink group-hover:text-on-primary-ink">
                  <Icon size={22} stroke={1.5} aria-hidden="true" />
                </span>
                <span>
                  <span className="t-3 link-stitch block w-fit">{name}</span>
                  <span className="t-small block text-muted">{note}</span>
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
