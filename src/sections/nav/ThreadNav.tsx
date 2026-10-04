// src/sections/nav/ThreadNav.tsx
// A clean bar with a thread running along its foot that sews itself across
// as the visitor reads down the page, a needle at its tip: how far she's
// come, in the boutique's own language. (Lab: nav V, "Thread progress".)
//
// The thread is tied to the scrollbar, so it means something (DESIGN.md).
// With reduced motion it isn't drawn. Takes its own space.

import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { IconNeedle } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Logo from '../../components/Logo'
import { EASE, gsap } from '../../motion/gsap'
import { useMotion } from '../../motion/useMotion'
import { MobileMenu, PageLinks, WhatsAppPill } from './navShared'

export default function ThreadNav() {
  const { boutique } = useBoutique()
  const { href } = useSite()
  const root = useRef<HTMLElement>(null)

  useMotion(root, () => {
    gsap.set('[data-progress]', { autoAlpha: 1 })
    gsap.fromTo(
      '[data-progress]',
      { scaleX: 0 },
      { scaleX: 1, ease: EASE.scroll, scrollTrigger: { start: 0, end: 'max', scrub: true } },
    )
  })

  return (
    <header ref={root} className="sticky top-0 z-50 bg-light/95 text-ink backdrop-blur">
      <div className="mx-auto flex h-18 max-w-[1200px] items-center justify-between gap-6 px-5 md:px-10">
        <Link to={href('')} className="flex min-w-0 items-center gap-3">
          <Logo className="h-10 w-10 shrink-0" />
          <span className="line-clamp-2 font-display text-lg leading-tight text-primary-ink md:text-xl">{boutique.brand.name}</span>
        </Link>
        <div className="flex items-center gap-8">
          <nav aria-label="Pages" className="hidden md:block">
            <PageLinks className="flex items-center gap-8" />
          </nav>
          <div className="flex items-center gap-2">
            <WhatsAppPill className="bg-primary-ink text-on-primary-ink hover:bg-[color-mix(in_oklab,var(--c-primary-ink)_85%,black)]" />
            <MobileMenu buttonClassName="hover:bg-ink/5" />
          </div>
        </div>
      </div>
      <div className="relative h-3 overflow-hidden border-t border-ink/10" aria-hidden="true">
        <div data-progress className="invisible absolute inset-x-0 top-1 flex origin-left items-center">
          <span className="flex-1 border-t-2 border-dashed border-thread" />
          <IconNeedle size={14} stroke={1.75} className="-ml-1 shrink-0 rotate-45 text-thread" />
        </div>
      </div>
    </header>
  )
}
