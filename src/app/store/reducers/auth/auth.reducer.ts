import { loginAction, loginFailureAction, loginSuccessAction } from "@/store/actions/auth/auth.actions";
import { AuthState } from "@/store/models/auth/auth.model";
import { createReducer, on } from "@ngrx/store";

export const authInitialState: AuthState = {
    loading: false,
    error: null,
    isAutenticated: false,
    companies: [],
    companyId: null,
    token: null,
    user: null
};

export const authReducer = createReducer(
    authInitialState,
    on(loginAction, (state) => ({ ...state, loading: true })),
    on(loginSuccessAction, (state) => ({ ...state, loading: false, isAutenticated: true })),
    on(loginFailureAction, (state) => ({ ...state, loading: false, error: true })),
);
