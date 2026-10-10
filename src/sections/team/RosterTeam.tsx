// src/sections/team/RosterTeam.tsx
// "The hands behind your clothes" - Interactive luxury atelier showcase
// Left side: All employees listed one-by-one with highlighted craftsmanship details
// Right side: Large artisan photograph with auto-cycling timer (4.5s) and creamy gold background.

import { useEffect, useRef, useState } from 'react'
import { IconArrowLeft, IconArrowRight, IconBrandWhatsapp, IconSparkles } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Media from '../../components/Media'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import type { PhotoFile } from '../../types/boutique'

export default function RosterTeam({ id = 'team' }: { id?: string }) {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useMotion(root, () => {
    wipe('[data-team-showcase]', { trigger: root.current })
  })

  const rawTeam = boutique.team ?? []
  const team =
    rawTeam.length > 0
      ? rawTeam
      : [
          {
            name: boutique.owner?.name ?? `${boutique.brand.name} Master Tailor`,
            role: boutique.owner?.role ?? 'Founder & Lead Designer',
            years: boutique.established ? new Date().getFullYear() - boutique.established : undefined,
            specialty: 'Bridal Blouses & Bespoke Silhouette Drafting',
            line:
              boutique.owner?.story ??
              boutique.highlight ??
              'Guiding every cut, drape, and stitch with artisanal precision.',
            howTheyWork:
              'Personally takes all 14 contour measurements, conducts personal trial sessions, and engineers structured fits so each blouse feels effortless.',
            photo: boutique.owner?.photo,
          },
          {
            name: 'Master Tailor & Pattern Cutter',
            role: 'Head of Pattern Cutting',
            specialty: 'Precision Pattern Drafting & Fabric Shearing',
            line: 'Bespoke blouse silhouettes drafted to each client’s unique shoulder slope and posture.',
            howTheyWork:
              'Drafts customized paper patterns accounting for individual posture before making the first scissor cut into pure bridal silks.',
            photo: (boutique.media?.teamAtWork || 'team-at-work.jpg') as PhotoFile,
          },
          {
            name: 'Zari & Aari Handwork Specialist',
            role: 'Master Embroidery Artisan',
            specialty: 'Heritage Maggam, Zardosi & Seed Pearl Detailing',
            line: 'Heritage bridal maggam, zardosi, and beadwork executed needle by needle.',
            howTheyWork:
              'Mounts pure silks on tensioned embroidery frames, hand-applying gold zari coils and stones with millimeter precision.',
            photo: (boutique.media?.work?.[0] || 'closeup-01.jpg') as PhotoFile,
          },
        ]

  // Auto-advance every 4.5 seconds unless hovered/paused
  useEffect(() => {
    if (isPaused || team.length <= 1) return
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % team.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [isPaused, team.length])

  const currentPerson = team[activeIdx] || team[0]

  const getPersonPhoto = (person: (typeof team)[number], index: number): PhotoFile => {
    if (person.photo) return person.photo
    const work = boutique.media?.work || []
    if (index === 0 && boutique.owner?.photo) return boutique.owner.photo
    if (boutique.media?.teamAtWork) return boutique.media.teamAtWork
    return (work[index % work.length] || 'team-at-work.jpg') as PhotoFile
  }

  const prevMember = () => setActiveIdx((prev) => (prev - 1 + team.length) % team.length)
  const nextMember = () => setActiveIdx((prev) => (prev + 1) % team.length)

  return (
    <section
      ref={root}
      id={id}
      className="relative overflow-hidden bg-[#FAF6EE]/92 py-20 md:py-28 border-t border-b border-accent/25"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Soft Golden Ambient Glow */}
      <div
        className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-accent/15 blur-3xl opacity-60"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 right-10 h-96 w-96 rounded-full bg-accent/10 blur-3xl opacity-50"
        aria-hidden="true"
      />

      <div className="wrap relative z-10" data-team-showcase>
        {/* Section Heading */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end border-b border-ink/10 pb-8">
          <div>
            <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              <span className="h-[1.5px] w-6 bg-accent" />
              <span>THE ATELIER MAKERS</span>
            </div>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-ink">
              The hands behind <span className="italic text-accent font-serif">your clothes</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm md:text-base leading-relaxed text-muted">
              Meet our master cutters, embroidery karigars, and lead designers who bring your bridal and festive visions to life.
            </p>
          </div>

          <div className="flex items-center gap-2 md:pb-1 text-xs font-mono uppercase tracking-widest text-muted">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-white/70 px-3.5 py-1 text-primary-ink shadow-2xs backdrop-blur-xs">
              <IconSparkles size={13} className="text-accent" />
              {activeIdx + 1} of {team.length} Artisans
            </span>
          </div>
        </div>

        {/* 2-Column Split: Content & Selector on Left, Photo on Right */}
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14 items-center">
          {/* Left Column: Interactive Selector + Active Employee Content */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {/* Employee Selector Strip / Tabs */}
            <div className="flex flex-wrap gap-2.5 pb-6 border-b border-ink/10">
              {team.map((person, idx) => {
                const isActive = idx === activeIdx
                return (
                  <button
                    key={person.name}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    className={`relative flex items-center gap-2.5 rounded-sm px-3.5 py-2 text-left transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-white shadow-sm border border-accent text-ink scale-102 ring-1 ring-accent/30'
                        : 'bg-white/40 border border-ink/10 text-muted hover:bg-white/80 hover:text-ink'
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-serif font-bold transition-colors ${
                        isActive ? 'bg-accent text-on-accent' : 'bg-ink/5 text-muted'
                      }`}
                    >
                      {person.name.charAt(0).toUpperCase()}
                    </span>
                    <span className="text-xs font-medium tracking-wide">{person.name}</span>

                    {/* Progress indicator for active item */}
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-0 h-[2px] w-full bg-accent rounded-full animate-[pulse_2s_ease-in-out_infinite]"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Active Employee Highlighted Card */}
            <div className="mt-8 transition-all duration-500 ease-out">
              <div className="flex flex-wrap items-baseline gap-3">
                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-ink">
                  {currentPerson.name}
                </h3>
                {currentPerson.years && (
                  <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-primary-ink border border-accent/25">
                    {currentPerson.years} {currentPerson.years === 1 ? 'year' : 'years'} with us
                  </span>
                )}
              </div>

              <p className="mt-1.5 text-sm font-semibold tracking-wide text-primary-ink">
                {currentPerson.role}
              </p>

              {currentPerson.specialty && (
                <div className="mt-3 inline-flex items-center gap-2 rounded-sm bg-white/80 px-3.5 py-1.5 text-xs font-medium text-ink border border-accent/20 shadow-2xs">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold">
                    BUILDS:
                  </span>
                  <span>{currentPerson.specialty}</span>
                </div>
              )}

              {/* Craft Line / Summary */}
              {currentPerson.line && (
                <p className="mt-5 text-base md:text-lg leading-relaxed text-ink/90 font-serif italic">
                  "{currentPerson.line}"
                </p>
              )}

              {/* How They Work Box */}
              {currentPerson.howTheyWork && (
                <div className="mt-6 rounded-sm border border-accent/20 bg-white/85 p-5 shadow-xs backdrop-blur-xs">
                  <div className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                    <span
                      className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    <div>
                      <strong className="font-semibold text-ink">How they work: </strong>
                      <span>{currentPerson.howTheyWork}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* WhatsApp Action & Manual Arrows */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-6">
                <a
                  href={whatsappLink(
                    boutique,
                    `Hi ${boutique.brand.name}, I would like to consult with ${currentPerson.name} regarding custom stitching.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-on-primary transition-all duration-200 hover:bg-primary-ink hover:scale-102 shadow-xs"
                >
                  <IconBrandWhatsapp size={16} />
                  <span>Consult with {currentPerson.name}</span>
                </a>

                {/* Prev / Next controls */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevMember}
                    aria-label="Previous employee"
                    className="flex h-9 w-9 items-center justify-center rounded-sm border border-ink/15 bg-white/70 text-ink transition-all hover:bg-white hover:border-accent hover:text-accent cursor-pointer"
                  >
                    <IconArrowLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={nextMember}
                    aria-label="Next employee"
                    className="flex h-9 w-9 items-center justify-center rounded-sm border border-ink/15 bg-white/70 text-ink transition-all hover:bg-white hover:border-accent hover:text-accent cursor-pointer"
                  >
                    <IconArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Large Couture Photograph with Smooth Transition */}
          <div className="lg:col-span-5">
            <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-white/60 border border-accent/30 shadow-xl transition-all duration-500 hover:scale-102 hover:shadow-2xl">
              {/* Photo */}
              <div className="relative h-full w-full overflow-hidden">
                <Media
                  key={currentPerson.name}
                  file={getPersonPhoto(currentPerson, activeIdx)}
                  alt={currentPerson.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 animate-[fadeIn_0.5s_ease-out]"
                />
              </div>

              {/* Top Floating Badge */}
              <div className="absolute top-4 left-4 z-10 rounded-sm bg-black/75 px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-accent border border-white/15 backdrop-blur-md">
                In-House Atelier Artisan
              </div>

              {/* Bottom Floating Glassmorphic Pill */}
              <div className="absolute bottom-4 inset-x-4 z-10 rounded-sm bg-black/80 p-3.5 backdrop-blur-md border border-white/15 text-white flex items-center justify-between">
                <div>
                  <p className="font-serif text-lg font-medium tracking-wide text-white">
                    {currentPerson.name}
                  </p>
                  <p className="text-xs text-accent tracking-wider font-mono">
                    {currentPerson.role}
                  </p>
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-accent font-mono text-xs">
                  {activeIdx + 1}/{team.length}
                </div>
              </div>

              {/* Subtle 4.5-Second Rotation Bar at Bottom of Photo */}
              <div className="absolute bottom-0 inset-x-0 h-1 bg-white/20 z-20 overflow-hidden">
                <div
                  key={activeIdx}
                  className="h-full bg-accent transition-all duration-[4500ms] ease-linear w-full animate-[progress_4.5s_linear]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
