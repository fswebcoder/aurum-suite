import { Action, ActionReducer } from '@ngrx/store';
import { StoreState } from '../../store.state';
import { HYDRATE_SUCCESS } from '../actions/hydratation.actions';
import { AuthState } from '@/store/models/auth/auth.model';

function isHydrateSuccess(action: Action): action is ReturnType<typeof HYDRATE_SUCCESS> {
    return action.type === '[Hydratation] Hydrate Success';
}

export const HYDRATATION_META_REDUCER = (reducer: ActionReducer<StoreState>): ActionReducer<StoreState> => {
    return (state, action) => {
        if (isHydrateSuccess(action) && action.state.auth) {
            const hydratedAuth: AuthState = {
                ...action.state.auth,
                loading: false,
                isAutenticated: true,
                error: null,
                permissions: action.state.auth.permissions || null
            };

            return {
                ...action.state,
                auth: hydratedAuth,
                router: state?.router || action.state.router
            } as StoreState;
        }

        return reducer(state, action);
    };
};

export const isAuthenticated = (state: StoreState): boolean => {
    return state?.auth?.isAutenticated ?? false;
};
