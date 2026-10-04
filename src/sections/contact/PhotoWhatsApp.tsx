// src/sections/contact/PhotoWhatsApp.tsx
// A floating pill that says "Saw a design you love? Send the photo",
// opening WhatsApp with a message ready for the picture she attaches. The
// way most orders start. (Lab: wa T, "Send a photo".)
//
// On phones only the second line shows, beside the icon. Place it once in
// a design, beside SiteShell, not with another sticky WhatsApp control.
//
// Motion: rises in once past the hero (stickyShared). Reduced motion:
// always there.

import { useRef } from 'react'
import { IconPhotoUp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useShowAfterFirstScreen } from './stickyShared'

export default function PhotoWhatsApp() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLDivElement>(null)
  useShowAfterFirstScreen(root)

  return (
    <div ref={root} className="pointer-events-none fixed right-0 bottom-0 z-40 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:p-6">
      <a
        href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I saw a design I love. Here's the photo:`)}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex min-h-14 items-center gap-3 rounded-full bg-primary-ink py-2 pr-6 pl-2 text-on-primary-ink transition-[translate] duration-300 ease-stitch hover:-translate-y-1 active:translate-y-0"
      >
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-on-primary-ink/15">
          <IconPhotoUp size={22} stroke={1.75} aria-hidden="true" />
        </span>
        <span className="leading-tight">
          <span className="t-small hidden opacity-85 sm:block">Saw a design you love?</span>
          <span className="block font-semibold">Send the photo</span>
        </span>
      </a>
    </div>
  )
}
