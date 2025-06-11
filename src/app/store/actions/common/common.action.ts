import { ICitiesResponseEntity } from "@/domain/entities/common/cities-response.entity";
import { IDepartmentsResponseEntity } from "@/domain/entities/common/departments-response.entity";
import { createAction, props } from "@ngrx/store";

export const SUPPLIERS_LIST = '[SUPPLIERS] suppliers list';
export const DEPARTMENTS_LIST_SUCCESS = '[DEPARTMENTS] departments list success';
export const DEPARTMENTS_LIST_FAILURE = '[DEPARTMENTS] departments list failure';

export const GET_CITIES = '[COMMON] get cities';
export const CITIES_LIST_SUCCESS = '[COMMON] cities list success';
export const CITIES_LIST_FAILURE = '[COMMON] cities list failure';

export const getDepartmentsAction = createAction(SUPPLIERS_LIST);
export const departmentsListSuccessAction = createAction(DEPARTMENTS_LIST_SUCCESS ,
    props<{ departments: IDepartmentsResponseEntity[] }>()
);
export const departmentsListFailureAction = createAction(DEPARTMENTS_LIST_FAILURE,
    props<{ error: any }>()
);


export const getCitiesAction = createAction(GET_CITIES);
export const citiesListSuccessAction = createAction(CITIES_LIST_SUCCESS,
    props<{ cities: ICitiesResponseEntity[] }>()
);
export const citiesListFailureAction = createAction(CITIES_LIST_FAILURE,
    props<{ error: any }>()
);
