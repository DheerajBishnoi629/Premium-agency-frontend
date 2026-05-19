import type { PortfolioCategory, PortfolioProject } from './portfolio.types';

export const PORTFOLIO_CATEGORIES: readonly PortfolioCategory[] = [
  { id: 'all', label: 'All Work' },
  { id: 'retail', label: 'Retail Shops' },
  { id: 'manufacturing', label: 'Manufacturing' },
  { id: 'services', label: 'Services' },
];

export const PORTFOLIO_PROJECTS: readonly PortfolioProject[] = [
  {
    id: 'p-001',
    slug: 'jaipur-jewels-store',
    title: 'An online store for a 40-year-old jewellery house',
    client: 'Jaipur Jewels',
    year: 2026,
    summary:
      'A mobile-first online store with Razorpay checkout and BIS hallmark certificates. Orders from 14 states in the first month.',
    categories: ['retail'],
    cover: {
      src: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&auto=format&fit=crop&q=70',
      alt: 'Gold jewellery on display',
      aspectRatio: '4 / 3',
    },
    gradient: 'from-amber-400/40 via-amber-500/10 to-slate-900',
  },
  {
    id: 'p-002',
    slug: 'curry-leaf-bangalore',
    title: 'A South Indian restaurant goes online',
    client: 'Curry Leaf, Bangalore',
    year: 2026,
    summary:
      'Online menu, table booking, and WhatsApp ordering. Direct orders now match what they were paying Zomato in commission.',
    categories: ['services'],
    cover: {
      src: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&auto=format&fit=crop&q=70',
      alt: 'South Indian thali on a banana leaf',
      aspectRatio: '4 / 3',
    },
    gradient: 'from-emerald-500/40 via-emerald-500/10 to-slate-900',
  },
  {
    id: 'p-003',
    slug: 'sunrise-dental-mumbai',
    title: 'A dental clinic ranks #1 for "near me"',
    client: 'Sunrise Dental, Mumbai',
    year: 2025,
    summary:
      'A clean clinic site plus Google Business Profile setup. Now the top result for "dental clinic Andheri West" — 12 new patients a week.',
    categories: ['services'],
    cover: {
      src: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1200&auto=format&fit=crop&q=70',
      alt: 'Dentist chair in a modern clinic',
      aspectRatio: '4 / 3',
    },
    gradient: 'from-sky-500/40 via-sky-500/10 to-slate-900',
  },
  {
    id: 'p-004',
    slug: 'shakti-industries-pune',
    title: 'A factory website that wins enterprise enquiries',
    client: 'Shakti Industries, Pune',
    year: 2025,
    summary:
      'Corporate site with a downloadable product catalogue, ISO certifications, and a multi-step RFQ form. 30+ qualified enquiries per month.',
    categories: ['manufacturing'],
    cover: {
      src: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1200&auto=format&fit=crop&q=70',
      alt: 'Modern factory floor',
      aspectRatio: '4 / 3',
    },
    gradient: 'from-violet-500/40 via-indigo-500/10 to-slate-900',
  },
  {
    id: 'p-005',
    slug: 'vidya-coaching-delhi',
    title: 'A coaching institute fills every batch',
    client: 'Vidya Coaching, Delhi',
    year: 2025,
    summary:
      'A simple site with course pages, demo class booking, and a free test series. Enrollments doubled in one admission cycle.',
    categories: ['services'],
    cover: {
      src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=70',
      alt: 'Students writing in a classroom',
      aspectRatio: '4 / 3',
    },
    gradient: 'from-rose-500/40 via-rose-500/10 to-slate-900',
  },
  {
    id: 'p-006',
    slug: 'super-mart-hyderabad',
    title: 'A neighbourhood kirana goes online',
    client: 'Super Mart, Hyderabad',
    year: 2024,
    summary:
      'WhatsApp catalogue + free 30-minute delivery within 3 km. Familiar customers now reorder twice a week without calling.',
    categories: ['retail'],
    cover: {
      src: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&auto=format&fit=crop&q=70',
      alt: 'Indian grocery store shelves',
      aspectRatio: '4 / 3',
    },
    gradient: 'from-emerald-400/40 via-sky-500/10 to-slate-900',
  },
];
