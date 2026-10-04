// src/sections/contact/LanguageWhatsApp.tsx
// A floating WhatsApp pill that greets in the shop's first language
// ("Namaskaram") and lists the languages they speak under it, so a visitor
// knows she can write in her own. (Lab: wa R, "Any language", without the
// rotating greetings: nothing loops.)
//
// Languages from `contact.languages`; without them the pill just says
// "Chat on WhatsApp". Place it once in a design, beside SiteShell, not with
// another sticky WhatsApp control.
//
// Motion: rises in once past the hero (stickyShared). Reduced motion: always
// there.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useShowAfterFirstScreen } from './stickyShared'

const GREETING: Record<string, string> = {
  telugu: 'Namaskaram',
  tamil: 'Vanakkam',
  kannada: 'Namaskara',
  malayalam: 'Namaskaram',
  hindi: 'Namaste',
  marathi: 'Namaskar',
  gujarati: 'Kem cho',
  bengali: 'Nomoshkar',
  english: 'Hello',
}

export default function LanguageWhatsApp() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLDivElement>(null)
  useShowAfterFirstScreen(root)
  const languages = boutique.contact.languages ?? []
  const greeting = GREETING[languages[0]?.toLowerCase() ?? ''] ?? 'Hello'

  return (
    <div ref={root} className="pointer-events-none fixed right-0 bottom-0 z-40 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:p-6">
      <a
        href={whatsappLink(boutique)}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex min-h-14 items-center gap-3 rounded-full bg-primary-ink py-2 pr-6 pl-2 text-on-primary-ink ring-2 ring-light transition-[translate,background-color] duration-300 ease-stitch hover:-translate-y-1 hover:bg-[color-mix(in_oklab,var(--c-primary-ink)_85%,black)] active:translate-y-0"
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-on-primary-ink/15">
          <IconBrandWhatsapp size={24} stroke={1.75} aria-hidden="true" />
        </span>
        <span className="leading-tight">
          <span className="block font-semibold">{languages.length ? `${greeting}. Chat with us` : 'Chat on WhatsApp'}</span>
          {languages.length > 0 && <span className="t-small block opacity-80">{languages.join(' · ')}</span>}
        </span>
      </a>
    </div>
  )
}
