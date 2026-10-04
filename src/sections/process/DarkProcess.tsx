// src/sections/process/DarkProcess.tsx
// Dark, the making steps on a ruled grid of fine lines, each cell with a
// gold numeral, the step's name and its line. For the darker designs.
// (Lab: process D, "Dark grid".)
//
// Numbered because the steps are a real sequence; built-in copy from
// steps.ts. Always shown. No motion.

import { STEPS } from './steps'

export default function DarkProcess() {
  return (
    <section id="process" className="section bg-dark text-light">
      <div className="wrap">
        <h2 className="t-1 max-w-[14ch] text-balance">How we make it</h2>
        <ol className="mt-12 grid border-t border-l border-light/15 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map(({ title, short }, i) => (
            <li key={title} className="border-r border-b border-light/15 p-7 md:p-9">
              <span aria-hidden="true" className="block font-display text-5xl leading-none tabular-nums text-accent-on-dark">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="t-3 mt-6">
                <span className="sr-only">{i + 1}. </span>
                {title}
              </h3>
              <p className="mt-2 text-light/75">{short}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
