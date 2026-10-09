// Generated from data.md by `npm run config`. Edit data.md and run it again; changes made here are overwritten.

import type { BoutiqueConfig } from '../../types/boutique'

const config: BoutiqueConfig = {
  slug: '2-vastravinyasaki',
  brand: {
    name: 'Vastra Vinyasaki Boutique',
    localName: 'ವಸ್ತ್ರ ವಿನ್ಯಾಸಕಿ',
    tagline: 'Get your Dream Outfit Designed with Us',
    logo: 'logo.png',
    colors: { primary: '#7A1F2B', accent: '#C9A24A' },
  },
  owner: {
    name: 'Pooja Rani',
    role: 'Founder & Fashion Designer (B.Sc Fashion Designer)',
    photo: 'owner.jpg',
    story: 'Founded by B.Sc Fashion Designer Pooja Rani, Vastra Vinyasaki is dedicated to transforming fine fabrics into bespoke festive and bridal masterpieces. With precision cutting, exquisite hand aari and maggam embroidery, and signature saree kucchu tasseling, we bring your dream outfit to life with a flawless first-trial fit.',
  },
  highlight: 'Led by a qualified fashion designer, known for perfect first-trial blouse fitting, intricate handcrafted aari and zardosi embroidery, and designer saree tassels (kucchu).',
  established: 2020,
  contact: {
    phone: '+91 90085 59926',
    whatsapp: '+91 90085 59926',
    email: 'vastravinyasaki@gmail.com',
    languages: ['Kannada', 'English', 'Hindi'],
  },
  branches: [
    {
      name: 'Kengeri Uppanagara',
      address: '#45, 6th Main, Near Hoysala Circle, Kalikamba Temple Road, Kengeri Uppanagara, Kengeri Satellite Town',
      landmark: 'Near Hoysala Circle, Close to Eesha Kids Preschool, Kalikamba Temple Road',
      area: 'Kengeri Satellite Town',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560060',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Vastra%20Vinyasaki%20Boutique%20Kengeri%20Satellite%20Town%20560060',
      hours: 'Mon–Sat 10:00am–7:30pm, Sun 11:00am–4:00pm (by appointment)',
      week: [
        { open: '10:00', close: '19:30' },
        { open: '10:00', close: '19:30' },
        { open: '10:00', close: '19:30' },
        { open: '10:00', close: '19:30' },
        { open: '10:00', close: '19:30' },
        { open: '10:00', close: '19:30' },
        { open: '11:00', close: '16:00' },
      ],
      parking: true,
    },
  ],
  social: {
    instagram: 'https://instagram.com/vastra_vinyasaki',
    googleBusiness: 'https://www.justdial.com/Bangalore/Vastra-Vinyasaki-Near-Eesha-Kids-Preschool-Kengeri-Satelite-Town/080PXX80-XX80-230807190313-H4Z1_BZDET',
    googleRating: 5,
    googleReviewCount: 112,
  },
  services: {
    featured: [
      'Bridal blouse stitching & aari/maggam embroidery',
      'Handcrafted saree tassels (kuchu)',
      'Custom designer lehengas & festive gowns',
    ],
    groups: [
      {
        title: 'Women',
        items: [
          'Blouse',
          'Designer blouse',
          'Bridal blouse',
          'Saree fall and pico',
          'Saree pre-pleating and draping',
          'Salwar and churidar',
          'Kurti',
          'Anarkali',
          'Lehenga',
          'Half-saree (langa voni)',
          'Gown and Indo-western',
        ],
      },
      {
        title: 'Kids',
        items: ['Pattu pavadai and langa', 'Frocks', 'Kids ethnic wear'],
      },
      {
        title: 'Handwork',
        items: [
          'Aari work',
          'Maggam work',
          'Zardosi',
          'Machine embroidery',
          'Hand embroidery',
          'Mirror, bead and stone work',
        ],
      },
      {
        title: 'Services',
        items: [
          'Alterations',
          'Bridal packages',
          'Custom design consultation',
          'Express and urgent stitching',
          'Saree Tassels (Kuchu)',
          'Costumes on Rent',
          'Block Printing',
          'Tie and Dye',
          'Handicrafts',
        ],
      },
    ],
  },
  pricing: {
    startingAt: [
      { item: 'Simple blouse', price: 450 },
      { item: 'Designer blouse', price: 1200 },
      { item: 'Bridal work', price: 4500 },
    ],
    deliveryDays: 7,
    express: '48 hours, ₹300 extra',
    paymentModes: ['Cash', 'UPI', 'Card', 'Google Pay', 'PhonePe'],
  },
  bridalPackages: [
    {
      name: 'Traditional Muhurtham Bridal Package',
      price: 8500,
      includes: [
        '1 heavy bridal maggam blouse with zardosi and stone work',
        '1 reception designer blouse with custom back cutwork',
        'saree fall and pico for both sarees',
        'handcrafted pearl and bead saree kuchu',
        'and 1 dedicated pre-wedding fitting trial.',
      ],
    },
    {
      name: 'Festive Bride & Sister Duo Package',
      price: 14500,
      includes: [
        'Complete bridal wedding blouse with intricate peacock motif aari embroidery',
        'sister-of-the-bride designer blouse',
        'bespoke festive lehenga stitching with latkans',
        'complete saree kuchu for 3 sarees',
        'and express priority stitching.',
      ],
    },
    {
      name: 'Haldi & Sangeet Trousseau Package',
      price: 6500,
      includes: [
        '1 contemporary sweetheart neckline blouse',
        '1 designer crop top and festive ethnic skirt/gown styling',
        'custom dupatta edging',
        'and complimentary alterations.',
      ],
    },
  ],
  offers: [
    {
      title: 'Complimentary Saree Kuchu on Bridal Blouses',
      detail: 'Valid on bridal embroidery orders above ₹5,000',
      until: '2026-12-31',
      code: 'KUCHU2026',
    },
    {
      title: '10% Off on Full Wedding Trousseau Stitching',
      detail: 'Applicable on booking 3 or more designer blouses together',
      until: '2026-11-30',
      code: 'BRIDAL10',
    },
  ],
  alterationPrices: [
    { item: 'Blouse side fitting and armhole adjustment', price: 150, days: 1 },
    { item: 'Saree fall and pico (machine finish)', price: 120, days: 1 },
    {
      item: 'Designer saree tassels (kuchu) with silk threads & beads',
      price: 450,
      days: 2,
    },
    { item: 'Lehenga length and waist tapering', price: 350, days: 2 },
    { item: 'Kurti fitting and neckline reshaping', price: 120, days: 1 },
    { item: 'Anarkali / gown bust and waist alteration', price: 250, days: 2 },
    {
      item: 'Premium metal zip and handmade dori latkan replacement',
      price: 100,
      days: 1,
    },
  ],
  stats: [
    { value: '5+', label: 'Years stitching' },
    { value: '3,500+', label: 'Garments delivered' },
    { value: '6', label: 'People on our team' },
  ],
  reviews: [
    {
      name: 'Mamtha',
      text: 'The customer service was outstanding, and the product was exactly what I was looking for. I was so pleased with the service I received. They went above and beyond to help me find the perfect design. Very impressed with the quality!',
    },
    {
      name: 'Shalini Shalu',
      text: 'It\'s a very good ambience! The outfits are really fantabulous. Loved the intricate bridal blouse embroidery and sweet finishing. Happy to see such quality in Kengeri.',
    },
    {
      name: 'Anamika',
      text: 'Good designer and more suggestions you will get. Pooja understands individual body types and suggests the most flattering necklines and sleeve lengths.',
    },
    {
      name: 'Tejashwini',
      text: 'Good service and dependable delivery. Stitched my saree blouse right on time with neat finishing and zero complaints.',
    },
    {
      name: 'Rashmi',
      text: 'Very polite and talented designer. My blouse came out with a perfect fit on the very first try without needing any alterations.',
    },
    {
      name: 'Sahana',
      text: 'Outstanding customer service and fabric handling. Got my wedding lehenga stitched here and the compliments were non-stop!',
    },
    {
      name: 'Bhavya',
      text: 'Best boutique in Kengeri Satellite Town. Stitching is so neat, especially the intricate neckline detailing and beadwork.',
    },
    {
      name: 'Keerthana',
      text: 'Quick delivery and very reasonable pricing. Saree tassels and blouse finishing were handled with great care.',
    },
    {
      name: 'Madhavi',
      text: 'Beautiful aari embroidery work for my festive sarees. The team is very patient and understands customer ideas well.',
    },
    {
      name: 'Nandini',
      text: 'Stitched a traditional half-saree for my daughter. Fitting was exact, colors blended beautifully, and delivered right on time.',
    },
  ],
  testimonials: [
    {
      name: 'Mamtha',
      text: 'The customer service was outstanding, and the product was exactly what I was looking for. I was so pleased with the service I received. They went above and beyond to help me find the perfect design. Very impressed with the quality!',
    },
    {
      name: 'Shalini Shalu',
      text: 'It\'s a very good ambience! The outfits are really fantabulous. Loved the intricate bridal blouse embroidery and sweet finishing. Happy to see such quality in Kengeri.',
    },
    {
      name: 'Anamika',
      text: 'Good designer and more suggestions you will get. Pooja understands individual body types and suggests the most flattering necklines and sleeve lengths.',
    },
    {
      name: 'Tejashwini',
      text: 'Good service and dependable delivery. Stitched my saree blouse right on time with neat finishing and zero complaints.',
    },
    {
      name: 'Rashmi',
      text: 'Very polite and talented designer. My blouse came out with a perfect fit on the very first try without needing any alterations.',
    },
    {
      name: 'Sahana',
      text: 'Outstanding customer service and fabric handling. Got my wedding lehenga stitched here and the compliments were non-stop!',
    },
    {
      name: 'Bhavya',
      text: 'Best boutique in Kengeri Satellite Town. Stitching is so neat, especially the intricate neckline detailing and beadwork.',
    },
    {
      name: 'Keerthana',
      text: 'Quick delivery and very reasonable pricing. Saree tassels and blouse finishing were handled with great care.',
    },
    {
      name: 'Madhavi',
      text: 'Beautiful aari embroidery work for my festive sarees. The team is very patient and understands customer ideas well.',
    },
    {
      name: 'Nandini',
      text: 'Stitched a traditional half-saree for my daughter. Fitting was exact, colors blended beautifully, and delivered right on time.',
    },
  ],
  faq: [
    {
      question: 'How do I book a design consultation with designer Pooja Rani?',
      answer: 'You can call or WhatsApp us on +91 90085 59926 to schedule an appointment. We offer one-on-one consultations where we discuss patterns, embroidery motifs, and styling options.',
    },
    {
      question: 'How far in advance should I order my bridal blouse?',
      answer: 'We recommend visiting us 2 to 3 weeks prior to your wedding or reception so we have sufficient time for detailed aari work, trials, and perfect hand-finishing.',
    },
    {
      question: 'Can I provide my own saree and fabric?',
      answer: 'Yes! Bring your saree or fabric to our store. We will inspect the border and body motifs, draft custom neck designs, and recommend matching latkans and kuchu.',
    },
    {
      question: 'What are Saree Kuchu (tassels) and do you do custom designs?',
      answer: 'Saree Kuchu is traditional hand-knotted tasseling at the pallu end using silk threads, pearls, and antique beads. We create custom matching patterns for your pattu sarees.',
    },
    {
      question: 'Do you offer express stitching for urgent functions?',
      answer: 'Yes, we provide 48-hour express stitching for urgent occasions with a small priority fee.',
    },
    {
      question: 'What if my stitched blouse requires slight adjustments?',
      answer: 'We offer complimentary alteration support on all our custom-stitched garments to ensure your fit is 100% comfortable.',
    },
  ],
  media: {
    hero: { type: 'image', src: 'hero-landscape.jpg' },
    storefront: 'storefront.jpg',
    interior: ['interior-1.jpg', 'interior-2.jpg'],
    teamAtWork: 'team-at-work.jpg',
    work: [
      'hero-landscape.jpg',
      'work-blouse-01.jpg',
      'work-blouse-02.jpg',
      'work-blouse-03.jpg',
      'work-bridal-01.jpg',
      'work-bridal-02.jpg',
      'work-bridal-03.jpg',
      'work-kids-01.jpg',
      'work-lehenga-01.jpg',
      'work-lehenga-02.jpg',
      'work-saree-01.jpg',
    ],
    closeups: ['closeup-01.jpg', 'closeup-02.jpg'],
    alterations: [
      { before: 'before-01.jpg', after: 'after-01.jpg' },
    ],
  },
  permissions: { showOwnerPhoto: true, showPrices: true },
  demo: { noindex: true, sold: false, preparedBy: 'Parichaya Tech Solutions Data Team' },
  collectorNotes: {
    collectedBy: 'Parichaya Tech Solutions Data Team',
    date: '2026-10-06',
    decisionMaker: 'Pooja Rani (Founder & Designer)',
    interestLevel: 'hot',
    goal: 'High-converting portfolio showcasing bridal blouses, saree kuchu, and designer wear with direct WhatsApp appointment booking',
    followUpDate: '2026-10-10',
    notes: 'Outstanding 5.0★ rating on directories with 112+ reviews; store features custom stitching, saree kuchu, block printing, and bridal wear',
  },
}

export default config
