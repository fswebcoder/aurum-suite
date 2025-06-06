import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../models/auth/auth.model';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthLoading = createSelector(selectAuthState, state => state.loading);

export const selectIsAuthenticated = createSelector(selectAuthState, state => state.isAutenticated);

export const selectAuthError = createSelector(selectAuthState, state => state.error);

export const selectAuthUser = createSelector(selectAuthState, (state: AuthState) => state.name);

export const selectAuthCompanies = createSelector(selectAuthState, (state: AuthState) => state.companies);

export const selectAuthUserId = createSelector(selectAuthState, (state: AuthState) => state.userId);

export const selectAuthBranding = createSelector(selectAuthState, (state: AuthState) => state.branding);

export const slectAuthTokens = createSelector(selectAuthState, (state: AuthState) => state.tokens);
