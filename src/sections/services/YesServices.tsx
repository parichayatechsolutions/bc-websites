// src/sections/services/YesServices.tsx
// "Yes, we do that." Every service they offer with a filled tick, grouped,
// and a card at the end for anything not on the list: ask anyway. Answers
// the question most customers came with. (Lab: services V, "Yes, we do
// that".)
//
// Their own services; hides without any. No motion.

import { IconBrandWhatsapp, IconCircleCheckFilled } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { useServices } from './servicesShared'

export default function YesServices() {
  const { boutique } = useBoutique()
  const { groups } = useServices()
  if (!groups.length) return null

  return (
    <section id="services" className="section">
      <div className="wrap">
        <h2 className="t-1">Yes, we do that</h2>
        <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => (
            <div key={g.title}>
              <h3 className="t-3 text-primary-ink">{g.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {g.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <IconCircleCheckFilled size={22} className="mt-0.5 shrink-0 text-primary-ink" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="rounded-2xl bg-paper p-6 sm:self-start">
            <h3 className="t-3">Not on the list?</h3>
            <p className="mt-2 text-muted">Ask anyway. Send us a photo of what you have in mind.</p>
            <div className="mt-5">
              <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, do you make this? Here's a photo.`)} variant="primary" icon={IconBrandWhatsapp}>
                Ask anyway
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
