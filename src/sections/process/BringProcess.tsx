// src/sections/process/BringProcess.tsx
// The making steps as a tick-list beside a card of what to bring to the
// first fitting: the fabric, a photo of the design, a blouse that fits,
// the saree it goes with, the date. Practical for a first visit.
// (Lab: process M, "Checklist + bring".)
//
// Built-in copy from steps.ts and general advice that holds for any
// tailor. The ticks are marks, not controls. No motion.

import { IconBrandWhatsapp, IconCircleCheck } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { STEPS } from './steps'

const BRING = [
  'Your fabric, if you have it',
  'A photo of the design you like',
  'A blouse that fits you well',
  'The saree or dupatta it goes with',
  'The date of your function',
]

export default function BringProcess() {
  const { boutique } = useBoutique()

  return (
    <section id="process" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <h2 className="t-1 max-w-[14ch] text-balance">How it goes</h2>
          <ol className="mt-10 space-y-5">
            {STEPS.map(({ title, short }, i) => (
              <li key={title} className="flex gap-4">
                <IconCircleCheck size={26} stroke={1.5} className="mt-0.5 shrink-0 text-primary-ink" aria-hidden="true" />
                <span>
                  <span className="t-3 block">
                    <span className="sr-only">Step {i + 1}: </span>
                    {title}
                  </span>
                  <span className="text-muted">{short}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className="md:col-span-5 md:pt-20">
          <div className="rounded-2xl bg-paper p-7 md:p-8">
            <h3 className="t-3">What to bring</h3>
            <ul className="mt-5 space-y-3">
              {BRING.map((line) => (
                <li key={line} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-thread" />
                  {line}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to book my first fitting.`)} variant="primary" icon={IconBrandWhatsapp}>
                Book a fitting
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
