import { Routes } from '@angular/router';

export const PORTFOLIO_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./portfolio'),
    title: 'Portfolio — Premium Agency',
  },
];
