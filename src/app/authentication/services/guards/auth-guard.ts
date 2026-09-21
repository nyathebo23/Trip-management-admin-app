import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth-service';
import { inject } from '@angular/core/primitives/di';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuthenticated()) {
    return true;
  }

  // Redirige vers login en gardant l'URL de destination
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url }
  });
};