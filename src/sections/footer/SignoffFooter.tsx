// src/sections/footer/SignoffFooter.tsx
// A grand sign-off, dark and centred: the logo, the name once more at full
// size, the local name, a zari rule, where and when to find them, and the
// three things to do next (WhatsApp, Call, Directions). Ends with the credit
// line and a way back to the top. (Lab: footer C, "Grand sign-off".)
//
// For pages that end quietly, so the footer can carry the weight. No motion.

import { IconArrowUp, IconBrandWhatsapp, IconDirections, IconPhone } from '@tabler/icons-react'
import { telLink, useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Credit from '../../components/Credit'
import Logo from '../../components/Logo'
import { useLenis } from '../../motion/SmoothScroll'
import { fitDisplay } from '../../theme/theme'

export default function SignoffFooter() {
  const { boutique } = useBoutique()
  const lenis = useLenis()
  const { brand, branches, contact } = boutique
  const branch = branches[0]
  const where = branch && [branch.area ? `${branch.area}, ${branch.city}` : branch.city, branch.hours].filter(Boolean).join(' · ')

  const toTop = () => (lenis ? lenis.scrollTo(0) : window.scrollTo(0, 0))

  return (
    <footer className="bg-dark pt-24 pb-10 text-center text-light">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <Logo className="mx-auto h-14 w-14" />
        <p className="t-hero mx-auto mt-8 max-w-[14ch] text-balance" style={fitDisplay(brand.name, 9, 8)}>
          {brand.name}
        </p>
        {brand.localName && <p className="t-2 mt-3 text-light/70">{brand.localName}</p>}
        <div className="zari mx-auto mt-10 w-40" aria-hidden="true" />
        {where && <p className="mt-8 text-light/80">{where}</p>}

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href={whatsappLink(boutique)} icon={IconBrandWhatsapp}>
            Chat on WhatsApp
          </Button>
          <Button href={telLink(contact.phone)} variant="outline-light" icon={IconPhone}>
            Call {contact.phone}
          </Button>
          {branch && (
            <Button href={branch.mapsUrl} variant="outline-light" icon={IconDirections}>
              Get directions
            </Button>
          )}
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-light/15 pt-6 text-left">
          <Credit />
          <button
            type="button"
            onClick={toTop}
            className="group inline-flex min-h-11 cursor-pointer items-center gap-3 font-semibold"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full border border-light/30 transition-[background-color,color,translate] duration-300 ease-stitch group-hover:-translate-y-1 group-hover:bg-light group-hover:text-dark">
              <IconArrowUp size={20} stroke={1.5} aria-hidden="true" />
            </span>
            Back to top
          </button>
        </div>
      </div>
    </footer>
  )
}
