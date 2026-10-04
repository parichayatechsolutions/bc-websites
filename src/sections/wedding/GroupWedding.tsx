// src/sections/wedding/GroupWedding.tsx
// Add us to your wedding group: a drawn WhatsApp group (the wedding's
// name, the family, and the boutique among them) and a button that asks
// the boutique whether they'll join, so the family can share outfit plans
// in one place. (Lab: wed N, "Family group".)
//
// A drawing, not a real group; the button asks. Shows only for a boutique
// that does bridal work. No motion.

import { IconBrandWhatsapp, IconUsers } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Logo from '../../components/Logo'
import { useWedding } from './weddingShared'

export default function GroupWedding() {
  const { boutique } = useBoutique()
  const { doesBridal } = useWedding()
  if (!doesBridal) return null
  const members = ['You', 'Amma', 'Sister', 'Cousins']

  return (
    <section id="wedding-group" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-6">
          <h2 className="t-1 max-w-[12ch] text-balance">Add us to your wedding group</h2>
          <p className="t-lead mt-5 max-w-[34ch] text-muted">The whole family’s outfits, photos and measurements in one chat, with us in it.</p>
          <div className="mt-8">
            <Button
              href={whatsappLink(boutique, `Hi ${boutique.brand.name}, we'd like to add you to our wedding WhatsApp group so the family can share outfit plans with you. Is that alright?`)}
              variant="primary"
              icon={IconBrandWhatsapp}
            >
              Ask us to join
            </Button>
          </div>
        </div>
        <div className="md:col-span-6" aria-hidden="true">
          <div className="mx-auto max-w-sm overflow-hidden rounded-2xl border border-ink/15">
            <div className="flex items-center gap-3 bg-primary-ink px-5 py-4 text-on-primary-ink">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-on-primary-ink/15">
                <IconUsers size={22} stroke={1.75} />
              </span>
              <div>
                <p className="font-semibold">Our wedding</p>
                <p className="t-small opacity-80">{members.length + 1} members</p>
              </div>
            </div>
            <ul className="divide-y divide-ink/10 bg-light">
              {members.map((m) => (
                <li key={m} className="flex items-center gap-3 px-5 py-3">
                  <span className="t-small grid h-9 w-9 place-items-center rounded-full bg-paper font-semibold text-primary-ink">{m.charAt(0)}</span>
                  {m}
                </li>
              ))}
              <li className="flex items-center gap-3 bg-paper px-5 py-3">
                <Logo className="h-9 w-9 rounded-full" />
                <span className="font-semibold">{boutique.brand.name}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
