import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { slectAuthTokens } from '@/store/selectors/auth.selectors';
import { switchMap, take } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);

  if (req.url.includes('/auth/login')) {
    return next(req);
  }

  return store.select(slectAuthTokens).pipe(
    take(1),
    switchMap(tokens => {
      if (!tokens?.access_token) {
        return next(req);
      }

      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${tokens.access_token}`
        }
      });

      return next(authReq);
    })
  );
};
