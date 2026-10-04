// src/designs/journal/Design.tsx
// "Journal": a light, photo-led magazine. Three prints of their work laid
// on the page beside the name, the facts as a newspaper box, the work in
// spreads by kind, a dark cover for the lookbook, and their style notes as
// the front page of an issue. For a boutique with good photographs and
// something to say.
//
// Signature motion: the prints settling from a small swing in the opener.
// Nothing pins; the rest is still or arrives once.

import { FONTS } from '../../theme/fonts'
import {
  ChaptersStory,
  ClassifiedVisit,
  ColumnFaq,
  ContributorsTeam,
  CoverLookbook,
  GoogleReviews,
  GridProcess,
  LeadPosts,
  NudgeWhatsApp,
  PageHeader,
  PaperTrust,
  PreviewContact,
  PrintsHero,
  SignatureFooter,
  SiteShell,
  SplitNav,
  SpreadGallery,
  StepsContact,
  type IPage,
} from '../../sections'

export const fonts = FONTS.gloockFigtree

const pages: IPage[] = [
  {
    path: '',
    label: 'Home',
    element: (
      <>
        <PrintsHero />
        <PaperTrust />
        <SpreadGallery />
        <CoverLookbook />
        <GoogleReviews />
        <LeadPosts />
        <StepsContact />
      </>
    ),
  },
  {
    path: 'about',
    label: 'About us',
    intro: 'Our story in chapters, the people behind the work, and how a piece is made.',
    element: (
      <>
        <PageHeader />
        <ChaptersStory />
        <ContributorsTeam />
        <GridProcess />
      </>
    ),
  },
  {
    path: 'contact',
    label: 'Contact us',
    intro: 'Write to us on WhatsApp and see the message before you send it, or find us at the store.',
    element: (
      <>
        <PageHeader />
        <PreviewContact />
        <ClassifiedVisit />
        <ColumnFaq />
      </>
    ),
  },
]

export default function Design() {
  return (
    <>
      <SiteShell nav={SplitNav} footer={SignatureFooter} pages={pages} />
      <NudgeWhatsApp />
    </>
  )
}
