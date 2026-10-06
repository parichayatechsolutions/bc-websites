// src/sections/team/FounderTeam.tsx
// Team / tailors - Founder letter (Variant B from Boutique Component Lab)
// The founder in an arch, her own words, her signature and the team named below.

import { useBoutique } from '../../app/BoutiqueContext'
import Media from '../../components/Media'

export default function FounderTeam() {
  const { boutique } = useBoutique()

  const ownerName = boutique.owner?.name || 'SG Lakshmi'
  const role = boutique.owner?.role || 'Founder & Designer'
  const since = boutique.established || (boutique as any).started || 2019

  // First sentence of the founder's story
  const fullStory =
    boutique.owner?.story ||
    (boutique as any).story ||
    'Started in 2019 with a passion for custom tailoring and bridal fashion. Today we help women look their absolute best.'
  const quote = fullStory.split(/(?<=\.)\s/)[0].replace(/\.$/, '')

  const team: { name: string; role: string }[] = (boutique as any).team || [
    { name: 'Lakshmi', role: 'Master tailor' },
    { name: 'Ravi', role: 'Cutting master' },
    { name: 'Fatima', role: 'Aari karigar' },
    { name: 'Suresh', role: 'Maggam karigar' },
    { name: 'Meena', role: 'Finishing' },
    { name: 'Priya', role: 'Fittings and front desk' },
  ]

  const crewLine = team
    .map((m) => `${m.name} (${m.role.toLowerCase()})`)
    .join(', ')
    .replace(/, ([^,]*)$/, ' and $1')

  return (
    <section
      id="about"
      style={{
        position: 'relative',
        isolation: 'isolate',
        overflow: 'hidden',
        background: 'var(--c-paper)',
        color: 'var(--c-ink)',
        padding: 'clamp(5rem, 12cqw, 10rem) 0',
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: '0 clamp(1.25rem, 5cqw, 4rem)',
          boxSizing: 'border-box',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: 'clamp(40px, 7cqw, 96px)',
          alignItems: 'center',
        }}
      >
        {/* Founder in an Arch */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            aspectRatio: '4/5',
            borderRadius: '999px 999px 0 0',
            boxShadow: '0 30px 60px -30px color-mix(in oklab, var(--c-dark) 25%, transparent)',
            background: 'var(--c-light)',
          }}
        >
          <Media
            file="owner.jpg"
            alt={ownerName}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Founder Letter Content */}
        <div>
          {/* Eyebrow */}
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '.26em',
              textTransform: 'uppercase',
              color: 'var(--c-primary-ink)',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                flex: 'none',
                width: 32,
                height: 1,
                background: 'currentColor',
                opacity: 0.55,
              }}
            />
            From the founder
          </span>

          {/* Large Quote */}
          <blockquote
            style={{
              margin: '20px 0 0',
              padding: 0,
              fontFamily: 'var(--f-display)',
              fontSize: 'clamp(1.7rem, 3.4cqw, 2.6rem)',
              lineHeight: 1.3,
            }}
          >
            “{quote}.”
          </blockquote>

          {/* Cursive Signature */}
          <span
            style={{
              display: 'block',
              marginTop: 24,
              fontFamily: "'Allura', cursive, var(--f-display)",
              fontSize: 'clamp(2.4rem, 5cqw, 3.4rem)',
              lineHeight: 1,
              color: 'var(--c-primary-ink)',
            }}
          >
            {ownerName}
          </span>

          {/* Role and Year */}
          <span
            style={{
              display: 'block',
              marginTop: 6,
              fontSize: 14,
              color: 'var(--c-muted)',
            }}
          >
            {role}, since {since}
          </span>

          {/* Team line */}
          <p
            style={{
              margin: '32px 0 0',
              paddingTop: 20,
              borderTop: '1px solid color-mix(in oklab, var(--c-ink) 18%, transparent)',
              fontSize: 15.5,
              lineHeight: 1.8,
              color: 'var(--c-muted)',
            }}
          >
            With {crewLine}.
          </p>
        </div>
      </div>
    </section>
  )
}
