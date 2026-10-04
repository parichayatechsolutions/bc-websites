// src/sections/hero/MastheadHero.tsx
// No photograph at all: the boutique's name as large as the screen allows
// on their brand colour, the local name under it, then the invitation and
// their facts across a rule. The opener for a boutique with no photos yet,
// and for one whose name is its brand. (Lab: hero D, "Masthead".)
//
// Starts on the brand colour, so don't mark its page `overlay`: a floating
// nav over it would draw light text on what may be a pale colour.
//
// Motion: the name's letters (words, for a long name) rise into place once.
// Reduced motion: the name in place.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Magnetic from '../../motion/Magnetic'
import { rise } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { fitDisplay } from '../../theme/theme'
import { trustFacts } from '../trust/trustFacts'
import { sinceLine, VisitButton } from './heroShared'

export default function MastheadHero() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const { brand } = boutique
  const since = sinceLine(boutique.established, boutique.branches[0]?.city)
  const facts = trustFacts(boutique).slice(0, 3)
  const invitation = boutique.highlight ?? brand.tagline

  useMotion(root, () => {
    rise('[data-hero-name]', { by: brand.name.length > 18 ? 'words' : 'letters' })
  })

  return (
    <section ref={root} id="top" className="page-top flex min-h-[88svh] flex-col justify-end bg-primary pb-14 text-on-primary md:pb-20">
      <div className="wrap">
        {since && <p className="t-small opacity-80">{since}</p>}
        <h1 data-hero-name className="t-hero mt-6 max-w-[14ch] text-balance" style={fitDisplay(brand.name, 13, 12)}>
          {brand.name}
        </h1>
        {brand.localName && <p className="t-2 mt-4 opacity-80">{brand.localName}</p>}

        <div className="mt-12 grid gap-10 border-t border-current/25 pt-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-6">
            {invitation && <p className="t-lead max-w-[30ch]">{invitation}</p>}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Magnetic>
                <Button href={whatsappLink(boutique)} icon={IconBrandWhatsapp}>
                  Book a fitting
                </Button>
              </Magnetic>
              <VisitButton variant="link" />
            </div>
          </div>

          {facts.length > 1 && (
            <dl className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:col-span-6">
              {facts.map(({ value, label }) => (
                <div key={label} className="flex flex-col">
                  <dt className="t-small order-last mt-1 opacity-80">{label}</dt>
                  <dd className="t-2 tabular-nums">{value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </section>
  )
}
