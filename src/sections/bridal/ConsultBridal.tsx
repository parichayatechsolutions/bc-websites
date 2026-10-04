// src/sections/bridal/ConsultBridal.tsx
// An invitation to a bridal consult: who she'll be talking to (the owner,
// with their photo when they've allowed it), what to bring, the packages as
// a short list if there are any, and one button to book on WhatsApp.
// (Lab: bridal W, "Owner consult".)
//
// Needs no packages, only a sign the boutique does bridal work (bridalShared
// .ts). The lab put a quote in the owner's mouth ("I sit with every bride
// myself…"); nothing here is said in their name. No photo of a person is
// ever generated: without permission or a photo, it's their logo.
//
// Motion: the portrait settles once as it comes into view.
// Reduced motion: in place.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Logo from '../../components/Logo'
import Media from '../../components/Media'
import { settle } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { useBridal } from './bridalShared'

export default function ConsultBridal() {
  const { boutique } = useBoutique()
  const { packages, doesBridal, price, consult } = useBridal()
  const root = useRef<HTMLElement>(null)
  const { owner, permissions } = boutique
  const portrait = permissions.showOwnerPhoto ? owner.photo : undefined

  useMotion(root, () => {
    settle('[data-photo]', { trigger: root.current })
  })

  if (!doesBridal) return null

  return (
    <section ref={root} id="bridal" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <figure className="flex items-end gap-5 md:col-span-4 md:flex-col md:items-start">
          {portrait ? (
            <div className="arch aspect-[3/4] w-32 shrink-0 bg-paper md:w-full md:max-w-xs">
              <div data-photo className="h-full w-full">
                <Media file={portrait} alt={owner.name} />
              </div>
            </div>
          ) : (
            <Logo className="h-20 w-20 shrink-0 rounded-full text-2xl md:h-28 md:w-28" />
          )}
          <figcaption>
            <p className="t-3">{owner.name}</p>
            {owner.role && <p className="t-small mt-1 text-muted">{owner.role}</p>}
          </figcaption>
        </figure>

        <div className="md:col-span-8">
          <h2 className="t-1 max-w-[14ch] text-balance">Plan your bridal looks with us</h2>
          <p className="t-lead mt-6 max-w-[34ch] text-muted">
            Bring your fabric, your wedding dates and any photos you love. We’ll plan each outfit with you, function by function.
          </p>

          {packages.length > 0 && (
            <ul className="mt-10 border-t border-ink/15">
              {packages.map((p) => (
                <li key={p.name} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-ink/15 py-4">
                  <span className="t-3">{p.name}</span>
                  {price(p) && <span className="text-muted">{price(p)}</span>}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-10">
            <Button href={consult} variant="primary" icon={IconBrandWhatsapp}>
              Book a bridal consult
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
