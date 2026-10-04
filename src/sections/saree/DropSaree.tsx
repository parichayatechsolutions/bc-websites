// src/sections/saree/DropSaree.tsx
// Drop off and pick up: three steps for a saree finish (bring it in, we
// do the work, collect it), with where to bring it and when they're open,
// and the saree services they do. (Lab: saree V, "Drop off and pick up".)
//
// Their branches with hours, up to five; the pick-up step gives their usual
// days only when `pricing.deliveryDays` is filled. Needs a saree service.
//
// Motion: the thread between the steps draws across once.
// Reduced motion: in place.

import { useRef } from 'react'
import { IconBrandWhatsapp, IconBuildingStore, IconNeedleThread, IconShoppingBag } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { joinList } from '../../app/text'
import Button from '../../components/Button'
import { draw } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

const SAREE = /saree|sari|fall|pico|pleat|drap|kuchu|tassel|petticoat/i

export default function DropSaree() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const services = [...new Set(boutique.services.groups.flatMap((g) => g.items).filter((i) => SAREE.test(i)))]
  const branches = boutique.branches.slice(0, 5)
  const days = boutique.pricing?.deliveryDays

  useMotion(root, ({ desktop }) => {
    draw('[data-thread]', { trigger: root.current, from: desktop ? 'start' : 'top' })
  })

  if (!services.length) return null

  const steps = [
    { title: 'Drop it off', icon: IconBuildingStore, body: branches.length === 1 ? 'At our store, below.' : 'At any of our stores, below.' },
    { title: 'We finish it', icon: IconNeedleThread, body: `${joinList(services)}.` },
    { title: 'Pick it up', icon: IconShoppingBag, body: days ? `Usually ready in ${days} days.` : 'Collect it from the same store.' },
  ]

  return (
    <section ref={root} id="saree-drop" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[14ch] text-balance">Drop off your saree</h2>
        <div className="relative mt-14">
          <span
            data-thread
            aria-hidden="true"
            className="absolute top-7 bottom-7 left-7 border-l-2 border-dashed border-thread md:right-[16.7%] md:bottom-auto md:left-[16.7%] md:border-t-2 md:border-l-0"
          />
          <ol className="relative grid gap-8 md:grid-cols-3 md:gap-6">
            {steps.map(({ title, icon: Icon, body }, i) => (
              <li key={title} className="grid grid-cols-[3.5rem_1fr] gap-x-5 md:block md:text-center">
                <span className="grid h-14 w-14 place-items-center rounded-full border-2 border-thread bg-light text-primary-ink md:mx-auto">
                  <Icon size={24} stroke={1.5} aria-hidden="true" />
                </span>
                <div className="md:mt-5">
                  <h3 className="t-3">
                    <span className="text-thread">{i + 1}. </span>
                    {title}
                  </h3>
                  <p className="mt-2 text-muted md:mx-auto md:max-w-[28ch]">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <ul className={`mt-14 grid gap-4 ${branches.length > 1 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'max-w-md'}`}>
          {branches.map((b) => (
            <li key={b.name + b.address} className="rounded-2xl border border-ink/15 p-6">
              <p className="font-semibold">{b.name}</p>
              <p className="t-small mt-1 text-muted">{b.address}</p>
              {b.hours && <p className="t-small mt-3">{b.hours}</p>}
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to drop off a saree. When can I come in?`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask before you come
          </Button>
        </div>
      </div>
    </section>
  )
}
