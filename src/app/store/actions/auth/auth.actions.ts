import { createAction, props } from '@ngrx/store';
import { ILoginParamsEntity } from '@/domain/entities/auth/login-params.entity';
import { ILoginResponseEntity } from '@/domain/entities/auth/login-response.entity';

export const LOGIN = '[Auth] Login';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAILURE = '[Auth] Login Failure';



export const loginAction = createAction(
    LOGIN,
    props<{ payload: ILoginParamsEntity }>()
);

export const loginSuccessAction = createAction(
    LOGIN_SUCCESS,
    props<{ payload: ILoginResponseEntity }>()
);

export const loginFailureAction = createAction(
    LOGIN_FAILURE,
    props<{ error: any }>()
);
