import { AuthUseCase } from "@/domain/use-cases/auth/auth.usecase";
import { inject, Injectable } from "@angular/core";
import { createEffect } from "@ngrx/effects";
import { ofType } from "@ngrx/effects";
import { Actions } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { getPermissionsAction, getPermissionsSuccessAction, getPermissionsFailureAction } from "../actions/auth/auth.actions";
@Injectable({
    providedIn: 'root',
    deps: [Actions, AuthUseCase]
})
export class PermissionEffects{
    private actions$ = inject(Actions);
    private authUseCase = inject(AuthUseCase);

    getPermissionsEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getPermissionsAction),
            switchMap(({ payload }) => this.authUseCase.getPermissions(payload).pipe(
                map(response => {
                    console.log({response});
                    return getPermissionsSuccessAction({ payload: response.data });
                }),
                catchError(error => of(getPermissionsFailureAction({ error })))
            ))
        )
    );
}