import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { StoreState } from "./store.state";
import { routerReducer } from "@ngrx/router-store";
import { authReducer } from "./reducers/auth/auth.reducer";
import { HYDRATATION_META_REDUCER } from "./hydratation/reducers/hydratation.reducer";
import { commonReducer } from "./reducers/common/common.reducer";

export const STORE_REDUCERS: ActionReducerMap<StoreState> = {
    router: routerReducer,
    auth: authReducer,
    common: commonReducer
}

export const META_REDUCERS: MetaReducer[] = [HYDRATATION_META_REDUCER];
