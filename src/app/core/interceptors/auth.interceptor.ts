import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { slectAuthTokens } from '@/store/selectors/auth.selectors';
import { switchMap, take, catchError, tap } from 'rxjs';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  const router = inject(Router);

  if (req.url.includes('/auth/login')) {
    return next(req);
  }

  return store.select(slectAuthTokens).pipe(
    take(1),
    tap(tokens => {
      console.log('Tokens en interceptor:', tokens);
    }),
    switchMap(tokens => {
      if (!tokens?.access_token) {
        console.warn('No hay token de acceso disponible');
        return next(req);
      }

      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${tokens.access_token}`
        }
      });

      console.log('Request con token:', authReq.headers.get('Authorization'));

      return next(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            console.error('Error de autenticación 401:', error);
            router.navigate(['/auth/login']);
          }
          return throwError(() => error);
        })
      );
    })
  );
};
