import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../models/auth/auth.model';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsAuthenticated = createSelector(
    selectAuthState,
    (state: AuthState) => state.isAutenticated
);

export const selectAuthLoading = createSelector(
    selectAuthState,
    (state: AuthState) => state.loading
);

export const selectAuthError = createSelector(
    selectAuthState,
    (state: AuthState) => state.error
);

export const selectAuthUser = createSelector(
    selectAuthState,
    (state: AuthState) => state.user
);

export const selectAuthCompanies = createSelector(
    selectAuthState,
    (state: AuthState) => state.companies
);

export const selectAuthCompanyId = createSelector(
    selectAuthState,
    (state: AuthState) => state.companyId
);
