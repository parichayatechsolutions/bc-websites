// src/sections/gift/CardGift.tsx
// A folding greeting card: she writes her message, taps the card to open
// it, and her words are inside under the boutique's name; the button asks
// for a voucher with that message. (Lab: gift I, "Folding card", opening
// flat rather than in 3D.)
//
// Needs `giftVouchers`. Nothing is stored. The card opens with a CSS
// transition that reduced motion turns off.

import { useState } from 'react'
import { IconBrandWhatsapp, IconGift } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Field from '../../components/Field'

export default function CardGift() {
  const { boutique } = useBoutique()
  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(false)
  if (!boutique.giftVouchers) return null
  const words = message.trim()

  return (
    <section id="gift" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="space-y-6 md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">A card with your words</h2>
          <Field label="Your message" hint="It goes in your WhatsApp message">
            {(props) => <textarea {...props} rows={4} maxLength={240} value={message} onChange={(e) => setMessage(e.target.value)} />}
          </Field>
          <Button
            href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like a gift voucher${words ? ` with this message in the card: "${words}"` : ''}. How do I pay?`)}
            variant="primary"
            icon={IconBrandWhatsapp}
          >
            Ask for this voucher
          </Button>
        </div>
        <div className="md:col-span-7">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? 'Close the card' : 'Open the card'}
            className="mx-auto grid w-full max-w-lg cursor-pointer grid-cols-2"
          >
            <span
              aria-hidden="true"
              className={`flex aspect-[3/4] flex-col items-center justify-center gap-3 border border-ink/15 bg-primary text-on-primary transition-[translate] duration-700 ease-stitch ${open ? 'translate-x-0' : 'translate-x-1/2'}`}
            >
              <IconGift size={40} stroke={1.25} />
              <span className="t-3 px-4 text-center">{boutique.brand.name}</span>
            </span>
            <span
              className={`flex aspect-[3/4] flex-col justify-center border border-ink/15 bg-light p-5 text-left transition-[opacity,visibility] duration-700 ease-stitch ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}
            >
              <span className="t-small text-muted">Inside</span>
              <span className="mt-2 font-display text-lg leading-snug break-words italic">{words || 'Your message will be here.'}</span>
              <span className="t-small mt-4 text-muted">A gift voucher from {boutique.brand.name}</span>
            </span>
          </button>
          <p className="t-small mt-4 text-center text-muted">{open ? 'Tap to close' : 'Tap the card to open it'}</p>
        </div>
      </div>
    </section>
  )
}
