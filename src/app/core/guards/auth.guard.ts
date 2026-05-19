import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Functional route guard that requires an authenticated session.
 *
 * Unauthenticated visitors are redirected to `/admin/login` with the
 * originally-requested URL captured as a `returnUrl` query parameter so the
 * login page can route them back after success.
 */
export const authGuard: CanActivateFn = (_route, state): boolean | UrlTree => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/admin/login'], {
    queryParams: { returnUrl: state.url },
  });
};

/**
 * Inverse guard for the login page itself — bounces an already-authenticated
 * user straight to the dashboard.
 */
export const guestGuard: CanActivateFn = (): boolean | UrlTree => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isAuthenticated() ? router.createUrlTree(['/admin']) : true;
};
