import { AuthUseCase } from "@/domain/use-cases/auth/auth.usecase";
import { inject, Injectable } from "@angular/core";
import { createEffect } from "@ngrx/effects";
import { ofType } from "@ngrx/effects";
import { Actions } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { getPermissionsAction, getPermissionsSuccessAction, getPermissionsFailureAction } from "../actions/auth/auth.actions";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { LoadingService } from "@/shared/services/loading.service";

@Injectable({
    providedIn: 'root',
    deps: [Actions, AuthUseCase]
})
export class PermissionEffects {
    private actions$ = inject(Actions);
    private authUseCase = inject(AuthUseCase);
    private router = inject(Router);
    private loadingService = inject(LoadingService);
    getPermissionsEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getPermissionsAction),
            switchMap(({ payload }) => this.authUseCase.getPermissions(payload).pipe(
                map(response => {
                    console.log("Respuesta del backend:", response);
                    this.router.navigate(['/home']);
                    this.loadingService.stopLoading('general');
                    return getPermissionsSuccessAction({ payload: response.data });
                }),
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 401) {
                        // Limpiar el localStorage por seguridad
                        localStorage.clear();
                        this.router.navigate(['/login']);
                    }
                    return of(getPermissionsFailureAction({ error: error.message }));
                })
            ))
        )
    );
}