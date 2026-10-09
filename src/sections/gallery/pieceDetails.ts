// src/sections/gallery/pieceDetails.ts
// Detailed craft, silhouette, fabric, and styling metadata for boutique work photos.
// Enables rich dynamic information per piece in FeatureGallery and lookbooks.

import type { BoutiqueConfig, PhotoFile } from '../../types/boutique'
import { photoCategory } from '../../app/photos'

export interface PieceDetail {
  title: string
  category: string
  timeline: string
  description: string
  handwork: string
  silhouette: string
  occasion: string
  fabric: string
  tags: string[]
}

/** Curated piece catalog for Lavish Boutique (1-lavishboutique) photos */
const LAVISH_PIECES: Record<string, PieceDetail> = {
  'work-bridal-01.jpg': {
    title: 'Royal Muhurtham Maggam Bridal Blouse',
    category: 'Bridal Masterpiece',
    timeline: '7–10 Days · 2 Fitting Trials',
    description:
      'Handcrafted in crimson vermilion pure Kanchipuram silk, adorned with dense gold aari and maggam needlework. Features ornate sacred temple motifs along the elbow-length sleeves, delicate antique zari border edging, and handcrafted dori tassels.',
    handwork: 'Heavy Aari & Maggam with antique zari, kundan stones, and bead piping',
    silhouette: 'Structured sweetheart neckline with deep back cut and padded bust support',
    occasion: 'Muhurtham wedding ceremony, varmala, and reception rituals',
    fabric: 'Pure Kanchipuram silk with breathable sweat-shield cotton voile lining',
    tags: ['Aari & Maggam', 'Temple Motifs', 'Padded Fit', 'Pure Silk'],
  },
  'work-blouse-01.jpg': {
    title: 'Royal Purple Peacock Zari Designer Blouse',
    category: 'Designer Blouse',
    timeline: '5–7 Days · 1 Fitting Trial',
    description:
      'Deep royal purple silk blouse showcasing majestic peacock (mayil) motifs in raised gold zari embroidery. Designed with a structured square cutout back, contrast gold piping, and statement handmade latkans.',
    handwork: 'Gold zari threadwork, micro-sequin accents, and raised peacock motif embroidery',
    silhouette: 'Square open back with contrast piping and contoured princess seam fit',
    occasion: 'Sangeet ceremony, engagement, and grand family celebrations',
    fabric: 'Raw silk / pure mulberry silk with reinforced edge seams',
    tags: ['Peacock Motifs', 'Square Cut Back', 'Princess Seam', 'Custom Latkans'],
  },
  'work-blouse-02.jpg': {
    title: 'Rani Pink Scallop Cutwork Designer Blouse',
    category: 'Designer Blouse',
    timeline: '5–7 Days · 1 Fitting Trial',
    description:
      'Vibrant rani pink raw silk blouse tailored with handcrafted scallop cutwork along the neckline and sleeve cuffs. Encrusted with fine seed pearls and antique gold threadwork for an opulent festive look.',
    handwork: 'Scalloped cutwork, pearl bead encrusting, and fine aari needlework',
    silhouette: 'Padded princess cut with sweetheart front and cutwork sleeve borders',
    occasion: 'Mehendi, engagement rituals, and festive saree celebrations',
    fabric: 'Premium raw silk with double-stitched comfort inner lining',
    tags: ['Cutwork Scallop', 'Pearl Detailing', 'Rani Pink', 'Padded Bust'],
  },
  'work-blouse-03.jpg': {
    title: 'Emerald Green Classic Zari Border Blouse',
    category: 'Heritage Blouse',
    timeline: '4–6 Days · 1 Fitting Trial',
    description:
      'Timeless emerald bottle green silk blouse tailored with clean contrast peach piping and rich gold zari sleeve cuff borders. Cut for supreme armhole comfort and a flawless contour with traditional sarees.',
    handwork: 'Hand-stitched zari cuff borders with delicate contrast piping finish',
    silhouette: 'Classic round front and back neckline with seamless concealed side zip or hooks',
    occasion: 'Temple pujas, housewarming, family functions, and festive wear',
    fabric: 'Mysore soft silk with pre-shrunk breathable cotton lining',
    tags: ['Contrast Piping', 'Zari Cuffs', 'Classic Contour', 'Comfort Fit'],
  },
  'work-bridal-02.jpg': {
    title: 'Royal Violet All-Over Maggam Bridal Blouse',
    category: 'Bridal Masterpiece',
    timeline: '10–12 Days · 2 Fitting Trials',
    description:
      'An extraordinary bridal creation in rich royal violet silk covered in dense all-over maggam lattice (jaal) embroidery. Detailed with intricate floral booties, royal elephant motifs on sleeve cuffs, and heavy zardosi border finishing.',
    handwork: 'All-over maggam jaal lattice, antique zardosi, and stone detailing',
    silhouette: 'High-coverage bridal back with elbow sleeves and temple cuffs',
    occasion: 'Grand wedding muhurtham and South Indian bridal ceremonies',
    fabric: 'Heavy brocade silk with multi-layer bridal canvas support',
    tags: ['All-Over Maggam', 'Jaal Lattice', 'Elephant Motifs', 'Zardosi Work'],
  },
  'work-bridal-03.jpg': {
    title: 'Mint Teal Floral Aari & Pearl Bridal Blouse',
    category: 'Bridal Masterpiece',
    timeline: '7–9 Days · 2 Fitting Trials',
    description:
      'Contemporary pastel mint teal silk blouse detailed with soft resham thread floral embroidery, delicate pearl clusters, and fine aari needlework. Ideal for morning ceremonies and pastel bridal sarees.',
    handwork: 'Pastel resham threadwork, nakshi spring work, and pearl drop detailing',
    silhouette: 'Illusion neck border with sheer neckline detailing and padded cups',
    occasion: 'Morning muhurtham, wedding reception, and bridal engagement',
    fabric: 'Pure Tussar silk / raw silk with soft sweat-proof lining',
    tags: ['Resham Threadwork', 'Pearl Drops', 'Pastel Bridal', 'Nakshi Spring'],
  },
  'work-kids-01.jpg': {
    title: 'Kids Mustard & Purple Traditional Pattu Pavadai',
    category: 'Kids Ethnic Wear',
    timeline: '4–5 Days · 1 Fitting Trial',
    description:
      'Handcrafted traditional South Indian pattu langa voni set for young girls in vibrant mustard yellow and royal purple silk. Features a pleated pure silk skirt with heavy gold zari border and an embroidered choli.',
    handwork: 'Traditional knife-pleated skirt with gold zari border and motif choli',
    silhouette: 'Flared pleats with 2-inch let-out seam allowance for growing children',
    occasion: 'Naming ceremony, festivals, weddings, and birthdays',
    fabric: 'Pure Kanchipuram silk with ultra-soft scratch-free cotton inner lining',
    tags: ['Pure Silk', 'Kids Pavadai', 'Grow-With-Child Seams', 'Soft Lining'],
  },
  'work-lehenga-01.jpg': {
    title: 'Lilac Shimmer Reception Designer Lehenga',
    category: 'Designer Lehenga',
    timeline: '12–15 Days · 2 Fitting Trials',
    description:
      'Breathtaking lavender-lilac designer lehenga featuring a heavily embellished crop choli with shimmering sequins, tiered can-can voluminous skirt, and scalloped sheer embroidered dupatta.',
    handwork: 'Hand-sewn sequin embroidery, floral threadwork, and micro-zari edging',
    silhouette: 'High-volume circular flare skirt with built-in multi-layer stiff can-can',
    occasion: 'Wedding reception, sangeet night, and cocktail celebrations',
    fabric: 'Silk georgette and organza with heavy satin underlay and canvas waistband',
    tags: ['Can-Can Volume', 'Sequin Choli', 'Reception Look', 'Sheer Dupatta'],
  },
  'work-lehenga-02.jpg': {
    title: 'Handcrafted 16-Kali Designer Festive Lehenga',
    category: 'Bespoke Lehenga',
    timeline: '8–10 Days · 2 Fitting Trials',
    description:
      'Bespoke 16-panel kalidar lehenga skirt tailored in rich dual-tone silk. Engineered for maximum twirl volume with handcrafted zari hem borders, custom drawstring waist, and matching artisan latkans.',
    handwork: 'Kalidar panel matching, broad zari border attachment, and handcrafted latkan craft',
    silhouette: '16-kali tailored panel flare with deep structured waistband',
    occasion: 'Sangeet dance, engagement, and festive wedding celebrations',
    fabric: 'Pure raw silk and Banarasi brocade weave',
    tags: ['16-Kali Flare', 'Banarasi Brocade', 'Artisan Latkans', 'Maximum Twirl'],
  },
  'work-saree-01.jpg': {
    title: 'Blush Peach Artisanal Cutwork Saree Blouse',
    category: 'Festive Blouse',
    timeline: '5–7 Days · 1 Fitting Trial',
    description:
      'Sophisticated blush peach blouse featuring an artisanal keyhole back cutout, handcrafted pearl tassel drops, and delicate floral needlework along the neckline and sleeves.',
    handwork: 'Artisanal back keyhole cutwork, pearl drop tassels, and floral aari embroidery',
    silhouette: 'Designer keyhole back, jewel neckline, and concealed side zipper',
    occasion: 'Reception, festive cocktail parties, and modern saree styling',
    fabric: 'Organza and chanderi silk blend with lightweight breathable lining',
    tags: ['Keyhole Back', 'Pearl Drops', 'Cutwork Craft', 'Jewel Neck'],
  },
}

/**
 * Resolves comprehensive piece information for a given photo file,
 * checking specific curated records first, then boutique captions, then smart generation.
 */
export function getPieceDetails(file: PhotoFile, boutique: BoutiqueConfig): PieceDetail {
  // Check curated piece map for 1-lavishboutique
  if (boutique.slug === '1-lavishboutique' && LAVISH_PIECES[file]) {
    return LAVISH_PIECES[file]
  }

  const category = photoCategory(file) ?? 'Custom Stitched'
  const caption = boutique.media.captions?.[file]

  const title = caption ? caption : `${category} by ${boutique.brand.name}`
  const handworkText = boutique.services?.handwork?.slice(0, 3).join(', ') || 'Aari, Maggam & Zari Handwork'
  const fabricText = boutique.fabrics?.[0]?.name ? `${boutique.fabrics[0].name} with soft lining` : 'Pure silk & raw silk with soft cotton lining'

  return {
    title,
    category: category.toLowerCase().includes('bridal') ? 'Bridal Masterpiece' : category,
    timeline: `${boutique.pricing?.deliveryDays ?? 7} Days · Trial Fitting Included`,
    description: caption
      ? `${caption}. Handcrafted with artisanal precision, personalized contouring, and luxury finishing at ${boutique.brand.name}.`
      : `Bespoke handcrafted ${category.toLowerCase()} stitched with precision contouring, premium linings, and signature embroidery at ${boutique.brand.name}.`,
    handwork: handworkText,
    silhouette: 'Custom tailored contour fit with personalized neckline and comfortable armhole ease',
    occasion: 'Weddings, receptions, festivals, and special family celebrations',
    fabric: fabricText,
    tags: [category, 'Custom Fit', 'Hand Embroidered', 'Bespoke'],
  }
}
