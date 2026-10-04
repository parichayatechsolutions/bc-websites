// src/sections/hero/ChatHero.tsx
// The name on one side, a WhatsApp-style chat on the other: the boutique
// asks what she's planning, quick replies (what they're known for) write her
// first message, and one button sends it. The first screen is already the
// first conversation. (Lab: hero P, "Chat opener".)
//
// The greeting asks a question and promises nothing. Light, so don't mark
// its page `overlay`.
//
// Motion: the name rises once. Reduced motion: in place.

import { useRef, useState } from 'react'
import { IconBrandWhatsapp, IconStarFilled } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Logo from '../../components/Logo'
import Magnetic from '../../motion/Magnetic'
import { rise } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { fitDisplay } from '../../theme/theme'
import { sinceLine } from './heroShared'

export default function ChatHero() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const { brand, social } = boutique
  const picks = [...boutique.services.featured.slice(0, 3), 'Something else']
  const [pick, setPick] = useState(picks[0])
  const since = sinceLine(boutique.established, boutique.branches[0]?.city)
  const message = pick === 'Something else' ? `Hi ${brand.name}, I have something in mind.` : `Hi ${brand.name}, I'd like to ask about ${pick.charAt(0).toLowerCase()}${pick.slice(1)}.`

  useMotion(root, () => {
    rise('[data-hero-name]', { by: brand.name.length > 18 ? 'words' : 'letters' })
  })

  return (
    <section ref={root} id="top" className="page-top bg-light">
      <div className="wrap grid items-center gap-12 pb-16 md:grid-cols-12 md:gap-16 md:pb-24">
        <div className="md:col-span-6">
          {since && <p className="t-small text-muted">{since}</p>}
          <h1 data-hero-name className="t-hero mt-4 max-w-[12ch] text-balance" style={fitDisplay(brand.name, 10, 8)}>
            {brand.name}
          </h1>
          {brand.tagline && <p className="t-lead mt-6 max-w-[30ch] text-muted">{brand.tagline}</p>}
          {social.googleRating && (
            <p className="mt-6 flex items-center gap-2 text-muted">
              <IconStarFilled size={18} className="text-primary-ink" aria-hidden="true" />
              {social.googleRating.toFixed(1)} on Google
              {social.googleReviewCount && `, from ${social.googleReviewCount.toLocaleString('en-IN')} reviews`}
            </p>
          )}
        </div>

        <div className="md:col-span-6">
          <div className="rounded-2xl bg-paper p-5 md:p-7">
            <div className="flex items-center gap-3 border-b border-ink/10 pb-4">
              <Logo className="h-10 w-10 shrink-0 rounded-full" />
              <p className="min-w-0">
                <span className="block truncate font-semibold">{brand.name}</span>
                <span className="t-small text-muted">on WhatsApp</span>
              </p>
            </div>

            <p className="mt-5 max-w-[85%] rounded-2xl rounded-tl-none bg-light p-4">Hello. What are you planning?</p>
            <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="What you’re planning">
              {picks.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPick(p)}
                  aria-pressed={p === pick}
                  className="min-h-11 cursor-pointer rounded-full border border-primary-ink/40 px-4 text-left text-primary-ink transition-[background-color,color,scale] duration-200 ease-stitch hover:bg-primary-ink/5 active:scale-[0.97] aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
                >
                  {p}
                </button>
              ))}
            </div>
            <p aria-live="polite" className="mt-5 ml-auto max-w-[85%] rounded-2xl rounded-tr-none bg-primary-ink p-4 text-on-primary-ink">
              {message}
            </p>

            <div className="mt-6">
              <Magnetic>
                <Button href={whatsappLink(boutique, message)} variant="primary" icon={IconBrandWhatsapp}>
                  Send on WhatsApp
                </Button>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
