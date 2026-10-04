// src/sections/services/CloudServices.tsx
// Everything they stitch as a cloud of tappable pills, what they're known
// for set larger and in brand colour; each pill opens WhatsApp asking about
// that one thing. Shows range at a glance. (Lab: services Y, "Service
// cloud".)
//
// The pills are real links, so the pill shape is earned. Their own
// services; hides without any. No motion.

import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useServices } from './servicesShared'

export default function CloudServices() {
  const { boutique } = useBoutique()
  const { groups, featured } = useServices()
  const items = [...new Set([...featured, ...groups.flatMap((g) => g.items)])]
  if (!items.length) return null
  const isFeatured = (item: string) => featured.includes(item)

  return (
    <section id="services" className="section">
      <div className="wrap max-w-5xl">
        <h2 className="t-1 max-w-[14ch] text-balance">Everything we stitch</h2>
        <p className="mt-4 text-muted">Tap anything to ask about it on WhatsApp.</p>
        <ul className="mt-10 flex flex-wrap gap-2 md:gap-3">
          {items.map((item) => (
            <li key={item}>
              <a
                href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to ask about ${item.charAt(0).toLowerCase()}${item.slice(1)}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex min-h-11 items-center rounded-full border px-5 transition-[background-color,border-color,color,scale] duration-200 ease-stitch active:scale-[0.97] ${
                  isFeatured(item)
                    ? 't-3 border-primary-ink bg-primary-ink py-2 text-on-primary-ink hover:bg-[color-mix(in_oklab,var(--c-primary-ink)_85%,black)]'
                    : 'border-ink/25 hover:border-ink'
                }`}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
