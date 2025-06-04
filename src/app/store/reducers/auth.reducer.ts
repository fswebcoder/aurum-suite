import { createReducer, on } from '@ngrx/store';
import { AuthState, initialAuthState } from '../models/auth/auth.model';
import { loginAction, loginSuccessAction, loginFailureAction } from '../actions/auth/auth.actions';

export const authReducer = createReducer(
    initialAuthState,

    on(loginAction, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(loginSuccessAction, (state, { payload }) => ({
        ...state,
        isAutenticated: true,
        loading: false,
        error: null,
        token: payload.token,
        user: payload.user,
        companies: payload.companies,
        companyId: payload.companies.length > 0 ? payload.companies[0].id : null
    })),

    on(loginFailureAction, (state, { error }) => ({
        ...state,
        isAutenticated: false,
        loading: false,
        error: error,
        token: null,
        user: null,
        companies: [],
        companyId: null
    }))
);
