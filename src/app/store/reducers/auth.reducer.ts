import { createReducer, on } from '@ngrx/store';
import { AuthState, initialAuthState } from '../models/auth/auth.model';
import { loginAction, loginSuccessAction, loginFailureAction } from '../actions/auth/auth.actions';
import { IBasicUserInformation } from '@/shared/entities/basic-user-information.entity';

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
        tokens: payload.tokens,
        name: payload.name,
        email: payload.email,
        companies: payload.companies,
        companyId: payload.companies.length > 0 ? payload.companies[0].id : null
    })),

    on(loginFailureAction, (state, { error }) => ({
        ...state,
        isAutenticated: false,
        loading: false,
        error: error,
        token: null,
        user: {} as IBasicUserInformation,
        companies: [],
        companyId: null
    }))
);
