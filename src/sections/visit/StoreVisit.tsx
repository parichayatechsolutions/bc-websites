// src/sections/visit/StoreVisit.tsx
// Where to find them, when they're open, and the three ways to get in touch.

import type { ReactNode } from 'react'
import {
  IconBrandWhatsapp,
  IconClock,
  IconDirections,
  IconLanguage,
  IconMapPin,
  IconParking,
  IconPhone,
  type Icon,
} from '@tabler/icons-react'
import { telLink, useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'
import Magnetic from '../../motion/Magnetic'

function Detail({ icon: DetailIcon, children }: { icon: Icon; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[1.5rem_1fr] gap-x-3">
      <DetailIcon size={22} stroke={1.5} className="mt-0.5 text-primary-ink" aria-hidden="true" />
      <div>{children}</div>
    </div>
  )
}

export default function StoreVisit() {
  const { boutique } = useBoutique()
  const { branches, contact, media } = boutique

  return (
    <section id="visit" className="section">
      <div className="wrap grid gap-16 md:grid-cols-12">
        <div className="md:col-span-7">
          <h2 className="t-1">{branches.length > 1 ? 'Visit a branch' : 'Visit the store'}</h2>

          <ul className="mt-12 space-y-14">
            {branches.map((b) => (
              <li key={b.name + b.address}>
                <h3 className="t-3 text-primary-ink">
                  {b.name}
                  {branches.length > 1 && `, ${b.city}`}
                </h3>
                <div className="mt-5 space-y-4">
                  <Detail icon={IconMapPin}>
                    <address className="not-italic">
                      {b.address}
                      <br />
                      {b.city} {b.pincode}
                    </address>
                    {b.landmark && <p className="text-muted">{b.landmark}</p>}
                  </Detail>
                  {b.hours && <Detail icon={IconClock}>{b.hours}</Detail>}
                  {b.parking && <Detail icon={IconParking}>Parking available</Detail>}
                </div>
                <div className="mt-6">
                  <Button href={b.mapsUrl} variant="outline-dark" icon={IconDirections}>
                    Get directions
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-16 flex flex-wrap gap-3 border-t border-ink/10 pt-10">
            <Magnetic>
              <Button href={whatsappLink(boutique)} variant="primary" icon={IconBrandWhatsapp}>
                Chat on WhatsApp
              </Button>
            </Magnetic>
            <Button href={telLink(contact.phone)} variant="outline-dark" icon={IconPhone}>
              Call {contact.phone}
            </Button>
          </div>
          {contact.languages && contact.languages.length > 0 && (
            <div className="mt-6 text-muted">
              <Detail icon={IconLanguage}>We speak {contact.languages.join(', ')}.</Detail>
            </div>
          )}
        </div>

        {media.storefront && (
          <div className="md:col-span-5">
            <div className="arch aspect-[3/4] w-full">
              <Media file={media.storefront} alt={`${boutique.brand.name} storefront`} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
