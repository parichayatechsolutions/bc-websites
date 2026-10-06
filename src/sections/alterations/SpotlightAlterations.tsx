// src/sections/alterations/SpotlightAlterations.tsx
// Before / after alterations - Spotlight (Variant Z from Boutique Component Lab)
// Dark stage, one pair lit at a time with pips, Before & After tags, and WhatsApp CTA.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Media from '../../components/Media'
import { useAlterations } from './altShared'

const DEFAULT_ALTS = [
  {
    cat: 'Blouse',
    title: 'Blouse taken in at the waist',
    note: 'A loose silk blouse refitted so it sits close without pulling.',
    before: 'before-01.jpg',
    after: 'after-01.jpg',
    fallbackBefore: 'alter-01-before.jpg',
    fallbackAfter: 'alter-01-after.jpg',
  },
  {
    cat: 'Lehenga',
    title: 'Lehenga refitted for the reception',
    note: 'Waist and length adjusted, and the can-can reshaped for more flare.',
    before: 'alter-02-before.jpg',
    after: 'alter-02-after.jpg',
    fallbackBefore: 'alter-02-before.jpg',
    fallbackAfter: 'alter-02-after.jpg',
  },
  {
    cat: 'Kurti',
    title: 'Kurti resized and restyled',
    note: 'Side seams taken in, sleeves shortened and a new neckline cut.',
    before: 'alter-03-before.jpg',
    after: 'alter-03-after.jpg',
    fallbackBefore: 'alter-03-before.jpg',
    fallbackAfter: 'alter-03-after.jpg',
  },
  {
    cat: 'Upcycle',
    title: 'An old saree, now a lehenga',
    note: 'A treasured silk saree cut and stitched into a lehenga with its own border.',
    before: 'alter-04-before.jpg',
    after: 'alter-04-after.jpg',
    fallbackBefore: 'alter-04-before.jpg',
    fallbackAfter: 'alter-04-after.jpg',
  },
]

export default function SpotlightAlterations() {
  const { boutique } = useBoutique()
  const { pairs, caption } = useAlterations()
  const [xa, setXa] = useState(0)

  // Combine real pairs with descriptive titles
  const alts = DEFAULT_ALTS.map((def, i) => {
    const realPair = pairs[i]
    return {
      cat: def.cat,
      title: (realPair && caption(realPair)) || def.title,
      note: def.note,
      before: realPair?.before || def.before,
      after: realPair?.after || def.after,
    }
  })

  const cur = alts[xa % alts.length]
  const waHref = whatsappLink(
    boutique,
    `Hi ${boutique.brand.name}, I have a garment I'd like altered. Can I send you a photo?`
  )

  return (
    <section
      id="alterations"
      style={{
        position: 'relative',
        isolation: 'isolate',
        overflow: 'hidden',
        background: 'var(--c-dark)',
        color: 'var(--c-light)',
        padding: 'clamp(5.5rem, 13cqw, 11rem) 0',
      }}
    >
      {/* Background radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          width: '120%',
          height: '100%',
          transform: 'translateX(-50%)',
          zIndex: -1,
          background:
            'radial-gradient(ellipse 34% 46% at 50% 44%, color-mix(in oklab, var(--c-accent) 26%, transparent), transparent 70%)',
        }}
      />

      <div
        style={{
          maxWidth: 900,
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 6cqw, 4.5rem)',
          boxSizing: 'border-box',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            margin: '0 0 22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '.24em',
            textTransform: 'uppercase',
            color: 'var(--c-accent-on-dark)',
          }}
        >
          <span style={{ width: 32, height: 1, background: 'currentColor' }} />
          Before and after
          <span
            style={{
              width: 6,
              height: 6,
              transform: 'rotate(45deg)',
              border: '1px solid currentColor',
            }}
          />
        </p>

        {/* Current Pair Card */}
        <div style={{ width: '100%' }}>
          <div
            style={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 4,
              borderRadius: 22,
              overflow: 'hidden',
              boxShadow: '0 30px 60px -40px color-mix(in oklab, var(--c-dark) 55%, transparent)',
            }}
          >
            {/* Before Photo */}
            <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
              <Media file={cur.before as any} alt={`${cur.title} before`} className="h-full w-full object-cover" />
              <span
                style={{
                  position: 'absolute',
                  top: 14,
                  left: 14,
                  zIndex: 4,
                  padding: '6px 12px',
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '.16em',
                  textTransform: 'uppercase',
                  background: 'color-mix(in oklab, #fff 88%, transparent)',
                  color: 'var(--c-ink)',
                  backdropFilter: 'blur(6px)',
                }}
              >
                Before
              </span>
            </div>

            {/* After Photo */}
            <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
              <Media file={cur.after as any} alt={`${cur.title} after`} className="h-full w-full object-cover" />
              <span
                style={{
                  position: 'absolute',
                  top: 14,
                  right: 14,
                  zIndex: 4,
                  padding: '6px 12px',
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '.16em',
                  textTransform: 'uppercase',
                  background: 'var(--c-dark)',
                  color: 'var(--c-light)',
                  backdropFilter: 'blur(6px)',
                }}
              >
                After
              </span>
            </div>
          </div>

          {/* Title & Note */}
          <p
            style={{
              margin: '22px 0 0',
              fontFamily: 'var(--f-display)',
              fontStyle: 'italic',
              fontSize: 'clamp(1.8rem, 3.6cqw, 2.6rem)',
            }}
          >
            {cur.title}
          </p>
          <p style={{ margin: '8px 0 0', fontSize: 16, opacity: 0.8 }}>
            {cur.note}
          </p>
        </div>

        {/* Navigation Pips */}
        <div style={{ marginTop: 18, display: 'flex', gap: 4 }}>
          {alts.map((a, i) => (
            <button
              key={a.cat}
              type="button"
              onClick={() => setXa(i)}
              aria-label={a.cat}
              style={{
                all: 'unset',
                cursor: 'pointer',
                width: 44,
                height: 44,
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <span
                style={{
                  width: i === xa ? 30 : 10,
                  height: 10,
                  borderRadius: 999,
                  background:
                    i === xa
                      ? 'var(--c-accent)'
                      : 'color-mix(in oklab, var(--c-light) 35%, transparent)',
                  transition: 'width 350ms, background-color 350ms',
                }}
              />
            </button>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <div style={{ marginTop: 14 }}>
          <a
            href={waHref}
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
              background: 'var(--c-accent)',
              color: 'var(--c-on-accent)',
              textDecoration: 'none',
              boxShadow:
                '0 0 0 1px color-mix(in oklab, var(--c-thread) 55%, transparent), 0 0 0 5px color-mix(in oklab, var(--c-thread) 12%, transparent)',
              transition: 'transform 200ms ease',
            }}
          >
            <IconBrandWhatsapp size={21} />
            <span>Send a photo on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  )
}
