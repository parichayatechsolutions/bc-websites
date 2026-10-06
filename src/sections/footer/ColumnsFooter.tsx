// src/sections/footer/ColumnsFooter.tsx
// Columns footer (Variant B from Boutique Component Lab)
// Dark with a zari edge; about, pages, visit and contact columns.

import { Link } from 'react-router-dom'
import {
  IconArrowUp,
  IconBrandGoogle,
  IconBrandInstagram,
  IconBrandWhatsapp,
  IconLayoutList,
  IconMapPin,
  IconMessageCircle,
  IconPhone,
} from '@tabler/icons-react'
import { telLink, useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Logo from '../../components/Logo'
import { useLenis } from '../../motion/SmoothScroll'

export default function ColumnsFooter() {
  const { boutique } = useBoutique()
  const { pages, href } = useSite()
  const lenis = useLenis()
  const { brand, branches, contact, social } = boutique
  const branch = branches[0]
  const year = new Date().getFullYear()

  const toTop = () => (lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' }))

  const areaCity = branch
    ? [branch.area || branch.address, branch.city].filter(Boolean).join(', ')
    : 'Bengaluru'

  const socials = [
    {
      label: 'WhatsApp',
      icon: IconBrandWhatsapp,
      href: whatsappLink(boutique),
    },
    {
      label: 'Call',
      icon: IconPhone,
      href: telLink(contact.phone),
    },
    ...(social.instagram
      ? [
          {
            label: 'Instagram',
            icon: IconBrandInstagram,
            href: social.instagram.startsWith('http')
              ? social.instagram
              : `https://instagram.com/${social.instagram.replace('@', '')}`,
          },
        ]
      : []),
    ...(social.googleBusiness
      ? [
          {
            label: 'Google reviews',
            icon: IconBrandGoogle,
            href: social.googleBusiness,
          },
        ]
      : []),
  ]

  return (
    <footer
      style={{
        position: 'relative',
        overflow: 'hidden',
        isolation: 'isolate',
        background: 'var(--c-dark)',
        color: 'var(--c-light)',
        padding: '0 0 32px',
      }}
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          background:
            'radial-gradient(ellipse 60% 50% at 85% 0%, color-mix(in oklab, var(--c-accent) 16%, transparent), transparent 70%), radial-gradient(ellipse 50% 40% at 0% 100%, color-mix(in oklab, var(--c-primary) 30%, transparent), transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Top zari ornamental rule */}
      <div className="zari" style={{ width: '100%', height: 6 }} aria-hidden="true" />

      <div
        style={{
          maxWidth: 1440,
          margin: '0 auto',
          padding: '64px clamp(1.25rem, 5vw, 4rem) 0',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 36,
          }}
        >
          {/* Column 1: Brand */}
          <div>
            <Logo className="h-13 w-13" />
            <p
              style={{
                margin: '14px 0 0',
                fontFamily: 'var(--f-display)',
                fontSize: 24,
                lineHeight: 1.1,
              }}
            >
              {brand.name}
            </p>
            {brand.tagline && (
              <p style={{ margin: '8px 0 0', fontSize: 15, opacity: 0.85, maxWidth: '30ch' }}>
                {brand.tagline}
              </p>
            )}
          </div>

          {/* Column 2: Pages */}
          {pages.length > 1 && (
            <div>
              <p
                style={{
                  margin: '0 0 14px',
                  fontSize: 13,
                  fontWeight: 700,
                  color: 'var(--c-accent-on-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <IconLayoutList size={16} />
                Pages
              </p>
              <div style={{ display: 'grid', gap: 10, fontSize: 15 }}>
                {pages.map((p) => (
                  <Link
                    key={p.path}
                    to={href(p.path)}
                    style={{
                      color: 'inherit',
                      textDecoration: 'none',
                      opacity: 0.85,
                      transition: 'opacity 200ms',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.85')}
                  >
                    {p.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Column 3: Visit */}
          <div>
            <p
              style={{
                margin: '0 0 14px',
                fontSize: 13,
                fontWeight: 700,
                color: 'var(--c-accent-on-dark)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <IconMapPin size={16} />
              Visit
            </p>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }}>{areaCity}</p>
            {branch?.hours && (
              <p style={{ margin: '10px 0 0', fontSize: 15, lineHeight: 1.6, opacity: 0.85 }}>
                {branch.hours}
              </p>
            )}
            {branch?.mapsUrl && (
              <a
                href={branch.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  marginTop: 10,
                  fontSize: 14,
                  color: 'var(--c-accent-on-dark)',
                  textDecoration: 'underline dashed',
                  textUnderlineOffset: '0.3em',
                }}
              >
                Get directions
              </a>
            )}
          </div>

          {/* Column 4: Contact */}
          <div>
            <p
              style={{
                margin: '0 0 14px',
                fontSize: 13,
                fontWeight: 700,
                color: 'var(--c-accent-on-dark)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <IconMessageCircle size={16} />
              Contact
            </p>
            <div style={{ display: 'grid', gap: 10, fontSize: 15 }}>
              <a
                href={whatsappLink(boutique)}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  gap: 8,
                  alignItems: 'center',
                  whiteSpace: 'nowrap',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                <IconBrandWhatsapp size={18} />
                {contact.whatsapp}
              </a>
              <a
                href={telLink(contact.phone)}
                style={{
                  display: 'flex',
                  gap: 8,
                  alignItems: 'center',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                <IconPhone size={18} />
                {contact.phone}
              </a>
            </div>

            {/* Social buttons */}
            <div style={{ marginTop: 18 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {socials.map((so) => {
                  const Icon = so.icon
                  return (
                    <a
                      key={so.label}
                      href={so.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={so.label}
                      title={so.label}
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        display: 'grid',
                        placeItems: 'center',
                        border: '1px solid color-mix(in oklab, currentColor 35%, transparent)',
                        color: 'inherit',
                        textDecoration: 'none',
                        transition: 'transform 300ms cubic-bezier(.22,1,.36,1), background-color 300ms',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)'
                        e.currentTarget.style.background = 'color-mix(in oklab, currentColor 10%, transparent)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'none'
                        e.currentTarget.style.background = 'transparent'
                      }}
                    >
                      <Icon size={20} />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ marginTop: 52 }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '10px 24px',
              paddingTop: 22,
              borderTop: '1px solid color-mix(in oklab, currentColor 20%, transparent)',
              fontSize: 13.5,
              lineHeight: 1.5,
              opacity: 0.85,
            }}
          >
            <span>© {year} {brand.name}. Demo website</span>
            <span>
              Boutique site powered by{' '}
              <a
                href="https://parichayatechsolutions.com"
                target="_blank"
                rel="noopener"
                style={{
                  color: 'inherit',
                  textDecoration: 'underline dashed',
                  textUnderlineOffset: '.3em',
                }}
              >
                Parichaya Tech Solutions
              </a>
            </span>
            <button
              type="button"
              onClick={toTop}
              aria-label="Back to top"
              style={{
                all: 'unset',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                color: 'inherit',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                cursor: 'pointer',
              }}
            >
              <span
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  display: 'grid',
                  placeItems: 'center',
                  border: '1px solid color-mix(in oklab, currentColor 35%, transparent)',
                }}
              >
                <IconArrowUp size={16} />
              </span>
              Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
