import { Injectable, signal } from '@angular/core';

export type BusinessType =
  | 'shop'
  | 'restaurant'
  | 'clinic'
  | 'service-provider'
  | 'manufacturing'
  | 'education'
  | 'other';

/** Pipeline status for a captured lead. */
export type LeadStatus = 'new' | 'contacted' | 'converted';

export const LEAD_STATUS_ORDER: readonly LeadStatus[] = ['new', 'contacted', 'converted'];

export interface LeadPayload {
  name: string;
  phone: string;
  businessType: BusinessType;
  requirement: string;
  /** Optional source (e.g. 'contact-page', 'home-section'). */
  source?: string;
}

export interface LeadRecord extends LeadPayload {
  id: string;
  receivedAt: string;
  status: LeadStatus;
}

const DEMO_LEADS: readonly LeadRecord[] = [
  {
    id: 'demo_001',
    name: 'Priya Shankar',
    phone: '+91 98765 43210',
    businessType: 'shop',
    requirement:
      'Need a website for my saree shop in Jaipur with online ordering and WhatsApp catalogue.',
    source: 'contact-page',
    receivedAt: '2026-05-15T09:21:00.000Z',
    status: 'new',
  },
  {
    id: 'demo_002',
    name: 'Rajesh Kumar',
    phone: '+91 99877 11203',
    businessType: 'manufacturing',
    requirement: 'Corporate website for our auto-parts factory in Pune with ISO docs and RFQ form.',
    source: 'home-cta',
    receivedAt: '2026-05-13T14:42:00.000Z',
    status: 'contacted',
  },
  {
    id: 'demo_003',
    name: 'Anita Reddy',
    phone: '+91 90123 65544',
    businessType: 'restaurant',
    requirement: 'South Indian restaurant in Bangalore — menu page, WhatsApp ordering, and reviews.',
    source: 'contact-page',
    receivedAt: '2026-05-11T18:05:00.000Z',
    status: 'converted',
  },
  {
    id: 'demo_004',
    name: 'Vikram Joshi',
    phone: '+91 78901 22334',
    businessType: 'service-provider',
    requirement: 'AC repair service in Hyderabad. Want to rank on Google for "AC repair near me".',
    source: 'contact-page',
    receivedAt: '2026-05-09T11:10:00.000Z',
    status: 'new',
  },
  {
    id: 'demo_005',
    name: 'Dr. Meera Nair',
    phone: '+91 96543 88210',
    businessType: 'clinic',
    requirement: 'Dental clinic in Mumbai — appointment booking, Google reviews on home page.',
    source: 'home-cta',
    receivedAt: '2026-05-07T07:55:00.000Z',
    status: 'contacted',
  },
];

/**
 * Mock backend for new business inquiries.
 *
 * Real implementation would POST to an HTTP endpoint. Consumers depend on
 * `submit()` / `setStatus()` / `advanceStatus()` — swapping the body for
 * `HttpClient` requires no caller changes.
 */
@Injectable({ providedIn: 'root' })
export class LeadService {
  private readonly _leads = signal<readonly LeadRecord[]>(DEMO_LEADS);

  /** Read-only view of every lead known to the service. */
  readonly leads = this._leads.asReadonly();

  async submit(payload: LeadPayload): Promise<LeadRecord> {
    // Simulate a network round-trip.
    await new Promise((resolve) => setTimeout(resolve, 900));

    const record: LeadRecord = {
      ...payload,
      id: this.generateId(),
      receivedAt: new Date().toISOString(),
      status: 'new',
    };
    // Prepend so the newest lead surfaces at the top of the admin table.
    this._leads.update((leads) => [record, ...leads]);
    return record;
  }

  /** Set a lead's status explicitly. */
  setStatus(id: string, status: LeadStatus): void {
    this._leads.update((leads) =>
      leads.map((lead) => (lead.id === id ? { ...lead, status } : lead)),
    );
  }

  /** Advance a lead's status to the next stage (new → contacted → converted → new). */
  advanceStatus(id: string): void {
    this._leads.update((leads) =>
      leads.map((lead) => {
        if (lead.id !== id) return lead;
        const idx = LEAD_STATUS_ORDER.indexOf(lead.status);
        const next = LEAD_STATUS_ORDER[(idx + 1) % LEAD_STATUS_ORDER.length];
        return { ...lead, status: next };
      }),
    );
  }

  private generateId(): string {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }
    return `lead_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  }
}
