// src/sections/contact/DesignContact.tsx
// "Saw a design you love?" A dashed card inviting her to send the photo,
// from Instagram, Pinterest or a wedding album, on WhatsApp, with the three
// things worth adding. The way most orders begin.
// (Lab: contact N, "Send a design".)
//
// Needs no data beyond WhatsApp. No motion.

import { IconBrandInstagram, IconBrandPinterest, IconBrandWhatsapp, IconPhoto } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

const ADD = ['When you need it', 'Whether you have the fabric', 'Anything you’d change about the design']

export default function DesignContact() {
  const { boutique } = useBoutique()

  return (
    <section id="contact" className="section">
      <div className="wrap">
        <div className="grid gap-10 rounded-2xl border-2 border-dashed border-ink/25 p-7 md:grid-cols-12 md:gap-12 md:p-12">
          <div className="md:col-span-7">
            <div className="flex gap-3 text-primary-ink" aria-hidden="true">
              <IconPhoto size={30} stroke={1.5} />
              <IconBrandInstagram size={30} stroke={1.5} />
              <IconBrandPinterest size={30} stroke={1.5} />
            </div>
            <h2 className="t-1 mt-6 max-w-[14ch] text-balance">Saw a design you love?</h2>
            <p className="t-lead mt-5 max-w-[34ch] text-muted">Send us the photo on WhatsApp, from Instagram, Pinterest or a wedding album.</p>
          </div>
          <div className="md:col-span-5 md:self-end">
            <p className="font-semibold">Worth adding:</p>
            <ul className="mt-3 space-y-2">
              {ADD.map((line) => (
                <li key={line} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-thread" />
                  {line}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I saw a design I love. Here's the photo.`)} variant="primary" icon={IconBrandWhatsapp}>
                Send the photo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
