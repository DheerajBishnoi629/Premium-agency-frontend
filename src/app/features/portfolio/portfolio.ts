import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PORTFOLIO_CATEGORIES, PORTFOLIO_PROJECTS } from './portfolio.data';
import type { PortfolioCategoryId } from './portfolio.types';

@Component({
  selector: 'app-portfolio',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export default class Portfolio {
  protected readonly categories = PORTFOLIO_CATEGORIES;
  protected readonly active = signal<PortfolioCategoryId>('all');

  /** Pre-computed lookup so the template can render friendly category labels. */
  private readonly labels: ReadonlyMap<PortfolioCategoryId, string> = new Map(
    PORTFOLIO_CATEGORIES.map((c) => [c.id, c.label] as const),
  );

  protected readonly projects = computed(() => {
    const filter = this.active();
    if (filter === 'all') return PORTFOLIO_PROJECTS;
    return PORTFOLIO_PROJECTS.filter((p) =>
      (p.categories as readonly string[]).includes(filter),
    );
  });

  protected readonly count = computed(() => this.projects().length);

  protected select(id: PortfolioCategoryId): void {
    this.active.set(id);
  }

  protected labelFor(id: PortfolioCategoryId): string {
    return this.labels.get(id) ?? id;
  }
}
