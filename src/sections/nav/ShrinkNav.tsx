// src/sections/nav/ShrinkNav.tsx
// Starts tall, with the logo and name large and centred like a shop sign,
// and shrinks to a compact bar once the visitor scrolls. The pages and
// WhatsApp stay in reach the whole way. (Lab: nav W, "Shrinking".)
//
// A sticky bar that takes its own space, so pages needn't be marked
// `overlay`. The change is a CSS height and size transition; with reduced
// motion it simply switches.

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useBoutique } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Logo from '../../components/Logo'
import { MobileMenu, PageLinks, WhatsAppPill } from './navShared'

export default function ShrinkNav() {
  const { boutique } = useBoutique()
  const { href } = useSite()
  const [small, setSmall] = useState(false)

  useEffect(() => {
    const onScroll = () => setSmall(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-light/95 text-ink backdrop-blur">
      <div
        className={`mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 transition-[height] duration-300 ease-stitch md:px-10 ${
          small ? 'h-16' : 'h-20 md:h-36'
        }`}
      >
        <Link to={href('')} className={`flex min-w-0 items-center gap-3 ${small ? '' : 'md:flex-col md:gap-2'}`}>
          <Logo className={`shrink-0 transition-[width,height] duration-300 ease-stitch ${small ? 'h-9 w-9' : 'h-11 w-11 md:h-16 md:w-16'}`} />
          <span
            className={`line-clamp-2 font-display leading-tight text-primary-ink transition-[font-size] duration-300 ease-stitch ${
              small ? 'text-lg' : 'text-xl md:text-3xl'
            }`}
          >
            {boutique.brand.name}
          </span>
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
    </header>
  )
}
