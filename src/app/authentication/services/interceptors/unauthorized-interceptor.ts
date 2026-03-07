import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core/primitives/di';
import { Router } from '@angular/router';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';

export const unauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  let router = inject(Router);
  return next(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Action: Clear tokens and redirect to login
          router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
};
