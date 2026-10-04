// src/sections/gift/OccasionGift.tsx
// Pick the occasion (a wedding, a birthday, a new baby, a festival, a
// thank-you) and the voucher's wording changes to suit it; pick an amount
// and send the request. (Lab: gift E, "For the occasion".)
//
// Needs `giftVouchers`; amounts are theirs when given. No motion; the card
// wording swaps with a CSS fade.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'
import Logo from '../../components/Logo'

const OCCASIONS = [
  { name: 'Wedding', line: 'For the wedding, an outfit made just for you.' },
  { name: 'Birthday', line: 'Happy birthday. Something new, made to fit.' },
  { name: 'New baby', line: 'For the little one’s first outfits.' },
  { name: 'Festival', line: 'For the festival: wear something made for you.' },
  { name: 'Thank you', line: 'With thanks, and something made to measure.' },
]

export default function OccasionGift() {
  const { boutique } = useBoutique()
  const amounts = boutique.giftVouchers?.amounts ?? []
  const [occasion, setOccasion] = useState(OCCASIONS[0])
  const [amount, setAmount] = useState<number | undefined>(amounts[0])
  if (!boutique.giftVouchers) return null

  const message = `Hi ${boutique.brand.name}, I'd like a ${occasion.name.toLowerCase()} gift voucher${amount ? ` for ${rupees(amount)}` : ''}. How do I pay?`

  return (
    <section id="gift" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-6">
          <h2 className="t-1">A gift voucher for</h2>
          <ul className="mt-6 space-y-1" role="group" aria-label="Occasion">
            {OCCASIONS.map((o) => (
              <li key={o.name}>
                <button
                  type="button"
                  onClick={() => setOccasion(o)}
                  aria-pressed={o.name === occasion.name}
                  className="t-2 cursor-pointer text-left text-muted transition-colors duration-200 ease-stitch hover:text-ink aria-pressed:text-primary-ink"
                >
                  {o.name}
                </button>
              </li>
            ))}
          </ul>
          {amounts.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Amount">
              {amounts.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAmount(a)}
                  aria-pressed={a === amount}
                  className="min-h-11 cursor-pointer rounded-full border border-ink/25 px-5 tabular-nums transition-[background-color,border-color,color,scale] duration-200 ease-stitch hover:border-ink active:scale-[0.97] aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
                >
                  {rupees(a)}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="md:col-span-6">
          <div key={occasion.name} className="flex aspect-[16/10] animate-[fade-in_700ms_var(--ease-stitch)] flex-col justify-between bg-primary p-6 text-on-primary md:p-8" aria-live="polite">
            <Logo className="h-11 w-11" />
            <div>
              <p className="t-3">{occasion.line}</p>
              <p className="t-small mt-3 opacity-80">
                Gift voucher · {boutique.brand.name}
                {amount ? ` · ${rupees(amount)}` : ''}
              </p>
            </div>
          </div>
          <div className="mt-8">
            <Button href={whatsappLink(boutique, message)} variant="primary" icon={IconBrandWhatsapp}>
              Ask for this voucher
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
