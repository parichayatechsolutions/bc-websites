// src/sections/gift/EnvelopeGift.tsx
// A sealed envelope; tapping it opens the flap and the voucher slides out
// with the boutique's name and the amounts they sell, then a button to ask
// for one. (Lab: gift B, "Envelope".)
//
// Needs `giftVouchers`; amounts only when they've listed some. The voucher
// slides with a CSS transition that reduced motion turns off.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'
import Logo from '../../components/Logo'

export default function EnvelopeGift() {
  const { boutique } = useBoutique()
  const [open, setOpen] = useState(false)
  if (!boutique.giftVouchers) return null
  const amounts = boutique.giftVouchers.amounts

  return (
    <section id="gift" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">Give a gift voucher</h2>
          <p className="t-lead mt-5 max-w-[32ch] text-muted">For a wedding, a birthday or just because: she picks what she’d like stitched.</p>
          <div className="mt-8">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like a gift voucher. How do I pay?`)} variant="primary" icon={IconBrandWhatsapp}>
              Ask for a voucher
            </Button>
          </div>
        </div>
        <div className="md:col-span-7">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? 'Close the envelope' : 'Open the envelope'}
            className="relative mx-auto mt-28 block aspect-[3/2] w-full max-w-md cursor-pointer"
          >
            {/* The voucher, tucked inside until the envelope opens. */}
            <span
              className={`absolute inset-x-[8%] top-[6%] flex h-[85%] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-accent bg-light p-4 text-center transition-transform duration-700 ease-stitch ${open ? '-translate-y-[62%]' : 'translate-y-0'}`}
            >
              <Logo className="h-10 w-10" />
              <span className="t-3 text-primary-ink">{boutique.brand.name}</span>
              <span className="t-small text-muted">Gift voucher</span>
              {amounts.length > 0 && <span className="t-small font-semibold tabular-nums">{amounts.map(rupees).join(' · ')}</span>}
            </span>
            {/* The envelope's body, over the voucher's lower half. */}
            <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[70%] bg-primary" style={{ clipPath: 'polygon(0 0, 50% 45%, 100% 0, 100% 100%, 0 100%)' }} />
            <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[70%] bg-[color-mix(in_oklab,var(--c-primary)_88%,black)]" style={{ clipPath: 'polygon(0 100%, 50% 45%, 100% 100%)' }} />
            {/* The flap, folded down when sealed. */}
            <span
              aria-hidden="true"
              className={`absolute inset-x-0 top-[30%] h-[45%] origin-top bg-[color-mix(in_oklab,var(--c-primary)_80%,black)] transition-[scale] duration-500 ease-stitch ${open ? '-scale-y-100' : 'scale-y-100'}`}
              style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)', zIndex: open ? 0 : 2 }}
            />
            {!open && (
              <span aria-hidden="true" className="absolute top-[64%] left-1/2 z-[3] grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent font-display text-on-accent">
                {boutique.brand.name.charAt(0)}
              </span>
            )}
          </button>
          <p className="t-small mt-4 text-center text-muted">{open ? 'Tap to close' : 'Tap to open'}</p>
        </div>
      </div>
    </section>
  )
}
