import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService } from './blog.service';
import type { BlogTag } from './blog.types';

interface TagOption {
  id: BlogTag | 'all';
  label: string;
}

@Component({
  selector: 'app-blog-list',
  imports: [RouterLink, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './blog-list.html',
  styleUrl: './blog.scss',
})
export default class BlogList {
  private readonly blog = inject(BlogService);

  protected readonly posts = this.blog.list();

  protected readonly tags: readonly TagOption[] = [
    { id: 'all', label: 'All' },
    { id: 'getting-started', label: 'Getting Started' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'whatsapp', label: 'WhatsApp' },
    { id: 'seo', label: 'SEO' },
    { id: 'payments', label: 'Payments' },
    { id: 'design-tips', label: 'Design Tips' },
  ];

  protected readonly activeTag = signal<BlogTag | 'all'>('all');

  protected setTag(id: BlogTag | 'all'): void {
    this.activeTag.set(id);
  }

  protected filteredPosts() {
    const tag = this.activeTag();
    if (tag === 'all') return this.posts;
    return this.posts.filter((p) => (p.tags as readonly string[]).includes(tag));
  }
}
