import { Routes } from '@angular/router';
import { authGuard, guestGuard } from '../../core/guards/auth.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./admin-login'),
    title: 'Sign in — Premium Agency',
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./admin-dashboard'),
    title: 'Admin — Premium Agency',
  },
];
