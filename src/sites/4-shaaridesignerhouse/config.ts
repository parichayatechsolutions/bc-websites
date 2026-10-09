// Generated from data.md by `npm run config`. Edit data.md and run it again; changes made here are overwritten.

import type { BoutiqueConfig } from '../../types/boutique'

const config: BoutiqueConfig = {
  slug: '4-shaaridesignerhouse',
  brand: {
    name: 'Shaari Designer House',
    localName: 'ಶಾರಿ ಡಿಸೈನರ್ ಹೌಸ್',
    tagline: 'Customisation Available In All Kinds Of Designer Outfits',
    logo: 'logo.png',
    colors: { primary: '#6B2D8E', accent: '#C9A24A' },
  },
  owner: {
    name: 'Sharanya',
    role: 'Founder & Designer',
    photo: 'owner.jpg',
    story: 'Established in 2021 near Hoysala Circle in Kengeri Satellite Town, Shaari Designer House specializes in custom designer blouses, festive lehengas, and customized ethnic outfits. From grand bridal aari and zardosi embroidery to contemporary cutwork blouses and custom-tailored lehengas, we bring your dream outfits to life with tailored perfection and a guaranteed first-trial fit.',
  },
  highlight: 'Personalized design consultations by Sharanya, specialized in intricate aari and zardosi bridal embroidery, custom-fit festive lehengas, and on-time delivery.',
  established: 2021,
  contact: {
    phone: '+91 90363 64507',
    whatsapp: '+91 99863 40423',
    email: 'shaaridesignerhouse@gmail.com',
    languages: ['Kannada', 'English', 'Hindi'],
  },
  branches: [
    {
      name: 'Hoysala Circle / Kengeri Satellite Town',
      address: '4th Cross, 1st A Main Road, Near Hoysala Circle, Kengeri Satellite Town',
      landmark: 'Near Hoysala Circle, 1st A Main Road',
      area: 'Kengeri Satellite Town',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560060',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=shaari%20Designer%20house%20HoysalaCircle%20Kengeri%20Kengeri%20560060',
      hours: 'Mon–Sun 11:00am–8:00pm',
      week: [
        { open: '11:00', close: '20:00' },
        { open: '11:00', close: '20:00' },
        { open: '11:00', close: '20:00' },
        { open: '11:00', close: '20:00' },
        { open: '11:00', close: '20:00' },
        { open: '11:00', close: '20:00' },
        { open: '11:00', close: '20:00' },
      ],
      parking: true,
    },
  ],
  social: {
    instagram: 'https://instagram.com/shaari__designer__house',
    googleBusiness: 'https://share.google/gZ4RGVoemQxA8k8rU',
    googleRating: 4.8,
    googleReviewCount: 48,
  },
  services: {
    featured: [
      'Contemporary designer blouses',
      'Custom bridal lehengas & gowns',
      'Intricate aari & zardosi handwork',
    ],
    groups: [
      {
        title: 'Women',
        items: [
          'Blouse',
          'Designer blouse',
          'Bridal blouse',
          'Saree fall and pico',
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
          'Designer sarees with customized border work',
        ],
      },
    ],
  },
  pricing: {
    startingAt: [
      { item: 'Simple blouse', price: 450 },
      { item: 'Designer blouse', price: 1200 },
      { item: 'Bridal work', price: 5500 },
    ],
    deliveryDays: 7,
    express: '48 hours, ₹300 extra',
    paymentModes: ['Cash', 'UPI', 'Card'],
  },
  bridalPackages: [
    {
      name: 'Muhurtham Bridal Essence',
      price: 8900,
      includes: [
        'Pure silk bridal blouse with intricate aari and zardosi embroidery',
        'premium cotton lining and piping',
        'saree fall and pico',
        '2 trial fittings',
      ],
    },
    {
      name: 'Royal Bride Celebration',
      price: 19500,
      includes: [
        'Muhurtham aari blouse',
        'reception designer cutwork blouse',
        'custom festive lehenga styling',
        '3 personal trial fittings',
      ],
    },
    {
      name: 'Grand Wedding Trousseau',
      price: 38000,
      includes: [
        'Five bespoke ceremony blouses',
        'bespoke designer bridal lehenga',
        'full trousseau styling',
        'complimentary alteration care for 1 year',
      ],
    },
  ],
  alterationPrices: [
    { item: 'Blouse side fitting & loosening', price: 150, days: 1 },
    { item: 'Blouse padding addition', price: 300, days: 1 },
    { item: 'Kurti & salwar suit alteration', price: 200, days: 1 },
    { item: 'Lehenga waist & length alteration', price: 500, days: 2 },
    { item: 'Gown zipper replacement & refit', price: 250, days: 1 },
    { item: 'Saree fall & pico finishing', price: 120, days: 1 },
  ],
  stats: [
    { value: '3+', label: 'Years stitching' },
    { value: '2,800+', label: 'Garments delivered' },
    { value: '6', label: 'People on our team' },
  ],
  team: [
    { name: 'Suresh', role: 'Master tailor' },
    { name: 'Manjunath', role: 'Cutting master' },
    { name: 'Noor', role: 'Aari karigar' },
    { name: 'Saleem', role: 'Maggam karigar' },
    { name: 'Geetha', role: 'Finishing and pico' },
    { name: 'Kavya', role: 'Fittings and trials' },
  ],
  reviews: [
    {
      name: 'Archana',
      text: 'Amazing design sense and flawless stitching! Got two blouses stitched for my reception and both turned out spectacular.',
    },
    {
      name: 'Bindu',
      text: 'Very responsive and helpful with fabric and neckline choices. Stitching quality in Kengeri doesn\'t get better than this.',
    },
    {
      name: 'Yamuna',
      text: 'Beautiful finish on my festive lehenga. The hand embroidery on the sleeves was so delicate and neat.',
    },
    {
      name: 'Chandana',
      text: 'Delivered before the promised date. The fitting was exact on the first trial with zero alterations needed.',
    },
    {
      name: 'Madhuri',
      text: 'Loved the modern touch given to my traditional silk blouse. Highly recommended boutique near Hoysala Circle!',
    },
    {
      name: 'Ashwini',
      text: 'Excellent service and patient tailors. They understood all my customization instructions clearly.',
    },
    {
      name: 'Deepthi',
      text: 'Very neat finishing for kurtis and anarkalis too. Great stitching quality at affordable prices.',
    },
    {
      name: 'Geethanjali',
      text: 'Outstanding aari and zardosi work. Looked very luxurious and matched my Kanchipuram saree perfectly.',
    },
    {
      name: 'Pallavi',
      text: 'Friendly designer with great styling advice. She suggested a unique back design that looked lovely.',
    },
    {
      name: 'Supriya',
      text: 'Consistent quality and prompt delivery. Definitely one of the finest designer houses in Kengeri Satellite Town.',
    },
  ],
  testimonials: [
    {
      name: 'Archana',
      text: 'Amazing design sense and flawless stitching! Got two blouses stitched for my reception and both turned out spectacular.',
    },
    {
      name: 'Bindu',
      text: 'Very responsive and helpful with fabric and neckline choices. Stitching quality in Kengeri doesn\'t get better than this.',
    },
    {
      name: 'Yamuna',
      text: 'Beautiful finish on my festive lehenga. The hand embroidery on the sleeves was so delicate and neat.',
    },
    {
      name: 'Chandana',
      text: 'Delivered before the promised date. The fitting was exact on the first trial with zero alterations needed.',
    },
    {
      name: 'Madhuri',
      text: 'Loved the modern touch given to my traditional silk blouse. Highly recommended boutique near Hoysala Circle!',
    },
    {
      name: 'Ashwini',
      text: 'Excellent service and patient tailors. They understood all my customization instructions clearly.',
    },
    {
      name: 'Deepthi',
      text: 'Very neat finishing for kurtis and anarkalis too. Great stitching quality at affordable prices.',
    },
    {
      name: 'Geethanjali',
      text: 'Outstanding aari and zardosi work. Looked very luxurious and matched my Kanchipuram saree perfectly.',
    },
    {
      name: 'Pallavi',
      text: 'Friendly designer with great styling advice. She suggested a unique back design that looked lovely.',
    },
    {
      name: 'Supriya',
      text: 'Consistent quality and prompt delivery. Definitely one of the finest designer houses in Kengeri Satellite Town.',
    },
  ],
  faq: [
    {
      question: 'How do I book a design consultation with designer Sharanya?',
      answer: 'You can call or WhatsApp us on +91 99863 40423 to fix a time. We discuss your event, outfit style, necklines, and embroidery patterns.',
    },
    {
      question: 'How early should I give my bridal blouse?',
      answer: 'We recommend visiting us 2 to 3 weeks before your wedding dates so our artisans can handcraft the embroidery without rush and schedule fittings comfortably.',
    },
    {
      question: 'Can I bring my own saree or dress fabric?',
      answer: 'Yes! Bring your saree or fabric to our store near Hoysala Circle. We will help choose matching lining, borders, embroidery motifs, and latkans.',
    },
    {
      question: 'Do you offer urgent or express stitching?',
      answer: 'Yes, we provide 48-hour express stitching for urgent functions at a small additional fee.',
    },
    {
      question: 'What happens if the fit needs a minor adjustment after trial?',
      answer: 'We do trial fittings in our private fitting room and make adjustments immediately so you take home a garment that fits you flawlessly.',
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
      'unnamed.webp',
      'work-lehenga-02.jpg',
      'work-saree-01.jpg',
    ],
    closeups: ['closeup-01.jpg', 'closeup-02.jpg'],
    heroCollage: [
      'work-bridal-01.jpg',
      'closeup-01.jpg',
      'unnamed.webp',
    ],
    alterations: [
      { before: 'before-01.jpg', after: 'after-01.jpg' },
    ],
  },
  permissions: { showOwnerPhoto: true, showPrices: true },
  demo: { noindex: true, sold: false, preparedBy: 'Tech Team' },
  collectorNotes: {
    collectedBy: 'Tech Team',
    date: '2026-09-22',
    decisionMaker: 'Sharanya (Owner)',
    interestLevel: 'hot',
    goal: 'Showcase designer portfolio, attract bridal orders, professional web presence',
    followUpDate: '2026-09-29',
    notes: 'Prime spot near Hoysala Circle, active Instagram presence, solid 4.8 star rating',
  },
}

export default config
