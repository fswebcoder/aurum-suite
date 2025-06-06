import { IBranding } from '@/shared/entities/branding.entity';
import { ITokens } from '@/shared/entities/tokens.entity';
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
  setThemeAction,
  setCompanyAction,
  setCompanyFailureAction,
  setCompanySuccessAction,
  getPermissionsAction,
  getPermissionsSuccessAction,
  getPermissionsFailureAction
} from '@/store/actions/auth/auth.actions';
import { AuthState } from '@/store/models/auth/auth.model';
import { createReducer, on } from '@ngrx/store';

export const authInitialState: AuthState = {
  loading: false,
  error: null,
  isAutenticated: false,
  companies: [],
  userId: null,
  tokens: {} as ITokens,
  name: '',
  email: '',
  branding: {} as IBranding
};

export const authReducer = createReducer(
  authInitialState,
  on(loginAction, state => ({ ...state, loading: true })),
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
  })),
  on(setThemeAction, (state, { payload }) => ({
    ...state,
    branding: payload
  })),
  on(setCompanyAction, (state, { payload }) => ({
    ...state,
    companyId: payload
  })),
  on(setCompanySuccessAction, (state, { payload }) => ({
    ...state,
    companyId: payload
  })),
  on(setCompanyFailureAction, (state, { error }) => ({
    ...state,
    error: error
  })),
  on(getPermissionsAction, (state, { payload }) => ({
    ...state,
    loading: true
  })),
  on(getPermissionsSuccessAction, (state, { payload }) => ({
    ...state,
    loading: false,
    permissions: payload
  })),
  on(getPermissionsFailureAction, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  }))
);
