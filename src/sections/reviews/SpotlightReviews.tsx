// src/sections/reviews/SpotlightReviews.tsx
// Testimonials spotlight (Variant Z from Boutique Component Lab)
// Dark stage; one review lit in the centre, customer names as chips.

import { useState } from 'react'
import {
  IconBrandGoogle,
  IconCheck,
  IconClock,
  IconNeedleThread,
  IconQuote,
  IconSparkles,
  IconStarFilled,
} from '@tabler/icons-react'
import { useReviews } from './reviewShared'

export default function SpotlightReviews() {
  const { reviews, rating, count } = useReviews()
  const [activeIdx, setActiveIdx] = useState(0)

  if (!reviews || reviews.length === 0) return null

  const displayReviews = reviews.slice(0, 6)
  const current = displayReviews[activeIdx % displayReviews.length] || displayReviews[0]

  // Detect theme tags from review text
  const tags: { label: string; icon: any }[] = []
  if (/fit/i.test(current.text)) tags.push({ label: 'Fitting', icon: IconCheck })
  if (/handwork|aari|maggam|embroider|zardosi|detailing/i.test(current.text))
    tags.push({ label: 'Handwork', icon: IconNeedleThread })
  if (/bridal|wedding|lehenga/i.test(current.text))
    tags.push({ label: 'Bridal', icon: IconSparkles })
  if (/time|day|urgent|fast|punctual|deliver/i.test(current.text))
    tags.push({ label: 'On time', icon: IconClock })

  // Sensible default if no keywords matched
  if (tags.length === 0) {
    tags.push({ label: 'Fitting', icon: IconCheck }, { label: 'Handwork', icon: IconNeedleThread })
  }

  const ratingNum = rating ? rating.toFixed(1) : '4.9'
  const reviewCount = count || 57

  return (
    <section
      id="reviews"
      style={{
        position: 'relative',
        background: 'var(--c-dark)',
        color: 'var(--c-light)',
        padding: 'clamp(4.5rem, 11vw, 9rem) 0',
        overflow: 'hidden',
      }}
    >
      {/* Spotlight radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          width: '120%',
          height: '100%',
          transform: 'translateX(-50%)',
          background:
            'radial-gradient(ellipse 40% 50% at 50% 45%, color-mix(in oklab, var(--c-accent) 30%, transparent), transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          maxWidth: 900,
          margin: '0 auto',
          padding: '0 clamp(1.25rem, 5vw, 4rem)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxSizing: 'border-box',
        }}
      >
        {/* Quote badge */}
        <span
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            display: 'grid',
            placeItems: 'center',
            border: '1px solid var(--c-accent-on-dark)',
            color: 'var(--c-accent-on-dark)',
          }}
        >
          <IconQuote size={32} />
        </span>

        {/* Lit review quote */}
        <blockquote
          style={{
            margin: '24px 0 0',
            fontFamily: 'var(--f-display)',
            fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
            lineHeight: 1.18,
            maxWidth: '28ch',
            textWrap: 'pretty',
          }}
        >
          {current.text}
        </blockquote>

        {/* 5 Stars */}
        <div style={{ marginTop: 14 }}>
          <span style={{ display: 'flex', gap: 4, color: 'var(--c-accent-on-dark)', fontSize: 20 }}>
            {[1, 2, 3, 4, 5].map((st) => (
              <IconStarFilled key={st} size={20} />
            ))}
          </span>
        </div>

        {/* Feature Tags */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            marginTop: 14,
            justifyContent: 'center',
          }}
        >
          {tags.map((tg) => {
            const Icon = tg.icon
            return (
              <span
                key={tg.label}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  minHeight: 30,
                  padding: '0 14px',
                  borderRadius: 999,
                  background: 'color-mix(in oklab, var(--c-light) 12%, transparent)',
                  color: 'inherit',
                  fontSize: 13,
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                }}
              >
                <Icon size={15} />
                {tg.label}
              </span>
            )
          })}
        </div>

        {/* Customer selector chips */}
        <div
          style={{
            marginTop: 30,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          {displayReviews.map((qc, i) => {
            const isSelected = i === activeIdx
            const initial = qc.name[0]
            const avBg = i % 2 ? 'var(--c-accent)' : 'var(--c-primary)'
            const avFg = i % 2 ? 'var(--c-on-accent)' : 'var(--c-on-primary)'

            return (
              <button
                key={qc.name + i}
                type="button"
                onClick={() => setActiveIdx(i)}
                style={{
                  all: 'unset',
                  cursor: 'pointer',
                  minHeight: 40,
                  padding: '0 16px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  borderRadius: 999,
                  fontSize: 14,
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  border: isSelected
                    ? '1px solid var(--c-accent)'
                    : '1px solid color-mix(in oklab, var(--c-light) 40%, transparent)',
                  background: isSelected ? 'var(--c-accent)' : 'transparent',
                  color: isSelected ? 'var(--c-on-accent)' : 'var(--c-light)',
                  transition: 'background-color 200ms, color 200ms, transform 200ms',
                }}
              >
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    background: avBg,
                    color: avFg,
                    fontFamily: 'var(--f-display)',
                    fontSize: 13,
                  }}
                >
                  {initial}
                </span>
                {qc.name}
              </button>
            )
          })}
        </div>

        {/* Rating note */}
        <p
          style={{
            margin: '18px 0 0',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: '0.9375rem',
            color: 'var(--c-accent-on-dark)',
          }}
        >
          <IconBrandGoogle size={18} />
          {ratingNum}★ from {reviewCount} Google reviews
        </p>
      </div>
    </section>
  )
}
