import { Routes } from '@angular/router';

export const SERVICES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./services'),
    title: 'Services — Premium Agency',
  },
];
