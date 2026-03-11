import { HttpInterceptorFn } from '@angular/common/http';
import { TokenService } from '../token-service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  const tokenService = inject(TokenService);
  const token = tokenService.getToken();
  if (token != null) {
    const clonedReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });

    return next(clonedReq);
  }
  return next(req);
};
