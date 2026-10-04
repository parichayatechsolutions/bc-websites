// src/sections/process/PatternProcess.tsx
// The making steps as paper pattern pieces laid on a cutting mat: each a
// dashed outline with its number, icon and line, set at small angles on a
// gridded ground. (Lab: process L, "Pattern sheet".)
//
// Numbered because the steps are a real sequence; built-in copy from
// steps.ts. Always shown. On a phone the pieces stack, still turned a
// little. No motion.

import { STEPS } from './steps'

const TURNS = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', '-rotate-1']

export default function PatternProcess() {
  return (
    <section id="process" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[14ch] text-balance">From cloth to fitting</h2>
        <div
          className="mt-12 bg-paper p-5 md:p-10"
          style={{
            backgroundImage:
              'linear-gradient(color-mix(in oklab, var(--c-ink) 8%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--c-ink) 8%, transparent) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        >
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {STEPS.map(({ title, short, icon: Icon }, i) => (
              <li key={title} className={`border-2 border-dashed border-primary-ink/60 bg-light p-6 ${TURNS[i % TURNS.length]}`}>
                <div className="flex items-center justify-between gap-4">
                  <span className="t-2 text-thread">{i + 1}</span>
                  <Icon size={26} stroke={1.5} className="text-primary-ink" aria-hidden="true" />
                </div>
                <h3 className="t-3 mt-4">{title}</h3>
                <p className="mt-2 text-muted">{short}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
