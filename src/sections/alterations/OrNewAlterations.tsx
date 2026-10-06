// src/sections/alterations/OrNewAlterations.tsx
// Alterations price list - Alter or new? (Variant O from Boutique Component Lab)
// Dark stage. One, two or three fixes vs stitching a new blouse.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'

export default function OrNewAlterations() {
  const { boutique } = useBoutique()
  const [fixIdx, setFixIdx] = useState(0)

  // Prices and details from boutique configuration
  const pr = boutique.pricing?.startingAt?.map((p) => p.price) || [400]
  const blousePrice = pr[0] || 400

  const fixOptions = [
    {
      name: 'One fix',
      price: 150,
      line: 'Loosen or tighten',
    },
    {
      name: 'Two fixes',
      price: 300,
      line: 'Loosen or tighten + Blouse padding',
    },
    {
      name: 'Three fixes',
      price: 450,
      line: 'Loosen or tighten + Padding + Hooks and zip',
    },
  ]

  const curFix = fixOptions[fixIdx] || fixOptions[0]
  const waHref = whatsappLink(
    boutique,
    `Hi ${boutique.brand.name}, I would rather alter my blouse than stitch a new one. Can you help?`
  )

  return (
    <section
      id="alter-or-new"
      style={{
        position: 'relative',
        isolation: 'isolate',
        overflow: 'hidden',
        background: 'var(--c-dark)',
        color: 'var(--c-light)',
        padding: 'clamp(5rem, 12cqw, 10rem) 0',
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: '0 auto',
          padding: '0 clamp(1.25rem, 5cqw, 4rem)',
          boxSizing: 'border-box',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <p
            style={{
              margin: '0 0 16px',
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
            Alter or start again?
          </p>
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--f-display)',
              fontWeight: 400,
              fontSize: 'clamp(2.3rem, 5.6cqw, 4.6rem)',
              lineHeight: 1.04,
              letterSpacing: '-0.015em',
              textWrap: 'balance',
            }}
          >
            Fix it for{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--c-accent-on-dark)' }}>less</em>
          </h2>
        </div>

        {/* Side-by-side Cards */}
        <div
          style={{
            marginTop: 36,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(12px, 3cqw, 28px)',
          }}
        >
          {/* Left card: Alter it */}
          <div
            style={{
              padding: 'clamp(22px, 4cqw, 36px)',
              borderRadius: 26,
              background: 'var(--c-accent-on-dark)',
              color: 'var(--c-dark)',
              transition: 'transform 200ms ease',
            }}
          >
            <span
              style={{
                display: 'block',
                whiteSpace: 'nowrap',
                fontSize: 11.5,
                fontWeight: 600,
                letterSpacing: '.18em',
                textTransform: 'uppercase',
                color: 'inherit',
              }}
            >
              Alter it
            </span>
            <span
              style={{
                display: 'block',
                marginTop: 12,
                fontFamily: 'var(--f-display)',
                fontSize: 'clamp(2.4rem, 6cqw, 4rem)',
                lineHeight: 1,
              }}
            >
              ₹{curFix.price.toLocaleString('en-IN')}
            </span>
            <span style={{ display: 'block', marginTop: 10, fontSize: 15 }}>
              {curFix.line}
            </span>
          </div>

          {/* Right card: Stitch a new one */}
          <div
            style={{
              padding: 'clamp(22px, 4cqw, 36px)',
              borderRadius: 26,
              boxShadow: 'inset 0 0 0 1px color-mix(in oklab, var(--c-light) 30%, transparent)',
            }}
          >
            <span
              style={{
                display: 'block',
                whiteSpace: 'nowrap',
                fontSize: 11.5,
                fontWeight: 600,
                letterSpacing: '.18em',
                textTransform: 'uppercase',
                color: 'var(--c-accent-on-dark)',
              }}
            >
              Stitch a new one
            </span>
            <span
              style={{
                display: 'block',
                marginTop: 12,
                fontFamily: 'var(--f-display)',
                fontSize: 'clamp(2.4rem, 6cqw, 4rem)',
                lineHeight: 1,
              }}
            >
              from ₹{blousePrice.toLocaleString('en-IN')}
            </span>
            <span style={{ display: 'block', marginTop: 10, fontSize: 15, opacity: 0.8 }}>
              Simple blouse stitching, from scratch
            </span>
          </div>
        </div>

        {/* Option pills */}
        <div style={{ marginTop: 22 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {fixOptions.map((opt, i) => (
              <button
                key={opt.name}
                type="button"
                onClick={() => setFixIdx(i)}
                style={{
                  all: 'unset',
                  cursor: 'pointer',
                  minHeight: 40,
                  padding: '0 20px',
                  borderRadius: 999,
                  fontSize: 14,
                  fontWeight: 600,
                  background: i === fixIdx ? 'var(--c-accent-on-dark)' : 'transparent',
                  color: i === fixIdx ? 'var(--c-dark)' : 'var(--c-light)',
                  border:
                    i === fixIdx
                      ? 'none'
                      : '1px solid color-mix(in oklab, var(--c-light) 30%, transparent)',
                  transition: 'all 200ms ease',
                }}
              >
                {opt.name}
              </button>
            ))}
          </div>
        </div>

        {/* WhatsApp CTA */}
        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              minHeight: 50,
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              borderRadius: 999,
              padding: '0 26px',
              fontSize: 15,
              fontWeight: 600,
              whiteSpace: 'nowrap',
              maxWidth: '100%',
              boxSizing: 'border-box',
              background: 'var(--c-accent-on-dark)',
              color: 'var(--c-dark)',
              textDecoration: 'none',
              boxShadow:
                '0 0 0 1px color-mix(in oklab, var(--c-accent-on-dark) 45%, transparent), 0 0 0 4px color-mix(in oklab, var(--c-accent-on-dark) 15%, transparent)',
              transition: 'transform 200ms ease',
            }}
          >
            <IconBrandWhatsapp size={20} />
            <span>Ask about altering mine</span>
          </a>
        </div>
      </div>
    </section>
  )
}
