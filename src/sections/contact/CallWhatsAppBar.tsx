// src/sections/contact/CallWhatsAppBar.tsx
// On phones, a bar across the bottom of the screen: Call on one half,
// WhatsApp on the other, both a full thumb's width. (Lab: wa D, "Call |
// WhatsApp bar".) Computers have the navigation's WhatsApp button, so the
// bar is phones only.
//
// Place it once in a design, beside SiteShell, not inside a page. Don't
// pair it with a navigation that already has a phone dock. It leaves a
// spacer of its own height at the end of the page, so it never covers the
// last lines of the footer.
//
// Motion: rises in once the visitor is past the hero (stickyShared.ts).
// Reduced motion: always there.

import { useRef } from 'react'
import { IconBrandWhatsapp, IconPhone } from '@tabler/icons-react'
import { telLink, useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { useShowAfterFirstScreen } from './stickyShared'

export default function CallWhatsAppBar() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLDivElement>(null)
  useShowAfterFirstScreen(root)

  return (
    <>
      <div aria-hidden="true" className="h-[calc(4.75rem+env(safe-area-inset-bottom))] md:hidden" />
      <div
        ref={root}
        className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-light px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-ink md:hidden"
      >
        <div className="grid grid-cols-2 gap-3">
          <Button href={telLink(boutique.contact.phone)} variant="outline-dark" icon={IconPhone} className="px-4">
            Call us
          </Button>
          <Button href={whatsappLink(boutique)} variant="primary" icon={IconBrandWhatsapp} className="px-4">
            WhatsApp us
          </Button>
        </div>
      </div>
    </>
  )
}
