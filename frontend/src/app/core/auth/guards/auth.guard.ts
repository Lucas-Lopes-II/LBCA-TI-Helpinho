import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';

import { of } from 'rxjs';
import { AuthService } from '../auth.service';

export const AuthGuard: CanActivateFn | CanActivateChildFn = (route, state) => {
  const router: Router = inject(Router);
  const authService = inject(AuthService);

  if (!authService.checkIfIsAutenticated()) {
    const isInPublicRoute = state.url === '/register' || state.url === '/login';
    const redirectURL = isInPublicRoute ? '' : `redirectURL=${state.url}`;
    const urlTree = router.parseUrl(`login?${redirectURL}`);

    return of(urlTree);
  }

  return of(true);
};
