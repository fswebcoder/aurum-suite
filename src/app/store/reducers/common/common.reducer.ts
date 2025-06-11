import { createReducer, on } from "@ngrx/store";
import { CommonState } from "@/store/models/common/common.model";
import { citiesListFailureAction, citiesListSuccessAction, departmentsListFailureAction, departmentsListSuccessAction, getCitiesAction, getDepartmentsAction } from "@/store/actions/common/common.action";

export const commonInitialState: CommonState = {
    departments: [],
    cities: [],
    loading: false,
    error: null
}

export const commonReducer = createReducer(
    commonInitialState,
    on(getDepartmentsAction, (state) => ({ ...state, loading: true })),
    on(departmentsListSuccessAction, (state, { departments }) => ({ ...state, departments, loading: false })),
    on(departmentsListFailureAction, (state, { error }) => ({ ...state, error, loading: false })),

    on(getCitiesAction, (state) => ({ ...state, loading: true })),
    on(citiesListSuccessAction, (state, { cities }) => ({ ...state, cities, loading: false })),
    on(citiesListFailureAction, (state, { error }) => ({ ...state, error, loading: false }))

)
