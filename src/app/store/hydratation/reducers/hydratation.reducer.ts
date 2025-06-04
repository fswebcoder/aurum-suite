import { Action, ActionReducer } from '@ngrx/store';
import { StoreState } from '../../store.state';
import { isHydrateSuccess } from '../actions/hydratation.actions';
import { initialAuthState } from '@/store/models/auth/auth.model';

export const HYDRATATION_META_REDUCER = (reducer: ActionReducer<StoreState>): ActionReducer<StoreState> => {
  return (state, action: Action) => {
    if (isHydrateSuccess(action)) {
      const { auth } = action.state;

      if (!auth) {
        return reducer(state, action);
      }
      return {
        ...state,
        auth: {
          ...initialAuthState,
          ...state?.auth,
          ...auth
        }
      } as StoreState;
    }

    return reducer(state, action);
  };
};

export const isAuthenticated = (state: StoreState): boolean => {
  return state?.auth?.isAutenticated ?? false;
};
