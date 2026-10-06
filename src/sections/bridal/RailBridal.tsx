// src/sections/bridal/RailBridal.tsx
// Bridal packages - Photo rail (Variant I from Boutique Component Lab)
// Sideways package cards with photos, horizontal rail scroll, prev/next arrows, and consult CTA.

import { useRef } from 'react'
import { IconArrowLeft, IconArrowRight, IconBrandWhatsapp, IconCheck } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Media from '../../components/Media'
import { useBridal } from './bridalShared'

export default function RailBridal() {
  const { boutique } = useBoutique()
  const { doesBridal, consult } = useBridal()
  const railRef = useRef<HTMLDivElement>(null)

  if (!doesBridal) return null

  const pr = boutique.pricing?.startingAt?.map((p) => p.price) || [400, 950, 4500]
  const blousePrice = pr[2] || 4500
  const designerPrice = pr[1] || 950
  const delivery = boutique.pricing?.deliveryDays ? `${boutique.pricing.deliveryDays} days` : '7 days'

  const customPackages = boutique.bridalPackages && boutique.bridalPackages.length > 0 ? boutique.bridalPackages : null

  const packages = customPackages
    ? customPackages.map((p, i) => ({
        name: p.name,
        from: p.price ? 'from' : '',
        price: p.price ? `₹${Number(p.price).toLocaleString('en-IN')}` : 'On quote',
        items: p.includes && p.includes.length > 0 ? p.includes : [
          'Bridal blouse with handwork',
          'Lining, piping and finishing',
          'Trial fitting included',
          'Planned around your dates',
        ],
        file: (['work-bridal-01.jpg', 'work-bridal-02.jpg', 'work-bridal-03.jpg'][i] || 'work-bridal-01.jpg') as any,
      }))
    : [
        {
          name: 'Essential',
          from: 'from',
          price: `₹${Number(blousePrice).toLocaleString('en-IN')}`,
          items: [
            'Bridal blouse with handwork',
            'Lining, piping and finishing',
            'One trial fitting',
            `Ready in ${delivery}`,
          ],
          file: 'work-bridal-01.jpg' as const,
        },
        {
          name: 'Signature',
          from: 'from',
          price: `₹${Number(blousePrice + designerPrice).toLocaleString('en-IN')}`,
          items: [
            'Bridal blouse with handwork',
            'Reception designer blouse',
            'Two trial fittings',
            'Planned around your dates',
          ],
          file: 'work-bridal-02.jpg' as const,
        },
        {
          name: 'Trousseau',
          from: '',
          price: 'On quote',
          items: [
            'Bridal and reception blouses',
            'Lehenga or gown, custom fit',
            'Outfits for other ceremonies',
            'Fittings planned around your dates',
          ],
          file: 'work-bridal-03.jpg' as const,
        },
      ]

  const scroll = (direction: 'left' | 'right') => {
    if (!railRef.current) return
    const scrollAmount = 360
    railRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  const consultHref =
    consult ||
    whatsappLink(
      boutique,
      `Hi ${boutique.brand.name}, I'd like to book a bridal consultation for my upcoming wedding.`
    )

  return (
    <section
      id="bridal"
      style={{
        position: 'relative',
        isolation: 'isolate',
        overflow: 'hidden',
        background: 'var(--c-light)',
        color: 'var(--c-ink)',
        padding: 'clamp(5.5rem, 13cqw, 11rem) 0',
      }}
    >
      {/* Header with Title and Prev/Next buttons */}
      <div
        style={{
          maxWidth: 1440,
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 6cqw, 4.5rem)',
          boxSizing: 'border-box',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <div>
          {/* Eyebrow */}
          <p
            style={{
              margin: '0 0 22px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '.24em',
              textTransform: 'uppercase',
              color: 'var(--c-primary-ink)',
            }}
          >
            <span style={{ width: 32, height: 1, background: 'currentColor' }} />
            For the bride
            <span
              style={{
                width: 6,
                height: 6,
                transform: 'rotate(45deg)',
                border: '1px solid currentColor',
              }}
            />
          </p>

          {/* Heading */}
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--f-display)',
              fontWeight: 400,
              fontSize: 'clamp(2.3rem, 5.6cqw, 4.6rem)',
              lineHeight: 1.04,
              letterSpacing: '-0.012em',
              textWrap: 'balance',
            }}
          >
            Bridal <em style={{ fontStyle: 'italic', color: 'var(--c-thread)' }}>packages</em>
          </h2>

          {/* Decorative flourish */}
          <div
            aria-hidden="true"
            style={{
              marginTop: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              color: 'var(--c-thread)',
            }}
          >
            <span style={{ width: 56, height: 1, background: 'currentColor' }} />
            <span style={{ width: 7, height: 7, transform: 'rotate(45deg)', background: 'currentColor' }} />
            <span style={{ width: 18, height: 1, background: 'currentColor' }} />
          </div>
        </div>

        {/* Carousel buttons */}
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            type="button"
            onClick={() => scroll('left')}
            aria-label="Previous"
            style={{
              all: 'unset',
              cursor: 'pointer',
              width: 50,
              height: 50,
              display: 'grid',
              placeItems: 'center',
              borderRadius: '50%',
              border: '1px solid color-mix(in oklab, currentColor 30%, transparent)',
              transition: 'transform 150ms ease',
            }}
          >
            <IconArrowLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            aria-label="Next"
            style={{
              all: 'unset',
              cursor: 'pointer',
              width: 50,
              height: 50,
              display: 'grid',
              placeItems: 'center',
              borderRadius: '50%',
              background: 'var(--c-primary-ink)',
              color: 'var(--c-on-primary-ink)',
              transition: 'transform 150ms ease',
            }}
          >
            <IconArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Package Rail */}
      <div
        ref={railRef}
        style={{
          marginTop: 36,
          display: 'flex',
          gap: 18,
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          padding: '0 clamp(1.5rem, 6cqw, 4.5rem) 10px',
          scrollPaddingInline: 'clamp(1.5rem, 6cqw, 4.5rem)',
        }}
      >
        {packages.map((pk) => (
          <article
            key={pk.name}
            style={{
              flex: '0 0 clamp(280px, 34cqw, 380px)',
              scrollSnapAlign: 'start',
              borderRadius: 28,
              overflow: 'hidden',
              background: 'var(--c-paper)',
              border: '1px solid color-mix(in oklab, var(--c-thread) 45%, transparent)',
              boxShadow: '0 20px 40px -25px color-mix(in oklab, var(--c-dark) 20%, transparent)',
            }}
          >
            {/* Package Photo */}
            <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
              <Media file={pk.file} alt={pk.name} className="h-full w-full object-cover" />
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 9,
                  border: '1px solid color-mix(in oklab, #fff 45%, transparent)',
                  borderRadius: 'inherit',
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              />
            </div>

            {/* Package Details */}
            <div style={{ padding: 24 }}>
              <p style={{ margin: '0 0 12px', fontFamily: 'var(--f-display)', fontSize: 26 }}>
                {pk.name}
              </p>
              <p style={{ margin: 0, display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                {pk.from && <span style={{ fontSize: 13, opacity: 0.7 }}>{pk.from}</span>}
                <span
                  style={{
                    fontFamily: 'var(--f-display)',
                    fontSize: 30,
                    lineHeight: 1,
                    color: 'var(--c-primary-ink)',
                  }}
                >
                  {pk.price}
                </span>
              </p>
              <div style={{ marginTop: 18 }}>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 11 }}>
                  {pk.items.map((it) => (
                    <li key={it} style={{ display: 'flex', gap: 10, fontSize: 15, lineHeight: 1.5 }}>
                      <IconCheck
                        size={18}
                        style={{
                          color: 'var(--c-primary-ink)',
                          flex: 'none',
                          marginTop: 2,
                        }}
                      />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
        {/* End spacing spacer */}
        <span aria-hidden="true" style={{ flex: '0 0 clamp(1.5rem, 6cqw, 4.5rem)' }} />
      </div>

      {/* Bottom Consultation Banner */}
      <div
        style={{
          maxWidth: 1440,
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 6cqw, 4.5rem)',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            marginTop: 48,
            paddingTop: 28,
            borderTop: '1px solid color-mix(in oklab, var(--c-thread) 45%, transparent)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px 28px',
          }}
        >
          <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span
              style={{
                fontFamily: 'var(--f-display)',
                fontStyle: 'italic',
                fontSize: 'clamp(1.4rem, 2.4cqw, 1.9rem)',
                lineHeight: 1.15,
              }}
            >
              Planning your wedding looks?
            </span>
            <span style={{ fontSize: 14.5, opacity: 0.75 }}>
              Starting prices. Final price once we see your design and fabric.
            </span>
          </span>
          <a
            href={consultHref}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              minHeight: 52,
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              borderRadius: 999,
              padding: '0 28px',
              whiteSpace: 'nowrap',
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: '.02em',
              background: 'var(--c-primary-ink)',
              color: 'var(--c-on-primary-ink)',
              textDecoration: 'none',
              boxShadow:
                '0 0 0 1px color-mix(in oklab, var(--c-thread) 55%, transparent), 0 0 0 5px color-mix(in oklab, var(--c-thread) 12%, transparent)',
              transition: 'transform 200ms ease',
            }}
          >
            <IconBrandWhatsapp size={21} />
            <span>Book a bridal consult</span>
          </a>
        </div>
      </div>
    </section>
  )
}
