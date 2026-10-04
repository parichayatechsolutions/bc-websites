// src/sections/blouse/StepsBlouse.tsx
// Design a blouse one question at a time: neck, then back, then sleeves,
// then a summary to send, with a progress bar and the drawing updating as
// she goes. Calmer than seeing every choice at once.
// (Lab: blouse B, "Four steps".)
//
// Shows only for a boutique that stitches blouses. The drawing redraws with
// a CSS transition; no scroll motion.

import { useState } from 'react'
import { IconArrowLeft, IconArrowRight, IconBrandWhatsapp } from '@tabler/icons-react'
import Button from '../../components/Button'
import { BACKS, BlouseFlat, describe, NECKS, SLEEVES, type IOption } from './blouseDrawing'
import { Choices, useBlouse } from './blouseShared'

const QUESTIONS: { label: string; ask: string; options: IOption[] }[] = [
  { label: 'Neck', ask: 'Which neck would you like?', options: NECKS },
  { label: 'Back', ask: 'And for the back?', options: BACKS },
  { label: 'Sleeves', ask: 'What kind of sleeves?', options: SLEEVES },
]

export default function StepsBlouse() {
  const { stitchesBlouses, priceLine, send } = useBlouse()
  const [step, setStep] = useState(0)
  const [picks, setPicks] = useState(['round', 'u', 'elbow'])
  if (!stitchesBlouses) return null

  const [neck, back, sleeve] = picks
  const done = step === QUESTIONS.length
  const total = QUESTIONS.length + 1
  const pick = (id: string) => setPicks(picks.map((p, i) => (i === step ? id : p)))
  const summary = describe(neck, back, sleeve)

  return (
    <section id="blouse" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-6">
          <h2 className="t-1 max-w-[12ch] text-balance">Design your blouse</h2>
          <div className="mt-8 h-1.5 bg-ink/10" role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={step + 1} aria-label="Step">
            <div className="h-full bg-primary-ink transition-[width] duration-300 ease-stitch" style={{ width: `${((step + 1) / total) * 100}%` }} />
          </div>
          <p className="t-small mt-3 text-muted">
            Step {step + 1} of {total}
          </p>

          <div className="mt-8 min-h-48" aria-live="polite">
            {done ? (
              <>
                <h3 className="t-3">Your design</h3>
                <p className="t-lead mt-3">{summary.charAt(0).toUpperCase() + summary.slice(1)}.</p>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Button href={send(neck, back, sleeve)} variant="primary" icon={IconBrandWhatsapp}>
                    Send this design
                  </Button>
                  {priceLine && <p className="t-small text-muted">{priceLine}</p>}
                </div>
              </>
            ) : (
              <>
                <h3 className="t-3">{QUESTIONS[step].ask}</h3>
                <div className="mt-5">
                  <Choices label={QUESTIONS[step].label} options={QUESTIONS[step].options} value={picks[step]} onChange={pick} />
                </div>
              </>
            )}
          </div>

          <div className="mt-8 flex gap-3">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full border border-ink/30 px-6 font-semibold transition-[border-color,scale] duration-200 ease-stitch hover:border-ink active:scale-[0.97]"
              >
                <IconArrowLeft size={18} stroke={1.75} aria-hidden="true" />
                Back
              </button>
            )}
            {!done && (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full bg-primary-ink px-6 font-semibold text-on-primary-ink transition-[background-color,scale] duration-200 ease-stitch hover:bg-[color-mix(in_oklab,var(--c-primary-ink)_85%,black)] active:scale-[0.97]"
              >
                Next
                <IconArrowRight size={18} stroke={1.75} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 self-start bg-paper p-5 md:col-span-6 md:p-8">
          {[false, true].map((isBack) => (
            <figure key={String(isBack)}>
              <div className="aspect-[5/4]">
                <BlouseFlat neck={isBack ? back : neck} sleeve={sleeve} back={isBack} />
              </div>
              <figcaption className="t-small mt-2 text-center text-muted">{isBack ? 'Back' : 'Front'}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
