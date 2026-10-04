// Generated from data.md by `npm run config`. Edit data.md and run it again; changes made here are overwritten.

import type { BoutiqueConfig } from '../../types/boutique'

const config: BoutiqueConfig = {
  slug: 'sample-boutique',
  brand: {
    name: 'Sample Boutique',
    tagline: 'Stitched to you, thread by thread',
    logo: 'logo.png',
    colors: { primary: '#7A1F2B', accent: '#C9A24A' },
  },
  owner: {
    name: 'Lakshmi Devi',
    role: 'Founder & Designer',
    photo: 'owner.jpg',
    story: 'I started stitching blouses for my neighbours from home in 2012. Today our team of twelve dresses brides across the city — but every piece still gets my eye before it leaves the shop.',
  },
  highlight: 'Known for bridal maggam blouses delivered in 10 days',
  established: 2012,
  contact: {
    phone: '+91 90000 00000',
    whatsapp: '+91 90000 00000',
    email: 'hello@sample-boutique.in',
    languages: ['Telugu', 'English', 'Hindi'],
  },
  branches: [
    {
      name: 'Main Branch',
      address: '12-3-45, First Floor, Temple Street',
      landmark: 'Opposite City Bus Stand',
      area: 'Temple Street',
      city: 'Tirupati',
      state: 'Andhra Pradesh',
      pincode: '517501',
      mapsUrl: 'https://maps.google.com/?q=Tirupati',
      hours: 'Mon–Sat 10am–8pm, Sun 11am–2pm',
      week: [
        { open: '10:00', close: '20:00' },
        { open: '10:00', close: '20:00' },
        { open: '10:00', close: '20:00' },
        { open: '10:00', close: '20:00' },
        { open: '10:00', close: '20:00' },
        { open: '10:00', close: '20:00' },
        { open: '11:00', close: '14:00' },
      ],
      parking: true,
    },
  ],
  social: {
    instagram: 'https://instagram.com/sample.boutique',
    facebook: 'https://facebook.com/sampleboutique',
    googleRating: 4.8,
    googleReviewCount: 312,
  },
  services: {
    featured: ['Bridal maggam blouses', 'Designer lehengas', 'Pattu pavadai for kids'],
    groups: [
      {
        title: 'Women',
        items: [
          'Designer blouse',
          'Bridal blouse',
          'Saree fall and pico',
          'Saree pre-pleating and draping',
          'Salwar and churidar',
          'Anarkali',
          'Lehenga',
          'Half-saree (langa voni)',
        ],
      },
      {
        title: 'Kids',
        items: ['Pattu pavadai and langa', 'Frocks'],
      },
      {
        title: 'Men',
        items: ['Kurta and pyjama', 'Sherwani'],
      },
      {
        title: 'Handwork',
        items: ['Aari work', 'Maggam work', 'Zardosi', 'Mirror, bead and stone work'],
      },
      {
        title: 'Services',
        items: [
          'Alterations',
          'Fabric sales',
          'Bridal packages',
          'Custom design consultation',
          'Express and urgent stitching',
        ],
      },
    ],
    kidsAges: '1 to 14 years',
  },
  pricing: {
    startingAt: [
      { item: 'Simple blouse', price: 450 },
      { item: 'Designer blouse', price: 1200 },
      { item: 'Bridal work', price: 6500 },
    ],
    deliveryDays: 7,
    express: '48 hours, ₹300 extra',
    paymentModes: ['Cash', 'UPI', 'Card'],
  },
  bridalPackages: [
    {
      name: 'Muhurtham',
      price: 12000,
      includes: [
        'Muhurtham blouse with maggam work',
        'matching saree fall and pico',
        '2 trial fittings',
      ],
    },
    {
      name: 'Wedding week',
      price: 28000,
      includes: [
        'Muhurtham blouse',
        'reception blouse',
        'half-saree for the haldi',
        '3 trial fittings',
        'delivery a week before the wedding',
      ],
    },
    {
      name: 'Trousseau',
      price: 45000,
      includes: [
        'Five blouses for the wedding functions',
        'one lehenga',
        'alterations for a year',
        'a fitting at home',
      ],
    },
  ],
  offers: [
    {
      title: 'Free saree fall and pico with every bridal blouse booked this season',
      detail: 'For bridal blouse orders placed at the store',
      until: '2027-01-31',
      code: 'BRIDALFALL',
    },
  ],
  alterationPrices: [
    { item: 'Blouse fitting, taken in or let out', price: 150, days: 2 },
    { item: 'Sleeve length shortened', price: 100, days: 1 },
    { item: 'Saree fall and pico', price: 200, days: 2 },
    { item: 'Lehenga waist adjusted', price: 350, days: 3 },
    { item: 'Hooks or zip replaced', price: 80, days: 1 },
  ],
  giftVouchers: {
    amounts: [1000, 2500, 5000, 10000],
  },
  rentals: [
    {
      name: 'Red bridal lehenga with zardosi border',
      pricePerDay: 2500,
      sizes: '32 to 38',
      photo: 'rental-01.jpg',
    },
    {
      name: 'Gold tissue half-saree',
      pricePerDay: 1500,
      sizes: '30 to 36',
      photo: 'rental-02.jpg',
    },
  ],
  fabrics: [
    {
      name: 'Kanchi pattu',
      bestFor: 'bridal blouses and half-sarees',
      photo: 'fabric-01.jpg',
    },
    { name: 'Raw silk', bestFor: 'designer blouses', photo: 'fabric-02.jpg' },
    {
      name: 'Banarasi brocade',
      bestFor: 'lehengas and reception blouses',
      photo: 'fabric-03.jpg',
    },
    {
      name: 'Cotton silk',
      bestFor: 'everyday blouses and kurtis',
      photo: 'fabric-04.jpg',
    },
  ],
  classes: [
    {
      name: 'Blouse stitching for beginners',
      level: 'Beginner',
      length: '6 weeks, Saturday mornings',
      nextBatch: '2027-02-07',
      fee: 4500,
    },
  ],
  leadTimes: [
    { item: 'Bridal lehenga', weeks: 10 },
    { item: 'Bridal blouse with maggam work', weeks: 8 },
    { item: 'Family outfits', weeks: 6 },
    { item: 'Designer blouse', weeks: 4 },
    { item: 'Saree fall, pico and pleating', weeks: 1 },
  ],
  workTimes: [
    { item: 'Aari work', days: 10 },
    { item: 'Maggam work', days: 14 },
    { item: 'Zardosi', days: 18 },
    { item: 'Mirror, bead and stone work', days: 8 },
    { item: 'Saree fall and pico', days: 2 },
    { item: 'Saree pre-pleating and draping', days: 1 },
  ],
  team: [
    {
      name: 'Ramesh',
      role: 'Master tailor',
      years: 11,
      line: 'Cuts every bridal blouse himself.',
    },
    {
      name: 'Kavitha',
      role: 'Aari and maggam artist',
      years: 7,
      line: 'Does the fine handwork on necklines and sleeves.',
    },
  ],
  posts: [
    {
      title: 'Which neck suits a broad shoulder',
      date: '2026-10-01',
      text: 'A boat neck widens the shoulder line, so go for a deep U or a sweetheart instead. They draw the eye down and balance the shoulders.',
    },
    {
      title: 'Bring your saree to the first fitting',
      date: '2026-09-15',
      text: 'We match the blouse to the saree\'s border and colour, so the two look made together. Bring it, or a clear photo in daylight.',
    },
  ],
  stats: [
    { value: '12+', label: 'Years stitching' },
    { value: '8,000+', label: 'Garments delivered' },
    { value: '12', label: 'People on our team' },
  ],
  reviews: [
    {
      name: 'Priya',
      text: 'My wedding blouse fit perfectly on the first trial. The maggam work was even better than the sample.',
    },
    {
      name: 'Swathi',
      text: 'Got my daughter\'s pattu pavadai done in four days for her birthday. Beautiful finishing.',
    },
    {
      name: 'Anusha',
      text: 'They understood exactly what I showed them on Instagram and made it better.',
    },
  ],
  testimonials: [
    {
      name: 'Priya',
      text: 'My wedding blouse fit perfectly on the first trial. The maggam work was even better than the sample.',
    },
    {
      name: 'Swathi',
      text: 'Got my daughter\'s pattu pavadai done in four days for her birthday. Beautiful finishing.',
    },
    {
      name: 'Anusha',
      text: 'They understood exactly what I showed them on Instagram and made it better.',
    },
  ],
  faq: [
    {
      question: 'Can I bring my own fabric?',
      answer: 'Yes. Bring it to your first fitting and we\'ll tell you if it suits the design you want.',
    },
    {
      question: 'Do you stitch from a photo?',
      answer: 'Yes. Send us the photo on WhatsApp and we\'ll tell you what it will take and what it will cost.',
    },
    {
      question: 'How many trials will I need?',
      answer: 'Usually one. Bridal blouses get two, so the fit is right before the handwork starts.',
    },
  ],
  media: {
    hero: { type: 'image', src: 'work-bridal-01.jpg' },
    storefront: 'storefront.jpg',
    interior: ['interior-1.jpg', 'interior-2.jpg'],
    teamAtWork: 'team-at-work.jpg',
    work: [
      'work-bridal-01.jpg',
      'work-bridal-02.jpg',
      'work-bridal-03.jpg',
      'work-blouse-01.jpg',
      'work-blouse-02.jpg',
      'work-blouse-03.jpg',
      'work-lehenga-01.jpg',
      'work-lehenga-02.jpg',
      'work-saree-01.jpg',
      'work-kids-01.jpg',
    ],
    closeups: ['closeup-01.jpg', 'closeup-02.jpg'],
    alterations: [
      { before: 'before-01.jpg', after: 'after-01.jpg' },
    ],
    looks: [
      'look-haldi-01.jpg',
      'look-reception-01.jpg',
      'look-sangeet-01.jpg',
      'look-wedding-01.jpg',
    ],
    drapes: ['drape-bengali.jpg', 'drape-nivi.jpg'],
    groom: ['groom-sangeet.jpg', 'groom-wedding.jpg'],
    handworkPairs: [
      { first: 'plain-01.jpg', second: 'worked-01.jpg' },
    ],
    matching: [
      { first: 'match-01-a.jpg', second: 'match-01-b.jpg' },
    ],
    makerVideo: 'maker.mp4',
    workroomVideo: 'workroom.mp4',
    tipVideos: ['tip-01.mp4', 'tip-02.mp4', 'tip-03.mp4'],
    captions: {
      'work-bridal-01.jpg': 'Bridal blouse, aari and maggam, 14 days',
      'work-bridal-02.jpg': 'Reception lehenga, zardosi border, 21 days',
      'work-bridal-03.jpg': 'Muhurtham blouse, heavy zari, 18 days',
      'work-blouse-01.jpg': 'Designer blouse, mirror work, 8 days',
      'work-blouse-02.jpg': 'Simple blouse, piped neck, 4 days',
      'work-blouse-03.jpg': 'Boat-neck blouse, pearl detailing, 6 days',
      'work-lehenga-01.jpg': 'Half saree for a ritu ceremony, 12 days',
      'work-lehenga-02.jpg': 'Reception lehenga, can-can volume, 16 days',
      'work-saree-01.jpg': 'Saree pre-pleating and fall stitching, 2 days',
      'work-kids-01.jpg': 'Pattu langa, zari border, 7 days',
      'after-01.jpg': 'Blouse taken in at the waist and sleeves shortened, 2 days',
      'look-wedding-01.jpg': 'Muhurtham look, maggam blouse with a Kanchi pattu saree',
      'look-sangeet-01.jpg': 'Light lehenga for the sangeet, mirror work',
      'look-reception-01.jpg': 'Reception blouse with a brocade lehenga',
      'look-haldi-01.jpg': 'Yellow half-saree for the haldi',
      'drape-nivi.jpg': 'Nivi drape, pre-pleated',
      'drape-bengali.jpg': 'Bengali drape with a box-pleated pallu',
      'groom-sangeet.jpg': 'Kurta with a brocade jacket',
      'groom-wedding.jpg': 'Ivory sherwani with zari work',
      'plain-01.jpg': 'The blouse before handwork',
      'worked-01.jpg': 'The same blouse with aari work on the neck and sleeves',
      'match-01-a.jpg': 'Mother\'s pattu saree blouse',
      'match-01-b.jpg': 'Daughter\'s matching pattu langa',
      'maker.mp4': 'Lakshmi on how she started stitching from home',
      'workroom.mp4': 'Aari work on a bridal blouse, on the frame',
      'tip-01.mp4': 'How to measure your blouse in a minute',
      'tip-02.mp4': 'Pinning saree pleats so they stay',
      'tip-03.mp4': 'Caring for silk after the wedding',
    },
  },
  permissions: { showOwnerPhoto: true, showPrices: true },
  demo: { noindex: true, sold: false, preparedBy: 'Ravi' },
  collectorNotes: {
    collectedBy: 'Ravi',
    date: '2026-09-21',
    decisionMaker: 'Lakshmi Devi (owner)',
    interestLevel: 'warm',
    goal: 'More bridal bookings',
    followUpDate: '2026-09-28',
    notes: 'Busy season is Oct–Feb, prefers WhatsApp over calls',
  },
}

export default config
