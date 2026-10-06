// src/sections/faq/CardsFaq.tsx
// Card grid FAQ (Variant E from Boutique Component Lab)
// A card per question with a ringed icon and italic number.

import {
  IconBolt,
  IconBrandWhatsapp,
  IconCalendarCheck,
  IconClock,
  IconCurrencyRupee,
  IconDiamond,
  IconNeedleThread,
  IconPhoto,
  IconRulerMeasure,
} from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'

export default function CardsFaq() {
  const { boutique } = useBoutique()
  const pr = boutique.pricing?.startingAt?.map((p) => p.price) || [400, 950, 4500]
  const inr = (n: number) => '₹' + Number(n).toLocaleString('en-IN')
  const delivery = boutique.pricing?.deliveryDays ? `${boutique.pricing.deliveryDays} days` : '7 days'
  const express = boutique.pricing?.express || '48 hours, ₹250 extra'
  const branch = boutique.branches[0]
  const hours = branch?.hours || 'Mon–Sat 10:00am–7:00pm, Sun closed'

  const questions = [
    {
      icon: IconCurrencyRupee,
      q: 'How much does a blouse cost?',
      big: inr(pr[0] || 400),
      a: `onwards for a simple blouse, stitched to your measurements. Designer blouses start at ${inr(pr[1] || 950)}.`,
    },
    {
      icon: IconDiamond,
      q: 'What does bridal work cost?',
      big: inr(pr[2] || 4500),
      a: 'onwards. Handwork is priced by the design, and we agree the price with you before we start.',
    },
    {
      icon: IconCalendarCheck,
      q: 'How long does stitching take?',
      big: delivery,
      a: 'for normal orders, counted from the day you give us the fabric.',
    },
    {
      icon: IconBolt,
      q: 'Can you do it faster?',
      big: 'Yes.',
      a: `Express stitching takes ${express}.`,
    },
    {
      icon: IconRulerMeasure,
      q: 'How many fittings will I need?',
      big: '',
      a: 'Usually one trial fitting. We adjust until it sits right before you take it home.',
    },
    {
      icon: IconPhoto,
      q: 'Can I send a design photo?',
      big: '',
      a: "Yes. Send a photo from Instagram or Pinterest on WhatsApp and we'll tell you how we'd make it.",
    },
    {
      icon: IconNeedleThread,
      q: 'What handwork do you do?',
      big: '',
      a: 'Aari, maggam, zardosi, cutwork and hand embroidery done in-house.',
    },
    {
      icon: IconClock,
      q: 'When are you open?',
      big: '',
      a: hours,
    },
  ]

  return (
    <section
      id="questions"
      style={{
        position: 'relative',
        isolation: 'isolate',
        overflow: 'hidden',
        background: 'var(--c-light)',
        color: 'var(--c-ink)',
        padding: 'clamp(5.5rem, 13vw, 11rem) 0',
      }}
    >
      {/* Background dotted radial motif */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          backgroundImage:
            'radial-gradient(circle, transparent 58%, color-mix(in oklab, var(--c-primary) 4%, transparent) 60%, transparent 64%)',
          backgroundSize: '34px 34px',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 1440,
          margin: '0 auto',
          padding: '0 clamp(1.25rem, 5vw, 4rem)',
          boxSizing: 'border-box',
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            margin: '0 0 22px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '.24em',
            textTransform: 'uppercase',
            color: 'var(--c-primary-ink)',
          }}
        >
          <span style={{ width: 40, height: 1, background: 'currentColor' }} />
          Questions
          <span style={{ width: 6, height: 6, transform: 'rotate(45deg)', border: '1px solid currentColor' }} />
        </p>

        {/* Heading */}
        <h2
          style={{
            margin: 0,
            fontFamily: 'var(--f-display)',
            fontWeight: 400,
            fontSize: 'clamp(2.3rem, 5.6vw, 4.6rem)',
            lineHeight: 1.04,
            letterSpacing: '-0.012em',
            textWrap: 'balance',
          }}
        >
          Questions, <em style={{ fontStyle: 'italic', color: 'var(--c-thread)' }}>answered</em>
        </h2>

        {/* Ornamental divider line */}
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

        {/* Card grid */}
        <div
          style={{
            marginTop: 40,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16,
          }}
        >
          {questions.map((fq, i) => {
            const Icon = fq.icon
            const num = String(i + 1).padStart(2, '0')

            return (
              <article
                key={fq.q}
                style={{
                  padding: 26,
                  borderRadius: 22,
                  background: 'var(--c-paper)',
                  border: '1px solid color-mix(in oklab, var(--c-thread) 45%, transparent)',
                  outline: '1px solid color-mix(in oklab, var(--c-thread) 22%, transparent)',
                  outlineOffset: -8,
                  boxShadow: '0 40px 80px -60px color-mix(in oklab, var(--c-dark) 50%, transparent)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 18,
                  }}
                >
                  <span
                    style={{
                      flex: 'none',
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      display: 'grid',
                      placeItems: 'center',
                      background: 'var(--c-primary)',
                      color: 'var(--c-accent)',
                      boxShadow:
                        '0 0 0 4px transparent, 0 0 0 5px color-mix(in oklab, var(--c-thread) 60%, transparent)',
                    }}
                  >
                    <Icon size={22} />
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--f-display)',
                      fontStyle: 'italic',
                      fontSize: 28,
                      color: 'var(--c-thread)',
                    }}
                  >
                    {num}
                  </span>
                </div>

                <p
                  style={{
                    margin: 0,
                    fontFamily: 'var(--f-display)',
                    fontSize: 22,
                    lineHeight: 1.25,
                  }}
                >
                  {fq.q}
                </p>

                <p
                  style={{
                    margin: '10px 0 0',
                    fontSize: 15.5,
                    lineHeight: 1.7,
                    color: 'var(--c-muted)',
                  }}
                >
                  {fq.big && (
                    <b
                      style={{
                        fontFamily: 'var(--f-display)',
                        fontWeight: 400,
                        fontSize: '1.3em',
                        color: 'var(--c-primary-ink)',
                      }}
                    >
                      {fq.big}{' '}
                    </b>
                  )}
                  {fq.a}
                </p>
              </article>
            )
          })}
        </div>

        {/* Bottom banner: Still wondering? */}
        <div
          style={{
            marginTop: 52,
            paddingTop: 30,
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
                fontSize: 'clamp(1.5rem, 2.6vw, 2rem)',
                lineHeight: 1.15,
              }}
            >
              Still wondering about something?
            </span>
            <span style={{ fontSize: 14.5, opacity: 0.75 }}>We usually reply within store hours.</span>
          </span>

          <a
            href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I have a question.`)}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              minHeight: 52,
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              borderRadius: 999,
              padding: '0 26px',
              whiteSpace: 'nowrap',
              fontSize: 16,
              fontWeight: 600,
              background: 'var(--c-primary-ink)',
              color: 'var(--c-on-primary-ink)',
              textDecoration: 'none',
              transition: 'opacity 200ms',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <IconBrandWhatsapp size={22} />
            Ask us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
