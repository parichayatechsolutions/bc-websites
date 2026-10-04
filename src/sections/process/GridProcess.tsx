// src/sections/process/GridProcess.tsx
// The making steps in a grid: each with a large thread-coloured number,
// its icon, its name and a line. Plain and quick to read.
// (Lab: process A, "Numbered grid".)
//
// Numbered because the steps are a real sequence; built-in copy from
// steps.ts. Always shown. No motion.

import { STEPS } from './steps'

export default function GridProcess() {
  return (
    <section id="process" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[14ch] text-balance">How we make it</h2>
        <ol className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map(({ title, body, icon: Icon }, i) => (
            <li key={title} className="border-t border-ink/15 pt-6">
              <div className="flex items-start justify-between gap-4">
                <span className="font-display text-6xl leading-none tabular-nums text-thread" aria-hidden="true">
                  {i + 1}
                </span>
                <Icon size={28} stroke={1.5} className="text-primary-ink" aria-hidden="true" />
              </div>
              <h3 className="t-3 mt-5">
                <span className="sr-only">{i + 1}. </span>
                {title}
              </h3>
              <p className="mt-2 text-muted">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
