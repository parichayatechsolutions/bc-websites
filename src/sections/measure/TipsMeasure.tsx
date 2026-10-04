// src/sections/measure/TipsMeasure.tsx
// Before you measure: what you need, and five tips for getting the numbers
// right, then a button to send them. Short and practical.
// (Lab: measure J, "Before you measure".)
//
// General guidance about measuring, true for any tailor. Shows only for a
// boutique that stitches blouses. No motion.

import { IconBrandWhatsapp, IconRulerMeasure, IconShirt, IconUsers } from '@tabler/icons-react'
import Button from '../../components/Button'
import { useBlouse } from '../blouse/blouseShared'
import { useSendMeasurements } from './measureShared'

const NEED = [
  { icon: IconRulerMeasure, text: 'A soft measuring tape' },
  { icon: IconShirt, text: 'A thin, well-fitting blouse or the inner you’ll wear' },
  { icon: IconUsers, text: 'Someone to help with the back and shoulders' },
]
const TIPS = [
  'Keep the tape level all the way round, especially across the back.',
  'Snug, not tight: one finger should slide under the tape.',
  'Stand straight and breathe normally; don’t hold your breath.',
  'Write each number down as you go, with inches or centimetres.',
  'Not sure about one? Leave it blank and ask us.',
]

export default function TipsMeasure() {
  const { stitchesBlouses } = useBlouse()
  const send = useSendMeasurements()
  if (!stitchesBlouses) return null

  return (
    <section id="measure-tips" className="section bg-paper">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">Before you measure</h2>
          <ul className="mt-8 space-y-4">
            {NEED.map(({ icon: NeedIcon, text }) => (
              <li key={text} className="flex gap-3">
                <NeedIcon size={24} stroke={1.5} className="mt-0.5 shrink-0 text-primary-ink" aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-7">
          <ol className="space-y-5">
            {TIPS.map((tip, i) => (
              <li key={tip} className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-ink/15 pt-5">
                <span className="t-2 text-thread" aria-hidden="true">
                  {i + 1}
                </span>
                <p className="t-lead">{tip}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <Button href={send()} variant="primary" icon={IconBrandWhatsapp}>
              Send my measurements
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
