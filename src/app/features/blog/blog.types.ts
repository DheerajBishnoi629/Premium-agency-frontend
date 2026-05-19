/**
 * Headless CMS payload shapes for the Blog collection.
 * Designed to map cleanly onto the response of a typed client (e.g.
 * Contentful, Sanity, Hygraph, Storyblok) after normalization.
 */

export interface BlogAuthor {
  name: string;
  role: string;
  avatarUrl: string;
}

export interface BlogImage {
  src: string;
  alt: string;
  aspectRatio: `${number} / ${number}`;
}

export type BlogTag =
  | 'getting-started'
  | 'ecommerce'
  | 'whatsapp'
  | 'seo'
  | 'payments'
  | 'design-tips';

/**
 * A rich-text block. Mirrors the small subset of node types we render —
 * a real CMS payload would carry many more, but this contract is enough
 * for a clean detail view.
 */
export type BlogBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'quote'; text: string; attribution?: string }
  | { type: 'list'; ordered?: boolean; items: readonly string[] };

export interface BlogPostSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover: BlogImage;
  tags: readonly BlogTag[];
  /** ISO date string. */
  publishedAt: string;
  /** Estimated reading time, in minutes. */
  readingMinutes: number;
  author: BlogAuthor;
}

export interface BlogPost extends BlogPostSummary {
  body: readonly BlogBlock[];
}
