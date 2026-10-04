// src/sections/saree/TimesSaree.tsx
// How long saree work takes: each saree job they do (fall and pico,
// pre-pleating, kuchu…) in a ruled row with an icon and its usual time;
// each row asks about that job. (Lab: saree B, "How long it takes", with
// the time as plain text: the row is the tappable thing.)
//
// From the saree rows of `workTimes` (data sheet 6j), quickest first;
// needs two. No motion.

import { IconBrandWhatsapp, IconHanger, IconNeedle, IconNeedleThread, IconWaveSine, type Icon } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { midSentence, usually } from '../../app/text'

const SAREE = /saree|sari|fall|pico|pleat|drap|kuchu|tassel|petticoat/i

const iconFor = (item: string): Icon =>
  /pleat/i.test(item) ? IconWaveSine : /drap|petticoat/i.test(item) ? IconHanger : /kuchu|tassel/i.test(item) ? IconNeedleThread : IconNeedle

export default function TimesSaree() {
  const { boutique } = useBoutique()
  const jobs = (boutique.workTimes ?? []).filter((w) => SAREE.test(w.item)).sort((a, b) => a.days - b.days)
  if (jobs.length < 2) return null

  return (
    <section id="saree-times" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[14ch] text-balance">How long saree work takes</h2>
        <ul className="mt-10 border-t-2 border-ink">
          {jobs.map(({ item, days }) => {
            const Glyph = iconFor(item)
            return (
              <li key={item} className="border-b border-ink/15">
                <a
                  href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like ${midSentence(item)} done for my saree.`)}
                  target="_blank"
                  rel="noopener"
                  className="group grid min-h-16 grid-cols-[2.75rem_minmax(0,1fr)_auto] items-center gap-4 py-4"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-paper text-primary-ink" aria-hidden="true">
                    <Glyph size={20} stroke={1.75} />
                  </span>
                  <span className="t-3 min-w-0 break-words decoration-1 underline-offset-4 group-hover:underline">{item}</span>
                  <span className="t-small flex items-center gap-2 font-semibold whitespace-nowrap">
                    {usually(days)}
                    <IconBrandWhatsapp size={18} stroke={1.75} className="text-primary-ink" aria-hidden="true" />
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
        <p className="t-small mt-4 text-muted">Usual times. Busy seasons can take longer, so message us first.</p>
      </div>
    </section>
  )
}
