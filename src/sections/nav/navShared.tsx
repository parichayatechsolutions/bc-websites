// src/sections/nav/navShared.tsx
// What every navigation needs: the scroll behaviour, the page links, and the
// full-screen menu on phones. Each nav component only decides the layout.

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { NavLink, useLocation } from 'react-router-dom'
import { IconBrandWhatsapp, IconMenu2, IconPhone, IconX } from '@tabler/icons-react'
import { telLink, useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Button from '../../components/Button'
import { useLenis } from '../../motion/SmoothScroll'

/**
 * `solid` once the visitor has scrolled past the hero (or straight away on a
 * page without one); `hidden` while scrolling down, so the nav gets out of the
 * way of reading and comes back the moment they scroll up.
 */
export function useNavScroll() {
  const { current } = useSite()
  const overHero = Boolean(current?.overlay)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > window.innerHeight * 0.9)
      setHidden(y > last && y > window.innerHeight * 0.5)
      last = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { solid: !overHero || scrolled, hidden }
}

/** Page links for a desktop nav. The current page is marked for screen readers and styled. */
export function PageLinks({ className = '', linkClassName = '' }: { className?: string; linkClassName?: string }) {
  const { pages, href } = useSite()
  if (pages.length < 2) return null
  return (
    <ul className={className}>
      {pages.map((page) => (
        <li key={page.path}>
          <NavLink
            to={href(page.path)}
            end
            className={({ isActive }) => `link-stitch ${isActive ? 'is-current' : 'is-quiet'} ${linkClassName}`}
          >
            {page.label}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}

/** Menu button plus the full-screen menu it opens. Shown on phones only. */
export function MobileMenu({ buttonClassName = '' }: { buttonClassName?: string }) {
  const { boutique } = useBoutique()
  const { pages, href } = useSite()
  const { pathname } = useLocation()
  const lenis = useLenis()
  const [open, setOpen] = useState(false)

  // Close when the page changes; freeze the page behind the menu while open.
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (open) lenis?.stop()
    else lenis?.start()
    document.documentElement.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, lenis])

  if (pages.length < 2) return null

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className={`grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full md:hidden ${buttonClassName}`}
      >
        <IconMenu2 size={24} stroke={1.75} aria-hidden="true" />
      </button>

      {/* Rendered at the page root: the header moves (translate), which would
          otherwise trap a fixed, full-screen menu inside the header's box.
          Inside .boutique, so the brand colours still apply. */}
      {createPortal(
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-0 z-[60] flex flex-col bg-dark px-6 pb-10 pt-5 text-light transition-[opacity,visibility] duration-300 ease-stitch md:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="ml-auto grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-light/10"
        >
          <IconX size={24} stroke={1.75} aria-hidden="true" />
        </button>

        <nav className="mt-10 flex-1" aria-label="Pages">
          <ul className="space-y-4">
            {pages.map((page, i) => (
              <li
                key={page.path}
                className={`transition-[opacity,translate] duration-500 ease-stitch ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                style={{ transitionDelay: open ? `${80 + i * 50}ms` : '0ms' }}
              >
                <NavLink
                  to={href(page.path)}
                  end
                  className={({ isActive }) => `t-1 block ${isActive ? 'text-accent-on-dark' : ''}`}
                >
                  {page.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3">
          <Button href={whatsappLink(boutique)} icon={IconBrandWhatsapp}>
            Chat on WhatsApp
          </Button>
          <Button href={telLink(boutique.contact.phone)} variant="outline-light" icon={IconPhone}>
            Call {boutique.contact.phone}
          </Button>
        </div>
      </div>,
      document.querySelector('.boutique') ?? document.body,
      )}
    </>
  )
}

/** Round WhatsApp button; shows its label from `sm` up unless `iconOnly`. */
export function WhatsAppPill({ className = '', iconOnly = false }: { className?: string; iconOnly?: boolean }) {
  const { boutique } = useBoutique()
  return (
    <a
      href={whatsappLink(boutique)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={`group inline-flex h-11 w-11 shrink-0 items-center justify-center gap-2 rounded-full text-sm font-semibold transition-[background-color,color,scale] duration-200 ease-stitch active:scale-[0.97] ${iconOnly ? '' : 'sm:w-auto sm:px-5'} ${className}`}
    >
      <IconBrandWhatsapp
        size={20}
        stroke={1.75}
        aria-hidden="true"
        className="transition-transform duration-300 ease-stitch group-hover:-rotate-8 group-hover:scale-110"
      />
      {!iconOnly && <span className="hidden sm:inline">Chat on WhatsApp</span>}
    </a>
  )
}
