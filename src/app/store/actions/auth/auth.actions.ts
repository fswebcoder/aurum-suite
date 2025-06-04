import { createAction, props } from '@ngrx/store';
import { AuthState } from '../../models/auth/auth.model';

export const LOGIN = '[Auth] Login';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAILURE = '[Auth] Login Failure';

export interface ILoginParamsEntity {
    username: string;
    password: string;
}

export interface ILoginResponseEntity {
    token: string;
    user: any;
    companies: any[];
}

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
