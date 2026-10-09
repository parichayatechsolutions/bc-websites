// src/sections/tracker/ProgressBarTracker.tsx
// Trial & delivery tracker - Progress bar (Variant A from Boutique Component Lab)
// A bar with eight stage icons, the current step card below with interactive demo stepper
// and WhatsApp enquiry link to check a real bill number or order status.

import { useState } from 'react'
import {
  IconArrowLeft,
  IconArrowRight,
  IconBrandWhatsapp,
  IconCheck,
  IconHanger,
  IconPackage,
  IconRulerMeasure,
  IconScissors,
  IconShirt,
  IconShoppingBag,
  IconSparkles,
} from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'

const STAGES = [
  {
    name: 'Fabric Arrived',
    icon: IconPackage,
    detail: 'Your fabric and reference blouses have been cataloged in our workroom.',
    time: 'Day 1',
  },
  {
    name: 'Pattern & Cutting',
    icon: IconScissors,
    detail: 'Master tailor draft, neckline measurement checks, and custom pattern cut.',
    time: 'Day 2',
  },
  {
    name: 'Aari & Handwork',
    icon: IconSparkles,
    detail: 'Artisans working on the wooden adda frame: zari thread, zardosi, and beadwork.',
    time: 'Days 3–4',
  },
  {
    name: 'Machine Stitching',
    icon: IconShirt,
    detail: 'Tailoring the bodice, darts, sleeve joints, and comfort seam allowances.',
    time: 'Day 5',
  },
  {
    name: 'Finishing & Lining',
    icon: IconHanger,
    detail: 'Premium cotton lining stitched, contrast piping applied, dori & latkans set.',
    time: 'Day 6',
  },
  {
    name: 'Trial Fitting',
    icon: IconRulerMeasure,
    detail: 'Garment prepped on the mannequin for your scheduled first-trial fitting.',
    time: 'Day 6–7',
  },
  {
    name: 'Final Touches',
    icon: IconSparkles,
    detail: 'Fine adjustments completed, hooks reinforced, and professional steam press.',
    time: 'Day 7',
  },
  {
    name: 'Ready for Pickup',
    icon: IconShoppingBag,
    detail: 'Packaged in a boutique garment bag, awaiting your collection or dispatch.',
    time: 'Delivered',
  },
]

export default function ProgressBarTracker() {
  const { boutique } = useBoutique()
  const [currentStage, setCurrentStage] = useState(5) // default: Trial fitting
  const [orderQuery, setOrderQuery] = useState('')

  const stage = STAGES[currentStage]
  const progressPercent = Math.round(((currentStage + 1) / STAGES.length) * 100)

  const askHref = whatsappLink(
    boutique,
    `Hi ${boutique.brand.name}, I would like to check the status of my order${orderQuery ? ` #${orderQuery}` : ''}.`,
  )

  const prev = () => setCurrentStage((c) => Math.max(0, c - 1))
  const next = () => setCurrentStage((c) => Math.min(STAGES.length - 1, c + 1))

  return (
    <section id="tracker" className="section relative border-t border-ink/10">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-ink/10 pb-6">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-primary-ink">
              Order Lifecycle · Real-Time Fitting Tracker
            </p>
            <h2 className="t-1 mt-2 text-balance">
              Where is <span className="font-serif italic text-primary-ink">my order?</span>
            </h2>
            <p className="mt-2 text-muted text-base">
              Track the exact craftsmanship stage from fabric cutting to trial fitting and final delivery.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">Order ID:</span>
            <input
              type="text"
              placeholder="e.g. SH-408"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              className="w-36 rounded-lg border border-ink/20 bg-paper px-3 py-1.5 text-sm font-medium text-ink focus:border-primary-ink focus:outline-none"
            />
          </div>
        </div>

        {/* Progress Bar Track */}
        <div className="mt-10">
          <div className="relative h-2.5 w-full rounded-full bg-ink/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary-ink via-accent to-primary transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* 8-Stage Icons Row */}
          <div className="mt-6 grid grid-cols-4 gap-3 sm:grid-cols-8">
            {STAGES.map((s, idx) => {
              const Icon = s.icon
              const isPast = idx < currentStage
              const isCurrent = idx === currentStage
              return (
                <button
                  key={s.name}
                  type="button"
                  onClick={() => setCurrentStage(idx)}
                  className={`group flex flex-col items-center text-center cursor-pointer transition-all duration-200 ${
                    isCurrent ? 'scale-105' : 'opacity-80 hover:opacity-100'
                  }`}
                >
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-full border transition-colors ${
                      isCurrent
                        ? 'border-accent bg-accent text-dark ring-4 ring-accent/20'
                        : isPast
                          ? 'border-primary-ink bg-primary-ink text-on-primary-ink'
                          : 'border-ink/20 bg-paper text-muted'
                    }`}
                  >
                    {isPast ? <IconCheck size={18} stroke={2.5} /> : <Icon size={18} stroke={1.75} />}
                  </span>
                  <span
                    className={`mt-2 block text-xs font-medium leading-tight line-clamp-2 ${
                      isCurrent ? 'font-bold text-ink' : 'text-muted'
                    }`}
                  >
                    {s.name}
                  </span>
                  <span className="mt-0.5 text-[11px] text-muted/80">{s.time}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Current Active Stage Spotlight Card */}
        <div className="mt-10 rounded-2xl border border-ink/15 bg-paper p-6 md:p-8 flex flex-wrap items-center justify-between gap-6 shadow-sm">
          <div className="max-w-xl">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary-ink">
                Stage {currentStage + 1} of {STAGES.length}
              </span>
              <span className="text-xs text-muted">Estimated time: {stage.time}</span>
            </div>
            <h3 className="t-2 mt-3 text-ink">{stage.name}</h3>
            <p className="mt-2 text-muted text-base leading-relaxed">{stage.detail}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                disabled={currentStage === 0}
                aria-label="Previous stage"
                className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 bg-light/80 text-ink transition-colors hover:bg-ink hover:text-light disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <IconArrowLeft size={18} />
              </button>
              <button
                type="button"
                onClick={next}
                disabled={currentStage === STAGES.length - 1}
                aria-label="Next stage"
                className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 bg-light/80 text-ink transition-colors hover:bg-ink hover:text-light disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <IconArrowRight size={18} />
              </button>
            </div>

            <a
              href={askHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary-ink px-6 py-3 font-semibold text-on-primary-ink shadow-sm transition-transform hover:scale-105 active:scale-95"
            >
              <IconBrandWhatsapp size={19} />
              <span>Ask about order on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
