/**
 * Headless CMS payload shapes for the Portfolio collection.
 * These mirror the response a typed client (e.g. Contentful, Sanity, Storyblok)
 * would return after normalization.
 */

export type PortfolioCategoryId =
  | 'all'
  | 'retail'
  | 'manufacturing'
  | 'services';

export interface PortfolioCategory {
  id: PortfolioCategoryId;
  label: string;
}

export interface PortfolioImage {
  /** Source URL (any CDN). */
  src: string;
  /** Accessible alt text. */
  alt: string;
  /** Intrinsic aspect ratio for CLS-safe layout (e.g. '4 / 3'). */
  aspectRatio: `${number} / ${number}`;
}

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  client: string;
  year: number;
  summary: string;
  categories: readonly Exclude<PortfolioCategoryId, 'all'>[];
  cover: PortfolioImage;
  /** Tailwind-friendly gradient classes used as a stylized cover backdrop. */
  gradient: string;
  /** Optional external case-study link. */
  href?: string;
}
