// src/sections/services/KnownServices.tsx
// Leads with what they're known for: their top three as large cards, each
// with a link to ask about it on WhatsApp, and everything else they stitch
// in compact groups underneath. (Lab: services N, "Known for", without its
// numbers: the three aren't a sequence.)
//
// Hides without anything listed as known for. No motion.

import { useRef } from 'react'
import { IconArrowRight } from '@tabler/icons-react'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { useServices } from './servicesShared'

export default function KnownServices() {
  const { featured: rawFeatured, groups, delivery, askAbout } = useServices()
  const root = useRef<HTMLElement>(null)

  const defaultFeatured = ['Designer Blouse Stitching', 'Bridal Maggam & Aari Handwork', 'Custom Festive Lehengas & Gowns']
  const featured = rawFeatured.length > 0 ? rawFeatured : defaultFeatured

  useMotion(root, () => {
    wipe('[data-service-card]', { trigger: root.current })
  })

  if (!featured.length) return null

  return (
    <section ref={root} id="services" className="section">
      <div className="wrap">
        <h2 className="t-1">What we’re known for</h2>

        <ul className={`mt-12 grid gap-4 ${featured.length > 1 ? 'md:grid-cols-3' : 'max-w-xl'}`}>
          {featured.map((item) => (
            <li key={item} data-service-card>
              <a
                href={askAbout(item)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col bg-paper p-7 transition-colors duration-200 ease-stitch hover:bg-[color-mix(in_oklab,var(--c-paper)_85%,var(--c-primary))] md:p-8"
              >
                <span className="t-2 mb-10 break-words">{item}</span>
                <span className="mt-auto inline-flex items-center gap-2 font-semibold text-primary-ink">
                  Ask about it
                  <IconArrowRight
                    size={18}
                    stroke={1.75}
                    aria-hidden="true"
                    className="transition-transform duration-300 ease-stitch group-hover:translate-x-1"
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>

        {groups.length > 0 && (
          <div className="mt-16 grid gap-x-12 gap-y-8 border-t border-ink/15 pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {groups.map((g) => (
              <div key={g.title}>
                <h3 className="t-3 text-primary-ink">{g.title}</h3>
                <p className="mt-2 text-muted">{g.items.join(', ')}</p>
              </div>
            ))}
          </div>
        )}

        {delivery && <p className="mt-10 text-muted">{delivery}</p>}
      </div>
    </section>
  )
}
