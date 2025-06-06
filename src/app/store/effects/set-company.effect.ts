import { inject, Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { createEffect } from '@ngrx/effects';
import { setCompanyAction, setCompanyFailureAction, setCompanySuccessAction } from '../actions/auth/auth.actions';
import { ofType } from '@ngrx/effects';
import { AuthUseCase } from '@/domain/use-cases/auth/auth.usecase';
import { switchMap, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetCompanyEffect {
  private actions$ = inject(Actions);
  private authUseCase = inject(AuthUseCase);

  setCompanyEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setCompanyAction),
      switchMap(({ payload }) =>
        this.authUseCase.setCompany(payload).pipe(
          map(response => setCompanySuccessAction({ payload: response.data })),
          catchError(error => of(setCompanyFailureAction({ error })))
        )
      )
    )
  );
}
