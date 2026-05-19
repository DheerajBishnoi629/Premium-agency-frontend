import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: readonly string[];
  icon: string;
  accent: 'emerald' | 'sky' | 'violet' | 'amber';
}

@Component({
  selector: 'app-services',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export default class Services {
  protected readonly services: readonly Service[] = [
    {
      id: 'web-design',
      title: 'Web Design',
      tagline: 'A professional website that brings customers.',
      description:
        'Fast, mobile-friendly websites that look great and turn visitors into enquiries. Includes hosting setup, contact forms, and WhatsApp integration.',
      deliverables: [
        'Custom design (no templates)',
        'Up to 8 pages',
        'Mobile + tablet + desktop',
        'WhatsApp & call buttons',
        'Free 30-day support',
      ],
      icon: 'M3 4h18v12H3zM8 20h8M12 16v4',
      accent: 'emerald',
    },
    {
      id: 'ecommerce',
      title: 'E-commerce',
      tagline: 'Sell online with payments that just work.',
      description:
        'Online stores with Razorpay or UPI payments, GST-ready invoicing, and inventory tools. From small Instagram shops to full catalogues.',
      deliverables: [
        'Product catalogue',
        'Razorpay / UPI checkout',
        'GST-ready invoices',
        'Order & inventory dashboard',
        'Courier integration',
      ],
      icon: 'M3 3h2l1 14a2 2 0 002 2h10a2 2 0 002-2l1-9H6M9 21a1 1 0 100-2 1 1 0 000 2zM17 21a1 1 0 100-2 1 1 0 000 2z',
      accent: 'sky',
    },
    {
      id: 'seo',
      title: 'Local SEO',
      tagline: 'Get found on Google when customers search.',
      description:
        'Monthly SEO that gets your business ranking for the searches that matter — local "near me" terms, service keywords, and Google Maps.',
      deliverables: [
        'Keyword & competitor research',
        'On-page optimisation',
        'Google Business Profile setup',
        'Monthly content & backlinks',
        'Plain-English monthly report',
      ],
      icon: 'M21 21l-4.35-4.35M10 18a8 8 0 110-16 8 8 0 010 16z',
      accent: 'violet',
    },
  ];

  protected accentClasses(accent: Service['accent']): {
    chip: string;
    glow: string;
    ring: string;
    text: string;
  } {
    switch (accent) {
      case 'sky':
        return {
          chip: 'bg-sky-500/10 text-sky-300',
          glow: 'from-sky-500/0 via-sky-500/0 to-sky-500/15',
          ring: 'hover:border-sky-400/40',
          text: 'text-sky-300',
        };
      case 'violet':
        return {
          chip: 'bg-violet-500/10 text-violet-300',
          glow: 'from-violet-500/0 via-violet-500/0 to-violet-500/15',
          ring: 'hover:border-violet-400/40',
          text: 'text-violet-300',
        };
      case 'amber':
        return {
          chip: 'bg-amber-500/10 text-amber-300',
          glow: 'from-amber-500/0 via-amber-500/0 to-amber-500/15',
          ring: 'hover:border-amber-400/40',
          text: 'text-amber-300',
        };
      case 'emerald':
      default:
        return {
          chip: 'bg-emerald-500/10 text-emerald-300',
          glow: 'from-emerald-500/0 via-emerald-500/0 to-emerald-500/15',
          ring: 'hover:border-emerald-400/40',
          text: 'text-emerald-300',
        };
    }
  }
}
