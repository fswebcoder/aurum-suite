import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of, mergeMap, tap } from 'rxjs';
import { loginAction, loginSuccessAction, loginFailureAction } from '../actions/auth/auth.actions';
import { AuthUseCase } from '@/domain/use-cases/auth/auth.usecase';
import { ILoginParamsEntity } from '@/domain/entities/auth/login-params.entity';
import { LoadingService } from '@/shared/services/loading.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
  deps: [Actions, AuthUseCase]
})
export class LoginEffects {
  private actions$ = inject(Actions);
  private authUseCase = inject(AuthUseCase);
  private loadingService = inject(LoadingService);
  private router = inject(Router);
  loginEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      switchMap(({ payload }) => {
        const authParamsEntity: ILoginParamsEntity = {
          email: payload.email,
          password: payload.password
        };
        return this.authUseCase.login(authParamsEntity).pipe(
          mergeMap(response => {
            this.loadingService.stopLoading('login');
            this.loadingService.setButtonLoading('login-button', false);
            if (response.statusCode === 200) {
              return [
                loginSuccessAction({
                  payload: {
                    id: response.data.id,
                    name: response.data.name,
                    email: response.data.email,
                    companies: response.data.companies,
                    tokens: response.data.tokens
                  }
                })
              ];
            }
            return of(loginFailureAction({ error: response.message }));
          }),
          catchError((error: HttpErrorResponse) => {
            this.loadingService.stopLoading('login');
            this.loadingService.setButtonLoading('login-button', false);

            let errorMessage = 'Error al iniciar sesión';

            if (error.error && typeof error.error === 'object') {
              errorMessage = error.error.message;
            }

            return of(loginFailureAction({ error: errorMessage }));
          })
        );
      })
    )
  );
}
