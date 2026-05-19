import { Injectable } from '@angular/core';
import { BLOG_POSTS } from './blog.data';
import type { BlogPost, BlogPostSummary } from './blog.types';

/**
 * Mock data layer that fronts the blog content. The interface is shaped so it
 * can be swapped for an HTTP-backed implementation without touching consumers.
 */
@Injectable({ providedIn: 'root' })
export class BlogService {
  list(): readonly BlogPostSummary[] {
    return BLOG_POSTS.map(({ body, ...summary }) => summary).sort((a, b) =>
      b.publishedAt.localeCompare(a.publishedAt),
    );
  }

  bySlug(slug: string): BlogPost | undefined {
    return BLOG_POSTS.find((post) => post.slug === slug);
  }

  /** Slugs of all published posts — used by SSR for prerender discovery. */
  allSlugs(): readonly string[] {
    return BLOG_POSTS.map((p) => p.slug);
  }
}
