// src/sections/gift/NoteGift.tsx
// A gift voucher drawn like a banknote: a wide card in the brand colour
// with fine wavy guilloche lines, the boutique's name, its logo in a
// round window, and the value set large; one note per amount they sell.
// (Lab: gift F, "Bank note", without serial numbers, which would be
// invented.)
//
// Needs `giftVouchers`; with no amounts listed, one note reads "Any
// amount". No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'
import Logo from '../../components/Logo'

// Guilloche: rows of fine sine waves, drawn once as an SVG background.
const WAVES = Array.from({ length: 10 }, (_, i) => {
  const y = 6 + i * 8
  return `M 0 ${y} ${Array.from({ length: 8 }, (_, k) => `Q ${k * 25 + 6.25} ${y - 4} ${k * 25 + 12.5} ${y} T ${k * 25 + 25} ${y}`).join(' ')}`
}).join(' ')

export default function NoteGift() {
  const { boutique } = useBoutique()
  if (!boutique.giftVouchers) return null
  const amounts = boutique.giftVouchers.amounts.slice(0, 3)
  const notes = amounts.length ? amounts.map((a) => rupees(a)) : ['Any amount']

  return (
    <section id="gift" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Gift vouchers</h2>
        <ul className="mt-12 grid gap-6 lg:grid-cols-2">
          {notes.map((value) => (
            <li key={value} className="relative overflow-hidden rounded-2xl bg-primary p-1.5 text-on-primary">
              <div className="relative overflow-hidden rounded-xl border border-on-primary/40 p-6 md:p-8">
                <svg viewBox="0 0 200 86" preserveAspectRatio="none" aria-hidden="true" className="absolute inset-0 h-full w-full opacity-25">
                  <path d={WAVES} fill="none" strokeWidth={0.5} style={{ stroke: 'var(--c-on-primary)' }} />
                </svg>
                <div className="relative flex items-center justify-between gap-6">
                  <div className="min-w-0">
                    <p className="t-small opacity-85">Gift voucher</p>
                    <p className="t-3 mt-1 text-balance">{boutique.brand.name}</p>
                    <p className="mt-6 font-display text-5xl leading-none tabular-nums md:text-6xl">{value}</p>
                  </div>
                  <span className="grid h-24 w-24 shrink-0 place-items-center rounded-full border-2 border-on-primary/50 bg-light">
                    <Logo className="h-14 w-14" />
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like a gift voucher. How do I pay?`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask for a voucher
          </Button>
        </div>
      </div>
    </section>
  )
}
