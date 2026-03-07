import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SuperAdminGuard {
  
}

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth-service';
import { ROLE } from '../../../utils/roles';

export const superAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUser();
  if (user.role == ROLE.SUPERADMIN) {
    return true;
  }

  // Redirection + queryParams pour revenir après login
  return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};