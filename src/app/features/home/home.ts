import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactForm } from '../../core/components/contact-form/contact-form';
import { WhatsAppService } from '../../core/services/whatsapp.service';

interface Stat {
  value: string;
  label: string;
}

interface TrustBadge {
  label: string;
  icon: string;
}

interface FeatureCard {
  title: string;
  description: string;
  icon: string;
}

interface Step {
  number: string;
  title: string;
  description: string;
}

interface Review {
  quote: string;
  name: string;
  business: string;
  city: string;
  initial: string;
  rating: number;
}

interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink, ContactForm],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export default class Home {
  protected readonly whatsapp = inject(WhatsAppService);

  protected readonly stats: readonly Stat[] = [
    { value: '200+', label: 'Businesses online' },
    { value: '4.9★', label: 'Average client rating' },
    { value: '48 hrs', label: 'First proposal' },
    { value: '7 days', label: 'Average launch time' },
  ];

  protected readonly trustBadges: readonly TrustBadge[] = [
    { label: 'GST registered', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Made in India', icon: 'M3 12l9-9 9 9M5 10v10h14V10' },
    { label: 'Pay only on approval', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8v8m0 0v2m0-10V4' },
    { label: 'Free 30-day support', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  ];

  protected readonly features: readonly FeatureCard[] = [
    {
      title: 'Mobile-first design',
      description: '80% of your customers visit on mobile. Every site we build looks great on small screens first.',
      icon: 'M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2zM11 18h2',
    },
    {
      title: 'Loads in under 2 seconds',
      description: 'Fast pages mean more enquiries. We optimise every image and line of code for Indian internet speeds.',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    },
    {
      title: 'Found on Google',
      description: 'Built-in SEO basics — clean URLs, fast pages, and structured data so your business shows up in search.',
      icon: 'M21 21l-4.35-4.35M10 18a8 8 0 110-16 8 8 0 010 16z',
    },
    {
      title: 'WhatsApp & call buttons',
      description: 'One tap to call or chat on WhatsApp from every page. Turn visitors into conversations.',
      icon: 'M3 5a2 2 0 012-2h2.28a1 1 0 01.95.68l1.5 4.49a1 1 0 01-.5 1.21l-2.26 1.13a11 11 0 005.52 5.52l1.13-2.26a1 1 0 011.21-.5l4.49 1.5a1 1 0 01.68.95V19a2 2 0 01-2 2A18 18 0 013 5z',
    },
    {
      title: 'You own everything',
      description: 'Full ownership of your domain, hosting, and content. No lock-in, no monthly platform fees.',
      icon: 'M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3M5 7v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2z',
    },
    {
      title: 'Hindi & English ready',
      description: 'Bilingual content support so you can speak to customers in the language they prefer.',
      icon: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129',
    },
  ];

  protected readonly steps: readonly Step[] = [
    {
      number: '01',
      title: 'Tell us your business',
      description: 'Share your goals on WhatsApp or the contact form. We reply within a few hours.',
    },
    {
      number: '02',
      title: 'Get a fixed quote',
      description: 'Clear pricing in writing within 48 hours. No hidden charges, no surprises.',
    },
    {
      number: '03',
      title: 'Go live in days',
      description: 'Most sites launch in 7-14 days. Pay only after you approve the design.',
    },
  ];

  protected readonly reviews: readonly Review[] = [
    {
      quote:
        'We were getting 2-3 enquiries a week. After the new website and Google setup, we get 8-10 every day. Worth every rupee.',
      name: 'Rajesh Patel',
      business: 'Patel Sweets & Namkeen',
      city: 'Ahmedabad',
      initial: 'R',
      rating: 5,
    },
    {
      quote:
        'Site went live in 9 days. The WhatsApp button alone has changed how my customers order. Honest team, no extra charges.',
      name: 'Anita Reddy',
      business: 'Curry Leaf Restaurant',
      city: 'Bangalore',
      initial: 'A',
      rating: 5,
    },
    {
      quote:
        'My clinic now ranks #1 for "dentist in Bandra" on Google. Patients call us directly from the Maps listing. Game-changer.',
      name: 'Dr. Meera Nair',
      business: 'Sunrise Dental Clinic',
      city: 'Mumbai',
      initial: 'M',
      rating: 5,
    },
  ];

  protected readonly faqs: readonly FaqItem[] = [
    {
      question: 'How much does a business website cost in India?',
      answer:
        'Our websites start at ₹7,999 one-time for a 5-page business site, going up to ₹39,999 for a full e-commerce store with SEO. GST is shown separately. No monthly platform fees — you own the site outright.',
    },
    {
      question: 'How long does it take to go live?',
      answer:
        'Most business websites go live in 7 to 14 days from the day you approve the design. E-commerce stores with payments take 2 to 3 weeks. We share a clear timeline on day one and stick to it.',
    },
    {
      question: 'Do I have to pay everything upfront?',
      answer:
        'No. You pay 50% to start, and the remaining 50% only after you approve the final design. If you are not happy in the first 7 days, we refund your advance.',
    },
    {
      question: 'Will my site show up on Google?',
      answer:
        'Yes — every site we build has SEO basics done right (fast pages, clean URLs, mobile-friendly, structured data). For competitive "near me" searches, we recommend our monthly Local SEO add-on.',
    },
    {
      question: 'Can I edit the website myself after it is live?',
      answer:
        'Absolutely. We hand over a simple dashboard where you can update text, photos, and prices without any technical knowledge. We also give one free training session over WhatsApp video.',
    },
    {
      question: 'Do you accept UPI or only bank transfer?',
      answer:
        'Both. We accept UPI, bank transfer (NEFT/IMPS), and Razorpay. Every payment gets a proper GST invoice you can use for accounting and tax filing.',
    },
  ];
}
