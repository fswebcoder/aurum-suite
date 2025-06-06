import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, map, mergeMap, tap, withLatestFrom } from 'rxjs';
import { HYDRATE, HYDRATE_SUCCESS } from '../actions/hydratation.actions';
import { StoreState } from '../../store.state';
import { loginAction, loginSuccessAction } from '@/store/actions/auth/auth.actions';
import { LoadingService } from '@/shared/services/loading.service';

@Injectable({
    providedIn: 'root'
})
export class HydratationEffects {
    private actions$ = inject(Actions);
    private store = inject(Store<StoreState>);
    private loadingService = inject(LoadingService);

    // Efecto para guardar el estado cuando cambia la autenticación
    saveState$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loginSuccessAction),
            withLatestFrom(this.store),
            tap(([_, state]) => {
                if (state.auth) {
                    localStorage.setItem('app-state', JSON.stringify({
                        auth: {
                            ...state.auth,
                            loading: false // Aseguramos que loading sea false al persistir
                        }
                    }));
                }
                // Aseguramos que el botón se desbloquee
                this.loadingService.setButtonLoading('login-button', false);
                this.loadingService.stopLoading('login');
            })
        ),
        { dispatch: false }
    );

    // Efecto para hidratar el estado al iniciar
    hydrate$ = createEffect(() =>
        this.actions$.pipe(
            ofType(HYDRATE),
            mergeMap(() => {
                const storageValue = localStorage.getItem('app-state');
                if (storageValue) {
                    try {
                        const state = JSON.parse(storageValue);
                        if (state.auth) {
                            // Aseguramos que loading sea false al hidratar
                            state.auth.loading = false;
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

    // Efecto para asegurar que el botón se desbloquee en caso de error
    resetLoading$ = createEffect(() =>
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
}
