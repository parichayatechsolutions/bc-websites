// src/sections/bridal/InviteBridal.tsx
// A wedding invitation, turned round: a framed card inviting the bride to a
// consult at the boutique, with where and when they're open and one button
// to accept on WhatsApp. (Lab: bridal L, "Invitation".)
//
// Needs no packages, only bridal work in their services (bridalShared).
// The frame is two fine rules in the accent colour. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Logo from '../../components/Logo'
import { useBridal } from './bridalShared'

export default function InviteBridal() {
  const { boutique } = useBoutique()
  const { doesBridal, consult } = useBridal()
  if (!doesBridal) return null
  const branch = boutique.branches[0]

  return (
    <section id="bridal" className="section bg-paper">
      <div className="wrap">
        <div className="mx-auto max-w-2xl border border-accent p-2">
          <div className="flex flex-col items-center border border-accent/60 bg-light px-6 py-12 text-center md:px-14 md:py-16">
            <Logo className="h-14 w-14" />
            <p className="t-small mt-8 text-muted">You are invited to a bridal consult at</p>
            <h2 className="t-1 mt-3 max-w-[16ch] text-balance text-primary-ink">{boutique.brand.name}</h2>
            <div className="zari mx-auto mt-8 w-32" aria-hidden="true" />
            <p className="t-lead mt-8 max-w-[30ch]">Bring your fabric, your dates and the looks you love.</p>
            {branch && (
              <p className="mt-6 text-muted">
                {branch.area ? `${branch.area}, ${branch.city}` : branch.city}
                {branch.hours && (
                  <>
                    <br />
                    {branch.hours}
                  </>
                )}
              </p>
            )}
            <div className="mt-10">
              <Button href={consult} variant="primary" icon={IconBrandWhatsapp}>
                Accept on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
