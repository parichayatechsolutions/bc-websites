// src/sections/gift/DesignsGift.tsx
// Choose the card: the voucher card designs named in large type (Classic,
// Festive, Wedding, Birthday) beside one large card that changes to the
// design picked, with the button asking for that one.
// (Lab: gift U, "Choose the card".)
//
// The designs are drawn here in their colours; the boutique makes the
// real card. Needs `giftVouchers`. The card swaps with a CSS fade.

import { useState } from 'react'
import { IconBrandWhatsapp, IconCake, IconHeart, IconSparkles, IconStar } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Logo from '../../components/Logo'

const DESIGNS = [
  { name: 'Classic', icon: IconStar, card: 'bg-paper text-ink', ring: 'border-ink/20' },
  { name: 'Festive', icon: IconSparkles, card: 'bg-accent text-on-accent', ring: 'border-on-accent/40' },
  { name: 'Wedding', icon: IconHeart, card: 'bg-primary text-on-primary', ring: 'border-on-primary/40' },
  { name: 'Birthday', icon: IconCake, card: 'bg-dark text-light', ring: 'border-light/30' },
]

export default function DesignsGift() {
  const { boutique } = useBoutique()
  const [index, setIndex] = useState(0)
  if (!boutique.giftVouchers) return null
  const design = DESIGNS[index]
  const Icon = design.icon

  return (
    <section id="gift" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-2">Choose the card</h2>
          <ul className="mt-4" role="group" aria-label="Card design">
            {DESIGNS.map((d, i) => (
              <li key={d.name}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-pressed={i === index}
                  className="t-1 cursor-pointer text-muted transition-colors duration-200 ease-stitch hover:text-ink aria-pressed:text-primary-ink"
                >
                  {d.name}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like a gift voucher on the ${design.name.toLowerCase()} card. How do I pay?`)} variant="primary" icon={IconBrandWhatsapp}>
              Ask for this card
            </Button>
          </div>
        </div>
        <div className="md:col-span-7" aria-hidden="true">
          <div key={design.name} className={`mx-auto aspect-[7/4] w-full max-w-lg animate-[fade-in_700ms_var(--ease-stitch)] rounded-2xl p-2 ${design.card}`}>
            <div className={`flex h-full flex-col justify-between rounded-xl border p-6 ${design.ring}`}>
              <div className="flex items-center justify-between">
                <Logo className="h-10 w-10 rounded-full bg-light" />
                <Icon size={28} stroke={1.5} />
              </div>
              <div>
                <p className="t-small opacity-80">Gift voucher</p>
                <p className="t-2 text-balance">{boutique.brand.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
