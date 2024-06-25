import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';

import { of } from 'rxjs';
import { UserService } from '../../../shared/services';
import { AuthService } from '../auth.service';

export const NoAuthGuard: CanActivateFn | CanActivateChildFn = (
  route,
  state
) => {
  const router: Router = inject(Router);
  const authService = inject(AuthService);

  if (authService.checkIfIsAutenticated()) {
    return of(router.parseUrl('home'));
  }

  return of(true);
};
