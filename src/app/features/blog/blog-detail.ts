import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService } from './blog.service';

@Component({
  selector: 'app-blog-detail',
  imports: [RouterLink, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './blog-detail.html',
  styleUrl: './blog.scss',
})
export default class BlogDetail {
  private readonly blog = inject(BlogService);

  /** Bound from the `:slug` route param via `withComponentInputBinding()`. */
  readonly slug = input.required<string>();

  protected readonly post = computed(() => this.blog.bySlug(this.slug()));
}
