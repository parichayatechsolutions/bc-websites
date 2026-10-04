// src/sections/faq/ArchFaq.tsx
// Questions that open, beside a tall arched photograph of their work, so
// the page answers and shows at once. The arch family's FAQ.
// (Lab: faq U, "Arch photo".)
//
// Their own questions first, then answers from their data (faqShared);
// hides with fewer than three. The photo is their first work photo and
// drops away without one. Answers open with a CSS height transition.

import { useBoutique } from '../../app/BoutiqueContext'
import Media from '../../components/Media'
import { Accordion, AskOnWhatsApp, faqItems } from './faqShared'

export default function ArchFaq() {
  const { boutique } = useBoutique()
  const questions = faqItems(boutique)
  const photo = boutique.media.work[0]
  if (questions.length < 3) return null

  return (
    <section id="questions" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        {photo && (
          <div className="md:col-span-5">
            <div className="arch aspect-[3/4] max-w-md bg-paper md:sticky md:top-24">
              <Media file={photo} alt="" />
            </div>
          </div>
        )}
        <div className={photo ? 'md:col-span-7' : 'md:col-span-9'}>
          <h2 className="t-1 max-w-[12ch] text-balance">Questions, answered</h2>
          <div className="mt-10">
            <Accordion questions={questions} />
          </div>
          <AskOnWhatsApp />
        </div>
      </div>
    </section>
  )
}
