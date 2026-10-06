// src/designs/couture/Design.tsx
// "Couture": High-luxury bespoke tailoring & bridal atelier.
// Combines an animated golden sewing thread & needle progress navigation,
// a gold-framed temple arch opener with magnetic CTA, full bridal suite,
// interactive blouse customizer, and an architectural arch footer.

import { FONTS } from '../../theme/fonts'
import {
  ArchBridal,
  ArchesFaq,
  ArchFooter,
  BandOffer,
  BandTrust,
  BuilderBlouse,
  CardWedding,
  ColumnServices,
  CornerKids,
  FloatingWhatsApp,
  FramedHero,
  HandsTeam,
  InkStory,
  NeedsSaree,
  NecksBlouse,
  PageHeader,
  PairsAlterations,
  RailGallery,
  RateAlterations,
  RatingReviews,
  SiteShell,
  StickyProcess,
  StitchLine,
  StoreVisit,
  TextureHandwork,
  ThreadNav,
  WhatsAppForm,
  ZariHandwork,
  type IPage,
} from '../../sections'

export const fonts = FONTS.cormorantJost

const pages: IPage[] = [
  {
    path: '',
    label: 'Home',
    element: (
      <>
        <FramedHero />
        <BandTrust />
        <BandOffer />
        <RailGallery />
        <StitchLine>
          <ArchBridal />
          <CardWedding />
          <BuilderBlouse />
          <NecksBlouse />
          <TextureHandwork />
          <ZariHandwork />
          <ColumnServices />
          <NeedsSaree />
          <CornerKids />
          <PairsAlterations />
          <RateAlterations />
          <StickyProcess />
          <RatingReviews />
          <ArchesFaq />
          <StoreVisit />
        </StitchLine>
      </>
    ),
  },
  {
    path: 'about',
    label: 'About us',
    intro: 'Who we are, who stitches your clothes, and how a piece is made.',
    element: (
      <StitchLine>
        <PageHeader />
        <InkStory />
        <HandsTeam />
        <StickyProcess />
        <StoreVisit />
      </StitchLine>
    ),
  },
  {
    path: 'contact',
    label: 'Contact us',
    intro: 'Visit our studio in Kengeri or send us your measurements and designs on WhatsApp.',
    element: (
      <>
        <PageHeader />
        <WhatsAppForm />
        <StoreVisit />
        <ArchesFaq />
      </>
    ),
  },
]

export default function Design() {
  return (
    <>
      <SiteShell nav={ThreadNav} footer={ArchFooter} pages={pages} />
      <FloatingWhatsApp />
    </>
  )
}
