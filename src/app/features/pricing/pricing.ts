import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

type Billing = 'monthly' | 'yearly';

interface Tier {
  id: string;
  name: string;
  tagline: string;
  /** Price per month when billed monthly (INR). */
  monthly: number;
  /** Price per month when billed yearly (INR, after discount). */
  yearly: number;
  features: readonly string[];
  cta: string;
  highlighted?: boolean;
}

interface GuaranteeItem {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-pricing',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pricing.html',
  styleUrl: './pricing.scss',
})
export default class Pricing {
  protected readonly billing = signal<Billing>('monthly');

  protected readonly isYearly = computed(() => this.billing() === 'yearly');

  /** Approximate yearly savings vs. monthly billing across all tiers. */
  protected readonly savingsLabel = 'Save 20%';

  protected readonly tiers: readonly Tier[] = [
    {
      id: 'starter',
      name: 'Starter',
      tagline: 'For local shops and new businesses going online.',
      monthly: 7999,
      yearly: 6399,
      features: [
        '5-page business website',
        'Mobile + tablet + desktop',
        'WhatsApp & call buttons',
        'Contact form with enquiries',
        'Free .in or .com domain (1 year)',
        '30 days of free support',
      ],
      cta: 'Start with Starter',
    },
    {
      id: 'business',
      name: 'Business',
      tagline: 'For growing brands ready to sell online.',
      monthly: 19999,
      yearly: 15999,
      features: [
        'Everything in Starter',
        'Up to 15 pages or 100 products',
        'Razorpay / UPI payments',
        'GST-ready invoicing',
        'Basic SEO setup',
        'Google Business Profile',
        '90 days of free support',
      ],
      cta: 'Choose Business',
      highlighted: true,
    },
    {
      id: 'growth',
      name: 'Growth',
      tagline: 'For established brands scaling up.',
      monthly: 39999,
      yearly: 31999,
      features: [
        'Everything in Business',
        'Unlimited pages or products',
        'Monthly SEO & content',
        'Google Ads management',
        'Dedicated account manager',
        'WhatsApp Business API',
        '12 months of free support',
      ],
      cta: 'Talk to us',
    },
  ];

  protected readonly guarantees: readonly GuaranteeItem[] = [
    {
      title: 'Zero hidden charges',
      description: 'The price you see is the price you pay. GST shown separately on every invoice.',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
      title: 'Pay only on approval',
      description: '50% to start, 50% after you approve the final design. No upfront commitment.',
      icon: 'M3 10h18M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z',
    },
    {
      title: '7-day refund',
      description: 'Not happy in the first 7 days? Get your advance back, no questions asked.',
      icon: 'M9 14l-4-4 4-4m-4 4h11a4 4 0 010 8h-1',
    },
    {
      title: 'You own it all',
      description: 'Domain, hosting, code, and content — fully yours. No monthly platform lock-in.',
      icon: 'M5 13l4 4L19 7',
    },
  ];

  protected setBilling(value: Billing): void {
    this.billing.set(value);
  }

  protected priceFor(tier: Tier): number {
    return this.isYearly() ? tier.yearly : tier.monthly;
  }

  protected formatPrice(value: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  }
}
