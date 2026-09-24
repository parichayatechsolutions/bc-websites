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
        title: 'Handwork',
        items: ['Aari work', 'Maggam work', 'Zardosi', 'Mirror, bead and stone work'],
      },
      {
        title: 'Services',
        items: [
          'Alterations',
          'Bridal packages',
          'Custom design consultation',
          'Express and urgent stitching',
        ],
      },
    ],
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
  media: {
    hero: { type: 'image', src: 'work-01.jpg' },
    storefront: 'storefront.jpg',
    interior: ['interior-1.jpg', 'interior-2.jpg'],
    teamAtWork: 'team-at-work.jpg',
    work: ['work-01.jpg', 'work-02.jpg', 'work-03.jpg', 'work-04.jpg', 'work-05.jpg'],
    closeups: ['closeup-01.jpg', 'closeup-02.jpg'],
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
