// src/sections/nav/MegaNav.tsx
// Desktop: solid nav with an "Our work" mega menu panel that expands down to
// showcase categories and lookbook highlights.
// Phone: header with menu button opening a category sheet. (Lab: nav O, "Work mega menu".)

import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  IconBrandWhatsapp,
  IconChevronDown,
  IconDiamond,
  IconHanger,
  IconMoodKid,
  IconPhoto,
  IconShirt,
  IconSparkles,
} from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Logo from '../../components/Logo'
import { MobileMenu, WhatsAppPill } from './navShared'

export default function MegaNav() {
  const { boutique } = useBoutique()
  const { pages, href } = useSite()
  const [megaOpen, setMegaOpen] = useState(false)

  const categories = [
    {
      title: 'Bridal Couture',
      sub: 'Aari & maggam bridal blouses, reception lehengas',
      icon: IconDiamond,
      query: 'bridal',
    },
    {
      title: 'Blouse Studio',
      sub: 'Custom necklines, sleeve handwork & pattern cuts',
      icon: IconShirt,
      query: 'blouse',
    },
    {
      title: 'Lehengas & Gowns',
      sub: 'Made-to-measure silhouettes for occasions',
      icon: IconHanger,
      query: 'lehenga',
    },
    {
      title: 'Kids & Festive',
      sub: 'Pattu pavadais, frocks & mom-child twinning',
      icon: IconMoodKid,
      query: 'kids',
    },
  ]

  const askHref = (cat: string) =>
    whatsappLink(
      boutique,
      `Hi ${boutique.brand.name}, I would like to see your ${cat.toLowerCase()} designs.`
    )

  return (
    <header className="sticky top-0 z-50 bg-light text-ink border-b border-ink/10">
      {/* Top Main Bar */}
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-3 md:px-10">
        <Link to={href('')} className="group flex min-w-0 items-center gap-3">
          <Logo className="h-10 w-10 shrink-0 transition-transform duration-300 ease-stitch group-hover:rotate-[-6deg]" />
          <span className="line-clamp-2 font-display text-lg leading-tight md:text-xl text-primary-ink">
            {boutique.brand.name}
          </span>
        </Link>

        {/* Desktop Nav Links + Mega Trigger */}
        <nav aria-label="Pages" className="hidden items-center gap-8 md:flex">
          <NavLink
            to={href('')}
            end
            className={({ isActive }) => `link-stitch ${isActive ? 'is-current' : 'is-quiet'}`}
          >
            Home
          </NavLink>

          {/* Mega menu button */}
          <button
            type="button"
            onClick={() => setMegaOpen((o) => !o)}
            aria-expanded={megaOpen}
            className={`inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer ${
              megaOpen ? 'text-primary-ink font-semibold' : 'text-ink/80 hover:text-ink'
            }`}
          >
            <span>Our work</span>
            <IconChevronDown
              size={18}
              className={`transition-transform duration-300 ${megaOpen ? 'rotate-180' : 'rotate-0'}`}
            />
          </button>

          {pages
            .filter((p) => p.path !== '')
            .map((p) => (
              <NavLink
                key={p.path}
                to={href(p.path)}
                className={({ isActive }) => `link-stitch ${isActive ? 'is-current' : 'is-quiet'}`}
              >
                {p.label}
              </NavLink>
            ))}
        </nav>

        <div className="flex items-center gap-2">
          <WhatsAppPill className="bg-primary-ink text-on-primary-ink hover:opacity-90" />
          <MobileMenu buttonClassName="hover:bg-ink/5" />
        </div>
      </div>

      {/* Desktop Mega Panel Dropdown */}
      <div
        className={`hidden md:block overflow-hidden transition-[max-height,opacity] duration-400 ease-stitch border-t border-ink/5 bg-paper ${
          megaOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="mx-auto max-w-[1200px] px-8 py-8">
          <div className="grid grid-cols-5 gap-5">
            {/* Category Cards */}
            <div className="col-span-4 grid grid-cols-2 gap-4">
              {categories.map((cat) => {
                const Icon = cat.icon
                return (
                  <a
                    key={cat.title}
                    href={askHref(cat.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMegaOpen(false)}
                    className="group flex items-start gap-4 rounded-xl border border-ink/10 bg-light p-4.5 transition-all hover:border-primary-ink/30 hover:bg-light/80 hover:shadow-sm"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-ink/10 text-primary-ink transition-colors group-hover:bg-primary-ink group-hover:text-on-primary-ink">
                      <Icon size={22} stroke={1.5} />
                    </div>
                    <div>
                      <h4 className="font-display text-base font-semibold text-ink group-hover:text-primary-ink">
                        {cat.title}
                      </h4>
                      <p className="mt-1 text-xs text-muted leading-relaxed">{cat.sub}</p>
                    </div>
                  </a>
                )
              })}
            </div>

            {/* Lookbook / Consultation Spotlight Card */}
            <div className="col-span-1 flex flex-col justify-between rounded-xl bg-primary-ink p-5 text-on-primary-ink shadow-sm">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-on-primary-ink/15 px-2.5 py-0.5 text-[11px] font-semibold text-accent-on-dark uppercase tracking-wider">
                  <IconSparkles size={13} /> Custom Stitching
                </span>
                <p className="mt-3 font-display text-base font-medium leading-snug">
                  Have a design in mind?
                </p>
                <p className="mt-1 text-xs text-on-primary-ink/80 leading-normal">
                  Share photos or fabric details directly on WhatsApp for styling ideas & quotes.
                </p>
              </div>

              <a
                href={whatsappLink(
                  boutique,
                  `Hi ${boutique.brand.name}, I would like to consult with you on a custom outfit design.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMegaOpen(false)}
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 text-xs font-bold text-on-accent transition-transform hover:scale-[1.02]"
              >
                <IconBrandWhatsapp size={16} />
                <span>Consult Designer</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
