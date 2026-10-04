// src/sections/visit/ShopfrontVisit.tsx
// "This is us": their storefront photo in an arch beside the map, so a
// first-time customer recognises the shop when she reaches the street.
// (Lab: map U, "Shopfront".)
//
// The config holds one storefront photo, so this shows the first branch
// only and hides when there's no storefront in the config at all. A named
// but missing file shows the usual placeholder, which is the team's
// reminder to take the photo.
//
// Motion: the photo settles and the map uncovers as they come into view.
// Reduced motion: both in place.

import { useRef } from 'react'
import { IconBrandWhatsapp, IconDirections } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'
import { settle, wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { MapFrame, midSentence } from './mapShared'

export default function ShopfrontVisit() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const branch = boutique.branches[0]
  const { storefront } = boutique.media

  useMotion(root, () => {
    settle('[data-photo]', { trigger: root.current })
    wipe('[data-map]', { trigger: root.current, delay: 0.15 })
  })

  if (!branch || !storefront) return null

  return (
    <section ref={root} id="visit" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Look for our shopfront</h2>

        <div className="mt-12 grid gap-10 md:grid-cols-12 md:items-end md:gap-8">
          <figure className="md:col-span-5">
            <div className="arch aspect-[3/4] w-full bg-paper">
              <div data-photo className="h-full w-full">
                <Media file={storefront} alt={`The front of ${boutique.brand.name}`} />
              </div>
            </div>
            <figcaption className="mt-4 text-muted">
              This is us{branch.landmark ? `, ${midSentence(branch.landmark)}` : ''}.
            </figcaption>
          </figure>

          <div className="md:col-span-7">
            <div data-map className="aspect-square w-full overflow-hidden bg-paper md:aspect-[4/3]">
              <MapFrame branch={branch} />
            </div>
            <address className="mt-6 not-italic">
              {branch.address}, {branch.city} {branch.pincode}
            </address>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={whatsappLink(boutique)} variant="primary" icon={IconBrandWhatsapp}>
                Chat on WhatsApp
              </Button>
              <Button href={branch.mapsUrl} variant="outline-dark" icon={IconDirections}>
                Get directions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
