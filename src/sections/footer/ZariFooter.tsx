// src/sections/footer/ZariFooter.tsx
// The page ends on paper between two zari borders, in three columns: where
// to visit, the logo and name in the middle, and how to talk to them; the
// pages and credit beneath. (Lab: footer H, "Double zari".)
//
// The first branch. No motion.

import { Link } from 'react-router-dom'
import { IconBrandWhatsapp, IconMapPin, IconPhone } from '@tabler/icons-react'
import { telLink, useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Credit from '../../components/Credit'
import Logo from '../../components/Logo'

export default function ZariFooter() {
  const { boutique } = useBoutique()
  const { pages, href } = useSite()
  const branch = boutique.branches[0]
  const { contact } = boutique

  const appointmentHref = whatsappLink(
    boutique,
    `Hi ${boutique.brand.name}, I would like to book a couture fitting appointment.`
  )

  return (
    <footer className="relative overflow-hidden bg-[color-mix(in_oklab,var(--c-dark)_85%,black)] text-light border-t border-accent-on-dark/45 shadow-[inset_0_2px_0_-1px_var(--c-accent-on-dark)]">
      {/* Decorative gold hairlines identical to LuxeNav */}
      <div className="zari opacity-70" aria-hidden="true" />
      <div className="mt-1 zari opacity-40" aria-hidden="true" />

      {/* Ambient subtle glow */}
      <div
        className="pointer-events-none absolute -bottom-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-accent-on-dark/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 py-14 md:px-10">
        <div className="grid gap-10 md:grid-cols-3 md:items-center">
          {/* Left: Location & Hours */}
          <div className="text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-on-dark">
              Atelier Location
            </p>
            {branch && (
              <>
                <p className="mt-3 text-sm text-light/80 leading-relaxed max-w-xs mx-auto md:mx-0">
                  {branch.address}, {branch.city} {branch.pincode}
                </p>
                {branch.hours && (
                  <p className="mt-1.5 text-xs text-light/60 font-mono tracking-wide">
                    {branch.hours}
                  </p>
                )}
                <a
                  href={branch.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-accent-on-dark hover:underline"
                >
                  <IconMapPin size={14} />
                  <span>Get Directions</span>
                </a>
              </>
            )}
          </div>

          {/* Center: Emblem, Brand & Tagline */}
          <div className="flex flex-col items-center text-center">
            <Link to={href('')} className="group flex flex-col items-center">
              <Logo className="h-16 w-16 object-contain transition-transform duration-300 ease-stitch group-hover:scale-105" />
              <span className="mt-3 font-display text-2xl md:text-3xl tracking-[0.02em] leading-tight text-light">
                {boutique.brand.name}
              </span>
            </Link>
            {boutique.brand.tagline && (
              <p className="mt-2 text-xs italic text-light/70 font-serif max-w-xs">
                "{boutique.brand.tagline}"
              </p>
            )}
          </div>

          {/* Right: Talk to us & Appointments CTA */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-on-dark">
              Talk to Us
            </p>
            <p className="mt-3">
              <a
                href={telLink(contact.phone)}
                className="inline-flex items-center gap-1.5 text-sm font-medium tracking-wide text-light/85 hover:text-accent-on-dark transition-colors"
              >
                <IconPhone size={15} />
                <span className="tabular-nums">{contact.phone}</span>
              </a>
            </p>
            <div className="mt-4">
              <a
                href={appointmentHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-accent-on-dark px-5 py-2 text-xs md:text-sm font-semibold tracking-wide text-accent-on-dark transition-colors hover:bg-accent-on-dark hover:text-dark"
              >
                <IconBrandWhatsapp size={17} />
                <span>Appointments</span>
              </a>
            </div>
          </div>
        </div>

        {/* Navigation Page Links matching LuxeNav */}
        {pages.length > 1 && (
          <nav aria-label="Footer Pages" className="mt-12 border-t border-accent-on-dark/20 pt-6">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
              {pages.map((p) => (
                <li key={p.path}>
                  <Link
                    to={href(p.path)}
                    className="text-sm text-light/75 hover:text-accent-on-dark transition-colors"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <Credit className="mt-8 justify-center text-center text-xs text-light/50" />
      </div>

      <div className="zari opacity-40" aria-hidden="true" />
      <div className="mt-1 zari opacity-70" aria-hidden="true" />
    </footer>
  )
}
