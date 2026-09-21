// src/components/SocialLinks.tsx
// Round icon buttons for every way to reach the boutique: WhatsApp and call
// always, then whichever social profiles it has. Used by every footer.

import {
  IconBrandFacebook,
  IconBrandGoogle,
  IconBrandInstagram,
  IconBrandWhatsapp,
  IconBrandYoutube,
  IconPhone,
  type Icon,
} from '@tabler/icons-react'
import { telLink, useBoutique, whatsappLink } from '../app/BoutiqueContext'

/** Hover fill matches the background the row sits on. */
const HOVER = {
  primary: 'hover:bg-on-primary hover:text-primary',
  dark: 'hover:bg-light hover:text-dark',
  light: 'hover:bg-ink hover:text-light',
}

export default function SocialLinks({ on, className = '' }: { on: keyof typeof HOVER; className?: string }) {
  const { boutique } = useBoutique()
  const { social, contact } = boutique

  const links: { label: string; href?: string; icon: Icon }[] = [
    { label: 'WhatsApp', href: whatsappLink(boutique), icon: IconBrandWhatsapp },
    { label: `Call ${contact.phone}`, href: telLink(contact.phone), icon: IconPhone },
    { label: 'Instagram', href: social.instagram, icon: IconBrandInstagram },
    { label: 'Facebook', href: social.facebook, icon: IconBrandFacebook },
    { label: 'YouTube', href: social.youtube, icon: IconBrandYoutube },
    { label: 'Google reviews', href: social.googleBusiness, icon: IconBrandGoogle },
  ]

  return (
    <ul className={`flex flex-wrap gap-3 ${className}`}>
      {links
        .filter((l) => l.href)
        .map(({ label, href, icon: LinkIcon }) => (
          <li key={label}>
            <a
              href={href}
              {...(href!.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              aria-label={label}
              title={label}
              className={`grid h-12 w-12 place-items-center rounded-full border border-current/30 transition-[background-color,color,translate] duration-300 ease-stitch hover:-translate-y-1 active:translate-y-0 ${HOVER[on]}`}
            >
              <LinkIcon size={22} stroke={1.5} aria-hidden="true" />
            </a>
          </li>
        ))}
    </ul>
  )
}
