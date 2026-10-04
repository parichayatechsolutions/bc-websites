// src/sections/contact/OwnerWhatsApp.tsx
// A floating pill with the owner's face (with permission; their logo
// otherwise), "Chat with" and her first name, and her role beneath: a
// person to talk to, not a channel. (Lab: wa E, "Owner card", without the
// online status, which the site can't know.)
//
// Place it once in a design, beside SiteShell, not with another sticky
// WhatsApp control.
//
// Motion: rises in once past the hero (stickyShared). Reduced motion:
// always there.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Logo from '../../components/Logo'
import Media from '../../components/Media'
import { useShowAfterFirstScreen } from './stickyShared'

export default function OwnerWhatsApp() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLDivElement>(null)
  useShowAfterFirstScreen(root)
  const { owner, permissions } = boutique
  const first = owner.name.split(' ')[0]
  const photo = permissions.showOwnerPhoto ? owner.photo : undefined

  return (
    <div ref={root} className="pointer-events-none fixed right-0 bottom-0 z-40 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:p-6">
      <a
        href={whatsappLink(boutique, `Hi ${first}, `)}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex min-h-16 max-w-[calc(100vw-2rem)] items-center gap-3 rounded-full bg-light py-2 pr-2 pl-2 text-ink ring-2 ring-primary-ink transition-[translate] duration-300 ease-stitch hover:-translate-y-1 active:translate-y-0"
      >
        {photo ? (
          <span className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-paper">
            <Media file={photo} alt="" />
          </span>
        ) : (
          <Logo className="h-12 w-12 shrink-0 rounded-full" />
        )}
        <span className="min-w-0 leading-tight">
          <span className="block truncate font-semibold">Chat with {first}</span>
          {owner.role && <span className="t-small block truncate text-muted">{owner.role}</span>}
        </span>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary-ink text-on-primary-ink">
          <IconBrandWhatsapp size={24} stroke={1.75} aria-hidden="true" />
        </span>
      </a>
    </div>
  )
}
