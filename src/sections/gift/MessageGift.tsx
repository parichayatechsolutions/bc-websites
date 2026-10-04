// src/sections/gift/MessageGift.tsx
// Pick a ready-made message (happy birthday, congratulations, with love,
// thank you) and the voucher card fills in with it, or write her own; then
// send the request on WhatsApp. (Lab: gift S, "Pick a message".)
//
// Needs `giftVouchers`; amounts are theirs when given. Payment is arranged
// in the chat. The card wording swaps with a CSS fade.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'
import Field from '../../components/Field'
import Logo from '../../components/Logo'

const MESSAGES = [
  'Happy birthday. Something made just for you.',
  'Congratulations on your wedding.',
  'With love, for your special day.',
  'Thank you, for everything.',
]

export default function MessageGift() {
  const { boutique } = useBoutique()
  const amounts = boutique.giftVouchers?.amounts ?? []
  const [message, setMessage] = useState(MESSAGES[0])
  const [amount, setAmount] = useState<number | undefined>(amounts[0])
  if (!boutique.giftVouchers) return null

  const request = `Hi ${boutique.brand.name}, I'd like a gift voucher${amount ? ` for ${rupees(amount)}` : ''} with the message: "${message.trim()}". How do I pay?`

  return (
    <section id="gift" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="space-y-8 md:col-span-6">
          <h2 className="t-1 max-w-[12ch] text-balance">Say it with a voucher</h2>
          <ul className="space-y-2" role="group" aria-label="Message">
            {MESSAGES.map((m) => (
              <li key={m}>
                <button
                  type="button"
                  onClick={() => setMessage(m)}
                  aria-pressed={m === message}
                  className="min-h-12 w-full cursor-pointer rounded-full border border-ink/15 px-5 py-3 text-left transition-colors duration-200 ease-stitch hover:border-ink aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
                >
                  {m}
                </button>
              </li>
            ))}
          </ul>
          <Field label="Or write your own">{(field) => <input {...field} value={MESSAGES.includes(message) ? '' : message} onChange={(e) => setMessage(e.target.value)} maxLength={80} />}</Field>
          {amounts.length > 0 && (
            <div className="flex flex-wrap gap-2" role="group" aria-label="Amount">
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
        <div className="md:col-span-6 md:pt-16">
          <div className="flex aspect-[16/10] flex-col justify-between bg-primary p-6 text-on-primary md:p-8" aria-live="polite">
            <Logo className="h-11 w-11" />
            <div>
              <p className="t-3">{message || 'Your message here'}</p>
              <p className="t-small mt-3 opacity-80">
                Gift voucher · {boutique.brand.name}
                {amount ? ` · ${rupees(amount)}` : ''}
              </p>
            </div>
          </div>
          <div className="mt-8">
            <Button href={whatsappLink(boutique, request)} variant="primary" icon={IconBrandWhatsapp}>
              Ask for this voucher
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
