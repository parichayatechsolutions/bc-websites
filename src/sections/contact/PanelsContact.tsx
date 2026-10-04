// src/sections/contact/PanelsContact.tsx
// Two big panels side by side: book on WhatsApp in one, see their newest
// work on Instagram in the other. The two places their customers already
// are. (Lab: contact X, "WhatsApp + Instagram".)
//
// The Instagram panel shows only with `social.instagram`; without it the
// WhatsApp panel runs full width. No motion.

import { IconArrowRight, IconBrandInstagram, IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useInstagram } from '../instagram/igShared'

export default function PanelsContact() {
  const { boutique } = useBoutique()
  const instagram = useInstagram()

  const panel = 'group flex min-h-72 flex-col justify-between p-8 transition-colors duration-200 ease-stitch md:p-10'

  return (
    <section id="contact" className="section">
      <div className={`wrap grid gap-4 ${instagram ? 'md:grid-cols-2' : ''}`}>
        <a href={whatsappLink(boutique)} target="_blank" rel="noopener noreferrer" className={`${panel} bg-primary-ink text-on-primary-ink hover:bg-[color-mix(in_oklab,var(--c-primary-ink)_85%,black)]`}>
          <IconBrandWhatsapp size={40} stroke={1.5} aria-hidden="true" />
          <span>
            <span className="t-1 block">Book on WhatsApp</span>
            <span className="mt-3 block opacity-85">Send a photo of what you want and ask anything.</span>
            <span className="mt-6 inline-flex items-center gap-2 font-semibold">
              {boutique.contact.whatsapp}
              <IconArrowRight size={18} stroke={1.75} aria-hidden="true" className="transition-transform duration-300 ease-stitch group-hover:translate-x-1" />
            </span>
          </span>
        </a>
        {instagram && (
          <a href={instagram.href} target="_blank" rel="noopener noreferrer" className={`${panel} border border-ink/15 hover:border-ink`}>
            <IconBrandInstagram size={40} stroke={1.5} className="text-primary-ink" aria-hidden="true" />
            <span>
              <span className="t-1 block">See our work</span>
              <span className="mt-3 block text-muted">Our newest pieces, on Instagram.</span>
              <span className="mt-6 inline-flex items-center gap-2 font-semibold text-primary-ink">
                <span className="break-all">{instagram.handle}</span>
                <IconArrowRight size={18} stroke={1.75} aria-hidden="true" className="shrink-0 transition-transform duration-300 ease-stitch group-hover:translate-x-1" />
              </span>
            </span>
          </a>
        )}
      </div>
    </section>
  )
}
