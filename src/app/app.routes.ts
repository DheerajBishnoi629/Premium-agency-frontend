import { Routes } from '@angular/router';

/**
 * Root routes.
 *
 * Two top-level layouts are mounted as lazy components:
 *   - PublicLayout: marketing site chrome (sticky header, footer, WhatsApp CTA).
 *   - BlankLayout:  chrome-less shell for the admin panel.
 *
 * Every feature is split into its own route file and loaded on demand via
 * `loadChildren` to keep the initial bundle small.
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./core/layouts/public-layout/public-layout').then((m) => m.PublicLayout),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./features/home/home.routes').then((m) => m.HOME_ROUTES),
      },
      {
        path: 'services',
        loadChildren: () =>
          import('./features/services/services.routes').then((m) => m.SERVICES_ROUTES),
      },
      {
        path: 'pricing',
        loadChildren: () =>
          import('./features/pricing/pricing.routes').then((m) => m.PRICING_ROUTES),
      },
      {
        path: 'portfolio',
        loadChildren: () =>
          import('./features/portfolio/portfolio.routes').then((m) => m.PORTFOLIO_ROUTES),
      },
      {
        path: 'blog',
        loadChildren: () => import('./features/blog/blog.routes').then((m) => m.BLOG_ROUTES),
      },
      {
        path: 'about',
        loadChildren: () => import('./features/about/about.routes').then((m) => m.ABOUT_ROUTES),
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('./features/contact/contact.routes').then((m) => m.CONTACT_ROUTES),
      },
    ],
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./core/layouts/blank-layout/blank-layout').then((m) => m.BlankLayout),
    children: [
      {
        path: '',
        loadChildren: () => import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./core/layouts/public-layout/public-layout').then((m) => m.PublicLayout),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/not-found/not-found'),
        title: 'Not found — Premium Agency',
      },
    ],
  },
];
