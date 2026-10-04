// src/sections/services/KnownServices.tsx
// Leads with what they're known for: their top three as large cards, each
// with a link to ask about it on WhatsApp, and everything else they stitch
// in compact groups underneath. (Lab: services N, "Known for", without its
// numbers: the three aren't a sequence.)
//
// Hides without anything listed as known for. No motion.

import { IconArrowRight } from '@tabler/icons-react'
import { useServices } from './servicesShared'

export default function KnownServices() {
  const { featured, groups, delivery, askAbout } = useServices()
  if (!featured.length) return null

  return (
    <section id="services" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[14ch] text-balance">What we’re known for</h2>

        <ul className={`mt-12 grid gap-4 ${featured.length > 1 ? 'md:grid-cols-3' : 'max-w-xl'}`}>
          {featured.map((item) => (
            <li key={item}>
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
