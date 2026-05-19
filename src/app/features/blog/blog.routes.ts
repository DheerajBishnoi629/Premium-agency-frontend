import { Routes } from '@angular/router';

export const BLOG_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./blog-list'),
    title: 'Journal — Premium Agency',
  },
  {
    path: ':slug',
    loadComponent: () => import('./blog-detail'),
    title: 'Article — Premium Agency',
  },
];
