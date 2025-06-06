import { ITokens } from "@/shared/entities/tokens.entity";
import { loginAction, loginFailureAction, loginSuccessAction } from "@/store/actions/auth/auth.actions";
import { AuthState } from "@/store/models/auth/auth.model";
import { createReducer, on } from "@ngrx/store";

export const authInitialState: AuthState = {
    loading: false,
    error: null,
    isAutenticated: false,
    companies: [],
    userId: null,
    tokens: {} as ITokens,
    name: '',
    email: ''
};

export const authReducer = createReducer(
    authInitialState,
    on(loginAction, (state) => ({ ...state, loading: true })),
    on(loginSuccessAction, (state, { payload }) => ({
        ...state,
        loading: false,
        isAutenticated: true,
        companies: payload.companies,
        userId: payload.id.toString(),
        tokens: payload.tokens,
        name: payload.name,
        email: payload.email
    })),
    on(loginFailureAction, (state, { error }) => ({
        ...state,
        loading: false,
        error: error,
        isAutenticated: false,
        companies: [],
        companyId: null,
        tokens: {} as ITokens,
        name: '',
        email: ''
    }))
);
