import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, mergeMap, tap, withLatestFrom } from 'rxjs';
import { HYDRATE, HYDRATE_SUCCESS } from '../actions/hydratation.actions';
import { StoreState } from '../../store.state';
import { loginAction, loginSuccessAction, setThemeAction } from '@/store/actions/auth/auth.actions';
import { LoadingService } from '@/shared/services/loading.service';
import { getPermissionsSuccessAction } from '@/store/actions/auth/auth.actions';
import { departmentsListSuccessAction } from '@/store/actions/common/common.action';

@Injectable({
  providedIn: 'root'
})
export class HydratationEffects {
  private actions$ = inject(Actions);
  private store = inject(Store<StoreState>);
  private loadingService = inject(LoadingService);

  private saveStateToLocalStorage(state: StoreState) {
    const stateToSave = {
      auth: state.auth ? {
        ...state.auth,
        loading: false,
        branding: state.auth.branding,
        permissions: state.auth.permissions
      } : null,
      common: state.common ? {
        ...state.common,
        loading: false,
        departments: state.common.departments
      } : null
    };

    if (stateToSave.auth || stateToSave.common) {
      localStorage.setItem('app-state', JSON.stringify(stateToSave));
    }
  }

  saveState$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccessAction),
        withLatestFrom(this.store),
        tap(([_, state]) => {
          this.saveStateToLocalStorage(state);
          this.loadingService.setButtonLoading('login-button', false);
          this.loadingService.stopLoading('login');
        })
      ),
    { dispatch: false }
  );

  saveThemeState$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setThemeAction),
        withLatestFrom(this.store),
        tap(([_, state]) => {
          this.saveStateToLocalStorage(state);
        })
      ),
    { dispatch: false }
  );

  saveDepartmentsState$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(departmentsListSuccessAction),
        withLatestFrom(this.store),
        tap(([_, state]) => {
          this.saveStateToLocalStorage(state);
        })
      ),
    { dispatch: false }
  );

  hydrate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HYDRATE),
      mergeMap(() => {
        const storageValue = localStorage.getItem('app-state');
        if (storageValue) {
          try {
            const state = JSON.parse(storageValue);
            if (state.auth || state.common) {
              if (state.auth) {
                state.auth.loading = false;
                state.auth.branding = state.auth.branding || {};
              }
              if (state.common) {
                state.common.loading = false;
                state.common.departments = state.common.departments || [];
                state.common.cities = state.common.cities || [];
              }
              this.loadingService.setButtonLoading('login-button', false);
              this.loadingService.stopLoading('login');
              return [HYDRATE_SUCCESS({ state })];
            }
          } catch {
            localStorage.removeItem('app-state');
          }
        }
        return EMPTY;
      })
    )
  );

  resetLoading$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginAction),
        tap(() => {
          setTimeout(() => {
            this.loadingService.setButtonLoading('login-button', false);
            this.loadingService.stopLoading('login');
          }, 5000); // Timeout de seguridad
        })
      ),
    { dispatch: false }
  );

  savePermissionsState$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getPermissionsSuccessAction),
        withLatestFrom(this.store),
        tap(([_, state]) => {
          this.saveStateToLocalStorage(state);
        })
      ),
    { dispatch: false }
  );
}
