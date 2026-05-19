import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import {
  BusinessType,
  LeadRecord,
  LeadService,
  LeadStatus,
} from '../../core/services/lead.service';

type SortColumn = 'receivedAt' | 'name' | 'businessType' | 'status';
type SortDirection = 'asc' | 'desc';
interface SortState {
  readonly column: SortColumn;
  readonly direction: SortDirection;
}

type StatusFilter = LeadStatus | 'all';
type TypeFilter = BusinessType | 'all';

interface MetricCard {
  readonly id: 'total' | 'new' | 'followups';
  readonly label: string;
  readonly value: number;
  readonly hint: string;
  readonly accent: 'emerald' | 'amber' | 'sky';
}

const BUSINESS_TYPES: readonly BusinessType[] = [
  'shop',
  'restaurant',
  'clinic',
  'service-provider',
  'manufacturing',
  'education',
  'other',
];

const STATUS_LABEL: Readonly<Record<LeadStatus, string>> = {
  new: 'New',
  contacted: 'Contacted',
  converted: 'Converted',
};

@Component({
  selector: 'app-admin-dashboard',
  imports: [DatePipe, FormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin-dashboard.html',
})
export default class AdminDashboard {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly leadService = inject(LeadService);

  protected readonly user = this.auth.user;
  protected readonly leads = this.leadService.leads;

  /** Reactive UI state — every change recomputes the derived view in one pass. */
  protected readonly search = signal('');
  protected readonly typeFilter = signal<TypeFilter>('all');
  protected readonly statusFilter = signal<StatusFilter>('all');
  protected readonly sort = signal<SortState>({ column: 'receivedAt', direction: 'desc' });

  protected readonly businessTypes = BUSINESS_TYPES;
  protected readonly statusFilters: readonly StatusFilter[] = ['all', 'new', 'contacted', 'converted'];

  /** Aggregated counts across the entire dataset (independent of filters). */
  protected readonly metrics = computed<readonly MetricCard[]>(() => {
    const all = this.leads();
    let pending = 0;
    let followups = 0;
    for (const lead of all) {
      if (lead.status === 'new') pending++;
      else followups++; // 'contacted' or 'converted' both count as a follow-up done
    }
    return [
      {
        id: 'total',
        label: 'Total Leads',
        value: all.length,
        hint: 'All enquiries received',
        accent: 'emerald',
      },
      {
        id: 'new',
        label: 'New Enquiries',
        value: pending,
        hint: 'Need a callback',
        accent: 'amber',
      },
      {
        id: 'followups',
        label: 'Follow-ups done',
        value: followups,
        hint: 'Contacted or converted',
        accent: 'sky',
      },
    ];
  });

  /** Filtered + sorted view fed to the table. */
  protected readonly filteredLeads = computed<readonly LeadRecord[]>(() => {
    const query = this.search().trim().toLowerCase();
    const type = this.typeFilter();
    const status = this.statusFilter();
    const { column, direction } = this.sort();

    const filtered = this.leads().filter((lead) => {
      if (type !== 'all' && lead.businessType !== type) return false;
      if (status !== 'all' && lead.status !== status) return false;
      if (!query) return true;
      return (
        lead.name.toLowerCase().includes(query) ||
        lead.phone.toLowerCase().includes(query) ||
        lead.requirement.toLowerCase().includes(query) ||
        (lead.source?.toLowerCase().includes(query) ?? false)
      );
    });

    const factor = direction === 'asc' ? 1 : -1;
    // Copy before sort: signals expose a readonly array and we must not mutate it.
    return [...filtered].sort((a, b) => compareLeads(a, b, column) * factor);
  });

  protected readonly hasActiveFilters = computed(
    () =>
      this.search().trim().length > 0 ||
      this.typeFilter() !== 'all' ||
      this.statusFilter() !== 'all',
  );

  /** Toggle (or set) sort. Clicking the active column flips direction. */
  protected toggleSort(column: SortColumn): void {
    this.sort.update((current) =>
      current.column === column
        ? { column, direction: current.direction === 'asc' ? 'desc' : 'asc' }
        : { column, direction: column === 'receivedAt' ? 'desc' : 'asc' },
    );
  }

  protected sortIndicator(column: SortColumn): '' | '▲' | '▼' {
    const current = this.sort();
    if (current.column !== column) return '';
    return current.direction === 'asc' ? '▲' : '▼';
  }

  /** Advance status: new → contacted → converted → new (cyclic). */
  protected advanceStatus(lead: LeadRecord): void {
    this.leadService.advanceStatus(lead.id);
  }

  protected statusLabel(status: LeadStatus): string {
    return STATUS_LABEL[status];
  }

  protected statusBadgeClass(status: LeadStatus): string {
    switch (status) {
      case 'new':
        return 'bg-amber-500/15 text-amber-300 ring-amber-400/30';
      case 'contacted':
        return 'bg-sky-500/15 text-sky-300 ring-sky-400/30';
      case 'converted':
        return 'bg-violet-500/15 text-violet-300 ring-violet-400/30';
    }
  }

  protected metricAccentClass(accent: MetricCard['accent']): string {
    switch (accent) {
      case 'emerald':
        return 'from-emerald-500/20 to-emerald-500/0 text-emerald-300 ring-emerald-400/20';
      case 'amber':
        return 'from-amber-500/20 to-amber-500/0 text-amber-300 ring-amber-400/20';
      case 'sky':
        return 'from-sky-500/20 to-sky-500/0 text-sky-300 ring-sky-400/20';
    }
  }

  protected clearFilters(): void {
    this.search.set('');
    this.typeFilter.set('all');
    this.statusFilter.set('all');
  }

  /**
   * Programmatic, signal-aware logout: clears the session, then redirects to
   * the public login page. `replaceUrl` prevents the protected URL from
   * remaining in browser history.
   */
  protected async signOut(): Promise<void> {
    this.auth.logout();
    await this.router.navigate(['/admin/login'], { replaceUrl: true });
  }
}

function compareLeads(a: LeadRecord, b: LeadRecord, column: SortColumn): number {
  switch (column) {
    case 'receivedAt':
      return a.receivedAt.localeCompare(b.receivedAt);
    case 'name':
      return a.name.localeCompare(b.name);
    case 'businessType':
      return a.businessType.localeCompare(b.businessType);
    case 'status': {
      // Sort by pipeline order so 'new' < 'contacted' < 'converted'.
      const order: Record<LeadStatus, number> = { new: 0, contacted: 1, converted: 2 };
      return order[a.status] - order[b.status];
    }
  }
}
