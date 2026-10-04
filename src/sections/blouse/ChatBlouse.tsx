// src/sections/blouse/ChatBlouse.tsx
// Design a blouse as a chat: the boutique asks about the neck, the back
// and the sleeves in turn, she answers with quick-reply chips, and at the
// end the drawing of her blouse appears with a button to send it.
// (Lab: blouse G, "Chat".)
//
// A drawing of a chat, scripted, not a live one: no typing dots or online
// status. Shows only for a boutique that stitches blouses. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp, IconRefresh } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Logo from '../../components/Logo'
import { BACKS, BlouseFlat, NECKS, SLEEVES } from './blouseDrawing'
import { useBlouse } from './blouseShared'

const QUESTIONS = [
  { ask: 'Which neckline would you like at the front?', options: NECKS },
  { ask: 'And the back?', options: BACKS },
  { ask: 'Last one: what kind of sleeves?', options: SLEEVES },
]

export default function ChatBlouse() {
  const { boutique } = useBoutique()
  const { stitchesBlouses, send } = useBlouse()
  const [answers, setAnswers] = useState<string[]>([])
  if (!stitchesBlouses) return null
  const done = answers.length === QUESTIONS.length
  const current = QUESTIONS[answers.length]

  return (
    <section id="blouse" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-4">
          <h2 className="t-1 max-w-[10ch] text-balance">Design it in a chat</h2>
          <p className="mt-4 text-muted">Three quick questions.</p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-ink/15 md:col-span-8">
          <div className="flex items-center gap-3 bg-primary-ink px-5 py-4 text-on-primary-ink">
            <Logo className="h-10 w-10 shrink-0 rounded-full bg-light" />
            <p className="min-w-0 truncate font-semibold">{boutique.brand.name}</p>
          </div>
          <div className="space-y-3 bg-paper p-5 md:p-8" aria-live="polite">
            {QUESTIONS.slice(0, answers.length + 1).map((q, i) => (
              <div key={q.ask} className="space-y-3">
                <p className="max-w-[80%] rounded-2xl rounded-tl-sm bg-light px-4 py-3">{q.ask}</p>
                {answers[i] && (
                  <p className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-tr-sm bg-primary-ink px-4 py-3 text-on-primary-ink">
                    {q.options.find((o) => o.id === answers[i])?.name}
                  </p>
                )}
              </div>
            ))}
            {done && (
              <div className="space-y-3">
                <div className="grid max-w-md grid-cols-2 gap-3 rounded-2xl rounded-tl-sm bg-light p-4">
                  <div className="aspect-[5/4]">
                    <BlouseFlat neck={answers[0]} sleeve={answers[2]} />
                  </div>
                  <div className="aspect-[5/4]">
                    <BlouseFlat neck={answers[1]} sleeve={answers[2]} back />
                  </div>
                </div>
                <p className="max-w-[80%] rounded-2xl rounded-tl-sm bg-light px-4 py-3">Here’s your blouse. Send it and we can talk it through.</p>
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2 border-t border-ink/10 bg-light p-4">
            {!done &&
              current.options.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setAnswers([...answers, o.id])}
                  className="min-h-11 cursor-pointer rounded-full border border-primary-ink px-4 font-semibold text-primary-ink transition-[background-color,color] duration-200 ease-stitch hover:bg-primary-ink hover:text-on-primary-ink"
                >
                  {o.name}
                </button>
              ))}
            {done && (
              <>
                <Button href={send(answers[0], answers[1], answers[2])} variant="primary" icon={IconBrandWhatsapp}>
                  Send on WhatsApp
                </Button>
                <button
                  type="button"
                  onClick={() => setAnswers([])}
                  className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-4 font-semibold hover:bg-ink/5"
                >
                  <IconRefresh size={18} stroke={1.75} aria-hidden="true" />
                  Start again
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
