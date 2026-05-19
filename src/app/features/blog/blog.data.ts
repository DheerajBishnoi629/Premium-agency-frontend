import type { BlogPost } from './blog.types';

/**
 * Mock CMS payload. In production this module would be replaced by an
 * HTTP-backed data source that returns the same `BlogPost[]` shape.
 */
export const BLOG_POSTS: readonly BlogPost[] = [
  {
    id: 'b-000',
    slug: 'why-a-fast-website-wins-more-indian-customers',
    title: 'Why a fast website wins more Indian customers (and how slow ones cost you lakhs)',
    excerpt:
      'On mobile data, every extra second of load time loses you customers. Here is what speed actually means for your business in plain English.',
    cover: {
      src: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1600&auto=format&fit=crop&q=70',
      alt: 'A laptop showing a fast-loading website',
      aspectRatio: '16 / 9',
    },
    tags: ['design-tips', 'getting-started'],
    publishedAt: '2026-05-12',
    readingMinutes: 5,
    author: {
      name: 'Ananya Iyer',
      role: 'Founder',
      avatarUrl: 'https://i.pravatar.cc/96?img=47',
    },
    body: [
      {
        type: 'paragraph',
        text: 'Imagine a customer walks into your shop, you make them wait three minutes before saying hello, and then act surprised when they leave. That is exactly what a slow website does \u2014 except it happens to hundreds of customers a day, and you never see them walk in or walk out.',
      },
      { type: 'heading', level: 2, text: 'The 3-second rule' },
      {
        type: 'paragraph',
        text: 'Google\u2019s own research shows 53% of mobile users leave a website that takes longer than 3 seconds to load. Most small business websites in India take 6 to 10 seconds on a typical 4G connection. That is half your potential customers gone before they have even seen what you sell.',
      },
      { type: 'heading', level: 2, text: 'What slow really costs you' },
      {
        type: 'list',
        items: [
          'Every 1 second of delay drops conversions by about 7%.',
          'A 4-second site loses roughly 25% of mobile visitors before the page even appears.',
          'Slow sites rank lower on Google \u2014 fewer visitors and fewer enquiries.',
          'Bounce rate goes up, which tells Google the site is poor, which drops rankings further. A vicious circle.',
        ],
      },
      {
        type: 'quote',
        text: 'For a shop doing \u20b950,000 a month from the website, a 2-second speed-up is often worth an extra \u20b915,000 \u2014 every single month.',
      },
      { type: 'heading', level: 2, text: 'Why most Indian websites are slow' },
      {
        type: 'paragraph',
        text: 'Three reasons cover 90% of the cases. First, huge unoptimised images straight out of a phone camera. Second, heavy page builders and sliders that load megabytes of JavaScript just to show a logo. Third, cheap shared hosting on overloaded servers based outside India \u2014 every request has to travel halfway around the world.',
      },
      { type: 'heading', level: 2, text: 'What "fast" actually feels like' },
      {
        type: 'paragraph',
        text: 'A fast site loads the moment your customer\u2019s thumb stops scrolling. The first screen appears under 1.5 seconds, the page is fully usable within 2.5 seconds, and tapping a button responds instantly. There is no visible delay between idea and action \u2014 and that is what wins enquiries.',
      },
      { type: 'heading', level: 3, text: 'Three quick wins for your current site' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Compress every image to under 200 KB \u2014 tools like TinyPNG do this in 30 seconds.',
          'Switch to hosting with a data centre in Mumbai or Bangalore.',
          'Remove sliders and pop-ups on the home page \u2014 they hurt more than they help.',
        ],
      },
      {
        type: 'paragraph',
        text: 'These three changes alone usually cut load time in half. If you want it done properly \u2014 every image, every line of code, every page \u2014 that is what we build for a living.',
      },
    ],
  },
  {
    id: 'b-001',
    slug: '5-things-every-indian-business-website-needs',
    title: '5 things every Indian business website needs in 2026',
    excerpt:
      'Most small business websites in India are missing the same five things. Add them this week and watch your enquiries grow.',
    cover: {
      src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1600&auto=format&fit=crop&q=70',
      alt: 'Person working on a laptop in a small shop',
      aspectRatio: '16 / 9',
    },
    tags: ['getting-started', 'design-tips'],
    publishedAt: '2026-05-02',
    readingMinutes: 6,
    author: {
      name: 'Ananya Iyer',
      role: 'Founder',
      avatarUrl: 'https://i.pravatar.cc/96?img=47',
    },
    body: [
      {
        type: 'paragraph',
        text: 'We have built 200+ websites for Indian businesses. The same five things make the difference between a site that brings customers and one that just sits there.',
      },
      { type: 'heading', level: 2, text: '1. Big WhatsApp and call buttons' },
      {
        type: 'paragraph',
        text: 'Most of your visitors are on mobile, on the move, and want to talk now. A small phone icon in the footer is not enough. Put a green WhatsApp button and a Call Now button on every page, fixed to the bottom of the screen.',
      },
      { type: 'heading', level: 2, text: '2. Fast loading on mobile data' },
      {
        type: 'paragraph',
        text: 'If your site takes more than 3 seconds on 4G, half your visitors are already gone. Compress every image, skip the heavy slider, and you will keep them.',
      },
      { type: 'heading', level: 2, text: '3. A clear "what we do" in one line' },
      {
        type: 'paragraph',
        text: 'In the first second, a visitor should know exactly what you sell and where you are. "We make custom kurtas in Jaipur, shipped anywhere in India" beats "Welcome to our website" every single time.',
      },
      { type: 'heading', level: 2, text: '4. Real photos, not stock images' },
      {
        type: 'paragraph',
        text: 'Photos of your actual shop, team, and products build more trust than any award badge. A smartphone photo of your store is worth more than a beautiful stock image of a stranger.',
      },
      { type: 'heading', level: 2, text: '5. Google reviews on the home page' },
      {
        type: 'paragraph',
        text: 'Five recent Google reviews on your home page do more for sales than any "About Us" text. Ask happy customers, pin the best three, and let them sell for you.',
      },
      {
        type: 'quote',
        text: 'A simple site that loads fast and shows trust beats a fancy site that does not.',
      },
    ],
  },
  {
    id: 'b-002',
    slug: 'whatsapp-business-setup-15-minutes',
    title: 'Set up WhatsApp Business for your shop in 15 minutes',
    excerpt:
      'A step-by-step guide to turning the WhatsApp on your phone into a free sales channel for your business.',
    cover: {
      src: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=1600&auto=format&fit=crop&q=70',
      alt: 'A phone showing WhatsApp messages',
      aspectRatio: '16 / 9',
    },
    tags: ['whatsapp', 'getting-started'],
    publishedAt: '2026-04-18',
    readingMinutes: 7,
    author: {
      name: 'Rohan Mehta',
      role: 'Growth Lead',
      avatarUrl: 'https://i.pravatar.cc/96?img=12',
    },
    body: [
      {
        type: 'paragraph',
        text: 'WhatsApp Business is free, takes 15 minutes to set up, and is probably the single best sales tool for any small business in India today. Here is how to set it up properly.',
      },
      { type: 'heading', level: 2, text: 'Step 1: Download WhatsApp Business' },
      {
        type: 'paragraph',
        text: 'Install the WhatsApp Business app (it is separate from regular WhatsApp). You can use it with the same number as your regular WhatsApp if you back up first.',
      },
      { type: 'heading', level: 2, text: 'Step 2: Build your business profile' },
      {
        type: 'list',
        items: [
          'Add your shop name, address, and Google Maps link.',
          'Set business hours so customers know when you reply.',
          'Add your website and email if you have them.',
          'Upload a clean logo or shop photo as the display picture.',
        ],
      },
      { type: 'heading', level: 2, text: 'Step 3: Set up automatic replies' },
      {
        type: 'paragraph',
        text: 'Use the Greeting Message and Away Message features. A simple "Namaste! Thanks for messaging Sharma Sweets. We will reply within 30 minutes during shop hours (9am-9pm)" sets clear expectations and stops you losing leads at night.',
      },
      { type: 'heading', level: 2, text: 'Step 4: Add your catalogue' },
      {
        type: 'paragraph',
        text: 'The Catalogue feature lets you list your products with photos, prices, and descriptions. Customers can browse and order without leaving WhatsApp. Spend 30 minutes adding your top 20 products — it pays back forever.',
      },
      { type: 'heading', level: 2, text: 'Step 5: Add the WhatsApp button to your website' },
      {
        type: 'paragraph',
        text: 'Get a wa.me link with your number and pre-filled message, then add it as a fixed button on every page of your site. One tap and a customer is in conversation with you — no forms, no friction.',
      },
      {
        type: 'quote',
        text: 'For most Indian small businesses, a good WhatsApp setup outperforms a paid Google Ads campaign in the first month.',
        attribution: 'Rohan, in a recent client review',
      },
    ],
  },
  {
    id: 'b-003',
    slug: 'rank-on-google-for-near-me-searches',
    title: 'How to rank on Google when customers search "near me"',
    excerpt:
      '"Dentist near me", "best biryani near me", "AC repair near me" — here is the plain English guide to winning those searches.',
    cover: {
      src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&auto=format&fit=crop&q=70',
      alt: 'Smartphone showing Google Maps',
      aspectRatio: '16 / 9',
    },
    tags: ['seo', 'getting-started'],
    publishedAt: '2026-03-28',
    readingMinutes: 8,
    author: {
      name: 'Priya Shankar',
      role: 'SEO Specialist',
      avatarUrl: 'https://i.pravatar.cc/96?img=32',
    },
    body: [
      {
        type: 'paragraph',
        text: 'Every day, thousands of people in your city open Google and search "[your service] near me". If you show up in the top 3 results, you get the call. If you do not, your competitor does. Here is how to be the one who shows up.',
      },
      { type: 'heading', level: 2, text: 'Set up Google Business Profile (free, takes 20 minutes)' },
      {
        type: 'paragraph',
        text: 'This is the single most important step. Visit business.google.com, add your business, and verify it. Google will send a postcard to your address or call you. Once verified, you appear in Google Maps and the "near me" results.',
      },
      { type: 'heading', level: 2, text: 'Fill in every single field' },
      {
        type: 'list',
        ordered: true,
        items: [
          'Add your exact business category (e.g. "Cardiologist", not just "Doctor").',
          'Upload 10+ real photos — shop front, inside, team, products.',
          'Add accurate hours, including holidays.',
          'List every service you offer with short descriptions.',
          'Add your website and a working phone number.',
        ],
      },
      { type: 'heading', level: 2, text: 'Get reviews — the right way' },
      {
        type: 'paragraph',
        text: 'After every happy customer, send a simple WhatsApp message: "Hi! Could you take 30 seconds to leave us a Google review? Here is the link." Aim for one new review every week. Always reply to every review, good or bad.',
      },
      { type: 'heading', level: 2, text: 'Use the name + city + service trick' },
      {
        type: 'paragraph',
        text: 'On your website home page, write the phrase "[your service] in [your area]" naturally a few times. For example: "Family dentist in Bandra West, Mumbai". This tells Google exactly which searches to show you for.',
      },
      {
        type: 'quote',
        text: 'For local businesses, Google Business Profile beats a fancy website every time. Do this one thing well before anything else.',
      },
    ],
  },
];
