import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { citiesListFailureAction, citiesListSuccessAction, departmentsListFailureAction, departmentsListSuccessAction, getCitiesAction, getDepartmentsAction } from "@/store/actions/common/common.action";
import { DepartmentsUseCase } from "@/domain/use-cases/common/departments.usecases";
import { CitiesUseCase } from "@/domain/use-cases/common/cities.usecases";

@Injectable()
export class CommonEffect {
    private actions$ = inject(Actions);
    private departmentsUseCase = inject(DepartmentsUseCase);
    private citiesUseCase = inject(CitiesUseCase);
    getDepartments$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getDepartmentsAction),
            switchMap(() => this.departmentsUseCase.getAll()),
            map((response) => departmentsListSuccessAction({ departments: response.data })),
            catchError((error) => of(departmentsListFailureAction({ error: error.message })))
        )
    );

    getCities$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getCitiesAction),
            switchMap(() => this.citiesUseCase.getAll()),
            map((response) => citiesListSuccessAction({ cities: response.data })),
            catchError((error) => of(citiesListFailureAction({ error: error.message })))
        )
    );
}
